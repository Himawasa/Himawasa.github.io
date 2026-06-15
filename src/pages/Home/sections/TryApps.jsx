import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑩ 今すぐ試せるアプリ */
const apps = [
  {
    icon: '📦', name: 'MochiSync',
    desc: '写真を撮るだけで\n持ち物リストを自動作成',
    btn: '📷 スマホで試す →', btnColor: '#69DB7C',
    note: '介護施設の入所時に最適',
    href: 'https://himawasa-sync.com/mochisync/',
    borderColor: 'rgba(105,219,124,0.4)', hoverColor: '#69DB7C',
  },
  {
    icon: '📄', name: 'PDFuse Sync',
    desc: 'PDFをアップロードするだけで\nExcelに自動変換',
    btn: '📄 PCで試す →', btnColor: '#64b5f6',
    note: '請求書・帳票のデータ化に',
    href: 'https://himawasa-sync.com/pdfuse/',
    borderColor: 'rgba(100,180,246,0.4)', hoverColor: '#64b5f6',
  },
  {
    icon: '📋', name: 'LegoSync',
    desc: 'カメラで撮るだけで\nAIが書類を自動要約',
    btn: '📷 スマホで試す →', btnColor: '#FFB347',
    note: 'どんな業界の書類でもOK',
    href: 'https://himawasa-sync.com/legosync/',
    borderColor: 'rgba(255,179,71,0.4)', hoverColor: '#FFB347',
  },
]

const cardV = (i) => ({
  hidden:  { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.18, duration: 0.65, ease: 'easeOut' } },
})

export default function TryApps() {
  return (
    <section id="try-apps" style={{ background: 'linear-gradient(135deg, #0a1628, #1a2744)', padding: '80px 0' }}>
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label" style={{ color: '#69DB7C' }}>TRY NOW</span>
          <h2 className="section-title" style={{ color: '#fff' }}>今すぐ無料で試せるアプリ</h2>
          <p className="section-desc" style={{ color: 'rgba(255,255,255,0.6)' }}>アカウント登録不要。スマホでタップするだけですぐ使えます</p>
        </Reveal>
        <div className="try-apps-grid">
          {apps.map(({ icon, name, desc, btn, btnColor, note, href, borderColor }, i) => (
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
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>{name}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', lineHeight: '1.7' }}>
                {desc.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
              </p>
              <span style={{ display: 'inline-block', background: btnColor, color: '#111', padding: '10px 28px', borderRadius: '24px', fontWeight: 900, fontSize: '14px' }}>{btn}</span>
              <div style={{ marginTop: '12px', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{note}</div>
            </motion.a>
          ))}
        </div>
        <Reveal direction="fade" delay={0.4}>
          <p style={{ textAlign: 'center', marginTop: '32px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            ※ Googleアカウントでのログインが必要です。データは安全に管理されます。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
