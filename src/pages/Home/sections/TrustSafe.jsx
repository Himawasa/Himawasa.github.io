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
    title: '作って終わりにせず、導入後も伴走します',
    text: '導入後も日々の業務に合わせて改善を重ねていく前提ですので、いつでも気軽にご相談いただけます。',
  },
]

export default function TrustSafe() {
  return (
    <section className="trust-safe" id="trust">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">PEACE OF MIND</span>
          <h2 className="section-title">導入前によくいただく<span className="nowrap">ご不安について</span></h2>
          <p className="section-desc">所長・施設長の方から「うちの現場でも使えるか？」とよくご相談いただくポイントをまとめました。</p>
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
