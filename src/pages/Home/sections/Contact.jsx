import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑬ お問い合わせ — リッチ版 */
const contactCards = [
  {
    icon: '📋', title: '無料相談フォーム', titleColor: '#69DB7C',
    desc: '3分で終わります。\n返信はメールです',
    link: 'フォームを開く →', linkColor: '#69DB7C',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLScsWdmeXdZLbboyxVXzILMIzxCVOOVtbIQuYhaRo10Fnm_kcw/viewform',
    external: true, highlight: true,
    glowColor: 'rgba(105,219,124,0.15)',
  },
  {
    icon: '✉️', title: 'メールで相談する',
    desc: '相談や見積もりは\nメールが確実です',
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

const consultSteps = [
  {
    n: '1',
    title: 'フォームから送信（約3分）',
    text: '希望の日時と、いま困っていることを短く書いてください。',
  },
  {
    n: '2',
    title: '日程の確認メールが届く',
    text: '24時間以内に、ZoomなどのURLをメールします。',
  },
  {
    n: '3',
    title: '画面を見せながら30分おしゃべり',
    text: '準備はいりません。いつものExcelや画面を出して、「ここが面倒」と指さしてください。',
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
          <span className="section-label">CONTACT</span>
          <h2 className="section-title section-title--lg">売り込みなしで、30分<span className="nowrap">だけ</span></h2>
          <p className="section-desc">
            今のExcelを見ながらで大丈夫です。<br />
            「まずは話を聞いてみたい」だけでも歓迎です。相談のあと、こちらから営業の電話をかけることはありません。
          </p>
        </Reveal>

        <Reveal direction="up" className="contact-flow">
          <h3 className="contact-flow-title">無料相談の流れ（3ステップ）</h3>
          <ol>
            {consultSteps.map((s, i) => (
              <li key={s.n}>
                <span className="contact-flow-num" aria-hidden="true">{s.n}</span>
                <p className="contact-flow-step">{s.title}</p>
                <p className="contact-flow-text">{s.text}</p>
                {i < consultSteps.length - 1 && <span className="contact-flow-arrow" aria-hidden="true">›</span>}
              </li>
            ))}
          </ol>
          <p className="contact-flow-note">
            相談だけで終了しても大丈夫です。
          </p>
        </Reveal>

        <div className="contact-cards">
          {contactCards.map(({ icon, title, titleColor, desc, link, linkColor, href, external, highlight, glowColor }, i) => (
            <motion.a
              key={title}
              href={href}
              className="contact-card"
              style={{
                border: highlight ? '2px solid #69DB7C' : '1px solid #F0E4C4',
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
              <h4 style={{ color: titleColor || '#C99700' }}>{title}</h4>
              <p>{desc.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</p>
              <span className="cc-link" style={{ color: linkColor || '#C99700' }}>{link}</span>
            </motion.a>
          ))}
        </div>

        <Reveal direction="up" delay={0.4}>
          <div className="contact-note-box">
            <strong>初回の相談は無料</strong>です。合わなければ、そこで終わりにしてください。
          </div>
        </Reveal>
      </div>
    </section>
  )
}
