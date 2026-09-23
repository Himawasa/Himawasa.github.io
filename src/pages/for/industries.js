export const INDUSTRIES = {
  pro: {
    pageKey: 'forPro',
    tone: 'pro',
    label: 'FOR PROFESSIONALS',
    who: '士業事務所のみなさまへ',
    promise: '顧客台帳・期日の確認・請求とFAX整理',
    close: '今のPCのまま、ひとつずつ軽くします。',
    heroImage: '/dm/dm-pro-cover.jpg',
    heroAlt: '士業事務所。顧客台帳・期日・請求など残る手作業を軽くする案内',
    features: [
      {
        num: '01　顧客ごとに',
        title: '顧客台帳',
        text: '連絡先・履歴・書類を、一画面にまとめます。',
        result: '「どこにあった？」を減らす。',
        image: '/dm/dm-pro-client.jpg',
        imageAlt: '士業事務所の顧客台帳。連絡先と履歴を一画面にまとめる',
      },
      {
        num: '02　届出・申請',
        title: '期日のお知らせ',
        text: '期限の数日前から、自動で通知します。',
        result: 'うっかり忘れを防ぎます。',
        image: '/dm/dm-pro-deadline.jpg',
        imageAlt: '届出・申請の期日を数日前から知らせる画面',
      },
      {
        num: '03　毎月・毎日',
        title: '請求・FAX整理',
        text: '請求書づくりと、届いた書類の振り分け。',
        result: '手入力と紙探しを減らす。',
        image: '/dm/dm-pro-docs.jpg',
        imageAlt: '請求書作成とFAX・届いた書類の整理',
      },
    ],
    links: [
      { href: '/rk/pro/', title: '士業RK', desc: 'キーエンスRKで台帳・期日・請求。シナリオ1万円から。', cta: '士業RKの案内を見る' },
      { href: '/pro-dx/', title: '士業DXの提案', desc: '帳票・給与・契約まわりを、今のPCのまま。', cta: '士業DXの提案を見る' },
      { href: '/sharoushi-portal/', title: '社労士ポータル', desc: '事務所と顧問先をつなぐ、13の画面。', cta: '社労士ポータルを見る' },
    ],
    faqs: [
      {
        q: '社労士・税理士の今のExcelのまま始められますか？',
        a: '始められます。様式を作り直すより、今の顧客台帳・請求のファイルに合わせます。実際に動くかどうかは、初回相談の際に画面を見ながら一緒に確認できます。',
      },
      {
        q: '期日通知は、何日前に来ますか？',
        a: '7日前・3日前・当日を基本にします。事務所のやり方に合わせて変えられます。',
      },
      {
        q: '顧問先の名前はサイトに出ますか？',
        a: '出しません。掲載は許可をいただいた範囲だけです。相談の内容も、許可なく第三者に渡しません。',
      },
    ],
  },
  care: {
    pageKey: 'forCare',
    tone: 'care',
    label: 'FOR CARE & HOSPITAL',
    who: '介護施設・病院のみなさまへ',
    promise: 'シフト・持ち物・日計とカルテの転記',
    close: '毎月の手間を、ひとつずつ軽くします。RKは、入っている現場の補助です。',
    cite: {
      title: 'ひとことで言うと',
      facts: [
        'HiMaWaSa Syncは、介護施設のシフト表と病院の日計転記を、今のExcelのまま自動化する個人事業です。',
        'シフトはKING OF TIMEなどの勤怠データから、施設指定の様式へ載せます。病院は、人が画面やCSVで出している範囲だけを転記します。金額の確定は人のままです。',
        '初回相談は無料・30分。売り込みの電話はしません。キーエンスRKは必須ではありません。入っている現場だけ、シナリオ作成を補助します。',
      ],
    },
    heroImage: '/dm/dm-cover.jpg',
    heroAlt: '介護施設と病院の現場。シフト、持ち物、日計など残る手作業を軽くする案内',
    features: [
      {
        num: '01　入所のとき',
        title: '持ち物チェック',
        text: '写真から、必要なものを一覧に。',
        result: '紙の目視確認を、もっと軽く。',
        image: '/dm/dm-mochi.jpg',
        imageAlt: '入所時の持ち物を写真から一覧にするチェック作業',
        href: '/Guide/mochisync2/',
        hrefLabel: '持ち物チェックの説明を見る',
      },
      {
        num: '02　毎月',
        title: 'シフト表づくり',
        text: '勤怠データを、指定のExcel様式へ。',
        result: '手入力の残業を減らします。',
        image: '/dm/dm-shift.jpg',
        imageAlt: '介護施設のシフト表をExcel様式へ自動で作る作業',
        href: '/shiftsync/',
        hrefLabel: 'シフト表自動化を見る',
      },
      {
        num: '03　毎日の現場',
        title: '施設のカレンダー',
        text: '予定・往診・残薬を、一つの画面に。',
        result: '「言った・聞いていない」を減らす。',
        image: '/dm/dm-calendar.jpg',
        imageAlt: '施設全体の予定・往診・残薬を一画面で見るカレンダー',
        href: '/Guide/caresync/',
        hrefLabel: '施設カレンダーの説明を見る',
      },
    ],
    extraTitle: '病院・医事課に、まだ残っている作業',
    extra: [
      { title: '日計・収入の転記', text: '電子カルテや医事ソフトから出した数字を、指定の日計Excelへ。確認は人のままです。' },
      { title: '夜間のCSV抜き出し', text: 'カルテが空く時間に統計を取り、翌朝のたたき台を置いておく。' },
      { title: '複数拠点のExcel統合', text: '病院ごと・科ごとの野良ファイルを、本部の1枚へ。' },
    ],
    links: [
      { href: '/temasui/', title: 'てますい（介護施設のアシスタント）', desc: '書類の下書き（話すだけでも）・持ち物チェック・予定カレンダーを1つの画面で。1か月無料。', cta: 'てますいを見る' },
      { href: '/Guide/care/', title: '施設で改善できること', desc: '持ち物・シフト・予定・常勤換算・チラシなど、一覧で見る。', cta: '施設で改善できること一覧を見る' },
      { href: '/shiftsync/', title: '介護のシフト表自動化', desc: 'KING OF TIMEの実績から、今の勤務表様式へ。', cta: '介護のシフト表自動化を見る' },
      { href: '/medical-dx/', title: '病院・医療機関のDX', desc: 'FAX、カルテ、日計、画像。現場で動かしてきた道具。', cta: '病院・医療機関のDXを見る' },
      { href: '/rk/care/', title: 'RKが入っている施設は', desc: '補助です。勤怠→シフトのシナリオ作成だけ。', cta: '介護RK（補助）の案内を見る' },
      { href: '/cardsync/', title: '職員証・面会証をご自分で', desc: '名簿と顔写真から、職員証や面会証をその場で発行。登録なしで試せます。', cta: 'CardSync を見る' },
    ],
    faqs: [
      {
        q: 'KING OF TIMEのデータを、今のシフト表のまま使えますか？',
        a: '使えます。画面を見ながらの手入力をやめて、指定のExcel様式へ自動で載せます。例として、5時間かかっていた作業が3分になった現場があります。',
      },
      {
        q: '病院の日計やカルテの転記も頼めますか？',
        a: '頼めます。人が今、画面やCSVで出している範囲だけです。金額の確定は医事の人のままです。詳しくは医療機関向けの事例もご覧ください。',
      },
      {
        q: '現場の職員でも使えますか？',
        a: '使えます。難しい画面は作りません。初日のレクチャーも含みます。',
      },
      {
        q: '実地指導の記録にも使えますか？',
        a: '今ある記録を、必要な形で出しやすくします。記録の作り方を施設に押し付けることはしません。',
      },
      {
        q: 'キーエンスRKも必要ですか？',
        a: '必須ではありません。今のExcelと勤怠ソフトのままで足りることが多いです。RKが入っている現場だけ、シナリオ作成を補助で受けます。',
      },
    ],
  },
  biz: {
    pageKey: 'forBiz',
    tone: 'biz',
    label: 'FOR BUSINESS',
    who: '中小企業のみなさまへ',
    promise: '帳票の転記・Excelの整理・繰り返し作業',
    close: '小さく始めて、ひとつずつ軽くします。',
    heroImage: '/dm/dm-smb-cover.jpg',
    heroAlt: '中小企業の事務所。帳票の転記やExcelの整理など、毎日残る手作業の案内',
    features: [
      {
        num: '01　毎日',
        title: '帳票の手入力',
        text: 'PDFや紙の表を、Excelへ自動で変換。',
        result: '転記ミスと残業を減らします。',
        image: '/dm/dm-smb-pdf.jpg',
        imageAlt: 'PDFの帳票をExcelへ変換して転記する作業',
      },
      {
        num: '02　チームで',
        title: '業務データの整理',
        text: 'バラバラなExcel・メールを、kintoneで一元管理。',
        result: '「どれが最新？」がなくなります。',
        image: '/dm/dm-smb-kintone.jpg',
        imageAlt: '散らばったExcelをkintoneでまとめて業務を整理する様子',
      },
      {
        num: '03　定番の作業',
        title: '繰り返しの自動化',
        text: '集計・メール・帳票づくりを、GASとAIで仕組み化。',
        result: '担当者が変わっても回ります。',
        image: '/dm/dm-smb-auto.jpg',
        imageAlt: '集計やメールなど繰り返し作業をGASとAIで自動化する様子',
      },
    ],
    links: [
      { href: '/rk/biz/', title: '中小企業RK', desc: 'キーエンスRKで帳票転記とExcel整理。工場RKも。', cta: '中小企業RKの案内を見る' },
      { href: '/kintone-dx/', title: 'kintone導入支援', desc: '業務をkintoneでまとめ、コピペを減らす。', cta: 'kintone導入支援を見る' },
      { href: '/yoom-lp/', title: 'Yoom導入・保守', desc: '設定から月額の運用まで。', cta: 'Yoom導入・保守を見る' },
      { href: '/cardsync/', title: '社員証・来訪者証の社内発行', desc: 'Excel の名簿から、社員証や来訪者証をその場で。登録なしで試せます。', cta: 'CardSync を見る' },
    ],
    faqs: [
      {
        q: '今のExcelを捨てて、新しいソフトに乗り換えますか？',
        a: '乗り換えが目的ではありません。今の帳票とExcelを活かして、転記と確認だけを短くします。',
      },
      {
        q: 'PDFをExcelにするだけでも頼めますか？',
        a: '頼めます。小さく一つから始められます。合わなければ縮小できます。',
      },
      {
        q: 'kintoneをまだ使っていなくても相談できますか？',
        a: 'できます。使うかどうかは、今の仕事を見てから決めます。専門用語やツールの名前は知らなくて大丈夫です。',
      },
    ],
  },
}

export const INDUSTRY_NAV = [
  { to: '/for/pro', label: '士業の方' },
  { to: '/for/care', label: '介護・医療の方' },
  { to: '/for/biz', label: '中小企業の方' },
]

export const INDUSTRY_BY_PAGE = {
  forPro: INDUSTRIES.pro,
  forCare: INDUSTRIES.care,
  forBiz: INDUSTRIES.biz,
}
