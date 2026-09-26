import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, mkdirSync, readFileSync, writeFileSync, realpathSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'
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

// サイトマップの更新日（lastmod）は、そのページのファイルを最後に git に記録した日にする。
// 手書きだと直し忘れて古いまま止まる（2026-09-26 のレビューで、ほぼ全ページが古かった）。
// 画面（React）のページは元のファイル、素の HTML のページは public/<住所>/index.html を見る。
const PAGE_SOURCES = {
  '/': 'src/pages/Home',
  '/services/': 'src/pages/ServicesPage.jsx',
  '/works/': 'src/pages/WorksPage.jsx',
  '/about/': 'src/pages/AboutPage.jsx',
  '/ai/': 'src/pages/AiPage.jsx',
  '/contact/': 'src/pages/ContactPage.jsx',
  '/try/': 'src/pages/TryPage.jsx',
  '/privacy/': 'src/pages/PrivacyPage.jsx',
  '/cardsync/': 'src/pages/CardSync',
}
function gitDate(rel) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', rel], { cwd: projectRoot, encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}
function lastmodOf(p) {
  let src = PAGE_SOURCES[p.path]
  if (!src && p.path.startsWith('/for/')) src = 'src/pages/for'
  if (!src && p.path.startsWith('/rk/')) src = 'src/pages/rk'
  if (!src) {
    const html = join('public', p.path, 'index.html')
    if (existsSync(join(projectRoot, html))) src = html
  }
  // git が使えないときや記録が無いときは、PUBLIC_PAGES の手書きの日付
  return (src && gitDate(src)) || p.lastmod
}

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
        writeFileSync(join(dist, 'sitemap.xml'), generateSitemapXml(lastmodOf))
        writeFileSync(join(dist, 'llms.txt'), generateLlmsTxt())
        writeFileSync(join(dist, 'llms-full.txt'), generateLlmsFullTxt())

        const built = readFileSync(indexPath, 'utf8')
        const assets = extractAssetTags(built)

        // GH Pages が未知のURLに返すページ。ホームのtitle/canonicalを名乗らせない
        writeFileSync(join(dist, '404.html'), generateRouteHtml(PAGES.notFound, assets))
        for (const key of [
          'services', 'works', 'about', 'ai', 'contact', 'try', 'privacy', 'supply', 'card', 'cardsync',
          'forPro', 'forCare', 'forBiz', 'forFactory',
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
