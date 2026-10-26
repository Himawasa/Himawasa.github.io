import { useEffect } from 'react'

// 別の住所へ移転したページ。サイトの中のリンクから来たときも、移転先へそのまま移す
export default function MovedAway({ to }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])
  return (
    <main style={{ padding: '120px 20px', textAlign: 'center' }}>
      <p>このページは移転しました。<a href={to}>移転先のページ</a>へお進みください。</p>
    </main>
  )
}
