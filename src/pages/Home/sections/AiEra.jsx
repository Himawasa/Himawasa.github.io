import Reveal from '../../../components/Reveal'
import { AI_ERA } from '../../../seo/site'

const icons = ['🌱', '👋', '🤝']

export default function AiEra({ hideHeader = false }) {
  return (
    <section className="ai-era" id="ai-era">
      <div className="container">
        {!hideHeader && (
        <Reveal direction="up" className="section-header">
          <span className="section-label">AI ERA</span>
          <h2 className="section-title">{AI_ERA.heading}</h2>
          <p className="section-desc">{AI_ERA.lead}</p>
        </Reveal>
        )}
        <div className="ai-era-grid">
          {AI_ERA.points.map((it, i) => (
            <div className="ai-era-card" key={it.title}>
              <div className="ai-era-icon">{icons[i]}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
        <p className="ai-era-foot">
          使い方の相談も、今ある仕組みの点検もできます。{' '}
          <a href="/contact">話してみてください。</a>
        </p>
      </div>
    </section>
  )
}
