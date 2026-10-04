import Seo from '../../components/Seo'
import { PAGES } from '../../seo/site'
import TemasuiHero from './sections/TemasuiHero'
import { TemasuiVersions, TemasuiStrengths, TemasuiPricing, ConsultBand, TemasuiSafety, TemasuiFinalCta } from './sections/TemasuiSections'
import TryTeaser from './sections/TryTeaser'
import FloatingCta from './sections/FloatingCta'
import './TemasuiHome.css'

// 2026-10-04 トップを「てますい」1本の話に作り直した（下書き：HiMaWaSa-Sync-3007/docs/seo/トップ作り直し_下書き_20261004.html）。
// 前のトップの部品（Hero・HomeProof・AudiencePaths・TemasuiBand・Flow）はファイルとして残してある（ここでは使っていない）
export default function Home() {
  return (
    <>
      <Seo page={PAGES.home} />
      <TemasuiHero />
      <TemasuiVersions />
      <TemasuiStrengths />
      <TemasuiPricing />
      <ConsultBand />
      <TryTeaser />
      <TemasuiSafety />
      <TemasuiFinalCta />
      <FloatingCta />
    </>
  )
}
