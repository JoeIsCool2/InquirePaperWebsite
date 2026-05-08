import { useEffect, useId, useState } from 'react'
import { useFeedbackSound } from '@/hooks/useFeedbackSound'
import type { ScenarioStep } from '@/types/curriculum'

type Props = {
  step: ScenarioStep
  onSolved: () => void
  onMistake?: () => void
}

export default function ScenarioStepView({ step, onSolved, onMistake }: Props) {
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
    const isRight = selected === step.correctId
    setChecked(true)
    if (isRight) {
      sound('correct')
      onSolved()
    } else {
      sound('incorrect')
      onMistake?.()
    }
  }

  const correct = checked && selected === step.correctId

  return (
    <div className="card glass step-card">
      <p className="scenario-setup">{step.setup}</p>
      <h3 className="step-title" id={`${liveId}-p`}>
        {step.prompt}
      </h3>
      <div className="option-grid" role="group" aria-labelledby={`${liveId}-p`}>
        {step.options.map((o) => {
          let cls = 'option-btn'
          if (selected === o.id) cls += ' selected'
          if (checked) {
            if (o.id === step.correctId) cls += ' correct'
            else if (o.id === selected) cls += ' incorrect'
          }
          return (
            <button
              key={o.id}
              type="button"
              className={cls}
              onClick={() => !checked && setSelected(o.id)}
              disabled={checked}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      {!checked ? (
        <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={check} disabled={!selected}>
          Check
        </button>
      ) : !correct ? (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="feedback" role="status" aria-live="polite">
            <strong>Not quite.</strong> {step.explain}
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
          <strong>Nice read.</strong> {step.explain}
        </div>
      )}
    </div>
  )
}
