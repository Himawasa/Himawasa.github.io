import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/**
 * トップの「業種ごとの てますい」。サイトの軸（業種ごとの てますい と、その周りの自動化）をトップで見せる。
 * 紹介ページ（/temasui/・/temasui/factory/）は素の HTML なので <a href> で開く（React の画面遷移では開けない）。
 * 業種を増やしたら、ここに1枚足す（計画は himawasa-care/docs/temasui-industries/）。
 */
const editions = [
  {
    id: 'care',
    icon: '🏥',
    title: 'てますい 介護版',
    points: ['介護記録・申し送り・事故報告書の下書き', '持ち物チェック・予定カレンダー'],
    href: '/temasui/',
    cta: '介護版を見る',
  },
  {
    id: 'factory',
    icon: '🏭',
    title: 'てますい 工場版',
    points: ['作業日報・引き継ぎ・設備のメンテ記録の下書き', '工具・備品チェック（目印は会社ごとに）'],
    href: '/temasui/factory/',
    cta: '工場版を見る',
  },
  {
    id: 'soon',
    icon: '🏢',
    title: '中小企業版・士業版',
    points: ['日報・議事録・お客さまへのメール', '顧問先への連絡・面談記録'],
    soon: true,
  },
]

const cardV = (i) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' } },
})

export default function TemasuiBand() {
  return (
    <section className="temasui-band" id="temasui">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">TEMASUI</span>
          <h2 className="section-title">業種ごとのアシスタント<span className="nowrap">「てますい」</span></h2>
          <p className="section-desc">
            メモを入れるだけで、現場の書類の下書きが数秒で。月額15,000円（税別）・1か月無料で試せます
          </p>
        </Reveal>
        <div className="temasui-grid">
          {editions.map(({ id, icon, title, points, href, cta, soon }, i) => (
            <motion.article
              key={id}
              className={`temasui-card${soon ? ' temasui-card--soon' : ''}`}
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className="temasui-icon">{icon}</div>
              <h3 className="temasui-title">{title}</h3>
              <ul className="temasui-list">
                {points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              {soon
                ? <span className="temasui-soon">準備中</span>
                : <a href={href} className="temasui-cta">{cta} →</a>}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
