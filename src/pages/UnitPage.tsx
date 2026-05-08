import { Link, useParams } from 'react-router-dom'
import CrownBadge from '@/components/CrownBadge'
import { getUnit } from '@/data/curriculum'
import { useAppState } from '@/context/AppStateContext'

export default function UnitPage() {
  const { unitId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const { isLessonComplete, unitCrownLevel, isUnitAccessible } = useAppState()

  if (!unit) {
    return (
      <div className="card glass">
        <h1>Unit not found</h1>
        <Link className="btn btn-ghost" to="/path">
          Back to path
        </Link>
      </div>
    )
  }

  if (!isUnitAccessible(unit.id)) {
    return (
      <div>
        <nav className="breadcrumb-nav">
          <Link className="nav-link" to="/path">
            ← Path
          </Link>
        </nav>
        <div className="card glass level-gate-card">
          <p className="kicker">Level locked</p>
          <h1>This unit is not available yet</h1>
          <p className="lead">
            {unit.level === 2
              ? 'Complete every lesson in Level 1 to unlock Level 2.'
              : 'Complete every lesson in Level 2 to unlock Level 3.'}
          </p>
          <Link className="btn btn-primary" to="/path">
            Back to skill path
          </Link>
        </div>
      </div>
    )
  }

  const crown = unitCrownLevel(unit.id)

  return (
    <div>
      <nav className="breadcrumb-nav">
        <Link className="nav-link" to="/path">
          ← Path
        </Link>
      </nav>
      <div className="card glass unit-hero">
        <div className="unit-hero-top">
          <div>
            <p className="kicker">Unit</p>
            <h1>{unit.title}</h1>
            <p className="lead">{unit.subtitle}</p>
          </div>
          <div
            className="crown-badge crown-badge--large"
            role="img"
            aria-label={`Crown level ${crown} of 5`}
            title={`Crown level ${crown}`}
          >
            <CrownBadge filled={crown > 0} large />
          </div>
        </div>
        <p className="unit-crown-caption">Crown {crown}/5 · finish all lessons for a full crown</p>
      </div>
      <ul className="lesson-list">
        {unit.lessons.map((l) => {
          const done = isLessonComplete(unit.id, l.id)
          return (
            <li key={l.id}>
              <Link className={'lesson-link glass ' + (done ? 'done' : '')} to={`/lesson/${unit.id}/${l.id}`}>
                <div className="lesson-link-main">
                  <span className="lesson-icon" aria-hidden>
                    {done ? '✓' : '◇'}
                  </span>
                  <div>
                    <span className="lesson-title">{l.title}</span>
                    <span className="lesson-blurb">{l.blurb}</span>
                    {l.estimatedMinutes ? (
                      <span className="lesson-time">~{l.estimatedMinutes} min</span>
                    ) : null}
                  </div>
                </div>
                <span className="tag">{done ? 'Done' : 'Start'}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
