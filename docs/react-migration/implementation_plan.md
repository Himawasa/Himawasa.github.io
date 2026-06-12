# HiMaWaSa Sync — React 移行 確定計画書 v4.2（段階移行・案B）

**採用方針：案B（段階移行）**
まずトップページだけをリッチな React に。LP は公開を止めずそのまま静的維持。

## スコープ

| 対象 | 方針 |
|------|------|
| /（トップページ） | React 化・デザイン強化 |
| LP 7本（kintone-dx 等） | 静的 HTML のまま public/ 配置。第2弾以降で移行 |
| /mochisync/ /pdfuse/ | GAS リダイレクト専用。静的 HTML そのまま |
| /ninyou/ | 任用試験。静的 HTML そのまま |
| /proposal/ | Phase 0 で GitHub から削除済み（2026-06-13） |

## Git 正本

作業：C:\dev\himawasa-react\（GitHub clone・npm install はここのみ）
Q:\マイドライブ\IWAKI開発\HiMaWaSa-Sync-3007\ = 参照用ミラー（npm install 禁止）

## 技術スタック

React 18 + Vite / React Router v6 / Framer Motion / react-helmet-async / gh-pages

## Phase 0 完了（2026-06-13）

- proposal/ を _backup/ に退避（5ファイル）
- .gitignore から !proposal/ 行を削除
- git rm --cached -r proposal/ -> commit -> push
- himawasa-sync.com/proposal/ が 404 を確認
- environment.md に C:\ 作業例外を追記

## Phase 1 以降（未着手）

Phase 1: legacy-static ブランチ作成 -> C:\ clone -> Vite 初期化 -> npm run dev
Phase 2: 共通基盤（Navbar / Footer / App.jsx）
Phase 3: トップページ 13セクション実装
Phase 4: public/ に LP・リダイレクト・ninyou を配置
Phase 5: npm run deploy -> GitHub Pages 設定 -> 本番確認

v4.2: 2026-06-13 作成
