import { useMemo, useState } from 'react'
import Reveal from '../../../components/Reveal'
import { SITE } from '../../../seo/site'
import '../../rk/Rk.css'

const FORM = SITE.formUrl

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
          <h2 className="section-title">自動化のご相談・RK代行の料金</h2>
          <p className="section-desc">
            高額なシステム入れ替えは不要です。現場に合わせて小さく始められます。<br />
            ※ 下記は目安です。実際のご提案は無料相談で個別にお出しします。
          </p>
        </Reveal>

        <div className="rk-price" style={{ marginBottom: 36 }}>
          <div className="rk-price-card">
            <p className="rk-price-label">RKシナリオ作成代行</p>
            <p className="rk-price-num">10,000<span>円〜</span></p>
            <p>キーエンスRKシリーズ／RK-10のシナリオ作成を丸ごとお任せいただけます。</p>
          </div>
          <div className="rk-price-card is-main">
            <p className="rk-price-label">RK運用保守代行</p>
            <p className="rk-price-num">5,000<span>円〜 / 月</span></p>
            <p>画面変更などで停止した場合も、迅速に動く状態へ復旧サポートいたします。</p>
          </div>
          <div className="rk-price-card">
            <p className="rk-price-label">業種ごとの詳細</p>
            <p className="rk-price-num" style={{ fontSize: 22 }}>工場 / 病院 / 介護</p>
            <p><a href="/rk/" style={{ fontWeight: 800, color: '#8A6D00' }}>RK作成代行の詳細を見る →</a></p>
          </div>
        </div>

        {/* 2026-10-04 前の3つのプラン（月1万・2.5万・5万〜）を外した。てますいの月1万円と混同されるため。
            自動化のご相談は、提案の資料と同じく「作る費用はいただかず、使い続ける月額を作る前にお見積り」（岩城さん承認） */}
        <div className="rk-price-card is-main" style={{ maxWidth: 760, margin: '0 auto 36px' }}>
          <p className="rk-price-label">今のExcelのままの自動化のご相談</p>
          <p className="rk-price-num" style={{ fontSize: 24 }}>お見積り</p>
          <p>シフト表・請求・転記など、今のExcelややり方に合わせて仕組みを作ります。作る費用はいただかず、使い続けるときの月額を、作る前にお見積りします。初回相談は無料（30分）です。</p>
          <p><a href={FORM} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 800, color: '#8A6D00' }}>自動化について相談する →</a></p>
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
