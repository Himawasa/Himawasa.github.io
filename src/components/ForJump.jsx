import { Link } from 'react-router-dom'
import { INDUSTRY_NAV } from '../pages/for/industries'

export default function ForJump({ title = '現場から見る' }) {
  return (
    <nav className="for-jump" aria-label={title}>
      <div className="container">
        <p className="for-jump-title">{title}</p>
        <ul>
          {INDUSTRY_NAV.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
