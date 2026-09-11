import Reveal from '../../../components/Reveal'
import { BUSINESS } from '../../../seo/site'

const rows = [
  { th: '屋号', td: BUSINESS.tradeName },
  { th: '事業形態', td: BUSINESS.type },
  { th: '開業', td: BUSINESS.opened },
  { th: '事業内容', td: BUSINESS.work },
  { th: '対応', td: BUSINESS.area },
  { th: '連絡先', td: BUSINESS.email },
]

export default function BusinessOverview() {
  return (
    <section className="biz-overview" id="overview">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">OVERVIEW</span>
          <h2 className="section-title">事業概要</h2>
        </Reveal>
        <div className="biz-overview-wrap">
          <table className="profile-table">
            <tbody>
              {rows.map((r) => (
                <tr key={r.th}>
                  <th scope="row">{r.th}</th>
                  <td>{r.td}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
