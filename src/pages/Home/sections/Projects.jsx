import { motion } from 'framer-motion'
import Reveal from '../../../components/Reveal'

/** ⑨ 主な開発実績 */
const projects = [
  {
    icon: '⚖️', status: '稼働中', badge: 'Java / Spring Boot', badgeStyle: { background: '#1a3a6b', color: 'white' },
    title: '社労士 × 顧問先 労務管理ポータル',
    desc: '社労士事務所と顧問先企業をつなぐクラウド型業務ポータル。タスク管理・AI労務相談・見積→受注→請求の自動転記など全13画面を搭載。',
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Gemini AI'],
    domain: '士業DX / Webアプリ', version: 'v1.0',
    href: null, highlight: true,
  },
  {
    icon: '📦', status: '稼働中・体験可', badge: '介護DX', badgeClass: 'cat-kaigo',
    title: 'MochiSync ─ 持ち物チェックAI',
    desc: 'スマホで写真1枚撮るだけで持ち物リストを自動生成。30分かかっていた確認作業を1〜2分に短縮。今すぐ体験 →',
    tags: ['GAS', 'Gemini 3.5 Flash', 'TypeScript'],
    domain: '介護 / AI画像認識', version: 'v2.0',
    href: 'https://himawasa-sync.com/mochisync/', live: true,
  },
  {
    icon: '📄', status: '稼働中・体験可', badge: '業務自動化', badgeClass: 'cat-auto',
    title: 'PDFuse Sync ─ PDF→Excel変換',
    desc: 'PDFファイルをAIが解析し、Excelに自動変換。手作業のデータ入力をゼロに。今すぐ体験 →',
    tags: ['GAS', 'Gemini 3.5 Flash', 'SheetJS'],
    domain: '業務自動化 / AI文書解析', version: 'v1.0',
    href: 'https://himawasa-sync.com/pdfuse/', live: true,
  },
  {
    icon: '📠', status: '稼働中', badge: '医療AI', badgeClass: 'cat-medical',
    title: 'FAX書類AI自動処理システム',
    desc: 'FAX受信PDFをAIが自動仕分け・解析し、電子カルテへ自動登録。年間数千枚の紙処理を完全自動化。',
    tags: ['Python', 'Vertex AI', 'Selenium'],
    domain: '医療 / 電子カルテ自動化', version: 'v3.4',
  },
  {
    icon: '📸', status: '稼働中', badge: '医療AI', badgeClass: 'cat-medical',
    title: '書類・保険証AI自動分類',
    desc: 'スマホ撮影でAIが書類種別を自動判別し、Googleドライブに月別フォルダへ自動保存。',
    tags: ['GAS', 'Vertex AI', 'Google Drive'],
    domain: '医療 / AI画像処理', version: 'v1.3',
  },
  {
    icon: '🏠', status: '稼働中', badge: '在宅医療', badgeClass: 'cat-medical',
    title: '在宅診療カルテ自動作成',
    desc: '訪問予定データを外部APIから取得し、電子カルテを自動生成。処方日数の自動計算まで対応。',
    tags: ['Python', 'Selenium', 'API連携'],
    domain: '在宅医療 / カルテ自動化', version: 'v0.4',
  },
  {
    icon: '🩻', status: '稼働中', badge: '在宅医療', badgeClass: 'cat-medical',
    title: 'レントゲン依頼管理システム',
    desc: '訪問診療のレントゲン依頼・撮影完了フロー・月次集計を一元管理。集団検診機能も搭載。',
    tags: ['GAS', 'Google Chat', 'PDF生成'],
    domain: '在宅医療 / 業務管理', version: 'v7.3',
  },
  {
    icon: '🤖', status: '稼働中', badge: 'AI活用', badgeClass: 'cat-ai',
    title: 'AI自律型タスク管理システム',
    desc: 'AIが優先度を自動判定し、タスクを管理・通知。Gemini連携でChat上から指示を出すだけで動く。',
    tags: ['GAS', 'Gemini API', 'Google Chat'],
    domain: '業務効率化 / AIタスク管理', version: 'v2.0',
  },
  {
    icon: '📅', status: '稼働中', badge: '在宅医療', badgeClass: 'cat-medical',
    title: '在宅医療スケジュール管理',
    desc: '訪問診療の患者・スタッフ・施設の予定を一元管理。外部APIとリアルタイム連携。',
    tags: ['GAS', 'CrossLog API'],
    domain: '在宅医療 / スケジュール', version: 'v37.1',
  },
  {
    icon: '🎙️', status: '稼働中', badge: '医療AI', badgeClass: 'cat-medical',
    title: '診療記録・音声管理システム',
    desc: '診察記録を音声・テキストで管理し、分析ダッシュボードで可視化。CSV出力・AI連携対応。',
    tags: ['GAS', 'Chart.js', 'AI連携'],
    domain: '医療 / 診療記録分析', version: 'v2.3',
  },
  {
    icon: '💊', status: '稼働中', badge: '業務自動化', badgeClass: 'cat-auto',
    title: '薬剤発注業務管理システム',
    desc: '薬剤の発注・在庫管理をデジタル化。手書き・FAX発注をゼロにし、発注ミスを大幅削減。',
    tags: ['GAS', 'Google Sheets'],
    domain: '医療 / 薬剤管理', version: 'v26.0',
  },
  {
    icon: '🏢', status: '稼働中', badge: '業務自動化', badgeClass: 'cat-auto',
    title: '業務ツール統合ポータル',
    desc: '複数の業務アプリへのアクセスを一画面に集約。D&D並び替えや運用状況の可視化にも対応。',
    tags: ['GAS', 'Drag & Drop'],
    domain: '業務効率化 / ポータル', version: 'v2.3',
  },
  {
    icon: '📄', status: '稼働中', badge: '業務自動化', badgeClass: 'cat-auto',
    title: 'デジタル書類配信システム',
    desc: '紙で配っていた書類をデジタル化し、対象者に自動配信。既読確認・履歴管理にも対応。',
    tags: ['GAS', 'TypeScript', 'Google Forms'],
    domain: '業務効率化 / 書類管理', version: 'v1.0',
  },
  {
    icon: '💬', status: '稼働中', badge: 'AI活用', badgeClass: 'cat-ai',
    title: '業務問い合わせAIチャットBot',
    desc: 'FileMakerの問い合わせをAIがChat上で受付・通知・管理。対応状況をリアルタイムに可視化。',
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
          <p className="section-desc">現場から生まれた、リアルな課題解決プロジェクトの一部をご紹介します</p>
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
