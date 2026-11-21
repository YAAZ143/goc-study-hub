'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { courses, getCourse } from '@/lib/courses'
import type { View } from '@/lib/types'
import { findItem } from '@/lib/course-utils'
import { useProgress } from '@/lib/progress-store'
import { DashboardView } from './dashboard-view'
import { ItemView } from './item-view'
import { PrintCheatSheet } from './print-cheat-sheet'
import { ScheduleView } from './schedule-view'
import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'
import { ZoneBadge } from './shared'

function getCrumbs(view: View): string[] {
  if (view.type === 'dashboard') return ['Command Center', 'Dashboard']
  if (view.type === 'schedule') return ['Command Center', '7-Day Cram Schedule']
  const course = getCourse(view.courseId)
  if (!course) return ['Command Center']
  if (view.type === 'course') return ['Command Center', course.short]
  const { item } = findItem(course, view.itemId)
  if (!item) return ['Command Center', course.short]
  if (item.kind === 'lesson') return [course.short, `Unit ${item.unit.number}`, `${item.lesson.number} ${item.lesson.title}`]
  if (item.kind === 'unitExam') return [course.short, `Unit ${item.unit.number}`, 'Unit Exam']
  return [course.short, 'Course Final Exam']
}

export function AppShell() {
  const { hydrated } = useProgress()
  const [view, setView] = useState<View>({ type: 'dashboard' })
  const [mobileOpen, setMobileOpen] = useState(false)

  function navigate(v: View) {
    setView(v)
    window.scrollTo({ top: 0 })
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-obsidian">
        <p className="animate-pulse font-mono text-sm text-muted-foreground">Loading Command Center…</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex min-h-dvh bg-obsidian print:hidden">
        <aside className="sticky top-0 hidden h-dvh shrink-0 lg:block">
          <Sidebar view={view} onNavigate={navigate} />
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true" aria-label="Course menu">
            <div className="h-full shadow-2xl">
              <Sidebar view={view} onNavigate={navigate} onClose={() => setMobileOpen(false)} />
            </div>
            <button type="button" className="flex-1 bg-black/60" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar crumbs={getCrumbs(view)} onMenu={() => setMobileOpen(true)} />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            {view.type === 'dashboard' && <DashboardView onNavigate={navigate} />}
            {view.type === 'schedule' && <ScheduleView onNavigate={navigate} />}
            {view.type === 'course' && <ComingSoon courseId={view.courseId} />}
            {view.type === 'item' && (() => {
              const course = getCourse(view.courseId)
              return course ? <ItemView key={view.itemId} course={course} itemId={view.itemId} onNavigate={navigate} /> : null
            })()}
          </main>
        </div>
      </div>
      <PrintCheatSheet course={courses[0]} />
    </>
  )
}

function ComingSoon({ courseId }: { courseId: string }) {
  const course = getCourse(courseId)
  if (!course) return null
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center">
      <Lock className="size-10 text-muted-foreground" aria-hidden="true" />
      <ZoneBadge zone={course.zone} />
      <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
      <p className="text-sm text-muted-foreground">
        This course slot is ready for its lessons, flashcards, and Mastery Loops. Content for Course {course.number} drops next.
      </p>
    </div>
  )
}
