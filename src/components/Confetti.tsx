import { useMemo } from 'react'

export default function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        i,
        left: `${(i * 17) % 100}%`,
        delay: `${(i % 8) * 0.04}s`,
        hue: (i * 47) % 360,
      })),
    [],
  )

  if (!active) return null

  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.i}
          style={{
            left: p.left,
            animationDelay: p.delay,
            background: `hsl(${p.hue} 85% 60%)`,
          }}
        />
      ))}
    </div>
  )
}
