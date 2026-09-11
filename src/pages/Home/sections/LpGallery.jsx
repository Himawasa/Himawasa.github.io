import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑪ サービスLPページ一覧 */
const lpCards = [
  {
    icon: '🗓️', badge: '紹介',
    title: 'CareSync ─ 介護予定カレンダー',
    desc: '施設全体の予定・利用変更・往診・残薬をひと目で。現場が同じ画面を見ながら動ける介護向けカレンダーです。',
    tags: ['介護DX', '予定管理', '残薬'],
    url: '紹介のみ', href: null,
  },
  {
    icon: '🟡', badge: '公開中',
    title: 'kintone × DX 提案ページ',
    desc: '中小企業向けkintone導入支援。業務をkintoneで一元管理し、コピペ・手入力ゼロを目指す提案ページです。',
    tags: ['kintone', '中小企業DX', '業務自動化'],
    url: 'himawasa-sync.com/kintone-dx/', href: '/kintone-dx/',
  },
  {
    icon: '⚖️', badge: '公開中',
    title: '士業向け DX 提案ページ',
    desc: '社労士・税理士など士業事務所向けのDX支援提案。GAS＋AIで帳票・給与計算・契約書を自動化します。',
    tags: ['社労士', 'GAS × AI', '帳票自動化'],
    url: 'himawasa-sync.com/pro-dx/', href: '/pro-dx/',
  },
  {
    icon: '📅', badge: '公開中',
    title: 'シフトシンク（ShiftSync）─ 勤務表の自動作成',
    desc: 'KING OF TIME連携のシフト表自動生成ツール。毎月のシフト作成作業を劇的に削減する専用サービスです。',
    tags: ['KING OF TIME', 'シフト管理', 'API連携'],
    url: 'himawasa-sync.com/shiftsync/', href: '/shiftsync/',
  },
  {
    icon: '🚀', badge: '公開中',
    title: 'Yoom 導入支援・運用サポート',
    desc: 'Yoomの設定・構築から月額保守まで一括対応。入社手続き・FAX受注・労働生産性など繰り返し業務を全自動化。',
    tags: ['Yoom', 'AI-OCR', 'SaaS連携', '月額保守'],
    url: 'himawasa-sync.com/yoom-lp/', href: '/yoom-lp/',
  },
  {
    icon: '⚖️', badge: '公開中',
    title: '労務管理ポータル 概略説明',
    desc: '社労士と顧問先をつなぐクラウド型労務管理ポータルの概略説明ページ。全13機能を紹介。デモ体験リンク付き。',
    tags: ['Java / Spring Boot', '社労士DX', 'AI労務相談'],
    url: 'himawasa-sync.com/sharoushi-portal/', href: '/sharoushi-portal/',
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
