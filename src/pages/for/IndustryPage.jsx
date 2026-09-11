import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import { PAGES } from '../../seo/site'
import { INDUSTRIES, INDUSTRY_NAV } from './industries'
import './Industry.css'

export default function IndustryPage({ kind }) {
  const data = INDUSTRIES[kind]
  const page = PAGES[data.pageKey]

  return (
    <>
      <Seo page={page} />
      <article className={`ind ind--${data.tone}`}>
        <header className={`ind-hero${data.heroImage ? ' ind-hero--photo' : ''}`}>
          {data.heroImage && (
            <img className="ind-hero-img" src={data.heroImage} alt={data.heroAlt} width="1600" height="900" />
          )}
          {data.heroImage && <div className="ind-hero-shade" aria-hidden="true" />}
          <div className="container">
            <nav className="page-crumb" aria-label="パンくず">
              <Link to="/">トップ</Link>
              <span aria-hidden="true"> / </span>
              <span>{page.crumb}</span>
            </nav>
            <p className="ind-kicker">{data.label}</p>
            <p className="ind-who">{data.who}</p>
            <h1 className="ind-title">{page.h1}</h1>
            <p className="ind-promise">{data.promise}</p>
            <div className="ind-hero-cta">
              <Link to="/contact" className="btn-yellow">初回相談は無料（30分）</Link>
              <Link to="/works" className="ind-text-link">実績を見る</Link>
            </div>
            <p className="ind-micro">売り込みの電話はしません。今のやり方のままで大丈夫です。</p>
          </div>
        </header>

        {data.cite && (
          <section className="ind-section">
            <div className="container">
              <h2 className="ind-h2">{data.cite.title}</h2>
              {data.cite.facts.map((p) => (
                <p key={p} className="ind-cite">{p}</p>
              ))}
            </div>
          </section>
        )}

        {data.features ? (
          <section className="ind-section">
            <div className="container">
              <h2 className="ind-h2">現場で、こう変わります</h2>
              <div className="ind-features">
                {data.features.map((item, i) => (
                  <article key={item.title} className={`ind-feature${i % 2 ? ' is-reverse' : ''}`}>
                    <div className="ind-feature-pic">
                      <img src={item.image} alt={item.imageAlt} width="800" height="500" />
                    </div>
                    <div className="ind-feature-text">
                      <p className="ind-feature-num">{item.num}</p>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <p className="ind-feature-result">{item.result}</p>
                      {item.href && (
                        <a href={item.href} className="ind-feature-link">
                          {item.hrefLabel || '詳しく見る'} →
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="ind-section">
              <div className="container">
                <h2 className="ind-h2">いま、現場で起きていること</h2>
                <ul className="ind-pains">
                  {data.pains.map((item) => (
                    <li key={item.title} className="ind-pain">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="ind-section ind-section--proof">
              <div className="container">
                <h2 className="ind-h2">変わったあとの数字</h2>
                <div className="ind-proofs">
                  {data.proofs.map((item) => (
                    <figure key={item.unit} className="ind-proof">
                      <p className="ind-proof-num">{item.num}</p>
                      <figcaption>
                        <strong>{item.unit}</strong>
                        <span>{item.text}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {data.extra && (
          <section className="ind-section ind-section--proof">
            <div className="container">
              <h2 className="ind-h2">{data.extraTitle}</h2>
              <ul className="ind-pains">
                {data.extra.map((item) => (
                  <li key={item.title} className="ind-pain">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="ind-section ind-section--proof">
          <div className="container">
            <h2 className="ind-h2">関連する案内</h2>
            <div className="ind-links">
              {data.links.map((item) => (
                <a key={item.href} href={item.href} className="ind-link-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span>{item.cta || `${item.title}を見る`} →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {data.faqs?.length > 0 && (
          <section className="ind-faq" id="faq">
            <div className="container">
              <h2 className="ind-h2">よくある質問</h2>
              <div className="ind-faq-list">
                {data.faqs.map((item) => (
                  <article key={item.q} className="ind-faq-item">
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="ind-close">
          <div className="container">
            <h2>{data.close}</h2>
            <p>チラシのQRから来た方も、検索から来た方も。話は30分だけです。</p>
            <div className="ind-hero-cta">
              <Link to="/contact" className="btn-yellow">話してみる（無料）</Link>
              <a href="mailto:info@himawasa-sync.com" className="ind-text-link">info@himawasa-sync.com</a>
            </div>
          </div>
        </section>

        <nav className="ind-others" aria-label="ほかの現場">
          <div className="container">
            <p>ほかの現場の方はこちら</p>
            <ul>
              {INDUSTRY_NAV.filter((item) => item.to !== `/for/${kind}`).map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </article>
    </>
  )
}
