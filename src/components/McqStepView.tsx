import { useEffect, useId, useState } from 'react'
import GlossaryChips from '@/components/GlossaryChips'
import { useFeedbackSound } from '@/hooks/useFeedbackSound'
import type { McqStep } from '@/types/curriculum'

type Props = {
  step: McqStep
  onSolved: () => void
  onMistake?: () => void
}

export default function McqStepView({ step, onSolved, onMistake }: Props) {
  const sound = useFeedbackSound()
  const [selected, setSelected] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const liveId = useId()

  useEffect(() => {
    setSelected(null)
    setChecked(false)
  }, [step.id])

  const correct = selected === step.correctId

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

  return (
    <div className="card glass step-card">
      <h3 className="step-title" id={`${liveId}-prompt`}>
        {step.prompt}
      </h3>
      {step.glossaryTerms?.length ? <GlossaryChips terms={step.glossaryTerms} /> : null}
      <div className="option-grid" role="group" aria-labelledby={`${liveId}-prompt`}>
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
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={check} disabled={!selected}>
            Check
          </button>
          {step.hint ? (
            <span style={{ alignSelf: 'center', color: 'var(--color-muted)', fontSize: '0.95rem' }}>
              Hint: {step.hint}
            </span>
          ) : null}
        </div>
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
          <strong>Nice.</strong> {step.explain}
        </div>
      )}
    </div>
  )
}
