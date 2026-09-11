/** ASKSデモ用の架空データ。本物の学校・顧客は入れない。 */

/** お客のログインは学校などのメール。社内は @aidi.co.jp */
export const DEMO_PASSWORD = 'demo'
export const STAFF_DOMAIN = 'aidi.co.jp'

export const ACCOUNTS = [
  {
    email: 'sakura@sakuradai.ed.jp',
    role: 'customer',
    name: 'さくら台高等学校（架空）',
    orgId: 'org-sakura',
  },
  {
    email: 'midori@midori.ed.jp',
    role: 'customer',
    name: 'みどり学園（架空）',
    orgId: 'org-midori',
  },
]

export function isStaffEmail(email) {
  const e = String(email || '').trim().toLowerCase()
  return e.endsWith(`@${STAFF_DOMAIN}`)
}

/** 画面には出さない。メールでお客／社内を分ける。 */
export function resolveLogin(email, password) {
  const e = String(email || '').trim().toLowerCase()
  if (!e || String(password || '') !== DEMO_PASSWORD) return null
  if (isStaffEmail(e)) {
    return {
      email: e,
      role: 'staff',
      name: '社内',
      orgId: null,
    }
  }
  const found = ACCOUNTS.find((a) => a.email === e)
  if (!found) return null
  return {
    email: found.email,
    role: 'customer',
    name: found.name,
    orgId: found.orgId,
  }
}

export const PRINTER_CATALOG = {
  'DCP-7650': {
    model: 'DCP-7650',
    kind: '再転写',
    label: '高解像度の上位モデル',
    image: '/supply/dcp-7650.webp',
    dpi: '600dpi',
    speed: '約25秒／枚',
    hopper: '約125枚',
    note: '凹凸のあるカードにも全面印刷できます。',
  },
  'DCP-7000': {
    model: 'DCP-7000',
    kind: '再転写',
    label: 'スタンダードモデル',
    image: '/supply/dcp-7000.webp',
    dpi: '300dpi',
    speed: '約30秒／枚',
    hopper: '約100枚',
    note: '社員証・学生証の定番機です。',
  },
}

/** お客はプリンタをどちらか一方だけ持つ */
export const ORGS = [
  {
    id: 'org-sakura',
    name: 'さくら台高等学校（架空）',
    place: '大阪府（架空）',
    staff: '購買　佐藤（架空）',
    shipTo: '大阪府（架空）さくら台1-1　購買係',
    printers: [{ model: 'DCP-7000', qty: 1, installed: '2023年4月' }],
  },
  {
    id: 'org-midori',
    name: 'みどり学園（架空）',
    place: '兵庫県（架空）',
    staff: '総務　高橋（架空）',
    shipTo: '兵庫県（架空）みどり2-2　総務課',
    printers: [{ model: 'DCP-7650', qty: 1, installed: '2024年9月' }],
  },
]

const RIBBON_IMG = '/supply/ribbon-set.png'
const MAIN = ['DCP-7000', 'DCP-7650']

export const PRODUCTS = [
  {
    id: 'dcr2100ckn',
    code: 'DCR2100CKN(B)',
    name: 'インクリボンセット',
    category: 'ribbon',
    categoryLabel: 'インクリボン',
    price: 56000,
    image: RIBBON_IMG,
    printerModels: MAIN,
    yield: '片面 約1,000枚／両面 約500枚',
    yieldSingle: 1000,
    yieldDuplex: 500,
    note: 'Y.M.C.K。カラーリボンと再転写フィルムのセット。同時交換。',
    recommend: true,
  },
  {
    id: 'dcr2100pon',
    code: 'DCR2100PON',
    name: 'インクリボンセット（ピールオフ）',
    category: 'ribbon',
    categoryLabel: 'インクリボン',
    price: 56000,
    image: RIBBON_IMG,
    printerModels: MAIN,
    yield: '片面 約750枚／両面 約325枚',
    yieldSingle: 750,
    yieldDuplex: 325,
    note: 'Y.M.C.K.P。署名欄などを残したいときに使います。',
    recommend: false,
  },
  {
    id: 'clean-card',
    code: 'CL-CARD-V',
    name: 'クリーニングカード（V再転写プリンタ）',
    category: 'cleaning',
    categoryLabel: 'クリーニング',
    price: 3500,
    image: '',
    printerModels: MAIN,
    yield: '10枚入り',
    note: '定期清掃用。画質が落ちてきたら先にこちら。',
    recommend: false,
  },
  {
    id: 'mg-clean',
    code: 'MG-CLEAN-V',
    name: 'MGヘッドクリーニングカード（Vプリンタ）',
    category: 'cleaning',
    categoryLabel: 'クリーニング',
    price: 4000,
    image: '',
    printerModels: MAIN,
    yield: '10枚入り',
    note: '磁気エンコード付き機のヘッド用。',
    recommend: false,
  },
  {
    id: 'clean-kit',
    code: 'CLEAN-KIT',
    name: 'クリーニングキット',
    category: 'cleaning',
    categoryLabel: 'クリーニング',
    price: 8000,
    image: '',
    printerModels: MAIN,
    yield: '1セット',
    note: '液50ml、キムワイプ、綿棒、磁気カードなど。',
    recommend: false,
  },
]

