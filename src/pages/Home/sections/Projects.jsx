import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑨ 主な開発実績 */
const projects = [
  {
    icon: '🌻', status: '稼働中', badge: '介護DX', badgeClass: 'cat-kaigo',
    title: 'てますい ─ 介護施設のアシスタント',
    desc: 'メモを入れるか話すだけで、介護記録・申し送り・事故報告書の下書きを数秒で。持ち物チェックと予定カレンダーも1つの画面にまとめました。1か月無料でお試しいただけます。',
    tags: ['PWA', 'Vertex AI', '音声入力'],
    domain: '介護 / 書類・持ち物・予定', version: 'v0.1',
    href: '/temasui/', highlight: true,
  },
  {
    icon: '🗓️', status: '稼働中', badge: '介護DX', badgeClass: 'cat-kaigo',
    title: 'CareSync ─ 介護予定カレンダー',
    desc: '施設全体の予定・利用変更・往診・残薬をひと目で確認できます。現場の「どこを見ればいいか分からない」を一画面にまとめます。',
    tags: ['GAS', 'カレンダー', '介護現場'],
    domain: '介護 / 予定・残薬管理', version: 'v1.0',
    href: null,
  },
  {
    icon: '⚙️', status: '稼働中', badge: '業務自動化', badgeClass: 'cat-auto',
    title: 'ksSYNC ─ 現場業務の自動化',
    desc: '今のExcelやスプレッドシートのまま、毎日の繰り返し作業を自動化します。現場ごとの様式に合わせて設計した独自ツールです。',
    tags: ['GAS', 'Excel', '現場で調整'],
    domain: '業務自動化 / 現場特化', version: 'v1.0',
    href: null, highlight: true,
  },
  {
    icon: '⚖️', status: '稼働中', badge: 'Java / Spring Boot', badgeStyle: { background: '#1a3a6b', color: 'white' },
    title: '社労士 × 顧問先 労務管理ポータル',
    desc: '社労士事務所と顧問先企業をつなぐクラウド型業務ポータル。タスク管理・AI労務相談・見積→受注→請求の自動転記など、13の画面があります。',
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Gemini AI'],
    domain: '士業DX / Webアプリ', version: 'v1.0',
    href: '/sharoushi-portal/',
  },
  {
    icon: '📠', status: '稼働中', badge: '医療AI', badgeClass: 'cat-medical',
    title: 'FAX書類AI自動処理システム',
    desc: '届いたFAXのPDFをAIが読み取って仕分け、電子カルテへ自動で登録します。年間数千枚の紙を、手で仕分けなくてよくなりました。',
    tags: ['Python', 'Vertex AI', 'Selenium'],
    domain: '医療 / 電子カルテ自動化', version: 'v3.4',
  },
  {
    icon: '📸', status: '稼働中', badge: '医療AI', badgeClass: 'cat-medical',
    title: '書類・保険証AI自動分類',
    desc: 'スマホ撮影でAIが書類種別を自動判別し、Googleドライブの月別フォルダへ自動保存します。',
    tags: ['GAS', 'Vertex AI', 'Google Drive'],
    domain: '医療 / AI画像処理', version: 'v1.3',
  },
  {
    icon: '🏠', status: '稼働中', badge: '在宅医療', badgeClass: 'cat-medical',
    title: '在宅診療カルテ自動作成',
    desc: '訪問予定データを外部APIから取得し、電子カルテを自動生成。処方日数の自動計算まで対応しています。',
    tags: ['Python', 'Selenium', 'API連携'],
    domain: '在宅医療 / カルテ自動化', version: 'v0.4',
  },
  {
    icon: '🩻', status: '稼働中', badge: '在宅医療', badgeClass: 'cat-medical',
    title: 'レントゲン依頼管理システム',
    desc: '訪問診療のレントゲン依頼・撮影完了フロー・月次集計を一元管理。集団検診機能も搭載しています。',
    tags: ['GAS', 'Google Chat', 'PDF生成'],
    domain: '在宅医療 / 業務管理', version: 'v7.3',
  },
  {
    icon: '🤖', status: '稼働中', badge: 'AI活用', badgeClass: 'cat-ai',
    title: 'AI自律型タスク管理システム',
    desc: 'AIが優先度を自動判定し、タスクを管理・通知。Gemini連携により、Google Chat上から指示を出すだけで自動で動きます。',
    tags: ['GAS', 'Gemini API', 'Google Chat'],
    domain: '業務効率化 / AIタスク管理', version: 'v2.0',
  },
  {
    icon: '📅', status: '稼働中', badge: '在宅医療', badgeClass: 'cat-medical',
    title: '在宅医療スケジュール管理',
    desc: '訪問診療の患者・スタッフ・施設の予定を一元管理。外部APIとリアルタイムに連携します。',
    tags: ['GAS', 'CrossLog API'],
    domain: '在宅医療 / スケジュール', version: 'v37.1',
  },
  {
    icon: '🎙️', status: '稼働中', badge: '医療AI', badgeClass: 'cat-medical',
    title: '診療記録・音声管理システム',
    desc: '診察記録を音声・テキストで管理し、分析ダッシュボードで可視化。CSV出力やAI連携にも対応しています。',
    tags: ['GAS', 'Chart.js', 'AI連携'],
    domain: '医療 / 診療記録分析', version: 'v2.3',
  },
  {
    icon: '💊', status: '稼働中', badge: '業務自動化', badgeClass: 'cat-auto',
    title: '薬剤発注業務管理システム',
    desc: '薬剤の発注・在庫管理をデジタル化。手書きやFAXでの発注をゼロにし、発注ミスを大幅に削減しました。',
    tags: ['GAS', 'Google Sheets'],
    domain: '医療 / 薬剤管理', version: 'v26.0',
  },
  {
    icon: '🏢', status: '稼働中', badge: '業務自動化', badgeClass: 'cat-auto',
    title: '業務ツール統合ポータル',
    desc: '複数の業務アプリへのアクセスを一画面に集約。ドラッグ＆ドロップでの並び替えや、運用状況の可視化にも対応しています。',
    tags: ['GAS', 'Drag & Drop'],
    domain: '業務効率化 / ポータル', version: 'v2.3',
  },
  {
    icon: '📄', status: '稼働中', badge: '業務自動化', badgeClass: 'cat-auto',
    title: 'デジタル書類配信システム',
    desc: '紙で配っていた書類をデジタル化し、対象者に自動配信。既読確認や履歴管理にも対応しています。',
    tags: ['GAS', 'TypeScript', 'Google Forms'],
    domain: '業務効率化 / 書類管理', version: 'v1.0',
  },
  {
    icon: '💬', status: '稼働中', badge: 'AI活用', badgeClass: 'cat-ai',
    title: '業務問い合わせAIチャットBot',
    desc: 'FileMakerの問い合わせをAIがChat上で受付・通知・管理。誰がどこまで対応したかを、ひと目で分かるようにしています。',
    tags: ['GAS', 'Google Chat API', 'FileMaker API'],
    domain: '業務効率化 / AIボット', version: 'v1.0',
  },
]

