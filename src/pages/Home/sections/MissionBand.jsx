import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ② ミッション帯 — リッチ版 */
export default function MissionBand() {
  return (
    <div className="mission-band">
      {/* 背景グロー */}
      <div className="mb-glow mb-glow-l" />
      <div className="mb-glow mb-glow-r" />

      <Reveal direction="up" className="mb-inner">
        <p className="mb-label">OUR MISSION</p>
        <h2 className="mb-title">
          「難しいIT」はいりません。
          <br />
          <span className="mb-title-hl">現場で使える、シンプルなソフトウェア。</span>
        </h2>
        <div className="mb-chips">
          {['介護現場', '医療機関', '士業事務所', '中小企業', 'スタートアップ'].map(t => (
            <motion.span
              key={t}
              className="mb-chip"
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,215,0,0.18)' }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
