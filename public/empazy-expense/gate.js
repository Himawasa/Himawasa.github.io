/**
 * 経費撮影 PWA — 入口（ID とパスワード）
 *
 * ページに入る前に、会社で1組の ID とパスワードを聞く「ゆるい入口」。
 * - パスワードそのものは置かず、PBKDF2 で作った暗号のような値（ハッシュ）だけを config.js に置く
 * - 一度入れたら、このブラウザで cfg.days 日間は聞かない（localStorage に期限だけ記録）
 * - iPhone は1文字目を勝手に大文字にするので、ID・パスワードとも小文字にそろえてから比べる
 * - 本当の守りは Microsoft のログイン（写真の保存・SharePoint）。ここは知らない人を入口で止めるためのもの
 *
 * app.js は window.EmpazyGate.ready が済んでから動き出す（入口の前に Microsoft へ飛ばないため）
 */
(function () {
  "use strict";

  const cfg = (window.EMPAZY_CONFIG || {}).gate || null;
  const KEY = "empazy.gate.v1";
  let open;
  const ready = new Promise(function (resolve) { open = resolve; });
  window.EmpazyGate = { ready: ready };

  // 設定が無ければ入口なし
  if (!cfg || !cfg.hash || !cfg.salt) {
    open();
    return;
  }

  const days = cfg.days || 30;
  // 設定（ID・パスワード）を変えたら、覚えていた記録は使わない
  const mark = cfg.hash.slice(0, 12);

  function remembered() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) || "null");
      return !!(d && d.h === mark && typeof d.until === "number" && d.until > Date.now());
    } catch (e) {
      return false;
    }
  }

  if (remembered()) {
    open();
    return;
  }

  document.documentElement.classList.add("gate-locked");

  const form = document.getElementById("gate-form");
  const idEl = document.getElementById("gate-id");
  const pwEl = document.getElementById("gate-pw");
  const errEl = document.getElementById("gate-err");
  const btn = document.getElementById("gate-btn");
  const daysEl = document.getElementById("gate-days");
  if (daysEl) daysEl.textContent = String(days);

  function showError(text) {
    errEl.textContent = text;
    errEl.hidden = !text;
  }

  async function hashOf(id, pw) {
    const enc = new TextEncoder();
    const base = await crypto.subtle.importKey("raw", enc.encode(id + "\n" + pw), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt: enc.encode(cfg.salt), iterations: cfg.iterations || 150000 },
      base,
      256
    );
    return Array.from(new Uint8Array(bits)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  form.addEventListener("submit", async function (ev) {
    ev.preventDefault();
    const id = (idEl.value || "").trim().toLowerCase();
    const pw = (pwEl.value || "").trim().toLowerCase();
    if (!id || !pw) {
      showError("ID とパスワードを入れてください。");
      return;
    }
    if (!window.crypto || !crypto.subtle) {
      showError("このブラウザでは確認できません。Safari か Chrome で開いてください。");
      return;
    }
    btn.disabled = true;
    showError("");
    try {
      const h = await hashOf(id, pw);
      if (h !== cfg.hash) {
        // 続けて何度も試されにくいよう、少し待ってから知らせる
        await new Promise(function (r) { setTimeout(r, 1200); });
        showError("ID かパスワードが違います。もう一度入れてください。");
        pwEl.value = "";
        pwEl.focus();
        return;
      }
      try {
        localStorage.setItem(KEY, JSON.stringify({ h: mark, until: Date.now() + days * 24 * 60 * 60 * 1000 }));
      } catch (e) {
        /* プライベートブラウズなどで記録できなくても、今回は入れる（次回また聞く） */
      }
      pwEl.value = "";
      document.documentElement.classList.remove("gate-locked");
      window.scrollTo(0, 0);
      open();
    } catch (e) {
      showError("確認できませんでした。画面を読み込み直して、もう一度お試しください。");
    } finally {
      btn.disabled = false;
    }
  });
})();
