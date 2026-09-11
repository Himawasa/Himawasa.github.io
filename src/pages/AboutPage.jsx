import Seo from '../components/Seo'
import PageHead from '../components/PageHead'
import ForJump from '../components/ForJump'
import { PAGES } from '../seo/site'
import BusinessOverview from './Home/sections/BusinessOverview'
import BrandStory from './Home/sections/BrandStory'
import Values from './Home/sections/Values'
import About from './Home/sections/About'

export default function AboutPage() {
  const p = PAGES.about
  return (
    <>
      <Seo page={p} />
      <PageHead
        label="ABOUT"
        title={p.h1}
        desc={
          <>
            個人事業 HiMaWaSa Syncです。IT業界25年、カスタマーサクセスの現場を長く経験してきました。
            <br />
            士業・介護・病院・中小企業の現場に残る手作業を、今のやり方のまま自動化します。RKは入っている現場の補助です。
          </>
        }
        crumb={p.crumb}
      />
      <ForJump title="現場ごとの案内" />
      <BusinessOverview />
      <BrandStory />
      <Values />
      <About />
    </>
  )
}
