import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, mkdirSync, readFileSync, writeFileSync, realpathSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execFileSync } from 'child_process'
import { heroStaticHtml } from './src/pages/Home/sections/heroText.js'
import {
  staticLinksHtml,
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

/** 移転したページの置き換え（すぐに移転先へ移る。正規の住所も移転先にする） */
// what は移転したもの、label は移転先のページの名前（カード発行・RK で共通に使う。React 側の MovedAway と同じ文面）
function movedHtml(to, what, label) {
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${what}は移転いたしました</title>
<link rel="canonical" href="${to}" />
<meta http-equiv="refresh" content="0; url=${to}" />
<script>location.replace(${JSON.stringify(to)})</script>
</head>
<body>
<p>${what}は、移転いたしました。自動で切り替わらない場合は、<a href="${to}">移転先のページ（${label}）</a>へお進みください。</p>
</body>
</html>
`
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
          // トップ画面の文字を JavaScript より先に出す（表示速度のため。React が起動すると同じ内容に置き換わる）
          .replace('<div id="root"></div>', `<div id="root">${heroStaticHtml()}${staticLinksHtml('/')}</div>`)
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
          'services', 'works', 'about', 'ai', 'contact', 'try', 'privacy', 'supply',
          'forPro', 'forCare', 'forBiz', 'forFactory',
        ]) {
          const page = PAGES[key]
          const dir = join(dist, page.path.replace(/^\//, ''))
          mkdirSync(dir, { recursive: true })
          writeFileSync(join(dir, 'index.html'), generateRouteHtml(page, assets))
        }
        // カード発行は 2026-10-26 に別の事業へ移管した。GitHub Pages は恒久的な転送を出せないため、
        // 正規の住所を移転先にし、すぐに移るページを置く（検索エンジンは転送と同じように扱う）
        for (const dirName of ['card', 'cardsync']) {
          const dir = join(dist, dirName)
          mkdirSync(dir, { recursive: true })
          writeFileSync(join(dir, 'index.html'), movedHtml('https://digisapo-dx.com/idcard/', '社員証・来訪者証の発行（旧 CardSync）', 'IDカードかんたん発行'))
        }
        // RK のシナリオ作成代行も 2026-10-29 に別の事業へ移管した。業種別の6ページも、移転先の1ページへまとめる
        for (const dirName of ['rk', 'rk/factory', 'rk/hospital', 'rk/care', 'rk/pro', 'rk/biz', 'rk/click']) {
          const dir = join(dist, dirName)
          mkdirSync(dir, { recursive: true })
          writeFileSync(join(dir, 'index.html'), movedHtml('https://digisapo-dx.com/rk/', 'RK のシナリオ作成代行', 'RPA作成代行'))
        }
        // 病院の DX（10選）と介護施設の改善一覧も 2026-10-31 に別の事業へ移管した（てますい の仕分け当番・持ち物当番）
        mkdirSync(join(dist, 'medical-dx'), { recursive: true })
        writeFileSync(join(dist, 'medical-dx', 'index.html'), movedHtml('https://digisapo-dx.com/temasui/shiwake/', '病院・医療機関の DX（FAX・書類の仕分け）', 'てますい 仕分け当番'))
        mkdirSync(join(dist, 'Guide', 'care'), { recursive: true })
        writeFileSync(join(dist, 'Guide', 'care', 'index.html'), movedHtml('https://digisapo-dx.com/mochimono/', '介護施設で改善できること（持ち物チェックほか）', 'てますい 持ち物当番'))
        // シフト表の自動化（ShiftSync）と kintone の導入・見直しも 2026-10-31 に別の事業へ移管した（段階3）
        mkdirSync(join(dist, 'shiftsync'), { recursive: true })
        writeFileSync(join(dist, 'shiftsync', 'index.html'), movedHtml('https://digisapo-dx.com/temasui/shift/', 'シフト表の自動作成（ShiftSync）', 'てますい シフト当番'))
        mkdirSync(join(dist, 'kintone-dx'), { recursive: true })
        writeFileSync(join(dist, 'kintone-dx', 'index.html'), movedHtml('https://digisapo-dx.com/kintone/', 'kintone の導入・見直しと自動化', 'kintone の導入・見直し'))
      },
    },
  ],
})
