'use client'

import { useState } from 'react'
import { CalendarDays, ChevronDown, CircleCheck, Flame, LayoutDashboard, Lock, Printer, Trophy, X, Zap } from 'lucide-react'
import { courses } from '@/lib/courses'
import type { Course, View } from '@/lib/types'
import { courseReadiness, finalExamId, getCountdown, isUnlocked, unitExamId } from '@/lib/course-utils'
import { useProgress } from '@/lib/progress-store'
import { cn } from '@/lib/utils'
import { ZoneBadge } from './shared'

interface SidebarProps {
  view: View
  onNavigate: (view: View) => void
  onClose?: () => void
}

function ReadinessRing({ value }: { value: number }) {
  const r = 30
  const c = 2 * Math.PI * r
  return (
    <div className="relative size-20 shrink-0">
      <svg viewBox="0 0 72 72" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1F2937" strokeWidth="7" />
        <circle
          cx="36" cy="36" r={r} fill="none" stroke={value >= 100 ? '#10B981' : '#3B82F6'} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * value) / 100} className="transition-all duration-700"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold text-foreground">{value}%</span>
    </div>
  )
}

export function Sidebar({ view, onNavigate, onClose }: SidebarProps) {
  const { progress } = useProgress()
  const { completed } = progress
  const activeCourseId = view.type === 'item' || view.type === 'course' ? view.courseId : 'csp'
  const activeItemId = view.type === 'item' ? view.itemId : null
  const [openCourse, setOpenCourse] = useState<string | null>(activeCourseId)
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({})

  const overall = Math.round(courses.reduce((sum, c) => sum + courseReadiness(c, completed), 0) / courses.length)
  const { day, daysLeft } = getCountdown(progress.startDate)
  const level = Math.floor(progress.xp / 500) + 1
  const levelPct = ((progress.xp % 500) / 500) * 100

  function navigate(v: View) {
    onNavigate(v)
    onClose?.()
  }

  return (
    <nav aria-label="Course navigation" className="flex h-full w-80 flex-col border-r border-border bg-obsidian">
      <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-cobalt">
            <Flame className="size-5 text-white" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-foreground">GOC Finals</p>
            <p className="text-xs text-muted-foreground">Command Center</p>
          </div>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="rounded-md p-1.5 text-muted-foreground hover:text-foreground" aria-label="Close menu">
            <X className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3 border-b border-border p-5">
          <div className="flex items-center gap-4">
            <ReadinessRing value={overall} />
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overall Readiness</p>
              <span
                className={cn(
                  'inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                  daysLeft <= 2 ? 'bg-zone-red/15 text-zone-red' : 'bg-zone-yellow/15 text-zone-yellow',
                )}
              >
                <CalendarDays className="size-3.5" aria-hidden="true" />
                {daysLeft > 0 ? `${daysLeft} day${daysLeft === 1 ? '' : 's'} left · Day ${day}/7` : 'Finals are here'}
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 font-semibold text-zone-yellow">
                <Zap className="size-3.5" aria-hidden="true" /> {progress.xp.toLocaleString()} XP
              </span>
              <span className="text-muted-foreground">Level {level}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-zone-yellow transition-all" style={{ width: `${levelPct}%` }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 p-3">
          <NavButton active={view.type === 'dashboard'} onClick={() => navigate({ type: 'dashboard' })} icon={<LayoutDashboard className="size-4" aria-hidden="true" />}>
            Dashboard
          </NavButton>
          <NavButton active={view.type === 'schedule'} onClick={() => navigate({ type: 'schedule' })} icon={<CalendarDays className="size-4" aria-hidden="true" />}>
            7-Day Cram Schedule
          </NavButton>
        </div>

        <div className="px-3 pb-4">
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Courses</p>
          <ul className="flex flex-col gap-1">
            {courses.map((course) => (
              <CourseItem
                key={course.id}
                course={course}
                open={openCourse === course.id}
                onToggle={() => {
                  setOpenCourse(openCourse === course.id ? null : course.id)
                  if (course.units.length === 0) navigate({ type: 'course', courseId: course.id })
                }}
                activeItemId={activeItemId}
                openUnits={openUnits}
                setOpenUnits={setOpenUnits}
                completed={completed}
                onNavigate={navigate}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-cobalt/50 bg-cobalt/10 px-3 py-2.5 text-sm font-semibold text-blue-300 transition-colors hover:bg-cobalt/20"
        >
          <Printer className="size-4" aria-hidden="true" /> Print 1-Page Course Cheat Sheet
        </button>
      </div>
    </nav>
  )
}

function NavButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        active ? 'bg-cobalt/15 text-blue-300' : 'text-muted-foreground hover:bg-card hover:text-foreground',
      )}
    >
      {icon}
      {children}
    </button>
  )
}

