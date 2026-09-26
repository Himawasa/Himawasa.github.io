import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

// href はサイト内の素の HTML のページ（React の画面遷移では開けないので <a href> で出す）
const links = [
  { href: '/temasui/', label: 'てますい' },
  { to: '/for/pro', label: '士業' },
  { to: '/for/care', label: '介護・医療' },
  { to: '/for/biz', label: '中小企業' },
  { to: '/services', label: 'サービス' },
  { to: '/works', label: '実績' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="メイン">
      <a href="#main-content" className="skip-link">本文へスキップ</a>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="" className="nav-logo-img" aria-hidden="true" />
          <span className="hi">Hi</span>
          <span className="ma">Ma</span>
          <span className="wa">Wa</span>
          <span className="sa">Sa</span>
          <span className="sync"> Sync</span>
        </Link>

        <ul className="nav-links">
          {links.map(({ to, href, label }) => (
            <li key={to || href}>
              {href ? <a href={href}>{label}</a> : <NavLink to={to}>{label}</NavLink>}
            </li>
          ))}
          <li><Link to="/contact" className="nav-cta">お問い合わせ</Link></li>
        </ul>

        <button
          className="hamburger"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
          aria-controls="nav-mobile"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <ul className="nav-mobile" id="nav-mobile">
          {links.map(({ to, href, label }) => (
            <li key={to || href}>
              {href ? <a href={href}>{label}</a> : <NavLink to={to} onClick={closeMenu}>{label}</NavLink>}
            </li>
          ))}
          <li className="nav-mobile-cta">
            <Link to="/contact" className="nav-cta" onClick={closeMenu}>無料相談・お問い合わせ</Link>
          </li>
        </ul>
      )}
    </nav>
  )
}
