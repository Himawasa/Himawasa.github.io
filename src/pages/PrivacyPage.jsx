import Seo from '../components/Seo'
import PageHead from '../components/PageHead'
import { PAGES, BUSINESS } from '../seo/site'

export default function PrivacyPage() {
  const p = PAGES.privacy
  return (
    <>
      <Seo page={p} />
      <PageHead label="PRIVACY" title={p.h1} desc={p.description} crumb={p.crumb} />
      <section className="privacy">
        <div className="container privacy-body">
          <p>{BUSINESS.tradeName}（{BUSINESS.type}）は、相談や体験でいただいた情報を、次の範囲で扱います。</p>
          <h2>使う目的</h2>
          <p>ご相談への返信、見積もり、導入後の保守連絡に使います。売り込みの電話には使いません。</p>
          <h2>取得する情報（ご入力いただく内容）</h2>
          <p>お名前、メール、業務の内容です。必要以上の個人情報は求めません。</p>
          <h2>第三者への提供について</h2>
          <p>相談内容を、許可なく第三者に渡しません。法令に基づく場合を除きます。</p>
          <h2>保管</h2>
          <p>Googleのフォームとメールで受け取ります。対応に必要な期間、保管します。</p>
          <h2>アクセスの記録</h2>
          <p>
            サイトの改善のため、Google アナリティクスを使っています。どのページが読まれたかが分かります。お名前やメールは集まりません。
            Googleの取り扱いは
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
            をご覧ください。
          </p>
          <h2>お問い合わせ</h2>
          <p><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></p>
        </div>
      </section>
    </>
  )
}
