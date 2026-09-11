import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE } from '../seo/site'

/**
 * 初回表示は HTML の gtag('config') が送る。
 * ここでは React のページ遷移だけを送る（二重計測を避ける）。
 */
export function useGaPageView() {
  const { pathname, search, hash } = useLocation()
  const skipFirst = useRef(true)

  useEffect(() => {
    if (!SITE.gaId || typeof window.gtag !== 'function') return
    if (skipFirst.current) {
      skipFirst.current = false
      return
    }
    const timer = setTimeout(() => {
      window.gtag('event', 'page_view', {
        page_path: `${pathname}${search}${hash}`,
        page_title: document.title,
        page_location: window.location.href,
      })
    }, 80)
    return () => clearTimeout(timer)
  }, [pathname, search, hash])
}
