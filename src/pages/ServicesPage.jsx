import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHead from '../components/PageHead'
import ForJump from '../components/ForJump'
import { PAGES } from '../seo/site'
import Services from './Home/sections/Services'
import Pricing from './Home/sections/Pricing'
import LpGallery from './Home/sections/LpGallery'
import TrustSafe from './Home/sections/TrustSafe'
import { TemasuiPricing } from './Home/sections/TemasuiSections'
import './Home/TemasuiHome.css'
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
            介護のシフト管理、病院の日計、士業の請求業務など、今お使いのExcelややり方のまま小さく始められます。
            <br />
            キーエンスRKを導入済みの現場でのシナリオ作成代行・保守も承っています。
          </>
        }
        crumb={p.crumb}
      />
      {/* 2026-10-04 トップの「サービスと料金を見る」から来た人に、まず てますい の料金を見せる */}
      <TemasuiPricing id="temasui-pricing" title="てますい（書く手間を減らすアシスタント）の料金（税別）" />
      <ForJump title="現場ごとの案内" />
      <section className="services-rk">
        <div className="container">
          <Link to="/for/care" className="services-rk-card">
            <img src="/dm/dm-cover.jpg" alt="" width="440" height="280" />
            <div>
              <h2>介護施設・病院の自動化</h2>
              <p>シフト表、持ち物チェック、日計・カルテの転記など、現場に残る毎月の手作業を今のExcelと勤怠ソフトのまま自動化します。</p>
              <span>介護・病院の案内を見る →</span>
            </div>
          </Link>
          <Link to="/rk" className="services-rk-card">
            <img src="/dm/dm-smb-cover.jpg" alt="" width="440" height="280" />
            <div>
              <h2>RKシナリオ作成代行</h2>
              <p>キーエンス製RPA「RKシリーズ」「RK-10」のシナリオ作成を代行します。「導入したものの多忙でシナリオを作れない」現場をお手伝いします。</p>
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
