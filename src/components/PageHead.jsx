import { Link } from 'react-router-dom'

export default function PageHead({ label, title, desc, crumb }) {
  return (
    <header className="page-head">
      <div className="container">
        <nav className="page-crumb" aria-label="パンくず">
          <Link to="/">トップ</Link>
          <span aria-hidden="true"> / </span>
          <span>{crumb || title}</span>
        </nav>
        {label && <span className="section-label">{label}</span>}
        <h1 className="page-head-title">{title}</h1>
        {desc && <p className="page-head-desc">{desc}</p>}
      </div>
    </header>
  )
}
