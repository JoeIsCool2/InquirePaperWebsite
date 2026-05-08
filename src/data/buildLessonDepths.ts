import type { Lesson, LessonStep, Unit } from '@/types/curriculum'

export type LessonRaw = {
  id: string
  title: string
  blurb: string
  estimatedMinutes?: number
  steps: LessonStep[]
}

export type UnitRaw = {
  id: string
  title: string
  subtitle: string
  lessons: LessonRaw[]
}

function prefixDepth1Steps(steps: LessonStep[]): LessonStep[] {
  return steps.map((s) => ({ ...s, id: `d1-${s.id}` } as LessonStep))
}

function genericDepth2(title: string, blurb: string): LessonStep[] {
  return [
    {
      id: 'd2-s1',
      type: 'teach',
      title: 'Level 2: push past the headline',
      body: `You finished the foundations of “${title}.” This pass asks: Where could a careful reader disagree? What would extra evidence change? Keep the essay’s spine—${blurb}`,
    },
    {
      id: 'd2-s2',
      type: 'mcq',
      prompt: 'In inquiry writing, “going deeper” usually means:',
      options: [
        { id: 'a', label: 'Adding more adjectives so it sounds smarter' },
        { id: 'b', label: 'Separating what sources show from what you infer—and naming uncertainty' },
        { id: 'c', label: 'Dropping sources so the story stays clean' },
      ],
      correctId: 'b',
      explain: 'Depth is epistemic discipline: stronger claims need stronger, specific support.',
    },
    {
      id: 'd2-s3',
      type: 'sort',
      prompt: 'Sort: stronger vs weaker moves when a topic is contested.',
      buckets: [
        { id: 'strong', label: 'Strong inquiry habit' },
        { id: 'weak', label: 'Usually weak under scrutiny' },
      ],
      items: [
        { id: 'd2-i1', text: 'Name the mechanism (why X could happen), not just the vibe', bucketId: 'strong' },
        { id: 'd2-i2', text: 'Treat one viral chart as settled truth for everyone', bucketId: 'weak' },
        { id: 'd2-i3', text: 'Compare sources that measure different things—and say so', bucketId: 'strong' },
        { id: 'd2-i4', text: 'Hide disagreements so the conclusion feels inevitable', bucketId: 'weak' },
      ],
      explain: 'Deeper levels reward honest scope: what we know, what we don’t, and what would update our view.',
    },
  ]
}

function genericDepth3(title: string, _blurb: string): LessonStep[] {
  return [
    {
      id: 'd3-s1',
      type: 'teach',
      title: 'Level 3: apply under pressure',
      body: `Short synthesis round for “${title}.” You will sort claim vs evidence vs interpretation, then decide in a tight scenario—like explaining the idea to someone who only skimmed the news.`,
    },
    {
      id: 'd3-s2',
      type: 'ced',
      prompt: 'Label each line for this topic.',
      items: [
        {
          id: 'd3-c1',
          text: 'The essay stresses near-term labor transitions, not every sci-fi risk at once.',
          bucketId: 'claim',
        },
        {
          id: 'd3-e1',
          text: 'A source reports measured hiring, displacement, or task-mix shifts in a given year or sector.',
          bucketId: 'evidence',
        },
        {
          id: 'd3-i1',
          text: 'So readers should weigh pace and distribution—who is helped, who is squeezed—before betting on a single future.',
          bucketId: 'interpretation',
        },
      ],
      explain: 'Claim = stance. Evidence = what a source establishes. Interpretation = the “so what?” you draw carefully.',
    },
    {
      id: 'd3-s3',
      type: 'scenario',
      setup:
        'A friend says: “AI will obviously destroy all jobs in two years—everyone says so online.” You want to respond in one sentence like the essay would.',
      prompt: 'Which reply best matches proportional, evidence-led inquiry?',
      options: [
        { id: 'a', label: '“You’re right—panic is always correct.”' },
        {
          id: 'b',
          label:
            '“Big shifts are plausible, but timelines and distribution vary by task and sector—sources disagree, so I’d want specifics.”',
        },
        { id: 'c', label: '“If you’re worried, just ignore data.”' },
      ],
      correctId: 'b',
      explain: 'Advanced depth keeps hope and caution honest: acknowledge stakes without outrunning evidence.',
    },
  ]
}

