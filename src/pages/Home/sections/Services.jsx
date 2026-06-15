import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑤ サービス */
const services = [
  {
    icon: '📱', title: '業務アプリ開発',
    desc: '写真撮影→テキスト化、チェックリスト自動作成など、スマホで使えるシンプルなツールを低コストで開発します。',
    list: ['持ち物確認AIアプリ', '書類スキャン・自動整理', 'チェックシートのデジタル化'],
  },
  {
    icon: '🔄', title: '業務自動化（GAS・AI）',
    desc: '手入力・コピペ・転記作業など、毎日繰り返す業務を自動化。属人化しない仕組みを低コストで実現します。',
    list: ['帳票・書類の自動作成', 'スプレッドシート自動集計', 'Yoom設定・保守'],
  },
  {
    icon: '⚖️', title: '士業向けDX支援',
    desc: '社労士・税理士・弁護士など、DXが遅れている士業現場をGAS＋AIでシンプルに自動化します。',
    list: ['給与計算処理の自動化', '帳票・契約書・議事録の自動生成', 'Google Workspaceフル活用支援'],
  },
  {
    icon: '💡', title: '業務改善コンサルティング',
    desc: '「何から始めればいいか分からない」そんなご相談も歓迎。現場の課題を一緒に整理し、最適なシステムを設計します。',
    list: ['DX推進の方向性相談', '既存システムの改善提案', 'コスト最小・効果最大の設計'],
  },
  {
    icon: '🛡️', title: 'システム保守・運用',
    desc: '作って終わりではなく、運用しながら育てるのが現場DXの基本。継続的なサポートを提供します。',
    list: ['既存GASシステムの改修・追加', '障害対応・ログ確認', '機能改善の提案・優先度整理'],
  },
  {
    icon: '🤖', title: 'AI活用コンサルティング',
    desc: 'Gemini AI・Vertex AIなどGoogleの最新AI技術を活用し、現場に合った形で業務に組み込むご支援をします。',
    list: ['AI画像認識・文書解析', '議事録・要約の自動生成', 'チャットボット開発・運用'],
  },
]

const cardV = (i) => ({
  hidden:  { opacity: 0, y: 36, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } },
})

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">SERVICES</span>
          <h2 className="section-title">ご提供できるサービス</h2>
          <p className="section-desc">現場が抱える「困った」をソフトウェアで解決します</p>
        </Reveal>
        <div className="services-grid">
          {services.map(({ icon, title, desc, list }, i) => (
            <motion.div
              className="service-card"
              key={title}
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -10, boxShadow: '0 28px 64px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.25)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="service-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <ul className="service-list">
                {list.map(item => <li key={item}>{item}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
