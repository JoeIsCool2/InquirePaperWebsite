import { Link, Navigate, useParams } from 'react-router-dom'
import LessonPlayer from '@/components/LessonPlayer'
import { useAppState } from '@/context/AppStateContext'
import { getLesson, getUnit } from '@/data/curriculum'
import { lessonPath, type DepthLevel } from '@/data/lessonDepthKeys'

function parseDepth(raw: string | undefined): DepthLevel | null {
  const n = Number(raw)
  if (n === 1 || n === 2 || n === 3) return n
  return null
}

export default function LessonPage() {
  const { unitId, lessonId, depth: depthParam } = useParams()
  const { isDepthComplete } = useAppState()
  const unit = unitId ? getUnit(unitId) : undefined
  const lesson = unitId && lessonId ? getLesson(unitId, lessonId) : undefined
  const depth = parseDepth(depthParam)

  if (!unit || !lesson || !unitId || !lessonId) {
    return (
      <div className="card glass">
        <h1>Lesson not found</h1>
        <Link className="btn btn-ghost" to="/path">
          Back to path
        </Link>
      </div>
    )
  }

  if (!depth) {
    return <Navigate to={lessonPath(unitId, lessonId, 1)} replace />
  }

  if (depth === 2 && !isDepthComplete(unitId, lessonId, 1)) {
    return <Navigate to={lessonPath(unitId, lessonId, 1)} replace />
  }

  if (depth === 3 && !isDepthComplete(unitId, lessonId, 2)) {
    const fallback = isDepthComplete(unitId, lessonId, 1) ? 2 : 1
    return <Navigate to={lessonPath(unitId, lessonId, fallback as DepthLevel)} replace />
  }

  return (
    <div className="lesson-shell">
      <div className="sticky-lesson-bar glass">
        <Link className="sticky-lesson-back" to={`/unit/${unit.id}`}>
          ← {unit.title}
        </Link>
        <span className="sticky-lesson-title">
          {lesson.title} · {lesson.depthLevels[depth - 1].label}
        </span>
      </div>
      <LessonPlayer unit={unit} lesson={lesson} depth={depth} />
    </div>
  )
}
