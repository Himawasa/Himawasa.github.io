import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

const hlItems = [
  { icon: '👔', title: 'IT業界25年・マネジメント経験', text: 'カスタマーサポートから技術部隊の統括まで。「作って終わり」にしない視点を持ちます。' },
  { icon: '🏠', title: '現場実務の実体験', text: 'システムを作るだけでなく、自分自身が現場スタッフとして働き続けています。「使う側」でいることが、現場に刺さるシステムを作る理由です。' },
  { icon: '⚡', title: '45件以上・本番稼働中', text: 'AIと組んだ実践的な業務システム開発で、低コスト・高速で現場の業務改善を実現します。' },
]

/** ⑥ 代表紹介 */
export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">REPRESENTATIVE</span>
          <h2 className="section-title">代表紹介</h2>
        </Reveal>
        <div className="about-grid">
          {/* プロフィールカード */}
          <Reveal direction="left" className="about-card">
            <div className="about-card-top">
              <img src="/profile.png" alt="代表イラスト"
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FFD700', margin: '0 auto 16px', display: 'block' }} />
              <h3>弘</h3>
              <p>代表 / 業務改善エンジニア</p>
            </div>
            <div className="about-card-body">
              <div className="skill-section">
                <div className="skill-label">🔥 実務で使う</div>
                <div className="about-tag-wrap">
                  {['GAS','Python','TypeScript','Go','HTML/CSS/JS','Java','Spring Boot','PostgreSQL'].map(t => (
                    <span className="about-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <hr className="skill-divider" />
              <div className="skill-section">
                <div className="skill-label">💡 得意領域</div>
                <div className="about-tag-wrap">
                  {['AI活用','業務自動化','現場DX','API連携'].map(t => (
                    <span className="about-tag domain" key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <a href="https://note.com/himawasa_sync" target="_blank" rel="noopener noreferrer" className="about-link">
                📝 noteで開発記事を発信中
              </a>
            </div>
          </Reveal>

          {/* テキスト部分 */}
          <Reveal direction="right" className="about-right">
            <h3>「使いにくい」と言えない現場を、<span className="yl">25年間</span>見てきました。</h3>
            <p>システムが使いにくくて、でも誰にも言えなくて、結局は手書きに戻ってしまう。そういう現場を、ユーザーサポートとして20年以上、一番近くで見てきました。</p>
            <p>そして今も、システムを作りながら──<strong>自分自身が現場スタッフとして働き続けています。</strong>使う側の感覚を、絶対に手放したくないから。</p>
            <p><strong>だから私が作るのは、「使われ続けるシステム」だけです。</strong></p>
            <p>IT業界25年。<strong>中小企業の技術部隊を束ねてきたマネジメント経験</strong>と、現場で汗をかいた実務経験を掛け合わせ、今はAIと組んで45件以上の業務システムを設計・開発・本番運用しています。最近では<strong>Java / Spring Boot</strong>による本格的なWebアプリケーション開発にも取り組み、技術の幅をさらに広げています。</p>
            <p>プログラミング専門の訓練は受けていません。でも「現場が本当に何に困っているか」なら、誰にも負けません。</p>
            <div className="about-highlights">
              {hlItems.map(({ icon, title, text }, i) => (
                <motion.div
                  className="hl-item"
                  key={title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="hl-icon">{icon}</div>
                  <div className="hl-text">
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
