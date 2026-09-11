import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/**
 * お客様の声
 *
 * approved は「掲載してよい」とご本人から返事をもらえた場合だけ true にする。
 * 本人確認が取れていない文面を出すと景品表示法・ステマ規制に触れるため、
 * 既定は false（false のものは描画されない）。
 */
const voices = [
  {
    approved: false,
    tag: 'シフト表・勤務体制作成',
    quote:
      '毎月20日を過ぎると、シフトを組むために事務所へ残っていました。今はKING OF TIMEから落としたデータを読ませて、ボタンを押すだけです。空いた時間で、入居者さんの記録を見る余裕ができました。',
    who: '介護老人保健施設 事務長さま',
  },
  {
    approved: false,
    tag: '請求書の一括生成・送信',
    quote:
      '請求の日は半日つぶれるものだと思っていました。30件分のPDFを作ってメールに貼る作業がなくなり、今は内容の確認だけです。自分に使えるか不安でしたが、画面が普段のExcelとほとんど同じで戸惑いませんでした。',
    who: '税理士事務所 所長さま',
  },
  {
    approved: false,
    tag: 'CareSync 介護予定カレンダー',
    quote:
      '往診の予定と残薬の話が、口頭と紙と別々のシートに散らばっていました。今は一つの画面をみんなで見ています。「言った・聞いていない」が減ったのが、いちばん助かっています。',
    who: '介護施設 施設長さま',
  },
  {
    approved: false,
    tag: '顧客台帳・期日管理',
    quote:
      '期日を手帳で管理していたので、常にどこか不安がありました。7日前に通知が来るようになってから、その不安がなくなりました。派手なシステムではありませんが、うちに必要なものだけが入っています。',
    who: '社会保険労務士事務所 代表さま',
  },
]

const cardV = (i) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } },
})

export default function Voices() {
  const published = voices.filter((v) => v.approved)
  if (published.length === 0) return null

  return (
    <section className="voices" id="voices">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">VOICES</span>
          <h2 className="section-title">使っている方の言葉</h2>
          <p className="section-desc">掲載の許可をいただいたものだけを載せています</p>
        </Reveal>
        <div className="voices-grid">
          {published.map(({ quote, who, tag }, i) => (
            <motion.figure
              className="voice-card"
              key={who + tag}
              variants={cardV(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(180,140,40,0.12)' }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <span className="voice-tag">{tag}</span>
              <blockquote className="voice-quote">{quote}</blockquote>
              <figcaption className="voice-who">{who}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
