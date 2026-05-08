import { Navigate, useParams } from 'react-router-dom'

/** Legacy URLs without depth default to level 1 (Foundations). */
export default function LessonDepthRedirect() {
  const { unitId, lessonId } = useParams()
  if (!unitId || !lessonId) return <Navigate to="/path" replace />
  return <Navigate to={`/lesson/${unitId}/${lessonId}/1`} replace />
}
