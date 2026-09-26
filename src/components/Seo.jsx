import { Helmet } from 'react-helmet-async'
import { SITE, PAGES, buildPageJsonLd } from '../seo/site'

/**
 * ページごとの title / canonical / OGP / JSON-LD
 */
export default function Seo({ page = PAGES.home }) {
  const title = page.title
  const description = page.description
  const og = page.og || page.description
  const url = `${SITE.url}${page.path}`
  const jsonLd = buildPageJsonLd(page)
  const ogImage = page.ogImage
    ? (page.ogImage.startsWith('http') ? page.ogImage : `${SITE.url}${page.ogImage}`)
    : SITE.ogImage
  const ogImageAlt = page.ogImageAlt || page.h1 || SITE.ogImageAlt

  return (
    <Helmet>
      <html lang="ja" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {page.keywords && <meta name="keywords" content={page.keywords} />}
      <meta name="author" content={SITE.name} />
      <meta
        name="robots"
        content={
          page.noindex
            ? (page.nofollow ? 'noindex,nofollow,noarchive,nosnippet' : 'noindex,follow')
            : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
        }
      />
      {!page.noindex && <link rel="canonical" href={url} />}
      {!page.noindex && <link rel="alternate" hrefLang="ja" href={url} />}
      {!page.noindex && <link rel="alternate" hrefLang="x-default" href={url} />}
      <link rel="alternate" type="text/plain" href={`${SITE.url}/llms.txt`} title="LLM向け概要" />
      <meta name="google-site-verification" content={SITE.verification} />
      <meta name="theme-color" content="#FFFBF0" />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={og} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      {/* 大きさは既定の画像（ogp.png＝1200×630）のときだけ。ページ別の画像は大きさが違う */}
      {!page.ogImage && <meta property="og:image:width" content="1200" />}
      {!page.ogImage && <meta property="og:image:height" content="630" />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={og} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      {!page.noindex && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
