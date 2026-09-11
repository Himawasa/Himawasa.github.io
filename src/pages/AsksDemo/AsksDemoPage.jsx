import { useMemo, useState } from 'react'
import Seo from '../../components/Seo'
import {
  CLEAN_CARDS_PER_SET, CLEAN_EVERY_IMAGES, CLEAN_PRODUCT_ID, GUIDES, PLAN_PRESETS,
  ROLE_LABEL, SHIP_FLAT, SHIP_FREE_FROM, cleaningAdvice, customerStatus,
  formatDay, formatWhen, isPeakIssueSeason, nextShipDay, orgById, printersForOrg,
  productsForOrg, resolveLogin, ribbonRolls, ribbonRollsForProduct, shippingFee, withTax, yen,
} from './data'
import { OrderDone, PaperSheet, StaffGuide } from './papers'
import { loadOrders, loadSession, nextOrderNumber, resetDemoData, saveOrders, saveSession } from './store'
import { downloadCsv, filterOrders, ordersCsv } from './tools'
import './AsksDemo.css'

const SEO = {
  key: 'supply',
  path: '/supply/',
  title: '消耗品のご注文（デモ）',
  h1: '消耗品のご注文',
  description: '宿題用のたたき台。架空データのみ。',
  og: '宿題用のたたき台。',
  crumb: '消耗品注文',
  noindex: true,
  nofollow: true,
}

