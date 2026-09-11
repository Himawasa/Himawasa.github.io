import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/** 旧ワンページの #リンクを、分割後のページへ送る */
const HASH_MAP = {
  '#contact': '/contact',
  '#pricing': '/services',
  '#about': '/about',
  '#faq': '/contact',
  '#ai-era': '/ai',
  '#results': '/works',
  '#projects': '/works',
  '#gallery': '/services',
  '#services': '/services',
  '#trust': '/services',
  '#values': '/about',
  '#brand': '/about',
  '#try': '/try',
  '#try-apps': '/try',
  '#for-pro': '/for/pro',
  '#for-care': '/for/care',
  '#for-biz': '/for/biz',
  '#rk': '/rk',
}

export default function HashRedirect() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (pathname !== '/') return
    const to = HASH_MAP[hash]
    if (to) navigate(`${to}${hash}`, { replace: true })
  }, [pathname, hash, navigate])

  return null
}
