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

const STORAGE_KEY = 'inquiry_path_v1'
const LEGACY_STORAGE_KEY = 'duligo_v1'

type Settings = {
  sound: boolean
  reducedMotion: boolean
}

type StoredV1 = {
  version: 1
  seenIntro: boolean
  settings: Settings
  completedLessons: Record<string, boolean>
  lastStreakLocalDate: string | null
  streakCount: number
}

type Stored = {
  version: 2
  seenIntro: boolean
  settings: Settings
  completedLessons: Record<string, boolean>
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

function normalizeV2(p: Stored, today: string): Stored {
  let lessonsTodayDate = p.lessonsTodayDate ?? null
  let lessonsTodayCount = typeof p.lessonsTodayCount === 'number' ? p.lessonsTodayCount : 0
  if (lessonsTodayDate !== today) {
    lessonsTodayDate = null
    lessonsTodayCount = 0
  }
  const completedLessons = p.completedLessons ?? {}
  const totalXp = typeof p.totalXp === 'number' && Number.isFinite(p.totalXp) ? p.totalXp : 0
  return {
    version: 2,
    seenIntro: Boolean(p.seenIntro),
    settings: {
      sound: p.settings?.sound ?? false,
      reducedMotion: p.settings?.reducedMotion ?? false,
    },
    completedLessons,
    lastStreakLocalDate: p.lastStreakLocalDate ?? null,
    streakCount: typeof p.streakCount === 'number' ? p.streakCount : 0,
    achievements: {
      ...(p.achievements ?? {}),
      ...computeAchievements(completedLessons, lessonsTodayCount),
    },
    lessonsTodayDate,
    lessonsTodayCount,
    totalXp,
  }
}

function parseRawToStored(raw: string, today: string): Stored | null {
  const p = JSON.parse(raw) as Stored | StoredV1
  if (p.version === 2) {
    return normalizeV2(p as Stored, today)
  }
  if (p.version === 1) {
    const completed = p.completedLessons ?? {}
    return {
      version: 2,
      seenIntro: Boolean(p.seenIntro),
      settings: {
        sound: p.settings?.sound ?? false,
        reducedMotion: p.settings?.reducedMotion ?? false,
      },
      completedLessons: completed,
      lastStreakLocalDate: p.lastStreakLocalDate ?? null,
      streakCount: typeof p.streakCount === 'number' ? p.streakCount : 0,
      achievements: computeAchievements(completed, 0),
      lessonsTodayDate: null,
      lessonsTodayCount: 0,
      totalXp: 0,
    }
  }
  return null
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
      version: 2,
      seenIntro: false,
      settings: { sound: false, reducedMotion: false },
      completedLessons: {},
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
  completedLessons: Record<string, boolean>
  isLessonComplete: (unitId: string, lessonId: string) => boolean
  completeLesson: (unitId: string, lessonId: string) => void
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

  const isLessonComplete = useCallback(
    (unitId: string, lessonId: string) => Boolean(stored.completedLessons[`${unitId}:${lessonId}`]),
    [stored.completedLessons],
  )

  const addXp = useCallback((amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return
    setStored((s) => ({
      ...s,
      totalXp: (typeof s.totalXp === 'number' ? s.totalXp : 0) + Math.round(amount),
    }))
  }, [])

  const completeLesson = useCallback((unitId: string, lessonId: string) => {
    const key = `${unitId}:${lessonId}`
    setStored((s) => {
      const completedLessons = { ...s.completedLessons, [key]: true }
      const today = localDateString()
      let { streakCount, lastStreakLocalDate } = s
      if (lastStreakLocalDate !== today) {
        if (lastStreakLocalDate === yesterdayString(today)) {
          streakCount = Math.max(1, streakCount + 1)
        } else {
          streakCount = 1
        }
        lastStreakLocalDate = today
      }

      let lessonsTodayCount = s.lessonsTodayCount
      let lessonsTodayDate = s.lessonsTodayDate
      if (lessonsTodayDate !== today) {
        lessonsTodayDate = today
        lessonsTodayCount = 1
      } else {
        lessonsTodayCount += 1
      }

      const achievements = {
        ...s.achievements,
        ...computeAchievements(completedLessons, lessonsTodayCount),
      }

      return {
        ...s,
        version: 2,
        completedLessons,
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
      const done = unit.lessons.filter((l) => stored.completedLessons[`${unitId}:${l.id}`]).length
      const total = unit.lessons.length
      if (total === 0) return 0
      return Math.round((done / total) * 5)
    },
    [stored.completedLessons],
  )

  const pathProgress = useMemo(() => {
    const total = UNITS.reduce((acc, u) => acc + u.lessons.length, 0)
    const completed = UNITS.reduce(
      (acc, u) => acc + u.lessons.filter((l) => stored.completedLessons[`${u.id}:${l.id}`]).length,
      0,
    )
    return { completed, total }
  }, [stored.completedLessons])

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
      completedLessons: stored.completedLessons,
      isLessonComplete,
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
      stored.completedLessons,
      stored.streakCount,
      stored.lastStreakLocalDate,
      stored.achievements,
      stored.lessonsTodayCount,
      stored.totalXp,
      setSeenIntro,
      setSettings,
      isLessonComplete,
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
