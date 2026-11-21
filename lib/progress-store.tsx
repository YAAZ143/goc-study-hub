'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type QStatus = 'unseen' | 'practice' | 'mastered'

export interface Progress {
  xp: number
  completed: Record<string, boolean>
  questions: Record<string, QStatus>
  startDate: string | null
}

const STORAGE_KEY = 'goc-finals-command-center:v1'
const EMPTY: Progress = { xp: 0, completed: {}, questions: {}, startDate: null }

interface ProgressContextValue {
  progress: Progress
  hydrated: boolean
  getStatus: (quizId: string, questionId: string) => QStatus
  setQuestionStatus: (quizId: string, questionId: string, status: QStatus) => void
  resetQuiz: (quizId: string, questionIds: string[]) => void
  addXp: (amount: number) => void
  completeItem: (id: string, xp: number) => void
  toggleComplete: (id: string) => void
  restartCountdown: () => void
  resetAll: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(EMPTY)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    let loaded = EMPTY
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) loaded = { ...EMPTY, ...JSON.parse(raw) }
    } catch {
      loaded = EMPTY
    }
    if (!loaded.startDate) loaded = { ...loaded, startDate: new Date().toISOString() }
    setProgress(loaded)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress, hydrated])

  const getStatus = useCallback(
    (quizId: string, questionId: string) => progress.questions[`${quizId}:${questionId}`] ?? 'unseen',
    [progress.questions],
  )

  const setQuestionStatus = useCallback((quizId: string, questionId: string, status: QStatus) => {
    setProgress((p) => ({ ...p, questions: { ...p.questions, [`${quizId}:${questionId}`]: status } }))
  }, [])

  const resetQuiz = useCallback((quizId: string, questionIds: string[]) => {
    setProgress((p) => {
      const questions = { ...p.questions }
      for (const id of questionIds) delete questions[`${quizId}:${id}`]
      return { ...p, questions }
    })
  }, [])

  const addXp = useCallback((amount: number) => setProgress((p) => ({ ...p, xp: p.xp + amount })), [])

  const completeItem = useCallback((id: string, xp: number) => {
    setProgress((p) => (p.completed[id] ? p : { ...p, xp: p.xp + xp, completed: { ...p.completed, [id]: true } }))
  }, [])

  const toggleComplete = useCallback((id: string) => {
    setProgress((p) => {
      const completed = { ...p.completed }
      if (completed[id]) delete completed[id]
      else completed[id] = true
      return { ...p, completed }
    })
  }, [])

  const restartCountdown = useCallback(() => setProgress((p) => ({ ...p, startDate: new Date().toISOString() })), [])
  const resetAll = useCallback(() => setProgress({ ...EMPTY, startDate: new Date().toISOString() }), [])

  const value = useMemo(
    () => ({
      progress,
      hydrated,
      getStatus,
      setQuestionStatus,
      resetQuiz,
      addXp,
      completeItem,
      toggleComplete,
      restartCountdown,
      resetAll,
    }),
    [progress, hydrated, getStatus, setQuestionStatus, resetQuiz, addXp, completeItem, toggleComplete, restartCountdown, resetAll],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
