import { Link } from 'react-router-dom'
import { GLOSSARY } from '@/data/glossary'
import { glossaryTermAnchorId } from '@/data/glossarySlugs'

export default function GlossaryChips({ terms }: { terms: string[] }) {
  if (!terms.length) return null
  return (
    <div className="glossary-inline">
      {terms.map((t) => {
        const id = glossaryTermAnchorId(t)
        const def = GLOSSARY[t] ?? t
        return (
          <Link
            key={t}
            to={`/glossary#${id}`}
            className="glossary-pill"
            title={def}
            aria-label={`Glossary: ${t}. ${def}`}
          >
            {t}
          </Link>
        )
      })}
    </div>
  )
}
