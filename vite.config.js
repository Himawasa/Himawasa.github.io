import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
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

export default defineConfig({
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
          const file = join(process.cwd(), 'public', rel, 'index.html')
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
      closeBundle() {
        writeFileSync('dist/.gitignore', '# React build output\n# all files are intentionally public\n')
        writeFileSync('dist/sitemap.xml', generateSitemapXml())
        writeFileSync('dist/llms.txt', generateLlmsTxt())
        writeFileSync('dist/llms-full.txt', generateLlmsFullTxt())

        const built = readFileSync('dist/index.html', 'utf8')
        const assets = extractAssetTags(built)

        // GH Pages が未知のURLに返すページ。ホームのtitle/canonicalを名乗らせない
        writeFileSync('dist/404.html', generateRouteHtml(PAGES.notFound, assets))
        for (const key of [
          'services', 'works', 'about', 'ai', 'contact', 'try', 'privacy', 'supply',
          'forPro', 'forCare', 'forBiz',
          'rk', 'rkFactory', 'rkHospital', 'rkCare', 'rkPro', 'rkBiz', 'rkClick',
        ]) {
          const page = PAGES[key]
          const dir = `dist${page.path}`
          mkdirSync(dir, { recursive: true })
          writeFileSync(`${dir}index.html`, generateRouteHtml(page, assets))
        }
      },
    },
  ],
})
