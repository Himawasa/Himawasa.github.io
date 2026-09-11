import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * スマホ下部の追従ボタン。相談だけ。体験アプリは混ぜない。
 */
export default function FloatingCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const contact = document.getElementById('contact')
      let nearContact = false
      if (contact) {
        const top = contact.getBoundingClientRect().top
        nearContact = top < window.innerHeight * 0.7
      }
      setShow(y > 420 && !nearContact)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <div className="float-cta" role="navigation" aria-label="無料相談">
      <Link to="/contact" className="float-cta-btn">
        💬 話してみる（無料）
      </Link>
    </div>
  )
}
