import Reveal from '../../../components/Reveal'

const items = [
  {
    icon: '💻',
    title: '今のパソコンとExcelのまま',
    text: '新しいソフトを覚え直す必要はありません。現場の様式を活かして、手作業だけを減らします。',
  },
  {
    icon: '🔒',
    title: 'いつものGoogleの上で動かす',
    text: 'Google Workspace や GAS の仕組みを使います。新しいサーバーを買う話ではありません。',
  },
  {
    icon: '☕',
    title: '相談のあと、放っておきません',
    text: '作って終わりにはしません。使いながら直していく前提なので、導入後も気軽に声をかけてください。',
  },
]

export default function TrustSafe() {
  return (
    <section className="trust-safe" id="trust">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">PEACE OF MIND</span>
          <h2 className="section-title">始める前によく聞かれる不安に、お答えします</h2>
          <p className="section-desc">所長・施設長が「うちでも大丈夫か」と聞かれるポイントだけ、先に書いてあります</p>
        </Reveal>
        <div className="trust-grid">
          {items.map(it => (
            <div className="trust-card" key={it.title}>
              <div className="trust-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
