import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑪ サービスLPページ一覧 */
const lpCards = [
  {
    icon: '📦', badge: '体験可能', badgeClass: 'new-badge',
    title: 'MochiSync ─ 持ち物チェックAI',
    desc: '写真を撮るだけでAIが持ち物リストを自動作成。介護施設の入所時確認を30分→1分に短縮するスマホアプリです。',
    tags: ['Gemini AI', '介護DX', 'スマホ対応'],
    url: 'himawasa-sync.com/mochisync/', href: 'https://himawasa-sync.com/mochisync/', external: true,
  },
  {
    icon: '📄', badge: '体験可能', badgeClass: 'new-badge',
    title: 'PDFuse Sync ─ PDF→Excel変換',
    desc: 'PDFファイルをAIが解析し、表データをExcelに自動変換。手作業のデータ入力をゼロにする業務効率化ツールです。',
    tags: ['Gemini AI', 'PDF解析', 'Excel出力'],
    url: 'himawasa-sync.com/pdfuse/', href: 'https://himawasa-sync.com/pdfuse/', external: true,
  },
  {
    icon: '📋', badge: '体験可能', badgeClass: 'new-badge',
    title: 'LegoSync ─ 書類かんたん要約AI',
    desc: 'スマホのカメラで書類を撮影するだけでAIが自動要約。どんな業界のどんな書類（請求書・議事録・契約書等）にも対応するスマホアプリです。',
    tags: ['Gemini AI', '書類自動化', 'スマホ対応'],
    url: 'himawasa-sync.com/legosync/', href: 'https://himawasa-sync.com/legosync/', external: true,
  },
  {
    icon: '🟡', badge: '公開中',
    title: 'kintone × DX 提案ページ',
    desc: '中小企業向けkintone導入支援。業務をkintoneで一元管理し、コピペ・手入力ゼロを目指す提案ページです。',
    tags: ['kintone', '中小企業DX', '業務自動化'],
    url: 'himawasa.github.io/kintone-dx/', href: '/kintone-dx/',
  },
  {
    icon: '⚖️', badge: '公開中',
    title: '士業向け DX 提案ページ',
    desc: '社労士・税理士など士業事務所向けのDX支援提案。GAS＋AIで帳票・給与計算・契約書を自動化します。',
    tags: ['社労士', 'GAS × AI', '帳票自動化'],
    url: 'himawasa.github.io/pro-dx/', href: '/pro-dx/',
  },
  {
    icon: '📅', badge: '公開中',
    title: 'ShiftSync ─ シフト自動化ツール',
    desc: 'KING OF TIME連携のシフト表自動生成ツール。毎月のシフト作成作業を劇的に削減する専用サービスです。',
    tags: ['KING OF TIME', 'シフト管理', 'API連携'],
    url: 'himawasa.github.io/shiftsync/', href: '/shiftsync/',
  },
  {
    icon: '🚀', badge: '公開中',
    title: 'Yoom 導入支援・運用サポート',
    desc: 'Yoomの設定・構築から月額保守まで一括対応。入社手続き・FAX受注・労働生産性など繰り返し業務を全自動化。',
    tags: ['Yoom', 'AI-OCR', 'SaaS連携', '月額保守'],
    url: 'himawasa.github.io/yoom-lp/', href: '/yoom-lp/',
  },
  {
    icon: '⚖️', badge: '公開中',
    title: '労務管理ポータル 概略説明',
    desc: '社労士と顧問先をつなぐクラウド型労務管理ポータルの概略説明ページ。全13機能を紹介。デモ体験リンク付き。',
    tags: ['Java / Spring Boot', '社労士DX', 'AI労務相談'],
    url: 'himawasa.github.io/sharoushi-portal/', href: '/sharoushi-portal/',
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
          {lpCards.map(({ icon, badge, badgeClass, title, desc, tags, url, href, external }, i) => (
            <motion.a
              key={title}
              className="lp-card"
              href={href}
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8, borderColor: 'rgba(255,215,0,0.6)', boxShadow: '0 20px 56px rgba(0,0,0,0.3)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
                <span className="lp-card-arrow">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