export const GUIDES = [
  { title: '請求書払い', text: 'Web決済はありません。出荷後に請求書をお送りします。' },
  { title: '送料', text: '税別1万円以上は発送元持ち。未満は一律1,000円です。' },
  { title: '合うものだけ', text: '登録プリンタに合う消耗品だけ出ます。迷いません。' },
]

export const SHIP_FREE_FROM = 10000
export const SHIP_FLAT = 1000
export const CLEAN_EVERY_IMAGES = 1000
export const CLEAN_CARDS_PER_SET = 10
export const CLEAN_PRODUCT_ID = 'clean-card'

/** 新年度前。発行がいちばん多い。 */
export function isPeakIssueSeason(date = new Date()) {
  const month = date.getMonth() + 1
  return month === 2 || month === 3
}

/** リボン1本 ≒ 1000枚 ≒ クリーニング1回。10枚で1セット。 */
export function cleaningAdvice(ribbonCount) {
  const n = Math.max(0, Math.floor(Number(ribbonCount) || 0))
  const sets = Math.floor(n / CLEAN_CARDS_PER_SET)
  const remain = n % CLEAN_CARDS_PER_SET
  return {
    ribbons: n,
    cleanings: n,
    sets,
    remain,
    untilSet: remain === 0 && n > 0 ? 0 : CLEAN_CARDS_PER_SET - remain,
  }
}

export function ribbonRolls(cardCount, perRoll) {
  const cards = Math.max(0, Math.floor(Number(cardCount) || 0))
  if (cards === 0 || !perRoll) return 0
  return Math.ceil(cards / perRoll)
}

/** PONは両面325枚。CKNは両面500枚。商品ごとの枚数で割る。 */
export function ribbonRollsForProduct(cardCount, duplex, product) {
  const per = duplex ? product.yieldDuplex : product.yieldSingle
  return ribbonRolls(cardCount, per)
}

export function shippingFee(subtotal) {
  if (subtotal <= 0) return 0
  return subtotal >= SHIP_FREE_FROM ? 0 : SHIP_FLAT
}

export function yen(n) {
  return `¥${Number(n).toLocaleString('ja-JP')}`
}

/** デモ用。本番の税率・端数は未決。 */
export const TAX_RATE = 0.1

export function withTax(n) {
  return Math.round(Number(n || 0) * (1 + TAX_RATE))
}

export const PLAN_PRESETS = [500, 1000, 2000, 5000, 10000]

/** 土日を飛ばして、翌営業日。 */
export function nextShipDay(from = new Date()) {
  const d = new Date(from)
  d.setDate(d.getDate() + 1)
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1)
  return d
}

export function formatDay(d) {
  if (!d) return '—'
  const x = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(x.getTime())) return '—'
  return `${x.getFullYear()}年${x.getMonth() + 1}月${x.getDate()}日`
}

export function formatWhen(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function productsForOrg(orgId) {
  const org = ORGS.find((o) => o.id === orgId)
  if (!org) return []
  const models = new Set(org.printers.map((p) => p.model))
  return PRODUCTS.filter((p) => (p.printerModels || []).some((m) => models.has(m)))
}

export function printersForOrg(orgId) {
  const org = ORGS.find((o) => o.id === orgId)
  if (!org) return []
  return org.printers.map((p) => ({
    ...p,
    ...(PRINTER_CATALOG[p.model] || { label: '', image: '', kind: '' }),
  }))
}

export function orgById(orgId) {
  return ORGS.find((o) => o.id === orgId) || null
}

export const ROLE_LABEL = {
  customer: 'お客さま',
  staff: '社内',
}

export function customerStatus(status) {
  return status === '発送済' ? '発送済' : '受付済み'
}

export function sampleOrders() {
  return [
    {
      id: 'seed-1',
      orderNumber: 'ORD-0001',
      orgId: 'org-sakura',
      orgName: 'さくら台高等学校（架空）',
      items: [
        { id: 'dcr2100ckn', code: 'DCR2100CKN(B)', name: 'インクリボンセット', price: 56000, quantity: 1 },
      ],
      subtotal: 56000,
      shipping: 0,
      total: 56000,
      status: '準備中',
      trackingNumber: '',
      memo: '入学式前に届くと助かります（見本）',
      shipBy: '2026-08-19T00:00:00+09:00',
      createdAt: '2026-08-18T10:12:00+09:00',
    },
    {
      id: 'seed-2',
      orderNumber: 'ORD-0002',
      orgId: 'org-midori',
      orgName: 'みどり学園（架空）',
      items: [
        { id: 'clean-card', code: 'CL-CARD-V', name: 'クリーニングカード（V再転写プリンタ）', price: 3500, quantity: 1 },
      ],
      subtotal: 3500,
      shipping: 1000,
      total: 4500,
      status: '発送済',
      trackingNumber: '1234-5678-9012',
      createdAt: '2026-08-17T15:40:00+09:00',
    },
  ]
}
