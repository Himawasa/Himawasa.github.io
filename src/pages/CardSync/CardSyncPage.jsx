import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import PageHead from '../../components/PageHead'
import { PAGES, CARDSYNC_TRIAL_URL } from '../../seo/site'
import './CardSync.css'

const CARDS = [
  { src: '/cardsync/card-employee.webp', alt: '社員証の見本。青い帯、氏名、部署、社員番号、顔写真の枠' },
  { src: '/cardsync/card-visitor.webp', alt: '来訪者証の見本。オレンジの帯、氏名、会社名、訪問日' },
  { src: '/cardsync/card-access.webp', alt: '立入許可証の見本。緑の帯、立入区域、氏名、許可番号、有効期限' },
]

const FEATURES = [
  {
    title: '名簿から、そのまま',
    body: 'お手元の Excel や CSV を読み込むだけ。和暦の日付も、自動の通し番号も、顔写真の ZIP 一括取込もできます。同じ人を入れ直しても、二重に増えません。',
    img: '/cardsync/screen-import.webp',
    alt: '名簿の取り込み画面。ファイルをドロップする枠と、同じ人を見分ける項目の選択',
  },
  {
    title: '見たまま、置くだけ',
    body: '文字・写真・バーコードを、画面の上で置いて動かすだけ。表と裏を別々に作れます。社員証・来訪者証・立入許可証の見本から始められます。',
    img: '/cardsync/screen-designer.webp',
    alt: 'カードのデザイン画面。中央に社員証、左に道具、右に項目の設定',
  },
  {
    title: '刷る前に、目で確かめる',
    body: '一人ずつ、仕上がりを画面で確かめてから発行できます。まとめて PDF にもできます。なくした・壊れたときの再発行は、理由と一緒に記録が残ります。',
    img: '/cardsync/screen-print.webp',
    alt: '発行の画面。左に名簿、右にその人のカードの仕上がり',
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
        <div className="container">
          <div className="cs-cards" aria-label="カードの見本">
            {CARDS.map((c, i) => (
              <img key={c.src} className={`cs-card cs-card--${i}`} src={c.src} alt={c.alt} width="1011" height="637" loading={i === 0 ? 'eager' : 'lazy'} />
            ))}
          </div>
          <div className="cs-cta">
            {ready ? (
              <a className="btn-yellow cs-start" href={CARDSYNC_TRIAL_URL} rel="noopener">体験する（登録なし）</a>
            ) : (
              <span className="cs-start cs-start--soon" aria-disabled="true">体験版は、まもなく公開します</span>
            )}
            <p className="cs-cta-note">パソコンの広い画面がおすすめです。スマホでも、名簿の確認と発行はできます。</p>
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
            {FEATURES.map((f) => (
              <article className="cs-feature" key={f.title}>
                <div className="cs-feature-text">
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
                <img className="cs-feature-img" src={f.img} alt={f.alt} width="1280" height="800" loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-rules">
        <div className="container cs-narrow">
          <h2 className="section-title">体験版のお約束</h2>
          <ul className="cs-rule-list">
            <li><strong>登録もパスワードも要りません。</strong>押すと、あなただけの場所が作られます。ほかの人からは見えません。</li>
            <li><strong>24時間で、あなたの分だけ自動で消えます。</strong>名簿も、写真も、作ったデザインも残りません。</li>
            <li><strong>実在の人の名前や写真は入れないでください。</strong>見本の人（架空）が最初から入っています。</li>
            <li>写真は1枚1MB・10枚まで。案件は5つまで作れます。</li>
            <li>体験版でできるのは、<strong>PDF での印刷まで</strong>です。カードプリンタでの印刷や、お手元のパソコンへの導入は、ご相談ください。</li>
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
