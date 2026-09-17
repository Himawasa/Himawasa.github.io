/**
 * EMPAZY 経費撮影 PWA 設定
 * Client ID は公開アプリ用（秘密鍵ではない）。
 * mode: "demo" = 操作確認のみ（保存しない） / "prod" = SharePoint に保存
 *
 * 保存先（SharePoint のサイト・フォルダ）はここに書かない。
 * 利用者が画面で選び、そのスマホの中（localStorage）にだけ記録する。
 */
window.EMPAZY_CONFIG = {
  mode: "demo",
  msalClientId: "13e2bde2-4212-490a-a308-f9ae0d472b51",
  redirectUri: "https://himawasa-sync.com/empazy-expense/",
};
