import { IconTrophy } from '@/components/icons'
import { ACHIEVEMENTS, type AchievementId } from '@/data/achievements'
import { useDialogA11y } from '@/hooks/useDialogA11y'

type Props = {
  open: boolean
  onClose: () => void
  unlocked: Partial<Record<AchievementId, true>>
}

export default function AchievementsModal({ open, onClose, unlocked }: Props) {
  const containerRef = useDialogA11y(open, onClose)

  if (!open) return null

  return (
    <div ref={containerRef} className="modal-backdrop" onClick={onClose}>
      <div
        className="modal glass modal--wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ach-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <h2 id="ach-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            <IconTrophy /> Achievements
          </h2>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <ul className="ach-list">
          {ACHIEVEMENTS.map((a) => {
            const on = Boolean(unlocked[a.id])
            return (
              <li key={a.id} className={'ach-item' + (on ? ' ach-item--on' : '')}>
                <span className="ach-badge" aria-hidden>
                  {on ? '✓' : '○'}
                </span>
                <div>
                  <div className="ach-title">{a.title}</div>
                  <div className="ach-desc">{a.description}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
