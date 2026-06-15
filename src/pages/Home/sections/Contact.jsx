import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑬ お問い合わせ — リッチ版 */
const contactCards = [
  {
    icon: '📋', title: '無料相談フォーム', titleColor: '#69DB7C',
    desc: '3分で入力完了！\n気軽にご相談ください',
    link: 'フォームを開く →', linkColor: '#69DB7C',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLScsWdmeXdZLbboyxVXzILMIzxCVOOVtbIQuYhaRo10Fnm_kcw/viewform',
    external: true, highlight: true,
    glowColor: 'rgba(105,219,124,0.15)',
  },
  {
    icon: '✉️', title: 'メールで相談する',
    desc: '具体的なご相談・お見積り依頼は\nメールが一番確実です',
    link: 'info@himawasa-sync.com →',
    href: 'mailto:info@himawasa-sync.com',
    glowColor: 'rgba(100,181,246,0.1)',
  },
  {
    icon: '💬', title: 'noteメッセージ',
    desc: '「まず話だけ聞きたい」など\n気軽なご連絡はこちら',
    link: 'メッセージを送る →',
    href: 'https://note.com/himawasa_sync/message', external: true,
    glowColor: 'rgba(255,215,0,0.08)',
  },
  {
    icon: '📝', title: 'noteで実績を見る',
    desc: '開発事例・考え方を\n発信しています',
    link: 'note.com/himawasa_sync →',
    href: 'https://note.com/himawasa_sync', external: true,
    glowColor: 'rgba(255,165,0,0.08)',
  },
]

const cardVariant = (i) => ({
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } },
})

export default function Contact() {
  return (
    <section className="contact" id="contact">
      {/* 背景 */}
      <div className="contact-bg-glow contact-bg-glow-1" />
      <div className="contact-bg-glow contact-bg-glow-2" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal direction="up" className="section-header">
          <span className="section-label" style={{ color: 'rgba(255,215,0,0.7)' }}>CONTACT</span>
          <h2 className="section-title" style={{ color: '#fff' }}>
            お問い合わせ
          </h2>
          <p className="section-desc" style={{ color: 'rgba(255,255,255,0.5)' }}>
            「まず話だけ聞きたい」「デモを見てみたい」など、<br />
            小さなご相談からお気軽にどうぞ
          </p>
        </Reveal>

        <div className="contact-cards">
          {contactCards.map(({ icon, title, titleColor, desc, link, linkColor, href, external, highlight, glowColor }, i) => (
            <motion.a
              key={title}
              href={href}
              className="contact-card"
              style={{
                border: highlight ? '1px solid rgba(105,219,124,0.4)' : '1px solid rgba(255,255,255,0.08)',
                '--glow': glowColor,
              }}
              variants={cardVariant(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className="cc-icon">{icon}</div>
              <h4 style={{ color: titleColor || '#FFD700' }}>{title}</h4>
              <p>{desc.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</p>
              <span className="cc-link" style={{ color: linkColor || 'rgba(255,215,0,0.8)' }}>{link}</span>
            </motion.a>
          ))}
        </div>

        <Reveal direction="up" delay={0.4}>
          <div className="contact-note-box">
            💡 「MochiSyncを試したい」「PDFの自動変換を聞きたい」「GASで自動化できる？」<br />
            どんな小さなご相談でも歓迎です。<strong>初回相談は無料</strong>です。
          </div>
        </Reveal>
      </div>
    </section>
  )
}
