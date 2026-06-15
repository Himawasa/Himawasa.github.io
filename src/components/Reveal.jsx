/**
 * Reveal.jsx
 * whileInView で要素をふわっと表示する共通コンポーネント。
 * prefers-reduced-motion の場合は即表示。
 */
import { motion, useReducedMotion } from 'framer-motion'

const presets = {
  up:    { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
}

/**
 * @param {'up'|'left'|'right'|'fade'|'scale'} direction
 * @param {number} delay  秒
 * @param {number} duration 秒
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  className = '',
  style = {},
  as = 'div',
}) {
  const prefersReduced = useReducedMotion()
  const variant = presets[direction]

  if (prefersReduced) {
    const Tag = as
    return <Tag className={className} style={style}>{children}</Tag>
  }

  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      style={style}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </MotionTag>
  )
}
