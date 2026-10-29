import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HashRedirect from './components/HashRedirect'
import MovedAway from './components/MovedAway'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import WorksPage from './pages/WorksPage'
import AboutPage from './pages/AboutPage'
import AiPage from './pages/AiPage'
import ContactPage from './pages/ContactPage'
import TryPage from './pages/TryPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'
// トップを開くだけで全ページ分を読まないよう、重いページは開いたときに読み込む（2026-09-26。JS 572KB が1本だった）
const AsksDemoPage = lazy(() => import('./pages/AsksDemo/AsksDemoPage'))
const IndustryPage = lazy(() => import('./pages/for/IndustryPage'))
import FloatingCta from './pages/Home/sections/FloatingCta'
import { useGaPageView } from './lib/ga'
import './index.css'
import './pages/Home/Home.css'
import './pages/Home/sections/Hero.css'

function AppShell() {
  const { pathname, hash } = useLocation()
  const onContact = pathname.startsWith('/contact')
  const onSupply = pathname.startsWith('/supply') || pathname.startsWith('/asks-demo') || pathname.startsWith('/card')
  useGaPageView()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // 遷移直後は目的のセクションがまだ描画されていないことがあるので少し待つ
    const timer = setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!el) {
        window.scrollTo(0, 0)
        return
      }
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        10,
      ) || 0
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navH,
        behavior: reduce ? 'auto' : 'smooth',
      })
    }, 120)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return (
    <>
      <HashRedirect />
      {!onSupply && <Navbar />}
      <main id="main-content" style={{ paddingTop: onSupply ? 0 : 'var(--nav-h)' }}>
        <Suspense fallback={<div style={{ minHeight: '70vh' }} aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/" element={<ServicesPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/" element={<WorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/" element={<AboutPage />} />
          <Route path="/ai" element={<AiPage />} />
          <Route path="/ai/" element={<AiPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="/try" element={<TryPage />} />
          <Route path="/try/" element={<TryPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/privacy/" element={<PrivacyPage />} />
          <Route path="/for/pro" element={<IndustryPage kind="pro" />} />
          <Route path="/for/pro/" element={<IndustryPage kind="pro" />} />
          <Route path="/for/care" element={<IndustryPage kind="care" />} />
          <Route path="/for/care/" element={<IndustryPage kind="care" />} />
          <Route path="/for/biz" element={<IndustryPage kind="biz" />} />
          <Route path="/for/factory" element={<IndustryPage kind="factory" />} />
          <Route path="/for/factory/" element={<IndustryPage kind="factory" />} />
          <Route path="/for/biz/" element={<IndustryPage kind="biz" />} />
          {/* RK のシナリオ作成代行は 2026-10-29 に別の事業へ移管した。サイトの中から来たときも、移転先のページへ移す */}
          <Route path="/rk" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/factory" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/factory/" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/hospital" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/hospital/" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/care" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/care/" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/pro" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/pro/" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/biz" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/biz/" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/click" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/rk/click/" element={<MovedAway to="https://digisapo-dx.com/rk/" what="RK のシナリオ作成代行" label="RPA作成代行" />} />
          <Route path="/supply" element={<AsksDemoPage />} />
          <Route path="/supply/" element={<AsksDemoPage />} />
          <Route path="/asks-demo" element={<Navigate to="/supply/" replace />} />
          <Route path="/asks-demo/" element={<Navigate to="/supply/" replace />} />
          {/* カード発行は 2026-10-26 に別の事業へ移管した。サイトの中から来たときも、移転先のページへ移す */}
          <Route path="/card" element={<MovedAway to="https://digisapo-dx.com/idcard/" what="社員証・来訪者証の発行（旧 CardSync）" label="IDカードかんたん発行" />} />
          <Route path="/card/" element={<MovedAway to="https://digisapo-dx.com/idcard/" what="社員証・来訪者証の発行（旧 CardSync）" label="IDカードかんたん発行" />} />
          <Route path="/cardsync" element={<MovedAway to="https://digisapo-dx.com/idcard/" what="社員証・来訪者証の発行（旧 CardSync）" label="IDカードかんたん発行" />} />
          <Route path="/cardsync/" element={<MovedAway to="https://digisapo-dx.com/idcard/" what="社員証・来訪者証の発行（旧 CardSync）" label="IDカードかんたん発行" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </main>
      {!onSupply && <Footer />}
      {!onSupply && !onContact && pathname !== '/' && <FloatingCta />}
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </HelmetProvider>
  )
}
