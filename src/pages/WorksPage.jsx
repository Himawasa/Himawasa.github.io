import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHead from '../components/PageHead'
import ForJump from '../components/ForJump'
import { PAGES } from '../seo/site'
import CounterBand from './Home/sections/CounterBand'
import Results from './Home/sections/Results'
import Voices from './Home/sections/Voices'
import Projects from './Home/sections/Projects'

export default function WorksPage() {
  const p = PAGES.works
  return (
    <>
      <Seo page={p} />
      <PageHead
        label="WORKS"
        title={p.h1}
        desc={
          <>
            士業・介護・医療・中小企業の現場で動かしてきた実績です。5時間かかっていた手作業が、3分になった例もあります。
            <br />
            許可をいただいた範囲の効果と、公開できる開発事例を掲載しています。
          </>
        }
        crumb={p.crumb}
      />
      <ForJump title="現場ごとの案内" />
      <CounterBand />
      <Results />
      <Voices />
      <Projects />
      <section className="ai-teaser">
        <div className="container">
          <span className="section-label">TRY NOW</span>
          <h2>相談の前に、触ってみたい方へ</h2>
          <p>持ち物チェックやPDF変換など、無料で試せるミニアプリがあります。</p>
          <Link to="/try" className="btn-yellow">無料体験を見る</Link>
        </div>
      </section>
    </>
  )
}
