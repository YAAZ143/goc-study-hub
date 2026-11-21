'use client'

import { ArrowRight, CircleCheck, RotateCcw } from 'lucide-react'
import type { View } from '@/lib/types'
import { getCountdown } from '@/lib/course-utils'
import { useProgress } from '@/lib/progress-store'
import { cn } from '@/lib/utils'

type Phase = 'red' | 'yellow' | 'exam' | 'final'

const PHASE_STYLE: Record<Phase, { label: string; badge: string; border: string }> = {
  red: { label: 'Red Zone', badge: 'bg-zone-red/15 text-zone-red', border: 'border-zone-red/40' },
  yellow: { label: 'Yellow Zone', badge: 'bg-zone-yellow/15 text-zone-yellow', border: 'border-zone-yellow/40' },
  exam: { label: 'Unit Exams', badge: 'bg-cobalt/15 text-blue-300', border: 'border-cobalt/40' },
  final: { label: 'Course Finals', badge: 'bg-mastered/15 text-mastered', border: 'border-mastered/40' },
}

const SCHEDULE: { day: number; phase: Phase; title: string; tasks: string[]; target?: string }[] = [
  {
    day: 1, phase: 'red', title: 'AP CSP · Units 1–3', target: 'csp-u1-l1',
    tasks: ['9 lessons × 10:00 Lesson Timer', 'Flip every flashcard deck twice', '100% on every Mastery Loop'],
  },
  {
    day: 2, phase: 'red', title: 'AP CSP · Units 4–5 + review', target: 'csp-u4-l1',
    tasks: ['6 lessons × 10:00 Lesson Timer', 'Re-run any "Needs Practice" questions', 'Print the CSP cheat sheet'],
  },
  { day: 3, phase: 'red', title: 'Biology', tasks: ['Red Zone lessons with the Lesson Timer', 'Flashcards on every vocab-heavy unit', 'Mastery Loops to 100%'] },
  { day: 4, phase: 'red', title: 'Algebra I', tasks: ['Worked examples first, then practice', 'Flashcards for formulas', 'Mastery Loops to 100%'] },
  { day: 5, phase: 'yellow', title: '9th Lit · AP HuG · Health', tasks: ['Lighter review of Yellow Zone courses', 'Cheat sheets for each course', 'Flashcards on weak spots'] },
  { day: 6, phase: 'exam', title: 'Unit Exam Day', target: 'csp-u1-exam', tasks: ['Every 10-Q Unit Exam under the 60:00 Unit Timer', 'Re-read the "Exam Trap" box for any miss', 'Sleep 8+ hours'] },
  { day: 7, phase: 'final', title: 'Course Finals', target: 'csp-final', tasks: ['20-Q Course Final for each course', 'Simulate test day with the 60:00 Unit Timer', 'Last skim of printed cheat sheets'] },
]

export function ScheduleView({ onNavigate }: { onNavigate: (view: View) => void }) {
  const { progress, toggleComplete, restartCountdown } = useProgress()
  const { day: today } = getCountdown(progress.startDate)

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-blue-400">The Plan</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">7-Day Cram Schedule</h1>
          <p className="mt-2 text-muted-foreground">Red Zone first, Yellow Zone next, then exams. You are on Day {today}.</p>
        </div>
        <button
          type="button"
          onClick={restartCountdown}
          className="inline-flex items-center gap-2 self-start rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="size-4" aria-hidden="true" /> Start countdown today
        </button>
      </header>

      <ol className="grid gap-3 md:grid-cols-2">
        {SCHEDULE.map((d) => {
          const style = PHASE_STYLE[d.phase]
          const done = !!progress.completed[`day-${d.day}`]
          const isToday = d.day === today
          return (
            <li
              key={d.day}
              className={cn(
                'flex flex-col gap-3 rounded-2xl border bg-card p-5',
                isToday ? 'border-cobalt ring-1 ring-cobalt' : style.border,
                done && 'opacity-70',
                d.day === 7 && 'md:col-span-2',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-bold text-foreground">Day {d.day}</span>
                  {isToday && <span className="rounded-full bg-cobalt px-2 py-0.5 text-[10px] font-bold uppercase text-white">Today</span>}
                </div>
                <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', style.badge)}>{style.label}</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{d.title}</p>
              <ul className="flex flex-col gap-1.5">
                {d.tasks.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-foreground/90">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => toggleComplete(`day-${d.day}`)}
                  aria-pressed={done}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold',
                    done ? 'border-mastered/50 bg-mastered/15 text-mastered' : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                >
                  <CircleCheck className="size-3.5" aria-hidden="true" /> {done ? 'Day complete' : 'Mark day complete'}
                </button>
                {d.target && (
                  <button
                    type="button"
                    onClick={() => onNavigate({ type: 'item', courseId: 'csp', itemId: d.target! })}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-cobalt px-3 py-1.5 text-xs font-semibold text-white hover:bg-cobalt/85"
                  >
                    Open AP CSP <ArrowRight className="size-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
