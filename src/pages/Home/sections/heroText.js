// トップ画面のいちばん上の文章と HTML。画面（TemasuiHero.jsx）と、最初の HTML（vite.config.js が index.html に埋め込む静的な見出し）の両方がここを読む。
// 2か所に同じ文を書くと食い違うので、文章はここだけで直す。
// 注意：このファイルは vite.config.js（Node.js の環境）からも直接 import される。React の Hooks・JSX・CSS の import を書くとビルドが止まる。
// ここに書いてよいのは、ただの定数と文字列を作る関数だけ。

// 2026-10-04 トップを「てますい」1本の話に作り直した（下書き：HiMaWaSa-Sync-3007/docs/seo/トップ作り直し_下書き_20261004.html）
export const TEMASUI_HERO = {
  kicker: '介護・病院・工場・中小企業・士業の',
  name: 'てますい',
  tagline: '書く手間が、すいすい減っていく。',
  lead: 'スマホに向かって話すか、短いメモを入れるだけで、日報や介護記録の下書きがすぐに出来上がります。',
  chips: ['ダウンロード不要', '🎤 話すだけ（外国語も日本語に）', '月1万円（定額）', '1か月無料'],
  ctaPrimary: { href: '/temasui/start/', label: '1か月無料で試す' },
  ctaSecondary: { href: '#versions', label: '登録なしで試す' },
  note: '無料期間が終わっても、自動で料金がかかることはありません。運営：HiMaWaSa Sync',
  shot: { src: '/home-temasui-screen.webp', width: 480, height: 1039, alt: 'てますいの画面。「様子」と「対応」に短いメモを入れて「下書きを作る」を押すと、介護記録の下書きができている' },
}

// ここから下の HERO・PHRASES は、前のトップ（Hero.jsx・今は使っていない）用。Hero.jsx を消すときに一緒に消す
export const HERO = {
  badge: '毎月の手作業を、今のExcelのまま。',
  titleStatic: '今のExcelのまま、',
  titleFull: '今のExcelのまま、現場の手作業を自動化。',
  sub: '介護・医療、士業、工場、中小企業の現場で毎日残る手作業を、今お使いのExcelややり方のまま自動化します。',
  ctaPrimary: 'まずは相談してみる（無料）',
  ctaSecondary: '改善事例を見る',
  micro: '事前の準備はいりません。オンライン（30分）またはメールでお気軽にご相談いただけます。',
  trust: ['現場 45件以上', 'シフト 5時間→3分', '請求 半日→0分', '今のExcelのまま'],
  paths: [
    { href: '/for/pro', label: '士業の方' },
    { href: '/for/care', label: '介護・医療の方' },
    { href: '/for/biz', label: '中小企業の方' },
    { href: '/for/factory', label: '工場の方' },
  ],
}
export const PHRASES = [
  '毎月の手作業を、もっと短く。',
  '現場の事務を低価格で自動化。',
  '始められます。',
]

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// トップのいちばん上の HTML。TemasuiHero.jsx はこれをそのまま画面に出す（dangerouslySetInnerHTML）ので、
// JavaScript が動く前と後で、文字も形も1文字も違わない（ずれ・ちらつきが起きない）。中身は上の定数だけで、外から来る値は入らない
export function heroStaticHtml() {
  const h = TEMASUI_HERO
  const chips = h.chips.map((c) => `<li>${esc(c)}</li>`).join('')
  return [
    '<section class="th-hero" id="home"><div class="container th-hero-inner"><div class="th-hero-text">',
    `<p class="th-kicker">${esc(h.kicker)}</p>`,
    `<h1 class="th-title"><span class="th-name">${esc(h.name)}</span><span class="th-tagline">${esc(h.tagline)}</span></h1>`,
    `<p class="th-lead">${esc(h.lead)}</p>`,
    `<ul class="th-chips">${chips}</ul>`,
    `<div class="th-cta"><a href="${esc(h.ctaPrimary.href)}" class="btn-yellow th-btn">${esc(h.ctaPrimary.label)}</a><a href="${esc(h.ctaSecondary.href)}" class="th-btn-sub">${esc(h.ctaSecondary.label)}</a></div>`,
    `<p class="th-note">${esc(h.note)}</p>`,
    '</div>',
    `<div class="th-hero-shot"><img src="${esc(h.shot.src)}" alt="${esc(h.shot.alt)}" width="${h.shot.width}" height="${h.shot.height}" fetchpriority="high" /></div>`,
    '</div></section>',
  ].join('')
}
