/** 受注表の検索と CSV。ブラウザ内だけ。 */

import { formatWhen } from './data'

export function orderText(order) {
  return [
    order.orderNumber,
    order.orgName,
    order.status,
    order.trackingNumber,
    order.memo,
    ...(order.items || []).flatMap((i) => [i.code, i.name]),
  ].join(' ').toLowerCase()
}

export function filterOrders(orders, query) {
  const q = String(query || '').trim().toLowerCase()
  if (!q) return orders
  return orders.filter((o) => orderText(o).includes(q))
}

export function ordersCsv(orders) {
  const header = ['受注番号', '日時', 'お客', '品番', '商品', '数量', '商品合計', '送料', '合計', '状態', '伝票番号', 'メモ']
  const rows = []
  orders.forEach((o) => {
    const items = o.items?.length ? o.items : [{ code: '', name: '', quantity: '' }]
    items.forEach((i, idx) => {
      rows.push([
        idx === 0 ? o.orderNumber : '',
        idx === 0 ? formatWhen(o.createdAt) : '',
        idx === 0 ? o.orgName : '',
        i.code || '',
        i.name || '',
        i.quantity ?? '',
        idx === 0 ? o.subtotal : '',
        idx === 0 ? o.shipping : '',
        idx === 0 ? o.total : '',
        idx === 0 ? o.status : '',
        idx === 0 ? (o.trackingNumber || '') : '',
        idx === 0 ? (o.memo || '') : '',
      ])
    })
  })
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  return `\uFEFF${[header, ...rows].map((r) => r.map(esc).join(',')).join('\r\n')}`
}

export function downloadCsv(filename, text) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
