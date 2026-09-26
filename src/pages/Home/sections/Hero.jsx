import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import './Hero.css'

/* ===== Canvas パーティクル（reduced-motion 対応） ===== */
function ParticleCanvas() {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, W, H

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      r: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.28 + 0.08,
    }))

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230,192,0,${p.alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReduced])

  if (prefersReduced) return null
  return <canvas id="hero-canvas" ref={ref} aria-hidden="true" />
}

/* ===== タイピングエフェクト（成果ベース） ===== */
const PHRASES = [
  '毎月の手作業をゼロへ。',
  '現場の事務を低価格で自動化。',
  '始められます。',
]
function TypingText() {
  const prefersReduced = useReducedMotion()
  const [idx, setIdx]   = useState(0)
  const [text, setText]  = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    if (prefersReduced) return
    const target = PHRASES[idx]
    let t
    if (phase === 'typing') {
      if (text.length < target.length) {
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), 60)
      } else {
        t = setTimeout(() => setPhase('pause'), 1800)
      }
    } else if (phase === 'pause') {
      t = setTimeout(() => setPhase('erasing'), 400)
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 30)
      } else {
        t = setTimeout(() => {
          setIdx((i) => (i + 1) % PHRASES.length)
          setPhase('typing')
        }, 30)
      }
    }
    return () => clearTimeout(t)
  }, [text, phase, idx, prefersReduced])

  return (
    <span className="hero-typing">
      {prefersReduced ? PHRASES[0] : text}
      <span className="hero-cursor">|</span>
    </span>
  )
}

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}
const cardVariant = (i) => ({
  hidden:  { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.18 + 0.3, duration: 0.65, ease: 'easeOut' } },
})

const cards = [
  {
    icon: '💻', iconClass: 'icon-gold', label: '今お使いの道具のまま',
    value: '乗り換え不要', valueClass: 'gold',
    sub: '新しいソフトの勉強は不要。ExcelとPCを活かします。',
  },
  {
    icon: '🌻', iconClass: 'icon-blue', label: '現場で動かしてきた実績',
    value: '45件以上', valueClass: 'blue',
    sub: '現場45件以上。公開できるのはその一部です。',
  },
  {
    icon: '🤝', iconClass: 'icon-green', label: '始め方',
    value: '小さく伴走', valueClass: 'green',
    sub: '低価格から。使いながら、一緒に育てます。',
  },
]

const paths = [
  { href: '/for/pro', label: '士業の方' },
  { href: '/for/care', label: '介護・医療の方' },
  { href: '/for/biz', label: '中小企業の方' },
  { href: '/for/factory', label: '工場の方' },
]

export default function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="hero" id="home">
      <ParticleCanvas />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="hero-content">
        <motion.div
          className="hero-left"
          variants={stagger}
          initial={prefersReduced ? false : 'hidden'}
          animate="visible"
        >
          <motion.div variants={fadeUp} className="hero-logo-wrap">
            <img src="/logo.png" alt="HiMaWaSa Sync" className="hero-logo-img" />
            <span className="hero-logo-text">HiMaWaSa Sync</span>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-badge">
            <span className="hero-badge-dot" />
            毎月の手作業を、今のExcelのまま。
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-title">
            <span className="hero-title-static">今のExcelのまま、</span>
            <span className="hero-title-typing" aria-hidden="true">
              <TypingText />
            </span>
            <span className="sr-only">現場の手作業を自動化。</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-sub">
            まずはあなたの現場をお選びください。IT業界25年の現場エンジニアが、面倒な手作業だけを引き受けます。
          </motion.p>

          <motion.div variants={fadeUp} className="hero-cta">
            <Link to="/contact" className="btn-hero-primary">
              まずは話してみる（無料）
            </Link>
            <Link to="/works" className="btn-hero-secondary">
              どれくらい楽になるか見る
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="hero-micro">
            営業の電話はしません。返信はメールかフォームです。
          </motion.p>

          <motion.div variants={fadeUp} className="hero-trust">
            <span className="hero-trust-item">現場 45件以上</span>
            <span className="hero-trust-sep">·</span>
            <span className="hero-trust-item">シフト 5時間→3分</span>
            <span className="hero-trust-sep">·</span>
            <span className="hero-trust-item">請求 半日→0分</span>
            <span className="hero-trust-sep">·</span>
            <span className="hero-trust-item">今のExcelのまま</span>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-paths">
            {paths.map(p => (
              <Link key={p.href} to={p.href} className="hero-path-chip">{p.label}</Link>
            ))}
          </motion.div>
        </motion.div>

        <div className="hero-right">
          {cards.map(({ icon, iconClass, label, value, valueClass, sub }, i) => (
            <motion.div
              key={label}
              className="hero-glass-card"
              variants={cardVariant(i)}
              initial={prefersReduced ? false : 'hidden'}
              animate="visible"
              whileHover={prefersReduced ? {} : { scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="hero-glass-card-top">
                <div className={`hero-card-icon ${iconClass}`}>{icon}</div>
                <span className="hero-card-label">{label}</span>
              </div>
              <div className={`hero-card-value ${valueClass}`}>{value}</div>
              <div className="hero-card-sub">{sub}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {!prefersReduced && (
        <div className="hero-scroll">
          <div className="hero-scroll-mouse">
            <div className="hero-scroll-dot" />
          </div>
          SCROLL
        </div>
      )}
    </section>
  )
}
