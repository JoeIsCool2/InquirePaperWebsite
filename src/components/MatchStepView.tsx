import { useEffect, useId, useMemo, useState } from 'react'
import { useFeedbackSound } from '@/hooks/useFeedbackSound'
import type { MatchStep } from '@/types/curriculum'

type Props = {
  step: MatchStep
  onSolved: () => void
  onMistake?: () => void
}

export default function MatchStepView({ step, onSolved, onMistake }: Props) {
  const sound = useFeedbackSound()
  const id = useId()
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)

  const rightOptions = useMemo(() => {
    const copy = [...step.right]
    copy.sort(() => Math.random() - 0.5)
    return copy
  }, [step.id])

  useEffect(() => {
    setMapping({})
    setChecked(false)
    setCorrect(false)
  }, [step.id])

  function allFilled() {
    return step.left.every((l) => Boolean(mapping[l.id]))
  }

  function verify() {
    const ok = step.left.every((l) => mapping[l.id] === step.answer[l.id])
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

  return (
    <div className="card glass step-card">
      <h3 className="step-title">{step.prompt}</h3>
      <div className="match-grid">
        {step.left.map((l) => (
          <div key={l.id} className="match-row">
            <div className="match-left">{l.text}</div>
            <label className="sr-only" htmlFor={`${id}-${l.id}`}>
              Match for: {l.text}
            </label>
            <select
              id={`${id}-${l.id}`}
              className="match-select"
              disabled={checked}
              value={mapping[l.id] ?? ''}
              onChange={(e) =>
                setMapping((m) => ({
                  ...m,
                  [l.id]: e.target.value,
                }))
              }
            >
              <option value="">Choose…</option>
              {rightOptions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.text}
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
          Check matches
        </button>
      ) : !correct ? (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="feedback" role="status" aria-live="polite">
            <strong>Adjust and try again.</strong> {step.explain}
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
          <strong>Matched.</strong> {step.explain}
        </div>
      )}
    </div>
  )
}
