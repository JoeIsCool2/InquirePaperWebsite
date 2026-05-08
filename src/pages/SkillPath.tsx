import { useState } from 'react'
import { Link } from 'react-router-dom'
import AchievementsModal from '@/components/AchievementsModal'
import CrownBadge from '@/components/CrownBadge'
import { IconTrophy } from '@/components/icons'
import { PATH_LEVELS, unitsInLevel, type PathLevel } from '@/data/curriculum'
import { useAppState } from '@/context/AppStateContext'

function levelLockHint(level: PathLevel) {
  if (level === 2) return 'Finish all Level 1 lessons to unlock.'
  if (level === 3) return 'Finish all Level 2 lessons to unlock.'
  return ''
}

export default function SkillPath() {
  const { unitCrownLevel, isLessonComplete, achievements, isLevelUnlocked } = useAppState()
  const [achOpen, setAchOpen] = useState(false)

  return (
    <div>
      <AchievementsModal open={achOpen} onClose={() => setAchOpen(false)} unlocked={achievements} />
      <div className="card glass path-intro">
        <div className="path-intro-row">
          <div>
            <p className="kicker">Skill path</p>
            <h1 className="hero-title" style={{ fontSize: 'var(--text-2xl)' }}>
              Three levels · five units each.
            </h1>
            <p className="lead">
              Level 1 follows the inquiry essay spine. Levels 2–3 go deeper on evidence, adoption, fairness, and inquiry
              habits—unlocked as you finish the prior level. Crowns still run 0–5 per unit.
            </p>
          </div>
          <button type="button" className="btn btn-ghost ach-trigger" onClick={() => setAchOpen(true)}>
            <IconTrophy /> Achievements
          </button>
        </div>
      </div>

      {PATH_LEVELS.map((level) => {
        const unlocked = isLevelUnlocked(level)
        const units = unitsInLevel(level)
        return (
          <section key={level} className="path-level-section">
            <div className="path-level-header">
              <h2 className="path-level-title">Level {level}</h2>
              {!unlocked ? (
                <p className="path-level-lock text-muted text-small" role="status">
                  {levelLockHint(level)}
                </p>
              ) : (
                <p className="path-level-meta text-muted text-small">
                  {units.length} units · complete any order within this level
                </p>
              )}
            </div>
            <ol className="path-timeline">
              {units.map((u, index) => {
                const crown = unitCrownLevel(u.id)
                const done = u.lessons.filter((l) => isLessonComplete(u.id, l.id)).length
                const isLast = index === units.length - 1
                const rowInner = (
                  <>
                    <div className="path-node-badge" title={unlocked ? `Crown ${crown} of 5` : 'Locked'}>
                      <CrownBadge filled={unlocked && crown > 0} />
                    </div>
                    <div className="path-node-body">
                      <span className="path-node-index">
                        Level {level} · Unit {index + 1}
                      </span>
                      <h2>{u.title}</h2>
                      <p>{u.subtitle}</p>
                      <span className="path-node-meta">
                        {done}/{u.lessons.length} lessons · Crown {crown}/5
                      </span>
                    </div>
                    <span className={'tag path-node-cta' + (unlocked ? '' : ' path-node-cta--muted')}>
                      {unlocked ? 'Enter' : 'Locked'}
                    </span>
                  </>
                )
                return (
                  <li key={u.id} className="path-timeline-item">
                    <div className="path-connector" aria-hidden>
                      {!isLast ? <span className="path-line" /> : null}
                    </div>
                    {unlocked ? (
                      <Link className="path-node glass" to={`/unit/${u.id}`}>
                        {rowInner}
                      </Link>
                    ) : (
                      <div
                        className="path-node glass path-node--locked"
                        aria-disabled="true"
                        title={levelLockHint(level)}
                      >
                        {rowInner}
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
