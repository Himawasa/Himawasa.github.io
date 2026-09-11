import { useState } from 'react'
import Reveal from '../../../components/Reveal'
import { FAQS } from '../../../seo/site'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title section-title--lg" id="faq-heading">買う直前に、よく止まるところ</h2>
          <p className="section-desc">聞く前に、よく止まるところを書いておきます</p>
        </Reveal>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <details
              className={`faq-item${open === i ? ' open' : ''}`}
              key={item.q}
              open={open === i}
              onToggle={(e) => {
                if (e.currentTarget.open) setOpen(i)
                else if (open === i) setOpen(-1)
              }}
            >
              <summary className="faq-q">
                {item.q}
                <span className="faq-mark" aria-hidden="true">{open === i ? '−' : '+'}</span>
              </summary>
              <p className="faq-a">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="faq-foot">
          文字だけでは分からないことも多いかと思います。{' '}
          <a href="/contact">30分の無料相談で、実際の画面を見ながらご質問ください。</a>
        </p>
      </div>
    </section>
  )
}
