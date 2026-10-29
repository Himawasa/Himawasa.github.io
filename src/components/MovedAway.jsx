import { useEffect } from 'react'

// 別の住所へ移転したページ。サイトの中のリンクから来たときも、移転先へそのまま移す
// what は移転したもの、label は移転先のページの名前（カード発行・RK で共通に使う）
export default function MovedAway({ to, what, label }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])
  return (
    <main style={{ padding: '120px 20px', textAlign: 'center' }}>
      <p>{what}は、移転いたしました。自動で切り替わらない場合は、<a href={to}>移転先のページ（{label}）</a>へお進みください。</p>
    </main>
  )
}
