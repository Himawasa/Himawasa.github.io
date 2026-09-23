import { INDUSTRY_BY_PAGE } from '../pages/for/industries.js'
import { RK_BY_PAGE } from '../pages/rk/rk.js'

/**
 * SEO の単一ソース。
 * - React Helmet（実行後）
 * - index.html へのビルド時注入（JS未実行クローラ向け）
 * の両方で同じ文言・同じ JSON-LD を出す。
 */

export const SITE_URL = 'https://himawasa-sync.com'

export const SITE = {
  name: 'HiMaWaSa Sync',
  url: SITE_URL,
  locale: 'ja_JP',
  lang: 'ja',
  title: '今のExcelのまま業務自動化・現場DX｜介護・医療・士業 | HiMaWaSa Sync',
  description:
    '介護施設のシフト表、病院の日計、士業の請求を、今のExcelのまま自動化します。個人事業 HiMaWaSa Sync。初回相談は無料（30分）。営業の電話はしません。',
  ogDescription:
    '今のExcelのまま、介護・医療・士業の現場DX。使い方がわからなくても相談できます。営業の電話はしません。',
  keywords: [
    'Excel自動化',
    'GAS',
    '士業DX',
    '介護DX',
    '介護 シフト 自動化',
    '病院 日計',
    '業務自動化',
    'Google Workspace',
    '現場DX',
    'AI活用',
    'AI導入支援',
    'RKシナリオ作成代行',
    'RKシリーズ',
    'RK-10',
    'シナリオ作成代行',
    'キーエンスRK',
    '工場RK',
    '病院RK',
    '介護RK',
    '士業RK',
    '中小企業RK',
    'クリックRK',
  ],
  ogImage: `${SITE_URL}/ogp.png`,
  ogImageAlt: 'HiMaWaSa Sync — 今のExcelのまま、現場の手作業を自動化',
  logo: `${SITE_URL}/logo.png`,
  email: 'info@himawasa-sync.com',
  /** 無料相談フォーム（Contact / Pricing で共用） */
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLScsWdmeXdZLbboyxVXzILMIzxCVOOVtbIQuYhaRo10Fnm_kcw/viewform',
  foundingDate: '2024',
  areaServed: 'JP',
  verification: 'R9gFxYt7rLiAvSMDrxDMYlkiwvSY08qfplXtgm046Uw',
  gaId: 'G-LPK6XB72X8',
  sameAs: [
    'https://note.com/himawasa_sync',
    'https://github.com/Himawasa',
  ],
  founder: {
    name: 'HiMaWaSa Sync',
    jobTitle: '代表 / 業務改善エンジニア',
  },
}

/** 事業概要（個人事業。住所は出さない） */
export const BUSINESS = {
  tradeName: 'HiMaWaSa Sync',
  type: '個人事業',
  representative: '',
  opened: '2024年',
  area: '全国（オンライン中心）',
  email: SITE.email,
  note: 'https://note.com/himawasa_sync',
  work: '今お使いのExcel・Googleのまま、介護施設のシフト、病院の日計、士業の請求を自動化します。RKは入っている現場の補助です。',
}

