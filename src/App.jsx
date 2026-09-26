import { useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HashRedirect from './components/HashRedirect'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import WorksPage from './pages/WorksPage'
import AboutPage from './pages/AboutPage'
import AiPage from './pages/AiPage'
import ContactPage from './pages/ContactPage'
import TryPage from './pages/TryPage'
import PrivacyPage from './pages/PrivacyPage'
import AsksDemoPage from './pages/AsksDemo/AsksDemoPage'
import CardSyncPage from './pages/CardSync/CardSyncPage'
import NotFoundPage from './pages/NotFoundPage'
import IndustryPage from './pages/for/IndustryPage'
import RkPage from './pages/rk/RkPage'
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
          <Route path="/rk" element={<RkPage kind="hub" />} />
          <Route path="/rk/" element={<RkPage kind="hub" />} />
          <Route path="/rk/factory" element={<RkPage kind="factory" />} />
          <Route path="/rk/factory/" element={<RkPage kind="factory" />} />
          <Route path="/rk/hospital" element={<RkPage kind="hospital" />} />
          <Route path="/rk/hospital/" element={<RkPage kind="hospital" />} />
          <Route path="/rk/care" element={<RkPage kind="care" />} />
          <Route path="/rk/care/" element={<RkPage kind="care" />} />
          <Route path="/rk/pro" element={<RkPage kind="pro" />} />
          <Route path="/rk/pro/" element={<RkPage kind="pro" />} />
          <Route path="/rk/biz" element={<RkPage kind="biz" />} />
          <Route path="/rk/biz/" element={<RkPage kind="biz" />} />
          <Route path="/rk/click" element={<RkPage kind="click" />} />
          <Route path="/rk/click/" element={<RkPage kind="click" />} />
          <Route path="/supply" element={<AsksDemoPage />} />
          <Route path="/supply/" element={<AsksDemoPage />} />
          <Route path="/asks-demo" element={<Navigate to="/supply/" replace />} />
          <Route path="/asks-demo/" element={<Navigate to="/supply/" replace />} />
          {/* 合言葉つきの見本は役目を終えた。同じ中身を、登録なしで開ける CardSync の案内へ送る。 */}
          <Route path="/card" element={<Navigate to="/cardsync/" replace />} />
          <Route path="/card/" element={<Navigate to="/cardsync/" replace />} />
          <Route path="/cardsync" element={<CardSyncPage />} />
          <Route path="/cardsync/" element={<CardSyncPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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
