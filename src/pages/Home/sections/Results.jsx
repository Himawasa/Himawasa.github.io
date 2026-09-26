import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** Before→After — 定量比較 */
const results = [
  {
    impact: '5時間→3分', unit: '作業時間 99%削減',
    label: '📅 シフト表・勤務体制作成',
    before: 'KING OF TIMEの画面を見ながら、Excelへ毎月3〜5時間かけて手入力。',
    after: 'データを読み込み、ボタン1つで指定のExcel様式へ自動変換します。',
  },
  {
    impact: '半日→0分', unit: '毎月の請求作業',
    label: '📄 請求書の一括生成・送信',
    before: '顧客ごとに金額を手入力。30件のPDF化とメール送信に半日かかる。',
    after: '顧客リストから一括生成。PDF保存と個別メール送信まで自動で行います。',
  },
  {
    impact: 'ひと目で分かる', unit: '予定・往診・残薬',
    label: '🗓️ CareSync 介護予定カレンダー',
    before: '予定・利用変更・往診・残薬が、口頭と紙と別シートに散らばっている。',
    after: '施設全体を一画面に。現場が同じ情報を見ながら動ける。',
  },
  {
    impact: '検索ゼロ', unit: '期日は自動でお知らせ',
    label: '⚖️ 士業の顧客台帳・期日管理',
    before: 'Excel・Word・紙が分散。期日確認を手帳で行い、常に確認漏れの不安を抱えている。',
    after: '顧客名入力で全履歴が一画面。7日前・3日前・当日に自動でお知らせします。',
  },
]

const cardV = (i) => ({
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.65, ease: 'easeOut' } },
})

export default function Results() {
  return (
    <section className="results" id="results">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">RESULTS</span>
          <h2 className="section-title">導入で変わる、現場の時間</h2>
          <p className="section-desc">導入の前と後を、数字でお見せします</p>
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
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(180,140,40,0.12)' }}
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
