import { useState } from 'react'
import Seo from '../../components/Seo'
import './CardDemo.css'

const SEO = {
  key: 'card',
  path: '/card/',
  title: 'カード発行デモ',
  h1: 'カード発行デモ',
  description: '関係者向けの見本。検索には出しません。',
  og: '関係者向けの見本。',
  crumb: 'カード発行デモ',
  noindex: true,
  nofollow: true,
}

const APP_URL = 'https://card.himawasa-sync.com'
const GATE_HASH = 'defecd6384c9a028ee0f17b7db9f7d6dccd93971c4f46442415c78c0bd657566'

async function sha256hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function CardDemoPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [opened, setOpened] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    const hex = await sha256hex(password.trim())
    if (hex !== GATE_HASH) {
      setError('合言葉が違います')
      return
    }
    if (APP_URL) {
      window.location.href = APP_URL
      return
    }
    setOpened(true)
  }

  return (
    <div className="card-demo">
      <Seo page={SEO} />
      <div className="card-demo-box">
        <p className="card-demo-kicker">HiMaWaSa Sync</p>
        <h1>カード発行デモ</h1>
        <p>合言葉を知っている方だけ進めます。メニューには出していません。</p>
        {!opened ? (
          <form onSubmit={onSubmit}>
            <label>
              合言葉
              <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">入る</button>
          </form>
        ) : (
          <p className="card-demo-ok">合言葉は合っています。アプリの公開アドレスが決まり次第、同じ合言葉で中に入れます。</p>
        )}
        {error && <p className="card-demo-err">{error}</p>}
      </div>
    </div>
  )
}
