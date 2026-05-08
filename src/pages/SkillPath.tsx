import { useState } from 'react'
import { Link } from 'react-router-dom'
import AchievementsModal from '@/components/AchievementsModal'
import CrownBadge from '@/components/CrownBadge'
import { IconTrophy } from '@/components/icons'
import { UNITS } from '@/data/curriculum'
import { useAppState } from '@/context/AppStateContext'

export default function SkillPath() {
  const { unitCrownLevel, isLessonComplete, achievements } = useAppState()
  const [achOpen, setAchOpen] = useState(false)

  return (
    <div>
      <AchievementsModal open={achOpen} onClose={() => setAchOpen(false)} unlocked={achievements} />
      <div className="card glass path-intro">
        <div className="path-intro-row">
          <div>
            <p className="kicker">Skill path</p>
            <h1 className="hero-title" style={{ fontSize: 'var(--text-2xl)' }}>
              Five units. Crowns 0–5 each.
            </h1>
            <p className="lead">
              Follow the spine of the inquiry essay: framing, evidence, capability, labor patterns, meaning. Each lesson has
              three depths—Foundations, then Deeper, then Advanced—unlocked in order. Crowns reflect Foundations completion
              across the unit.
            </p>
          </div>
          <button type="button" className="btn btn-ghost ach-trigger" onClick={() => setAchOpen(true)}>
            <IconTrophy /> Achievements
          </button>
        </div>
      </div>

      <ol className="path-timeline">
        {UNITS.map((u, index) => {
          const crown = unitCrownLevel(u.id)
          const done = u.lessons.filter((l) => isLessonComplete(u.id, l.id)).length
          const isLast = index === UNITS.length - 1
          return (
            <li key={u.id} className="path-timeline-item">
              <div className="path-connector" aria-hidden>
                {!isLast ? <span className="path-line" /> : null}
              </div>
              <Link className="path-node glass" to={`/unit/${u.id}`}>
                <div className="path-node-badge" title={`Crown ${crown} of 5`}>
                  <CrownBadge filled={crown > 0} />
                </div>
                <div className="path-node-body">
                  <span className="path-node-index">Unit {index + 1}</span>
                  <h2>{u.title}</h2>
                  <p>{u.subtitle}</p>
                  <span className="path-node-meta">
                    {done}/{u.lessons.length} lessons · Crown {crown}/5
                  </span>
                </div>
                <span className="tag path-node-cta">Enter</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
