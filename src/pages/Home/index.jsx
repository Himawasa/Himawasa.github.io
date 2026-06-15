import { Helmet } from 'react-helmet-async'
import './Home.css'
import './sections/Hero.css'
import Hero       from './sections/Hero'
import MissionBand from './sections/MissionBand'
import BrandStory  from './sections/BrandStory'
import Values      from './sections/Values'
import Services    from './sections/Services'
import About       from './sections/About'
import CounterBand from './sections/CounterBand'
import Results     from './sections/Results'
import Projects    from './sections/Projects'
import TryApps     from './sections/TryApps'
import LpGallery   from './sections/LpGallery'
import Flow        from './sections/Flow'
import Contact     from './sections/Contact'

/**
 * トップページ（Phase 3 完成版・全13セクション）
 */
export default function Home() {

  return (
    <>
      <Helmet>
        <title>HiMaWaSa Sync | ソフトウェアで仕事と生活をつなぐ</title>
        <meta name="description" content="面倒な手作業をソフトウェアで自動化。あなたの現場をもっとラクにし、大切な時間を増やします。" />
        <meta name="google-site-verification" content="R9gFxYt7rLiAvSMDrxDMYlkiwvSY08qfplXtgm046Uw" />
        <meta property="og:title"       content="HiMaWaSa Sync | ソフトウェアで仕事と生活をつなぐ" />
        <meta property="og:description" content="現場のDXを、シンプルに。GAS・Python・AIで面倒な手作業を自動化します。" />
        <meta property="og:image"       content="https://himawasa-sync.com/ogp.png" />
        <meta property="og:url"         content="https://himawasa-sync.com/" />
        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="HiMaWaSa Sync" />
        <meta name="twitter:card"       content="summary_large_image" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>🌻</text></svg>" />
      </Helmet>

      {/* ===== 1. ヒーロー ===== */}
      <Hero />
      {/* ===== 2. ミッション帯 ===== */}
      <MissionBand />
      {/* ===== 3. ブランドストーリー ===== */}
      <BrandStory />
      {/* ===== 4. 大切にしていること ===== */}
      <Values />
      {/* ===== 5. サービス ===== */}
      <Services />
      {/* ===== 6. 代表紹介 ===== */}
      <About />
      {/* ===== 7. カウンター帯 ===== */}
      <CounterBand />
      {/* ===== 8. Before→After ===== */}
      <Results />
      {/* ===== 9. 実績 ===== */}
      <Projects />
      {/* ===== 10. 今すぐ試せるアプリ ===== */}
      <TryApps />
      {/* ===== 11. サービスLPページ一覧 ===== */}
      <LpGallery />
      {/* ===== 12. 導入の流れ ===== */}
      <Flow />
      {/* ===== 13. お問い合わせ ===== */}
      <Contact />
    </>
  )
}