const cardV = (i) => ({
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { delay: (i % 3) * 0.1, duration: 0.55, ease: 'easeOut' } },
})

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <Reveal direction="up" className="section-header">
          <span className="section-label">PROJECTS</span>
          <h2 className="section-title">主な開発実績</h2>
          <p className="section-desc">現場の困りごとから生まれた仕組みを、いくつかご紹介します</p>
        </Reveal>
        <div className="projects-grid">
          {projects.map(({ icon, status, badge, badgeClass, badgeStyle, title, desc, tags, domain, version, href, highlight, live }, i) => {
            const borderStyle = highlight
              ? { border: '2px solid #FFD700' }
              : live
              ? { border: '2px solid #69DB7C' }
              : {}

            const MotionTag = href ? motion.a : motion.div
            const extraProps = href
              ? { href, target: '_blank', rel: 'noopener noreferrer', style: { textDecoration: 'none', display: 'block', ...borderStyle } }
              : { style: borderStyle }

            return (
              <MotionTag
                className="proj-card"
                key={title}
                variants={cardV(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6, borderColor: 'rgba(255,215,0,0.6)', boxShadow: '0 16px 48px rgba(0,0,0,0.35)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                {...extraProps}
              >
                <div className="proj-header">
                  <div className="proj-icon">{icon}</div>
                  <span className="proj-status status-live">{status}</span>
                </div>
                <span className={`cat-badge${badgeClass ? ' ' + badgeClass : ''}`} style={badgeStyle}>{badge}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
                <div className="proj-tags">
                  {tags.map(t => <span className="proj-tag" key={t}>{t}</span>)}
                </div>
                <div className="proj-footer">
                  <div className="proj-domain">{domain}</div>
                  <div className="proj-version">{version}</div>
                </div>
              </MotionTag>
            )
          })}
        </div>
        <Reveal direction="up" delay={0.2} className="projects-note">
          <div className="projects-more-box">
            <div className="projects-more-num">45<span style={{ fontSize: '0.6em' }}>+</span></div>
            <div>上記以外にも、薬剤在庫管理・施設カレンダー・外来予約・勤怠管理支援・FAX連携・AI自動ログイン など<br />45件以上のシステムを設計・開発・運用しています。</div>
          </div>
          <a href="https://note.com/himawasa_sync" target="_blank" rel="noopener noreferrer" className="btn-yellow-sm">
            noteで開発記録を読む →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