/** 企業サイト各ページの SEO（title は検索結果用の全文。canonical は末尾スラッシュ） */
export const PAGES = {
  home: {
    key: 'home',
    path: '/',
    title: SITE.title,
    h1: '今のExcelのまま、現場の手作業を自動化',
    description: SITE.description,
    og: SITE.ogDescription,
    crumb: 'トップ',
  },
  services: {
    key: 'services',
    path: '/services/',
    title: '介護・病院・士業の自動化と料金の目安 | HiMaWaSa Sync',
    h1: '介護・病院・士業の自動化と、料金の目安',
    description:
      '介護施設のシフト、病院の日計、士業の請求。今のExcelのまま自動化します。GAS・AI、必要ならキーエンスRKのシナリオ作成も補助で。初回相談は無料。',
    og: '介護・病院・士業の手作業から。RKは入っている現場の補助です。',
    crumb: 'サービス',
  },
  works: {
    key: 'works',
    path: '/works/',
    title: '導入効果・開発実績（現場45件以上） | HiMaWaSa Sync',
    h1: '導入効果・開発実績',
    description:
      '士業・介護・医療・中小企業の現場で動かしてきた実績。例：5時間の手作業が3分に。許可をいただいた範囲の効果と、公開できる開発事例を掲載しています。',
    og: '現場45件以上。手作業が短くなった例と、公開できる開発実績。',
    crumb: '実績',
  },
  about: {
    key: 'about',
    path: '/about/',
    title: '事業概要・代表 | HiMaWaSa Sync',
    h1: '私たちについて',
    description:
      '個人事業 HiMaWaSa Syncです。IT業界25年、カスタマーサクセスの現場を長く経験してきました。士業・介護・病院・中小企業の現場に残る手作業を、今のやり方のまま自動化します。RKは入っている現場の補助です。',
    og: '聞いてから作り、止まったら戻します。今のExcelのまま自動化します。',
    crumb: '私たち',
  },
  ai: {
    key: 'ai',
    path: '/ai/',
    title: 'AIの使い方支援と、作ったあとの保守 | HiMaWaSa Sync',
    h1: 'AI時代の開発',
    description:
      'AIは隙間を埋める相棒です。使い方がわからなくても大丈夫です。AIで作った仕組みの点検もします。中身がわかる人が、そばに残ります。',
    og: 'AIの使い方がわからなくても大丈夫。作ったあとが本番です。',
    crumb: 'AI時代',
  },
  contact: {
    key: 'contact',
    path: '/contact/',
    title: '無料相談（売り込みなし）｜Excelを見ながら話せます | HiMaWaSa Sync',
    h1: '無料相談',
    description:
      'まずは話を聞いてみたいだけでも大丈夫です。今お使いのExcelを見ながらの相談もできます。返信はメールかフォームです。初回は無料（30分）。',
    og: 'まずは話を聞くだけでも大丈夫です。フォームかメールからどうぞ。',
    crumb: '無料相談',
  },
  try: {
    key: 'try',
    path: '/try/',
    title: '無料体験｜持ち物チェック・PDF変換を先に試せます | HiMaWaSa Sync',
    h1: '無料で体験できるミニアプリ',
    description:
      'MochiSync・PDFuse Sync・LegoSync・SukkiriSync。写真やPDFで、自動化の感触を先に試せます。法人向け相談とは別。アカウント登録はGoogleログインのみ。',
    og: '登録なしで、先に触ってみる。持ち物リスト、PDF→Excel、書類要約、片付け提案。',
    crumb: '無料体験',
  },
  privacy: {
    key: 'privacy',
    path: '/privacy/',
    title: 'プライバシー | HiMaWaSa Sync',
    h1: '個人情報の扱い',
    description: '相談でいただいた情報の使い方です。売り込みの電話には使いません。',
    og: '相談内容は、返信と保守のためにだけ使います。',
    crumb: 'プライバシー',
  },
  notFound: {
    key: 'notFound',
    path: '/404',
    title: 'ページが見つかりません | HiMaWaSa Sync',
    h1: 'ページが見つかりません',
    description: 'アドレスが変わったか、公開を終了した可能性があります。サービス・実績・お問い合わせからお探しください。',
    og: 'お探しのページは見つかりませんでした。',
    crumb: 'ページが見つかりません',
    noindex: true,
  },
  forPro: {
    key: 'forPro',
    path: '/for/pro/',
    title: '社労士・税理士の期日管理・請求書自動化 | HiMaWaSa Sync',
    h1: '士業事務所に残る手作業を、シンプルにする',
    description:
      '社労士・税理士事務所の顧客台帳、期日のお知らせ、請求・FAX整理を自動化。今のExcel・Wordのまま始められます。初回相談は無料・30分。',
    og: '士業事務所に残る手作業を、シンプルにする。売り込みの電話はしません。',
    crumb: '士業の方',
    audience: '士業事務所',
    ogImage: '/dm/dm-pro-cover.jpg',
    ogImageAlt: '士業事務所。顧客台帳・期日・請求の手作業を軽くする',
  },
  forCare: {
    key: 'forCare',
    path: '/for/care/',
    title: '介護施設・病院のシフト表・日計・持ち物の自動化 | HiMaWaSa Sync',
    h1: '介護施設と病院の手作業を、シンプルにする',
    description:
      '介護施設のシフト表・持ち物チェック、病院の日計・カルテ転記を自動化。KING OF TIME連携。今のExcelのまま。初回相談は無料・30分。RKは入っている現場の補助です。',
    og: 'シフト、持ち物、日計。介護と病院の毎月の手間を、ひとつずつ軽くします。',
    crumb: '介護・医療の方',
    audience: '介護施設・病院',
    keywords: '介護 シフト 自動化,介護施設 シフト表,病院 日計 自動化,持ち物チェック 介護,KING OF TIME シフト',
    ogImage: '/dm/dm-cover.jpg',
    ogImageAlt: '介護施設と病院の現場。シフト表と持ち物、日計の手作業を軽くする',
  },
  forBiz: {
    key: 'forBiz',
    path: '/for/biz/',
    title: '中小企業のPDF→Excel・kintone自動化 | HiMaWaSa Sync',
    h1: '中小企業の毎日の手作業を、シンプルにする',
    description:
      '中小企業の帳票転記（PDF→Excel）、kintoneでの業務整理、GAS・AIによる繰り返し作業の自動化。今のPCのまま。初回相談は無料・30分。',
    og: '帳票の転記、Excelの整理、繰り返し作業。小さく始めて、ひとつずつ軽くします。',
    crumb: '中小企業の方',
    audience: '中小企業',
    ogImage: '/dm/dm-smb-cover.jpg',
    ogImageAlt: '中小企業の事務所。帳票転記とExcel整理の手作業を軽くする',
  },
  rk: {
    key: 'rk',
    path: '/rk/',
    title: 'RKシナリオ作成代行｜キーエンスRKシリーズ・RK-10 | HiMaWaSa Sync',
    h1: 'RKシリーズ シナリオ作成代行',
    description:
      'キーエンス製RPA「RKシリーズ」「RK-10」のシナリオ作成代行。導入済みで活用できていない現場へ。作成1万円から、運用保守代行は月5,000円から。無料相談30分。',
    og: 'キーエンスRKシリーズ／RK-10のシナリオ作成・運用保守を代行。作成1万円から。',
    crumb: 'RKシナリオ作成代行',
    audience: 'キーエンスRKシリーズを導入した現場',
    keywords: 'RKシナリオ作成代行,RKシリーズ,RK-10,キーエンス,RPA,シナリオ作成代行,運用保守代行',
    ogImage: '/dm/dm-smb-cover.jpg',
    ogImageAlt: 'キーエンスRKシリーズのシナリオ作成代行',
  },
  rkFactory: {
    key: 'rkFactory',
    path: '/rk/factory/',
    title: '工場RKシナリオ作成代行｜試験・実績・発注 | HiMaWaSa Sync',
    h1: '工場RK シナリオ作成代行',
    description:
      '工場RKのシナリオ代行。試験データのグラフ化、実績の資料化、社内発注の転記をキーエンスRKのシナリオにします。作成1万円から、保守月5,000円から。',
    og: '工場RKシナリオ代行。試験・実績・発注の一本目から。',
    crumb: '工場RKシナリオ代行',
    audience: '工場',
    ogImage: '/dm/dm-smb-cover.jpg',
    ogImageAlt: '工場事務所で試験データや実績をExcelへ転記する',
  },
  rkHospital: {
    key: 'rkHospital',
    path: '/rk/hospital/',
    title: '病院のRKは補助｜日計・カルテ転記のシナリオ | HiMaWaSa Sync',
    h1: '病院のRKは、日計の補助です',
    description:
      '病院RKのシナリオ代行。電子カルテからのCSV抜き出し、日計・レセプトまわり、複数拠点のExcel統合。キーエンスRKのシナリオ作成を代行します。1万円から。',
    og: '病院RKシナリオ代行。夜間の抜き出しと日計から。',
    crumb: '病院RKシナリオ代行',
    audience: '病院・医事課',
    ogImage: '/dm/dm-calendar.jpg',
    ogImageAlt: '病院の日計や予定の集計',
  },
  rkCare: {
    key: 'rkCare',
    path: '/rk/care/',
    title: '介護のRKは補助｜シフト転記のシナリオ | HiMaWaSa Sync',
    h1: '介護のRKは、シフト転記の補助です',
    description:
      '介護RKのシナリオ代行。シフト表、記録・申し送り、月末の実績まとめをキーエンスRKのシナリオにします。作成1万円から、保守月5,000円から。',
    og: '介護RKシナリオ代行。シフトと記録の転記から。',
    crumb: '介護RKシナリオ代行',
    audience: '介護施設',
    ogImage: '/dm/dm-cover.jpg',
    ogImageAlt: '介護施設のシフトと勤怠の手作業',
  },
  rkPro: {
    key: 'rkPro',
    path: '/rk/pro/',
    title: '士業RKシナリオ作成代行｜台帳・期日・請求 | HiMaWaSa Sync',
    h1: '士業RK シナリオ作成代行',
    description:
      '士業RKのシナリオ代行。社労士・税理士の顧客台帳、期日リスト、請求をキーエンスRKのシナリオにします。作成1万円から。顧問先名は出しません。',
    og: '士業RKシナリオ代行。台帳・期日・請求。名前は出しません。',
    crumb: '士業RKシナリオ代行',
    audience: '士業事務所',
    ogImage: '/dm/dm-pro-cover.jpg',
    ogImageAlt: '士業事務所の顧客台帳と請求',
  },
  rkBiz: {
    key: 'rkBiz',
    path: '/rk/biz/',
    title: '中小企業RKシナリオ作成代行｜帳票転記 | HiMaWaSa Sync',
    h1: '中小企業RK シナリオ作成代行',
    description:
      '中小企業RKのシナリオ代行。帳票の転記、最新版Excelの整理、繰り返しの集計。自分で組むのが面倒なら、シナリオ作成を代行します。1万円から。',
    og: '中小企業RKシナリオ代行。帳票とExcelの転記から。',
    crumb: '中小企業RKシナリオ代行',
    audience: '中小企業',
    ogImage: '/dm/dm-smb-cover.jpg',
    ogImageAlt: '中小企業の帳票転記',
  },
  rkClick: {
    key: 'rkClick',
    path: '/rk/click/',
    title: 'クリックRKシナリオ作成代行｜ボタン・ファイル起動 | HiMaWaSa Sync',
    h1: 'クリックRK シナリオ作成代行',
    description:
      'クリックRKのシナリオ代行。キーエンスRKのスケジュール実行に加え、ボタン一回・ファイル追加をきっかけにするシナリオ作成を代行します。1万円から。',
    og: 'クリックRKシナリオ代行。ボタン、ファイルから回す相談。',
    crumb: 'クリックRKシナリオ代行',
    audience: 'RKの起動を広げたい現場',
    ogImage: '/dm/dm-smb-auto.jpg',
    ogImageAlt: 'ボタン一回で繰り返し作業を回す',
  },
  supply: {
    key: 'supply',
    path: '/supply/',
    title: '消耗品のご注文（デモ）',
    h1: '消耗品のご注文',
    description: '宿題用のたたき台。架空データのみ。',
    og: '宿題用のたたき台。',
    crumb: '消耗品注文',
    noindex: true,
    nofollow: true,
  },
  card: {
    key: 'card',
    path: '/card/',
    title: 'カード発行デモ',
    h1: 'カード発行デモ',
    description: '関係者向けの見本。検索には出しません。',
    og: '関係者向けの見本。',
    crumb: 'カード発行デモ',
    noindex: true,
    nofollow: true,
  },
  cardsync: {
    key: 'cardsync',
    path: '/cardsync/',
    title: 'CardSync｜いつもの名簿から、そのままカードを。 | HiMaWaSa Sync',
    h1: 'いつもの名簿から、そのままカードを。',
    description:
      'Excel や CSV の名簿と顔写真の ZIP をドラッグ＆ドロップするだけで、社員証・来訪者証・立入許可証をブラウザ上で発行できます。署名つき QR で、スマートフォンから本物かを確認できます。登録不要でお試しいただけます。',
    og: '見てすぐ分かるカードを、お手元の名簿から。登録不要でお試しいただけます。',
    ogImage: '/cardsync/og-cardsync.png',
    ogImageAlt: 'CardSync。いつもの名簿から、社員証・来訪者証・立入許可証をそのまま発行',
    keywords: '社員証 作成,職員証 作成,IDカード 作成,来訪者証,入館証,立入許可証,名簿 Excel 差し込み,顔写真 一括,カード発行 ソフト,社内発行',
    crumb: 'CardSync',
  },
}

