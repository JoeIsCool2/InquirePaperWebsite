import { Link } from 'react-router-dom'
import Disclaimer from '@/components/Disclaimer'
import { IconBook, IconPath } from '@/components/icons'
import { useAppState } from '@/context/AppStateContext'

export default function Home() {
  const { pathProgress, totalXp } = useAppState()
  const pct = pathProgress.total ? Math.round((pathProgress.completed / pathProgress.total) * 100) : 0

  return (
    <div className="home-stack">
      <section className="hero card glass">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">Expository inquiry · companion app</p>
            <h1 className="hero-title">Learn the argument in short, satisfying reps.</h1>
            <p className="lead hero-lead">
              Inquiry Path walks through <strong>AI and jobs</strong> the same way the source essay does—claims, sources,
              limits, and vocabulary—with interactions you cannot get from a PDF alone.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary btn-lg" to="/path">
                <IconPath /> Start the path
              </Link>
              <Link className="btn btn-ghost btn-lg" to="/paper">
                <IconBook /> Paper bridge
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div
              className="progress-ring"
              style={{ ['--ring-pct' as string]: `${pct}%` }}
              role="img"
              aria-label={`Path progress ${pathProgress.completed} of ${pathProgress.total} lessons`}
            >
              <div className="progress-ring-inner">
                <span className="progress-ring-value">{pct}%</span>
                <span className="progress-ring-label">path</span>
              </div>
            </div>
            <p className="hero-progress-caption">
              {pathProgress.completed}/{pathProgress.total} lessons on this device
            </p>
            <p className="hero-progress-caption hero-progress-xp">Lifetime XP: {totalXp}</p>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-tile glass">
          <h2>Multimodal</h2>
          <p>Sort claims, triage sources, and run scenarios—built for the web, not a static essay.</p>
        </article>
        <article className="feature-tile glass">
          <h2>Mapped to the essay</h2>
          <p>Each unit mirrors the essay’s section spine, with reading tie-ins on teaching cards.</p>
        </article>
        <article className="feature-tile glass">
          <h2>5–8 minute lessons</h2>
          <p>Bite-size steps, optional sound, streaks, and a daily goal chip to keep momentum.</p>
        </article>
      </section>

      <div className="card glass">
        <h2 className="section-title">Audience &amp; purpose</h2>
        <p>
          Built for students, teachers, and curious readers. After ~10 minutes you should be able to{' '}
          <strong>trace the thesis</strong>, name <strong>which sources support which moves</strong>, and use the{' '}
          <strong>glossary</strong> confidently.
        </p>
        <Link className="nav-link" to="/glossary" style={{ marginTop: 'var(--space-sm)', display: 'inline-flex' }}>
          Open glossary
        </Link>
        <Disclaimer />
      </div>
    </div>
  )
}
