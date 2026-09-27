import Reveal from '../../../components/Reveal'

const items = [
  {
    icon: '💻',
    title: '今のパソコンとExcelのまま',
    text: '新しいソフトを覚え直す必要はありません。現場で長年使い慣れた様式を大切にし、手作業の負担だけを減らします。',
  },
  {
    icon: '🔒',
    title: '使い慣れたGoogle環境で安全に動かす',
    text: 'Google Workspace や GAS の仕組みを活用します。大がかりなサーバー購入や専用設備の導入は不要です。',
  },
  {
    icon: '🤝',
    title: '作って終わりにせず、導入後も伴走します',
    text: '実際の運用に合わせて使いながら改善していく前提ですので、導入後も日々の細かな調整をいつでも気軽にご相談いただけます。',
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
