/**
 * 経費撮影 PWA
 * mode=demo: 操作確認のみ（保存しない）
 * mode=prod: Microsoft ログイン後、SharePoint へ画像+JSON を保存
 */
(function () {
  "use strict";

  const PAY_LABELS = {
    corporate: "コーポレート",
    personal: "個人",
    cash: "現金",
  };

  const cfg = window.EMPAZY_CONFIG || {};
  const isProd = cfg.mode === "prod" && !!(cfg.msalClientId || "").trim();

  const payButtons = document.querySelectorAll(".pay-btn");
  const fileInput = document.getElementById("photo-input");
  const btnCapture = document.getElementById("btn-capture");
  const btnSave = document.getElementById("btn-save");
  const btnClear = document.getElementById("btn-clear");
  const btnLogin = document.getElementById("btn-login");
  const btnLogout = document.getElementById("btn-logout");
  const previewImg = document.getElementById("preview");
  const previewWrap = document.getElementById("preview-wrap");
  const statusEl = document.getElementById("status");
  const memoEl = document.getElementById("memo");
  const badgeEl = document.getElementById("env-badge");
  const headerSub = document.getElementById("header-sub");
  const loginBox = document.getElementById("login-box");
  const accountEl = document.getElementById("account-name");

  let selectedPay = "";
  let photoBlob = null;
  let objectUrl = null;
  let msalApp = null;
  let account = null;
  let saving = false;

  function showStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.classList.remove("hidden", "error");
    if (isError) statusEl.classList.add("error");
  }

  function hideStatus() {
    statusEl.classList.add("hidden");
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function stamp() {
    const d = new Date();
    return (
      d.getFullYear() +
      pad(d.getMonth() + 1) +
      pad(d.getDate()) +
      "_" +
      pad(d.getHours()) +
      pad(d.getMinutes()) +
      pad(d.getSeconds())
    );
  }

  function isoStamp() {
    const d = new Date();
    return (
      d.getFullYear() +
      "-" +
      pad(d.getMonth() + 1) +
      "-" +
      pad(d.getDate()) +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds())
    );
  }

  function updateChrome() {
    if (badgeEl) badgeEl.textContent = isProd ? "本番" : "デモ環境";
    if (headerSub) {
      headerSub.textContent = isProd
        ? "撮影して御社 SharePoint に保存します"
        : "操作確認用です。画像は保存されません";
    }
    if (btnSave) {
      btnSave.textContent = isProd ? "SharePoint に保存" : "操作を確認する";
    }
  }

  function updateLoginUi() {
    if (!loginBox) return;
    if (!isProd) {
      loginBox.innerHTML =
        "<strong>この画面はデモです。</strong><br>" +
        "本番では御社の Microsoft アカウントでログインし、" +
        "写真を SharePoint の経費フォルダへ保存します。";
      return;
    }
    const loggedIn = !!(account && account.username);
    if (accountEl) accountEl.textContent = loggedIn ? account.username : "未ログイン";
    if (btnLogin) btnLogin.hidden = loggedIn;
    if (btnLogout) btnLogout.hidden = !loggedIn;
  }

  function updateConfirmButton() {
    const readyPhoto = !!(selectedPay && photoBlob);
    if (!isProd) {
      btnSave.disabled = !readyPhoto;
      return;
    }
    btnSave.disabled = !readyPhoto || !account || saving;
  }

  function clearPreview() {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
    photoBlob = null;
    previewImg.removeAttribute("src");
    previewWrap.hidden = true;
  }

  function scopes() {
    return ["User.Read", "Files.ReadWrite.All", "Sites.ReadWrite.All"];
  }

  async function initMsal() {
    if (!isProd || typeof msal === "undefined") return;
    msalApp = new msal.PublicClientApplication({
      auth: {
        clientId: cfg.msalClientId.trim(),
        authority: "https://login.microsoftonline.com/organizations",
        redirectUri: (cfg.redirectUri || window.location.origin + window.location.pathname).replace(/\/?$/, "/"),
      },
      cache: { cacheLocation: "localStorage" },
    });
    await msalApp.initialize();
    const result = await msalApp.handleRedirectPromise();
    if (result && result.account) {
      account = result.account;
    } else {
      const accounts = msalApp.getAllAccounts();
      account = accounts[0] || null;
    }
  }

  async function getToken() {
    if (!msalApp || !account) throw new Error("ログインしてください");
    try {
      const silent = await msalApp.acquireTokenSilent({
        account: account,
        scopes: scopes(),
      });
      return silent.accessToken;
    } catch (err) {
      await msalApp.acquireTokenRedirect({ scopes: scopes(), account: account });
      throw err;
    }
  }

  async function graphJson(token, url, options) {
    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: "Bearer " + token,
        ...(options && options.headers ? options.headers : {}),
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error("SharePoint 応答エラー " + res.status + ": " + text.slice(0, 180));
    }
    if (res.status === 204) return null;
    const ct = res.headers.get("content-type") || "";
    if (ct.indexOf("json") >= 0) return res.json();
    return null;
  }

  async function resolveFolderUrl(token) {
    const host = (cfg.sharePointHostname || "").trim();
    const sitePath = (cfg.sharePointSitePath || "").trim();
    const folder = (cfg.folderPath || "経費レシート").replace(/^\/+|\/+$/g, "");
    if (!host) {
      throw new Error("config.js の sharePointHostname を設定してください");
    }
    const siteUrl = sitePath
      ? "https://graph.microsoft.com/v1.0/sites/" + host + ":" + (sitePath.charAt(0) === "/" ? sitePath : "/" + sitePath)
      : "https://graph.microsoft.com/v1.0/sites/" + host + ":";
    const site = await graphJson(token, siteUrl);
    if (!site || !site.id) throw new Error("SharePoint サイトが見つかりません");
    return (
      "https://graph.microsoft.com/v1.0/sites/" +
      site.id +
      "/drive/root:/" +
      folder
    );
  }

  async function uploadPair(token, imageBlob, payCode, memo) {
    const base = "receipt_" + stamp() + "_" + payCode;
    const imageName = base + ".jpg";
    const jsonName = base + ".json";
    const folderUrl = await resolveFolderUrl(token);
    const meta = {
      payment_type: PAY_LABELS[payCode] || payCode,
      payment_code: payCode,
      captured_at: isoStamp(),
      memo: memo || "",
    };

    const imgRes = await fetch(folderUrl + "/" + imageName + ":/content", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": imageBlob.type || "image/jpeg",
      },
      body: imageBlob,
    });
    if (!imgRes.ok) {
      const t = await imgRes.text();
      throw new Error("画像の保存に失敗しました: " + t.slice(0, 180));
    }

    const jsonRes = await fetch(folderUrl + "/" + jsonName + ":/content", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(meta, null, 2),
    });
    if (!jsonRes.ok) {
      const t = await jsonRes.text();
      throw new Error("メモJSONの保存に失敗しました: " + t.slice(0, 180));
    }
    return imageName;
  }

  payButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      payButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      selectedPay = btn.dataset.pay;
      updateConfirmButton();
    });
  });

  btnCapture.addEventListener("click", () => {
    if (!selectedPay) {
      showStatus("先に支払区分を選んでください", true);
      return;
    }
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showStatus("画像ファイルを選んでください", true);
      return;
    }
    clearPreview();
    photoBlob = file;
    objectUrl = URL.createObjectURL(file);
    previewImg.src = objectUrl;
    previewWrap.hidden = false;
    hideStatus();
    updateConfirmButton();
    fileInput.value = "";
  });

  btnClear.addEventListener("click", () => {
    clearPreview();
    memoEl.value = "";
    hideStatus();
    updateConfirmButton();
  });

  if (btnLogin) {
    btnLogin.addEventListener("click", async () => {
      if (!msalApp) {
        showStatus("Microsoft ログインの準備ができていません（Client ID 未設定）", true);
        return;
      }
      await msalApp.loginRedirect({ scopes: scopes() });
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
      if (!msalApp) return;
      await msalApp.logoutRedirect({ account: account || undefined });
    });
  }

  btnSave.addEventListener("click", async () => {
    if (!selectedPay || !photoBlob || saving) return;

    if (!isProd) {
      showStatus(
        "操作確認OKです。デモ環境のため、画像は保存されていません。本番では Microsoft ログイン後、SharePoint の経費フォルダへ保存します。",
        false
      );
      clearPreview();
      memoEl.value = "";
      updateConfirmButton();
      return;
    }

    if (!account) {
      showStatus("先に Microsoft ログインしてください", true);
      return;
    }

    saving = true;
    updateConfirmButton();
    showStatus("SharePoint に保存しています…", false);
    try {
      const token = await getToken();
      const name = await uploadPair(token, photoBlob, selectedPay, memoEl.value.trim());
      showStatus("保存しました: " + name, false);
      clearPreview();
      memoEl.value = "";
    } catch (err) {
      showStatus(err && err.message ? err.message : String(err), true);
    } finally {
      saving = false;
      updateConfirmButton();
    }
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/empazy-expense/sw.js").catch(function () {});
    });
  }

  updateChrome();
  initMsal()
    .then(function () {
      updateLoginUi();
      updateConfirmButton();
    })
    .catch(function (err) {
      showStatus("ログイン初期化エラー: " + (err && err.message ? err.message : err), true);
      updateLoginUi();
      updateConfirmButton();
    });
})();