interface CourseItemProps {
  course: Course
  open: boolean
  onToggle: () => void
  activeItemId: string | null
  openUnits: Record<string, boolean>
  setOpenUnits: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  completed: Record<string, boolean>
  onNavigate: (view: View) => void
}

function CourseItem({ course, open, onToggle, activeItemId, openUnits, setOpenUnits, completed, onNavigate }: CourseItemProps) {
  const readiness = courseReadiness(course, completed)
  const mastered = course.units.length > 0 && readiness === 100
  const finalId = finalExamId(course)

  return (
    <li className="rounded-lg border border-transparent">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={course.units.length > 0 ? open : undefined}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-card"
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-card font-mono text-[11px] font-bold text-muted-foreground">
          {course.number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">{course.short}</span>
          <span className="block text-[11px] text-muted-foreground">{course.units.length > 0 ? `${readiness}% ready` : 'Content coming soon'}</span>
        </span>
        <ZoneBadge zone={course.zone} mastered={mastered} />
        {course.units.length > 0 && (
          <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden="true" />
        )}
      </button>

      {open && course.units.length > 0 && (
        <ul className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-border pl-2">
          {course.units.map((unit) => {
            const containsActive = activeItemId?.startsWith(unit.id) ?? false
            const unitOpen = openUnits[unit.id] ?? containsActive
            const examId = unitExamId(unit)
            const unitDone = !!completed[examId]
            return (
              <li key={unit.id}>
                <button
                  type="button"
                  onClick={() => setOpenUnits((u) => ({ ...u, [unit.id]: !unitOpen }))}
                  aria-expanded={unitOpen}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  {unitDone ? <CircleCheck className="size-3.5 shrink-0 text-mastered" aria-label="Unit mastered" /> : <span className="size-3.5 shrink-0 rounded-full border border-border" aria-hidden="true" />}
                  <span className="flex-1 truncate">Unit {unit.number}: {unit.title}</span>
                  <ChevronDown className={cn('size-3.5 shrink-0 transition-transform', unitOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {unitOpen && (
                  <ul className="mb-1 flex flex-col gap-0.5 pl-3">
                    {unit.lessons.map((lesson) => (
                      <SeqLink
                        key={lesson.id}
                        label={`${lesson.number} ${lesson.title}`}
                        active={activeItemId === lesson.id}
                        done={!!completed[lesson.id]}
                        locked={!isUnlocked(course, lesson.id, completed)}
                        onClick={() => onNavigate({ type: 'item', courseId: course.id, itemId: lesson.id })}
                      />
                    ))}
                    <SeqLink
                      label={`Unit ${unit.number} Exam (10 Q)`}
                      exam
                      active={activeItemId === examId}
                      done={unitDone}
                      locked={!isUnlocked(course, examId, completed)}
                      onClick={() => onNavigate({ type: 'item', courseId: course.id, itemId: examId })}
                    />
                  </ul>
                )}
              </li>
            )
          })}
          <SeqLink
            label="Course Final Exam (20 Q)"
            exam
            final
            active={activeItemId === finalId}
            done={!!completed[finalId]}
            locked={!isUnlocked(course, finalId, completed)}
            onClick={() => onNavigate({ type: 'item', courseId: course.id, itemId: finalId })}
          />
        </ul>
      )}
    </li>
  )
}

function SeqLink({ label, active, done, locked, exam, final, onClick }: { label: string; active: boolean; done: boolean; locked: boolean; exam?: boolean; final?: boolean; onClick: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors',
          active ? 'bg-cobalt/15 text-blue-300' : locked ? 'text-muted-foreground/60 hover:bg-card' : 'text-foreground/90 hover:bg-card',
          final && 'mt-1 font-semibold',
        )}
      >
        {done ? (
          <CircleCheck className="size-3.5 shrink-0 text-mastered" aria-label="Mastered" />
        ) : locked ? (
          <Lock className="size-3.5 shrink-0" aria-label="Locked" />
        ) : exam ? (
          <Trophy className="size-3.5 shrink-0 text-zone-yellow" aria-hidden="true" />
        ) : (
          <span className="ml-0.5 size-2.5 shrink-0 rounded-full border-2 border-cobalt" aria-hidden="true" />
        )}
        <span className="truncate">{label}</span>
      </button>
    </li>
  )
}
