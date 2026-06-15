import './Footer.css'

/**
 * 全ページ共通フッター
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="Hi">Hi</span>
        <span className="Ma">Ma</span>
        <span className="Wa">Wa</span>
        <span className="Sa">Sa</span>
        <span className="rest"> Sync</span>
      </div>

      <p className="footer-desc">ソフトウェアの力で、仕事と生活をつなぐ。</p>

      <div className="footer-links">
        <a href="/#brand">ブランドについて</a>
        <a href="/#services">サービス</a>
        <a href="/#about">代表紹介</a>
        <a href="/#projects">実績</a>
        <a href="https://note.com/himawasa_sync" target="_blank" rel="noopener noreferrer">note</a>
      </div>

      <p className="footer-copy">© {year} HiMaWaSa Sync. All rights reserved.</p>
    </footer>
  )
}
