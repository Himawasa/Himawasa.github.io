/* 経費撮影PWA — Service Worker（移転のあとの片付け用・2026-10-31）
 * アプリは https://empazy-inc.digisapo-dx.com/app/ へ移転した。
 * 古い Service Worker がこの版に入れ替わったら、保存済みの画面ファイルを全部消し、自分の登録も外す。
 * 開いている画面は読み込み直し、移転のお知らせのページ（index.html）からすぐ移転先へ移る。
 * fetch は扱わない（すべてネットから取る）。
 */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => Promise.all(clients.map((c) => c.navigate(c.url).catch(() => {}))))
  );
});