// CardSync の体験版（Cloud Run）の URL。空のあいだは、説明ページは「まもなく公開」と出し、体験一覧にも載せない。
export const CARDSYNC_TRIAL_URL = 'https://card.himawasa-sync.com'

// よくあるご質問。ページの本文と、検索向けの構造化データ（FAQPage）で同じものを使う。
// 検索で見せる答えと、ページに書いてある答えが違うと、検索側に嫌われるため。
export const CARDSYNC_FAQS = [
  {
    q: '社員証を作るのに、専用のソフトは必要ですか？',
    a: '必要ありません。ブラウザだけで、名簿の取り込みからデザイン、発行までを行えます。インストールも、アカウント登録も不要です。',
  },
  {
    q: 'いま使っている Excel の名簿を、そのまま使えますか？',
    a: 'そのままお使いいただけます。Excel（.xlsx）と CSV に対応し、文字化けしやすい Shift_JIS のファイルも自動で判別します。和暦の日付や、EMP-0001 のような通し番号の自動採番にも対応しています。',
  },
  {
    q: '顔写真は、一人ずつ登録しないといけませんか？',
    a: '一括で登録できます。「社員番号.jpg」のように名簿の値をファイル名にした写真を ZIP にまとめて置くと、全員分が自動でそれぞれのカードに配置されます。',
  },
  {
    q: '顔写真は、あらかじめ切り抜いておく必要がありますか？',
    a: '必要ありません。取り込むときに顔を見つけて、証明写真の決まり（頭の大きさ・目の高さ）に合わせて自動で切りそろえます。スマートフォンで撮ったままの写真で構いません。縦向きで撮った写真の向きも自動で直します。切るだけで引き伸ばしはしないため、お顔の形が変わることはありません。顔が見つからない写真や、すでに証明写真になっているものは、無理に切らずそのまま取り込みます。',
  },
  {
    q: 'どんなカードプリンタで印刷できますか？',
    a: '実寸（85.6 × 54 mm）で印刷できるプリンタであればお使いいただけます。印刷の細かさは 300dpi と 600dpi から選べるため、600dpi の再転写プリンタでもその細かさのまま出力できます。PDF に保存して、印刷を外部に依頼することもできます。',
  },
  {
    q: '来訪者証や、立入許可証も作れますか？',
    a: '作れます。社員証・来訪者証・立入許可証の3種類の見本が用意されており、社名・配色・項目の位置を画面の上で調整できます。表と裏の両面に対応しています。',
  },
  {
    q: 'カードの偽造が心配です。見分けられますか？',
    a: 'カードの裏面に、署名入りの QR コードを印刷できます。スマートフォンの標準のカメラで読み取ると、本当に発行されたカードか、有効期限内かがその場で分かります。専用アプリは不要です。QR の中身を書き換えると「確かめられませんでした」と表示されます。退職された方や紛失したカードは、名簿から削除すれば「すでに使われていません」に変わります。なお、本物の QR をそのまま複製したカードは、名簿に残っているあいだは有効と表示されますので、紛失時は名簿からの削除をお願いします。QR の中身に氏名は書いていません。',
  },
  {
    q: '体験で入力したデータは、どうなりますか？',
    a: '24時間後に自動で消去されます。ほかの方から見えることもありません。なお、体験では実在する方の氏名や顔写真の登録はお控えください。',
  },
  {
    q: '個人情報を外部のクラウドに置きたくないのですが。',
    a: '社内のネットワークだけで動かす構成もご用意できます。PostgreSQL を同梱した一式をお渡しし、社内のパソコンだけで完結させられます。導入をご検討の際にご相談ください。',
  },
]

export const TRY_APPS = [
  {
    icon: '📦', name: 'MochiSync',
    desc: '写真を撮るだけで、持ち物リストができます',
    note: '介護施設の入所時に最適',
    href: 'https://himawasa-sync.com/mochisync/',
    btn: '📷 スマホで試す →', btnColor: '#69DB7C',
    borderColor: 'rgba(105,219,124,0.4)',
  },
  {
    icon: '📄', name: 'PDFuse Sync',
    desc: 'PDFを上げるだけで、Excelになります',
    note: '請求書・帳票のデータ化に',
    href: 'https://himawasa-sync.com/pdfuse/',
    btn: '📄 PCで試す →', btnColor: '#64b5f6',
    borderColor: 'rgba(100,180,246,0.4)',
  },
  {
    icon: '📋', name: 'LegoSync',
    desc: 'カメラで撮ると、書類の要約が出ます',
    note: 'どんな業界の書類でもOK',
    href: 'https://himawasa-sync.com/legosync/',
    btn: '📷 スマホで試す →', btnColor: '#FFB347',
    borderColor: 'rgba(255,179,71,0.4)',
  },
  {
    icon: '🧹', name: 'SukkiriSync',
    desc: '部屋の写真から、片付けの順番を出します',
    note: 'お部屋も施設もスッキリ',
    href: 'https://himawasa-sync.com/sukkirisync/',
    btn: '📷 スマホで試す →', btnColor: '#4ecdc4',
    borderColor: 'rgba(78,205,196,0.4)',
  },
  ...(CARDSYNC_TRIAL_URL
    ? [{
        icon: '🪪', name: 'CardSync',
        desc: '名簿から、社員証や来訪者証を作れます',
        note: '職員証・来訪者証・面会証に',
        href: 'https://himawasa-sync.com/cardsync/',
        btn: '💻 PCで試す →', btnColor: '#64b5f6',
        borderColor: 'rgba(100,180,246,0.4)',
      }]
    : []),
]

