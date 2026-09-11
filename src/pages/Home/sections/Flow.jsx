import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑫ 導入の流れ */
const steps = [
  { num: 1, icon: '💬', title: 'まず、話を聞く', desc: '売り込みはありません。困っている作業と、今のExcelを見せてください。初回は無料です。' },
  { num: 2, icon: '📂', title: '今のファイルで試す', desc: '様式を変えずに動くかを、一緒に確認します。「合わなければ縮小」が前提です。' },
  { num: 3, icon: '🚀', title: '現場で使い始める', desc: 'レクチャー込み。使いながら直します。作って放置はしません。' },
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
          <p className="section-desc">相談から現場稼働まで。ステップは3つだけです。</p>
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
        <p className="flow-period">途中で合わないと感じたらいつでもやめられます。まずはステップ1の「お話を聞く」ところからお気軽にどうぞ。</p>
      </div>
    </section>
  )
}
