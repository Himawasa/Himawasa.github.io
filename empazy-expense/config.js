/**
 * EMPAZY 経費撮影 PWA 設定
 * Client ID は公開アプリ用（秘密鍵ではない）。
 * mode: "prod" = Microsoft ログインして SharePoint に保存（既定）
 *       "demo" = 操作確認のみ（保存しない）。URL に ?mode=demo を付けても入れる
 *
 * 保存先（SharePoint のサイト・フォルダ）はここに書かない。
 * 利用者が画面で選び、そのスマホの中（localStorage）にだけ記録する。
 */
window.EMPAZY_CONFIG = {
  mode: "prod",
  msalClientId: "13e2bde2-4212-490a-a308-f9ae0d472b51",
  redirectUri: "https://himawasa-sync.com/empazy-expense/",

  // ページに入る前の ID とパスワード（会社で1組）。パスワードそのものは書かない。
  // hash は「ID + 改行 + パスワード」（どちらも小文字）を PBKDF2-SHA256 で変換した値。
  // 変えるときは、同じ方法で hash を作り直す（覚えていた記録は自動で無効になる）。
  gate: {
    salt: "empazy-gate-f1d2438bf8f140caee2df647",
    iterations: 150000,
    hash: "0f2842897aa63e7260467bf38160a9c8ca545d9249d9b826733b5ae2ff8e46e1",
    days: 30,
  },
};
