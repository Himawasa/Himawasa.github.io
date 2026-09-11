import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ④ 大切にしていること */
const values = [
  { icon: '👂', title: '現場の声を、最初に聞く', heading: <>現場の声を、最初に<span className="nowrap">聞く</span></>, text: '「何に困っているか」は、日々業務をしている現場のスタッフが一番よく知っています。技術の話より先に、まず現場の話を聞きます。' },
  { icon: '✨', title: '難しい言葉を使わない', heading: '難しい言葉を使わない', text: '「API」「インスタンス」とか言われても困りますよね。現場の言葉で伝えて、現場の言葉で一緒に考えます。' },
  { icon: '🌱', title: '小さく作って、一緒に育てる', heading: <>小さく作って、一緒に<span className="nowrap">育てる</span></>, text: '最初から完璧なものは作れません。まず動くものを早く出して、使いながら直します。' },
  { icon: '🤝', title: '作ったあとも、ずっと', heading: '作ったあとも、ずっと', text: '運用保守や機能改善も継続してサポートします。いつでも気軽に相談できるパートナーを目指しています。' },
]

const cardV = (i) => ({
  hidden:  { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } },
})

export default function Values() {
  return (
    <section className="values" id="values">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">VALUES</span>
          <h2 className="section-title">大切にしていること</h2>
          <p className="section-desc">技術より先に、いつも大事にしていることがあります</p>
        </Reveal>
        <div className="values-grid">
          {values.map(({ icon, title, heading, text }, i) => (
            <motion.div
              className="value-card"
              key={title}
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8, borderColor: 'rgba(255,215,0,0.8)', boxShadow: '0 16px 40px rgba(180,140,40,0.14)' }}
            >
              <div className="value-icon">{icon}</div>
              <h4>{heading}</h4>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
