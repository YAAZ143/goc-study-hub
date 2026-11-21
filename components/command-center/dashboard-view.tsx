'use client'

import { ArrowRight, Brain, CircleCheck, Trophy, Zap } from 'lucide-react'
import { courses } from '@/lib/courses'
import type { View } from '@/lib/types'
import { courseReadiness, firstOpenItem, getSequence, itemLabel } from '@/lib/course-utils'
import { useProgress } from '@/lib/progress-store'
import { ProgressBar, ZoneBadge } from './shared'

export function DashboardView({ onNavigate }: { onNavigate: (view: View) => void }) {
  const { progress, resetAll } = useProgress()
  const csp = courses[0]
  const next = firstOpenItem(csp, progress.completed)
  const seq = getSequence(csp)
  const lessonsDone = seq.filter((s) => s.kind === 'lesson' && progress.completed[s.id]).length
  const lessonsTotal = seq.filter((s) => s.kind === 'lesson').length
  const questionsMastered = Object.values(progress.questions).filter((s) => s === 'mastered').length

  const stats = [
    { label: 'Total XP', value: progress.xp.toLocaleString(), icon: Zap, color: 'text-zone-yellow' },
    { label: 'Lessons mastered', value: `${lessonsDone}/${lessonsTotal}`, icon: CircleCheck, color: 'text-mastered' },
    { label: 'Questions mastered', value: questionsMastered, icon: Brain, color: 'text-blue-400' },
  ]

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header>
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-400">Gwinnett Online Campus · Finals Week</p>
        <h1 className="mt-1 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Your Finals Command Center</h1>
        <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
          Learn it visually, flip the cards, then lock it in with the Mastery Loop. Every lesson needs 100% to unlock the next one.
        </p>
      </header>

      {next && (
        <button
          type="button"
          onClick={() => onNavigate({ type: 'item', courseId: csp.id, itemId: next.id })}
          className="group flex flex-col items-start gap-3 rounded-2xl border border-cobalt/50 bg-gradient-to-r from-cobalt/20 to-card p-6 text-left transition-colors hover:border-cobalt sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
              {progress.completed[next.id] ? 'Course complete — review' : 'Continue where you left off'}
            </p>
            <p className="mt-1 text-xl font-semibold text-foreground">{itemLabel(next)}</p>
            <p className="text-sm text-muted-foreground">{csp.title}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-lg bg-cobalt px-4 py-2 text-sm font-semibold text-white">
            Start <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </button>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4">
              <Icon className={`size-5 ${s.color}`} aria-hidden="true" />
              <p className="mt-2 font-mono text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          )
        })}
      </div>

      <section aria-labelledby="courses-title">
        <h2 id="courses-title" className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">All 6 Courses</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const readiness = courseReadiness(course, progress.completed)
            const ready = course.units.length > 0
            return (
              <button
                key={course.id}
                type="button"
                onClick={() =>
                  ready
                    ? onNavigate({ type: 'item', courseId: course.id, itemId: firstOpenItem(course, progress.completed).id })
                    : onNavigate({ type: 'course', courseId: course.id })
                }
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-cobalt/60"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs text-muted-foreground">Course {course.number}</span>
                  <ZoneBadge zone={course.zone} mastered={ready && readiness === 100} />
                </div>
                <p className="font-semibold leading-snug text-foreground">{course.title}</p>
                <div className="mt-auto flex flex-col gap-1.5">
                  <ProgressBar value={readiness} tone={readiness === 100 ? 'green' : 'cobalt'} label={`${course.title} readiness`} />
                  <p className="text-xs text-muted-foreground">{ready ? `${readiness}% ready · ${course.units.length} units` : 'Content coming soon'}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Trophy className="size-5 text-zone-yellow" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            XP: <span className="text-foreground">+10</span> per first-try correct · <span className="text-foreground">+5</span> after a fix ·{' '}
            <span className="text-foreground">+50</span> lesson · <span className="text-foreground">+100</span> unit exam · <span className="text-foreground">+250</span> final
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset ALL progress, XP, and mastery? This cannot be undone.')) resetAll()
          }}
          className="shrink-0 rounded-lg border border-zone-red/40 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-zone-red/10"
        >
          Reset progress
        </button>
      </section>
    </div>
  )
}
