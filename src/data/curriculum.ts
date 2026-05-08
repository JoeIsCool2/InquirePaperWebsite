import type { Unit } from '@/types/curriculum'

export const UNITS: Unit[] = [
  {
    id: 'u1',
    title: "What's at stake",
    subtitle: 'Framing the question: tools, dependence, and why jobs matter now',
    lessons: [
      {
        id: 'u1-l1',
        title: 'The Genie frame',
        blurb: 'A metaphor for dependence—and what changes when AI needs us less.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Technology needs people—until it doesn’t',
            body:
              'In the inquiry essay, the Genie is powerful but stuck without a human partner. That mirrors an older story about tech: tools amplify people, but they still need human direction. The essay argues AI is beginning to change that balance—so the urgent social question becomes work: who gains, who loses, and how fast.',
            paperRef: 'Opening & personal stake (iOS class / eight-month shift)',
            glossaryTerms: ['augmentation'],
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'In the essay’s framing, what does the lamp mainly represent?',
            options: [
              { id: 'a', label: 'A physical object from a movie' },
              { id: 'b', label: 'The limit on power without human partnership' },
              { id: 'c', label: 'A prediction that AI will become evil' },
            ],
            correctId: 'b',
            hint: 'Think about what the Genie cannot do alone.',
            explain:
              'The lamp is the constraint: huge capability still depends on a human “handler.” The essay uses that to introduce why AI’s growing autonomy matters.',
          },
          {
            id: 's3',
            type: 'teach',
            title: 'Why “jobs” is the urgent lens',
            body:
              'Big fears about AI range from misinformation to superintelligence. Those matter—but the essay focuses on employment because work is where most people meet technology in daily life. Shifts in hiring, wages, and task design show up as rent, stress, and opportunity long before sci‑fi scenarios do.',
            paperRef: 'Thesis pivot: jobs as the most urgent issue',
          },
          {
            id: 's4',
            type: 'sort',
            prompt: 'Sort each line into the bucket that fits the essay’s emphasis.',
            buckets: [
              { id: 'urgent', label: 'Essay treats as most urgent (for now)' },
              { id: 'real', label: 'Real concern, but not the essay’s main focus' },
            ],
            items: [
              { id: 'i1', text: 'Which roles are automated or reshaped first', bucketId: 'urgent' },
              { id: 'i2', text: 'Whether AI might someday surpass humans', bucketId: 'real' },
              { id: 'i3', text: 'How workers retrain and move between tasks', bucketId: 'urgent' },
              { id: 'i4', text: 'Every possible sci‑fi risk simultaneously', bucketId: 'real' },
            ],
            explain:
              'The essay doesn’t dismiss long‑run risks; it prioritizes labor impacts you can already see in policy, hiring, and training.',
          },
          {
            id: 's5',
            type: 'mcq',
            prompt: '“Augmentation” in this companion means:',
            options: [
              { id: 'a', label: 'Replacing every human task with software' },
              { id: 'b', label: 'AI helping a human do work better or faster' },
              { id: 'c', label: 'Adding more meetings to the workday' },
            ],
            correctId: 'b',
            explain: 'Augmentation keeps a human in the loop; automation tries to remove the loop.',
          },
        ],
      },
      {
        id: 'u1-l2',
        title: 'Audience & purpose',
        blurb: 'Who this companion is for—and what you can do after one short path.',
        estimatedMinutes: 5,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Who this is for',
            body:
              'This webapp is for readers who want a guided tour of one writer’s inquiry: how AI may change jobs, what sources say, and where the argument lands. It is a study companion—not career advice and not a forecast.',
            paperRef: 'Companion purpose statement',
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'After ~10 minutes on this path, you should be able to:',
            options: [
              { id: 'a', label: 'Replace your teacher’s grading rubric' },
              {
                id: 'b',
                label: 'Summarize the essay’s main reasons and how key sources support them',
              },
              { id: 'c', label: 'Prove exactly how many jobs will exist in 2035' },
            ],
            correctId: 'b',
            explain:
              'An inquiry essay argues with evidence; it doesn’t deliver certainty about the future.',
          },
          {
            id: 's3',
            type: 'overclaim',
            prompt: 'Which sentence is too strong for a careful inquiry conclusion?',
            sourceNote: 'General writing rule: match strength of claim to strength of evidence.',
            options: [
              {
                id: 'fair',
                text: 'AI will likely change task mix in many jobs; workers may need new skills.',
                kind: 'fair',
              },
              {
                id: 'strong',
                text: 'We know for certain every employer will cut payroll by 40% before 2027.',
                kind: 'too_strong',
              },
              {
                id: 'fair2',
                text: 'Some sources disagree about pace; the essay weighs competing views.',
                kind: 'fair',
              },
            ],
            correctId: 'strong',
            explain:
              '“Know for certain” + a precise global number is almost always stronger than labor‑market evidence can support.',
          },
        ],
      },
      {
        id: 'u1-l3',
        title: 'Vocab & scenarios',
        blurb: 'Practice C-E-I sorting and a real workplace vignette.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Three buckets writers use',
            body:
              'Strong inquiry separates what you are arguing (claim), what a source actually establishes (evidence), and what you conclude from that evidence in your own voice (interpretation). Mixing them up is how arguments accidentally overclaim.',
            paperRef: 'Discourse basics (used across the essay)',
            glossaryTerms: ['interpretation'],
          },
          {
            id: 's2',
            type: 'ced',
            prompt: 'Sort each line into Claim, Evidence, or Interpretation.',
            items: [
              {
                id: 'i1',
                text: 'The essay treats near-term job impacts as the most urgent lens.',
                bucketId: 'claim',
              },
              {
                id: 'i2',
                text: 'ITIF reports a year where AI-related job creation exceeded AI-related displacement in their framing.',
                bucketId: 'evidence',
              },
              {
                id: 'i3',
                text: 'So we should read “headline ratios” as snapshots, not destiny.',
                bucketId: 'interpretation',
              },
            ],
            explain:
              'Evidence cites what a source measured; interpretation explains why it matters for the argument; claim states the essay’s position.',
          },
          {
            id: 's3',
            type: 'scenario',
            setup:
              'A retail worker spends most shifts answering the same fifteen questions with scripts. Management pilots an AI assistant that drafts replies; humans still approve sends.',
            prompt: 'In the essay’s pattern language, this situation is closest to:',
            options: [
              { id: 'a', label: 'Pure displacement overnight—no humans involved' },
              { id: 'b', label: 'Task shift: repetitive information work is partially automated in slices' },
              { id: 'c', label: 'A job that is “immune” because it uses language' },
            ],
            correctId: 'b',
            explain:
              'Pattern thinking focuses on how structured and repetitive the work is. Language alone does not make a role “immune.”',
          },
          {
            id: 's4',
            type: 'mcq',
            prompt: '“Occupational mix” refers to:',
            options: [
              { id: 'a', label: 'How one CEO mixes meeting types' },
              { id: 'b', label: 'How job categories across the economy shift over time' },
              { id: 'c', label: 'A playlist of careers on TikTok' },
            ],
            correctId: 'b',
            explain: 'It is a macro idea: which kinds of jobs exist, not one person’s schedule.',
            glossaryTerms: ['occupational mix'],
          },
        ],
      },
    ],
  },
  {
    id: 'u2',
    title: 'Claims & evidence',
    subtitle: 'Marketing vs research, headline stats, and historical analogy',
    lessons: [
      {
        id: 'u2-l1',
        title: 'Hype vs. careful claims',
        blurb: 'Fishkin’s warning: some “AI will replace everything” talk is sales, not science.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Fishkin: powerful rhetoric, limited proof',
            body:
              'Rand Fishkin argues some “AI will replace all jobs” narratives function as marketing—making tools look inevitable and omnipotent. That doesn’t mean AI changes nothing; it means we should separate demo energy from measured labor evidence.',
            paperRef: 'Fishkin (SparkToro)',
            glossaryTerms: ['hype'],
          },
          {
            id: 's2',
            type: 'match',
            prompt: 'Match the idea to the voice the essay uses.',
            left: [
              { id: 'l1', text: '“Replace all jobs” talk can be strategic hype' },
              { id: 'l2', text: 'AI can still be a serious workplace tool' },
            ],
            right: [
              { id: 'r1', text: 'Fishkin' },
              { id: 'r2', text: 'The essay’s author (both can be true)' },
            ],
            answer: { l1: 'r1', l2: 'r2' },
            explain:
              'Fishkin targets exaggerated claims; the essay still treats AI as transformative—but asks what we can actually show with evidence.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'If a CEO demo implies “full replacement in months,” a skeptical reader should ask:',
            options: [
              { id: 'a', label: 'Whether the story sells product' },
              { id: 'b', label: 'What independent labor data shows' },
              { id: 'c', label: 'Both A and B' },
            ],
            correctId: 'c',
            explain: 'Incentives and evidence are different lenses; strong inquiry uses both.',
          },
        ],
      },
      {
        id: 'u2-l2',
        title: 'Stats & the internet analogy',
        blurb: 'Prestianni, Ostertag, and Yale: how to read numbers without overstating them.',
        estimatedMinutes: 8,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Headline percentages',
            body:
              'Prestianni summarizes forecasts that a large share of “current U.S. jobs” could face automation pressure by 2030. The essay stresses wording: “current jobs” is not the same as “every worker unemployed tomorrow.”',
            paperRef: 'Prestianni (National University blog)',
            glossaryTerms: ['automation'],
          },
          {
            id: 's2',
            type: 'teach',
            title: 'Gains vs losses (one snapshot)',
            body:
              'Ostertag (ITIF) compares AI‑related job creation and displacement figures for a recent year. The essay uses this to show a pattern: new roles appear even as some tasks shrink—but asks whether AI’s curve will follow older tech waves.',
            paperRef: 'Ostertag (ITIF)',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'Why does the essay pair “jobs created” with “jobs lost”?',
            options: [
              { id: 'a', label: 'To pretend no one is harmed' },
              { id: 'b', label: 'To show labor change is rearrangement, not a single headline number' },
              { id: 'c', label: 'To prove net jobs always rise forever' },
            ],
            correctId: 'b',
            explain:
              'Net effects matter, but so do who is affected, how fast, and whether new jobs fit displaced workers’ skills.',
          },
          {
            id: 's4',
            type: 'teach',
            title: 'Yale Budget Lab: slow occupational mix shifts',
            body:
              'The essay cites Yale Budget Lab work suggesting the internet era did not instantly rewrite the occupational mix; change accumulated gradually. The analogy is cautionary: big narratives can outrun measured shifts—yet AI may still differ in speed and scope.',
            paperRef: 'Yale Budget Lab labor market note',
            glossaryTerms: ['occupational mix'],
          },
          {
            id: 's5',
            type: 'overclaim',
            prompt: 'Which claim goes beyond what a single-year jobs snapshot can prove?',
            sourceNote: 'Think: one year of “created vs lost” numbers.',
            options: [
              {
                id: 'fair',
                text: 'In that snapshot, created roles outnumbered lost roles in the study’s framing.',
                kind: 'fair',
              },
              {
                id: 'strong',
                text: 'Therefore the same ratio is guaranteed every future year for all countries.',
                kind: 'too_strong',
              },
              {
                id: 'fair2',
                text: 'We should ask what kinds of jobs those are and who can access them.',
                kind: 'fair',
              },
            ],
            correctId: 'strong',
            explain:
              'A snapshot supports a snapshot conclusion—not a universal law. Inquiry language stays proportional.',
          },
        ],
      },
      {
        id: 'u2-l3',
        title: 'Source triage',
        blurb: 'Match evidence to the claim it best supports.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Why triage matters',
            body:
              'Inquiry is not “collect quotes.” It is choosing which sources best justify which parts of your argument—especially when sources disagree or measure different things.',
            paperRef: 'Evidence use across Fishkin / ITIF / Yale',
          },
          {
            id: 's2',
            type: 'triage',
            claim: 'Some “AI will replace all jobs” talk functions more like marketing than measured labor proof.',
            prompt: 'Which source family best backs that specific claim?',
            sources: [
              {
                id: 'fishkin',
                label: 'Fishkin (SparkToro)',
                description: 'Critiques hype narratives and incentives around inevitability framing.',
              },
              {
                id: 'ostertag',
                label: 'Ostertag (ITIF)',
                description: 'Compares AI-related job creation vs displacement in a recent snapshot.',
              },
              {
                id: 'yale',
                label: 'Yale Budget Lab',
                description: 'Discusses gradual occupational mix change after major tech waves.',
              },
            ],
            correctSourceId: 'fishkin',
            explain:
              'Fishkin’s piece targets rhetorical and marketing dynamics. ITIF and Yale help with different sub-claims about measured change.',
          },
          {
            id: 's3',
            type: 'triage',
            claim: 'A single year’s “jobs created vs lost” numbers should not be read as a permanent law for all countries.',
            prompt: 'Which line of reasoning does the companion emphasize for this caution?',
            sources: [
              {
                id: 'snapshot',
                label: 'Snapshot logic',
                description: 'A measurement covers a time window; extrapolation needs extra justification.',
              },
              {
                id: 'ceo',
                label: 'CEO charisma',
                description: 'Leaders are always optimistic; ignore all data.',
              },
              {
                id: 'vibes',
                label: 'Vibes-only futurism',
                description: 'If it feels futuristic, it must be true.',
              },
            ],
            correctSourceId: 'snapshot',
            explain:
              'The essay’s caution is epistemic: strong conclusions need proportional evidence—not vibes.',
          },
          {
            id: 's4',
            type: 'mcq',
            prompt: 'Urwin-style lists of “exposed jobs” are best treated as:',
            options: [
              { id: 'a', label: 'A guaranteed firing schedule for named people' },
              { id: 'b', label: 'Pattern maps to start thinking about tasks and adoption' },
              { id: 'c', label: 'Proof that nurses will be automated next week' },
            ],
            correctId: 'b',
            explain: 'Lists summarize common discussions; the essay stresses patterns, not fate.',
          },
        ],
      },
    ],
  },
  {
    id: 'u3',
    title: 'Capability curve',
    subtitle: 'When training loops change—and what cancer research really shows',
    lessons: [
      {
        id: 'u3-l1',
        title: 'Less human in the loop?',
        blurb: 'Self-generated training as a different kind of acceleration.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'From tool to self-training loop',
            body:
              'The essay cites reporting on models that generate their own practice problems (e.g., “Absolute Zero Reasoner” style ideas). If less human labeling is required for improvement, the “Genie needs a master” story weakens—raising stakes for labor and safety.',
            paperRef: 'The PyCoach / Medium reporting',
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'Why does self-training matter for the jobs debate?',
            options: [
              { id: 'a', label: 'It guarantees unemployment for all programmers next month' },
              {
                id: 'b',
                label: 'It can change how fast capabilities improve and how much human oversight is embedded',
              },
              { id: 'c', label: 'It proves AI has feelings' },
            ],
            correctId: 'b',
            explain:
              'The claim is about the shape of progress—not a dated prediction about one occupation.',
          },
          {
            id: 's3',
            type: 'sort',
            prompt: 'Sort these as “tool framing” vs “autonomy framing” as the essay uses them.',
            buckets: [
              { id: 'tool', label: 'Tool framing (human directs)' },
              { id: 'auto', label: 'Autonomy framing (less human direction)' },
            ],
            items: [
              { id: 'i1', text: 'Copilot assists a developer who still decides architecture', bucketId: 'tool' },
              { id: 'i2', text: 'Model improves by generating its own exercises with less labeling', bucketId: 'auto' },
              { id: 'i3', text: 'Spreadsheet formulas recalc when a human enters data', bucketId: 'tool' },
            ],
            explain:
              'The essay uses both frames to explain why “just a tool” may be incomplete as a long-run description.',
          },
        ],
      },
      {
        id: 'u3-l2',
        title: 'Cancer AI: promise vs proof',
        blurb: 'Practice separating what trials show from what hope projects.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'What CRI emphasizes now',
            body:
              'The Cancer Research Institute describes AI helping process data, spot patterns, and support predictions—especially around detection and, prospectively, prevention research. That’s meaningful, but it’s not the same as “AI cured cancer.”',
            paperRef: 'Cancer Research Institute blog overview',
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'The essay uses cancer research mainly to show:',
            options: [
              { id: 'a', label: 'Hospitals never need doctors' },
              { id: 'b', label: 'AI can tackle hard, high-stakes problems—so labor impacts may be broad' },
              { id: 'c', label: 'Biology is easy' },
            ],
            correctId: 'b',
            explain:
              'The rhetorical move is scale and difficulty: if AI helps here, we should take workforce implications seriously.',
          },
          {
            id: 's3',
            type: 'overclaim',
            prompt: 'Which statement overclaims based on typical “pattern finding” AI tasks?',
            sourceNote: 'Pattern finding ≠ guaranteed clinical outcomes everywhere.',
            options: [
              {
                id: 'fair',
                text: 'AI can help researchers prioritize patterns in large datasets.',
                kind: 'fair',
              },
              {
                id: 'strong',
                text: 'Therefore AI has already eliminated all cancer mortality worldwide.',
                kind: 'too_strong',
              },
              {
                id: 'fair2',
                text: 'Real benefits still require validation, deployment, and equity of access.',
                kind: 'fair',
              },
            ],
            correctId: 'strong',
            explain:
              'Strong inquiry keeps claims proportional—especially with human health stakes.',
          },
        ],
      },
      {
        id: 'u3-l3',
        title: 'Inference gym',
        blurb: 'Hard problems, junior dev work, and what sources do vs what you infer.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'scenario',
            setup:
              'A new bootcamp grad mostly writes small UI fixes from tickets, copies error logs into search, and pastes suggested patches after an AI autocomplete.',
            prompt: 'Compared with senior architecture work, this role’s tasks are closer to:',
            options: [
              { id: 'a', label: 'Fully “AI-proof” because it involves code' },
              { id: 'b', label: 'More sliceable / pattern-heavy—higher exposure risk in pieces' },
              { id: 'c', label: 'Impossible to automate because humans review' },
            ],
            correctId: 'b',
            explain:
              'The essay’s pattern lens is about task structure. Junior, ticket-shaped coding can still be augmented heavily—even with a human reviewer.',
          },
          {
            id: 's2',
            type: 'ced',
            prompt: 'Sort these lines about cancer AI.',
            items: [
              {
                id: 'i1',
                text: 'Research institutes describe AI helping process data and spot patterns.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'Therefore AI has fully solved cancer care worldwide.',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'The essay urges proportional claims: demos are not the same as deployed outcomes.',
                bucketId: 'claim',
              },
            ],
            explain:
              'Evidence names what sources say; interpretation draws a “so what” (here, an overclaim); claim states the essay’s stance on careful language.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: '“Augmentation” means:',
            options: [
              { id: 'a', label: 'AI helps a human do the task' },
              { id: 'b', label: 'The human disappears completely with no oversight' },
              { id: 'c', label: 'Only manual labor counts as work' },
            ],
            correctId: 'a',
            explain: 'Augmentation keeps humans in the loop—even if the loop gets smaller.',
            glossaryTerms: ['augmentation'],
          },
        ],
      },
    ],
  },
  {
    id: 'u4',
    title: 'Labor patterns',
    subtitle: 'Which jobs look exposed—and what patterns say (the synthesis)',
    lessons: [
      {
        id: 'u4-l1',
        title: 'Exposed vs resilient roles',
        blurb: 'Urwin’s lists as examples—not destiny for every worker.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Lists are maps, not sentences',
            body:
              'Matthew Urwin (Built In) summarizes roles often discussed as AI-exposed (e.g., customer service, some coding, content writing) and roles often considered more resilient (e.g., nursing, teaching, therapy). The essay treats these as starting points for pattern thinking—not fate.',
            paperRef: 'Urwin (Built In)',
            glossaryTerms: ['routine work'],
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'The essay’s “pattern” synthesis (without treating any chatbot as a co-author) stresses:',
            options: [
              { id: 'a', label: 'Only jobs with zero typing are safe' },
              {
                id: 'b',
                label: 'Structured, repetitive, predictable information work is often easier to automate in slices',
              },
              { id: 'c', label: 'Artists never use AI' },
            ],
            correctId: 'b',
            explain:
              'Exposure is about task characteristics and incentives—not a single skill like “typing.”',
          },
          {
            id: 's3',
            type: 'match',
            prompt: 'Match pattern → example (illustrative, not exhaustive).',
            left: [
              { id: 'l1', text: 'High routine + clear rules' },
              { id: 'l2', text: 'Deep trust + nuanced human care' },
            ],
            right: [
              { id: 'r1', text: 'Often discussed as more exposed (in slices)' },
              { id: 'r2', text: 'Often discussed as more resilient (not immune)' },
            ],
            answer: { l1: 'r1', l2: 'r2' },
            explain:
              'Reality is messier than two buckets; the essay uses patterns to think, not to label people.',
          },
        ],
      },
      {
        id: 'u4-l2',
        title: 'Who is helped when “boring” work shrinks?',
        blurb: 'Talbot’s boredom essay as a moral texture—not a policy program.',
        estimatedMinutes: 5,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Meaningless tasks and secret doubt',
            body:
              'Margaret Talbot describes many workers performing tasks they suspect may not need doing—boredom as a “deficit in meaning.” The essay asks a humane question: if AI removes some hollow tasks, what replaces income, dignity, and structure?',
            paperRef: 'Talbot (The New Yorker)',
          },
          {
            id: 's2',
            type: 'sort',
            prompt: 'Sort: is the essay mainly praising, warning, or both?',
            buckets: [
              { id: 'praise', label: 'Possible upside named in the essay' },
              { id: 'warn', label: 'Risk or tension named in the essay' },
            ],
            items: [
              { id: 'i1', text: 'Less time in “dullsville” meaningless tasks', bucketId: 'praise' },
              { id: 'i2', text: 'Transition pain if new jobs don’t fit every worker', bucketId: 'warn' },
              { id: 'i3', text: 'New roles like health-tech implementation specialists', bucketId: 'praise' },
              { id: 'i4', text: 'Inequality in who gets upskilling', bucketId: 'warn' },
            ],
            explain:
              'The argument is hope-forward but not naive: evolution includes distribution questions.',
          },
        ],
      },
      {
        id: 'u4-l3',
        title: 'Jobs in the wild',
        blurb: 'Scenarios for nursing, content work, and triage practice.',
        estimatedMinutes: 8,
        steps: [
          {
            id: 's1',
            type: 'scenario',
            setup:
              'A nurse spends shifts coordinating care, calming families, catching subtle symptom changes, and negotiating with doctors under time pressure.',
            prompt: 'Compared with highly scripted chat work, this job is generally discussed as:',
            options: [
              { id: 'a', label: 'More resilient because trust + judgment matter (not immune)' },
              { id: 'b', label: 'Fully safe because AI cannot read vitals' },
              { id: 'c', label: 'Automatically replaceable because it uses documentation' },
            ],
            correctId: 'a',
            explain:
              'The essay uses “resilient” carefully: some tasks may still change, but care work is less like a pure rules engine.',
          },
          {
            id: 's2',
            type: 'scenario',
            setup:
              'A content writer produces 12 SEO articles a day from briefs with rigid templates and keyword rules.',
            prompt: 'This is closest to which exposure pattern?',
            options: [
              { id: 'a', label: 'High-trust therapy' },
              { id: 'b', label: 'Structured, repetitive information production' },
              { id: 'c', label: 'Non-information physical craft' },
            ],
            correctId: 'b',
            explain:
              'Template-heavy content work is often discussed as easier to automate in slices—even though humans still “own” the byline.',
          },
          {
            id: 's3',
            type: 'triage',
            claim: 'Some workers experience their tasks as a “deficit in meaning” (boredom), not only a wage problem.',
            prompt: 'Which author-family best matches that humane texture in the essay?',
            sources: [
              {
                id: 'talbot',
                label: 'Talbot (The New Yorker)',
                description: 'Writes about boredom, doubt, and meaning at work.',
              },
              {
                id: 'itif',
                label: 'ITIF jobs snapshot',
                description: 'Counts created vs lost roles in a year.',
              },
              {
                id: 'fishkin',
                label: 'Fishkin',
                description: 'Focuses on hype vs marketing in AI narratives.',
              },
            ],
            correctSourceId: 'talbot',
            explain:
              'Talbot supplies moral texture; ITIF supplies quantitative texture—they answer different questions.',
          },
        ],
      },
    ],
  },
  {
    id: 'u5',
    title: 'Meaning & society',
    subtitle: 'Cross-country evidence, TIME essay, and the closing frame',
    lessons: [
      {
        id: 'u5-l1',
        title: 'Tasks shift; skills move',
        blurb: 'Georgieff & Hyee: demand moves toward reasoning and social connection.',
        estimatedMinutes: 5,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Not only replacement—recomposition',
            body:
              'Georgieff & Hyee offer cross-country framing: AI doesn’t only replace tasks; it shifts which tasks are demanded—often toward high-level reasoning and social interaction. That supports the essay’s “evolution of jobs” thesis.',
            paperRef: 'Georgieff & Hyee (Frontiers)',
            glossaryTerms: ['interpretation'],
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: '“Recomposition” in this context means:',
            options: [
              { id: 'a', label: 'No one works anymore' },
              { id: 'b', label: 'The mix of tasks inside jobs and across the economy changes' },
              { id: 'c', label: 'All wages become identical' },
            ],
            correctId: 'b',
            explain:
              'Jobs can transform without disappearing—titles stay while tasks drift.',
          },
        ],
      },
      {
        id: 'u5-l2',
        title: 'Human-centric economies',
        blurb: 'Drago & Laine: routine automated, creativity valued—if institutions keep up.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'TIME: a human-centric economy',
            body:
              'Drago & Laine argue automating routine work could push society to value creativity and care work more explicitly—if policy and training catch up. The essay pairs this with Talbot: meaningful activity beats empty busyness.',
            paperRef: 'Drago & Laine (TIME)',
          },
          {
            id: 's2',
            type: 'teach',
            title: 'Closing: still partners with the Genie',
            body:
              'The essay returns to the lamp: “phenomenal cosmic powers” need human direction. The companion’s through-line is the same: hope is plausible when claims stay honest, transitions are planned for, and evidence leads.',
            paperRef: 'Conclusion',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'Which best matches the essay’s final stance?',
            options: [
              { id: 'a', label: 'Panic only—no upside' },
              { id: 'b', label: 'Hope-forward evolution of work, with real displacement risks' },
              { id: 'c', label: 'Certainty that nothing will change' },
            ],
            correctId: 'b',
            explain:
              'The tone is cautiously optimistic: fear is acknowledged; the thesis is guided progress.',
          },
        ],
      },
      {
        id: 'u5-l3',
        title: 'Pulling it together',
        blurb: 'C-E-I, triage, and one last scenario before you leave the lamp.',
        estimatedMinutes: 8,
        steps: [
          {
            id: 's1',
            type: 'ced',
            prompt: 'Sort these lines about “human-centric” futures.',
            items: [
              {
                id: 'i1',
                text: 'Drago & Laine argue automating routine work could elevate creativity and care—if institutions adapt.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'So policy and training are part of the story, not an afterthought.',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'The essay’s stance is hope-forward while acknowledging displacement and inequality risks.',
                bucketId: 'claim',
              },
            ],
            explain:
              'Georgieff & Hyee / TIME-style arguments support recomposition; the claim states how cautiously optimistic the essay is.',
          },
          {
            id: 's2',
            type: 'triage',
            claim: 'Big tech narratives can outrun measured occupational change—so timelines need humility.',
            prompt: 'Which source line best supports a “slow mix shift” caution?',
            sources: [
              {
                id: 'yale',
                label: 'Yale Budget Lab',
                description: 'Internet-era occupational mix shifted gradually, not overnight.',
              },
              {
                id: 'talbot',
                label: 'Talbot',
                description: 'Boredom and meaning at work.',
              },
              {
                id: 'spark',
                label: 'SparkToro piece',
                description: 'Marketing vs measured labor proof.',
              },
            ],
            correctSourceId: 'yale',
            explain:
              'Yale’s framing is about measured pace; Fishkin is about hype incentives; Talbot is about lived experience.',
          },
          {
            id: 's3',
            type: 'scenario',
            setup:
              'A city trains workers on AI tools for six months, pairs them with mentors, and tracks wage outcomes—not just headline layoffs.',
            prompt: 'This matches the essay’s emphasis on:',
            options: [
              { id: 'a', label: 'Transitions and distribution—not only “will AI exist?”' },
              { id: 'b', label: 'Ignoring all downsides forever' },
              { id: 'c', label: 'Proof that wages always rise for everyone' },
            ],
            correctId: 'a',
            explain:
              'The argument cares who benefits, who gets training, and how fast institutions move—evidence-led hope.',
          },
        ],
      },
    ],
  },
]

export function getUnit(unitId: string) {
  return UNITS.find((u) => u.id === unitId)
}

export function getLesson(unitId: string, lessonId: string) {
  const unit = getUnit(unitId)
  return unit?.lessons.find((l) => l.id === lessonId)
}

export function getNextLesson(unitId: string, lessonId: string) {
  const unit = getUnit(unitId)
  if (!unit) return undefined
  const i = unit.lessons.findIndex((l) => l.id === lessonId)
  if (i < 0 || i >= unit.lessons.length - 1) return undefined
  return unit.lessons[i + 1]
}

export function allLessonsFlat() {
  return UNITS.flatMap((u) => u.lessons.map((l) => ({ unit: u, lesson: l })))
}
