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
    title: '新しい方が入るたび、1枚ずつ位置合わせ',
    body: 'Word や PowerPoint のひな形は、氏名の文字数で枠が崩れたり、書体が変わってしまったりします。直しているうちに、ほかの方のレイアウトまでずれてしまう。その手戻りが、毎回の負担になります。',
  },
  {
    title: '顔写真を、一人ずつ貼り替える',
    body: '撮影した写真をトリミングし、名簿と見比べながら間違えないように貼っていく。数人であれば何とかなっても、十数人から数十人ともなると、半日がかりの作業になってしまいます。',
  },
  {
    title: '外部に依頼すると、納期が読めない',
    body: '来週から勤務される方、急に決まったアルバイトの方、当日お越しになる見学者。そのたびに納期と最低枚数を調整していては、現場の動き方に追いつきません。',
  },
]

const REASONS = [
  {
    kicker: '01',
    title: 'お手元の名簿を、そのまま読み込めます',
    body: '普段お使いの Excel（.xlsx）や CSV を、画面にドラッグ＆ドロップするだけで取り込めます。Windows で文字化けしやすい Shift_JIS のファイルも、中身を見て自動で判別します。和暦の日付や、「EMP-0001」のような通し番号の自動採番にも、そのまま対応しています。',
    img: '/cardsync/screen-import.webp',
    alt: '名簿の取り込み画面。ファイルを置く枠と、同じ人を見分ける項目の選び方',
  },
  {
    kicker: '02',
    title: '顔写真は、ZIP にまとめて一括で登録',
    body: '「社員番号.jpg」のように名簿の値をファイル名にした写真を、ZIP にまとめて置くだけです。名簿と照合し、全員分の顔写真をそれぞれのカードの枠へ自動で配置します。結びつかなかった写真もその場で分かるため、取りこぼしがありません。文字や写真のほか、バーコード（CODE128・JAN-13 など）や QR コードも、必要な位置に配置できます。',
    img: '/cardsync/screen-designer.webp',
    alt: 'カードのデザイン画面。中央に社員証、左に道具、右に項目の設定',
  },
  {
    kicker: '03',
    title: '実寸・300dpi の仕上がりを、画面で確かめてから',
    body: '実寸 85.6 × 54 mm・300dpi で、表と裏の仕上がりをそのまま画面に再現します。一人ずつ確かめたうえで、社内のプリンタで印刷、または PDF に保存してまとめて発行できます。紛失や破損による再発行は、その理由とともに記録が残ります。',
    img: '/cardsync/screen-print.webp',
    alt: '発行の画面。左に名簿、右にその人のカードの仕上がり',
  },
]

