import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHead from '../components/PageHead'
import { PAGES } from '../seo/site'
import TryApps from './Home/sections/TryApps'

export default function TryPage() {
  const p = PAGES.try
  return (
    <>
      <Seo page={p} />
      <PageHead label="TRY NOW" title={p.h1} desc={p.description} crumb={p.crumb} />
      <TryApps hideHeader />
      <section className="home-cta">
        <div className="container">
          <h2>現場向けの仕組みは、相談です</h2>
          <p>体験アプリは入口です。今のExcelに合わせた自動化は、話を聞いてから作ります。</p>
          <Link to="/contact" className="btn-yellow">話してみる（無料）</Link>
        </div>
      </section>
    </>
  )
}
