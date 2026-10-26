import { useEffect } from 'react'

// 別の住所へ移転したページ。サイトの中のリンクから来たときも、移転先へそのまま移す
export default function MovedAway({ to }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])
  return (
    <main style={{ padding: '120px 20px', textAlign: 'center' }}>
      <p>社員証・来訪者証の発行（旧 CardSync）は、移転いたしました。自動で切り替わらない場合は、<a href={to}>移転先のページ（IDカードかんたん発行）</a>へお進みください。</p>
    </main>
  )
}
