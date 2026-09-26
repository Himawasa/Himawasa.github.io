import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import { PAGES } from '../../seo/site'
import Hero from './sections/Hero'
import AudiencePaths from './sections/AudiencePaths'
import TemasuiBand from './sections/TemasuiBand'
import HomeProof from './sections/HomeProof'
import TryTeaser from './sections/TryTeaser'
import Flow from './sections/Flow'
import FloatingCta from './sections/FloatingCta'

export default function Home() {
  return (
    <>
      <Seo page={PAGES.home} />
      <Hero />
      <HomeProof />
      <AudiencePaths />
      <TemasuiBand />
      <TryTeaser />
      <Flow />
      <section className="home-cta">
        <div className="container">
          <h2>まずは、いまの困りごとから</h2>
          <p>まずは話を聞いてみたいだけでも大丈夫です。返信はメールかフォームです。</p>
          <Link to="/contact" className="btn-yellow">話してみる（無料）</Link>
          <p className="home-cta-sub">
            <Link to="/try">先に、無料体験してみる →</Link>
          </p>
        </div>
      </section>
      <FloatingCta />
    </>
  )
}
