import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CedSortStepView from '@/components/CedSortStepView'
import Confetti from '@/components/Confetti'
import LessonCompletePanel from '@/components/LessonCompletePanel'
import MatchStepView from '@/components/MatchStepView'
import McqStepView from '@/components/McqStepView'
import OverclaimStepView from '@/components/OverclaimStepView'
import ScenarioStepView from '@/components/ScenarioStepView'
import SortStepView from '@/components/SortStepView'
import TeachStepView from '@/components/TeachStepView'
import TriageStepView from '@/components/TriageStepView'
import { useAppState } from '@/context/AppStateContext'
import { getNextLesson } from '@/data/curriculum'
import { useFeedbackSound } from '@/hooks/useFeedbackSound'
import type { Lesson, LessonStep, Unit } from '@/types/curriculum'
import { starsFromMistakes, xpFromStars } from '@/utils/lessonScore'

type Props = {
  unit: Unit
  lesson: Lesson
}

type StepHandlers = {
  onSolved: () => void
  onMistake: () => void
}

function LessonStepBody({ step, handlers }: { step: LessonStep; handlers: StepHandlers }) {
  switch (step.type) {
    case 'teach':
      return <TeachStepView step={step} />
    case 'mcq':
      return <McqStepView step={step} onSolved={handlers.onSolved} onMistake={handlers.onMistake} />
    case 'match':
      return <MatchStepView step={step} onSolved={handlers.onSolved} onMistake={handlers.onMistake} />
    case 'sort':
      return <SortStepView step={step} onSolved={handlers.onSolved} onMistake={handlers.onMistake} />
    case 'overclaim':
      return <OverclaimStepView step={step} onSolved={handlers.onSolved} onMistake={handlers.onMistake} />
    case 'scenario':
      return <ScenarioStepView step={step} onSolved={handlers.onSolved} onMistake={handlers.onMistake} />
    case 'triage':
      return <TriageStepView step={step} onSolved={handlers.onSolved} onMistake={handlers.onMistake} />
    case 'ced':
      return <CedSortStepView step={step} onSolved={handlers.onSolved} onMistake={handlers.onMistake} />
  }
}

export default function LessonPlayer({ unit, lesson }: Props) {
  const { completeLesson, addXp, isLessonComplete, completedLessons } = useAppState()
  const sound = useFeedbackSound()
  const [stepIndex, setStepIndex] = useState(0)
  const [solved, setSolved] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const [showComplete, setShowComplete] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [lastXpEarned, setLastXpEarned] = useState(0)
  const finishedRef = useRef(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const steps = lesson.steps
  const step = steps[stepIndex]
  const progress = (stepIndex + 1) / steps.length
  const nextLesson = getNextLesson(unit.id, lesson.id)

  const closeComplete = useCallback(() => setShowComplete(false), [])

  const recordMistake = useCallback(() => setMistakes((m) => m + 1), [])

  const stepHandlers: StepHandlers = useMemo(
    () => ({
      onSolved: () => setSolved(true),
      onMistake: recordMistake,
    }),
    [recordMistake],
  )

  useEffect(() => {
    setStepIndex(0)
    setSolved(false)
    setShowComplete(false)
    setMistakes(0)
    setLastXpEarned(0)
    finishedRef.current = false
  }, [lesson.id])

  useEffect(() => {
    const st = lesson.steps[stepIndex]
    setSolved(st?.type === 'teach')
  }, [lesson.id, lesson.steps, stepIndex])

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    if (showComplete) el.setAttribute('inert', '')
    else el.removeAttribute('inert')
  }, [showComplete])

  const isTeach = step.type === 'teach'
  const showContinue = isTeach || solved

  function goNext() {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1)
      return
    }

    if (!finishedRef.current) {
      finishedRef.current = true
      const wasAlreadyDone = isLessonComplete(unit.id, lesson.id)
      const nextCompleted = { ...completedLessons, [`${unit.id}:${lesson.id}`]: true }
      const unitDone = unit.lessons.every((l) => nextCompleted[`${unit.id}:${l.id}`])
      if (!wasAlreadyDone) {
        const stars = starsFromMistakes(mistakes)
        const xpEarned = xpFromStars(stars)
        setLastXpEarned(xpEarned)
        addXp(xpEarned)
      } else {
        setLastXpEarned(0)
      }
      completeLesson(unit.id, lesson.id)
      if (unitDone && !wasAlreadyDone) {
        setCelebrate(true)
        sound('complete')
        window.setTimeout(() => setCelebrate(false), 1400)
      }
    }

    setShowComplete(true)
  }

  return (
    <div className="lesson-player">
      <Confetti active={celebrate} />
      <LessonCompletePanel
        open={showComplete}
        unitId={unit.id}
        lessonTitle={lesson.title}
        unitTitle={unit.title}
        mistakes={mistakes}
        xpEarned={lastXpEarned}
        nextLessonId={nextLesson?.id}
        onClose={closeComplete}
      />

      <div ref={mainRef} className="lesson-player-main">
        <div className="lesson-meta-row">
          <span className="text-muted text-small">
            Step {stepIndex + 1} / {steps.length}
          </span>
          {lesson.estimatedMinutes ? (
            <span className="text-muted text-small">~{lesson.estimatedMinutes} min</span>
          ) : null}
        </div>

        <div className="progress-track progress-track--lesson" aria-hidden>
          <div
            className="progress-fill progress-fill--spring"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="step-dots" aria-hidden>
          {steps.map((_, i) => (
            <span
              key={i}
              className={
                'step-dot' + (i === stepIndex ? ' step-dot--active' : '') + (i < stepIndex ? ' step-dot--done' : '')
              }
            />
          ))}
        </div>

        <div className="step-stage" key={step.id}>
          <LessonStepBody step={step} handlers={stepHandlers} />
        </div>

        {showContinue ? (
          <div className="lesson-footer">
            <button type="button" className="btn btn-primary btn-lg" onClick={goNext}>
              {stepIndex < steps.length - 1 ? 'Continue' : 'Finish lesson'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
