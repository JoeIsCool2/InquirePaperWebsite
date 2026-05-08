import { useCallback, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  IconBook,
  IconCheck,
  IconGear,
  IconHome,
  IconLamp,
  IconPath,
  IconProgress,
  IconStreak,
} from '@/components/icons'
import IntroModal from '@/components/IntroModal'
import SettingsPanel from '@/components/SettingsPanel'
import { useAppState } from '@/context/AppStateContext'

function navClass({ isActive }: { isActive: boolean }) {
  return 'nav-link' + (isActive ? ' active' : '')
}

export default function Layout() {
  const { streakCount, pathProgress, dailyGoalMet, totalXp } = useAppState()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const closeSettings = useCallback(() => setSettingsOpen(false), [])

  return (
    <div className="mesh-page">
      <div className="lamp-glow" aria-hidden />
      <IntroModal />
      <SettingsPanel open={settingsOpen} onClose={closeSettings} />
      <div className="app-shell">
        <header className="app-header glass-header">
          <Link className="brand" to="/">
            <span className="brand-row">
              <IconLamp className="brand-lamp" />
              <span className="brand-mark">Inquiry Path</span>
            </span>
            <span className="brand-sub">AI &amp; jobs · inquiry companion</span>
          </Link>
          <div className="header-meta">
            <span
              className={'goal-pill' + (dailyGoalMet ? ' goal-pill--met' : '')}
              title="Complete at least one lesson today"
            >
              <IconCheck className="icon-tiny" />
              <span>{dailyGoalMet ? 'Daily goal met' : 'Goal: 1 lesson'}</span>
            </span>
            <span className="streak-pill" title="Streak">
              <IconStreak className="icon-tiny" />
              <span>{streakCount}d</span>
            </span>
            <span className="streak-pill" title="Lessons completed">
              <IconProgress className="icon-tiny" />
              <span>
                {pathProgress.completed}/{pathProgress.total}
              </span>
            </span>
            <span className="streak-pill xp-pill" title="Lifetime XP (earned from lessons)">
              <span className="xp-pill-mark" aria-hidden>
                ✦
              </span>
              <span>{totalXp} XP</span>
            </span>
            <button
              type="button"
              className="icon-button"
              aria-label="Open settings"
              onClick={() => setSettingsOpen(true)}
            >
              <IconGear />
            </button>
          </div>
        </header>
        <nav className="nav-row nav-row--main" aria-label="Primary">
          <NavLink className={navClass} to="/" end>
            <IconHome className="nav-icon" />
            Home
          </NavLink>
          <NavLink className={navClass} to="/path">
            <IconPath className="nav-icon" />
            Path
          </NavLink>
          <NavLink className={navClass} to="/paper">
            <IconBook className="nav-icon" />
            Paper
          </NavLink>
          <NavLink className={navClass} to="/glossary">
            <span className="nav-icon" aria-hidden>
              Aa
            </span>
            Glossary
          </NavLink>
        </nav>
        <main className="main-outlet page-enter">
          <Outlet />
        </main>
      </div>
      <nav className="bottom-nav glass-header" aria-label="Mobile primary">
        <NavLink className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active' : '')} to="/" end>
          <IconHome />
          <span>Home</span>
        </NavLink>
        <NavLink className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active' : '')} to="/path">
          <IconPath />
          <span>Path</span>
        </NavLink>
        <NavLink className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active' : '')} to="/paper">
          <IconBook />
          <span>Paper</span>
        </NavLink>
        <NavLink className={({ isActive }) => 'bottom-nav-link' + (isActive ? ' active' : '')} to="/glossary">
          <span className="bottom-nav-aa">Aa</span>
          <span>Words</span>
        </NavLink>
      </nav>
    </div>
  )
}
