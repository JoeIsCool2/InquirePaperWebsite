import { Link, useParams } from 'react-router-dom'
import CrownBadge from '@/components/CrownBadge'
import { getUnit } from '@/data/curriculum'
import { depthLabelAt, lessonPath, nextPlayableDepth, type DepthLevel } from '@/data/lessonDepthKeys'
import { useAppState } from '@/context/AppStateContext'

const DEPTHS: DepthLevel[] = [1, 2, 3]

export default function UnitPage() {
  const { unitId } = useParams()
  const unit = unitId ? getUnit(unitId) : undefined
  const { isLessonComplete, isDepthComplete, unitCrownLevel } = useAppState()

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
        <p className="unit-crown-caption">
          Crown {crown}/5 · Foundations (level 1) completion across lessons · each lesson also unlocks Deeper and Advanced
        </p>
      </div>
      <ul className="lesson-list">
        {unit.lessons.map((l) => {
          const doneL1 = isLessonComplete(unit.id, l.id)
          const next = nextPlayableDepth(unit.id, l.id, isDepthComplete)
          let cta = 'Start'
          if (!doneL1) cta = 'Start'
          else if (!isDepthComplete(unit.id, l.id, 2)) cta = 'Level 2'
          else if (!isDepthComplete(unit.id, l.id, 3)) cta = 'Level 3'
          else cta = 'Replay'

          return (
            <li key={l.id}>
              <div className={'lesson-card glass' + (doneL1 ? ' lesson-card--l1-done' : '')}>
                <Link className="lesson-link--block" to={lessonPath(unit.id, l.id, next)}>
                  <div className="lesson-link-main">
                    <span className="lesson-icon" aria-hidden>
                      {doneL1 ? '✓' : '◇'}
                    </span>
                    <div>
                      <span className="lesson-title">{l.title}</span>
                      <span className="lesson-blurb">{l.blurb}</span>
                      {l.estimatedMinutes ? (
                        <span className="lesson-time">~{l.estimatedMinutes} min</span>
                      ) : null}
                    </div>
                  </div>
                  <span className="tag">{cta}</span>
                </Link>
                <div className="lesson-depth-row" role="group" aria-label="Depth levels for this lesson">
                  {DEPTHS.map((d) => {
                    const complete = isDepthComplete(unit.id, l.id, d)
                    const locked =
                      (d === 2 && !isDepthComplete(unit.id, l.id, 1)) ||
                      (d === 3 && !isDepthComplete(unit.id, l.id, 2))
                    const label = depthLabelAt(l, d)
                    if (locked) {
                      return (
                        <span
                          key={d}
                          className="lesson-depth-pill lesson-depth-pill--locked"
                          title={`Unlock ${label} by completing the previous level`}
                        >
                          L{d} · {label}
                        </span>
                      )
                    }
                    return (
                      <Link
                        key={d}
                        className={'lesson-depth-pill' + (complete ? ' lesson-depth-pill--done' : '')}
                        to={lessonPath(unit.id, l.id, d)}
                      >
                        L{d} · {label}
                        {complete ? ' ✓' : ''}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
