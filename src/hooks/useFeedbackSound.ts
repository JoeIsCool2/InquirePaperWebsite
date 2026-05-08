import { useCallback, useRef } from 'react'
import { useAppState } from '@/context/AppStateContext'

/** Short pleasant tones; no external assets. */
export function useFeedbackSound() {
  const { settings } = useAppState()
  const ctxRef = useRef<AudioContext | null>(null)

  const play = useCallback(
    (kind: 'correct' | 'incorrect' | 'complete') => {
      if (!settings.sound) return
      try {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (!ctxRef.current) ctxRef.current = new Ctx()
        const ctx = ctxRef.current
        if (ctx.state === 'suspended') void ctx.resume()

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)

        const now = ctx.currentTime
        if (kind === 'correct') {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(523.25, now)
          osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.08)
          gain.gain.setValueAtTime(0.0001, now)
          gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02)
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
          osc.start(now)
          osc.stop(now + 0.2)
        } else if (kind === 'incorrect') {
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(220, now)
          osc.frequency.exponentialRampToValueAtTime(180, now + 0.12)
          gain.gain.setValueAtTime(0.0001, now)
          gain.gain.exponentialRampToValueAtTime(0.06, now + 0.02)
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)
          osc.start(now)
          osc.stop(now + 0.18)
        } else {
          osc.type = 'sine'
          osc.frequency.setValueAtTime(392, now)
          osc.frequency.setValueAtTime(523.25, now + 0.1)
          osc.frequency.setValueAtTime(659.25, now + 0.22)
          gain.gain.setValueAtTime(0.0001, now)
          gain.gain.exponentialRampToValueAtTime(0.09, now + 0.03)
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)
          osc.start(now)
          osc.stop(now + 0.48)
        }
      } catch {
        /* ignore */
      }
    },
    [settings.sound],
  )

  return play
}
