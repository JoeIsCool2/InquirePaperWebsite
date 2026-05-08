import { useEffect, useId, useMemo, useState } from 'react'
import { useFeedbackSound } from '@/hooks/useFeedbackSound'
import type { CedStep } from '@/types/curriculum'

type Props = {
  step: CedStep
  onSolved: () => void
  onMistake?: () => void
}

export default function CedSortStepView({ step, onSolved, onMistake }: Props) {
  const sound = useFeedbackSound()
  const baseId = useId()
  const items = useMemo(() => {
    const copy = [...step.items]
    copy.sort(() => Math.random() - 0.5)
    return copy
  }, [step.id])

  const [assignments, setAssignments] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    setAssignments({})
    setChecked(false)
    setCorrect(false)
  }, [step.id])

  function allFilled() {
    return items.every((it) => Boolean(assignments[it.id]))
  }

  function verify() {
    const ok = items.every((it) => assignments[it.id] === it.bucketId)
    setChecked(true)
    setCorrect(ok)
    if (ok) {
      sound('correct')
      onSolved()
    } else {
      sound('incorrect')
      onMistake?.()
    }
  }

  const bucketLabel: Record<string, string> = {
    claim: 'Claim',
    evidence: 'Evidence',
    interpretation: 'Interpretation',
  }

  return (
    <div className="card glass step-card">
      <h3 className="step-title">{step.prompt}</h3>
      <p className="ced-hint">
        Claim = what the essay argues. Evidence = what a source shows. Interpretation = the “so what?” you draw from
        evidence.
      </p>
      <div className="match-grid" style={{ marginTop: '0.75rem' }}>
        {items.map((it) => (
          <div key={it.id} className="match-row">
            <div className="match-left">{it.text}</div>
            <label className="sr-only" htmlFor={`${baseId}-${it.id}`}>
              Category for: {it.text}
            </label>
            <select
              id={`${baseId}-${it.id}`}
              className="match-select"
              disabled={checked && correct}
              value={assignments[it.id] ?? ''}
              onChange={(e) =>
                setAssignments((a) => ({
                  ...a,
                  [it.id]: e.target.value,
                }))
              }
            >
              <option value="">Choose…</option>
              {(['claim', 'evidence', 'interpretation'] as const).map((b) => (
                <option key={b} value={b}>
                  {bucketLabel[b]}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {!checked ? (
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
          onClick={verify}
          disabled={!allFilled()}
        >
          Check buckets
        </button>
      ) : !correct ? (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="feedback" role="status" aria-live="polite">
            <strong>Adjust.</strong> {step.explain}
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setChecked(false)
              setCorrect(false)
            }}
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="feedback" role="status" aria-live="polite">
          <strong>Clean sort.</strong> {step.explain}
        </div>
      )}
    </div>
  )
}