export const SERVICE_ITEMS = [
  { name: 'RKシナリオ作成代行', desc: 'キーエンスRKシリーズ／RK-10のシナリオ作成を代行。1万円から。何を自動化するか決まっていなくても可。' },
  { name: '業務アプリ開発', desc: '写真撮影からチェックリストまで、スマホで使える現場向けツール。' },
  { name: '業務自動化（GAS・AI）', desc: '転記・集計・帳票など、毎月の繰り返しを自動化。' },
  { name: '士業向けDX支援', desc: '社労士・税理士などの期日・帳票・顧問先対応をシンプルに。' },
  { name: '業務改善コンサルティング', desc: '何から始めるかを、現場の困りごとから整理します。' },
  { name: 'システム保守・運用', desc: 'AIで作った仕組みの点検も含め、わかる人が残って直します。' },
  { name: 'AI活用コンサルティング', desc: '使い方がわからないところから、隙間を埋める使い方まで。' },
]

/** FAQ（画面と FAQPage 構造化データで共用） */
export const FAQS = [
  {
    q: 'マニュアルがなくても、現場のスタッフが使えますか？',
    a: '使えます。難しい画面は作りません。「いつものExcelが、ボタン一つで終わる」が目標です。初日のレクチャーも込みです。それでも不安なら、相談のときに実際の画面を見ながら確認できます。',
  },
  {
    q: '指定のExcelフォーマットを、変えずに使えますか？',
    a: 'そこが一番のこだわりです。様式を作り直すより、今のファイルに合わせます。動くかどうかは、お試しで一緒に確認できます。',
  },
  {
    q: '解約やプラン変更は、融通が利きますか？',
    a: '小さく始めて、合わなければ縮小できます。最初から大きく契約させるつもりはありません。長く使ってもらう方が、こちらも楽だからです。',
  },
  {
    q: '相談したら、営業の電話がしつこくなりませんか？',
    a: 'なりません。売り込みの電話はしません。続きが必要なら、その場で次の約束を取るだけです。',
  },
  {
    q: 'うちの規模でも、お願いできますか？',
    a: '士業事務所、介護・医療の現場、中小企業が中心です。大企業向けのパッケージ売りではありません。「毎月の泥臭い作業」があるなら、話を聞く価値はあります。',
  },
  {
    q: 'AIで作ったシステムでも、見てもらえますか？',
    a: '見ます。思い通りに動いているものも、止まっているものもあります。中身がわからないまま置いてあるなら、まず一緒に整理します。作った人の名前は問いません。',
  },
  {
    q: 'AIの使い方がわからなくても、相談できますか？',
    a: 'できます。道具の名前から始めなくて大丈夫です。「毎月これが面倒」から話してください。AIは隙間を埋めるパートナーです。使い方も含めて、そばで見ます。',
  },
  {
    q: '介護施設のシフト表を、今のExcelのまま自動化できますか？',
    a: 'できます。KING OF TIMEなどの勤怠データから、施設指定のシフトExcelへ載せます。様式を作り直すより、今のファイルに合わせます。案内は https://himawasa-sync.com/for/care/ と https://himawasa-sync.com/shiftsync/ です。キーエンスRKは必須ではありません。',
  },
  {
    q: '病院の日計やカルテまわりの転記も頼めますか？',
    a: '頼めます。人が今、電子カルテや医事ソフトの画面・CSVで出している範囲だけです。金額の確定は医事の人のままです。案内は https://himawasa-sync.com/for/care/ と https://himawasa-sync.com/medical-dx/ です。',
  },
  {
    q: 'キーエンスRKのシナリオ作成も頼めますか？',
    a: 'RKが入っている現場だけ、補助で受けます。必須ではありません。作成代行は1万円から、運用保守は月5,000円から。ライセンスは売りません。案内は https://himawasa-sync.com/rk/ です。',
  },
  {
    q: '相談する前に、試せますか？',
    a: 'できます。無料体験のページに、持ち物チェックやPDF変換など、先に触れるミニアプリがあります。法人向けの仕組みとは別です。Googleアカウントでログインします。',
  },
]

/** AI時代の寄り添い（画面・noscript・構造化データで共用） */
export const AI_ERA = {
  heading: 'AIで作ったあとが、本番です',
  lead: 'AIは、隙間を埋めるパートナーです。使い方がわからないところからでも、一緒にやれます。',
  points: [
    {
      title: 'AIは、隙間を埋めるパートナー',
      text: '人の代わりではありません。毎月の転記、確認、まとめ——人がやらなくていい隙間を、AIが埋めます。',
    },
    {
      title: '使い方がわからなくても、大丈夫です',
      text: '専門用語やツールの名前は知らなくて大丈夫です。「日々の業務でどこが一番面倒か」をお聞かせいただければ、最適な解決策を一緒に探します。',
    },
    {
      title: '作ったあと、わかる人が残ります',
      text: '作った後も、現場で動かしながら調整を続けます。「納品して終わり」にはせず、運用まで伴走します。',
    },
  ],
}

/** サイトマップに載せる公開ページ（顧客専用・非公開は載せない）。優先は介護・病院。RKは補助。 */
export const PUBLIC_PAGES = [
  { path: '/', lastmod: '2026-08-30', changefreq: 'weekly', priority: '1.0' },
  { path: '/for/care/', lastmod: '2026-08-30', changefreq: 'weekly', priority: '0.95' },
  { path: '/Guide/care/', lastmod: '2026-09-23', changefreq: 'weekly', priority: '0.7' },
  { path: '/temasui/', lastmod: '2026-09-24', changefreq: 'weekly', priority: '0.9' },
  { path: '/shiftsync/', lastmod: '2026-08-26', changefreq: 'weekly', priority: '0.9' },
  { path: '/medical-dx/', lastmod: '2026-08-26', changefreq: 'weekly', priority: '0.9' },
  { path: '/Guide/mochisync2/', lastmod: '2026-08-30', changefreq: 'monthly', priority: '0.55' },
  { path: '/Guide/caresync/', lastmod: '2026-08-30', changefreq: 'monthly', priority: '0.55' },
  { path: '/for/pro/', lastmod: '2026-08-22', changefreq: 'weekly', priority: '0.85' },
  { path: '/for/biz/', lastmod: '2026-08-22', changefreq: 'weekly', priority: '0.85' },
  { path: '/services/', lastmod: '2026-08-22', changefreq: 'weekly', priority: '0.8' },
  { path: '/works/', lastmod: '2026-08-17', changefreq: 'weekly', priority: '0.7' },
  { path: '/about/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.6' },
  { path: '/ai/', lastmod: '2026-08-17', changefreq: 'weekly', priority: '0.6' },
  { path: '/contact/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.7' },
  { path: '/try/', lastmod: '2026-08-17', changefreq: 'weekly', priority: '0.6' },
  { path: '/cardsync/', lastmod: '2026-09-21', changefreq: 'weekly', priority: '0.85' },
  { path: '/privacy/', lastmod: '2026-08-17', changefreq: 'yearly', priority: '0.2' },
  { path: '/kintone-dx/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.6' },
  { path: '/pro-dx/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.6' },
  { path: '/yoom-lp/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.5' },
  { path: '/sharoushi-portal/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.5' },
  { path: '/mochisync/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.4' },
  { path: '/pdfuse/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.4' },
  { path: '/legosync/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.3' },
  { path: '/sukkirisync/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.3' },
  { path: '/mochisync2/', lastmod: '2026-08-17', changefreq: 'monthly', priority: '0.3' },
  { path: '/rk/', lastmod: '2026-08-26', changefreq: 'monthly', priority: '0.5' },
  { path: '/rk/care/', lastmod: '2026-08-26', changefreq: 'monthly', priority: '0.4' },
  { path: '/rk/hospital/', lastmod: '2026-08-26', changefreq: 'monthly', priority: '0.4' },
  { path: '/rk/factory/', lastmod: '2026-08-25', changefreq: 'monthly', priority: '0.4' },
  { path: '/rk/pro/', lastmod: '2026-08-25', changefreq: 'monthly', priority: '0.4' },
  { path: '/rk/biz/', lastmod: '2026-08-25', changefreq: 'monthly', priority: '0.4' },
  { path: '/rk/click/', lastmod: '2026-08-25', changefreq: 'monthly', priority: '0.4' },
]

