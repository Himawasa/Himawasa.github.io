/**
 * 経費撮影 PWA デモ
 * 操作確認のみ。画像はサーバーにもブラウザにも保存しない。
 */
(function () {
  'use strict';

  const payButtons = document.querySelectorAll('.pay-btn');
  const fileInput = document.getElementById('photo-input');
  const btnCapture = document.getElementById('btn-capture');
  const btnSave = document.getElementById('btn-save');
  const btnClear = document.getElementById('btn-clear');
  const previewImg = document.getElementById('preview');
  const previewWrap = document.getElementById('preview-wrap');
  const statusEl = document.getElementById('status');
  const memoEl = document.getElementById('memo');

  let selectedPay = '';
  let hasPreview = false;
  let objectUrl = null;

  function showStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.classList.remove('hidden', 'error');
    if (isError) statusEl.classList.add('error');
  }

  function hideStatus() {
    statusEl.classList.add('hidden');
  }

  function clearPreview() {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
    hasPreview = false;
    previewImg.removeAttribute('src');
    previewWrap.hidden = true;
  }

  function updateConfirmButton() {
    btnSave.disabled = !selectedPay || !hasPreview;
  }

  payButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      payButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      selectedPay = btn.dataset.pay;
      updateConfirmButton();
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
    clearPreview();
    objectUrl = URL.createObjectURL(file);
    previewImg.src = objectUrl;
    previewWrap.hidden = false;
    hasPreview = true;
    hideStatus();
    updateConfirmButton();
    fileInput.value = '';
  });

  btnClear.addEventListener('click', () => {
    clearPreview();
    memoEl.value = '';
    hideStatus();
    updateConfirmButton();
  });

  btnSave.addEventListener('click', () => {
    if (!selectedPay || !hasPreview) return;
    const payLabel =
      document.querySelector(`.pay-btn[data-pay="${selectedPay}"]`)?.querySelector('small')?.previousSibling?.textContent?.trim() ||
      document.querySelector(`.pay-btn[data-pay="${selectedPay}"]`)?.childNodes[0]?.textContent?.trim() ||
      selectedPay;

    showStatus(
      '操作確認OKです。デモ環境のため、画像は保存されていません。本番では Microsoft ログイン後、SharePoint の経費フォルダへ保存します。',
      false
    );

    // プレビューもすぐ消して、端末に残さない
    clearPreview();
    memoEl.value = '';
    updateConfirmButton();
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/empazy-expense/sw.js').catch(() => {});
    });
  }

  updateConfirmButton();
})();
