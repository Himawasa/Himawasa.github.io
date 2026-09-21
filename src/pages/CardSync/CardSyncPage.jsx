import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import PageHead from '../../components/PageHead'
import { PAGES, CARDSYNC_TRIAL_URL } from '../../seo/site'
import './CardSync.css'

// 本文は1行にまとめて書くこと。JSX の中で改行すると、日本語の文のあいだに
// 半角の空きが入ってしまうため。

const CARDS = [
  { src: '/cardsync/card-employee.webp', alt: '社員証の見本。青い帯、顔写真、氏名、部署、社員番号' },
  { src: '/cardsync/card-visitor.webp', alt: '来訪者証の見本。オレンジの帯、顔写真、氏名、所属会社、訪問日、ご案内担当者' },
  { src: '/cardsync/card-access.webp', alt: '立入許可証の見本。緑の帯、許可区域名、顔写真、氏名、許可番号、有効期限' },
]

const PAINS = [
  {
    title: '新しい方が入るたび、1枚ずつ位置合わせ',
    body: 'Word や PowerPoint のひな形では、お名前の文字数によって枠からはみ出したり、書体が崩れたりしがちです。直しているうちに他の方のレイアウトまでずれてしまい、毎回の大きな負担になります。',
  },
  {
    title: '顔写真を一人ずつ切り抜いて貼り替える手間',
    body: '撮影した写真を1枚ずつトリミングし、名簿のお名前と突き合わせながら貼り付ける作業。数人なら対応できても、十数人から数十人の規模になると、半日がかりの作業になってしまいます。',
  },
  {
    title: '外部に発注すると納期がかかり、融通が利かない',
    body: '来週から勤務されるパートの方、急に決まったアルバイトの方、当日お越しになる施設見学者。その都度、印刷会社へ納期や最低発注枚数を確認していては、現場のスピードに間に合いません。',
  },
]

const REASONS = [
  {
    kicker: '01',
    title: 'お手元の名簿を、そのまま読み込めます',
    body: '普段お使いの Excel（.xlsx）や CSV を、画面にドラッグ＆ドロップするだけで取り込めます。Windows で文字化けしやすい Shift_JIS も自動で判別。和暦の日付表記や、「EMP-0001」のような通し番号の自動採番にも標準で対応しています。',
    img: '/cardsync/screen-import.webp',
    alt: '名簿の取り込み画面。ファイルを置く枠と、キー項目の選択画面',
  },
  {
    kicker: '02',
    title: '顔写真は、ZIP にまとめて一括登録',
    body: '「社員番号.jpg」のように名簿の値をファイル名にした写真を、ZIP にまとめて置くだけです。名簿と自動照合し、全員分の顔写真をそれぞれのカード枠へ一括配置。結びつかなかった写真の件数もその場で表示されるため、登録漏れを防げます。バーコード（CODE128・JAN-13 など）や QR コードの配置も自由自在です。',
    img: '/cardsync/screen-designer.webp',
    alt: 'カードのデザイン画面。中央に社員証のプレビュー、左右に編集ツールと設定パネル',
  },
  {
    kicker: '03',
    title: '実寸・最大600dpi。画面で仕上がりを確かめて発行',
    body: '実寸（85.6 × 54 mm）で、表裏両面の仕上がりを画面上に忠実に再現します。印刷の細かさは、お使いの機種に合わせて 300dpi と 600dpi から選べます。600dpi の再転写プリンタをお使いの場合も、その細かさのまま出力できます。1人ずつ確認したうえで、社内のプリンタで印刷、または PDF に保存してまとめて発行。万が一の紛失や破損による再発行も、理由とともに履歴がしっかり残ります。',
    img: '/cardsync/screen-print.webp',
    alt: 'カード発行の画面。左側に名簿の一覧、右側にカードの完成プレビュー',
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
    where: '工事現場・サーバ室・重要施設',
    has: '顔写真／氏名／許可区域名／許可番号／有効期限／裏面に緊急連絡先',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'デザインを選ぶ',
    body: '3つの見本から選び、自社の社名やロゴ、テーマカラーを設定します。',
  },
  {
    n: '2',
    title: '名簿と写真を入れる',
    body: 'Excel の名簿と写真の ZIP をドラッグ＆ドロップ。社員番号などのキーを指定すれば、名簿を更新しても重複して登録される心配がありません。',
  },
  {
    n: '3',
    title: '仕上がりを確認して発行する',
    body: '画面で1人ずつのプレビューを確認し、社内のプリンタまたは PDF 保存でまとめて発行します。',
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
            <p className="cs-lead">Excel や CSV の名簿と、顔写真の ZIP をドラッグ＆ドロップするだけ。社員証・来訪者証・立入許可証を、ブラウザ上で今すぐ発行できます。</p>
            <p className="cs-lead-sub">専用ソフトのインストールも、面倒な初期設定も不要です。登録なしで、すぐにお試しいただけます。</p>
            <div className="cs-cta">
              {ready ? (
                <a className="btn-yellow cs-start" href={CARDSYNC_TRIAL_URL} rel="noopener">登録不要で体験してみる（無料）</a>
              ) : (
                <span className="cs-start cs-start--soon" aria-disabled="true">体験版は、まもなく公開します</span>
              )}
              <Link to="/contact" className="cs-sub-cta">導入のご相談はこちら</Link>
            </div>
            <p className="cs-cta-note">※ お試し環境のデータは、24時間後に自動で消去されます（操作はパソコンの画面を推奨しています）。</p>
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
          <p>首から下げたカードは、特別な機器がなくても、誰が見てもその場で所属と身元を確認できます。受付のご担当者も、施設をご利用になるご家族も、初めて出入りされる業者の方も、ひと目で安心できます。スマートフォンのようにバッテリー切れの心配もなく、専用のアプリを入れていただく手間もありません。</p>
          <p>介護や医療の現場、工場、建設現場、学校など、スマートフォンを常時携帯できない場所はまだ数多くあります。CardSync は、そうした現場で本当に必要とされるカードを、お手元の名簿から迷わず・手早く・何度でも発行できる仕組みとしてお届けします。</p>
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
          <p className="cs-templates-note">社名・ロゴ・配色・項目の位置は、画面の上で動かしながら調整できます。表と裏の両面に対応しています。</p>
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
            <li><strong>アカウント登録は不要です。</strong>ボタンを押すだけで、あなた専用のお試し環境が立ち上がります。第三者に見られることはありません。</li>
            <li><strong>24時間で自動消去されます。</strong>アップロードされた名簿データや顔写真、作成したデザインは、サーバーに残りません。</li>
            <li><strong>架空のサンプルデータでお試しください。</strong>実在する方の個人情報や顔写真のアップロードはお控えください（あらかじめサンプルの名簿が入っています）。</li>
            <li>体験でご利用いただけるのは、<strong>画面でのプレビュー確認と印刷（PDF 保存）まで</strong>です。顔写真は1枚 1MB・10枚まで、案件は5つまでとなります。</li>
            <li><strong>社内ネットワーク（オンプレミス）での導入にも対応します。</strong>個人情報を外部のクラウドに出さず、社内のパソコンだけで完結する構成もご用意できます。お気軽にご相談ください。</li>
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
