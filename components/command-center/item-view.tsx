'use client'

import { useState } from 'react'
import { BookOpen, Brain, Layers, Lock, Trophy } from 'lucide-react'
import type { Course, Lesson, Unit, View } from '@/lib/types'
import { findItem, getFinalExamQuestions, getUnitExamQuestions, isUnlocked, itemLabel } from '@/lib/course-utils'
import { useProgress } from '@/lib/progress-store'
import { cn } from '@/lib/utils'
import { Flashcards } from './flashcards'
import { MasteryQuiz } from './mastery-quiz'
import { VisualLesson } from './visual-lesson'
import { ZoneBadge } from './shared'

interface ItemViewProps {
  course: Course
  itemId: string
  onNavigate: (view: View) => void
}

export function ItemView({ course, itemId, onNavigate }: ItemViewProps) {
  const { progress } = useProgress()
  const { item, prev, next } = findItem(course, itemId)
  if (!item) return null

  const goNext = next ? () => onNavigate({ type: 'item', courseId: course.id, itemId: next.id }) : undefined
  const nextLabel = next ? `Unlock ${itemLabel(next)}` : undefined

  if (!isUnlocked(course, itemId, progress.completed) && prev) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center">
        <Lock className="size-10 text-muted-foreground" aria-hidden="true" />
        <h1 className="text-xl font-bold text-foreground">{itemLabel(item)} is locked</h1>
        <p className="text-sm text-muted-foreground">
          Hit 100% on the Mastery Loop for <span className="font-semibold text-foreground">{itemLabel(prev)}</span> to unlock it.
        </p>
        <button
          type="button"
          onClick={() => onNavigate({ type: 'item', courseId: course.id, itemId: prev.id })}
          className="rounded-lg bg-cobalt px-4 py-2 text-sm font-semibold text-white hover:bg-cobalt/85"
        >
          Go to {itemLabel(prev)}
        </button>
      </div>
    )
  }

  if (item.kind === 'lesson') {
    return <LessonView course={course} unit={item.unit} lesson={item.lesson} onNext={goNext} nextLabel={nextLabel} />
  }

  const isFinal = item.kind === 'final'
  const questions = isFinal ? getFinalExamQuestions(course) : getUnitExamQuestions(item.unit)
  return (
    <ExamView
      key={item.id}
      quizId={item.id}
      title={isFinal ? `${course.short} Course Final Exam` : `Unit ${item.unit.number} Exam: ${item.unit.title}`}
      subtitle={
        isFinal
          ? `${questions.length} questions across all ${course.units.length} units. Start the 60:00 Unit Timer and simulate test day.`
          : `${questions.length} questions covering all 3 lessons. Start the 60:00 Unit Timer for real exam pressure.`
      }
      questions={questions}
      xp={isFinal ? 250 : 100}
      zoneMastered={!!progress.completed[item.id]}
      zone={course.zone}
      onNext={goNext}
      nextLabel={nextLabel}
    />
  )
}

type LessonTab = 'visual' | 'cards' | 'quiz'

const TABS: { id: LessonTab; label: string; icon: typeof BookOpen }[] = [
  { id: 'visual', label: 'Visual Lesson', icon: BookOpen },
  { id: 'cards', label: 'Flashcards', icon: Layers },
  { id: 'quiz', label: 'Mastery Loop', icon: Brain },
]

function LessonView({ course, unit, lesson, onNext, nextLabel }: { course: Course; unit: Unit; lesson: Lesson; onNext?: () => void; nextLabel?: string }) {
  const [tab, setTab] = useState<LessonTab>('visual')
  const { progress, completeItem } = useProgress()
  const done = !!progress.completed[lesson.id]

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-semibold text-blue-400">
            UNIT {unit.number} · LESSON {lesson.number}
          </span>
          <ZoneBadge zone={course.zone} mastered={done} />
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{lesson.title}</h1>
      </header>

      <div role="tablist" aria-label="Lesson sections" className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-card p-1">
        {TABS.map((t, i) => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm',
                active ? 'bg-cobalt text-white' : 'text-muted-foreground hover:bg-obsidian hover:text-foreground',
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{i + 1} ·</span> {t.label}
              {t.id === 'quiz' && done && <Trophy className="size-3.5 text-mastered" aria-label="mastered" />}
            </button>
          )
        })}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === 'visual' && <VisualLesson lesson={lesson} onContinue={() => setTab('cards')} />}
        {tab === 'cards' && <Flashcards cards={lesson.flashcards} onFinish={() => setTab('quiz')} />}
        {tab === 'quiz' && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Answer every question correctly to hit <span className="font-semibold text-mastered">100%</span> and unlock the next step. Misses come back at the end of the queue.
            </p>
            <MasteryQuiz
              quizId={lesson.id}
              questions={lesson.quiz}
              completionXp={done ? 0 : 50}
              onComplete={() => completeItem(lesson.id, 50)}
              onNext={onNext}
              nextLabel={nextLabel}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function ExamView({
  quizId, title, subtitle, questions, xp, zone, zoneMastered, onNext, nextLabel,
}: {
  quizId: string
  title: string
  subtitle: string
  questions: ReturnType<typeof getUnitExamQuestions>
  xp: number
  zone: Course['zone']
  zoneMastered: boolean
  onNext?: () => void
  nextLabel?: string
}) {
  const { completeItem } = useProgress()
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5">
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-semibold text-zone-yellow">EXAM · +{xp} XP ON 100%</span>
          <ZoneBadge zone={zone} mastered={zoneMastered} />
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </header>
      <MasteryQuiz
        quizId={quizId}
        questions={questions}
        completionXp={zoneMastered ? 0 : xp}
        onComplete={() => completeItem(quizId, xp)}
        onNext={onNext}
        nextLabel={nextLabel}
      />
    </div>
  )
}
