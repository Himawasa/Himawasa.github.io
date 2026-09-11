import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHead from '../components/PageHead'
import ForJump from '../components/ForJump'
import { PAGES } from '../seo/site'
import Services from './Home/sections/Services'
import Pricing from './Home/sections/Pricing'
import LpGallery from './Home/sections/LpGallery'
import TrustSafe from './Home/sections/TrustSafe'
import './rk/Rk.css'

export default function ServicesPage() {
  const p = PAGES.services
  return (
    <>
      <Seo page={p} />
      <PageHead
        label="SERVICES"
        title={p.h1}
        desc={
          <>
            介護のシフト、病院の日計、士業の請求。今のExcelのまま始めます。
            <br />
            キーエンスRKは、入っている現場の補助です。
          </>
        }
        crumb={p.crumb}
      />
      <ForJump title="先に、現場から見る" />
      <section className="services-rk">
        <div className="container">
          <Link to="/for/care" className="services-rk-card">
            <img src="/dm/dm-cover.jpg" alt="" width="440" height="280" />
            <div>
              <h2>介護施設・病院の自動化</h2>
              <p>シフト表、持ち物、日計・カルテの転記。今のExcelと勤怠ソフトのまま。RKは、入っている現場だけ補助します。</p>
              <span>介護・病院の案内を見る →</span>
            </div>
          </Link>
          <Link to="/rk" className="services-rk-card">
            <img src="/dm/dm-smb-cover.jpg" alt="" width="440" height="280" />
            <div>
              <h2>RKシナリオ作成代行</h2>
              <p>キーエンス製RPA「RKシリーズ」「RK-10」のシナリオ作成を代行します。導入済みで活用できていない現場へ。工場・病院・介護・士業ごとに、覚える操作を分けています。</p>
              <span>RKシリーズの代行を見る →</span>
            </div>
          </Link>
        </div>
      </section>
      <Services />
      <Pricing />
      <LpGallery />
      <TrustSafe />
    </>
  )
}
