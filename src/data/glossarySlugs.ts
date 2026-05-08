/** Stable fragment for /glossary#... anchors */
export function glossaryTermAnchorId(term: string) {
  const slug = term
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  return slug || 'term'
}
