import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import PageHead from '../../components/PageHead'
import { PAGES, CARDSYNC_TRIAL_URL } from '../../seo/site'
import './CardSync.css'

const CARDS = [
  { src: '/cardsync/card-employee.webp', alt: '社員証の見本。青い帯、顔写真、氏名、部署、社員番号' },
  { src: '/cardsync/card-visitor.webp', alt: '来訪者証の見本。オレンジの帯、顔写真、氏名、所属会社、訪問日、担当者' },
  { src: '/cardsync/card-access.webp', alt: '立入許可証の見本。緑の帯、区域名、顔写真、氏名、許可番号、有効期限' },
]

const PAINS = [
  {
    title: '新しい人が入るたび、1枚ずつ位置合わせ',
    body: 'Word や PowerPoint で作ったひな形は、名前が長いと枠からはみ出します。直しているうちに、ほかの人の分がずれる。そのくり返しです。',
  },
  {
    title: '顔写真を1枚ずつ貼り替える',
    body: '撮った写真をトリミングして、名簿と見比べて、間違えないように貼る。10人でも大仕事、50人なら丸一日かかります。',
  },
  {
    title: '外に頼むと、待つことになる',
    body: '来週から来る人、今日決まったアルバイト、急な見学者。そのたびに納期と最低枚数の話をするのは、現場の速さに合いません。',
  },
]

const REASONS = [
  {
    kicker: '01',
    title: 'いつもの名簿を、そのまま置くだけ',
    body: 'お手元の Excel（.xlsx）や CSV を、そのまま読み込めます。文字化けしやすい Shift_JIS のファイルも、中を見て自動で見分けます。和暦の日付も、EMP-0001 のような通し番号の自動採番も、そのまま扱えます。',
    img: '/cardsync/screen-import.webp',
    alt: '名簿の取り込み画面。ファイルを置く枠と、同じ人を見分ける項目の選び方',
  },
  {
    kicker: '02',
    title: '顔写真は、ZIP にまとめて一度に',
    body: '「社員番号.jpg」のように、名簿の値をファイル名にした写真を ZIP にまとめて置くだけ。全員分が、それぞれのカードの枠に自動で入ります。どれと結びつかなかったかも、その場で分かります。文字・写真のほか、バーコード（CODE128・JAN-13 など）や QR コードも、置きたい場所に置けます。',
    img: '/cardsync/screen-designer.webp',
    alt: 'カードのデザイン画面。中央に社員証、左に道具、右に項目の設定',
  },
  {
    kicker: '03',
    title: '刷る前に、一人ずつ目で確かめる',
    body: '実寸 85.6 × 54 mm・300dpi で、表と裏の仕上がりをそのまま画面に出します。確かめてから、まとめて印刷（PDF に保存）へ。なくした・壊れたときの再発行は、理由と一緒に記録が残ります。',
    img: '/cardsync/screen-print.webp',
    alt: '発行の画面。左に名簿、右にその人のカードの仕上がり',
  },
]

const TEMPLATES = [
  {
    name: '社員証・職員証',
    where: '会社・病院・介護施設',
    has: '顔写真／氏名／部署／社員番号／裏面の案内・内線',
  },
  {
    name: '来訪者証',
    where: '受付・工場見学・面会',
    has: '顔写真／氏名／所属会社／訪問日／担当者／裏面に受付番号・退館予定',
  },
  {
    name: '立入許可証',
    where: '工事現場・サーバ室・区域の管理',
    has: '顔写真／氏名／区域名／許可番号／有効期限／裏面に緊急連絡先',
  },
]

const STEPS = [
  { n: '1', title: '見本を選ぶ', body: '社員証・来訪者証・立入許可証の3つから選んで、会社名や色を直すところから始められます。' },
  { n: '2', title: '名簿を入れる', body: 'Excel や CSV を置き、顔写真の ZIP を置きます。同じ人を見分ける項目（社員番号など）を選んでおけば、入れ直しても二重に増えません。' },
  { n: '3', title: '確かめて刷る', body: '一人ずつ仕上がりを見て、まとめて印刷します。PDF に保存して、印刷を外に頼むこともできます。' },
]

