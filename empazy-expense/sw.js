/* 経費撮影PWA — 最小の Service Worker（ホーム画面追加用） */
const CACHE = 'empazy-expense-v2';
const ASSETS = [
  '/empazy-expense/',
  '/empazy-expense/index.html',
  '/empazy-expense/app.css',
  '/empazy-expense/app.js',
  '/empazy-expense/manifest.webmanifest',
  '/empazy-expense/icons/icon.svg',
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
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