const TEMPLATES = [
  {
    name: '社員証・職員証',
    where: '企業・病院・介護施設',
    has: '顔写真／氏名／部署／社員番号／裏面に注意事項・内線',
  },
  {
    name: '来訪者証',
    where: '受付・工場見学・面会',
    has: '顔写真／氏名／所属会社／訪問日／ご案内担当者／裏面に受付番号・退館予定',
  },
  {
    name: '立入許可証',
    where: '工事現場・サーバ室・区域の管理',
    has: '顔写真／氏名／許可区域名／許可番号／有効期限／裏面に緊急連絡先',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'デザインを選ぶ',
    body: '3つの見本から選び、自社の社名・配色・ロゴを置き換えるところから始められます。',
  },
  {
    n: '2',
    title: '名簿と写真を入れる',
    body: 'Excel や CSV の名簿と、顔写真の ZIP を置きます。社員番号などを目印に指定しておけば、同じ方を入れ直しても二重に増えません。',
  },
  {
    n: '3',
    title: '確かめて発行する',
    body: '一人ずつ仕上がりを確認し、社内のプリンタまたは PDF でまとめて発行します。',
  },
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
              Excel や CSV の名簿と、顔写真の ZIP をドラッグ＆ドロップするだけ。
              社員証・来訪者証・立入許可証を、ブラウザ上で発行できます。
            </p>
            <p className="cs-lead-sub">
              専用のソフトも、難しい初期設定も要りません。登録なしで、そのままお試しいただけます。
            </p>
            <div className="cs-cta">
              {ready ? (
                <a className="btn-yellow cs-start" href={CARDSYNC_TRIAL_URL} rel="noopener">登録不要で体験してみる（無料）</a>
              ) : (
                <span className="cs-start cs-start--soon" aria-disabled="true">体験版は、まもなく公開します</span>
              )}
              <Link to="/contact" className="cs-sub-cta">導入のご相談はこちら</Link>
            </div>
            <p className="cs-cta-note">
              体験でお使いになったデータは、24時間後に自動で消去されます。パソコンの広い画面での操作をおすすめします。
            </p>
          </div>
          <div className="cs-cards" aria-label="発行できるカードの見本">
            {CARDS.map((c, i) => (
              <img key={c.src} className={`cs-card cs-card--${i}`} src={c.src} alt={c.alt} width="1011" height="637" loading={i === 0 ? 'eager' : 'lazy'} />
            ))}
          </div>
        </div>
      </section>

      <section className="cs-pains">
        <div className="container">
          <h2 className="section-title">カード作りの「ちょっとした手間」、積み重なっていませんか</h2>
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
          <h2 className="section-title">デジタル化が進む今だからこそ、見てすぐ分かる安心を</h2>
          <p>
            首から下げたカードは、特別な機器がなくても、誰が見てもその場で所属と身元が分かります。
            受付のご担当者も、施設をご利用になるご家族も、初めて出入りされる業者の方も、同じように確かめられます。
            電池も、アプリの用意も要りません。
          </p>
          <p>
            介護や医療の現場、工場、建設現場、学校など、スマートフォンを常に持ち歩けない場所はまだ数多くあります。
            CardSync は、そうした現場で実際に使われるカードを、お手元の名簿から迷わず・手早く・何度でも発行できるようにしました。
            スマートフォンや IC との連携は、この土台の上に重ねてまいります。
          </p>
        </div>
      </section>

      <section className="cs-features">
        <div className="container">
          <h2 className="section-title">CardSync でできること</h2>
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
          <h2 className="section-title">用途に合わせて選べる、3つの見本</h2>
          <p className="cs-templates-note">社名・配色・ロゴ・項目の位置は、画面の上で動かしながら調整できます。表と裏の両面に対応しています。</p>
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
          <h2 className="section-title">発行までは、3つの手順だけ</h2>
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
            <li><strong>アカウント登録は不要です。</strong>ボタンを押すと、あなた専用のお試し環境が用意されます。ほかの方から見えることはありません。</li>
            <li><strong>24時間で自動的に消去されます。</strong>お入れになった名簿も、顔写真も、作成されたデザインも残りません。</li>
            <li><strong>実在の方の氏名や写真はお入れにならないでください。</strong>お試し用に、架空の人物の名簿があらかじめ入っています。</li>
            <li>体験でご利用いただけるのは、<strong>画面での確認と印刷（PDF への保存）まで</strong>です。顔写真は1枚 1MB・10枚まで、案件は5つまでとなります。</li>
            <li><strong>社内ネットワークだけで動かす形にも対応します。</strong>個人情報や顔写真を外部に出さず、社内のパソコンだけで完結する一式をご用意できます。導入をご検討の際にご相談ください。</li>
          </ul>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <h2>社員証・来訪者証・面会証の運用を見直してみませんか</h2>
          <p>「今の名簿のまま使えるか知りたい」「自社の様式に合わせて作ってほしい」など、現場の運用に合わせた形をご提案します。</p>
          <Link to="/contact" className="btn-yellow">話してみる（無料）</Link>
        </div>
      </section>
    </>
  )
}
