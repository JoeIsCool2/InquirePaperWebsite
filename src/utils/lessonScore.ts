export function starsFromMistakes(mistakes: number) {
  if (mistakes <= 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

export function xpFromStars(stars: number) {
  return 15 + stars * 5
}
