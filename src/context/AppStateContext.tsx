import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AchievementId } from '@/data/achievements'
import { UNITS } from '@/data/curriculum'
import { depthKey, l1CompletedMap, type DepthLevel } from '@/data/lessonDepthKeys'

const STORAGE_KEY = 'inquiry_path_v1'
const LEGACY_STORAGE_KEY = 'duligo_v1'

type Settings = {
  sound: boolean
  reducedMotion: boolean
}

type Stored = {
  version: 3
  seenIntro: boolean
  settings: Settings
  /** Keys `unitId:lessonId:d1|d2|d3` */
  lessonDepthComplete: Record<string, boolean>
  lastStreakLocalDate: string | null
  streakCount: number
  achievements: Partial<Record<AchievementId, true>>
  lessonsTodayDate: string | null
  lessonsTodayCount: number
  totalXp: number
}

function localDateString(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function yesterdayString(today: string) {
  const [y, m, d] = today.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() - 1)
  return localDateString(dt)
}

function totalLessonsDone(completed: Record<string, boolean>) {
  return UNITS.reduce(
    (acc, u) => acc + u.lessons.filter((l) => completed[`${u.id}:${l.id}`]).length,
    0,
  )
}

function pathComplete(completed: Record<string, boolean>) {
  const total = UNITS.reduce((acc, u) => acc + u.lessons.length, 0)
  return totalLessonsDone(completed) >= total && total > 0
}

function anyCrown5(completed: Record<string, boolean>) {
  return UNITS.some((u) => {
    const total = u.lessons.length
    if (!total) return false
    const done = u.lessons.filter((l) => completed[`${u.id}:${l.id}`]).length
    return Math.round((done / total) * 5) >= 5
  })
}

function computeAchievements(
  completed: Record<string, boolean>,
  lessonsTodayCount: number,
): Partial<Record<AchievementId, true>> {
  const out: Partial<Record<AchievementId, true>> = {}
  const doneCount = totalLessonsDone(completed)
  if (doneCount >= 1) out.first_lesson = true
  if (lessonsTodayCount >= 1) out.daily_goal = true
  if (doneCount >= 5) out.five_lessons = true
  if (anyCrown5(completed)) out.crown_5 = true
  if (pathComplete(completed)) out.path_complete = true
  return out
}

function migrateToStoredV3(parsed: Record<string, unknown>, today: string): Stored {
  const lessonDepthComplete: Record<string, boolean> = {}

  const ldc = parsed.lessonDepthComplete as Record<string, boolean> | undefined
  if (ldc && typeof ldc === 'object') {
    Object.assign(lessonDepthComplete, ldc)
  }
  const legacy = parsed.completedLessons as Record<string, boolean> | undefined
  if (legacy && typeof legacy === 'object') {
    for (const [k, v] of Object.entries(legacy)) {
      if (v) lessonDepthComplete[`${k}:d1`] = true
    }
  }

  let lessonsTodayDate = (parsed.lessonsTodayDate as string | null) ?? null
  let lessonsTodayCount = typeof parsed.lessonsTodayCount === 'number' ? parsed.lessonsTodayCount : 0
  if (lessonsTodayDate !== today) {
    lessonsTodayDate = null
    lessonsTodayCount = 0
  }

  const totalXp = typeof parsed.totalXp === 'number' && Number.isFinite(parsed.totalXp) ? parsed.totalXp : 0
  const l1 = l1CompletedMap(lessonDepthComplete)
  const settings = parsed.settings as Settings | undefined

  return {
    version: 3,
    seenIntro: Boolean(parsed.seenIntro),
    settings: {
      sound: settings?.sound ?? false,
      reducedMotion: settings?.reducedMotion ?? false,
    },
    lessonDepthComplete,
    lastStreakLocalDate: (parsed.lastStreakLocalDate as string | null) ?? null,
    streakCount: typeof parsed.streakCount === 'number' ? parsed.streakCount : 0,
    achievements: {
      ...((parsed.achievements as Partial<Record<AchievementId, true>>) ?? {}),
      ...computeAchievements(l1, lessonsTodayCount),
    },
    lessonsTodayDate,
    lessonsTodayCount,
    totalXp,
  }
}

function parseRawToStored(raw: string, today: string): Stored | null {
  try {
    const p = JSON.parse(raw) as Record<string, unknown>
    return migrateToStoredV3(p, today)
  } catch {
    return null
  }
}

function loadStored(): Stored {
  const today = localDateString()
  try {
    let raw = localStorage.getItem(STORAGE_KEY)
    let usedLegacy = false
    if (!raw) {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY)
      usedLegacy = Boolean(raw)
    }
    if (!raw) throw new Error('empty')
    const stored = parseRawToStored(raw, today)
    if (!stored) throw new Error('parse')
    if (usedLegacy) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
        localStorage.removeItem(LEGACY_STORAGE_KEY)
      } catch {
        /* ignore */
      }
    }
    return stored
  } catch {
    return {
      version: 3,
      seenIntro: false,
      settings: { sound: false, reducedMotion: false },
      lessonDepthComplete: {},
      lastStreakLocalDate: null,
      streakCount: 0,
      achievements: {},
      lessonsTodayDate: null,
      lessonsTodayCount: 0,
      totalXp: 0,
    }
  }
}

