import GlossaryChips from '@/components/GlossaryChips'
import type { TeachStep } from '@/types/curriculum'

export default function TeachStepView({ step }: { step: TeachStep }) {
  return (
    <div className="card glass step-card">
      {step.title ? <h3 className="step-title">{step.title}</h3> : null}
      <p className="step-body">{step.body}</p>
      {step.paperRef ? (
        <p className="paper-ref">
          <strong>Inquiry paper:</strong> {step.paperRef}
        </p>
      ) : null}
      {step.glossaryTerms?.length ? <GlossaryChips terms={step.glossaryTerms} /> : null}
    </div>
  )
}
