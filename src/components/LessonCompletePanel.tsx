import { Link } from 'react-router-dom'
import { useAppState } from '@/context/AppStateContext'
import { useDialogA11y } from '@/hooks/useDialogA11y'
import { starsFromMistakes } from '@/utils/lessonScore'

type Props = {
  open: boolean
  unitId: string
  lessonTitle: string
  unitTitle: string
  mistakes: number
  xpEarned: number
  nextLessonId?: string
  onClose: () => void
}

export default function LessonCompletePanel({
  open,
  unitId,
  lessonTitle,
  unitTitle,
  mistakes,
  xpEarned,
  nextLessonId,
  onClose,
}: Props) {
  const { totalXp } = useAppState()
  const containerRef = useDialogA11y(open, onClose)

  if (!open) return null

  const stars = starsFromMistakes(mistakes)

  return (
    <div ref={containerRef} className="complete-backdrop" onClick={onClose}>
      <div
        className="complete-card glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="complete-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="kicker">Lesson complete</p>
        <h2 id="complete-title" className="complete-title">
          {lessonTitle}
        </h2>
        <p className="complete-sub">{unitTitle}</p>
        <div className="stars-row" aria-label={`${stars} out of 3 stars`}>
          {[1, 2, 3].map((i) => (
            <span key={i} className={'star' + (i <= stars ? ' star--on' : '')} aria-hidden>
              ★
            </span>
          ))}
        </div>
        {xpEarned > 0 ? (
          <p className="complete-xp">+{xpEarned} XP this lesson</p>
        ) : (
          <p className="complete-xp complete-xp--muted">XP was already earned for this lesson.</p>
        )}
        <p className="complete-total-xp">Total XP: {totalXp}</p>
        <p className="complete-hint">
          {mistakes === 0
            ? 'Flawless run—nice focus.'
            : mistakes <= 2
              ? 'Solid work. Review the feedback and try a replay later.'
              : 'Keep going—mistakes are part of inquiry.'}
        </p>
        <div className="complete-actions">
          {nextLessonId ? (
            <Link className="btn btn-primary" to={`/lesson/${unitId}/${nextLessonId}`} onClick={onClose}>
              Next lesson
            </Link>
          ) : null}
          <Link className="btn btn-ghost" to={`/unit/${unitId}`} onClick={onClose}>
            Back to level
          </Link>
        </div>
      </div>
    </div>
  )
}
