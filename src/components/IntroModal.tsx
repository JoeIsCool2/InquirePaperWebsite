import { useCallback } from 'react'
import Disclaimer from '@/components/Disclaimer'
import { useAppState } from '@/context/AppStateContext'
import { useDialogA11y } from '@/hooks/useDialogA11y'

export default function IntroModal() {
  const { seenIntro, setSeenIntro } = useAppState()
  const close = useCallback(() => setSeenIntro(true), [setSeenIntro])
  const open = !seenIntro
  const containerRef = useDialogA11y(open, close)

  if (seenIntro) return null

  return (
    <div ref={containerRef} className="modal-backdrop" onClick={close}>
      <div
        className="modal glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="intro-title">Welcome to Inquiry Path</h2>
        <p>
          This is a short, Duolingo-style companion to an inquiry paper about <strong>AI and jobs</strong>.
          You will move through bite-size steps: quick teaching cards and interactive checks.
        </p>
        <Disclaimer />
        <p style={{ marginBottom: '1rem', color: 'var(--color-muted)', fontSize: '0.95rem' }}>
          Progress and streaks save in this browser only (local storage).
        </p>
        <button type="button" className="btn btn-primary" onClick={close}>
          Start learning
        </button>
      </div>
    </div>
  )
}
