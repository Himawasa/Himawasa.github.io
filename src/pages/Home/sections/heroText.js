// トップ画面（Hero）の文章。画面（Hero.jsx）と、最初の HTML（vite.config.js が index.html に埋め込む静的な見出し）の両方がここを読む。
// 2か所に同じ文を書くと食い違うので、文章はここだけで直す。

export const HERO = {
  badge: '毎月の手作業を、今のExcelのまま。',
  titleStatic: '今のExcelのまま、',
  titleFull: '今のExcelのまま、現場の手作業を自動化。',
  sub: '介護・医療、士業、工場、中小企業の現場で毎日残る手作業を、今お使いのExcelややり方のまま自動化します。',
  ctaPrimary: 'まずは相談してみる（無料）',
  ctaSecondary: '改善事例を見る',
  micro: '事前の準備はいりません。オンライン（30分）またはメールでお気軽にご相談いただけます。',
  trust: ['現場 45件以上', 'シフト 5時間→3分', '請求 半日→0分', '今のExcelのまま'],
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// JavaScript を読み終わる前に出しておく、トップ画面の静的な HTML。
// 見た目の class は Hero.jsx と同じものを使う（CSS は共通）。React が起動したら、同じ内容の画面に置き換わる。
export function heroStaticHtml() {
  const trust = HERO.trust.map((t) => `<span class="hero-trust-item">${esc(t)}</span>`).join('<span class="hero-trust-sep">·</span>')
  return [
    '<section class="hero" id="home"><div class="hero-content"><div class="hero-left">',
    `<div class="hero-logo-wrap"><img src="/logo-160.png" alt="HiMaWaSa Sync" class="hero-logo-img" width="36" height="34" fetchpriority="high" /><span class="hero-logo-text">HiMaWaSa Sync</span></div>`,
    `<div class="hero-badge"><span class="hero-badge-dot"></span>${esc(HERO.badge)}</div>`,
    `<h1 class="hero-title"><span class="hero-title-static">${esc(HERO.titleStatic)}</span><span class="hero-title-typing">現場の手作業を自動化。</span></h1>`,
    `<p class="hero-sub">${esc(HERO.sub)}</p>`,
    `<div class="hero-cta"><a href="/contact" class="btn-hero-primary">${esc(HERO.ctaPrimary)}</a><a href="/works" class="btn-hero-secondary">${esc(HERO.ctaSecondary)}</a></div>`,
    `<p class="hero-micro">${esc(HERO.micro)}</p>`,
    `<div class="hero-trust">${trust}</div>`,
    '</div></div></section>',
  ].join('')
}
