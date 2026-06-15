import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

const counters = [
  { target: 45, suffix: '+', label: '開発プロジェクト総数', icon: '🚀', color: '#FFD700' },
  { target: 17, suffix: '+', label: '現在稼働中のシステム', icon: '⚡', color: '#69DB7C' },
  { target: 8,  suffix: '',  label: '使用技術・言語数',     icon: '🛠️', color: '#64b5f6' },
  { target: 25, suffix: '年+', label: 'IT業界キャリア',    icon: '🏆', color: '#FFA500' },
]

function CountItem({ target, suffix, label, icon, color, active }) {
  const prefersReduced = useReducedMotion()
  const [count, setCount] = useState(prefersReduced ? target : 0)

  useEffect(() => {
    if (!active || prefersReduced) { setCount(target); return }
    const duration = 2000
    const step = 16
    const increment = target / (duration / step)
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, target)
      setCount(Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, step)
    return () => clearInterval(timer)
  }, [active, target, prefersReduced])

  return (
    <div className="counter-item">
      <div className="counter-icon" style={{ color }}>{icon}</div>
      <div className="counter-num" style={{ color }}>
        <span>{count}</span>
        <span className="counter-suffix">{suffix}</span>
      </div>
      <div className="counter-label">{label}</div>
      <div className="counter-bar">
        <div
          className="counter-bar-fill"
          style={{
            background: color,
            width: active ? '100%' : '0%',
          }}
        />
      </div>
    </div>
  )
}

/** ⑦ カウンター帯 — ダーク版リッチ */
export default function CounterBand() {
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="counter-band" id="counter-band" ref={ref}>
      <div className="cb-glow cb-glow-l" />
      <div className="cb-glow cb-glow-r" />
      <Reveal direction="up" className="cb-header">
        <p className="cb-eyebrow">NUMBERS</p>
        <h2 className="cb-title">実績が語ること</h2>
      </Reveal>
      <div className="counter-grid">
        {counters.map(c => (
          <CountItem key={c.label} {...c} active={active} />
        ))}
      </div>
    </div>
  )
}
