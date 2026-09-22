/* 経費撮影PWA — Service Worker
 * 画面ファイルはネット優先（更新がすぐ届く）。つながらないときだけ保存済みを出す。
 * 画面ファイルを変えたら CACHE の版名を上げる。
 */
const CACHE = 'empazy-expense-v10';
const ASSETS = [
  '/empazy-expense/',
  '/empazy-expense/index.html',
  '/empazy-expense/app.css',
  '/empazy-expense/app.js',
  '/empazy-expense/config.js',
  '/empazy-expense/manifest.webmanifest',
  '/empazy-expense/icons/icon.svg',
  '/empazy-expense/vendor/msal-browser-3.30.0.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Microsoft ログインや SharePoint への通信には関わらない
  if (url.origin !== self.location.origin || !url.pathname.startsWith('/empazy-expense/')) return;
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match('/empazy-expense/')))
  );
});
