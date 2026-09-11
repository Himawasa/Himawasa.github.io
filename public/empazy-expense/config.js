/**
 * EMPAZY 経費撮影 PWA 設定
 * Client ID は公開アプリ用（秘密鍵ではない）。空のときはデモ動作。
 */
window.EMPAZY_CONFIG = {
  mode: "demo",
  msalClientId: "13e2bde2-4212-490a-a308-f9ae0d472b51",
  redirectUri: "https://himawasa-sync.com/empazy-expense/",
  sharePointHostname: "",
  sharePointSitePath: "",
  folderPath: "経費レシート",
};
