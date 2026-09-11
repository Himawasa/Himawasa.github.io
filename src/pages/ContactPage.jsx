import Seo from '../components/Seo'
import PageHead from '../components/PageHead'
import { PAGES } from '../seo/site'
import Contact from './Home/sections/Contact'
import Faq from './Home/sections/Faq'

export default function ContactPage() {
  const p = PAGES.contact
  return (
    <>
      <Seo page={p} />
      <PageHead label="CONTACT" title={p.h1} desc={p.description} crumb={p.crumb} />
      <Contact />
      <Faq />
    </>
  )
}
