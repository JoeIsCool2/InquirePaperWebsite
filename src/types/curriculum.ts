export type TeachStep = {
  id: string
  type: 'teach'
  title?: string
  body: string
  paperRef?: string
  glossaryTerms?: string[]
}

export type McqStep = {
  id: string
  type: 'mcq'
  prompt: string
  options: { id: string; label: string }[]
  correctId: string
  explain: string
  hint?: string
  glossaryTerms?: string[]
}

export type MatchStep = {
  id: string
  type: 'match'
  prompt: string
  left: { id: string; text: string }[]
  right: { id: string; text: string }[]
  /** correct: leftId -> rightId */
  answer: Record<string, string>
  explain: string
}

export type SortStep = {
  id: string
  type: 'sort'
  prompt: string
  buckets: { id: string; label: string }[]
  items: { id: string; text: string; bucketId: string }[]
  explain: string
}

export type OverclaimStep = {
  id: string
  type: 'overclaim'
  prompt: string
  sourceNote: string
  options: { id: string; text: string; kind: 'fair' | 'too_strong' }[]
  correctId: string
  explain: string
}

export type ScenarioStep = {
  id: string
  type: 'scenario'
  setup: string
  prompt: string
  options: { id: string; label: string }[]
  correctId: string
  explain: string
}

export type TriageStep = {
  id: string
  type: 'triage'
  claim: string
  prompt: string
  sources: { id: string; label: string; description: string }[]
  correctSourceId: string
  explain: string
}

export type CedBucketId = 'claim' | 'evidence' | 'interpretation'

export type CedStep = {
  id: string
  type: 'ced'
  prompt: string
  items: { id: string; text: string; bucketId: CedBucketId }[]
  explain: string
}

export type LessonStep =
  | TeachStep
  | McqStep
  | MatchStep
  | SortStep
  | OverclaimStep
  | ScenarioStep
  | TriageStep
  | CedStep

export type LessonDepth = {
  label: string
  steps: LessonStep[]
}

export type Lesson = {
  id: string
  title: string
  blurb: string
  /** Rough session length for UI */
  estimatedMinutes?: number
  /** Three stacked passes: Foundations → Deeper → Advanced */
  depthLevels: [LessonDepth, LessonDepth, LessonDepth]
}

export type Unit = {
  id: string
  title: string
  subtitle: string
  lessons: Lesson[]
}

export const PATH_ID = 'ai-jobs-inquiry' as const
