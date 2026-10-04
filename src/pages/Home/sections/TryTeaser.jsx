import { Link } from 'react-router-dom'
import { TRY_APPS } from '../../../seo/site'

// 体験アプリは4つともトップから行けるようにする（以前は先頭3つだけで SukkiriSync が出ていなかった）
const teasers = TRY_APPS

const GUIDES = {
  MochiSync: { href: '/Guide/mochisync2/', label: '使い方・画面を見る' },
}

export default function TryTeaser() {
  return (
    <section className="try-teaser" id="try-teaser">
      <div className="container">
        <div className="section-header">
          <span className="section-label">FREE TOOLS</span>
          <h2 className="section-title">てますいの無料ツール（登録なし）</h2>
          <p className="section-desc">ご相談の前に、まずは気軽にお試しいただけます。登録不要・無料です。</p>
        </div>
        <div className="try-teaser-grid">
          {teasers.map(({ icon, name, desc, href, btn }) => {
            const guide = GUIDES[name]
            return (
              <div key={name} className="try-teaser-card">
                <span className="try-teaser-icon" aria-hidden="true">{icon}</span>
                <span className="try-teaser-name">{name}</span>
                <span className="try-teaser-desc">{desc}</span>
                <div className="try-teaser-actions">
                  <a href={href} className="try-teaser-btn">{btn}</a>
                  {guide
                    ? <a href={guide.href} className="try-teaser-guide">{guide.label} →</a>
                    : <span className="try-teaser-guide try-teaser-guide--spacer" aria-hidden="true">&nbsp;</span>}
                </div>
              </div>
            )
          })}
        </div>
        <p className="try-teaser-more">
          <Link to="/try">体験アプリをもっと見る →</Link>
        </p>
      </div>
    </section>
  )
}