export default function AsksDemoPage() {
  const [user, setUser] = useState(loadSession)
  const [orders, setOrders] = useState(loadOrders)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [desk, setDesk] = useState('office')
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')
  const [qty, setQty] = useState({})
  const [tracking, setTracking] = useState({})
  const [tab, setTab] = useState('all')
  const [confirming, setConfirming] = useState(false)
  const [officeFilter, setOfficeFilter] = useState('all')
  const [memo, setMemo] = useState('')
  const [query, setQuery] = useState('')
  const [justOrdered, setJustOrdered] = useState(null)
  const [paper, setPaper] = useState(null)

  const org = user?.orgId ? orgById(user.orgId) : null
  const printers = user?.orgId ? printersForOrg(user.orgId) : []
  const products = user?.role === 'customer' ? productsForOrg(user.orgId) : []
  const shown = products.filter((p) => tab === 'all' || p.category === tab)
  const cartItems = products
    .map((p) => ({ ...p, quantity: Number(qty[p.id] || 0) }))
    .filter((p) => p.quantity > 0)
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const ship = shippingFee(subtotal)
  const total = subtotal + ship

  const visibleOrders = useMemo(() => {
    if (!user) return []
    const mine = user.role === 'customer' ? orders.filter((o) => o.orgId === user.orgId) : orders
    return [...mine].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
  }, [orders, user])

  const officeOrders = filterOrders(
    visibleOrders.filter((o) => (officeFilter === 'all' ? true : o.status === officeFilter)),
    query,
  )

  const stats = {
    all: visibleOrders.length,
    wait: visibleOrders.filter((o) => o.status === '準備中').length,
    done: visibleOrders.filter((o) => o.status === '発送済').length,
  }

  const login = (account) => {
    const next = {
      email: account.email,
      role: account.role,
      name: account.name,
      orgId: account.orgId,
    }
    saveSession(next)
    setUser(next)
    setDesk('office')
    setError('')
    setOk('')
    setConfirming(false)
    setTab('all')
    setJustOrdered(null)
    setPaper(null)
    setQuery('')
  }

  const onSubmitLogin = (e) => {
    e.preventDefault()
    const found = resolveLogin(email, password)
    if (!found) {
      setError('ログインできませんでした')
      return
    }
    login(found)
  }

  const logout = () => {
    saveSession(null)
    setUser(null)
    setError('')
    setOk('')
    setConfirming(false)
    setJustOrdered(null)
    setPaper(null)
  }

  const setCount = (id, next) => {
    const n = Math.max(0, Number(next) || 0)
    setQty((prev) => ({ ...prev, [id]: n === 0 ? '' : n }))
  }

  const startConfirm = () => {
    if (cartItems.length === 0) {
      setError('数量を入れてください')
      setOk('')
      return
    }
    setError('')
    setConfirming(true)
  }

  const placeOrder = () => {
    const items = cartItems.map((p) => ({
      id: p.id,
      code: p.code,
      name: p.name,
      price: p.price,
      quantity: p.quantity,
    }))
    const created = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      orderNumber: nextOrderNumber(orders),
      orgId: user.orgId,
      orgName: org?.name || user.name,
      items,
      subtotal,
      shipping: ship,
      total,
      status: '準備中',
      trackingNumber: '',
      memo: memo.trim(),
      shipBy: nextShipDay().toISOString(),
      createdAt: new Date().toISOString(),
    }
    const next = [...orders, created]
    saveOrders(next)
    setOrders(next)
    setQty({})
    setMemo('')
    setConfirming(false)
    setJustOrdered(created)
    setError('')
    setOk('')
  }

  const fillCart = (order) => {
    if (!order) {
      setError('前回の注文がありません')
      setOk('')
      return
    }
    const next = {}
    order.items.forEach((i) => {
      if (i.id) next[i.id] = i.quantity
    })
    setQty(next)
    setMemo(order.memo || '')
    setConfirming(false)
    setJustOrdered(null)
    setError('')
    setOk('同じ内容をカートに入れました。数量は変えられます。')
  }

  const repeatLast = () => fillCart(visibleOrders[0])

  const setShipped = (orderId) => {
    const number = (tracking[orderId] || '').trim()
    if (!number) {
      setError('発送伝票番号を入れてください')
      setOk('')
      return
    }
    const next = orders.map((o) => (
      o.id === orderId ? { ...o, status: '発送済', trackingNumber: number } : o
    ))
    saveOrders(next)
    setOrders(next)
    setError('')
    setOk('出荷しました。事務の受注管理表に伝票番号が残ります。')
  }

  const clearOrders = () => {
    setOrders(resetDemoData())
    setOk('見本の注文に戻しました。')
    setError('')
  }

  return (
    <>
      <Seo page={SEO} />
      <div className={`asks-demo ${user?.role === 'staff' ? 'asks-demo-staff' : ''} ${paper ? 'asks-printing-paper' : ''}`}>
        <header className="asks-demo-bar">
          <div className="asks-demo-brand">
            <small>{user?.role === 'staff' ? '社内' : '消耗品のご注文'}</small>
            {user?.role === 'staff' ? '受注・出荷' : 'ご注文'}
          </div>
          {user && (
            <div className="asks-demo-user">
              {user.role === 'staff' && (
                <nav className="asks-desk" aria-label="社内メニュー">
                  <button type="button" className={desk === 'office' ? 'on' : ''} onClick={() => setDesk('office')}>受注管理</button>
                  <button type="button" className={desk === 'warehouse' ? 'on' : ''} onClick={() => setDesk('warehouse')}>出荷</button>
                </nav>
              )}
              {user.role === 'staff' && <span className="asks-role asks-role-staff">{ROLE_LABEL.staff}</span>}
              <span className="asks-who">{user.role === 'staff' ? user.email : user.name}</span>
              <button type="button" className="asks-btn ghost" onClick={logout}>ログアウト</button>
            </div>
          )}
        </header>
        <p className="asks-demo-banner">デモ環境です。学校名・注文・単価はすべて架空です。</p>

        <main className="asks-demo-main">
          <div className="asks-screen">
          {!user && (
            <LoginView
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              onSubmit={onSubmitLogin}
              error={error}
            />
          )}

          {user?.role === 'customer' && (
            <CustomerView
              org={org}
              printers={printers}
              products={products}
              shown={shown}
              tab={tab}
              setTab={setTab}
              qty={qty}
              setCount={setCount}
              cartItems={cartItems}
              subtotal={subtotal}
              ship={ship}
              total={total}
              confirming={confirming}
              setConfirming={setConfirming}
              startConfirm={startConfirm}
              placeOrder={placeOrder}
              repeatLast={repeatLast}
              memo={memo}
              setMemo={setMemo}
              shipBy={nextShipDay()}
              orders={visibleOrders}
              justOrdered={justOrdered}
              onContinue={() => setJustOrdered(null)}
              fillCart={fillCart}
              error={error}
              ok={ok}
            />
          )}

          {user?.role === 'staff' && desk === 'office' && (
            <OfficeView
              stats={stats}
              filter={officeFilter}
              setFilter={setOfficeFilter}
              query={query}
              setQuery={setQuery}
              orders={officeOrders}
              onPrint={() => window.print()}
              onCsv={() => downloadCsv(`juchu-demo-${new Date().toISOString().slice(0, 10)}.csv`, ordersCsv(officeOrders))}
              onOpen={(order, kind) => setPaper({ kind, order })}
              onReset={clearOrders}
              ok={ok}
            />
          )}

          {user?.role === 'staff' && desk === 'warehouse' && (
            <WarehouseView
              orders={visibleOrders}
              tracking={tracking}
              setTracking={setTracking}
              setShipped={setShipped}
              onOpen={(order, kind) => setPaper({ kind, order, orders: visibleOrders.filter((o) => o.status !== '発送済') })}
              error={error}
              ok={ok}
            />
          )}
          </div>
          {paper && (
            <PaperSheet
              kind={paper.kind}
              order={paper.order}
              orders={paper.orders}
              onClose={() => setPaper(null)}
              onPrint={() => window.print()}
            />
          )}
        </main>

        <footer className="asks-foot">
          {user?.role === 'staff'
            ? '社内画面です。お客さまのログイン画面には出しません。'
            : '消耗品についてのお問い合わせは、ご登録の窓口まで。　支払いは請求書です。'}
          <span className="asks-no-print">
            {'　'}
            <a href="/supply/spec/" rel="nofollow noreferrer">この見本の説明</a>
          </span>
        </footer>
      </div>
    </>
  )
}