function pageOgUrl(page) {
  if (!page?.ogImage) return SITE.ogImage
  return page.ogImage.startsWith('http') ? page.ogImage : `${SITE.url}${page.ogImage}`
}

export function generateSitemapXml() {
  const byPath = Object.fromEntries(Object.values(PAGES).map((p) => [p.path, p]))
  const urls = PUBLIC_PAGES.map((p) => {
    const page = byPath[p.path]
    const images = []
    if (page?.ogImage) {
      images.push({ loc: pageOgUrl(page), title: page.ogImageAlt || page.h1 })
    }
    const industry = page ? INDUSTRY_BY_PAGE[page.key] : null
    if (industry?.features) {
      for (const f of industry.features) {
        if (f.image) images.push({ loc: `${SITE_URL}${f.image}`, title: f.imageAlt || f.title })
      }
    }
    const rk = page ? RK_BY_PAGE[page.key] : null
    if (rk?.heroImage) {
      images.push({ loc: `${SITE_URL}${rk.heroImage}`, title: rk.heroAlt || page.h1 })
    }
    if (rk?.features) {
      for (const f of rk.features) {
        if (f.image) images.push({ loc: `${SITE_URL}${f.image}`, title: f.imageAlt || f.title })
      }
    }
    const imageXml = images.map((img) => `    <image:image>
      <image:loc>${esc(img.loc)}</image:loc>
      <image:title>${esc(img.title)}</image:title>
    </image:image>`).join('\n')
    return `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
${imageXml}
  </url>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
}

/** AI検索・エージェント向けの短い案内。Google検索の順位には使われない。 */
export function generateLlmsTxt() {
  return `# HiMaWaSa Sync

> 個人事業 HiMaWaSa Sync。介護施設のシフト表、病院の日計、士業の請求を、今のExcelのまま自動化します。初回相談は無料（30分）。営業の電話はしません。キーエンスRKは必須ではありません（入っている現場の補助）。

- 公式: https://himawasa-sync.com/
- 相談: https://himawasa-sync.com/contact/
- 詳細概要: https://himawasa-sync.com/llms-full.txt
- note: https://note.com/himawasa_sync
- メール: ${SITE.email}

## 主に頼まれること（この順で案内する）
- [てますい（介護施設のアシスタント）](https://himawasa-sync.com/temasui/): 介護記録・申し送り・事故報告書などの下書き（話すだけでも）、持ち物チェック、予定カレンダー。インストール不要、1か月無料
- [介護施設・病院](https://himawasa-sync.com/for/care/): シフト表、持ち物チェック、日計・カルテ転記
- [施設で改善できること](https://himawasa-sync.com/Guide/care/): 持ち物・シフト・予定・常勤換算などの一覧
- [介護のシフト表自動化](https://himawasa-sync.com/shiftsync/): KING OF TIMEの実績 → 今の勤務表様式
- [病院・医療機関のDX](https://himawasa-sync.com/medical-dx/): FAX、カルテ周辺、日計
- [士業事務所](https://himawasa-sync.com/for/pro/): 顧客台帳、期日、請求
- [中小企業](https://himawasa-sync.com/for/biz/): PDF→Excel、kintone、GAS
- [キーエンスRK（補助）](https://himawasa-sync.com/rk/): シナリオ作成代行1万円から。代理店ではない。ライセンスは売らない
- [社員証・来訪者証の社内発行 CardSync](https://himawasa-sync.com/cardsync/): Excelの名簿と顔写真ZIPから、社員証・来訪者証・立入許可証をブラウザで発行。登録不要で体験できる

## 事実（引用してよい）
- 屋号は HiMaWaSa Sync。個人事業。開業は2024年。
- 対応は全国（オンライン中心）。
- 今のExcel・Googleの様式を変えずに自動化するのが基本。
- 初回相談は無料・30分。売り込みの電話はしない。
- キーエンスおよびRKシリーズの販売代理店ではない。
- 顧客専用アプリ（CareSyncなど）は公開サイトから案内しない。
`
}

export function generateLlmsFullTxt() {
  return `# HiMaWaSa Sync（詳細）

## だれか
個人事業 HiMaWaSa Sync。IT業界25年。カスタマーサクセス出身。
公式: https://himawasa-sync.com/
相談: https://himawasa-sync.com/contact/
メール: ${SITE.email}

## 何をするか
今使っているExcel・勤怠ソフト・電子カルテの「出している画面」を前提に、転記と確認を短くする。
新しいソフトへの乗り換えが目的ではない。

主対象は介護施設、病院・医事課、士業事務所、中小企業。

## 介護施設
入口: https://himawasa-sync.com/for/care/
一覧: https://himawasa-sync.com/Guide/care/
- シフト表: 勤怠データ（例: KING OF TIME）を、施設指定のExcel様式へ載せる。https://himawasa-sync.com/shiftsync/
- 持ち物チェック: 写真から一覧にする。
- 施設カレンダー: 予定・往診・残薬。
- 実地指導用に、今ある記録を出しやすくする。記録の作り方は施設に押し付けない。
- てますい（介護施設のアシスタント）: https://himawasa-sync.com/temasui/
  - 書類の下書き: 介護記録・申し送り・ご家族への連絡・事故報告書・ヒヤリハット・議事録・お知らせ・関係機関へのメールの8種類。メモを入れるか、話すだけで下書きになる。出てくるのは下書きで、職員が確かめて使う。
  - 持ち物チェック: 写真から持ち物リスト（記名の有無つき）、返却時は写真で照合。
  - 予定カレンダー: 往診・利用変更・残薬の確認を職員全員で共有。
  - アプリのダウンロード不要（パソコン・タブレット・スマホ）。施設ごとの専用ページで、ほかの施設からは見えない。AIの学習には使われない。
  - 料金（税別）: 1か月無料体験 → ご契約時 30,000円＋交通費 → 月額 15,000円（施設全体で定額）。見本は登録なしで https://care.himawasa-sync.com/demo

## 病院・医事
入口: https://himawasa-sync.com/for/care/ と https://himawasa-sync.com/medical-dx/
- 日計・収入の転記。確認と金額の確定は人。
- 夜間にカルテが空く時間のCSV抜き出し。
- 複数拠点のExcel統合。
- カルテの中の診療記録を読む作業はしない。出せる統計・CSVの範囲だけ。

## 士業
入口: https://himawasa-sync.com/for/pro/
- 顧客台帳、期日のお知らせ、請求・届いた書類の振り分け。
- 顧問先名はサイトに出さない。

## キーエンスRK（補助）
入口: https://himawasa-sync.com/rk/
RKシリーズ／RK-10のシナリオ作成代行と、止まったあとの運用保守だけ。
作成 10,000円から。保守 月5,000円から。
ライセンスは売らない。契約はメーカーへ。
介護・病院の自動化にRKは必須ではない。入っている現場だけ受ける。

## 方針
売り込みの電話はしない。初回は無料・30分。
合わなければ縮小できる。大きく契約させる前提ではない。
`
}

export function buildJsonLd() {
  const orgId = `${SITE.url}/#organization`
  const siteId = `${SITE.url}/#website`
  const personId = `${SITE.url}/#founder`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE.name,
        url: `${SITE.url}/`,
        logo: { '@type': 'ImageObject', url: SITE.logo },
        image: SITE.ogImage,
        email: SITE.email,
        foundingDate: SITE.foundingDate,
        areaServed: { '@type': 'Country', name: 'Japan' },
        sameAs: SITE.sameAs,
        founder: { '@id': personId },
        description: SITE.description,
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE.founder.name,
        jobTitle: SITE.founder.jobTitle,
        worksFor: { '@id': orgId },
        url: `${SITE.url}/about/`,
        sameAs: ['https://note.com/himawasa_sync'],
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: `${SITE.url}/`,
        name: SITE.name,
        inLanguage: 'ja',
        publisher: { '@id': orgId },
        description: SITE.description,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE.url}/#service`,
        name: SITE.name,
        url: `${SITE.url}/`,
        image: SITE.ogImage,
        email: SITE.email,
        areaServed: { '@type': 'Country', name: 'Japan' },
        serviceType: [
          '介護施設のシフト表自動化',
          '病院の日計・カルテ転記',
          '士業の期日・請求自動化',
          'Excel業務の自動化',
          'GAS開発',
          'AI活用支援',
          'キーエンスRKシナリオ作成代行（補助）',
        ],
        audience: {
          '@type': 'Audience',
          audienceType: '介護施設、病院・医事課、士業事務所、中小企業',
        },
        provider: { '@id': orgId },
        description: SITE.description,
      },
      {
        '@type': 'Service',
        '@id': `${SITE.url}/#ai-era`,
        name: 'AI活用の伴走支援',
        url: `${SITE.url}/ai/`,
        provider: { '@id': orgId },
        serviceType: 'AI導入支援',
        description: `${AI_ERA.heading} ${AI_ERA.lead}`,
        audience: {
          '@type': 'Audience',
          audienceType: 'AIの使い方がわからない企業、既存システムの保守に困っている現場',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}/contact/#faq`,
        mainEntity: FAQS.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }
}

export function buildPageJsonLd(page) {
  if (!page || page.path === '/') return buildJsonLd()
  const url = `${SITE.url}${page.path}`
  const crumbName = page.crumb || page.h1
  const graph = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'トップ', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: crumbName, item: url },
      ],
    },
  ]

  if (page.key === 'services') {
    graph.push({
      '@type': 'CollectionPage',
      name: page.title,
      description: page.description,
      url,
      isPartOf: { '@id': `${SITE.url}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: SERVICE_ITEMS.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.name,
          description: s.desc,
        })),
      },
    })
  } else if (page.key === 'works') {
    graph.push({
      '@type': 'CollectionPage',
      name: page.title,
      description: page.description,
      url,
      isPartOf: { '@id': `${SITE.url}/#website` },
    })
  } else if (page.key === 'about') {
    graph.push({
      '@type': 'AboutPage',
      name: page.title,
      description: page.description,
      url,
      mainEntity: { '@id': `${SITE.url}/#founder` },
    })
    graph.push({
      '@type': 'Person',
      '@id': `${SITE.url}/#founder`,
      name: SITE.founder.name,
      jobTitle: SITE.founder.jobTitle,
      worksFor: { '@id': `${SITE.url}/#organization` },
      url,
      sameAs: ['https://note.com/himawasa_sync'],
    })
  } else if (page.key === 'ai') {
    graph.push({
      '@type': 'Service',
      name: 'AI活用の伴走支援',
      description: page.description,
      url,
      provider: { '@id': `${SITE.url}/#organization` },
      serviceType: ['AI導入支援', 'AIの使い方サポート', 'システムの保守'],
      audience: {
        '@type': 'Audience',
        audienceType: 'AIの使い方がわからない企業',
      },
    })
  } else if (page.key === 'try') {
    graph.push({
      '@type': 'CollectionPage',
      name: page.title,
      description: page.description,
      url,
      isPartOf: { '@id': `${SITE.url}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: TRY_APPS.map((app, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: app.name,
          description: app.desc,
          url: app.href,
        })),
      },
    })
  } else if (page.key === 'cardsync') {
    graph.push({
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: page.title,
      headline: page.h1,
      description: page.description,
      url,
      inLanguage: 'ja',
      isPartOf: { '@id': `${SITE.url}/#website` },
      primaryImageOfPage: page.ogImage
        ? { '@type': 'ImageObject', url: pageOgUrl(page), caption: page.ogImageAlt }
        : undefined,
    })
    graph.push({
      '@type': 'WebApplication',
      '@id': `${url}#app`,
      name: 'CardSync',
      description: page.description,
      url,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'IDカード発行',
      operatingSystem: 'ウェブブラウザ（Windows / macOS）',
      inLanguage: 'ja',
      browserRequirements: 'JavaScript が使えるブラウザ',
      publisher: { '@id': `${SITE.url}/#organization` },
      featureList: [
        'Excel（.xlsx）・CSV の名簿の取り込み（Shift_JIS 自動判別）',
        '顔写真の ZIP 一括取り込み（ファイル名で名簿と自動照合）',
        '顔写真の自動切り抜き（顔の位置と大きさを証明写真の型にそろえる）',
        '表裏のカードデザイン（文字・写真・バーコード・QRコード）',
        '和暦の日付・通し番号の自動採番',
        '実寸 85.6 × 54 mm・300dpi / 600dpi での印刷と PDF 保存',
        '再発行の履歴（理由つき）',
        '署名つき QR コード（スマートフォンで本物かを確認）',
      ],
      offers: {
        '@type': 'Offer',
        name: '体験版',
        price: '0',
        priceCurrency: 'JPY',
        description: '登録不要。作成したデータは24時間で自動消去されます。',
        url: CARDSYNC_TRIAL_URL || url,
      },
    })
    graph.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: '名簿から社員証を発行する手順',
      description: '名簿と顔写真から、社員証・来訪者証・立入許可証を発行するまでの3つの手順。',
      totalTime: 'PT10M',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'デザインを選ぶ', text: '3つの見本から選び、自社の社名やロゴ、テーマカラーを設定します。' },
        { '@type': 'HowToStep', position: 2, name: '名簿と写真を入れる', text: 'Excel の名簿と写真の ZIP を置きます。社員番号などのキーを指定すれば、名簿を更新しても重複して登録されません。' },
        { '@type': 'HowToStep', position: 3, name: '仕上がりを確認して発行する', text: '画面で1人ずつのプレビューを確認し、社内のプリンタまたは PDF 保存でまとめて発行します。' },
      ],
    })
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: CARDSYNC_FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
  } else if (page.key === 'rk' || page.key.startsWith('rk')) {
    const rk = RK_BY_PAGE[page.key]
    graph.push({
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: page.title,
      headline: page.h1,
      description: page.description,
      url,
      inLanguage: 'ja',
      isPartOf: { '@id': `${SITE.url}/#website` },
    })
    graph.push({
      '@type': 'Service',
      name: page.h1,
      description: page.description,
      url,
      provider: { '@id': `${SITE.url}/#organization` },
      serviceType: 'RKシリーズ シナリオ作成代行',
      areaServed: { '@type': 'Country', name: 'Japan' },
      audience: {
        '@type': 'Audience',
        audienceType: page.audience,
      },
      offers: [
        {
          '@type': 'Offer',
          name: '初回相談',
          price: '0',
          priceCurrency: 'JPY',
          description: '無料・30分。売り込みの電話はしません。',
          url: `${SITE.url}/contact/`,
        },
        {
          '@type': 'Offer',
          name: 'RKシナリオ作成代行',
          price: '10000',
          priceCurrency: 'JPY',
          description: 'キーエンスRKシリーズのシナリオ作成を代行。1万円から。ライセンスは含みません。',
          url: `${SITE.url}/rk/`,
        },
        {
          '@type': 'Offer',
          name: 'RK運用保守代行',
          price: '5000',
          priceCurrency: 'JPY',
          description: '月5,000円から。止まったら戻す。',
          url: `${SITE.url}/rk/`,
        },
      ],
    })
    if (rk?.faqs?.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: rk.faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      })
    }
  } else if (page.key === 'forPro' || page.key === 'forCare' || page.key === 'forBiz') {
    const industry = INDUSTRY_BY_PAGE[page.key]
    graph.push({
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: page.title,
      headline: page.h1,
      description: page.description,
      url,
      inLanguage: 'ja',
      isPartOf: { '@id': `${SITE.url}/#website` },
      primaryImageOfPage: page.ogImage
        ? { '@type': 'ImageObject', url: pageOgUrl(page), caption: page.ogImageAlt }
        : undefined,
    })
    graph.push({
      '@type': 'Service',
      name: page.h1,
      description: page.description,
      url,
      provider: { '@id': `${SITE.url}/#organization` },
      serviceType: page.crumb,
      areaServed: { '@type': 'Country', name: 'Japan' },
      audience: {
        '@type': 'Audience',
        audienceType: page.audience,
      },
      offers: {
        '@type': 'Offer',
        name: '初回相談',
        price: '0',
        priceCurrency: 'JPY',
        description: '無料・30分。売り込みの電話はしません。',
        url: `${SITE.url}/contact/`,
      },
    })
    if (industry?.faqs?.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: industry.faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      })
    }
  } else if (page.key === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      name: page.title,
      description: page.description,
      url,
    })
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: FAQS.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
  } else {
    graph.push({
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      url,
      isPartOf: { '@id': `${SITE.url}/#website` },
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
}

function navHtml() {
  return `<nav>
      <a href="/">トップ</a>
      <a href="/services/">サービス</a>
      <a href="/works/">実績</a>
      <a href="/about/">私たち</a>
      <a href="/ai/">AI時代の開発</a>
      <a href="/try/">無料体験</a>
      <a href="/contact/">お問い合わせ</a>
      <a href="/privacy/">プライバシー</a>
      <a href="/for/pro/">士業の方</a>
      <a href="/for/care/">介護・医療の方</a>
      <a href="/for/biz/">中小企業の方</a>
      <a href="/rk/">RKシナリオ作成代行</a>
      <a href="/rk/factory/">工場RK</a>
      <a href="/rk/hospital/">病院RK</a>
      <a href="/rk/care/">介護RK</a>
      <a href="/rk/pro/">士業RK</a>
      <a href="/rk/biz/">中小企業RK</a>
      <a href="/rk/click/">クリックRK</a>
      <a href="/kintone-dx/">kintone導入支援</a>
      <a href="/pro-dx/">士業DX</a>
      <a href="/shiftsync/">シフトシンク</a>
    </nav>`
}

function pageBodyHtml(page) {
  if (!page || page.key === 'home') {
    return `
    <h2>自分の現場を選んでください</h2>
    <p><a href="/for/pro/">士業事務所の方</a> — 期日管理・請求書自動化</p>
    <p><a href="/for/care/">介護施設・病院の方</a> — シフト表・日計・持ち物チェック</p>
    <p><a href="/shiftsync/">介護のシフト表自動化</a> / <a href="/medical-dx/">病院・医療機関のDX</a></p>
    <p><a href="/for/biz/">中小企業の方</a> — PDF→Excel・kintone</p>
    <p>例：シフト作成 5時間→3分。請求の一括 半日→0分。<a href="/works/">実績</a></p>
    <p>まずは触る：<a href="/mochisync/">MochiSync</a> / <a href="/pdfuse/">PDFuse</a> / <a href="/legosync/">LegoSync</a> / <a href="/try/">無料体験</a></p>
    <h2>RKシナリオ作成代行</h2>
    <p><a href="/rk/">RKシリーズ シナリオ作成代行</a> — キーエンスRK／RK-10の作成代行 1万円から</p>
    <p><a href="/rk/factory/">工場RK</a> / <a href="/rk/hospital/">病院RK</a> / <a href="/rk/care/">介護RK</a> / <a href="/rk/pro/">士業RK</a> / <a href="/rk/biz/">中小企業RK</a> / <a href="/rk/click/">クリックRK</a></p>
    <h2>${esc(AI_ERA.heading)}</h2>
    <p>${esc(AI_ERA.lead)}</p>`
  }
  if (page.key === 'services') {
    return SERVICE_ITEMS.map((s) => `<h2>${esc(s.name)}</h2><p>${esc(s.desc)}</p>`).join('')
  }
  if (page.key === 'ai') {
    return AI_ERA.points.map((p) => `<h2>${esc(p.title)}</h2><p>${esc(p.text)}</p>`).join('')
  }
  if (page.key === 'contact') {
    return FAQS.map(({ q, a }) => `<h2>${esc(q)}</h2><p>${esc(a)}</p>`).join('')
  }
  if (page.key === 'about') {
    return `<h2>事業概要</h2><p>屋号 ${esc(BUSINESS.tradeName)} / ${esc(BUSINESS.type)}</p><p>${esc(BUSINESS.work)}</p>`
  }
  if (page.key === 'works') {
    return `<p>現場45件以上。士業・介護・医療・中小企業。例：5時間の手作業が3分に。</p>`
  }
  if (page.key === 'rk' || page.key.startsWith('rk')) {
    const rk = RK_BY_PAGE[page.key]
    const whatHtml = rk?.whatTitle ? `<h2>${esc(rk.whatTitle)}</h2>${(rk.what || []).map((p) => `<p>${esc(p)}</p>`).join('')}` : ''
    const painHtml = (rk?.pains || []).map((p) => `<h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>`).join('')
    const solveHtml = (rk?.solve || []).map((p) => `<h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>`).join('')
    const jobHtml = (rk?.jobs || []).map((j) => `<p>${esc(j.when)} / ${esc(j.from)} / ${esc(j.do)}</p>`).join('')
    const askHtml = (rk?.ask || []).map((a) => `<p>${esc(a)}</p>`).join('')
    const featureHtml = (rk?.features || []).map((f) => `<h2>${esc(f.title)}</h2><p>${esc(f.text)} ${esc(f.result)}</p>`).join('')
    const faqHtml = (rk?.faqs || []).map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')
    return `${whatHtml}${painHtml}${solveHtml}${jobHtml}${featureHtml}${askHtml}<p>RKシナリオ作成代行 10,000円から。運用保守代行 5,000円から／月。</p>${faqHtml}`
  }
  if (page.key === 'forPro' || page.key === 'forCare' || page.key === 'forBiz') {
    const industry = INDUSTRY_BY_PAGE[page.key]
    const featureHtml = (industry.features || []).map((f) => `<h2>${esc(f.title)}</h2><p>${esc(f.text)} ${esc(f.result || '')}</p>`).join('')
    const citeHtml = industry.cite
      ? `<h2>${esc(industry.cite.title)}</h2>${industry.cite.facts.map((p) => `<p>${esc(p)}</p>`).join('')}`
      : ''
    const extraHtml = (industry.extra || []).map((f) => `<h2>${esc(f.title)}</h2><p>${esc(f.text)}</p>`).join('')
    const painHtml = (industry.pains || []).map((f) => `<h2>${esc(f.title)}</h2><p>${esc(f.text)}</p>`).join('')
    const faqHtml = (industry.faqs || []).map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')
    const linkHtml = (industry.links || []).map((l) => `<p><a href="${esc(l.href)}">${esc(l.title)}</a> — ${esc(l.desc)}</p>`).join('')
    return `${citeHtml}${featureHtml}${extraHtml}${painHtml}${linkHtml}${faqHtml}`
  }
  if (page.key === 'try') {
    return TRY_APPS.map((a) => `<h2>${esc(a.name)}</h2><p>${esc(a.desc)}</p><p><a href="${esc(a.href)}">試す</a></p>`).join('')
  }
  if (page.key === 'cardsync') {
    // 本文は画面側（React）で描くので、JS を動かさない相手向けに同じ中身の控えを出す。
    return [
      `<h2>できること</h2>`,
      `<p>Excel（.xlsx）や CSV の名簿をそのまま読み込めます。Shift_JIS も自動で判別し、和暦の日付や通し番号の自動採番にも対応します。</p>`,
      `<p>顔写真は「社員番号.jpg」のようにファイル名を付けて ZIP にまとめると、全員分が自動で配置されます。</p>`,
      `<p>実寸 85.6 × 54 mm・300dpi / 600dpi で、表裏の仕上がりを確認してから、社内のプリンタまたは PDF で発行できます。</p>`,
      `<h2>用途に合わせて選べる、3つの見本</h2>`,
      `<p>社員証・職員証／来訪者証／立入許可証。社名・配色・ロゴ・項目の位置は画面の上で調整できます。</p>`,
      CARDSYNC_TRIAL_URL ? `<p><a href="${esc(CARDSYNC_TRIAL_URL)}">登録不要で体験してみる（無料）</a></p>` : '',
      `<h2>よくあるご質問</h2>`,
      CARDSYNC_FAQS.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join(''),
    ].filter(Boolean).join('')
  }
  return ''
}

/** Vite が index.html / 下層HTML に差し込む head 一式 */
export function generateSeoHead(page = PAGES.home) {
  const title = page.title
  const description = page.description
  const og = page.og || page.description
  const url = `${SITE.url}${page.path}`
  const ogImage = pageOgUrl(page)
  const ogImageAlt = page.ogImageAlt || page.h1 || SITE.ogImageAlt
  const json = JSON.stringify(buildPageJsonLd(page))
  const robots = page.noindex
    ? (page.nofollow ? 'noindex,nofollow,noarchive,nosnippet' : 'noindex,follow')
    : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    page.keywords ? `<meta name="keywords" content="${esc(page.keywords)}" />` : '',
    `<meta name="author" content="${esc(SITE.name)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="googlebot" content="${page.noindex ? (page.nofollow ? 'noindex,nofollow,noarchive,nosnippet' : 'noindex,follow') : 'index,follow'}" />`,
    // 404 は実在するURLではないので canonical / hreflang を出さない
    page.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    page.noindex ? '' : `<link rel="alternate" hrefLang="ja" href="${url}" />`,
    page.noindex ? '' : `<link rel="alternate" hrefLang="x-default" href="${url}" />`,
    `<meta name="google-site-verification" content="${SITE.verification}" />`,
    `<meta name="theme-color" content="#FFFBF0" />`,
    `<meta name="color-scheme" content="light" />`,
    `<meta name="format-detection" content="telephone=no" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(og)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:alt" content="${esc(ogImageAlt)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(og)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<meta name="twitter:image:alt" content="${esc(ogImageAlt)}" />`,
    `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>🌻</text></svg>" />`,
    `<link rel="apple-touch-icon" href="${SITE.logo}" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
    `<link rel="alternate" type="text/plain" href="${SITE.url}/llms.txt" title="LLM向け概要" />`,
    `<link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Inter:wght@400;600;700;900&display=swap" />`,
    SITE.gaId ? `<link rel="preconnect" href="https://www.googletagmanager.com" />` : '',
    SITE.gaId ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(SITE.gaId)}"></script>` : '',
    SITE.gaId
      ? `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(SITE.gaId)}');</script>`
      : '',
    // 検索に出さないページ（noindex）では、構造化データも出さない。
    // React 側（components/Seo.jsx）と揃える。
    page.noindex ? '' : `<script type="application/ld+json">${json}</script>`,
  ].filter(Boolean).join('\n    ')
}

export function generateNoscript(page = PAGES.home) {
  return `
    <h1>${esc(page.h1 || page.title)}</h1>
    <p>${esc(page.description)}</p>
    ${navHtml()}
    ${pageBodyHtml(page)}
  `
}

/** ビルド後に下層ページ用の静的HTMLを書く（GH Pagesで正しいtitleを返す） */
export function extractAssetTags(html) {
  const scripts = [...html.matchAll(/<script type="module"[^>]*><\/script>/g)].map((m) => m[0])
  const css = [...html.matchAll(/<link rel="stylesheet"[^>]*href="\/assets\/[^"]+"[^>]*>/g)].map((m) => m[0])
  return [...css, ...scripts].join('\n    ')
}

export function generateRouteHtml(page, assetTags) {
  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${generateSeoHead(page)}
    ${assetTags}
  </head>
  <body>
    <div id="root"></div>
    <noscript>${generateNoscript(page)}</noscript>
  </body>
</html>
`
}
