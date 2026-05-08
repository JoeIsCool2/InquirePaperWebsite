import { useState } from 'react'
import { Link } from 'react-router-dom'
import Disclaimer from '@/components/Disclaimer'
import { REFERENCES } from '@/data/references'

const SECTIONS = [
  {
    title: 'Opening frame',
    map: 'Genie / lamp metaphor; why “jobs” is the urgent lens; personal stake (training & AI use shifting).',
  },
  {
    title: 'Evidence & debate',
    map: 'Fishkin on hype vs tool; Prestianni headline automation forecasts; Ostertag snapshot of gains vs losses; Yale Budget Lab internet analogy.',
  },
  {
    title: 'Capability curve',
    map: 'Self-training loops (reporting on AZR-style ideas); cancer AI as example of hard problems—careful about inference vs proof.',
  },
  {
    title: 'Labor patterns',
    map: 'Urwin’s exposed vs resilient lists as examples; pattern synthesis; Talbot on meaning, boredom, and possible upsides/risks.',
  },
  {
    title: 'Closing stance',
    map: 'Georgieff & Hyee on task recomposition; Drago & Laine on human-centric economies; return to directed “cosmic powers.”',
  },
] as const

export default function PaperBridge() {
  const [refsOpen, setRefsOpen] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card glass">
        <p className="kicker">Bridge</p>
        <h1>Paper bridge</h1>
        <p className="lead">
          This page links the interactive path to the inquiry essay itself—what the essay argues, how it is organized, and
          where to find full references.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          <Link className="btn btn-primary" to="/path">
            Jump into lessons
          </Link>
          <button type="button" className="btn btn-ghost" onClick={() => setRefsOpen((o) => !o)}>
            {refsOpen ? 'Hide references' : 'Show full references'}
          </button>
        </div>
      </div>

      <div className="card glass">
        <h2>Thesis (in one place)</h2>
        <p>
          The essay argues that AI is reshaping how work is structured: some tasks and roles will shrink or transform,
          while new roles appear—but the pace, distribution, and meaning of that shift deserve careful evidence rather than
          pure hype or pure panic. The most urgent near-term question is <strong>jobs</strong>: who is affected, how
          transitions are managed, and what kinds of work remain deeply human.
        </p>
        <Disclaimer />
      </div>

      <div className="card glass">
        <h2>Section map</h2>
        <p className="lead" style={{ marginTop: 0 }}>
          Each row matches a movement of the essay; Inquiry Path units follow the same spine.
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--color-muted)' }}>
          {SECTIONS.map((s) => (
            <li key={s.title} style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: 'var(--color-text)' }}>{s.title}.</strong> {s.map}
            </li>
          ))}
        </ul>
      </div>

      {refsOpen ? (
        <div className="card glass">
          <h2>References</h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
            Copy shown here matches the companion bibliography. Always verify links and dates against the original sources
            and the published essay.
          </p>
          <ol className="ref-list" style={{ color: 'var(--color-text)' }}>
            {REFERENCES.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  )
}
