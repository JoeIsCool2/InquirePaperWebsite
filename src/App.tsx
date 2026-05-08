import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import { AppStateProvider } from '@/context/AppStateContext'
import GlossaryPage from '@/pages/GlossaryPage'
import Home from '@/pages/Home'
import LessonDepthRedirect from '@/pages/LessonDepthRedirect'
import LessonPage from '@/pages/LessonPage'
import PaperBridge from '@/pages/PaperBridge'
import SkillPath from '@/pages/SkillPath'
import UnitPage from '@/pages/UnitPage'

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="path" element={<SkillPath />} />
            <Route path="unit/:unitId" element={<UnitPage />} />
            <Route path="lesson/:unitId/:lessonId" element={<LessonDepthRedirect />} />
            <Route path="lesson/:unitId/:lessonId/:depth" element={<LessonPage />} />
            <Route path="paper" element={<PaperBridge />} />
            <Route path="glossary" element={<GlossaryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  )
}
