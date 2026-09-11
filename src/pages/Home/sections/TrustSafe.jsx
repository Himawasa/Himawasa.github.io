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
    text: '作って終わりにしない、が仕事です。使いながら直す前提なので、導入後も話しやすい相手でい続けます。',
  },
]

export default function TrustSafe() {
  return (
    <section className="trust-safe" id="trust">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">PEACE OF MIND</span>
          <h2 className="section-title">不安なところは、先に潰しておきます</h2>
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
