import { heroStaticHtml } from './heroText'

/**
 * トップのいちばん上（てますい）。2026-10-04 作り直し。
 * 中身は heroText.js の heroStaticHtml() と同じ HTML をそのまま出す。最初の HTML（JS が動く前）と
 * React が起動したあとで、文字も形も同じになる（置き換わる瞬間にずれない・ちらつかない）。
 * 動きは付けない（表示を速くするため）。リンク先は てますい の紹介（素の HTML）なので <a> でよい。
 */
const html = heroStaticHtml()

export default function TemasuiHero() {
  // heroStaticHtml() の中身は heroText.js の定数だけでできていて、外から来る値は入らない
  return <div className="th-hero-wrap" dangerouslySetInnerHTML={{ __html: html }} />
}