/** Richer template for the first lesson (Genie frame). */
const depth2ByLesson: Partial<Record<string, LessonStep[]>> = {
  'u1-l1': [
    {
      id: 'd2-s1',
      type: 'teach',
      title: 'Dependence vs autonomy',
      body: 'Level 2 sharpens the Genie frame: the lamp is not “safety,” it is partnership—capability routed through human direction. The deeper question is what changes if models need less day-to-day human steering for some tasks.',
      paperRef: 'Opening & personal stake (iOS class / eight-month shift)',
    },
    {
      id: 'd2-s2',
      type: 'mcq',
      prompt: 'If “human in the loop” shrinks for some workflows, the essay’s urgency about jobs is mainly because:',
      options: [
        { id: 'a', label: 'Work is where most people meet technology in daily life' },
        { id: 'b', label: 'Sci‑fi villains are now confirmed real' },
        { id: 'c', label: 'Employers never adopt tools' },
      ],
      correctId: 'a',
      explain: 'Labor is the near-term social interface: wages, tasks, hiring, and retraining show up before long-horizon risks do.',
    },
    {
      id: 'd2-s3',
      type: 'overclaim',
      prompt: 'Which line is too strong for a careful inquiry conclusion right now?',
      sourceNote: 'Match strength of claim to strength of evidence.',
      options: [
        {
          id: 'fair',
          text: 'Capability and autonomy are moving targets; labor impacts deserve evidence, not vibes.',
          kind: 'fair',
        },
        {
          id: 'strong',
          text: 'We know every job category will vanish on a fixed date worldwide.',
          kind: 'too_strong',
        },
      ],
      correctId: 'strong',
      explain: 'Deeper levels practice humility: timelines and distribution are exactly what sources fight about.',
    },
  ],
  'u1-l2': [
    {
      id: 'd2-s1',
      type: 'teach',
      title: 'Audience in public inquiry',
      body: 'This companion is for many readers—students comparing sources, teachers using it in class, curious adults—not a private draft. Level 2 checks what “success” means on a short path: skills, not swagger.',
    },
    {
      id: 'd2-s2',
      type: 'mcq',
      prompt: 'A good outcome after a few reps is closest to:',
      options: [
        { id: 'a', label: 'Memorizing one slogan' },
        { id: 'b', label: 'Tracing thesis ↔ evidence ↔ limits with specific sources in mind' },
        { id: 'c', label: 'Winning an argument without reading' },
      ],
      correctId: 'b',
      explain: 'Public inquiry rewards traceability: you can point to what supports what—and where it gets thin.',
    },
    {
      id: 'd2-s3',
      type: 'scenario',
      setup:
        'Someone dismisses the whole essay because “AI changes weekly.” You want a proportionate reply that matches the essay’s stance.',
      prompt: 'Which response fits?',
      options: [
        { id: 'a', label: '“So nothing is knowable—give up.”' },
        {
          id: 'b',
          label: '“Pace is fast, which is why we pair claims with dated, sourced labor evidence—not vibes.”',
        },
        { id: 'c', label: '“Only CEOs are allowed to read.”' },
      ],
      correctId: 'b',
      explain: 'Fast-moving tech makes epistemic discipline more important, not less.',
    },
  ],
}

