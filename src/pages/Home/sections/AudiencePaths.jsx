import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** トップの4扉 — 業界玄関へ送る（工場は 2026-09-26 追加） */
const paths = [
  {
    id: 'for-pro',
    tone: 'pro',
    icon: '⚖️',
    title: '士業事務所の方',
    lead: '事務所に残る手作業を、シンプルにする。',
    points: ['顧客台帳を一画面に', '期日のお知らせでうっかり防止', '請求・FAX整理を減らす'],
    to: '/for/pro',
    cta: '士業の案内を見る',
  },
  {
    id: 'for-care',
    tone: 'care',
    icon: '🏥',
    title: '介護・医療の現場の方',
    lead: '毎月残る手作業を、シンプルにする。',
    points: ['シフト表を、今のExcel様式へ', '病院の日計・カルテ転記', '持ち物・予定・残薬をひと目に'],
    to: '/for/care',
    cta: '介護・医療の案内を見る',
    // Guide は静的HTMLのため <a href> 必須（React Router に吸われない）
    subHref: '/Guide/care/',
    subCta: '施設で改善できること一覧',
  },
  {
    id: 'for-biz',
    tone: 'biz',
    icon: '🏢',
    title: '中小企業の方',
    lead: '毎日残る手作業を、シンプルにする。',
    points: ['帳票の転記（PDF→Excel）', 'Excelの整理をkintoneで', '繰り返し作業をGAS・AIで'],
    to: '/for/biz',
    cta: '中小企業の案内を見る',
  },
  {
    id: 'for-factory',
    tone: 'factory',
    icon: '🏭',
    title: '工場の方',
    lead: '毎日書く手間を、シンプルにする。',
    points: ['作業日報・引き継ぎの下書き', '工具・備品の持ち出し点検', '測定値や実績の転記'],
    to: '/for/factory',
    cta: '工場の案内を見る',
    // 紹介ページは静的HTMLのため <a href>
    subHref: '/temasui/factory/',
    subCta: 'てますい 工場版を見る',
  },
]

const cardV = (i) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' } },
})

export default function AudiencePaths() {
  return (
    <section className="paths" id="paths">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">FOR YOU</span>
          <h2 className="section-title">自分の現場を、選んでください</h2>
          <p className="section-desc">技術の話は後回し。いま困っている場所だけ見てください</p>
        </Reveal>
        <div className="paths-grid">
          {paths.map(({ id, tone, icon, title, lead, points, to, cta, subHref, subCta }, i) => (
            <motion.article
              key={id}
              id={id}
              className={`path-card path-card--${tone}`}
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="path-icon">{icon}</div>
              <h3 className="path-title">{title}</h3>
              <p className="path-lead">{lead}</p>
              <ul className="path-list">
                {points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className="path-actions">
                <Link to={to} className="path-cta">{cta} →</Link>
                {subHref && subCta
                  ? <a href={subHref} className="path-sub">{subCta} →</a>
                  : <span className="path-sub path-sub--spacer" aria-hidden="true">&nbsp;</span>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
