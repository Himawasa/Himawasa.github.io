import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home   from './pages/Home'
import './index.css'

/**
 * アプリのルート
 * - HelmetProvider：ページごとの <title> / <meta> を管理
 * - BrowserRouter + Routes：React Router v6 によるルーティング
 */
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ paddingTop: 'var(--nav-h)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Phase 2 以降で LP ページを追加予定 */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  )
}
