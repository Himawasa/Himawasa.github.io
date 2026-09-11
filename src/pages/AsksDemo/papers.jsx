import { formatDay, formatWhen, orgById, withTax, yen } from './data'

export function StaffGuide() {
  return (
    <aside className="asks-guidebox asks-no-print">
      <p className="asks-kicker">社内だけの見せ方</p>
      <ol>
        <li>ログアウトして、お客のメールで注文する（さくら台／みどり学園）</li>
        <li>社内に戻り、受注管理表を見る。1件の受注票を印刷する</li>
        <li>出荷で伝票番号を入れ、表に残るか見る</li>
      </ol>
      <p className="asks-muted">お客の画面には、この案内は出ません。パスワードはデモ用の共通です。</p>
    </aside>
  )
}

export function OrderDone({ order, onContinue }) {
  return (
    <section className="asks-card asks-done">
      <p className="asks-kicker">受付しました</p>
      <h2>ご注文ありがとうございました</h2>
      <p className="lead">
        受注番号は <strong>{order.orderNumber}</strong> です。
        発送の目安は{formatDay(order.shipBy)}です。請求書は出荷後です。
      </p>
      <ul className="asks-done-list">
        {order.items.map((i) => (
          <li key={i.code}>
            <span>{i.code} × {i.quantity}</span>
            <strong>{yen(i.price * i.quantity)}</strong>
          </li>
        ))}
      </ul>
      <p>送料　{order.shipping === 0 ? '発送元持ち（0円）' : yen(order.shipping)}</p>
      <p className="asks-total">ご請求（デモ・税別）　{yen(order.total)}</p>
      <p className="asks-muted">税込の目安　{yen(withTax(order.total))}（デモ）</p>
      {order.memo && <p>メモ　{order.memo}</p>}
      <div className="asks-actions">
        <button type="button" className="asks-btn" onClick={onContinue}>続けて注文する</button>
      </div>
    </section>
  )
}

export function PaperSheet({ kind, order, orders, onClose, onPrint }) {
  return (
    <section className="asks-paper asks-card">
      <div className="asks-actions asks-no-print">
        <button type="button" className="asks-btn ghost" onClick={onClose}>閉じる</button>
        <button type="button" className="asks-btn" onClick={onPrint}>印刷する</button>
      </div>
      {kind === 'slip' && order && <OrderSlip order={order} />}
      {kind === 'invoice' && order && <InvoiceDemo order={order} />}
      {kind === 'label' && order && <ShipLabel order={order} />}
      {kind === 'pick' && <PickList orders={orders || []} />}
    </section>
  )
}

function Money({ order }) {
  return (
    <div className="asks-ship">
      <p><span>商品合計</span><span>{yen(order.subtotal)}</span></p>
      <p><span>送料</span><span>{order.shipping === 0 ? '発送元持ち（0円）' : yen(order.shipping)}</span></p>
      <p className="asks-total"><span>税別合計（デモ）</span><span>{yen(order.total)}</span></p>
      <p className="asks-muted">税込の目安　{yen(withTax(order.total))}（デモ）</p>
    </div>
  )
}

function ItemTable({ order }) {
  return (
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
          {order.items.map((i) => (
            <tr key={i.code}>
              <td>{i.code}</td>
              <td>{i.name}</td>
              <td>{i.quantity}</td>
              <td>{yen(i.price * i.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function OrderSlip({ order }) {
  const dest = orgById(order.orgId)
  return (
    <div className="asks-sheet">
      <p className="asks-kicker">倉庫へ渡す1枚（デモ）</p>
      <h2>受注票　{order.orderNumber}</h2>
      <p>お客　{order.orgName}</p>
      <p>受付　{formatWhen(order.createdAt)}</p>
      {order.shipBy && <p>発送の目安　{formatDay(order.shipBy)}</p>}
      {dest?.shipTo && <p>届け先　{dest.shipTo}</p>}
      {order.memo && <p>メモ　{order.memo}</p>}
      <ItemTable order={order} />
      <Money order={order} />
      <p className="asks-sheet-line">発送伝票番号　{order.trackingNumber || '＿＿＿＿＿＿＿＿＿＿'}</p>
      <p className="asks-muted">印刷して請求書と一緒に倉庫へ渡す想定です。本番の帳票ではありません。</p>
    </div>
  )
}

function InvoiceDemo({ order }) {
  const dest = orgById(order.orgId)
  return (
    <div className="asks-sheet">
      <p className="asks-kicker">出荷後に出す想定（デモ）</p>
      <h2>ご請求のご案内</h2>
      <p><strong>本番の請求書ではありません。</strong>金額・印鑑・口座は入れません。</p>
      <p>宛先　{order.orgName}</p>
      {dest?.shipTo && <p>届け先　{dest.shipTo}</p>}
      <p>受注番号　{order.orderNumber}</p>
      <p>ご注文日　{formatWhen(order.createdAt)}</p>
      <ItemTable order={order} />
      <Money order={order} />
      <p>お支払いは請求書払いです。Web決済はありません。</p>
    </div>
  )
}

function ShipLabel({ order }) {
  const dest = orgById(order.orgId)
  return (
    <div className="asks-sheet asks-label">
      <p className="asks-kicker">届け先（デモ）</p>
      <p className="asks-label-to">{dest?.shipTo || '届け先は未登録です'}</p>
      <h2>{order.orgName}</h2>
      <p>受注　{order.orderNumber}</p>
      {order.shipBy && <p>発送の目安　{formatDay(order.shipBy)}</p>}
      <ul>
        {order.items.map((i) => (
          <li key={i.code}>{i.code} × {i.quantity}</li>
        ))}
      </ul>
    </div>
  )
}

function PickList({ orders }) {
  return (
    <div className="asks-sheet">
      <p className="asks-kicker">倉庫　未出荷一覧（デモ）</p>
      <h2>ピッキング</h2>
      {orders.length === 0 ? (
        <p>未出荷はありません。</p>
      ) : (
        <div className="asks-table-wrap">
          <table className="asks-table">
            <thead>
              <tr>
                <th>受注番号</th>
                <th>お客</th>
                <th>内容</th>
                <th>届け先</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.orderNumber}</td>
                  <td>{o.orgName}</td>
                  <td>{o.items.map((i) => `${i.code} × ${i.quantity}`).join('／')}</td>
                  <td>{orgById(o.orgId)?.shipTo || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
