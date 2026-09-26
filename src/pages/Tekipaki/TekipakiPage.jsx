import { Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import PageHead from '../../components/PageHead'
import { PAGES, TEKIPAKI_URL, TEKIPAKI_PRACTICE_URL, TEKIPAKI_FAQS } from '../../seo/site'
import './Tekipaki.css'

// てきぱき（無料体験）の説明ページ。アプリ本体は try.himawasa-sync.com（検索に出さない設定）にあるので、
// 検索で見つけてもらう入口はこのページになる。
// 本文は1行にまとめて書くこと。JSX の中で改行すると、日本語の文のあいだに半角の空きが入ってしまうため。

const PAINS = [
  {
    title: 'ファイル名が、人によってばらばら',
    body: 'スキャンした書類やメールで届いた請求書。名前の付け方が人によって違うので、あとで探すときに1つずつ開いて確かめることになります。',
  },
  {
    title: '月ごと・取引先ごとのフォルダ分けを手作業で',
    body: '毎月たまるファイルを、取引先や月のフォルダへ1つずつ移していく作業。数が多いほど、入れ間違いにも気をつかいます。',
  },
  {
    title: '表の内容を、別の画面にもう一度打ち込む',
    body: 'Excel の一覧を見ながら、勤怠や受注のシステムに1件ずつ入力する。同じ内容を二度打つ「転記」は、どの職場にもある手作業です。',
  },
]

const FEATURES = [
  {
    kicker: '01　フォルダ整理',
    title: 'フォルダを選ぶだけで、名前をそろえて振り分けます',
    points: [
      '名前をそろえる：先頭に日付（例 20260927_）や番号を付ける、「コピー ～」などの言葉を消す・置き換える',
      '分ける：種類（PDF・Excel・写真）、月、名前に入っている言葉（取引先名など）ごとのフォルダへ',
      'まとめる：見出しが同じ Excel・CSV を1つの Excel に。Excel で保存した CSV（Shift_JIS）もそのまま読みます',
      '整理する前に「こうなります」の一覧で確かめられます。元のファイルはそのまま残し、整理したコピーを新しいフォルダに作ります',
    ],
    img: '/tekipaki/screen-folder.webp', w: 900, h: 655,
    alt: 'てきぱきのフォルダ整理の画面。決まりを選ぶと、元の名前と整理したあとの名前・行き先の一覧が出る',
    href: 'url', label: 'フォルダ整理を試す（無料）',
  },
  {
    kicker: '02　転記ロボ（練習）',
    title: '1件入力して見せると、残りを表から入力します',
    points: [
      '練習用の入力画面で、1件だけ手で入力して［登録］を押すと、どの欄に何を入れたかをロボが覚えます',
      '見本のデータか、お手元の CSV を選ぶと、欄と列の組み合わせを見出しの名前から自動で決めます',
      '「1件ずつ確認しながら」と「続けて全部」を選べます',
      '入力のチェックに通らない行があると、その行で止まり、どの欄かを赤い枠で示します',
    ],
    img: '/tekipaki/screen-robot.webp', w: 1220, h: 1040,
    alt: '転記ロボの練習画面。左に架空の勤怠の入力画面、右にロボの操作。7件目の社員番号の打ち間違いで止まり、欄が赤い枠になっている',
    href: 'practice', label: '転記ロボを練習する（無料）',
  },
]

const STEPS = [
  { n: '1', title: 'フォルダを選ぶ', body: '整理したいフォルダを選びます。ブラウザに「編集を許可しますか」と聞かれたら「許可」を押します。' },
  { n: '2', title: '決まりを選ぶ', body: '日付を付ける、月ごとに分ける、など。選ぶたびに「こうなります」の一覧が変わります。' },
  { n: '3', title: '確かめて整理する', body: '一覧でよければ「整理する」。選んだフォルダの中に「整理済み_日時」フォルダができます。' },
]

export default function TekipakiPage() {
  const p = PAGES.tekipaki
  const hrefOf = (h) => (h === 'practice' ? TEKIPAKI_PRACTICE_URL : TEKIPAKI_URL)

  return (
    <>
      <Seo page={p} />
      <PageHead label="TRY NOW" title={p.h1} desc={p.description} crumb={p.crumb} />

      <section className="tk-hero">
        <div className="container tk-hero-inner">
          <div>
            <p className="tk-lead">「ファイル名をそろえる」「フォルダに分ける」「表を別の画面に打ち込む」。毎日の小さな手作業を、パソコンのブラウザだけで片付ける無料の道具です。</p>
            <p className="tk-lead-sub">インストールも登録もいりません。整理するファイルは、どこにも送りません。</p>
            <div className="tk-cta">
              <a className="btn-yellow" href={TEKIPAKI_URL} rel="noopener">フォルダ整理を試す（無料）</a>
              <a className="tk-sub-cta" href={TEKIPAKI_PRACTICE_URL} rel="noopener">転記ロボを練習する</a>
            </div>
            <p className="tk-cta-note">※ パソコンの Chrome か Edge でお使いください（スマートフォン・Safari では、フォルダ整理は使えません）。</p>
          </div>
          <img className="tk-hero-img" src="/tekipaki/screen-folder.webp" alt="てきぱきのフォルダ整理の画面" width="900" height="655" />
        </div>
      </section>

      <section className="tk-pains">
        <div className="container">
          <h2 className="section-title">こんな手作業、毎日くり返していませんか</h2>
          <div className="tk-pain-list">
            {PAINS.map((x) => (
              <article className="tk-pain" key={x.title}>
                <h3>{x.title}</h3>
                <p>{x.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tk-features">
        <div className="container">
          <h2 className="section-title">てきぱきでできること</h2>
          <div className="tk-feature-list">
            {FEATURES.map((f) => (
              <article className="tk-feature" key={f.title}>
                <div>
                  <p className="tk-kicker">{f.kicker}</p>
                  <h3>{f.title}</h3>
                  <ul>{f.points.map((t) => <li key={t}>{t}</li>)}</ul>
                  <a className="tk-feature-link" href={hrefOf(f.href)} rel="noopener">{f.label} →</a>
                </div>
                <img className="tk-feature-img" src={f.img} alt={f.alt} width={f.w} height={f.h} loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tk-steps">
        <div className="container">
          <h2 className="section-title">フォルダ整理は、3つの手順だけ</h2>
          <ol className="tk-step-list">
            {STEPS.map((s) => (
              <li className="tk-step" key={s.n}>
                <span className="tk-step-n" aria-hidden="true">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="tk-rules">
        <div className="container tk-narrow">
          <h2 className="section-title">安心してお使いいただくために</h2>
          <ul className="tk-rule-list">
            <li><strong>ファイルは、どこにも送りません。</strong>整理はお使いのパソコンのブラウザの中だけで行います。こちらのサーバーに届くことはありません。</li>
            <li><strong>元のファイルは、消したり書き換えたりしません。</strong>整理したものは「整理済み_日時」フォルダにコピーします。中身を確かめてから、元のファイルを片付けてください。</li>
            <li><strong>転記ロボは、パスワードの欄を記録しません。</strong>練習画面で入力した内容も、その画面の中だけに出て、保存も送信もしません。</li>
            <li><strong>登録はいりません。</strong>パソコンの Chrome か Edge で開けば、すぐに使えます。</li>
          </ul>
        </div>
      </section>

      <section className="tk-paid">
        <div className="container tk-narrow">
          <h2 className="section-title">自分の会社のシステムに転記したいときは</h2>
          <p>無料で体験できる転記ロボは、練習用の画面の中だけで動きます。お使いの勤怠・受注・kintone などの画面に転記したい場合は、その画面に合わせた有料版をご用意します。業務の流れ全体を自動にしたい場合は、<Link to="/rk/">RKシナリオ作成代行</Link>や個別の開発もご相談いただけます。</p>
        </div>
      </section>

      <section className="tk-faq">
        <div className="container tk-narrow">
          <h2 className="section-title">よくあるご質問</h2>
          <div className="tk-faq-list">
            {TEKIPAKI_FAQS.map((f) => (
              <details className="tk-faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <h2>「この作業も自動にできる？」と思ったら</h2>
          <p>ファイル整理や転記のほかにも、毎月くり返している作業があれば、今の Excel や様式のままで自動にできるかを一緒に考えます。</p>
          <Link to="/contact" className="btn-yellow">話してみる（無料）</Link>
        </div>
      </section>
    </>
  )
}
