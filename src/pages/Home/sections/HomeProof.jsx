import { Link } from 'react-router-dom'

const proofs = [
  { label: 'シフト作成', from: '5時間', to: '3分' },
  { label: '請求の一括', from: '半日', to: '0分' },
]

export default function HomeProof() {
  return (
    <section className="home-proof" aria-label="現場で短くなった作業の例">
      <div className="container home-proof-inner">
        <p className="home-proof-kicker">許可をいただいた現場の例</p>
        {proofs.map((p) => (
          <p key={p.label} className="home-proof-item">
            <span className="home-proof-label">{p.label}</span>
            <span className="home-proof-from">{p.from}</span>
            <span className="home-proof-arrow" aria-hidden="true">→</span>
            <span className="home-proof-to">{p.to}</span>
          </p>
        ))}
        <Link to="/works" className="home-proof-more">実績をもっと見る →</Link>
      </div>
    </section>
  )
}
