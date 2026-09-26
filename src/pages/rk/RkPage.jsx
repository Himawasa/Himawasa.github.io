import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import { PAGES } from '../../seo/site'
import { RK_DISCLAIMER, RK_NAV, RK_PAGES, RK_PRICE } from './rk'
import '../for/Industry.css'
import './Rk.css'

export default function RkPage({ kind }) {
  const data = RK_PAGES[kind]
  const page = PAGES[data.pageKey]
  const isHub = data.kind === 'hub'

  return (
    <>
      <Seo page={page} />
      <article className={`ind rk rk--${data.tone}`}>
        <header className={`ind-hero${data.heroImage ? ' ind-hero--photo' : ''}`}>
          {data.heroImage && (
            <img className="ind-hero-img" src={data.heroImage} alt={data.heroAlt} width="1600" height="900" />
          )}
          {data.heroImage && <div className="ind-hero-shade" aria-hidden="true" />}
          <div className="container">
            <nav className="page-crumb" aria-label="パンくず">
              <Link to="/">トップ</Link>
              <span aria-hidden="true"> / </span>
              {isHub ? (
                <span>{page.crumb}</span>
              ) : (
                <>
                  <Link to="/rk">RKシナリオ作成代行</Link>
                  <span aria-hidden="true"> / </span>
                  <span>{page.crumb}</span>
                </>
              )}
            </nav>
            <p className="ind-kicker">{data.label}</p>
            <p className="ind-who">{data.who}</p>
            <h1 className="ind-title">{page.h1}</h1>
            <p className="ind-promise">{data.promise}</p>
            <div className="ind-hero-cta">
              <Link to="/contact" className="btn-yellow">初回相談は無料（30分）</Link>
              <Link to={isHub ? '#pricing' : '/rk'} className="ind-text-link">{isHub ? 'サービス・料金を見る' : 'RKシナリオ作成代行に戻る'}</Link>
            </div>
            <p className="ind-micro">売り込みの電話はしません。ライセンスはメーカーへ。シナリオ作成代行と運用保守代行だけです。</p>
            {(data.kind === 'care' || data.kind === 'hospital') && (
              <p className="ind-micro">
                <Link to="/for/care">介護・病院の自動化は、まずこちら。</Link>
                RKはその補助です。
              </p>
            )}
          </div>
        </header>

        {data.what && (
          <section className="ind-section">
            <div className="container rk-wide">
              <h2 className="ind-h2">{data.whatTitle}</h2>
              {data.what.map((p) => (
                <p key={p} className="rk-lead">{p}</p>
              ))}
              {data.can && (
                <div className="rk-can">
                  {data.can.map((item) => (
                    <article key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              )}
              {data.cannot && <p className="rk-cannot">{data.cannot}</p>}
            </div>
          </section>
        )}

        {data.pains && (
          <section className="ind-section ind-section--proof">
            <div className="container rk-wide">
              <h2 className="ind-h2">{data.painsTitle}</h2>
              {data.painsLead && <p className="rk-lead">{data.painsLead}</p>}
              <div className="rk-pains">
                {data.pains.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.solve && (
          <section className="ind-section">
            <div className="container rk-wide">
              <h2 className="ind-h2">{data.solveTitle}</h2>
              {data.solveLead && <p className="rk-lead">{data.solveLead}</p>}
              <div className="rk-solve">
                {data.solve.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.jobs && (
          <section className="ind-section ind-section--proof">
            <div className="container rk-wide">
              <h2 className="ind-h2">RKが、この現場で覚える操作</h2>
              <div className="rk-jobs">
                {data.jobs.map((job) => (
                  <article key={`${job.when}-${job.from}`}>
                    <p className="rk-jobs-when">{job.when}</p>
                    <p className="rk-jobs-from">どこから　{job.from}</p>
                    <p className="rk-jobs-do">何をする　{job.do}</p>
                  </article>
                ))}
              </div>
              {data.wall && <p className="rk-wall">{data.wall}</p>}
            </div>
          </section>
        )}

        <section className="ind-section">
          <div className="container rk-wide">
            <h2 className="ind-h2">{isHub ? 'シナリオ作成代行で、引き受けること' : '一本目になりやすい作業'}</h2>
            <div className="ind-features">
              {data.features.map((item, i) => (
                <article key={item.title} className={`ind-feature${i % 2 ? ' is-reverse' : ''}`}>
                  {item.image && (
                    <div className="ind-feature-pic">
                      <img src={item.image} alt={item.imageAlt} width="800" height="500" />
                    </div>
                  )}
                  <div className="ind-feature-text">
                    <p className="ind-feature-num">{item.num}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <p className="ind-feature-result">{item.result}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {data.ask && (
          <section className="ind-section ind-section--proof">
            <div className="container">
              <h2 className="ind-h2">{data.askTitle}</h2>
              <ol className="rk-ask">
                {data.ask.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <p className="rk-ask-note">答えられなくても大丈夫です。分からないところから、一緒に整理します。</p>
            </div>
          </section>
        )}

        {data.flow && (
          <section className="ind-section ind-section--proof">
            <div className="container rk-wide">
              <h2 className="ind-h2">{data.flowTitle}</h2>
              <ol className="rk-flow">
                {data.flow.map((item) => (
                  <li key={item.n}>
                    <span>{item.n}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section className="ind-section" id="pricing">
          <div className="container">
            <h2 className="ind-h2">{data.plans ? 'サービス・料金' : '料金の目安'}</h2>
            <div className="rk-price">
              {(data.plans || [
                { name: 'シナリオ作成代行', price: RK_PRICE.scenario, unit: '円〜', text: '一本目。今の画面操作を見て作ります。' },
                { name: '運用・保守代行', price: RK_PRICE.maintain, unit: '円〜 / 月', text: '画面が変わって止まったら、動く状態に戻します。', main: true },
                { name: '初回相談', price: '0', unit: '円 / 30分', text: '売り込みの電話はしません。' },
              ]).map((plan) => (
                <div key={plan.name} className={`rk-price-card${plan.main ? ' is-main' : ''}`}>
                  <p className="rk-price-label">{plan.name}</p>
                  <p className="rk-price-num">{plan.price}<span>{plan.unit}</span></p>
                  <p>{plan.text}</p>
                  {plan.items && (
                    <ul className="rk-plan-items">
                      {plan.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {isHub && (
          <section className="ind-section ind-section--proof">
            <div className="container rk-wide">
              <h2 className="ind-h2">業種ごとの、RKの仕事</h2>
              <div className="rk-doors">
                {RK_NAV.filter((item) => item.to !== '/rk').map((item) => (
                  <Link key={item.to} to={item.to} className="rk-door">
                    <img src={item.image} alt="" width="480" height="280" />
                    <div>
                      <h3>{item.label}</h3>
                      <p>{item.blurb}</p>
                      <span>この現場の操作を見る →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
            <p>現状のヒアリングは無料です。今の画面を30分見せてください。覚えられる手順かどうか、その場でお答えします。</p>
            <div className="ind-hero-cta">
              <Link to="/contact" className="btn-yellow">話してみる（無料）</Link>
              <a href="mailto:info@himawasa-sync.com" className="ind-text-link">info@himawasa-sync.com</a>
            </div>
          </div>
        </section>

        <nav className="ind-others" aria-label="RKのほかの案内">
          <div className="container">
            <p>ほかの現場のRK</p>
            <ul>
              {RK_NAV.filter((item) => item.to !== (isHub ? '/rk' : `/rk/${data.kind}`)).map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <p className="rk-disclaimer">{RK_DISCLAIMER}</p>
      </article>
    </>
  )
}
