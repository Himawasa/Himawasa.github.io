/** 注文はブラウザ内だけ。あとで Neon に付け替える。 */

import { sampleOrders } from './data'

const SESSION_KEY = 'asks-demo-session'
const ORDERS_KEY = 'asks-demo-orders-v3'

export function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const user = JSON.parse(raw)
    if (user.role === 'office' || user.role === 'warehouse') {
      return {
        email: user.email || 'csupply@aidi.co.jp',
        role: 'staff',
        name: '社内',
        orgId: null,
      }
    }
    if (user.role === 'customer' || user.role === 'staff') return user
    return null
  } catch {
    return null
  }
}

export function saveSession(user) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY)
    return
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    if (raw === null) {
      const seed = sampleOrders()
      saveOrders(seed)
      return seed
    }
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function nextOrderNumber(orders) {
  const nums = orders.map((o) => {
    const m = String(o.orderNumber || '').match(/(\d+)$/)
    return m ? Number(m[1]) : 0
  })
  const n = (nums.length ? Math.max(...nums) : 0) + 1
  return `ORD-${String(n).padStart(4, '0')}`
}

export function resetDemoData() {
  const seed = sampleOrders()
  saveOrders(seed)
  return seed
}
