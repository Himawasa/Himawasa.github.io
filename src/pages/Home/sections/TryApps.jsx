import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'
import { TRY_APPS } from '../../../seo/site'

const cardV = (i) => ({
  hidden:  { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.18, duration: 0.65, ease: 'easeOut' } },
})

export default function TryApps({ hideHeader = false }) {
  return (
    <section className="try-apps" id="try-apps">
      <div className="container">
        {!hideHeader && (
          <Reveal direction="up" className="section-header">
            <span className="section-label">TRY NOW</span>
            <h2 className="section-title">体験できるミニアプリ</h2>
            <p className="section-desc">法人向けのご相談とは別に、まずは触ってみたい方向けです。</p>
          </Reveal>
        )}
        <div className="try-apps-grid">
          {TRY_APPS.map(({ icon, name, desc, btn, btnColor, note, href, borderColor }, i) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="try-card"
              style={{ border: `2px solid ${borderColor}`, '--hover-border': btnColor }}
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -10, scale: 1.03, borderColor: btnColor, boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${borderColor}` }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#1a1a1a', marginBottom: '8px' }}>{name}</h3>
              <p className="try-card-desc" style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.7' }}>{desc}</p>
              <span className="try-card-btn" style={{ background: btnColor, color: '#111', padding: '10px 28px', borderRadius: '24px', fontWeight: 900, fontSize: '14px' }}>{btn}</span>
              <div className="try-card-note" style={{ marginTop: '12px', fontSize: '11px', color: '#999' }}>{note}</div>
            </motion.a>
          ))}
        </div>
        <Reveal direction="fade" delay={0.4}>
          <p style={{ textAlign: 'center', marginTop: '32px', color: '#888', fontSize: '13px' }}>
            ※ 登録やログインはいりません。写真やファイルは保存しません。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
