import { Link, useParams } from 'react-router-dom'
import LessonPlayer from '@/components/LessonPlayer'
import { getLesson, getUnit } from '@/data/curriculum'

export default function LessonPage() {
  const { unitId, lessonId } = useParams()
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
