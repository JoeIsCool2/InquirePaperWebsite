import { Link } from 'react-router-dom'
import { useAppState } from '@/context/AppStateContext'
import { lessonPath, type DepthLevel } from '@/data/lessonDepthKeys'
import { useDialogA11y } from '@/hooks/useDialogA11y'
import { starsFromMistakes } from '@/utils/lessonScore'

type Props = {
  open: boolean
  unitId: string
  lessonId: string
  lessonTitle: string
  unitTitle: string
  depth: DepthLevel
  depthLabel: string
  mistakes: number
  xpEarned: number
  nextLessonId?: string
  onClose: () => void
}

export default function LessonCompletePanel({
  open,
  unitId,
  lessonId,
  lessonTitle,
  unitTitle,
  depth,
  depthLabel,
  mistakes,
  xpEarned,
  nextLessonId,
  onClose,
}: Props) {
  const { totalXp } = useAppState()
  const containerRef = useDialogA11y(open, onClose)

  if (!open) return null

  const stars = starsFromMistakes(mistakes)
  const hasNextDepth = depth < 3
  const nextDepth = (depth + 1) as DepthLevel

  return (
    <div ref={containerRef} className="complete-backdrop" onClick={onClose}>
      <div
        className="complete-card glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="complete-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="kicker">Level complete</p>
        <h2 id="complete-title" className="complete-title">
          {lessonTitle}
        </h2>
        <p className="complete-sub">
          {unitTitle} · {depthLabel}
        </p>
        <div className="stars-row" aria-label={`${stars} out of 3 stars`}>
          {[1, 2, 3].map((i) => (
            <span key={i} className={'star' + (i <= stars ? ' star--on' : '')} aria-hidden>
              ★
            </span>
          ))}
        </div>
        {xpEarned > 0 ? (
          <p className="complete-xp">+{xpEarned} XP (Foundations first clear)</p>
        ) : depth === 1 ? (
          <p className="complete-xp complete-xp--muted">XP was already earned for Foundations on this lesson.</p>
        ) : (
          <p className="complete-xp complete-xp--muted">Deeper levels don’t add XP—practice and mastery only.</p>
        )}
        <p className="complete-total-xp">Total XP: {totalXp}</p>
        <p className="complete-hint">
          {mistakes === 0
            ? 'Flawless run—nice focus.'
            : mistakes <= 2
              ? 'Solid work. Review the feedback and try another depth or lesson when you’re ready.'
              : 'Keep going—mistakes are part of inquiry.'}
        </p>
        <div className="complete-actions">
          {hasNextDepth ? (
            <Link
              className="btn btn-primary"
              to={lessonPath(unitId, lessonId, nextDepth)}
              onClick={onClose}
            >
              Continue to level {nextDepth}
            </Link>
          ) : null}
          {!hasNextDepth && nextLessonId ? (
            <Link className="btn btn-primary" to={lessonPath(unitId, nextLessonId, 1)} onClick={onClose}>
              Next lesson
            </Link>
          ) : null}
          <Link className="btn btn-ghost" to={`/unit/${unitId}`} onClick={onClose}>
            Back to unit
          </Link>
        </div>
      </div>
    </div>
  )
}
