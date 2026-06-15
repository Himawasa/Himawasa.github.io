import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑫ 導入の流れ */
const steps = [
  { num: 1, icon: '💬', title: '無料ヒアリング', desc: 'まず「困っていること」をお聞かせください。noteメッセージ・メールどちらでもOK。初回相談は無料です。' },
  { num: 2, icon: '📋', title: 'ご提案・お見積り', desc: '1週間以内に具体的なご提案書とお見積りをご提示。小さく始めて育てる方針です。' },
  { num: 3, icon: '⚡', title: '高速プロトタイプ', desc: 'GAS・Python・AIを活用し、最短1週間で動くものをお見せします。使いながら改善していきます。' },
  { num: 4, icon: '🚀', title: '本番運用・保守', desc: '現場スタッフへのレクチャーも込み。運用後もチャットで気軽に相談いただけます。' },
]

const stepV = (i) => ({
  hidden:  { opacity: 0, y: 32, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' } },
})

export default function Flow() {
  return (
    <section className="flow" id="flow">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">HOW IT WORKS</span>
          <h2 className="section-title">導入の流れ</h2>
          <p className="section-desc">初めての方も安心。相談から運用開始まで<strong>最短2週間</strong>で対応します。</p>
        </Reveal>
        <div className="flow-grid">
          {steps.map(({ num, icon, title, desc }, i) => (
            <motion.div
              className="flow-item"
              key={num}
              variants={stepV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.1), 0 0 0 2px rgba(255,215,0,0.3)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="flow-num">{num}</div>
              <div className="flow-icon">{icon}</div>
              <div className="flow-title">{title}</div>
              <div className="flow-desc">{desc}</div>
              {i < steps.length - 1 && <div className="flow-arrow">›</div>}
            </motion.div>
          ))}
        </div>
        <p className="flow-period">初回相談から本番稼働まで <strong>最短2週間〜</strong>。まずはお気軽にご連絡ください。</p>
      </div>
    </section>
  )
}