function LoginView({ email, password, setEmail, setPassword, onSubmit, error }) {
  return (
    <div className="asks-login">
      <section className="asks-hero">
        <p className="asks-kicker">消耗品のご注文　／　請求書払い</p>
        <h1>登録プリンタに合う消耗品だけを、迷わず注文する</h1>
        <p className="lead">
          ご登録のメールアドレスでログインしてください。
          お持ちのプリンタに合う商品だけが表示されます。
        </p>
        <ol className="asks-steps">
          <li><strong>1. ログイン</strong>登録メールで入る</li>
          <li><strong>2. 注文</strong>合う消耗品だけ</li>
          <li><strong>3. お届け</strong>発送後に請求書</li>
        </ol>
      </section>
      <div className="asks-card asks-login-card">
        <h2>ログイン</h2>
        <p className="asks-muted">ご登録のメールアドレスとパスワードを入力してください。</p>
        <form className="asks-form" onSubmit={onSubmit}>
          <label htmlFor="asks-email">メールアドレス</label>
          <input
            id="asks-email"
            type="email"
            inputMode="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="asks-pw">パスワード</label>
          <input
            id="asks-pw"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="asks-actions">
            <button type="submit" className="asks-btn">ログイン</button>
          </div>
        </form>
        {error && <p className="asks-error">{error}</p>}
      </div>
    </div>
  )
}

