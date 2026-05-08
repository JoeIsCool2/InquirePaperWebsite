import { useAppState } from '@/context/AppStateContext'
import { useDialogA11y } from '@/hooks/useDialogA11y'

export default function SettingsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { settings, setSettings } = useAppState()
  const containerRef = useDialogA11y(open, onClose)

  if (!open) return null

  return (
    <div ref={containerRef} className="settings-root">
      <div className="settings-backdrop" onClick={onClose} aria-hidden />
      <aside
        className="settings-panel glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="settings-title">Settings</h2>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="toggle-row">
          <span>Sound effects</span>
          <button
            type="button"
            className={`toggle ${settings.sound ? 'on' : ''}`}
            aria-pressed={settings.sound}
            onClick={() => setSettings({ sound: !settings.sound })}
          >
            <span className="sr-only">Toggle sound</span>
          </button>
        </div>
        <div className="toggle-row">
          <span>Reduce motion</span>
          <button
            type="button"
            className={`toggle ${settings.reducedMotion ? 'on' : ''}`}
            aria-pressed={settings.reducedMotion}
            onClick={() => setSettings({ reducedMotion: !settings.reducedMotion })}
          >
            <span className="sr-only">Toggle reduce motion</span>
          </button>
        </div>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem', marginTop: 'auto' }}>
          Sound uses short tones generated in the browser—no downloads required.
        </p>
      </aside>
    </div>
  )
}
