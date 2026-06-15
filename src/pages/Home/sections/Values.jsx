import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ④ 大切にしていること */
const values = [
  { icon: '👂', title: '現場の声を、最初に聴く', text: '「何が困っているか」は現場の人が一番知っています。技術の話より先に、まず現場の話を聞きます。' },
  { icon: '✨', title: '難しい言葉を使わない', text: '「API」「インスタンス」とか言われても困りますよね。現場の言葉で伝えて、現場の言葉で一緒に考えます。' },
  { icon: '🌱', title: '小さく作って、一緒に育てる', text: '最初から完璧なものは作れません。「まず動くもの」を素早くお見せして、使いながら一緒に良くしていきます。' },
  { icon: '🤝', title: '作ったあとも、ずっと', text: '「納品して終わり」はしません。現場の声を聞き続けて、保守も改善も責任を持ちます。「いつでも相談できる人」でありたい。' },
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
          {values.map(({ icon, title, text }, i) => (
            <motion.div
              className="value-card"
              key={title}
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8, borderColor: 'rgba(255,215,0,0.4)', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}
            >
              <div className="value-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
