import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'
import { SITE } from '../../../seo/site'
import '../../rk/Rk.css'

const FORM = SITE.formUrl

const plans = [
  {
    name: 'スタートプラン',
    price: '10,000',
    unit: '円 / 月',
    desc: 'まずは1つの自動化から',
    features: ['DXメニューから機能を1つ選択', '今のPC・Excelのまま利用', '初期導入の設定サポート'],
    highlight: false,
  },
  {
    name: 'スタンダードDX',
    price: '25,000',
    unit: '円 / 月',
    desc: '現場の主要業務をまとめて',
    features: ['自動化機能を3つ組み合わせ', '月1回の業務改善メンテナンス', '代表が直接伴走'],
    highlight: true,
  },
  {
    name: '現場フル自動化',
    price: '50,000',
    unit: '円〜 / 月',
    desc: '基幹連携まで含めた構築',
    features: ['ShiftSync等の特化ツール', 'KING OF TIME・既存システム連携', '独自の仕組みを一緒に設計'],
    highlight: false,
  },
]

const HOURLY = 2000
const SAVE_RATE = 0.9

export default function Pricing() {
  const [hours, setHours] = useState(8)

  const result = useMemo(() => {
    const yearHours = Math.round(hours * 12 * SAVE_RATE)
    const yearYen = yearHours * HOURLY
    return { yearHours, yearYen }
  }, [hours])

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">PRICING</span>
          <h2 className="section-title">わかりやすい料金の目安</h2>
          <p className="section-desc">
            高額なシステム入れ替えは不要です。現場に合わせて小さく始められます。<br />
            ※ 下記は目安です。実際のご提案は無料相談で個別にお出しします。
          </p>
        </Reveal>

        <div className="rk-price" style={{ marginBottom: 36 }}>
          <div className="rk-price-card">
            <p className="rk-price-label">RKシナリオ作成代行</p>
            <p className="rk-price-num">10,000<span>円〜</span></p>
            <p>キーエンスRKシリーズ／RK-10。自分で組まなくてよいです。</p>
          </div>
          <div className="rk-price-card is-main">
            <p className="rk-price-label">RK運用保守代行</p>
            <p className="rk-price-num">5,000<span>円〜 / 月</span></p>
            <p>止まったら戻す。画面変更の追随。</p>
          </div>
          <div className="rk-price-card">
            <p className="rk-price-label">詳しく見る</p>
            <p className="rk-price-num" style={{ fontSize: 22 }}>工場 / 病院 / 介護</p>
            <p><a href="/rk/" style={{ fontWeight: 800, color: '#8A6D00' }}>RKシナリオ作成代行へ →</a></p>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              className={`price-card${p.highlight ? ' featured' : ''}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {p.highlight && <div className="price-badge">よく選ばれます</div>}
              <h3>{p.name}</h3>
              <p className="price-desc">{p.desc}</p>
              <div className="price-amount">
                <span className="price-num">{p.price}</span>
                <span className="price-unit">{p.unit}</span>
              </div>
              <ul>
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href={FORM} target="_blank" rel="noopener noreferrer" className="price-cta">
                この内容で相談する
              </a>
            </motion.div>
          ))}
        </div>

        <Reveal direction="up" className="roi-box">
          <h3 className="roi-title">うちの現場だと、どれくらい？</h3>
          <p className="roi-note">
            毎月の手作業時間を動かすと、年間で減らせそうな時間の目安が出ます。
            保証ではありません。相談のときの「たたき台」です。
          </p>
          <div className="roi-controls">
            <label htmlFor="roi-hours">
              毎月の転記作業（合計）
              <input
                id="roi-hours"
                type="range"
                min="1"
                max="40"
                value={hours}
                onChange={e => setHours(Number(e.target.value))}
              />
              <strong>{hours} 時間 / 月</strong>
            </label>
          </div>
          <div className="roi-result">
            <div>
              <span className="roi-label">あなたの現場で減らせそうな時間（目安）</span>
              <span className="roi-value">{result.yearHours.toLocaleString()} 時間</span>
            </div>
            <div>
              <span className="roi-label">人件費換算（目安）</span>
              <span className="roi-value">約 {result.yearYen.toLocaleString()} 円</span>
            </div>
          </div>
          <p className="roi-disclaimer">
            時給 {HOURLY.toLocaleString()} 円・削減率 {Math.round(SAVE_RATE * 100)}% で仮置きしています。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
