# 経費撮影 PWA サンプル

公開URL（デプロイ後）: https://himawasa-sync.com/empazy-expense/

## 置き場所

`C:\dev\himawasa-react\public\empazy-expense\`

Vite ビルド時に `dist/empazy-expense/` へコピーされ、GitHub Pages 本番へ出ます。

## デプロイ手順

```powershell
cd C:\dev\himawasa-react
npm run deploy
```

## サンプルでできること

- 支払区分の選択（大きいボタン）
- スマホカメラで撮影
- プレビュー・メモ
- ブラウザ内へのデモ保存（localStorage）
- PWA（ホーム画面に追加）

## 本番で追加するもの

- Microsoft ログイン（MSAL）
- SharePoint へのアップロード（Graph API）
- 管理アプリ（Windows）との連携

## 注意

- `noindex` 設定済み（検索には出さない想定）
- カード番号のマスキングは行わない（電帳法の観点）