function RibbonPlanner({ products, setCount }) {
  const [cards, setCards] = useState('2000')
  const [duplex, setDuplex] = useState(false)
  const ribbons = products.filter((p) => p.yieldSingle)
  const count = Math.max(0, Math.floor(Number(cards) || 0))

  return (
    <section className="asks-plan">
      <div>
        <p className="asks-kicker">必要本数の目安</p>
        <h2>これから何枚出しますか</h2>
        <p className="asks-muted">
          通常リボンは片面1,000枚、両面500枚です。ピールオフ（PON）は片面750枚、両面325枚です。
        </p>
      </div>
      <div className="asks-plan-form">
        <label htmlFor="asks-cards">予定枚数</label>
        <input
          id="asks-cards"
          type="number"
          min="1"
          value={cards}
          onChange={(e) => setCards(e.target.value)}
        />
        <div className="asks-sides">
          <button type="button" className={!duplex ? 'on' : ''} onClick={() => setDuplex(false)}>片面</button>
          <button type="button" className={duplex ? 'on' : ''} onClick={() => setDuplex(true)}>両面</button>
        </div>
        <div className="asks-presets">
          {PLAN_PRESETS.map((n) => (
            <button
              key={n}
              type="button"
              className={count === n ? 'on' : ''}
              onClick={() => setCards(String(n))}
            >
              {n.toLocaleString('ja-JP')}枚
            </button>
          ))}
        </div>
      </div>
      <ul className="asks-plan-result">
        {ribbons.map((p) => {
          const rolls = ribbonRollsForProduct(count, duplex, p)
          return (
            <li key={p.id}>
              <div>
                <strong>{p.code}</strong>
                <span>{duplex ? '両面' : '片面'}　{count.toLocaleString('ja-JP')}枚 → <em>{rolls}本</em></span>
              </div>
              <button
                type="button"
                className="asks-btn ghost"
                disabled={count === 0}
                onClick={() => setCount(p.id, rolls)}
              >
                カートへ
              </button>
            </li>
          )
        })}
      </ul>
      <CleaningHint
        ribbonCount={ribbonRolls(count * (duplex ? 2 : 1), CLEAN_EVERY_IMAGES)}
        setCount={setCount}
      />
    </section>
  )
}

function CleaningHint({ ribbonCount, setCount }) {
  const advice = cleaningAdvice(ribbonCount)
  if (advice.ribbons === 0) return null
  return (
    <div className={`asks-hint ${advice.sets > 0 ? 'asks-hint-strong' : ''}`}>
      <p>
        DCP-7000／7650 は <strong>{CLEAN_EVERY_IMAGES.toLocaleString('ja-JP')}枚に1回</strong>、
        クリーニングカードを通します。リボン{advice.ribbons}本なら {advice.cleanings}回分です。
      </p>
      {advice.sets > 0 ? (
        <p>
          カードは{CLEAN_CARDS_PER_SET}枚で1セットです。
          リボン{CLEAN_CARDS_PER_SET}本につき1セットなので、今回は <strong>{advice.sets}セット</strong> が目安です。
        </p>
      ) : (
        <p>
          カードは{CLEAN_CARDS_PER_SET}枚で1セットです。
          あとリボン{advice.untilSet}本で1セットです。まとめ買いするなら、今入れておいてもよいです。
        </p>
      )}
      <button
        type="button"
        className="asks-btn ghost"
        onClick={() => setCount(CLEAN_PRODUCT_ID, Math.max(advice.sets, 1))}
      >
        クリーニングカードをカートへ
      </button>
    </div>
  )
}

function CartCleaning({ cartItems, setCount }) {
  const ribbonCount = cartItems
    .filter((i) => i.category === 'ribbon')
    .reduce((sum, i) => sum + i.quantity, 0)
  const cleanQty = cartItems
    .filter((i) => i.id === CLEAN_PRODUCT_ID)
    .reduce((sum, i) => sum + i.quantity, 0)
  const advice = cleaningAdvice(ribbonCount)
  if (advice.ribbons === 0) return null
  if (advice.sets === 0) {
    return (
      <p className="asks-muted">
        クリーニングは{CLEAN_EVERY_IMAGES.toLocaleString('ja-JP')}枚に1回。
        リボン{CLEAN_CARDS_PER_SET}本でカード1セットです。あと{advice.untilSet}本。
      </p>
    )
  }
  if (cleanQty >= advice.sets) return null
  return (
    <div className="asks-hint asks-hint-strong">
      <p>
        リボン{advice.ribbons}本です。クリーニングカードを{advice.sets}セット入れませんか。
      </p>
      <button type="button" className="asks-btn ghost" onClick={() => setCount(CLEAN_PRODUCT_ID, advice.sets)}>
        {advice.sets}セット入れる
      </button>
    </div>
  )
}

