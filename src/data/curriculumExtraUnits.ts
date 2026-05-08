import type { Unit } from '@/types/curriculum'

/** Level 2–3 units (five + five); appended after Level 1 in `curriculum.ts`. */
export const EXTRA_UNITS: Unit[] = [
  {
    id: 'u6',
    level: 2,
    title: 'Measurement & evidence',
    subtitle: 'Surveys, stats, and what “AI exposure” can and cannot prove',
    lessons: [
      {
        id: 'u6-l1',
        title: 'Different rulers',
        blurb: 'Why job forecasts disagree: definitions, samples, and time windows.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Three measurement families',
            body:
              'Labor change shows up in employer surveys, government occupational data, and model-based “exposure” scores. Each answers a slightly different question. The essay’s habit is to ask what was counted, for whom, and over what horizon before treating a percentage as fate.',
            paperRef: 'Cross-cutting: evidence discipline',
            glossaryTerms: ['occupational mix'],
          },
          {
            id: 's2',
            type: 'sort',
            prompt: 'Sort each line into the bucket that fits careful reading.',
            buckets: [
              { id: 'good', label: 'Healthy skepticism' },
              { id: 'bad', label: 'Overreach' },
            ],
            items: [
              { id: 'i1', text: 'Ask what “exposed” means in the study’s coding', bucketId: 'good' },
              { id: 'i2', text: 'Treat one vendor blog as universal law for every country', bucketId: 'bad' },
              { id: 'i3', text: 'Check whether results are about tasks, roles, or firms', bucketId: 'good' },
            ],
            explain: 'Good readers match claim strength to measurement scope. Bad readers collapse all metrics into one scary headline.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'An “occupational mix” shift is best read as:',
            options: [
              { id: 'a', label: 'Proof that every worker in a job title changed tasks tomorrow' },
              { id: 'b', label: 'A gradual change in which job categories matter in the economy' },
              { id: 'c', label: 'Evidence that wages never move' },
            ],
            correctId: 'b',
            explain: 'Mix shifts are macro patterns; they still matter for training and policy—even when slow.',
            glossaryTerms: ['occupational mix'],
          },
        ],
      },
      {
        id: 'u6-l2',
        title: 'Horizons & humility',
        blurb: 'Short-run disruption vs long-run rearrangement.',
        estimatedMinutes: 5,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Why timelines split experts',
            body:
              'Some sources emphasize near-term hiring freezes or pilot rollouts; others emphasize decade-scale recomposition. The inquiry move is not to pick a vibe—it is to label which timeline a source actually supports.',
            paperRef: 'Yale-style gradual mix vs headline immediacy',
          },
          {
            id: 's2',
            type: 'overclaim',
            prompt: 'Which sentence overclaims relative to typical labor evidence?',
            sourceNote: 'Measured labor change is usually partial, local, and debated.',
            options: [
              {
                id: 'fair',
                text: 'We should expect uneven impacts across firms and places even if averages look mild.',
                kind: 'fair',
              },
              {
                id: 'strong',
                text: 'A single chart proves the exact unemployment rate for every city next year.',
                kind: 'too_strong',
              },
              {
                id: 'fair2',
                text: 'Forecasts are useful as scenarios, not as prophecy.',
                kind: 'fair',
              },
            ],
            correctId: 'strong',
            explain: 'Precision about every locality next year is rarely what the data supports.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: '“Hype” in this companion means:',
            options: [
              { id: 'a', label: 'Any mention of AI in the news' },
              {
                id: 'b',
                label: 'Promotion that outruns what careful evidence can support',
              },
              { id: 'c', label: 'Peer-reviewed papers only' },
            ],
            correctId: 'b',
            explain: 'Hype is about proportionality—not about optimism or pessimism by itself.',
            glossaryTerms: ['hype'],
          },
        ],
      },
      {
        id: 'u6-l3',
        title: 'Triage practice',
        blurb: 'Match the claim to the evidence family that best supports it.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'triage',
            claim: 'Big narratives about AI can outrun measured occupational change.',
            prompt: 'Which source line fits that caution best?',
            sources: [
              {
                id: 'yale',
                label: 'Gradual mix-shift evidence',
                description: 'Historical analogy: large tech waves still moved job mix slowly in some accounts.',
              },
              {
                id: 'fish',
                label: 'Marketing incentives',
                description: 'Why vendors might prefer inevitability framing.',
              },
              {
                id: 'talb',
                label: 'Meaning at work',
                description: 'Moral texture of boring tasks—not a macro forecast.',
              },
            ],
            correctSourceId: 'yale',
            explain: 'The “outrun measured change” point is epistemic; Yale-style gradualism backs it directly.',
          },
          {
            id: 's2',
            type: 'ced',
            prompt: 'Sort these lines about measurement.',
            items: [
              {
                id: 'i1',
                text: 'A study counts “tasks exposed to automation” using a specific rubric.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'So headlines should name that rubric instead of saying “jobs doomed.”',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'Careful inquiry keeps definitions visible when percentages appear.',
                bucketId: 'claim',
              },
            ],
            explain: 'Evidence describes what was measured; interpretation connects it to public language; claim states the standard.',
          },
          {
            id: 's3',
            type: 'scenario',
            setup:
              'A blog converts a working paper’s “potential exposure” score into “50% of jobs gone by Friday,” without linking the paper.',
            prompt: 'The essay-aligned reader response is closest to:',
            options: [
              { id: 'a', label: 'Share the blog because fear is motivating' },
              { id: 'b', label: 'Trace the definition chain: exposure ≠ fired' },
              { id: 'c', label: 'Assume working papers are always wrong' },
            ],
            correctId: 'b',
            explain: 'Exposure metrics are useful maps—not automatic firing schedules.',
          },
        ],
      },
    ],
  },
  {
    id: 'u7',
    level: 2,
    title: 'Adoption inside firms',
    subtitle: 'Pilots, procurement, and why rollout lags headlines',
    lessons: [
      {
        id: 'u7-l1',
        title: 'From demo to workflow',
        blurb: 'Why organizations adopt slowly even when tools look magical.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Workflow friction',
            body:
              'A slick demo can hide integration costs: data access, compliance, reliability checks, and manager trust. Labor impacts often track adoption and redesign of workflows—not the first press release.',
            paperRef: 'Synthesis: institutions mediate tech shocks',
          },
          {
            id: 's2',
            type: 'match',
            prompt: 'Match pattern to what firms often worry about.',
            left: [
              { id: 'l1', text: 'Legal / privacy review' },
              { id: 'l2', text: 'Model mistakes in customer-facing channels' },
            ],
            right: [
              { id: 'r1', text: 'Slows rollout' },
              { id: 'r2', text: 'Slows rollout' },
            ],
            answer: { l1: 'r1', l2: 'r2' },
            explain: 'Both are common brakes. Adoption is not “everyone flipped a switch.”',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: '“Augmentation” inside a firm often means:',
            options: [
              { id: 'a', label: 'Humans and tools share a workflow with oversight' },
              { id: 'b', label: 'Instant removal of all managers' },
              { id: 'c', label: 'Ignoring compliance' },
            ],
            correctId: 'a',
            explain: 'Augmentation is frequently hybrid: drafts, checks, and accountability remain.',
            glossaryTerms: ['augmentation'],
          },
        ],
      },
      {
        id: 'u7-l2',
        title: 'Who decides?',
        blurb: 'Procurement, IT, and frontline workers.',
        estimatedMinutes: 5,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Power inside the org chart',
            body:
              'Tool access can be centralized (IT procurement) or shadow (teams bring their own). Who decides shapes speed, safety, and which roles feel disruption first—often unevenly across sites.',
            paperRef: 'Distribution theme (Level 2 extension)',
          },
          {
            id: 's2',
            type: 'sort',
            prompt: 'Sort: tends to speed uncontrolled spread vs tends to centralize control.',
            buckets: [
              { id: 'shadow', label: 'Shadow adoption risk' },
              { id: 'gate', label: 'Gated adoption' },
            ],
            items: [
              { id: 'i1', text: 'Employees paste customer data into unapproved web tools', bucketId: 'shadow' },
              { id: 'i2', text: 'Single sign-on + approved vendor list', bucketId: 'gate' },
              { id: 'i3', text: '“Everyone uses their personal account for work drafts”', bucketId: 'shadow' },
            ],
            explain: 'Governance choices change both risk and who bears the learning curve.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'Why does the essay care about transitions, not only “will AI exist?”',
            options: [
              { id: 'a', label: 'Because institutions and training determine who benefits' },
              { id: 'b', label: 'Because technology never changes' },
              { id: 'c', label: 'Because jobs are irrelevant' },
            ],
            correctId: 'a',
            explain: 'The argument is distribution-forward: change is mediated by policy and practice.',
          },
        ],
      },
      {
        id: 'u7-l3',
        title: 'Rollout scenarios',
        blurb: 'Apply adoption realism to two workplace vignettes.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'scenario',
            setup:
              'A bank pilot uses AI to summarize internal tickets. Accuracy is good in tests, but regulators require an audit trail; teams rebuild logging for six months.',
            prompt: 'This story mainly illustrates:',
            options: [
              { id: 'a', label: 'That pilots never work' },
              { id: 'b', label: 'That deployment constraints can delay labor effects' },
              { id: 'c', label: 'That banks ignore compliance' },
            ],
            correctId: 'b',
            explain: 'Real adoption includes controls; timelines stretch beyond demos.',
          },
          {
            id: 's2',
            type: 'overclaim',
            prompt: 'Which line overclaims from “successful pilot” evidence?',
            sourceNote: 'Pilots measure feasibility in a slice—not universal production truth.',
            options: [
              { id: 'fair', text: 'The pilot suggests the workflow can work with guardrails.', kind: 'fair' },
              {
                id: 'strong',
                text: 'Therefore every competitor is already at full production parity worldwide.',
                kind: 'too_strong',
              },
              { id: 'fair2', text: 'Scale-up may change error rates and costs.', kind: 'fair' },
            ],
            correctId: 'strong',
            explain: 'Pilot success does not automatically universalize.',
          },
          {
            id: 's3',
            type: 'triage',
            claim: 'Frontline workers often experience tool mandates before training budgets catch up.',
            prompt: 'Which evidence family best supports that (as a pattern claim)?',
            sources: [
              {
                id: 'inst',
                label: 'Institution lag',
                description: 'Organizations roll out tools while training and job design update slowly.',
              },
              {
                id: 'fish',
                label: 'Marketing hype',
                description: 'Sales language about inevitability.',
              },
              {
                id: 'cancer',
                label: 'Medical AI demos',
                description: 'Pattern-finding in research datasets.',
              },
            ],
            correctSourceId: 'inst',
            explain: 'The claim is about organizational pacing—not vendor rhetoric or medical AI specifically.',
          },
        ],
      },
    ],
  },
  {
    id: 'u8',
    level: 2,
    title: 'Skills & training',
    subtitle: 'Reskilling, credentials, and who pays for the transition',
    lessons: [
      {
        id: 'u8-l1',
        title: 'Task shift → skill shift',
        blurb: 'Recomposition changes what “qualified” means.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Skills follow tasks',
            body:
              'If the mix of tasks inside jobs changes, so do the skills markets reward. The essay’s hopeful thread—creativity and care valued more—still depends on training systems, hiring norms, and time.',
            paperRef: 'Drago & Laine / Georgieff & Hyee themes (extended)',
            glossaryTerms: ['recomposition'],
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: '“Recomposition” implies:',
            options: [
              { id: 'a', label: 'Job titles never change' },
              { id: 'b', label: 'The bundle of tasks inside work can change even when titles look stable' },
              { id: 'c', label: 'Automation never happens' },
            ],
            correctId: 'b',
            explain: 'Recomposition is about shifting task bundles—often the essay’s middle ground.',
            glossaryTerms: ['recomposition'],
          },
          {
            id: 's3',
            type: 'ced',
            prompt: 'Sort training lines.',
            items: [
              {
                id: 'i1',
                text: 'Bootcamps report rising demand for prompt-craft and evaluation skills.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'So “digital literacy” may mean judging outputs, not only clicking buttons.',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'Training policy is part of a fair transition story.',
                bucketId: 'claim',
              },
            ],
            explain: 'Keep evidence (what programs report) separate from interpretation and normative claim.',
          },
        ],
      },
      {
        id: 'u8-l2',
        title: 'Who pays?',
        blurb: 'Public programs, employers, and individual risk.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Cost and access',
            body:
              'If reskilling is expensive and unevenly available, “learn to code” advice can sound fair while functioning as a private tax on displacement. The essay invites readers to notice who bears the burden.',
            paperRef: 'Distribution & transitions',
          },
          {
            id: 's2',
            type: 'sort',
            prompt: 'Sort: reduces individual risk vs shifts risk to individuals.',
            buckets: [
              { id: 'collect', label: 'More collective buffering' },
              { id: 'indiv', label: 'More individual risk' },
            ],
            items: [
              { id: 'i1', text: 'Universal stipends during accredited retraining', bucketId: 'collect' },
              { id: 'i2', text: '“Figure it out yourself” as the only message', bucketId: 'indiv' },
              { id: 'i3', text: 'Industry partnerships with paid learning time', bucketId: 'collect' },
            ],
            explain: 'The essay doesn’t prescribe a single policy—it trains you to spot the difference.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'Routine work is often discussed as more automatable because:',
            options: [
              { id: 'a', label: 'It follows clearer rules and repeats' },
              { id: 'b', label: 'It never matters economically' },
              { id: 'c', label: 'Humans cannot do routines' },
            ],
            correctId: 'a',
            explain: 'Routine is a pattern concept—not an insult to workers.',
            glossaryTerms: ['routine work'],
          },
        ],
      },
      {
        id: 'u8-l3',
        title: 'Credential realism',
        blurb: 'Certificates, portfolios, and what employers trust.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'scenario',
            setup:
              'A state funds short AI safety courses. Employers still hire mainly on traditional degrees and referrals; completion rates are uneven.',
            prompt: 'The lesson for inquiry writers is:',
            options: [
              { id: 'a', label: 'Training programs alone guarantee mobility' },
              { id: 'b', label: 'Labor markets have gatekeeping beyond classroom hours' },
              { id: 'c', label: 'Degrees never matter' },
            ],
            correctId: 'b',
            explain: 'Institutions link training to hiring; evidence should cover both.',
          },
          {
            id: 's2',
            type: 'triage',
            claim: 'Displacement risk can land unevenly before average wages tell a clear story.',
            prompt: 'Which line supports unevenness best?',
            sources: [
              {
                id: 'seg',
                label: 'Segmentation',
                description: 'Different cohorts face different hiring and wage paths.',
              },
              {
                id: 'avg',
                label: 'Averages only',
                description: 'One national average wage number for everyone.',
              },
              {
                id: 'vibe',
                label: 'Vibes',
                description: 'If Twitter is loud, outcomes are extreme.',
              },
            ],
            correctSourceId: 'seg',
            explain: 'Unevenness is a segmentation claim; a single average can hide pain.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: '“Displacement” here means:',
            options: [
              { id: 'a', label: 'Tasks or roles shrink as tech substitutes for labor—unevenly' },
              { id: 'b', label: 'Every worker is promoted' },
              { id: 'c', label: 'Only CEOs are affected' },
            ],
            correctId: 'a',
            explain: 'Displacement is structural and uneven—not universal joblessness by default.',
            glossaryTerms: ['displacement'],
          },
        ],
      },
    ],
  },
  {
    id: 'u9',
    level: 2,
    title: 'Distribution & fairness',
    subtitle: 'Who gains first, who waits, and what averages hide',
    lessons: [
      {
        id: 'u9-l1',
        title: 'Averages vs pockets',
        blurb: 'Macro calm can coexist with micro pain.',
        estimatedMinutes: 5,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'The averaging trap',
            body:
              'National productivity can rise while specific communities feel layoffs or stagnant wages. Inquiry writing names the scale of the claim: whose data, which window, which group?',
            paperRef: 'Equity-of-transition theme',
          },
          {
            id: 's2',
            type: 'overclaim',
            prompt: 'Which sentence overclaims?',
            sourceNote: 'Averages rarely prove universal individual outcomes.',
            options: [
              { id: 'fair', text: 'Some groups may see churn before others feel anything.', kind: 'fair' },
              {
                id: 'strong',
                text: 'If GDP grew, every household’s anxiety is irrational.',
                kind: 'too_strong',
              },
              { id: 'fair2', text: 'Policy should watch both averages and tails.', kind: 'fair' },
            ],
            correctId: 'strong',
            explain: 'Macro growth does not invalidate localized labor pain.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'A thoughtful “hope-forward” essay can still:',
            options: [
              { id: 'a', label: 'Ignore losers entirely' },
              { id: 'b', label: 'Acknowledge displacement risk while arguing for guided transition' },
              { id: 'c', label: 'Promise zero change' },
            ],
            correctId: 'b',
            explain: 'Tone and evidence can hold both stakes: upside and harm reduction.',
          },
        ],
      },
      {
        id: 'u9-l2',
        title: 'Power & voice',
        blurb: 'Why worker voice belongs in tech narratives.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Design choices are labor choices',
            body:
              'Workflow automation is not only an engineering problem. It is also who gets consulted, what “success” means, and what happens when monitoring tools reshape pace and stress.',
            paperRef: 'Governance extension (preview Level 3)',
          },
          {
            id: 's2',
            type: 'match',
            prompt: 'Match concern → example.',
            left: [
              { id: 'l1', text: 'Surveillance intensity' },
              { id: 'l2', text: 'Algorithmic scheduling' },
            ],
            right: [
              { id: 'r1', text: 'Can shift stress and autonomy even without layoffs' },
              { id: 'r2', text: 'Can shift stress and autonomy even without layoffs' },
            ],
            answer: { l1: 'r1', l2: 'r2' },
            explain: 'Labor quality matters—not only headcount.',
          },
          {
            id: 's3',
            type: 'sort',
            prompt: 'Sort: strengthens worker agency vs weakens it.',
            buckets: [
              { id: 'strong', label: 'More agency' },
              { id: 'weak', label: 'Less agency' },
            ],
            items: [
              { id: 'i1', text: 'Joint committees on tool rollouts with frontline veto points', bucketId: 'strong' },
              { id: 'i2', text: 'Opaque targets with automated discipline', bucketId: 'weak' },
              { id: 'i3', text: 'Clear appeal process for bad model outputs', bucketId: 'strong' },
            ],
            explain: 'Fair transitions often include voice and recourse—not only training budgets.',
          },
        ],
      },
      {
        id: 'u9-l3',
        title: 'Equity triage',
        blurb: 'Connect claims about fairness to the right evidence.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'triage',
            claim: 'Marketing narratives can make adoption look frictionless.',
            prompt: 'Which evidence best supports skepticism of frictionless stories?',
            sources: [
              {
                id: 'fish',
                label: 'Incentive critique',
                description: 'Shows why inevitability framing can be strategic.',
              },
              {
                id: 'geo',
                label: 'Cross-country task demand',
                description: 'Shifts toward reasoning/social tasks in some accounts.',
              },
              {
                id: 'ost',
                label: 'Jobs created vs lost snapshot',
                description: 'A single-year ratio discussion.',
              },
            ],
            correctSourceId: 'fish',
            explain: 'The claim is about narrative incentives; Fishkin-style critique fits best.',
          },
          {
            id: 's2',
            type: 'ced',
            prompt: 'Sort fairness lines.',
            items: [
              {
                id: 'i1',
                text: 'Layoffs concentrated in one metro area while national unemployment stays flat.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'So “the economy is fine” can sound cruel locally.',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'Inquiry should track distribution, not only averages.',
                bucketId: 'claim',
              },
            ],
            explain: 'Evidence is localized facts; interpretation bridges to meaning; claim states the essay habit.',
          },
          {
            id: 's3',
            type: 'scenario',
            setup:
              'A headline: “AI doubled productivity” based on one team’s self-reported survey, not payroll records.',
            prompt: 'You should:',
            options: [
              { id: 'a', label: 'Generalize to all industries' },
              { id: 'b', label: 'Ask for methodology, sample, and whether outputs were verified' },
              { id: 'c', label: 'Dismiss surveys entirely always' },
            ],
            correctId: 'b',
            explain: 'Surveys can inform; they are not automatic macro proof.',
          },
        ],
      },
    ],
  },
  {
    id: 'u10',
    level: 2,
    title: 'Hype diagnostics',
    subtitle: 'Red flags in AI coverage, demos, and sales language',
    lessons: [
      {
        id: 'u10-l1',
        title: 'Seven alarm phrases',
        blurb: 'Language that often outruns evidence.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Alarm phrases (not automatic lies)',
            body:
              'Phrases like “inevitable,” “everyone will,” “human-level,” or “this changes everything tomorrow” can be rhetorical heat. The inquiry habit is to ask what would falsify the claim and what was measured.',
            paperRef: 'Fishkin + essay caution',
            glossaryTerms: ['hype'],
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'A healthy response to a heated launch keynote is:',
            options: [
              { id: 'a', label: 'Ignore incentives entirely' },
              { id: 'b', label: 'Separate demo theater from deployed labor evidence' },
              { id: 'c', label: 'Assume the keynote is a peer-reviewed study' },
            ],
            correctId: 'b',
            explain: 'Demos persuade; evidence practices verify.',
          },
          {
            id: 's3',
            type: 'sort',
            prompt: 'Sort: more like evidence-seeking vs more like hype absorption.',
            buckets: [
              { id: 'seek', label: 'Evidence-seeking' },
              { id: 'hype', label: 'Hype absorption' },
            ],
            items: [
              { id: 'i1', text: 'Read the methods section', bucketId: 'seek' },
              { id: 'i2', text: 'Retweet a scary percentage without the paper', bucketId: 'hype' },
              { id: 'i3', text: 'Ask who funded the study', bucketId: 'seek' },
            ],
            explain: 'Small habits reduce accidental overclaim.',
          },
        ],
      },
      {
        id: 'u10-l2',
        title: 'Compare narratives',
        blurb: 'ITIF-style snapshots vs Yale-style gradualism—both have jobs.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Narrative toolbox',
            body:
              'A jobs-created snapshot and a gradual occupational-mix story answer different anxieties. Strong writers don’t mash them into one slogan—they assign each to its proper sub-claim.',
            paperRef: 'ITIF + Yale pairing (Level 2 synthesis)',
            glossaryTerms: ['occupational mix'],
          },
          {
            id: 's2',
            type: 'triage',
            claim: 'Net job counts in one year should not be read as a permanent universal law.',
            prompt: 'Which rationale matches?',
            sources: [
              {
                id: 'snap',
                label: 'Snapshot logic',
                description: 'A time-bounded measurement; extrapolation needs extra evidence.',
              },
              {
                id: 'fish',
                label: 'Marketing critique',
                description: 'Sales incentives for inevitability.',
              },
              {
                id: 'urw',
                label: 'Exposed-roles list',
                description: 'Pattern map of commonly discussed roles.',
              },
            ],
            correctSourceId: 'snap',
            explain: 'The caution is epistemic—about how to read a number’s scope.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: '“Triage” in this companion means:',
            options: [
              { id: 'a', label: 'Collecting random quotes' },
              { id: 'b', label: 'Picking which source best supports a specific sub-claim' },
              { id: 'c', label: 'Deleting sources you dislike' },
            ],
            correctId: 'b',
            explain: 'Triage is disciplined matching, not hoarding.',
            glossaryTerms: ['triage'],
          },
        ],
      },
      {
        id: 'u10-l3',
        title: 'Level 2 capstone',
        blurb: 'Hold multiple true ideas without collapsing them.',
        estimatedMinutes: 8,
        steps: [
          {
            id: 's1',
            type: 'scenario',
            setup:
              'Thread A: vendors promise huge productivity. Thread B: Yale-style evidence suggests slow mix shifts. Thread C: workers report real stress from new tools.',
            prompt: 'An inquiry-aligned synthesis sounds like:',
            options: [
              { id: 'a', label: 'Pick one thread and ignore the others' },
              {
                id: 'b',
                label: 'Name what each thread supports; avoid one slogan for all scales',
              },
              { id: 'c', label: 'Assume all claims are equally proven' },
            ],
            correctId: 'b',
            explain: 'Maturity is holding scope: demos ≠ macro law ≠ lived experience.',
          },
          {
            id: 's2',
            type: 'overclaim',
            prompt: 'Which line is too strong?',
            sourceNote: 'Autonomy can increase without every job disappearing Monday.',
            options: [
              {
                id: 'fair',
                text: 'Some systems need less continuous human direction than older tools.',
                kind: 'fair',
              },
              {
                id: 'strong',
                text: 'Therefore no humans will ever steer high-stakes systems again starting now.',
                kind: 'too_strong',
              },
              {
                id: 'fair2',
                text: 'Oversight and governance still matter even as autonomy rises.',
                kind: 'fair',
              },
            ],
            correctId: 'strong',
            explain: 'Autonomy claims deserve proportionality too.',
          },
          {
            id: 's3',
            type: 'ced',
            prompt: 'Sort hype vs discipline.',
            items: [
              {
                id: 'i1',
                text: 'Fishkin argues some inevitability talk tracks marketing incentives.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'Readers should cross-check with independent labor data.',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'The essay wants hope without credulity.',
                bucketId: 'claim',
              },
            ],
            explain: 'Keep the source attribution, the reader move, and the essay stance distinct.',
          },
        ],
      },
    ],
  },
  {
    id: 'u11',
    level: 3,
    title: 'Steelman objections',
    subtitle: 'Strong counters to rapid disruption—and fair replies',
    lessons: [
      {
        id: 'u11-l1',
        title: 'The slow-change view',
        blurb: 'Institutions absorb shocks; headlines overshoot.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Steelmanning',
            body:
              'To steelman is to state the strongest version of a counterargument before replying. A serious slow-change view notes procurement, regulation, and habit—why workplaces do not flip overnight.',
            paperRef: 'Yale gradualism + adoption friction (Level 3)',
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'A fair reply to “adoption is slow” is NOT:',
            options: [
              { id: 'a', label: '“Therefore AI changes nothing ever”' },
              { id: 'b', label: '“Pilots can still reshape tasks for some workers soon”' },
              { id: 'c', label: '“Speed varies by sector and governance”' },
            ],
            correctId: 'a',
            explain: 'Slow average adoption does not equal zero local change.',
          },
          {
            id: 's3',
            type: 'match',
            prompt: 'Match objection → reasonable response theme.',
            left: [
              { id: 'l1', text: '“We’ve heard automation panic before”' },
              { id: 'l2', text: '“Firms can’t move that fast”' },
            ],
            right: [
              { id: 'r1', text: 'Compare patterns, not slogans; note what’s new (tool autonomy)' },
              { id: 'r2', text: 'Agree on friction but watch concentrated slices' },
            ],
            answer: { l1: 'r1', l2: 'r2' },
            explain: 'Good replies acknowledge partial truth then refine scope.',
          },
        ],
      },
      {
        id: 'u11-l2',
        title: 'Limits of the essay',
        blurb: 'What one inquiry cannot settle.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Scope honesty',
            body:
              'A single essay can map sources, name patterns, and propose norms for careful language. It cannot replace labor economics as a field, predict your city’s hiring, or cover every industry equally.',
            paperRef: 'Meta: inquiry boundaries',
          },
          {
            id: 's2',
            type: 'overclaim',
            prompt: 'Which claim overstates what an inquiry essay can do?',
            sourceNote: 'Inquiry argues with evidence; it doesn’t become a crystal ball.',
            options: [
              { id: 'fair', text: 'It can teach you how to read competing sources responsibly.', kind: 'fair' },
              {
                id: 'strong',
                text: 'It can certify your personal job security for the next decade.',
                kind: 'too_strong',
              },
              { id: 'fair2', text: 'It can highlight what is uncertain and why.', kind: 'fair' },
            ],
            correctId: 'strong',
            explain: 'Personal job security needs local and occupational specifics—not one essay’s scope.',
          },
          {
            id: 's3',
            type: 'sort',
            prompt: 'Sort: inside reasonable essay scope vs outside.',
            buckets: [
              { id: 'in', label: 'In scope' },
              { id: 'out', label: 'Out of scope' },
            ],
            items: [
              { id: 'i1', text: 'Compare Fishkin hype critique to ITIF snapshots', bucketId: 'in' },
              { id: 'i2', text: 'Replace a union contract negotiation', bucketId: 'out' },
              { id: 'i3', text: 'Explain C-E-I discipline for readers', bucketId: 'in' },
            ],
            explain: 'Scope clarity is a kindness to readers.',
          },
        ],
      },
      {
        id: 'u11-l3',
        title: 'Counterargument triage',
        blurb: 'Match replies to the objection they actually answer.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'triage',
            claim: 'Some roles discussed as “exposed” still need human judgment in messy environments.',
            prompt: 'Which response is on-target?',
            sources: [
              {
                id: 'pat',
                label: 'Pattern thinking',
                description: 'Exposure is about slices of tasks, not whole humans erased.',
              },
              {
                id: 'gdp',
                label: 'GDP only',
                description: 'If GDP rises, no one is exposed.',
              },
              {
                id: 'magic',
                label: 'Magic immunity',
                description: 'If a job uses empathy, it can never change.',
              },
            ],
            correctSourceId: 'pat',
            explain: 'The essay’s pattern lens allows partial automation without claiming full replacement always.',
          },
          {
            id: 's2',
            type: 'scenario',
            setup:
              'A friend says: “This is just like past tech panics, so ignore it.” You want to steelman and reply.',
            prompt: 'A strong reply starts with:',
            options: [
              { id: 'a', label: 'Insulting their intelligence' },
              { id: 'b', label: 'Acknowledging partial rhyme with history, then naming what may differ (autonomy, pace slices)' },
              { id: 'c', label: 'Agreeing that nothing ever changes' },
            ],
            correctId: 'b',
            explain: 'History lessons matter; so do new technical contours.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'Self-training loops mainly raise stakes because they can:',
            options: [
              { id: 'a', label: 'Change how fast capability improves and how oversight is embedded' },
              { id: 'b', label: 'Prove emotions in models' },
              { id: 'c', label: 'Eliminate all regulation automatically' },
            ],
            correctId: 'a',
            explain: 'The essay uses technical shifts to motivate labor and governance attention.',
            glossaryTerms: ['self-training'],
          },
        ],
      },
    ],
  },
  {
    id: 'u12',
    level: 3,
    title: 'Headlines vs studies',
    subtitle: 'When the story outruns the paper behind it',
    lessons: [
      {
        id: 'u12-l1',
        title: 'Telephone chain',
        blurb: 'Preprint → blog → tweet → “fact.”',
        estimatedMinutes: 5,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Broken telephone',
            body:
              'Each hop can sharpen verbs, drop confidence intervals, and lose definitions. Inquiry readers trace back: what did the original measure actually say?',
            paperRef: 'Evidence discipline (Level 3)',
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'If only the abstract is available, the honest move is:',
            options: [
              { id: 'a', label: 'Assume the wildest interpretation' },
              { id: 'b', label: 'Hold conclusions loosely until methods and limitations are clear' },
              { id: 'c', label: 'Cite it as definitive proof' },
            ],
            correctId: 'b',
            explain: 'Proportional belief is part of inquiry ethos.',
          },
          {
            id: 's3',
            type: 'sort',
            prompt: 'Sort: strengthens traceability vs weakens it.',
            buckets: [
              { id: 'good', label: 'Traceable' },
              { id: 'bad', label: 'Untraceable' },
            ],
            items: [
              { id: 'i1', text: 'Link to the PDF and quote the definition of “job”', bucketId: 'good' },
              { id: 'i2', text: 'Screenshot of a screenshot of a headline', bucketId: 'bad' },
              { id: 'i3', text: 'Note the sample country and year', bucketId: 'good' },
            ],
            explain: 'Traceability is how you avoid accidental hype amplification.',
          },
        ],
      },
      {
        id: 'u12-l2',
        title: 'Graphics that lie gently',
        blurb: 'Axes, baselines, and cherry-picked windows.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Chart hygiene',
            body:
              'Truncated axes, dual axes, and cherry-picked time windows can make small moves look cosmic. The essay’s skill set includes asking what a chart hides—not assuming malice, but checking.',
            paperRef: 'Reading quant rhetoric',
          },
          {
            id: 's2',
            type: 'scenario',
            setup:
              'A viral chart shows “AI job loss” soaring; the y-axis starts at 80% of the peak to magnify slope.',
            prompt: 'You should:',
            options: [
              { id: 'a', label: 'Panic immediately' },
              { id: 'b', label: 'Replot with a sensible baseline and read the actual values' },
              { id: 'c', label: 'Assume the author is always lying' },
            ],
            correctId: 'b',
            explain: 'Visualization choices shape emotion; inquiry checks the numbers.',
          },
          {
            id: 's3',
            type: 'overclaim',
            prompt: 'Which line overclaims from a single preprint?',
            sourceNote: 'Preprints can be revised or contradicted.',
            options: [
              { id: 'fair', text: 'This preprint suggests a pattern worth watching.', kind: 'fair' },
              {
                id: 'strong',
                text: 'Science has permanently settled every labor market question.',
                kind: 'too_strong',
              },
              { id: 'fair2', text: 'Replication and real-world deployment still matter.', kind: 'fair' },
            ],
            correctId: 'strong',
            explain: 'One paper rarely settles a whole field—especially in fast-moving tech.',
          },
        ],
      },
      {
        id: 'u12-l3',
        title: 'Narrative triage',
        blurb: 'Pick the best support for “media can outrun evidence.”',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'triage',
            claim: 'Incentive structures reward attention-grabbing AI stories.',
            prompt: 'Which evidence line supports that claim best?',
            sources: [
              {
                id: 'fish',
                label: 'Incentive critique',
                description: 'Discusses marketing and attention dynamics around AI narratives.',
              },
              {
                id: 'yale',
                label: 'Gradual mix',
                description: 'Historical analogy about slow occupational change.',
              },
              {
                id: 'cri',
                label: 'Medical research blog',
                description: 'Pattern finding in biomedical datasets.',
              },
            ],
            correctSourceId: 'fish',
            explain: 'Media incentives align with Fishkin-style critique more than Yale’s macro analogy.',
          },
          {
            id: 's2',
            type: 'ced',
            prompt: 'Sort a headline critique.',
            items: [
              {
                id: 'i1',
                text: 'The press release uses “revolutionize” five times.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'So readers should downweight certainty until methods are checked.',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'Inquiry rewards calibrating confidence to documentation quality.',
                bucketId: 'claim',
              },
            ],
            explain: 'Evidence is observable language; interpretation is the reader move; claim is the norm.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'A “fair” claim in inquiry language is typically:',
            options: [
              { id: 'a', label: 'Stronger than the cited evidence' },
              { id: 'b', label: 'Matched in strength to what sources actually establish' },
              { id: 'c', label: 'Purely emotional' },
            ],
            correctId: 'b',
            explain: 'Proportionality is the anti-overclaim move.',
          },
        ],
      },
    ],
  },
  {
    id: 'u13',
    level: 3,
    title: 'Ethics & governance',
    subtitle: 'Oversight, accountability, and labor voice as part of the story',
    lessons: [
      {
        id: 'u13-l1',
        title: 'High-stakes domains',
        blurb: 'Health, benefits, hiring—where errors hurt.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Why governance is a jobs issue',
            body:
              'When models influence hiring, benefits, or performance metrics, mistakes become livelihood issues. Governance is not an abstract AI-ethics sidebar—it is workplace reality.',
            paperRef: 'Extension: accountability',
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'A proportional claim about medical-pattern AI is:',
            options: [
              { id: 'a', label: 'It can assist research without replacing careful validation' },
              { id: 'b', label: 'It has solved all clinical outcomes everywhere' },
              { id: 'c', label: 'It never assists research' },
            ],
            correctId: 'a',
            explain: 'Proportional language matches what institutes typically describe.',
          },
          {
            id: 's3',
            type: 'sort',
            prompt: 'Sort: strengthens accountability vs weakens it.',
            buckets: [
              { id: 'acc', label: 'More accountability' },
              { id: 'weak', label: 'Less accountability' },
            ],
            items: [
              { id: 'i1', text: 'Logged human review for adverse decisions', bucketId: 'acc' },
              { id: 'i2', text: 'Black-box scores with no appeal', bucketId: 'weak' },
              { id: 'i3', text: 'Published model cards and limitations', bucketId: 'acc' },
            ],
            explain: 'Accountability mechanisms change who bears error costs.',
          },
        ],
      },
      {
        id: 'u13-l2',
        title: 'Autonomy & oversight',
        blurb: 'Less human in the loop can be real without being total.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Calibrate “autonomy”',
            body:
              'Autonomy is a spectrum: from autocomplete to agents that chain actions. The essay warns against both panic and complacency by keeping the spectrum visible.',
            paperRef: 'Tool vs autonomy frames (Level 3 recap)',
            glossaryTerms: ['autonomy'],
          },
          {
            id: 's2',
            type: 'match',
            prompt: 'Match concept to example.',
            left: [
              { id: 'l1', text: 'Human approves each customer email send' },
              { id: 'l2', text: 'Agent schedules meetings and emails without review' },
            ],
            right: [
              { id: 'r1', text: 'Higher autonomy risk' },
              { id: 'r2', text: 'Lower autonomy risk (still not zero)' },
            ],
            answer: { l1: 'r2', l2: 'r1' },
            explain: 'Risk tracks how much action happens without meaningful checkpoints.',
          },
          {
            id: 's3',
            type: 'scenario',
            setup:
              'A city uses AI to triage housing assistance forms. Errors spike for non-English applicants.',
            prompt: 'Governance should prioritize:',
            options: [
              { id: 'a', label: 'Faster throughput only' },
              { id: 'b', label: 'Audits, language fairness checks, and human override' },
              { id: 'c', label: 'Turning off all computers' },
            ],
            correctId: 'b',
            explain: 'High-stakes public services need equity-aware oversight—not only speed.',
          },
        ],
      },
      {
        id: 'u13-l3',
        title: 'Policy patterns',
        blurb: 'Rights, standards, and collective bargaining as levers.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'triage',
            claim: 'Worker voice can improve rollout safety and fairness.',
            prompt: 'Which support is most on-target?',
            sources: [
              {
                id: 'voice',
                label: 'Participatory design',
                description: 'Frontline input catches failure modes early.',
              },
              {
                id: 'vibes',
                label: 'Viral tweets',
                description: 'Loudness equals correctness.',
              },
              {
                id: 'solo',
                label: 'Solo hero coder',
                description: 'One genius fixes society.',
              },
            ],
            correctSourceId: 'voice',
            explain: 'Participation is a governance mechanism—not a guarantee, but on-target support.',
          },
          {
            id: 's2',
            type: 'ced',
            prompt: 'Sort governance lines.',
            items: [
              {
                id: 'i1',
                text: 'EU and U.S. debates propose transparency duties for high-risk uses.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'So “deploy first” is not the only norm on the table.',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'Inquiry readers should track governance as labor context.',
                bucketId: 'claim',
              },
            ],
            explain: 'Separate what legislatures are considering from what you conclude it implies.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'Automation risk is uneven partly because:',
            options: [
              { id: 'a', label: 'Tasks and institutions differ across roles and places' },
              { id: 'b', label: 'Technology never affects work' },
              { id: 'c', label: 'Everyone has identical tasks' },
            ],
            correctId: 'a',
            explain: 'Heterogeneity is central to fair analysis.',
            glossaryTerms: ['automation'],
          },
        ],
      },
    ],
  },
  {
    id: 'u14',
    level: 3,
    title: 'Scenarios in the wild',
    subtitle: 'Apply essay patterns to messy, realistic cases',
    lessons: [
      {
        id: 'u14-l1',
        title: 'Support desk redesign',
        blurb: 'Augmentation, metrics, and morale.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'scenario',
            setup:
              'A support team gets AI drafts; managers track “handle time” aggressively. Workers say quality feels worse.',
            prompt: 'An inquiry-style diagnosis includes:',
            options: [
              { id: 'a', label: 'Only counting layoffs' },
              {
                id: 'b',
                label: 'Task mix, metrics incentives, and quality—not only headcount',
              },
              { id: 'c', label: 'Assuming workers are always wrong' },
            ],
            correctId: 'b',
            explain: 'Labor quality and gaming dynamics matter in the essay’s frame.',
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'Talbot-style “meaning deficit” connects to:',
            options: [
              { id: 'a', label: 'Only entertainment media' },
              { id: 'b', label: 'Whether reduced busywork improves dignity—or removes structure without replacement' },
              { id: 'c', label: 'Proof that boredom is impossible' },
            ],
            correctId: 'b',
            explain: 'Meaning is part of the humane inquiry question.',
          },
          {
            id: 's3',
            type: 'sort',
            prompt: 'Sort interventions: more worker-centered vs more extractive.',
            buckets: [
              { id: 'good', label: 'Worker-centered' },
              { id: 'bad', label: 'Extractive' },
            ],
            items: [
              { id: 'i1', text: 'Co-design metrics with the team', bucketId: 'good' },
              { id: 'i2', text: 'Punish anyone who overrides a bad AI answer', bucketId: 'bad' },
              { id: 'i3', text: 'Train on failure cases together', bucketId: 'good' },
            ],
            explain: 'Patterns of respect and recourse show up in scenarios.',
          },
        ],
      },
      {
        id: 'u14-l2',
        title: 'Journalism workflow',
        blurb: 'Speed, verification, and hype pressure.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Speed vs verification',
            body:
              'Newsrooms face traffic incentives. AI tools can accelerate drafting—and also amplify errors if verification steps shrink. The inquiry move is to protect triage: which facts are anchored where?',
            paperRef: 'Fishkin + headline chain (applied)',
            glossaryTerms: ['hype'],
          },
          {
            id: 's2',
            type: 'triage',
            claim: 'A single-year jobs snapshot cannot justify “permanent law for all countries.”',
            prompt: 'Pick the supporting rationale.',
            sources: [
              {
                id: 'snap',
                label: 'Snapshot logic',
                description: 'Time-bounded measurement; careful extrapolation.',
              },
              {
                id: 'ceo',
                label: 'CEO optimism',
                description: 'Leaders predict sunshine.',
              },
              {
                id: 'meme',
                label: 'Memes',
                description: 'If it’s funny, it’s true.',
              },
            ],
            correctSourceId: 'snap',
            explain: 'Epistemic scope is the right support—not vibes.',
          },
          {
            id: 's3',
            type: 'overclaim',
            prompt: 'Which line overclaims?',
            sourceNote: 'Augmentation can change work without removing all humans.',
            options: [
              { id: 'fair', text: 'AI tools change how reporters research and draft.', kind: 'fair' },
              {
                id: 'strong',
                text: 'Therefore reporters no longer exist anywhere.',
                kind: 'too_strong',
              },
              { id: 'fair2', text: 'Roles may recompose rather than vanish uniformly.', kind: 'fair' },
            ],
            correctId: 'strong',
            explain: 'Watch for collapse from “changes” to “eliminates everywhere.”',
          },
        ],
      },
      {
        id: 'u14-l3',
        title: 'Capstone scenarios',
        blurb: 'Two cases, disciplined synthesis.',
        estimatedMinutes: 8,
        steps: [
          {
            id: 's1',
            type: 'scenario',
            setup:
              'A school district pilots AI tutors; equity advocates worry about uneven home internet and language support.',
            prompt: 'A proportional essay-style response stresses:',
            options: [
              { id: 'a', label: 'Technology alone fixes inequality without institutions' },
              { id: 'b', label: 'Access, pedagogy, and monitoring for bias—not only the model’s average score' },
              { id: 'c', label: 'Banning all education' },
            ],
            correctId: 'b',
            explain: 'Institutions mediate tech’s fairness impacts.',
          },
          {
            id: 's2',
            type: 'ced',
            prompt: 'Sort a wild scenario.',
            items: [
              {
                id: 'i1',
                text: 'Vendors promise full automation in press releases.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'So we should compare promises to deployment and labor data.',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'The essay trains skeptical hope: serious, not cynical.',
                bucketId: 'claim',
              },
            ],
            explain: 'Even applied scenarios use C-E-I discipline.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: 'The Genie/lamp frame mainly warns that:',
            options: [
              { id: 'a', label: 'Power without partnership can reshape dependence' },
              { id: 'b', label: 'Movies predict the stock market' },
              { id: 'c', label: 'Lamps are obsolete' },
            ],
            correctId: 'a',
            explain: 'The metaphor is about dependence and direction—not décor.',
          },
        ],
      },
    ],
  },
  {
    id: 'u15',
    level: 3,
    title: 'Inquiry toolkit',
    subtitle: 'C-E-I, triage, and proportional claims under pressure',
    lessons: [
      {
        id: 'u15-l1',
        title: 'Under pressure',
        blurb: 'How to keep discipline when timelines are short.',
        estimatedMinutes: 6,
        steps: [
          {
            id: 's1',
            type: 'teach',
            title: 'Fast doesn’t have to mean sloppy',
            body:
              'Even quick posts can name definitions, link sources, and separate evidence from interpretation. The essay’s reputation is built on habits you can reuse on deadline: triage first, slogan second.',
            paperRef: 'Meta: reusable inquiry habits',
          },
          {
            id: 's2',
            type: 'mcq',
            prompt: 'When you only have two minutes, the best move is often:',
            options: [
              { id: 'a', label: 'Share the scariest percentage' },
              { id: 'b', label: 'Say what you know, what you don’t, and what you’d check next' },
              { id: 'c', label: 'Claim certainty to sound authoritative' },
            ],
            correctId: 'b',
            explain: 'Epistemic honesty is compatible with brevity.',
          },
          {
            id: 's3',
            type: 'sort',
            prompt: 'Sort: inquiry habit vs anti-habit.',
            buckets: [
              { id: 'habit', label: 'Habit' },
              { id: 'anti', label: 'Anti-habit' },
            ],
            items: [
              { id: 'i1', text: 'Match sources to sub-claims', bucketId: 'habit' },
              { id: 'i2', text: 'Collapse all sources into one vibe', bucketId: 'anti' },
              { id: 'i3', text: 'Label scope: pilot vs nation vs globe', bucketId: 'habit' },
            ],
            explain: 'Habits are trainable; they protect you from accidental hype spread.',
          },
        ],
      },
      {
        id: 'u15-l2',
        title: 'Mini drills',
        blurb: 'Rapid C-E-I and triage reps.',
        estimatedMinutes: 7,
        steps: [
          {
            id: 's1',
            type: 'ced',
            prompt: 'Drill: sort quickly.',
            items: [
              {
                id: 'i1',
                text: 'ITIF compares AI-related job creation and displacement for a recent year.',
                bucketId: 'evidence',
              },
              {
                id: 'i2',
                text: 'So net stories need cohort and job-quality detail—not only the ratio.',
                bucketId: 'interpretation',
              },
              {
                id: 'i3',
                text: 'The essay wants proportional reading of snapshots.',
                bucketId: 'claim',
              },
            ],
            explain: 'Speed drill: same buckets, tighter sentences.',
          },
          {
            id: 's2',
            type: 'triage',
            claim: 'Some “replace all jobs” talk tracks marketing incentives.',
            prompt: 'Fast triage: best source family?',
            sources: [
              {
                id: 'fish',
                label: 'Fishkin',
                description: 'Critique of hype and incentives.',
              },
              {
                id: 'yale',
                label: 'Yale',
                description: 'Gradual occupational mix shifts.',
              },
              {
                id: 'ost',
                label: 'ITIF',
                description: 'Jobs created vs lost snapshot.',
              },
            ],
            correctSourceId: 'fish',
            explain: 'Marketing critique matches the claim; others support different sub-claims.',
          },
          {
            id: 's3',
            type: 'mcq',
            prompt: '“Interpretation” is:',
            options: [
              { id: 'a', label: 'Your “so what?” in your own voice—tied to evidence' },
              { id: 'b', label: 'A direct quote with no analysis' },
              { id: 'c', label: 'Whatever feels true' },
            ],
            correctId: 'a',
            explain: 'Interpretation is reasoning, not ventriloquism.',
            glossaryTerms: ['interpretation'],
          },
        ],
      },
      {
        id: 'u15-l3',
        title: 'Leave the lamp wisely',
        blurb: 'Final synthesis: hope, humility, and next reads.',
        estimatedMinutes: 8,
        steps: [
          {
            id: 's1',
            type: 'scenario',
            setup:
              'A friend asks: “So should I panic about AI and jobs?” You want the essay’s tone: honest stakes, no false certainty.',
            prompt: 'The best answer sounds like:',
            options: [
              { id: 'a', label: '“Yes, panic maximally about everything.”' },
              {
                id: 'b',
                label: '“Impacts are real and uneven; hope needs institutions, training, and evidence—not slogans.”',
              },
              { id: 'c', label: '“Nothing will ever change.”' },
            ],
            correctId: 'b',
            explain: 'Hope-forward + humility matches the closing frame.',
          },
          {
            id: 's2',
            type: 'overclaim',
            prompt: 'Which line is too strong for a careful companion?',
            sourceNote: 'Match strength to evidence; avoid universal timelines.',
            options: [
              { id: 'fair', text: 'Labor patterns suggest some tasks are more sliceable than others.', kind: 'fair' },
              {
                id: 'strong',
                text: 'We know exactly every person’s career outcome for the next twenty years.',
                kind: 'too_strong',
              },
              { id: 'fair2', text: 'Readers should keep tracing sources after the path ends.', kind: 'fair' },
            ],
            correctId: 'strong',
            explain: 'The path trains habits; it doesn’t certify individual futures.',
          },
          {
            id: 's3',
            type: 'teach',
            title: 'What now?',
            body:
              'Return to the essay with vocabulary: augmentation, displacement, recomposition, hype, triage. Pick one source cited there and read it directly. Use C-E-I on a paragraph you find confusing—you’re practicing the same moves this path drilled.',
            paperRef: 'Closing: partners with the Genie',
            glossaryTerms: ['augmentation', 'displacement', 'recomposition', 'hype', 'triage'],
          },
        ],
      },
    ],
  },
]
