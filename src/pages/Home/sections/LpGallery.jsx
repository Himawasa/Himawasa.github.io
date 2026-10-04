import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑪ サービスLPページ一覧 */
const lpCards = [
  {
    icon: '📝', badge: '公開中',
    title: 'てますい ─ 書く手間を減らすアシスタント',
    desc: '話すか短いメモを入れるだけで、記録や書類の下書きに。介護・病院・工場・中小企業・士業の5つの版。施設のカレンダー（旧 CareSync）も、今はてますいの予定の共有で。',
    tags: ['てますい', '記録の下書き', '1か月無料'],
    url: 'himawasa-sync.com/', href: '/',
  },
  {
    icon: '🟡', badge: '公開中',
    title: 'kintone の導入・見直しと自動化',
    desc: '今のExcelからの移し替え、使われていない kintone の見直し、メール・チャットとの自動のつなぎ込み。書く手間は てますい で。',
    tags: ['kintone', 'てますい', '業務自動化'],
    url: 'himawasa-sync.com/kintone-dx/', href: '/kintone-dx/',
  },
  {
    icon: '⚖️', badge: '公開中',
    title: '士業事務所の業務効率化、どこから始める？',
    desc: '事務所の手間を、書く手間・くり返しの手間・まとめる手間に分けて、てますい 士業版・自動化・kintone から合う方法を選べます。',
    tags: ['社労士・税理士', 'てますい 士業版', '業務自動化'],
    url: 'himawasa-sync.com/pro-dx/', href: '/pro-dx/',
  },
  {
    icon: '📅', badge: '公開中',
    title: 'シフトシンク（ShiftSync）─ 勤務表の自動作成',
    desc: 'KING OF TIME連携のシフト表自動生成ツール。毎月のシフト表づくりを自動にする専用サービスです。',
    tags: ['KING OF TIME', 'シフト管理', 'API連携'],
    url: 'himawasa-sync.com/shiftsync/', href: '/shiftsync/',
  },
  {
    icon: '⚙️', badge: '公開中',
    title: 'Power Automate の自動化',
    desc: 'デスクトップ版（Windows）もクラウド版（Microsoft 365）も。転記・集計・ファイル整理・通知を、今のExcelのまま自動に。',
    tags: ['Power Automate', 'Microsoft 365', 'Excel'],
    url: 'himawasa-sync.com/power-automate/', href: '/power-automate/',
  },
]

const cardV = (i) => ({
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { delay: (i % 2) * 0.12, duration: 0.6, ease: 'easeOut' } },
})

export default function LpGallery() {
  return (
    <section className="lp-gallery" id="gallery">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">SERVICE PAGES</span>
          <h2 className="section-title">サービス詳細ページ</h2>
          <p className="section-desc">各サービスの詳細・活用事例・お問い合わせは、それぞれのページをご覧ください</p>
        </Reveal>
        <div className="lp-grid">
          {lpCards.map(({ icon, badge, badgeClass, title, desc, tags, url, href, external }, i) => {
            const MotionTag = href ? motion.a : motion.div
            const extraProps = href
              ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
              : {}
            return (
            <MotionTag
              key={title}
              className="lp-card"
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={href ? { y: -8, borderColor: 'rgba(255,215,0,0.6)', boxShadow: '0 20px 56px rgba(0,0,0,0.3)' } : {}}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              {...extraProps}
            >
              <div className="lp-card-header">
                <span className="lp-card-icon">{icon}</span>
                <span className={`lp-card-badge${badgeClass ? ' ' + badgeClass : ''}`}>{badge}</span>
              </div>
              <div className="lp-card-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="lp-card-tags">
                  {tags.map(t => <span className="lp-card-tag" key={t}>{t}</span>)}
                </div>
              </div>
              <div className="lp-card-footer">
                <span className="lp-card-url">{url}</span>
                {href && <span className="lp-card-arrow">→</span>}
              </div>
            </MotionTag>
            )
          })}
        </div>
      </div>
    </section>
  )
}
