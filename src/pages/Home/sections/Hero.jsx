import { useEffect, useRef, useState } from 'react'
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

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00025,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.45 + 0.15,
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
        ctx.fillStyle = `rgba(255,215,0,${p.alpha})`
        ctx.fill()
      })
      // 近い粒子を線でつなぐ（O(n²) だが 55粒子なら十分軽い）
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = (particles[i].x - particles[j].x) * W
          const dy = (particles[i].y - particles[j].y) * H
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x * W, particles[i].y * H)
            ctx.lineTo(particles[j].x * W, particles[j].y * H)
            ctx.strokeStyle = `rgba(255,215,0,${0.07 * (1 - d / 130)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReduced])

  if (prefersReduced) return null
  return <canvas id="hero-canvas" ref={ref} />
}

/* ===== タイピングエフェクト ===== */
const PHRASES = [
  '現場の手作業を自動化する',
  'GAS・Python・AIで実現する',
  '介護・医療・士業を変える',
]
function TypingText() {
  const prefersReduced = useReducedMotion()
  const [idx, setIdx]   = useState(0)
  const [text, setText]  = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'pause' | 'erasing'

  useEffect(() => {
    if (prefersReduced) { setText(PHRASES[0]); return }
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
        setIdx((idx + 1) % PHRASES.length)
        setPhase('typing')
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

/* ===== アニメーション設定 ===== */
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

/* ===== グラスカードデータ（サイト全体と統一） ===== */
const cards = [
  {
    icon: '⚡', iconClass: 'icon-gold', label: '業務時間の最大削減率',
    value: '97%', valueClass: 'gold',
    sub: '30分 → 1分（持ち物確認業務）',
    barWidth: '97%', barColor: 'linear-gradient(90deg, #FFD700, #FFA500)',
  },
  {
    icon: '🤖', iconClass: 'icon-blue', label: '自動化・効率化実績',
    value: '45+', valueClass: 'blue',
    sub: '介護 / 医療 / 士業 / 中小企業',
    barWidth: '75%', barColor: 'linear-gradient(90deg, #64b5f6, #2196F3)',
  },
  {
    icon: '🚀', iconClass: 'icon-green', label: '公開中サービス・LP',
    value: '7本', valueClass: 'green',
    sub: 'GAS × AI × Python × Java',
    barWidth: '55%', barColor: 'linear-gradient(90deg, #69DB7C, #40C057)',
  },
]

/* ===== メイン ===== */
export default function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="hero">
      <ParticleCanvas />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      <div className="hero-content">
        {/* ----- 左：テキスト ----- */}
        <motion.div
          className="hero-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* ロゴ */}
          <motion.div variants={fadeUp} className="hero-logo-wrap">
            <img src="/logo.png" alt="HiMaWaSa Sync" className="hero-logo-img" />
            <span className="hero-logo-text">HiMaWaSa Sync</span>
          </motion.div>

          {/* バッジ */}
          <motion.div variants={fadeUp} className="hero-badge">
            <span className="hero-badge-dot" />
            現場のDXを、シンプルに。
          </motion.div>

          {/* メインキャッチ */}
          <motion.h1 variants={fadeUp} className="hero-title">
            <span className="hero-title-line">ソフトウェアで</span>
            <span className="hero-title-line hero-title-typing">
              <TypingText />
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-sub">
            面倒な手作業をAI・GAS・Pythonで自動化。<br />
            <strong>大切な時間と、現場の笑顔</strong>を取り戻します。
          </motion.p>

          {/* CTA ボタン */}
          <motion.div variants={fadeUp} className="hero-cta">
            <a href="#try-apps" className="btn-hero-primary">
              🚀 無料で試す
            </a>
            <a href="#contact" className="btn-hero-secondary">
              無料相談はこちら →
            </a>
          </motion.div>

          {/* 信頼バッジ列 */}
          <motion.div variants={fadeUp} className="hero-trust">
            <span className="hero-trust-item">✅ アカウント登録不要</span>
            <span className="hero-trust-sep">·</span>
            <span className="hero-trust-item">✅ 初回相談 無料</span>
            <span className="hero-trust-sep">·</span>
            <span className="hero-trust-item">✅ 最短1週間で稼働</span>
          </motion.div>
        </motion.div>

        {/* ----- 右：グラスカード ----- */}
        <div className="hero-right">
          {cards.map(({ icon, iconClass, label, value, valueClass, sub, barWidth, barColor }, i) => (
            <motion.div
              key={label}
              className="hero-glass-card"
              variants={cardVariant(i)}
              initial="hidden"
              animate="visible"
              whileHover={prefersReduced ? {} : { scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="hero-glass-card-top">
                <div className={`hero-card-icon ${iconClass}`}>{icon}</div>
                <span className="hero-card-label">{label}</span>
              </div>
              <div className={`hero-card-value ${valueClass}`}>{value}</div>
              <div className="hero-card-sub">{sub}</div>
              <div className="hero-card-bar">
                <div className="hero-card-bar-fill" style={{ width: barWidth, background: barColor }} />
              </div>
            </motion.div>
          ))}

          {/* 追加：テクノロジーバッジ */}
          <motion.div
            className="hero-tech-badges"
            variants={cardVariant(3)}
            initial="hidden"
            animate="visible"
          >
            {['GAS', 'Python', 'Gemini AI', 'Java', 'React'].map(t => (
              <span key={t} className="hero-tech-badge">{t}</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ----- スクロールダウン ----- */}
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