type AppStateContextValue = {
  seenIntro: boolean
  setSeenIntro: (v: boolean) => void
  settings: Settings
  setSettings: (patch: Partial<Settings>) => void
  lessonDepthComplete: Record<string, boolean>
  isLessonComplete: (unitId: string, lessonId: string) => boolean
  isDepthComplete: (unitId: string, lessonId: string, depth: DepthLevel) => boolean
  completeLesson: (unitId: string, lessonId: string, depth: DepthLevel) => void
  addXp: (amount: number) => void
  streakCount: number
  lastStreakLocalDate: string | null
  unitCrownLevel: (unitId: string) => number
  pathProgress: { completed: number; total: number }
  achievements: Partial<Record<AchievementId, true>>
  dailyGoalMet: boolean
  lessonsTodayCount: number
  totalXp: number
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Stored>(() => loadStored())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  }, [stored])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', stored.settings.reducedMotion)
  }, [stored.settings.reducedMotion])

  const setSeenIntro = useCallback((v: boolean) => {
    setStored((s) => ({ ...s, seenIntro: v }))
  }, [])

  const setSettings = useCallback((patch: Partial<Settings>) => {
    setStored((s) => ({ ...s, settings: { ...s.settings, ...patch } }))
  }, [])

  const isDepthComplete = useCallback(
    (unitId: string, lessonId: string, depth: DepthLevel) =>
      Boolean(stored.lessonDepthComplete[depthKey(unitId, lessonId, depth)]),
    [stored.lessonDepthComplete],
  )

  const isLessonComplete = useCallback(
    (unitId: string, lessonId: string) => isDepthComplete(unitId, lessonId, 1),
    [isDepthComplete],
  )

  const addXp = useCallback((amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return
    setStored((s) => ({
      ...s,
      totalXp: (typeof s.totalXp === 'number' ? s.totalXp : 0) + Math.round(amount),
    }))
  }, [])

  const completeLesson = useCallback((unitId: string, lessonId: string, depth: DepthLevel) => {
    setStored((s) => {
      const dk = depthKey(unitId, lessonId, depth)
      const already = Boolean(s.lessonDepthComplete[dk])
      const lessonDepthComplete = { ...s.lessonDepthComplete, [dk]: true }
      const today = localDateString()
      let { streakCount, lastStreakLocalDate } = s
      let lessonsTodayCount = s.lessonsTodayCount
      let lessonsTodayDate = s.lessonsTodayDate

      if (depth === 1 && !already) {
        if (lastStreakLocalDate !== today) {
          if (lastStreakLocalDate === yesterdayString(today)) {
            streakCount = Math.max(1, streakCount + 1)
          } else {
            streakCount = 1
          }
          lastStreakLocalDate = today
        }

        if (lessonsTodayDate !== today) {
          lessonsTodayDate = today
          lessonsTodayCount = 1
        } else {
          lessonsTodayCount += 1
        }
      }

      const l1 = l1CompletedMap(lessonDepthComplete)
      const achievements = {
        ...s.achievements,
        ...computeAchievements(l1, lessonsTodayCount),
      }

      return {
        ...s,
        version: 3,
        lessonDepthComplete,
        streakCount,
        lastStreakLocalDate,
        lessonsTodayDate,
        lessonsTodayCount,
        achievements,
      }
    })
  }, [])

  const unitCrownLevel = useCallback(
    (unitId: string) => {
      const unit = UNITS.find((u) => u.id === unitId)
      if (!unit) return 0
      const done = unit.lessons.filter((l) =>
        Boolean(stored.lessonDepthComplete[depthKey(unitId, l.id, 1)]),
      ).length
      const total = unit.lessons.length
      if (total === 0) return 0
      return Math.round((done / total) * 5)
    },
    [stored.lessonDepthComplete],
  )

  const pathProgress = useMemo(() => {
    const total = UNITS.reduce((acc, u) => acc + u.lessons.length, 0)
    const completed = UNITS.reduce(
      (acc, u) =>
        acc +
        u.lessons.filter((l) => Boolean(stored.lessonDepthComplete[depthKey(u.id, l.id, 1)])).length,
      0,
    )
    return { completed, total }
  }, [stored.lessonDepthComplete])

  const dailyGoalMet = useMemo(() => {
    const today = localDateString()
    return stored.lessonsTodayDate === today && stored.lessonsTodayCount >= 1
  }, [stored.lessonsTodayDate, stored.lessonsTodayCount])

  const value = useMemo<AppStateContextValue>(
    () => ({
      seenIntro: stored.seenIntro,
      setSeenIntro,
      settings: stored.settings,
      setSettings,
      lessonDepthComplete: stored.lessonDepthComplete,
      isLessonComplete,
      isDepthComplete,
      completeLesson,
      addXp,
      streakCount: stored.streakCount,
      lastStreakLocalDate: stored.lastStreakLocalDate,
      unitCrownLevel,
      pathProgress,
      achievements: stored.achievements,
      dailyGoalMet,
      lessonsTodayCount: stored.lessonsTodayCount,
      totalXp: typeof stored.totalXp === 'number' ? stored.totalXp : 0,
    }),
    [
      stored.seenIntro,
      stored.settings,
      stored.lessonDepthComplete,
      stored.streakCount,
      stored.lastStreakLocalDate,
      stored.achievements,
      stored.lessonsTodayCount,
      stored.totalXp,
      setSeenIntro,
      setSettings,
      isLessonComplete,
      isDepthComplete,
      completeLesson,
      addXp,
      unitCrownLevel,
      pathProgress,
      dailyGoalMet,
    ],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState outside provider')
  return ctx
}
