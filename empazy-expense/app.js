/**
 * 経費撮影 PWA サンプル
 * 本番では Microsoft ログイン → SharePoint へアップロード
 * このサンプルはブラウザ内に保存（デモ）
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'empazy_expense_demo_v1';
  const payButtons = document.querySelectorAll('.pay-btn');
  const fileInput = document.getElementById('photo-input');
  const btnCapture = document.getElementById('btn-capture');
  const btnSave = document.getElementById('btn-save');
  const btnClear = document.getElementById('btn-clear');
  const previewImg = document.getElementById('preview');
  const previewWrap = document.getElementById('preview-wrap');
  const statusEl = document.getElementById('status');
  const memoEl = document.getElementById('memo');
  const recentList = document.getElementById('recent-list');

  let selectedPay = '';
  let currentBlob = null;
  let currentDataUrl = null;

  function showStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.classList.remove('hidden', 'error');
    if (isError) statusEl.classList.add('error');
  }

  function hideStatus() {
    statusEl.classList.add('hidden');
  }

  function loadEntries() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  function renderRecent() {
    const entries = loadEntries().slice(0, 8);
    if (!entries.length) {
      recentList.innerHTML = '<p class="hint">まだ保存がありません</p>';
      return;
    }
    recentList.innerHTML = entries
      .map((e) => {
        const when = new Date(e.at).toLocaleString('ja-JP');
        return `
          <div class="list-item">
            <img src="${e.thumb}" alt="" />
            <div>
              <strong>${e.payLabel}</strong><br>
              ${when}<br>
              <span class="hint">${e.note || 'メモなし'}</span>
            </div>
          </div>`;
      })
      .join('');
  }

  function updateSaveButton() {
    btnSave.disabled = !selectedPay || !currentBlob;
  }

  payButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      payButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      selectedPay = btn.dataset.pay;
      updateSaveButton();
    });
  });

  btnCapture.addEventListener('click', () => {
    if (!selectedPay) {
      showStatus('先に支払区分を選んでください', true);
      return;
    }
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showStatus('画像ファイルを選んでください', true);
      return;
    }
    currentBlob = file;
    const reader = new FileReader();
    reader.onload = () => {
      currentDataUrl = reader.result;
      previewImg.src = currentDataUrl;
      previewWrap.hidden = false;
      hideStatus();
      updateSaveButton();
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  });

  btnClear.addEventListener('click', () => {
    currentBlob = null;
    currentDataUrl = null;
    previewImg.removeAttribute('src');
    previewWrap.hidden = true;
    memoEl.value = '';
    hideStatus();
    updateSaveButton();
  });

  btnSave.addEventListener('click', async () => {
    if (!selectedPay || !currentDataUrl) return;

    const payLabel =
      document.querySelector(`.pay-btn[data-pay="${selectedPay}"]`)?.textContent?.trim() ||
      selectedPay;

    // デモ：SharePoint の代わりにブラウザ内へ保存
    const thumb = await makeThumb(currentDataUrl, 120);
    const entries = loadEntries();
    entries.unshift({
      id: Date.now(),
      pay: selectedPay,
      payLabel,
      note: memoEl.value.trim(),
      at: new Date().toISOString(),
      thumb,
    });
    saveEntries(entries.slice(0, 20));
    renderRecent();

    showStatus(
      'デモ保存しました。このサンプルではブラウザ内のみ。本番は Microsoft ログイン後、SharePoint の経費フォルダへ保存します。',
      false
    );

    currentBlob = null;
    currentDataUrl = null;
    previewWrap.hidden = true;
    memoEl.value = '';
    updateSaveButton();
  });

  function makeThumb(dataUrl, maxSize) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  }

  // Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/empazy-expense/sw.js').catch(() => {});
    });
  }

  renderRecent();
  updateSaveButton();
})();
