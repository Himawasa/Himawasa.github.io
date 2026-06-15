import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, writeFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      // GitHub Pages SPA 対策：dist/index.html を dist/404.html にコピー
      name: 'copy-404',
      closeBundle() {
        copyFileSync('dist/index.html', 'dist/404.html')
        // gh-pages ブランチのホワイトリスト .gitignore を上書きする
        // これがないと assets/ フォルダが GitHub Pages で 404 になる
        writeFileSync('dist/.gitignore', '# React build output\n# all files are intentionally public\n')
      }
    }
  ],
})
