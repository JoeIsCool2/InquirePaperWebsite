import { useEffect, useId, useState } from 'react'
import { useFeedbackSound } from '@/hooks/useFeedbackSound'
import type { TriageStep } from '@/types/curriculum'

type Props = {
  step: TriageStep
  onSolved: () => void
  onMistake?: () => void
}

export default function TriageStepView({ step, onSolved, onMistake }: Props) {
  const sound = useFeedbackSound()
  const [selected, setSelected] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const liveId = useId()

  useEffect(() => {
    setSelected(null)
    setChecked(false)
  }, [step.id])

  function check() {
    if (!selected) return
    const isRight = selected === step.correctSourceId
    setChecked(true)
    if (isRight) {
      sound('correct')
      onSolved()
    } else {
      sound('incorrect')
      onMistake?.()
    }
  }

  const correct = checked && selected === step.correctSourceId

  return (
    <div className="card glass step-card">
      <p className="triage-claim">
        <span className="kicker">Sub-claim</span>
        {step.claim}
      </p>
      <h3 className="step-title" id={`${liveId}-p`}>
        {step.prompt}
      </h3>
      <ul className="triage-sources" role="list">
        {step.sources.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className={
                'triage-source' +
                (selected === s.id ? ' selected' : '') +
                (checked && s.id === step.correctSourceId ? ' correct' : '') +
                (checked && selected === s.id && s.id !== step.correctSourceId ? ' incorrect' : '')
              }
              onClick={() => !checked && setSelected(s.id)}
              disabled={checked}
            >
              <span className="triage-source-label">{s.label}</span>
              <span className="triage-source-desc">{s.description}</span>
            </button>
          </li>
        ))}
      </ul>
      {!checked ? (
        <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={check} disabled={!selected}>
          Lock in choice
        </button>
      ) : !correct ? (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="feedback" role="status" aria-live="polite">
            <strong>Re-read the fit.</strong> {step.explain}
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setChecked(false)
              setSelected(null)
            }}
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="feedback" role="status" aria-live="polite">
          <strong>Strong match.</strong> {step.explain}
        </div>
      )}
    </div>
  )
}
