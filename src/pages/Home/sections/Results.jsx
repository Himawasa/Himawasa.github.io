import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑧ Before→After 実績 */
const results = [
  {
    impact: '30分→0分', unit: '毎日の仕分け作業',
    label: '📠 FAX仕分け作業',
    before: '毎日30分の手作業。「これどこ行き？」の確認が絶えない',
    after: 'AIが自動分類→ゼロ分。月間5,000枚が完全自動化',
  },
  {
    impact: '3秒', unit: 'スマホ撮影だけで完了',
    label: '📋 持ち物チェック',
    before: '紙のリストで目視確認。「忘れ物」で毎週トラブル',
    after: 'スマホで撮影→AIが3秒で判定。忘れ物ゼロを達成',
  },
  {
    impact: '10分→0分', unit: '患者ごとの準備時間',
    label: '🏥 電子カルテ自動作成',
    before: '診察前にカルテを手作業で準備。患者ごとに10分以上',
    after: '外部APIから自動取得→カルテ自動生成。準備時間ゼロ',
  },
]

const cardV = (i) => ({
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.65, ease: 'easeOut' } },
})

export default function Results() {
  return (
    <section className="results" id="results">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">RESULTS</span>
          <h2 className="section-title">導入で変わったこと</h2>
          <p className="section-desc">「作って終わり」ではなく、現場が本当に変わりました</p>
        </Reveal>
        <div className="results-grid">
          {results.map(({ impact, unit, label, before, after }, i) => (
            <motion.div
              className="result-card"
              key={label}
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="result-impact">
                <div className="result-impact-num">{impact}</div>
                <div className="result-impact-unit">{unit}</div>
              </div>
              <div className="result-label">{label}</div>
              <div className="result-before"><span className="rb-label">Before</span>{before}</div>
              <div className="result-after"><span className="ra-label">After</span><strong>{after}</strong></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
