import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

/**
 * 全ページ共通ナビゲーション
 * - スクロール64px以上でクラス .scrolled を付与（背景が濃くなる）
 * - モバイルでハンバーガーメニュー表示
 */
export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const { pathname } = useLocation()

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ページ遷移でメニューを閉じる
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        {/* ロゴ */}
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="" className="nav-logo-img" aria-hidden="true" />
          <span className="hi">Hi</span>
          <span className="ma">Ma</span>
          <span className="wa">Wa</span>
          <span className="sa">Sa</span>
          <span className="sync"> Sync</span>
        </Link>

        {/* PCナビリンク */}
        <ul className="nav-links">
          <li><a href="/#brand">ブランドについて</a></li>
          <li><a href="/#services">サービス</a></li>
          <li><a href="/#about">代表紹介</a></li>
          <li><a href="/#projects">実績</a></li>
          <li><a href="/#gallery">サービスページ</a></li>
          <li><a href="/#contact" className="nav-cta">お問い合わせ</a></li>
        </ul>

        {/* ハンバーガー（モバイル） */}
        <button
          className="hamburger"
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <ul className="nav-mobile">
          <li><a href="/#brand"    onClick={() => setMenuOpen(false)}>ブランドについて</a></li>
          <li><a href="/#services" onClick={() => setMenuOpen(false)}>サービス</a></li>
          <li><a href="/#about"    onClick={() => setMenuOpen(false)}>代表紹介</a></li>
          <li><a href="/#projects" onClick={() => setMenuOpen(false)}>実績</a></li>
          <li><a href="/#gallery"  onClick={() => setMenuOpen(false)}>サービスページ</a></li>
          <li><a href="/#contact"  onClick={() => setMenuOpen(false)}>お問い合わせ</a></li>
        </ul>
      )}
    </nav>
  )
}
