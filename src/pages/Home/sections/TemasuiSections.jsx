import { Link } from 'react-router-dom'

/**
 * トップの「てますい」の各欄（2026-10-04 作り直し）。並びは下書き（HiMaWaSa-Sync-3007/docs/seo/トップ作り直し_下書き_20261004.html）のとおり。
 * てますいの紹介・見本・申込は素の HTML や別の住所なので <a> で開く（React の画面遷移では開けない）。
 * 料金の正本は himawasa-care/server/chatKnowledge.js と himawasa-care/docs/sales/料金の検討_2026-10.md。料金を変えたら、ここも直す。
 * 本文は1行にまとめて書くこと（JSX の中で改行すると、日本語の文のあいだに半角の空きが入るため）。
 */

const DEMO = 'https://care.himawasa-sync.com/demo'

// ② 版を選ぶ（/temasui/start/ と同じ5つ）
const VERSIONS = [
  { icon: '🏥', name: '介護版', text: '日々の介護記録や申し送り、ご家族への連絡文、事故報告書を話すだけで下書き。持ち物や予定の管理も。', href: '/temasui/', demo: DEMO },
  { icon: '🏨', name: '病院版', text: '届いた紹介状やFAXをスマホで撮るだけで一覧化。看護サマリや返書の下書きも素早く作成。', href: '/temasui/hospital/', demo: `${DEMO}?industry=hospital` },
  { icon: '🏭', name: '工場版', text: '作業日報や交代時の引き継ぎ、設備のメンテ記録、ヒヤリハットを話すだけで下書き。工具・備品の点検にも。', href: '/temasui/factory/', demo: `${DEMO}?industry=factory` },
  { icon: '🏢', name: '中小企業版', text: '業務日報や議事録、お客さまへのメール、電話メモを話すだけで下書き。備品・在庫の確認にも。', href: '/temasui/biz/', demo: `${DEMO}?industry=biz` },
  { icon: '⚖️', name: '士業版', text: '面談記録や顧問先への書類のお願い、お知らせ文、電話メモを話すだけで下書き。預かり書類の確認にも。', href: '/temasui/pro/', demo: `${DEMO}?industry=pro` },
]

export function TemasuiVersions() {
  return (
    <section className="th-section" id="versions">
      <div className="container">
        <h2 className="th-h2">お仕事に合わせて、5つの版があります</h2>
        <p className="th-desc">見本は登録なしで、その場で試せます。入れた内容も写真も保存されません。</p>
        <div className="th-versions">
          {VERSIONS.map((v) => (
            <article className="th-version" key={v.name}>
              <h3><span aria-hidden="true">{v.icon}</span> {v.name}</h3>
              <p>{v.text}</p>
              <div className="th-version-links">
                <a href={v.href}>紹介を見る →</a>
                <a href={v.demo} rel="noopener">▶ 見本を試す</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ③ てますいにしかない強み（検索の「すき間」の言葉を受ける欄）
export function TemasuiStrengths() {
  return (
    <section className="th-section th-section--white">
      <div className="container th-two">
        <article className="th-box">
          <h2 className="th-h3">外国の職員さんの言葉でも、日本語の記録に</h2>
          <p>母国語（ミャンマー語・ベトナム語など）で話すだけで、自然な日本語の記録の下書きに整えます。</p>
          <a href="/temasui/guide/gaikokujin-kiroku/">書き方ガイド「外国の職員さんの記録」へ →</a>
        </article>
        <article className="th-box">
          <h2 className="th-h3">地域連携室の紹介状・FAXを、撮るだけで一覧に</h2>
          <p>撮影するだけで自動で一覧台帳を作成。画像データは保管せず、一覧は90日後に自動で消去されます。</p>
          <a href="/temasui/hospital/">病院版の紹介へ →</a>
        </article>
      </div>
    </section>
  )
}

// ④ 料金（税別）
export function TemasuiPricing() {
  return (
    <section className="th-section" id="pricing">
      <div className="container">
        <h2 className="th-h2">料金（税別）</h2>
        <div className="th-table-wrap">
          <table className="th-table">
            <thead>
              <tr><th scope="col">版</th><th scope="col">月額</th><th scope="col">ご契約時（初期サポート）</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row">介護・工場・中小企業・士業</th><td><b>10,000円</b>（会社・施設全体で定額）</td><td>30,000円</td></tr>
              <tr><th scope="row">病院</th><td><b>15,000円</b>（導入価格）</td><td>50,000円</td></tr>
            </tbody>
          </table>
        </div>
        <ul className="th-terms">
          <li>はじめの1か月は無料です。無料期間が終わっても、自動で料金がかかることはありません。</li>
          <li>最低契約期間は3か月です（無料の1か月は含みません）。</li>
          <li>ご契約時に、身近な作業を1つ自動化します。詳しくは各版のページをご覧ください。</li>
        </ul>
      </div>
    </section>
  )
}

// ⑤ 今のExcelのまま、自動化のご相談（てますいとは別の入口。単価の高い個別のご相談を受ける）
export function ConsultBand() {
  return (
    <section className="th-consult" id="consult">
      <div className="container">
        <p className="th-consult-label">今のExcelのまま、自動化のご相談</p>
        <h2 className="th-h2 th-h2--light">今のExcelやシステムはそのままで、自動化のご相談も承ります</h2>
        <p>今お使いのExcelややり方のまま作業を減らしたい現場向けです。シフト表・請求・転記など、毎月の手作業を短くします。例：シフト作成 5時間→3分／請求の一括 半日→0分（許可をいただいた現場の例）。キーエンスRKをお使いの現場では、シナリオ作成もお手伝いします。</p>
        <div className="th-cta">
          <Link to="/contact" className="btn-yellow th-btn">自動化について相談する（30分・無料）</Link>
          <Link to="/services" className="th-btn-sub th-btn-sub--light">サービスと料金を見る</Link>
        </div>
      </div>
    </section>
  )
}

// ⑦ 安心（てますいのこと。無料ツールは Gemini の無料枠で、学習に使われることがあるので、範囲をはっきり書く）
export function TemasuiSafety() {
  return (
    <section className="th-section th-section--white">
      <div className="container th-narrow">
        <h2 className="th-h2">安心してお使いいただくために</h2>
        <p className="th-desc">てますい（ご契約版・見本）について</p>
        <ul className="th-safety">
          <li>入力データや写真が AI の学習に使われることは一切ありません。</li>
          <li>データの保存は国内（東京のサーバー）で、厳重に保護されます。</li>
          <li>電子カルテや既存システムとは直接連動させず、コピー＆ペーストで安全にご利用いただけます。</li>
        </ul>
      </div>
    </section>
  )
}

// ⑧ 最後
export function TemasuiFinalCta() {
  return (
    <section className="home-cta">
      <div className="container">
        <h2>まずは1か月、無料でお試しください</h2>
        <div className="th-cta th-cta--center">
          <a href="/temasui/start/" className="btn-yellow th-btn">1か月無料で試す</a>
          <Link to="/contact" className="th-btn-sub">お問い合わせ</Link>
        </div>
      </div>
    </section>
  )
}
