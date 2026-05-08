import type { Lesson } from '@/types/curriculum'

export type DepthLevel = 1 | 2 | 3

export function depthKey(unitId: string, lessonId: string, depth: DepthLevel) {
  return `${unitId}:${lessonId}:d${depth}`
}

/** Lesson L1 completion keys `unitId:lessonId` for crowns and path progress. */
export function l1CompletedMap(lessonDepthComplete: Record<string, boolean>): Record<string, boolean> {
  const out: Record<string, boolean> = {}
  for (const [k, v] of Object.entries(lessonDepthComplete)) {
    if (!v) continue
    const m = k.match(/^([\w-]+):([\w-]+):d1$/)
    if (m) out[`${m[1]}:${m[2]}`] = true
  }
  return out
}

export function stepsAtDepth(lesson: Lesson, depth: DepthLevel) {
  return lesson.depthLevels[depth - 1].steps
}

export function depthLabelAt(lesson: Lesson, depth: DepthLevel) {
  return lesson.depthLevels[depth - 1].label
}

export function lessonPath(unitId: string, lessonId: string, depth: DepthLevel) {
  return `/lesson/${unitId}/${lessonId}/${depth}`
}

export function nextPlayableDepth(
  unitId: string,
  lessonId: string,
  isDepthCompleteFn: (u: string, l: string, d: DepthLevel) => boolean,
): DepthLevel {
  if (!isDepthCompleteFn(unitId, lessonId, 1)) return 1
  if (!isDepthCompleteFn(unitId, lessonId, 2)) return 2
  return 3
}