const depth3ByLesson: Partial<Record<string, LessonStep[]>> = {
  'u1-l1': [
    {
      id: 'd3-s1',
      type: 'teach',
      title: 'Stress-test the metaphor',
      body: 'Level 3: use the Genie/lamp as a thinking tool, not a prophecy. If partnership frays for some tasks, what would you want policymakers and workplaces to measure first?',
    },
    {
      id: 'd3-s2',
      type: 'triage',
      claim: 'We should prioritize near-term job impacts because that is where technology meets most people’s daily security.',
      prompt: 'Which line best supports prioritizing jobs as a lens (even if other risks are real)?',
      sources: [
        {
          id: 'jobs',
          label: 'Jobs lens',
          description: 'Hiring, wages, task design, and retraining show up in household budgets quickly.',
        },
        {
          id: 'sci',
          label: 'Far sci‑fi only',
          description: 'Focuses only on speculative extinction events with no labor-market bridge.',
        },
        {
          id: 'brand',
          label: 'Marketing hype',
          description: 'Claims from ads about “full automation tomorrow” without measured labor proof.',
        },
      ],
      correctSourceId: 'jobs',
      explain: 'The essay’s pivot is pragmatic: near-term labor evidence is legible to public debate.',
    },
    {
      id: 'd3-s3',
      type: 'mcq',
      prompt: '“Augmentation” vs full removal of the loop matters here because:',
      options: [
        { id: 'a', label: 'It changes who is legally liable for mistakes' },
        {
          id: 'b',
          label: 'It changes training design, oversight burdens, and who captures productivity gains',
        },
        { id: 'c', label: 'It is only a branding difference' },
      ],
      correctId: 'b',
      explain: 'Advanced synthesis ties technical reality to workplace institutions—not just vocabulary.',
    },
  ],
  'u1-l2': [
    {
      id: 'd3-s1',
      type: 'teach',
      title: 'Using this site responsibly',
      body: 'Level 3: the companion is illustrative. In real coursework or career choices, you still need primary sources, instructors, and context.',
    },
    {
      id: 'd3-s2',
      type: 'ced',
      prompt: 'Sort lines about this companion’s role.',
      items: [
        {
          id: 'd3-c1',
          text: 'It should help you practice reading moves, not replace advisors or primary texts.',
          bucketId: 'claim',
        },
        {
          id: 'd3-e1',
          text: 'Interactives illustrate themes from the inquiry essay with citations in the bridge page.',
          bucketId: 'evidence',
        },
        {
          id: 'd3-i1',
          text: 'So treat it as a gym for argument tracing—not a single oracle for your future.',
          bucketId: 'interpretation',
        },
      ],
      explain: 'Mature readers separate what the tool is for (practice) from what it cannot be (final authority).',
    },
    {
      id: 'd3-s3',
      type: 'mcq',
      prompt: 'If a quiz option here disagrees with your instructor’s emphasis, you should:',
      options: [
        { id: 'a', label: 'Assume the site is always right' },
        { id: 'b', label: 'Ask why, compare sources, and align with course expectations' },
        { id: 'c', label: 'Stop reading entirely' },
      ],
      correctId: 'b',
      explain: 'Classroom inquiry wins when students triangulate tools, texts, and feedback.',
    },
  ],
}

export function toLesson(raw: LessonRaw): Lesson {
  const depth2 = depth2ByLesson[raw.id] ?? genericDepth2(raw.title, raw.blurb)
  const depth3 = depth3ByLesson[raw.id] ?? genericDepth3(raw.title, raw.blurb)
  return {
    id: raw.id,
    title: raw.title,
    blurb: raw.blurb,
    estimatedMinutes: raw.estimatedMinutes,
    depthLevels: [
      { label: 'Foundations', steps: prefixDepth1Steps(raw.steps) },
      { label: 'Deeper', steps: depth2 },
      { label: 'Advanced', steps: depth3 },
    ],
  }
}

export function mapUnitsRaw(units: UnitRaw[]): Unit[] {
  return units.map((u) => ({
    ...u,
    lessons: u.lessons.map(toLesson),
  }))
}
