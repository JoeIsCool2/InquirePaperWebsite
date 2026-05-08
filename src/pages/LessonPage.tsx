import { Link, useParams } from 'react-router-dom'
import LessonPlayer from '@/components/LessonPlayer'
import { getLesson, getUnit } from '@/data/curriculum'
import { useAppState } from '@/context/AppStateContext'

export default function LessonPage() {
  const { unitId, lessonId } = useParams()
  const { isUnitAccessible } = useAppState()
  const unit = unitId ? getUnit(unitId) : undefined
  const lesson = unitId && lessonId ? getLesson(unitId, lessonId) : undefined

  if (!unit || !lesson) {
    return (
      <div className="card glass">
        <h1>Lesson not found</h1>
        <Link className="btn btn-ghost" to="/path">
          Back to path
        </Link>
      </div>
    )
  }

  if (!isUnitAccessible(unit.id)) {
    return (
      <div className="lesson-shell">
        <div className="sticky-lesson-bar glass">
          <Link className="sticky-lesson-back" to="/path">
            ← Skill path
          </Link>
          <span className="sticky-lesson-title">Locked</span>
        </div>
        <div className="card glass level-gate-card">
          <p className="kicker">Level locked</p>
          <h1>This lesson is not available yet</h1>
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

  return (
    <div className="lesson-shell">
      <div className="sticky-lesson-bar glass">
        <Link className="sticky-lesson-back" to={`/unit/${unit.id}`}>
          ← {unit.title}
        </Link>
        <span className="sticky-lesson-title">{lesson.title}</span>
      </div>
      <LessonPlayer unit={unit} lesson={lesson} />
    </div>
  )
}
