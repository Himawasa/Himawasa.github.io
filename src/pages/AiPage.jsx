import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHead from '../components/PageHead'
import { PAGES } from '../seo/site'
import AiEra from './Home/sections/AiEra'

export default function AiPage() {
  const p = PAGES.ai
  return (
    <>
      <Seo page={p} />
      <PageHead label="AI ERA" title={p.h1} desc={p.description} crumb={p.crumb} />
      <AiEra hideHeader />
      <section className="home-cta">
        <div className="container">
          <h2>使い方の相談も、今ある仕組みの点検もできます</h2>
          <p>ツールの名前や専門知識は知らなくて大丈夫です。</p>
          <Link to="/contact" className="btn-yellow">話してみる（無料）</Link>
        </div>
      </section>
    </>
  )
}