export default function CardSyncPage() {
  const p = PAGES.cardsync
  const ready = Boolean(CARDSYNC_TRIAL_URL)

  return (
    <>
      <Seo page={p} />
      <PageHead label="TRY NOW" title={p.h1} desc={p.description} crumb={p.crumb} />

      <section className="cs-hero">
        <div className="container cs-hero-inner">
          <div className="cs-hero-text">
            <p className="cs-lead">
              専用のソフトも、難しい設定も要りません。お手元の名簿を置くだけで、
              社員証・来訪者証・立入許可証を、ブラウザの中で作って発行できます。
            </p>
            <div className="cs-cta">
              {ready ? (
                <a className="btn-yellow cs-start" href={CARDSYNC_TRIAL_URL} rel="noopener">登録なしで体験する（無料）</a>
              ) : (
                <span className="cs-start cs-start--soon" aria-disabled="true">体験版は、まもなく公開します</span>
              )}
              <Link to="/contact" className="cs-sub-cta">導入について相談する</Link>
            </div>
            <p className="cs-cta-note">
              体験で作ったものは、24時間であなたの分だけ自動で消えます。パソコンの広い画面がおすすめです。
            </p>
          </div>
          <div className="cs-cards" aria-label="作れるカードの見本">
            {CARDS.map((c, i) => (
              <img key={c.src} className={`cs-card cs-card--${i}`} src={c.src} alt={c.alt} width="1011" height="637" loading={i === 0 ? 'eager' : 'lazy'} />
            ))}
          </div>
        </div>
      </section>

      <section className="cs-pains">
        <div className="container">
          <h2 className="section-title">カード作りの「ちょっとした手間」、重なっていませんか</h2>
          <div className="cs-pain-list">
            {PAINS.map((x) => (
              <article className="cs-pain" key={x.title}>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-why">
        <div className="container cs-narrow">
          <h2 className="section-title">目で見て分かるカードは、まだまだ要ります</h2>
          <p>
            首から下げていれば、機械が無くても、誰でも、その場で確かめられます。受付の人も、入所者のご家族も、初めて来た業者の方も。
            電池は切れません。アプリを入れてもらう必要もありません。
          </p>
          <p>
            スマホや IC が広がっても、介護・医療・工場・学校のように、スマホを出せない現場はたくさんあります。
            CardSync は、まず「見て分かるカード」を、名簿からすぐ・間違いなく・何度でも作れるようにしました。
            スマホや IC は、その土台の上に重ねていきます。
          </p>
        </div>
      </section>

      <section className="cs-features">
        <div className="container">
          <h2 className="section-title">できること</h2>
          <div className="cs-feature-list">
            {REASONS.map((f) => (
              <article className="cs-feature" key={f.title}>
                <div className="cs-feature-text">
                  <p className="cs-kicker">{f.kicker}</p>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
                <img className="cs-feature-img" src={f.img} alt={f.alt} width="1600" height="1000" loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-templates">
        <div className="container">
          <h2 className="section-title">3つの見本から始められます</h2>
          <p className="cs-templates-note">どれも、会社名・色・項目の位置を、画面の上で動かして直せます。表と裏を別々に作れます。</p>
          <div className="cs-template-list">
            {TEMPLATES.map((t) => (
              <article className="cs-template" key={t.name}>
                <h3>{t.name}</h3>
                <p className="cs-template-where">{t.where}</p>
                <p className="cs-template-has">{t.has}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-steps">
        <div className="container">
          <h2 className="section-title">使い方は、3つだけ</h2>
          <ol className="cs-step-list">
            {STEPS.map((s) => (
              <li className="cs-step" key={s.n}>
                <span className="cs-step-n" aria-hidden="true">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cs-rules">
        <div className="container cs-narrow">
          <h2 className="section-title">安心してお試しいただくために</h2>
          <ul className="cs-rule-list">
            <li><strong>登録もパスワードも要りません。</strong>押すと、あなただけの場所が作られます。ほかの人からは見えません。</li>
            <li><strong>24時間で、あなたの分だけ自動で消えます。</strong>名簿も、写真も、作ったデザインも残りません。</li>
            <li><strong>実在の人の名前や写真は入れないでください。</strong>見本の人（架空）が最初から入っています。</li>
            <li>体験でできるのは、<strong>画面での確認と印刷（PDF 保存）まで</strong>です。写真は1枚1MB・10枚まで、案件は5つまで。</li>
            <li><strong>社内だけで動かす形もあります。</strong>個人情報や顔写真を外に出さず、社内のパソコンだけで動かす一式をご用意できます。導入時にご相談ください。</li>
          </ul>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <h2>職員証・来訪者証・面会証の作り直しを考えている方へ</h2>
          <p>今お使いの名簿やカードの様式に合わせて、形にします。まずは状況をお聞かせください。</p>
          <Link to="/contact" className="btn-yellow">話してみる（無料）</Link>
        </div>
      </section>
    </>
  )
}
