import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ③ ブランドストーリー */
const brandCards = [
  { icon: '🌻', title: 'Sync = 「つなぐ」', text: 'ソフトウェアで仕事と生活をつなぐ。現場のスタッフと最新技術をつなぐ。そして、家族との時間をもっと大切にできる未来をつなぐ。' },
  { icon: '📐', title: 'シンプルさへのこだわり', text: '「難しくて使えない」ITは意味がありません。どんな現場でも、初日から誰でも使えるシンプルさを最優先に設計します。' },
  { icon: '⚡', title: '低コスト・高速開発', text: 'Google Apps Script・Gemini AIを活用し、高額なシステム投資なしに業務を自動化。中小規模の事業所でも導入しやすい価格を実現します。' },
  { icon: '🤝', title: '作って終わりにしない', text: '現場に寄り添い、使い続けてもらえるシステムを一緒に育てていきます。導入後の改善・保守も責任を持って対応します。' },
]

const cardV = (i) => ({
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' } },
})

export default function BrandStory() {
  return (
    <section className="brand" id="brand">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">BRAND STORY</span>
          <h2 className="section-title">名前に込めた想い</h2>
        </Reveal>
        <div className="brand-grid">
          {/* 左：テーブル + ロゴボックス */}
          <Reveal direction="left" className="brand-left">
            <h3 className="brand-title">家族4人の<span className="yl">頭文字</span>でできた<br />世界でひとつの屋号</h3>
            <p className="brand-text">「HiMaWaSa」は、大切な家族4人の頭文字をつなげた言葉です。仕事も家族も大切に、という想いをブランド名に込めました。</p>
            <table className="name-table">
              <tbody>
                <tr><th>文字</th><th>読み</th><th>意味</th></tr>
                <tr><td className="Hi-cell">Hi</td><td>ひ</td><td>代表の頭文字</td></tr>
                <tr><td className="Ma-cell">Ma</td><td>ま</td><td>家族の頭文字</td></tr>
                <tr><td className="Wa-cell">Wa</td><td>わ</td><td>家族の頭文字</td></tr>
                <tr><td className="Sa-cell">Sa</td><td>さ</td><td>家族の頭文字</td></tr>
              </tbody>
            </table>
            <div className="num-box">
              <img src="/logo.png" alt="HiMaWaSa Sync ロゴ"
                style={{ width: '80px', marginBottom: '12px', mixBlendMode: 'lighten', filter: 'drop-shadow(0 2px 12px rgba(255,215,0,0.4))' }} />
              <div className="num-box-desc" style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(255,255,255,0.85)' }}>
                「4人家族の絆でできた名前。」<br />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                  HiMaWaSa の4文字は、大切な家族の頭文字を並べたものです。<br />
                  詳しくは、仕事でご縁ができた際にでもこっそりお話しします。😊
                </span>
              </div>
            </div>
          </Reveal>

          {/* 右：ブランドカード */}
          <div className="brand-right">
            {brandCards.map(({ icon, title, text }, i) => (
              <motion.div
                className="brand-card"
                key={title}
                variants={cardV(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ x: 8, borderColor: '#FFA500', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <h4>{icon} {title}</h4>
                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
