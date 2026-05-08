import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GLOSSARY } from '@/data/glossary'
import { glossaryTermAnchorId } from '@/data/glossarySlugs'

export default function GlossaryPage() {
  const location = useLocation()
  const entries = Object.entries(GLOSSARY).sort(([a], [b]) => a.localeCompare(b))

  useEffect(() => {
    const raw = location.hash.replace(/^#/, '')
    if (!raw) return
    const el = document.getElementById(raw)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <div>
      <nav style={{ marginBottom: 'var(--space-md)' }}>
        <Link className="nav-link" to="/">
          ← Home
        </Link>
      </nav>
      <div className="card glass hero-inner">
        <p className="kicker">Reference</p>
        <h1 className="hero-title" style={{ fontSize: 'var(--text-2xl)' }}>
          Glossary
        </h1>
        <p className="lead">
          Quick definitions used across the path. In lessons, tap a term or follow the link to jump here.
        </p>
      </div>
      <dl className="glossary-dl">
        {entries.map(([term, def]) => (
          <div key={term} id={glossaryTermAnchorId(term)} className="glossary-row glass">
            <dt>{term}</dt>
            <dd>{def}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
