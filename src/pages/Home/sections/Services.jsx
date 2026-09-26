import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'
import '../../rk/Rk.css'

/** ⑤ サービス */
const services = [
  {
    icon: '⚙️', title: 'RKシナリオ作成代行',
    desc: 'キーエンスRKシリーズ／RK-10のシナリオ作成を代行します。工場の試験転記、病院の日計、介護のシフト、士業の請求など、「自分でシナリオを組む時間がない」という現場を代行支援します。',
    list: ['シナリオ作成代行 1万円から', '運用保守代行 月5,000円から', '業種ごとの覚える操作を掲載'],
    to: '/rk',
  },
  {
    icon: '📱', title: '業務アプリ開発',
    desc: '写真撮影→テキスト化、チェックリスト自動作成など、スマホで使えるシンプルなツールを低コストで開発します。',
    list: ['持ち物確認AIアプリ', '書類スキャン・自動整理', 'チェックシートのデジタル化'],
  },
  {
    icon: '🔄', title: '業務自動化（GAS・AI）',
    desc: '手入力・コピペ・転記など、毎日の繰り返し作業を自動化します。「あの人しかやり方がわからない」をなくし、誰でも使える形に整えます。',
    list: ['帳票・書類の自動作成', 'スプレッドシート自動集計', 'Yoom設定・保守'],
  },
  {
    icon: '⚖️', title: '士業向けDX支援',
    desc: '社労士・税理士・弁護士など、紙や手作業が多く残る士業の現場で、期日の確認や書類づくりをGASとAIで自動化します。',
    list: ['給与計算処理の自動化', '帳票・契約書・議事録の自動生成', 'Google Workspaceフル活用支援'],
  },
  {
    icon: '💡', title: '業務改善コンサルティング',
    desc: '「何から始めればいいか分からない」でも大丈夫です。現場の困りごとを一緒に整理して、小さく作ります。',
    list: ['何から手を付けるかの整理', '今あるシステムやExcelの手直し', 'お金をかけずに小さく始める設計'],
  },
  {
    icon: '🛡️', title: 'システム保守・運用',
    desc: 'AIで作った仕組みの点検も対応します。作って終わりではなく、仕組みが分かる人が、続けて保守と運用を引き受けます。',
    list: ['既存GAS・AI製システムの改修', '障害対応・ログ確認', '機能改善の提案・優先度整理'],
  },
  {
    icon: '🤖', title: 'AI活用コンサルティング',
    desc: 'GoogleのAI（Gemini・Vertex AI）を使って、文字の読み取りや文章の下書きなど、手作業のすき間を埋める仕組みを作ります。',
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
          <p className="section-desc">現場の「困った」を、今のパソコンとExcelのまま軽くします</p>
        </Reveal>
        <div className="services-grid">
          {services.map(({ icon, title, desc, list, to }, i) => {
            const inner = (
              <>
                <div className="service-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <ul className="service-list">
                  {list.map(item => <li key={item}>{item}</li>)}
                </ul>
              </>
            )
            return (
              <motion.div
                className="service-card"
                key={title}
                variants={cardV(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -10, boxShadow: '0 16px 40px rgba(180,140,40,0.16)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {to ? <Link to={to} className="service-card-link">{inner}</Link> : inner}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
