import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, mkdirSync, readFileSync, writeFileSync, realpathSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import {
  PAGES,
  generateSeoHead,
  generateNoscript,
  generateSitemapXml,
  generateLlmsTxt,
  generateLlmsFullTxt,
  extractAssetTags,
  generateRouteHtml,
} from './src/seo/site.js'

/** つなぎ経由でも実体パスで揃える（Windows junction 対策） */
const projectRoot = realpathSync(dirname(fileURLToPath(import.meta.url)))
let outDirAbs = ''

export default defineConfig({
  root: projectRoot,
  base: '/',
  plugins: [
    react(),
    {
      name: 'public-dir-index',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const raw = req.url?.split('?')[0] || ''
          if (!raw.endsWith('/') || raw === '/') return next()
          const rel = raw.replace(/^\/+|\/+$/g, '')
          if (!rel || rel.includes('..')) return next()
          const file = join(projectRoot, 'public', rel, 'index.html')
          if (!existsSync(file)) return next()
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(readFileSync(file))
        })
      },
    },
    {
      name: 'inject-seo',
      transformIndexHtml(html) {
        return html
          .replace('<!--seo-head-->', generateSeoHead(PAGES.home))
          .replace('<!--seo-noscript-->', generateNoscript(PAGES.home))
      },
    },
    {
      name: 'copy-404-and-routes',
      configResolved(config) {
        outDirAbs = resolve(config.root, config.build.outDir)
      },
      // closeBundle だと Vite 8 で index.html 未書き込みのことがある
      writeBundle() {
        const dist = outDirAbs || resolve(projectRoot, 'dist')
        const indexPath = join(dist, 'index.html')
        if (!existsSync(indexPath)) {
          throw new Error(`SEO 後処理: ${indexPath} がまだ無い。Vite の出力先を確認してください。`)
        }
        writeFileSync(join(dist, '.gitignore'), '# React build output\n# all files are intentionally public\n')
        writeFileSync(join(dist, 'sitemap.xml'), generateSitemapXml())
        writeFileSync(join(dist, 'llms.txt'), generateLlmsTxt())
        writeFileSync(join(dist, 'llms-full.txt'), generateLlmsFullTxt())

        const built = readFileSync(indexPath, 'utf8')
        const assets = extractAssetTags(built)

        // GH Pages が未知のURLに返すページ。ホームのtitle/canonicalを名乗らせない
        writeFileSync(join(dist, '404.html'), generateRouteHtml(PAGES.notFound, assets))
        for (const key of [
          'services', 'works', 'about', 'ai', 'contact', 'try', 'privacy', 'supply', 'card',
          'forPro', 'forCare', 'forBiz',
          'rk', 'rkFactory', 'rkHospital', 'rkCare', 'rkPro', 'rkBiz', 'rkClick',
        ]) {
          const page = PAGES[key]
          const dir = join(dist, page.path.replace(/^\//, ''))
          mkdirSync(dir, { recursive: true })
          writeFileSync(join(dir, 'index.html'), generateRouteHtml(page, assets))
        }
      },
    },
  ],
})
