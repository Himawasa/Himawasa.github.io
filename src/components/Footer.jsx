import { Link } from 'react-router-dom'
import { BUSINESS } from '../seo/site'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="Hi">Hi</span>
            <span className="Ma">Ma</span>
            <span className="Wa">Wa</span>
            <span className="Sa">Sa</span>
            <span className="rest"> Sync</span>
          </div>
          <p className="footer-desc">{BUSINESS.work}</p>
          <p className="footer-meta">
            {BUSINESS.type}
          </p>
        </div>

        <nav className="footer-col" aria-label="現場から">
          <p className="footer-col-title">現場から</p>
          <Link to="/for/pro">士業の方</Link>
          <Link to="/for/care">介護施設・病院の方</Link>
          <Link to="/for/biz">中小企業の方</Link>
          <Link to="/rk">RKシナリオ作成代行</Link>
          <Link to="/services">サービス・料金</Link>
        </nav>

        <nav className="footer-col" aria-label="ページ">
          <p className="footer-col-title">ページ</p>
          <Link to="/works">実績</Link>
          <Link to="/about">私たち・事業概要</Link>
          <Link to="/ai">AI時代の開発</Link>
          <Link to="/try">無料体験</Link>
          <Link to="/contact">お問い合わせ</Link>
        </nav>

        <div className="footer-col">
          <p className="footer-col-title">ご連絡</p>
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          <Link to="/contact">相談フォーム</Link>
          <a href={BUSINESS.note} target="_blank" rel="noopener noreferrer">note</a>
          <Link to="/privacy">プライバシー</Link>
          <a href="/llms.txt">AI向け概要</a>
        </div>
      </div>

      <p className="footer-copy">© {year} {BUSINESS.tradeName}（{BUSINESS.type}）</p>
    </footer>
  )
}
