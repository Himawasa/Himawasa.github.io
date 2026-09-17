/**
 * 経費撮影 PWA
 * mode=demo: 操作確認のみ（保存しない）。保存先の選び方は見本のフォルダで体験できる
 * mode=prod: Microsoft ログイン後、SharePoint へ画像+JSON を保存
 *
 * 保存先の考え方（EMPAZY様）:
 *   1つ上のフォルダ / 26年10月経費報告 / 池田分 / receipt_…jpg
 *   - 「1つ上のフォルダ」と「自分のフォルダ名」を一度だけ選び、このスマホの中にだけ記録する
 *   - 月フォルダは撮影日から名前を作って探す。無ければ同じ名前の形で作る
 */
(function () {
  "use strict";

  const PAY_LABELS = {
    corporate: "コーポレート",
    personal: "個人",
    cash: "現金",
    bank: "銀行口座引き落とし",
  };

  const GRAPH = "https://graph.microsoft.com/v1.0";
  const DEST_KEY = "empazy.dest.v1";
  const MONTH_RE = /^\s*(\d{2}|\d{4})\s*年\s*(\d{1,2})\s*月\s*経費報告/;
  const MAX_SIDE = 2000;

  const cfg = window.EMPAZY_CONFIG || {};
  const isProd = cfg.mode === "prod" && !!(cfg.msalClientId || "").trim();

  const $ = (id) => document.getElementById(id);
  const payButtons = document.querySelectorAll(".pay-btn");
  const fileInput = $("photo-input");
  const btnCapture = $("btn-capture");
  const btnSave = $("btn-save");
  const btnClear = $("btn-clear");
  const btnLogin = $("btn-login");
  const btnLogout = $("btn-logout");
  const btnPick = $("btn-pick");
  const previewImg = $("preview");
  const previewWrap = $("preview-wrap");
  const statusEl = $("status");
  const memoEl = $("memo");
  const accountEl = $("account-name");
  const destPathEl = $("dest-path");
  const picker = $("picker");
  const pickerTitle = $("picker-title");
  const pickerHint = $("picker-hint");
  const pickerCrumbs = $("picker-crumbs");
  const pickerList = $("picker-list");
  const pickerActions = $("picker-actions");
  const urlInput = $("url-input");
  const urlCheckEl = $("url-check");

  let selectedPay = "";
  let photoBlob = null;
  let objectUrl = null;
  let msalApp = null;
  let account = isProd ? null : { username: "demo@example.co.jp（見本）" };
  let saving = false;
  let dest = loadDest();

  // ---------- 小さな道具 ----------

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function stamp(d) {
    return (
      d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "_" +
      pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds())
    );
  }

  function isoStamp(d) {
    return (
      d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " +
      pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds())
    );
  }

  function parseMonth(name) {
    const m = MONTH_RE.exec(name || "");
    if (!m) return null;
    let year = parseInt(m[1], 10);
    if (year < 100) year += 2000;
    const month = parseInt(m[2], 10);
    return month >= 1 && month <= 12 ? { year: year, month: month } : null;
  }

  function monthFolderName(d) {
    return pad(d.getFullYear() % 100) + "年" + (d.getMonth() + 1) + "月経費報告";
  }

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function showStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.classList.remove("hidden", "error");
    if (isError) statusEl.classList.add("error");
  }

  function hideStatus() {
    statusEl.classList.add("hidden");
  }

  // ---------- 保存先（このスマホの中だけ） ----------

  function loadDest() {
    try {
      const raw = localStorage.getItem(DEST_KEY);
      const data = raw ? JSON.parse(raw) : null;
      if (data && data.driveId && data.parentId && data.person) return data;
    } catch (e) {
      /* 読めなければ未設定扱い */
    }
    return null;
  }

  function saveDest(value) {
    dest = value;
    try {
      localStorage.setItem(DEST_KEY, JSON.stringify(value));
    } catch (e) {
      showStatus("このスマホに保存先を記録できませんでした（プライベートブラウズでは記録できません）", true);
    }
    renderDest();
    updateConfirmButton();
  }

  function renderDest() {
    if (!dest) {
      destPathEl.textContent = "まだ保存先を選んでいません";
      destPathEl.classList.add("unset");
      btnPick.textContent = "保存先を選ぶ";
      return;
    }
    const parts = [dest.siteName, dest.parentName, monthFolderName(new Date()), dest.person].filter(Boolean);
    destPathEl.textContent = parts.join(" ＞ ");
    destPathEl.classList.remove("unset");
    btnPick.textContent = "保存先を選び直す";
  }

  // ---------- 画面の状態 ----------

  function updateChrome() {
    $("env-badge").textContent = isProd ? "本番" : "デモ環境";
    $("header-sub").textContent = isProd
      ? "撮影して御社の SharePoint に保存します"
      : "操作確認用です。画像は保存されません";
    $("demo-note").hidden = isProd;
    btnSave.textContent = isProd ? "SharePoint に保存" : "操作を確認する";
  }

  function updateLoginUi() {
    const loggedIn = !!(account && account.username);
    accountEl.textContent = loggedIn ? account.username : "未ログイン";
    btnLogin.hidden = loggedIn;
    btnLogout.hidden = !loggedIn || !isProd;
    btnPick.disabled = !loggedIn;
  }

  function updateConfirmButton() {
    const ready = !!(selectedPay && photoBlob);
    btnSave.disabled = !ready || !account || !dest || saving;
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

  // ---------- Microsoft ログイン ----------

  function scopes() {
    return ["User.Read", "Files.ReadWrite.All", "Sites.ReadWrite.All"];
  }

  async function initMsal() {
    if (!isProd) return;
    if (typeof msal === "undefined") throw new Error("Microsoft ログインの部品を読み込めませんでした");
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
      const silent = await msalApp.acquireTokenSilent({ account: account, scopes: scopes() });
      return silent.accessToken;
    } catch (err) {
      await msalApp.acquireTokenRedirect({ scopes: scopes(), account: account });
      throw err;
    }
  }

  // ---------- Graph（本番）／見本（デモ） ----------

  function GraphError(status, message) {
    this.status = status;
    this.message = message;
  }
  GraphError.prototype = Object.create(Error.prototype);

  async function graph(path, options) {
    if (!isProd) return demoGraph(path, options);
    const token = await getToken();
    const opts = options || {};
    const headers = Object.assign({ Authorization: "Bearer " + token }, opts.headers || {});
    let body = opts.body;
    if (body && !(body instanceof Blob) && typeof body !== "string") {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const res = await fetch(path.indexOf("https://") === 0 ? path : GRAPH + path, {
      method: opts.method || "GET",
      headers: headers,
      body: body,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new GraphError(res.status, "SharePoint 応答エラー " + res.status + ": " + text.slice(0, 160));
    }
    if (res.status === 204) return null;
    const ct = res.headers.get("content-type") || "";
    return ct.indexOf("json") >= 0 ? res.json() : null;
  }

  const DEMO = (function () {
    const persons = ["大木分", "池田分", "石村分＋オフィス関係＋税金"];
    const now = new Date();
    const months = [];
    for (let i = 2; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ id: "m" + i, name: monthFolderName(d), folder: {} });
    }
    const children = {
      root: [
        { id: "keihi", name: "経費", folder: {} },
        { id: "other", name: "その他の資料", folder: {} },
      ],
      keihi: months,
      other: [],
    };
    months.forEach(function (m) {
      children[m.id] = persons.map(function (p, i) {
        return { id: m.id + "-p" + i, name: p, folder: {} };
      });
    });
    const index = { root: { id: "root", name: "ドキュメント", parentId: "" } };
    Object.keys(children).forEach(function (pid) {
      children[pid].forEach(function (it) { index[it.id] = { id: it.id, name: it.name, parentId: pid }; });
    });
    return { children: children, index: index };
  })();

  function demoItem(id) {
    const it = DEMO.index[id];
    if (!it) throw new GraphError(404, "見本にはない場所です");
    return { id: it.id, name: it.name, folder: {}, parentReference: { driveId: "demo-drive", id: it.parentId } };
  }

  function demoFindByUrl(encoded) {
    let last = "";
    try {
      const b64 = encoded.replace(/^u!/, "").replace(/_/g, "/").replace(/-/g, "+");
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const u = new URL(new TextDecoder().decode(bytes));
      const p = u.searchParams.get("id") || u.pathname;
      last = decodeURIComponent(p).replace(/\/+$/, "").split("/").pop();
    } catch (e) {
      last = "";
    }
    if (/\.(pdf|xlsx?|docx?|jpe?g|png)$/i.test(last)) {
      return { id: "file", name: last, file: {}, parentReference: { driveId: "demo-drive", id: "keihi" } };
    }
    const hit = Object.keys(DEMO.index).map(function (k) { return DEMO.index[k]; })
      .find(function (it) { return it.name === last; });
    if (!hit) throw new GraphError(404, "見本にはない場所です");
    return demoItem(hit.id);
  }

  async function demoGraph(path) {
    await new Promise(function (r) { setTimeout(r, 150); });
    if (/^\/sites\?/.test(path)) {
      return { value: [{ id: "demo-site", displayName: "EMPAZY（見本）", webUrl: "" }] };
    }
    if (/^\/sites\/demo-site\/drives/.test(path)) {
      return { value: [{ id: "demo-drive", name: "ドキュメント" }] };
    }
    const m = /^\/drives\/demo-drive\/(?:root|items\/([^/]+))\/children/.exec(path);
    if (m) return { value: DEMO.children[m[1] || "root"] || [] };
    if (/^\/sites\/root/.test(path)) return { webUrl: "https://empazy-demo.sharepoint.com" };
    const one = /^\/drives\/demo-drive\/items\/([^/?]+)(\?|$)/.exec(path);
    if (one) return demoItem(one[1]);
    const sh = /^\/shares\/([^/]+)\//.exec(path);
    if (sh) return demoFindByUrl(sh[1]);
    throw new GraphError(404, "見本にはない場所です");
  }

  async function listChildFolders(driveId, itemId) {
    const base = itemId === "root"
      ? "/drives/" + driveId + "/root/children"
      : "/drives/" + driveId + "/items/" + itemId + "/children";
    let url = base + "?$select=id,name,folder&$top=200";
    const out = [];
    while (url) {
      const page = await graph(url);
      (page.value || []).forEach(function (it) {
        if (it.folder && it.name && it.name.charAt(0) !== ".") out.push(it);
      });
      url = page["@odata.nextLink"] || "";
    }
    out.sort(function (a, b) { return a.name.localeCompare(b.name, "ja"); });
    return out;
  }

  // ---------- 保存先を選ぶ画面 ----------

  const pick = { siteName: "", driveId: "", stack: [] };

  function openPicker() {
    if (!account) {
      showStatus("先に Microsoft でログインしてください", true);
      return;
    }
    picker.hidden = false;
    loadSites();
  }

  function closePicker() {
    picker.hidden = true;
  }

  function setPicker(title, hint) {
    pickerTitle.textContent = title;
    pickerHint.textContent = hint || "";
    pickerCrumbs.textContent = "";
    pickerList.textContent = "";
    pickerActions.textContent = "";
  }

  function addItem(label, sub, onClick, cls) {
    const btn = el("button", "pick-item" + (cls ? " " + cls : ""), label);
    btn.type = "button";
    if (sub) btn.appendChild(el("small", "", sub));
    btn.addEventListener("click", onClick);
    pickerList.appendChild(btn);
    return btn;
  }

  function pickerLoading(text) {
    pickerList.textContent = "";
    pickerList.appendChild(el("div", "pick-empty", text || "読み込み中…"));
  }

  function pickerError(err) {
    pickerList.textContent = "";
    pickerList.appendChild(el("div", "pick-empty", "読み込めませんでした。" + (err && err.message ? err.message : "")));
  }

  async function loadSites() {
    setPicker("サイトを選ぶ", "経費のフォルダがある SharePoint のサイトを選んでください");
    pickerLoading();
    try {
      let sites = [];
      try {
        const res = await graph("/sites?search=*&$select=id,displayName,webUrl&$top=50");
        sites = res.value || [];
      } catch (e) {
        sites = [];
      }
      if (!sites.length && isProd) {
        const res = await graph("/me/followedSites?$select=id,displayName,webUrl");
        sites = res.value || [];
      }
      pickerList.textContent = "";
      if (!sites.length) {
        pickerList.appendChild(el("div", "pick-empty", "サイトが見つかりません。下の「URLで指定」をお使いください。"));
        return;
      }
      sites.forEach(function (s) {
        addItem(s.displayName || s.name || "（名前なし）", "", function () { selectSite(s); });
      });
    } catch (err) {
      pickerError(err);
    }
  }

  async function selectSite(site) {
    pick.siteName = site.displayName || site.name || "";
    setPicker("ライブラリを選ぶ", "ふだん「ドキュメント」を使っていれば、それを選んでください");
    pickerLoading();
    try {
      const res = await graph("/sites/" + site.id + "/drives?$select=id,name,webUrl");
      const drives = res.value || [];
      if (drives.length === 1) {
        openDrive(drives[0]);
        return;
      }
      pickerList.textContent = "";
      addItem("← サイトの一覧に戻る", "", loadSites, "back");
      drives.forEach(function (d) {
        addItem(d.name, "", function () { openDrive(d); });
      });
    } catch (err) {
      pickerError(err);
    }
  }

  function openDrive(drive) {
    pick.driveId = drive.id;
    pick.stack = [{ id: "root", name: drive.name }];
    loadFolder();
  }

  async function loadFolder() {
    const current = pick.stack[pick.stack.length - 1];
    const here = parseMonth(current.name);
    setPicker(
      "1つ上のフォルダを選ぶ",
      here
        ? "ここは月のフォルダです。1つ上に戻って、月のフォルダが並んでいるフォルダを選んでください。"
        : "月のフォルダ（例：" + monthFolderName(new Date()) + "）が並んでいるフォルダまで進み、下のボタンを押してください。"
    );
    pickerCrumbs.textContent = [pick.siteName].concat(pick.stack.map(function (s) { return s.name; })).join(" ＞ ");
    pickerLoading();
    try {
      const folders = await listChildFolders(pick.driveId, current.id);
      pickerList.textContent = "";
      if (pick.stack.length > 1) {
        addItem("← 1つ上に戻る", "", function () { pick.stack.pop(); loadFolder(); }, "back");
      } else {
        addItem("← サイトの一覧に戻る", "", loadSites, "back");
      }
      const monthCount = folders.filter(function (f) { return parseMonth(f.name); }).length;
      if (!folders.length) pickerList.appendChild(el("div", "pick-empty", "この中にフォルダはありません"));
      folders.forEach(function (f) {
        const isMonth = !!parseMonth(f.name);
        addItem(f.name, isMonth ? "月のフォルダ" : "", function () {
          pick.stack.push({ id: f.id, name: f.name });
          loadFolder();
        }, isMonth ? "month" : "");
      });

      if (pick.stack.length > 1 && !here) {
        const use = el("button", "btn-primary", "このフォルダにする");
        use.type = "button";
        use.addEventListener("click", function () {
          if (!monthCount && !window.confirm("この中に月のフォルダが見当たりません。このフォルダでよろしいですか？")) return;
          choosePerson(pick.stack[pick.stack.length - 1], folders);
        });
        pickerActions.appendChild(use);
        pickerActions.appendChild(el("p", "hint",
          monthCount ? "月のフォルダが " + monthCount + " 件あります。" : "月のフォルダはまだありません。"));
      }
    } catch (err) {
      pickerError(err);
    }
  }

  async function choosePerson(parent, children) {
    setPicker("自分のフォルダを選ぶ", "月のフォルダの中にある、ご自分のフォルダを選んでください");
    pickerCrumbs.textContent = [pick.siteName].concat(pick.stack.map(function (s) { return s.name; })).join(" ＞ ");
    pickerLoading("フォルダ名を調べています…");
    try {
      const months = (children || [])
        .map(function (f) { return { f: f, ym: parseMonth(f.name) }; })
        .filter(function (x) { return x.ym; })
        .sort(function (a, b) { return (b.ym.year * 12 + b.ym.month) - (a.ym.year * 12 + a.ym.month); })
        .slice(0, 3);
      const names = {};
      for (const m of months) {
        const inner = await listChildFolders(pick.driveId, m.f.id);
        inner.forEach(function (p) { names[p.name] = true; });
      }
      pickerList.textContent = "";
      addItem("← フォルダ選びに戻る", "", loadFolder, "back");
      const list = Object.keys(names).sort(function (a, b) { return a.localeCompare(b, "ja"); });
      if (!list.length) pickerList.appendChild(el("div", "pick-empty", "見つかりませんでした。下に名前を入力してください。"));
      list.forEach(function (name) {
        addItem(name, "", function () { finishPick(parent, name); });
      });

      const input = el("input", "inline-input");
      input.type = "text";
      input.placeholder = "一覧にないとき：自分のフォルダ名（例：池田分）";
      const ok = el("button", "btn-secondary", "この名前にする");
      ok.type = "button";
      ok.addEventListener("click", function () {
        const name = input.value.trim();
        if (!name || /[\\/:*?"<>|#%]/.test(name)) {
          window.alert("フォルダ名を入力してください（記号 \\ / : * ? \" < > | # % は使えません）");
          return;
        }
        finishPick(parent, name);
      });
      pickerActions.appendChild(input);
      pickerActions.appendChild(ok);
    } catch (err) {
      pickerError(err);
    }
  }

  function finishPick(parent, person) {
    saveDest({
      driveId: pick.driveId,
      parentId: parent.id,
      parentName: parent.name,
      siteName: pick.siteName,
      person: person,
    });
    closePicker();
    showStatus("保存先を記録しました（このスマホの中だけに記録しています）", false);
  }

  // URL での指定（一覧に出ないとき）
  function shareId(url) {
    const bytes = new TextEncoder().encode(url);
    let bin = "";
    bytes.forEach(function (b) { bin += String.fromCharCode(b); });
    return "u!" + btoa(bin).replace(/=+$/, "").replace(/\//g, "_").replace(/\+/g, "-");
  }

  async function resolveByPath(url) {
    const u = new URL(url);
    const idParam = u.searchParams.get("id") || u.searchParams.get("RootFolder");
    const serverPath = idParam ? decodeURIComponent(idParam) : decodeURIComponent(u.pathname);
    const m = /^(\/(?:sites|teams|personal)\/[^/]+)\/([^/]+)\/?(.*)$/.exec(serverPath);
    if (!m) throw new Error("URL からフォルダの場所を読み取れませんでした");
    const sitePath = m[1];
    const library = m[2];
    const rest = m[3].replace(/\/Forms\/.*$/, "");
    const site = await graph("/sites/" + u.hostname + ":" + encodeURI(sitePath));
    const drives = (await graph("/sites/" + site.id + "/drives?$select=id,name,webUrl")).value || [];
    const drive = drives.find(function (d) {
      try {
        return decodeURIComponent(new URL(d.webUrl).pathname).replace(/\/$/, "") === sitePath + "/" + library;
      } catch (e) {
        return false;
      }
    });
    if (!drive) throw new Error("ライブラリが見つかりませんでした");
    const item = rest
      ? await graph("/drives/" + drive.id + "/root:/" + rest.split("/").map(encodeURIComponent).join("/"))
      : await graph("/drives/" + drive.id + "/root");
    item.parentReference = item.parentReference || { driveId: drive.id };
    item.parentReference.driveId = drive.id;
    return { item: item, siteName: site.displayName || "" };
  }

  // URL の見た目だけで分かる間違いを調べる（通信なし）
  function checkUrlText(raw) {
    const text = (raw || "").trim();
    if (!text) return null;
    if (/\s/.test(text)) return { level: "ng", msg: "途中に空白や改行が入っています。URL だけを貼り付けてください。" };
    if (/^http:\/\//i.test(text)) return { level: "ng", msg: "http:// で始まっています。SharePoint の URL は https:// で始まります。" };
    if (!/^https:\/\//i.test(text)) return { level: "ng", msg: "https:// から始まるアドレスを貼り付けてください。分からないときは、下の「URL が分からないとき」をご覧ください。" };
    let u;
    try {
      u = new URL(text);
    } catch (e) {
      return { level: "ng", msg: "URL の形になっていません。途中で切れていないか確認してください。" };
    }
    const host = u.hostname.toLowerCase();
    if (host === "himawasa-sync.com" || host.endsWith(".himawasa-sync.com")) {
      return { level: "ng", msg: "これはこのアプリや手順ページの URL です。御社の SharePoint で経費のフォルダを開いたときの URL を貼り付けてください。" };
    }
    if (host.indexOf("teams.microsoft.com") >= 0 || host.indexOf("teams.live.com") >= 0) {
      return { level: "ng", msg: "これは Teams の URL です。Teams の「ファイル」で「SharePoint で開く」を選び、開いた画面の URL を貼り付けてください。" };
    }
    if (/(^|\.)(office\.com|microsoft365\.com|live\.com|outlook\.com)$/.test(host)) {
      return { level: "ng", msg: "これは Microsoft 365 の入口の URL です。SharePoint で経費のフォルダを開いたときの URL（途中に sharepoint.com が入ります）を貼り付けてください。" };
    }
    if (!host.endsWith(".sharepoint.com")) {
      return { level: "ng", msg: "SharePoint の URL ではないようです（" + host + "）。正しい URL は途中に sharepoint.com が入ります。" };
    }
    let where = u.pathname;
    try {
      where = decodeURIComponent(u.searchParams.get("id") || u.pathname);
    } catch (e) {
      /* そのまま使う */
    }
    if (/\/_layouts\/15\/(Doc|WopiFrame)\d*\.aspx/i.test(u.pathname) || /\.(pdf|xlsx?|docx?|pptx?|jpe?g|png|heic)$/i.test(where)) {
      return { level: "ng", msg: "これはファイル（Excel や PDF など）の URL です。ファイルではなく、フォルダを開いたときの URL を貼り付けてください。" };
    }
    if (host.indexOf("-my.sharepoint.com") >= 0) {
      return { level: "warn", msg: "これは個人用の OneDrive の URL のようです。会社の経費のフォルダ（SharePoint）で合っているか確認してください。" };
    }
    if (/\/SitePages\//i.test(u.pathname) || /viewlsts\.aspx/i.test(u.pathname) || /^\/(sites|teams)\/[^/]+\/?$/.test(u.pathname) || u.pathname === "/") {
      return { level: "warn", msg: "サイトのトップページの URL のようです。経費のフォルダを開いてから、その画面の URL を貼り付けてください。" };
    }
    const last = where.replace(/\/+$/, "").split("/").pop();
    if (parseMonth(last)) {
      return { level: "warn", msg: "月のフォルダ（" + last + "）の URL です。このまま進めると、その1つ上のフォルダを保存先にします。" };
    }
    return { level: "ok", msg: "SharePoint の URL の形です。ボタンを押すと、フォルダを確認します。" };
  }

  function showUrlCheck(result) {
    if (!result) {
      urlCheckEl.hidden = true;
      return;
    }
    urlCheckEl.hidden = false;
    urlCheckEl.className = "url-check " + result.level;
    urlCheckEl.textContent = (result.level === "ok" ? "○ " : result.level === "warn" ? "！ " : "× ") + result.msg;
  }

  let tenantHost = null;
  async function getTenantHost() {
    if (tenantHost !== null) return tenantHost;
    try {
      const rootSite = await graph("/sites/root?$select=webUrl");
      tenantHost = new URL(rootSite.webUrl).hostname.toLowerCase();
    } catch (e) {
      tenantHost = "";
    }
    return tenantHost;
  }

  function urlFail(msg) {
    showUrlCheck({ level: "ng", msg: msg });
    window.alert(msg);
    if (pick.driveId) loadFolder(); else loadSites();
  }

  async function useUrl() {
    const url = (urlInput.value || "").trim();
    const first = checkUrlText(url) || { level: "ng", msg: "URL を貼り付けてください。分からないときは、下の「URL が分からないとき」をご覧ください。" };
    showUrlCheck(first);
    if (first.level === "ng") {
      window.alert(first.msg);
      return;
    }

    // ログインした会社の SharePoint かどうか
    const mine = await getTenantHost();
    const host = new URL(url).hostname.toLowerCase();
    if (mine && host !== mine && host !== mine.replace(".sharepoint.com", "-my.sharepoint.com")) {
      urlFail("ログインした会社の SharePoint（" + mine + "）とは別の場所の URL です（" + host + "）。URL を確認してください。");
      return;
    }

    setPicker("URL を確認しています", "");
    pickerLoading();
    let item;
    let siteName = "";
    try {
      try {
        item = await graph("/shares/" + shareId(url) + "/driveItem?$select=id,name,folder,file,parentReference");
      } catch (e) {
        const r = await resolveByPath(url);
        item = r.item;
        siteName = r.siteName;
      }
    } catch (err) {
      const st = err && err.status;
      urlFail(
        st === 403 || st === 401
          ? "この URL のフォルダを開く権限がないようです。いつも使っている経費のフォルダの URL か確認してください。"
          : "この URL のフォルダが見つかりませんでした。URL が途中で切れていないか、フォルダの名前が変わっていないか確認してください。"
      );
      return;
    }

    try {
      if (!item.folder) {
        urlFail("これはファイルの URL です。ファイルではなく、フォルダを開いたときの URL を貼り付けてください。");
        return;
      }
      const driveId = item.parentReference.driveId;
      const notes = [];
      const parentOf = async function (it) {
        if (!it.parentReference || !it.parentReference.id || it.parentReference.id === "root") return null;
        return graph("/drives/" + driveId + "/items/" + it.parentReference.id + "?$select=id,name,folder,parentReference");
      };
      // 月のフォルダ → 1つ上へ。自分のフォルダ（月のフォルダの中）→ 2つ上へ
      if (parseMonth(item.name)) {
        const up = await parentOf(item);
        if (up) {
          notes.push("月のフォルダ（" + item.name + "）の URL でしたので、1つ上の「" + up.name + "」を保存先にしました。");
          item = up;
        }
      } else {
        const up = await parentOf(item);
        if (up && parseMonth(up.name)) {
          const top = await parentOf(up);
          if (top) {
            notes.push("月のフォルダの中（" + item.name + "）の URL でしたので、「" + top.name + "」を保存先にしました。");
            item = top;
          }
        }
      }
      const children = await listChildFolders(driveId, item.id);
      const monthCount = children.filter(function (f) { return parseMonth(f.name); }).length;
      if (!monthCount) {
        const go = window.confirm(
          "「" + item.name + "」の中に、月のフォルダ（例：" + monthFolderName(new Date()) + "）が見つかりません。\n" +
          "別のフォルダの URL かもしれません。\n\nこのフォルダで続けますか？"
        );
        if (!go) {
          showUrlCheck({ level: "warn", msg: "月のフォルダが並んでいるフォルダを開いて、その URL を貼り付け直してください。" });
          if (pick.driveId) loadFolder(); else loadSites();
          return;
        }
      }
      pick.driveId = driveId;
      pick.siteName = siteName;
      pick.stack = [{ id: "root", name: "…" }, { id: item.id, name: item.name }];
      showUrlCheck({
        level: "ok",
        msg: (notes.length ? notes.join(" ") + " " : "") +
          "フォルダ「" + item.name + "」を確認しました（月のフォルダ " + monthCount + " 件）。続けて自分のフォルダを選んでください。",
      });
      urlInput.value = "";
      choosePerson({ id: item.id, name: item.name }, children);
    } catch (err) {
      pickerError(err);
    }
  }

  // ---------- 保存 ----------

  async function ensureFolder(driveId, parentId, name, matchMonth) {
    const children = await listChildFolders(driveId, parentId);
    const found = children.find(function (f) {
      if (f.name === name) return true;
      if (!matchMonth) return false;
      const a = parseMonth(f.name);
      return a && a.year === matchMonth.year && a.month === matchMonth.month;
    });
    if (found) return found.id;
    try {
      const created = await graph("/drives/" + driveId + "/items/" + parentId + "/children", {
        method: "POST",
        body: { name: name, folder: {}, "@microsoft.graph.conflictBehavior": "fail" },
      });
      return created.id;
    } catch (err) {
      if (err.status === 409) {
        const again = await listChildFolders(driveId, parentId);
        const hit = again.find(function (f) { return f.name === name; });
        if (hit) return hit.id;
      }
      throw err;
    }
  }

  async function shrinkImage(file) {
    try {
      let source;
      if (window.createImageBitmap) {
        source = await createImageBitmap(file, { imageOrientation: "from-image" });
      } else {
        source = await new Promise(function (resolve, reject) {
          const img = new Image();
          img.onload = function () { resolve(img); };
          img.onerror = reject;
          img.src = objectUrl;
        });
      }
      const w = source.width;
      const h = source.height;
      const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise(function (resolve) { canvas.toBlob(resolve, "image/jpeg", 0.85); });
      return blob || file;
    } catch (e) {
      return file;
    }
  }

  async function uploadReceipt(imageBlob, payCode, memo) {
    const now = new Date();
    const base = "receipt_" + stamp(now) + "_" + payCode;
    const monthName = monthFolderName(now);
    const monthId = await ensureFolder(dest.driveId, dest.parentId, monthName,
      { year: now.getFullYear(), month: now.getMonth() + 1 });
    const personId = await ensureFolder(dest.driveId, monthId, dest.person, null);
    const target = "/drives/" + dest.driveId + "/items/" + personId + ":/";

    const jpeg = await shrinkImage(imageBlob);
    await graph(target + encodeURIComponent(base + ".jpg") + ":/content", {
      method: "PUT",
      headers: { "Content-Type": "image/jpeg" },
      body: jpeg,
    });
    const meta = {
      payment_type: PAY_LABELS[payCode] || payCode,
      payment_code: payCode,
      captured_at: isoStamp(now),
      memo: memo || "",
    };
    await graph(target + encodeURIComponent(base + ".json") + ":/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(meta, null, 2),
    });
    return monthName + " ＞ " + dest.person + " ＞ " + base + ".jpg";
  }

  // ---------- 操作 ----------

  payButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      payButtons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      selectedPay = btn.dataset.pay;
      updateConfirmButton();
    });
  });

  btnCapture.addEventListener("click", function () {
    if (!selectedPay) {
      showStatus("先に支払区分を選んでください", true);
      return;
    }
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
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

  btnClear.addEventListener("click", function () {
    clearPreview();
    memoEl.value = "";
    hideStatus();
    updateConfirmButton();
  });

  btnLogin.addEventListener("click", async function () {
    if (!isProd) {
      showStatus("デモ環境です。本番では会社の Microsoft アカウントでログインします。", false);
      return;
    }
    if (!msalApp) {
      showStatus("Microsoft ログインの準備ができていません", true);
      return;
    }
    await msalApp.loginRedirect({ scopes: scopes() });
  });

  btnLogout.addEventListener("click", async function () {
    if (!msalApp) return;
    await msalApp.logoutRedirect({ account: account || undefined });
  });

  btnPick.addEventListener("click", openPicker);
  $("btn-pick-close").addEventListener("click", closePicker);
  $("btn-url").addEventListener("click", useUrl);
  urlInput.addEventListener("input", function () { showUrlCheck(checkUrlText(urlInput.value)); });

  btnSave.addEventListener("click", async function () {
    if (!selectedPay || !photoBlob || !dest || saving) return;

    if (!isProd) {
      showStatus(
        "操作確認OKです。デモ環境のため、画像は保存されていません。本番では「" +
          destPathEl.textContent + "」へ保存します。",
        false
      );
      clearPreview();
      memoEl.value = "";
      updateConfirmButton();
      return;
    }

    saving = true;
    updateConfirmButton();
    showStatus("SharePoint に保存しています…", false);
    try {
      const where = await uploadReceipt(photoBlob, selectedPay, memoEl.value.trim());
      showStatus("保存しました: " + where, false);
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
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/empazy-expense/sw.js").catch(function () {});
    });
  }

  updateChrome();
  renderDest();
  initMsal()
    .catch(function (err) {
      showStatus("ログイン初期化エラー: " + (err && err.message ? err.message : err), true);
    })
    .then(function () {
      updateLoginUi();
      updateConfirmButton();
    });
})();