function SeasonNotice() {
  const peak = isPeakIssueSeason()
  return (
    <aside className={`asks-season ${peak ? 'asks-season-now' : ''}`}>
      <p className="asks-kicker">{peak ? 'いまが発行のピークです' : '毎年2月・3月にお知らせします'}</p>
      <strong>新年度前（2月・3月）は、発行がいちばん多い時期です。</strong>
      <p>
        {peak
          ? 'リボンが足りるか、予定枚数から本数を見てください。クリーニングカードも一緒に。'
          : 'その時期になると、この画面の上に案内を出します。今のうちに予定枚数を入れておくと、本数が分かります。'}
      </p>
    </aside>
  )
}

function CustomerView({
  org, printers, products, shown, tab, setTab, qty, setCount, cartItems,
  subtotal, ship, total, confirming, setConfirming, startConfirm, placeOrder,
  repeatLast, memo, setMemo, shipBy, orders, justOrdered, onContinue, fillCart, error, ok,
}) {
  if (justOrdered) {
    return (
      <>
        <OrderDone order={justOrdered} onContinue={onContinue} />
        <OrderHistory orders={orders} forCustomer fillCart={fillCart} />
      </>
    )
  }
  return (
    <>
      <div className="asks-pagehead">
        <div>
          <p className="asks-kicker">{org?.place}　／　担当 {org?.staff}</p>
          <h1>消耗品のご注文</h1>
          <p className="lead">お持ちのプリンタに合う商品だけを出しています。支払いは請求書です。</p>
        </div>
        {orders.length > 0 && !confirming && (
          <div className="asks-actions asks-no-print">
            <button type="button" className="asks-btn ghost" onClick={repeatLast}>前回と同じ内容</button>
          </div>
        )}
      </div>

      <SeasonNotice />

      <div className="asks-guides">
        {GUIDES.map((g) => (
          <article key={g.title}>
            <strong>{g.title}</strong>
            <p>{g.text}</p>
          </article>
        ))}
      </div>

      {printers.map((p) => (
        <section className="asks-printer-panel" key={p.model}>
          {p.image && <img src={p.image} alt={p.model} />}
          <div>
            <p className="asks-kicker">登録プリンタ（1台）</p>
            <h2>{p.model}</h2>
            <p>{p.kind}　{p.label}</p>
            <ul className="asks-specs">
              <li>解像度　{p.dpi}</li>
              <li>速度　{p.speed}</li>
              <li>カード収納　{p.hopper}</li>
              <li>導入　{p.installed || '—'}</li>
            </ul>
            <p className="asks-muted">{p.note}</p>
          </div>
        </section>
      ))}

      {!confirming && (
        <RibbonPlanner products={products} setCount={setCount} />
      )}

      {!confirming && (
        <div className="asks-shop">
          <div className="asks-shop-main">
            <div className="asks-tabs">
              {[
                { id: 'all', label: 'すべて' },
                { id: 'ribbon', label: 'インクリボン' },
                { id: 'cleaning', label: 'クリーニング' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={tab === t.id ? 'on' : ''}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="asks-product-grid">
              {shown.map((p) => (
                <article className="asks-sku" key={p.id}>
                  {p.image ? <img src={p.image} alt={p.code} /> : <div className="asks-product-ph" />}
                  <div className="asks-sku-body">
                    <div className="asks-sku-tags">
                      <span>{p.categoryLabel}</span>
                      {p.recommend && <span className="rec">よく出る</span>}
                    </div>
                    <strong>{p.code}</strong>
                    <h3>{p.name}</h3>
                    <p className="asks-muted">{p.note}</p>
                    <p className="asks-yield">印字目安　{p.yield}</p>
                    <div className="asks-sku-foot">
                      <div className="asks-price">{yen(p.price)} <small>税別　税込{yen(withTax(p.price))}</small></div>
                      <div className="asks-stepper">
                        <button type="button" onClick={() => setCount(p.id, Number(qty[p.id] || 0) - 1)}>-</button>
                        <input
                          type="number"
                          min="0"
                          value={qty[p.id] || ''}
                          onChange={(e) => setCount(p.id, e.target.value)}
                          aria-label={`${p.code}の数量`}
                        />
                        <button type="button" onClick={() => setCount(p.id, Number(qty[p.id] || 0) + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="asks-cart">
            <h2>ご注文内容</h2>
            {cartItems.length === 0 ? (
              <p className="asks-empty">数量の＋でカートに入ります。</p>
            ) : (
              <ul>
                {cartItems.map((i) => (
                  <li key={i.id}>
                    <span>{i.code} × {i.quantity}</span>
                    <strong>{yen(i.price * i.quantity)}</strong>
                  </li>
                ))}
              </ul>
            )}
            <div className="asks-ship">
              <p><span>商品合計</span><span>{yen(subtotal)}</span></p>
              <p>
                <span>送料</span>
                <span>{ship === 0 && subtotal > 0 ? '発送元持ち' : yen(ship)}</span>
              </p>
              <p className="asks-muted">
                {yen(SHIP_FREE_FROM)}以上は発送元持ち／未満は {yen(SHIP_FLAT)}
              </p>
              <p className="asks-total"><span>ご請求（デモ・税別）</span><span>{yen(total)}</span></p>
              <p className="asks-muted">税込の目安　{yen(withTax(total))}</p>
            </div>
            <label className="asks-memo" htmlFor="asks-memo">メモ（任意）</label>
            <textarea
              id="asks-memo"
              rows="2"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="例　入学式までに届くと助かります"
            />
            <p className="asks-muted">発送の目安　{formatDay(shipBy)}（翌営業日）</p>
            <CartCleaning cartItems={cartItems} setCount={setCount} />
            <button type="button" className="asks-btn wide" onClick={startConfirm}>内容を確認する</button>
            {error && <p className="asks-error">{error}</p>}
            {ok && <p className="asks-ok">{ok}</p>}
          </aside>
        </div>
      )}
      {!confirming && cartItems.length > 0 && (
        <div className="asks-mobile-bar">
          <span>{cartItems.length}点　{yen(total)}</span>
          <button type="button" className="asks-btn" onClick={startConfirm}>確認する</button>
        </div>
      )}
      {confirming && (
        <div className="asks-card">
          <h2>注文内容の確認</h2>
          <p className="lead">この内容で注文します。発送の目安は{formatDay(shipBy)}です。請求書は出荷後です。</p>
          {memo && <p>メモ　{memo}</p>}
          <div className="asks-table-wrap">
          <table className="asks-table">
            <thead>
              <tr>
                <th>品番</th>
                <th>商品</th>
                <th>数量</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((i) => (
                <tr key={i.id}>
                  <td>{i.code}</td>
                  <td>{i.name}</td>
                  <td>{i.quantity}</td>
                  <td>{yen(i.price * i.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="asks-ship">
            <p>送料　{ship === 0 ? '発送元持ち（0円）' : yen(ship)}</p>
            <p className="asks-total">ご請求（デモ・税別）　{yen(total)}</p>
            <p className="asks-muted">税込の目安　{yen(withTax(total))}</p>
          </div>
          <div className="asks-actions">
            <button type="button" className="asks-btn ghost" onClick={() => setConfirming(false)}>戻る</button>
            <button type="button" className="asks-btn" onClick={placeOrder}>この内容で注文する</button>
          </div>
        </div>
      )}

              <OrderHistory orders={orders} forCustomer fillCart={fillCart} />
    </>
  )
}

function OfficeView({ stats, filter, setFilter, query, setQuery, orders, onPrint, onCsv, onOpen, onReset, ok }) {
  return (
    <>
      <StaffGuide />
      <div className="asks-pagehead">
        <div>
          <p className="asks-kicker">事務　／　直販</p>
          <h1>受注管理表</h1>
          <p className="lead">注文が入ると自動で増えます。1件を印刷して、請求書と一緒に倉庫へ渡す想定です。2月・3月は新年度前で出荷が増えます。</p>
        </div>
        <div className="asks-actions asks-no-print">
          <button type="button" className="asks-btn" onClick={onPrint}>一覧を印刷</button>
          <button type="button" className="asks-btn ghost" onClick={onCsv}>CSV</button>
          <button type="button" className="asks-btn ghost" onClick={onReset}>見本に戻す</button>
        </div>
      </div>
      <div className="asks-stats">
        <article><small>本日までの件数</small><strong>{stats.all}</strong></article>
        <article><small>準備中</small><strong>{stats.wait}</strong></article>
        <article><small>発送済</small><strong>{stats.done}</strong></article>
      </div>
      <div className="asks-tabs asks-no-print">
        {[
          { id: 'all', label: 'すべて' },
          { id: '準備中', label: '準備中' },
          { id: '発送済', label: '発送済' },
        ].map((t) => (
          <button key={t.id} type="button" className={filter === t.id ? 'on' : ''} onClick={() => setFilter(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="asks-search asks-no-print">
        <label htmlFor="asks-q">さがす</label>
        <input
          id="asks-q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="受注番号・お客・品番"
        />
      </div>
      <div className="asks-print-head">
        <h2>受注管理表（デモ）</h2>
        <p>印刷日の控え。倉庫へ持っていく紙の代わり。</p>
      </div>
      <OrderTable orders={orders} showTracking onOpen={onOpen} />
      {ok && <p className="asks-ok">{ok}</p>}
    </>
  )
}

function WarehouseView({ orders, tracking, setTracking, setShipped, onOpen, error, ok }) {
  const waiting = orders.filter((o) => o.status !== '発送済')
  const done = orders.filter((o) => o.status === '発送済')
  return (
    <>
      <div className="asks-pagehead">
        <div>
          <p className="asks-kicker">倉庫　／　出荷</p>
          <h1>出荷する</h1>
          <p className="lead">箱を出したら、発送伝票番号を入れて事務に戻します。</p>
        </div>
        <div className="asks-actions asks-no-print">
          <button type="button" className="asks-btn ghost" onClick={() => onOpen(null, 'pick')}>未出荷を印刷</button>
        </div>
      </div>
      {error && <p className="asks-error">{error}</p>}
      {ok && <p className="asks-ok">{ok}</p>}
      <h2 className="asks-sec">未出荷　{waiting.length}件</h2>
      {waiting.length === 0 && <p className="asks-empty">未出荷はありません。</p>}
      {waiting.map((o) => (
        <article className="asks-pick" key={o.id}>
          <header>
            <div>
              <strong>{o.orderNumber}</strong>
              <span>{o.orgName}</span>
            </div>
            <StatusBadge status={o.status} />
          </header>
          <p className="asks-muted">{formatWhen(o.createdAt)}</p>
          {orgById(o.orgId)?.shipTo && <p className="asks-ship-to">届け先　{orgById(o.orgId).shipTo}</p>}
          {o.shipBy && <p className="asks-muted">発送の目安　{formatDay(o.shipBy)}</p>}
          {o.memo && <p>メモ　{o.memo}</p>}
          <ul>
            {o.items.map((i) => (
              <li key={i.code}>{i.code}　{i.name}　× {i.quantity}</li>
            ))}
          </ul>
          {typeof o.total === 'number' && (
            <p>合計 {yen(o.total)}（送料 {o.shipping === 0 ? '発送元持ち' : yen(o.shipping)}）</p>
          )}
          <div className="asks-form">
            <label htmlFor={`tr-${o.id}`}>発送伝票番号</label>
            <input
              id={`tr-${o.id}`}
              placeholder="例　1234-5678-9012"
              value={tracking[o.id] || ''}
              onChange={(e) => setTracking({ ...tracking, [o.id]: e.target.value })}
            />
            <div className="asks-actions">
              <button type="button" className="asks-btn" onClick={() => setShipped(o.id)}>出荷して戻す</button>
              <button type="button" className="asks-btn ghost" onClick={() => onOpen(o, 'label')}>届け先を印刷</button>
              <button type="button" className="asks-btn ghost" onClick={() => onOpen(o, 'slip')}>受注票</button>
            </div>
          </div>
        </article>
      ))}
      <h2 className="asks-sec">発送済　{done.length}件</h2>
      <OrderTable orders={done} showTracking />
    </>
  )
}

function OrderHistory({ orders, forCustomer = false, fillCart }) {
  return (
    <section className="asks-history">
      <h2>注文履歴</h2>
      {orders.length === 0 ? (
        <p className="asks-empty">まだ注文はありません。</p>
      ) : (
        <div className="asks-hist-list">
          {orders.map((o) => (
            <article key={o.id}>
              <header>
                <strong>{o.orderNumber}</strong>
                <StatusBadge status={o.status} forCustomer={forCustomer} />
              </header>
              <p className="asks-muted">{formatWhen(o.createdAt)}</p>
              <p>{o.items.map((i) => `${i.code} × ${i.quantity}`).join('　／　')}</p>
              {o.shipBy && <p className="asks-muted">発送の目安　{formatDay(o.shipBy)}</p>}
              {o.memo && <p>メモ　{o.memo}</p>}
              <p>
                {typeof o.total === 'number' ? yen(o.total) : '—'}
                {o.trackingNumber ? `\u3000伝票 ${o.trackingNumber}` : ''}
              </p>
              {fillCart && (
                <div className="asks-actions asks-no-print">
                  <button type="button" className="asks-btn ghost" onClick={() => fillCart(o)}>この内容をもう一度</button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function OrderTable({ orders, showTracking = false, onOpen }) {
  return (
    <div className="asks-card">
      {orders.length === 0 ? (
        <p className="asks-empty">該当する注文はありません。</p>
      ) : (
        <div className="asks-table-wrap">
        <table className="asks-table">
          <thead>
            <tr>
              <th>受注番号</th>
              <th>日時</th>
              <th>お客</th>
              <th>内容</th>
              <th>金額</th>
              <th>状態</th>
              {showTracking && <th>伝票番号</th>}
              {onOpen && <th className="asks-no-print">紙</th>}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.orderNumber}</td>
                <td>{formatWhen(o.createdAt)}</td>
                <td>{o.orgName}</td>
                <td>
                  {o.items.map((i) => `${i.code} × ${i.quantity}`).join('／')}
                  {o.memo ? <span className="asks-muted">　メモあり</span> : ''}
                </td>
                <td>
                  {typeof o.total === 'number'
                    ? `${yen(o.total)}${o.shipping === 0 ? '（送料0）' : `（送料${yen(o.shipping)}）`}`
                    : '—'}
                </td>
                <td><StatusBadge status={o.status} /></td>
                {showTracking && <td>{o.trackingNumber || '—'}</td>}
                {onOpen && (
                  <td className="asks-no-print">
                    <div className="asks-row-acts">
                      <button type="button" className="asks-btn ghost" onClick={() => onOpen(o, 'slip')}>受注票</button>
                      <button type="button" className="asks-btn ghost" onClick={() => onOpen(o, 'invoice')}>請求案内</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status, forCustomer = false }) {
  const kind = status === '発送済' ? 'done' : 'wait'
  const label = forCustomer ? customerStatus(status) : status
  return <span className={`asks-badge asks-badge-${kind}`}>{label}</span>
}
