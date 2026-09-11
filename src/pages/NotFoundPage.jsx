import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHead from '../components/PageHead'
import { PAGES, BUSINESS } from '../seo/site'

const guides = [
  { to: '/services', label: 'サービス・料金' },
  { to: '/works', label: '実績' },
  { to: '/about', label: '私たち・事業概要' },
  { to: '/try', label: '無料体験' },
]

export default function NotFoundPage() {
  const p = PAGES.notFound
  return (
    <>
      <Seo page={p} />
      <PageHead label="404" title={p.h1} desc={p.description} crumb={p.crumb} />
      <section className="notfound">
        <div className="container notfound-body">
          <p className="notfound-lead">
            お探しのページは見つかりませんでした。<br />
            アドレスが変わったか、公開を終了した可能性があります。
          </p>

          <div className="notfound-links">
            {guides.map(({ to, label }) => (
              <Link key={to} to={to}>{label}</Link>
            ))}
          </div>

          <p className="notfound-note">
            以前ご案内したページが開けない場合は、お手数ですが一度ご連絡ください。すぐにお送りします。
          </p>

          <div className="notfound-cta">
            <Link to="/contact" className="btn-yellow">問い合わせる（無料）</Link>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </div>
        </div>
      </section>
    </>
  )
}
