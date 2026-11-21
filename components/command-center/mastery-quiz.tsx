'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, CircleCheck, CircleX, Lightbulb, Repeat, Trophy, Zap } from 'lucide-react'
import type { Question } from '@/lib/types'
import { shuffle } from '@/lib/course-utils'
import { useProgress, type QStatus } from '@/lib/progress-store'
import { cn } from '@/lib/utils'
import { CodeBlock, ProgressBar } from './shared'

interface MasteryQuizProps {
  quizId: string
  questions: Question[]
  completionXp: number
  onComplete: () => void
  onNext?: () => void
  nextLabel?: string
}

const STATUS_STYLE: Record<QStatus, string> = {
  unseen: 'border-border bg-obsidian text-muted-foreground',
  practice: 'border-zone-yellow/60 bg-zone-yellow/15 text-zone-yellow',
  mastered: 'border-mastered/60 bg-mastered/15 text-mastered',
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function MasteryQuiz({ quizId, questions, completionXp, onComplete, onNext, nextLabel }: MasteryQuizProps) {
  const { getStatus, setQuestionStatus, addXp, resetQuiz } = useProgress()
  const [queue, setQueue] = useState<string[]>(() =>
    shuffle(questions.filter((q) => getStatus(quizId, q.id) !== 'mastered').map((q) => q.id)),
  )
  const [selected, setSelected] = useState<number | null>(null)
  const [missed, setMissed] = useState<Set<string>>(() => new Set())
  const [sessionXp, setSessionXp] = useState(0)

  const current = questions.find((q) => q.id === queue[0])
  const masteredCount = questions.filter((q) => getStatus(quizId, q.id) === 'mastered').length
  const percent = Math.round((masteredCount / questions.length) * 100)
  const answered = selected !== null
  const isCorrect = answered && current ? selected === current.answer : false

  function choose(i: number) {
    if (answered || !current || i >= current.choices.length) return
    setSelected(i)
    if (i === current.answer) {
      const xp = missed.has(current.id) ? 5 : 10
      setQuestionStatus(quizId, current.id, 'mastered')
      addXp(xp)
      setSessionXp((s) => s + xp)
    } else {
      setQuestionStatus(quizId, current.id, 'practice')
      setMissed((prev) => new Set(prev).add(current.id))
    }
  }

  function advance() {
    if (!current || selected === null) return
    const rest = queue.slice(1)
    const nextQueue = selected === current.answer ? rest : [...rest, current.id]
    setQueue(nextQueue)
    setSelected(null)
    if (nextQueue.length === 0) {
      onComplete()
      setSessionXp((s) => s + completionXp)
    }
  }

  function retake() {
    resetQuiz(quizId, questions.map((q) => q.id))
    setQueue(shuffle(questions.map((q) => q.id)))
    setMissed(new Set())
    setSelected(null)
    setSessionXp(0)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName)) return
      const n = Number(e.key)
      if (n >= 1 && n <= 6) choose(n - 1)
      else if (e.key === 'Enter') advance()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-foreground">
            Mastery <span className="font-mono text-mastered">{percent}%</span>
            <span className="text-muted-foreground"> · {masteredCount}/{questions.length} mastered · {queue.length} left in queue</span>
          </p>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-border" />Unseen</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-zone-yellow" />Needs Practice</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-mastered" />Mastered</span>
          </div>
        </div>
        <ProgressBar value={percent} tone="green" label="Mastery progress" />
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Question status">
          {questions.map((q, i) => {
            const status = getStatus(quizId, q.id)
            return (
              <li
                key={q.id}
                className={cn(
                  'flex size-7 items-center justify-center rounded-md border font-mono text-[11px] font-semibold',
                  STATUS_STYLE[status],
                  current?.id === q.id && 'ring-2 ring-cobalt ring-offset-2 ring-offset-card',
                )}
                title={`Question ${i + 1}: ${status === 'practice' ? 'Needs Practice' : status}`}
              >
                {i + 1}
              </li>
            )
          })}
        </ul>
      </div>

      {!current ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-mastered/50 bg-mastered/10 p-8 text-center">
          <Trophy className="size-12 text-mastered" aria-hidden="true" />
          <div>
            <h3 className="text-2xl font-bold text-foreground">100% Mastered</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Every question answered correctly.
              {sessionXp > 0 && <span className="font-semibold text-zone-yellow"> +{sessionXp} XP this session.</span>}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="inline-flex items-center gap-2 rounded-lg bg-cobalt px-4 py-2 text-sm font-semibold text-white hover:bg-cobalt/85"
              >
                {nextLabel ?? 'Continue'} <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={retake}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-cobalt/60"
            >
              <Repeat className="size-4" aria-hidden="true" /> Retake for practice
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide', STATUS_STYLE[getStatus(quizId, current.id)])}>
                {getStatus(quizId, current.id) === 'practice' ? 'Needs Practice' : getStatus(quizId, current.id)}
              </span>
              <span className="text-xs text-muted-foreground">Question {questions.findIndex((q) => q.id === current.id) + 1}</span>
            </div>
            <h3 className="text-pretty text-lg font-semibold leading-snug text-foreground sm:text-xl">{current.prompt}</h3>
            {current.code && <CodeBlock code={current.code} className="mt-4" />}
            <div className="mt-5 grid gap-2.5" role="group" aria-label="Answer choices">
              {current.choices.map((choice, i) => {
                const isAnswer = i === current.answer
                const isPicked = i === selected
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => choose(i)}
                    disabled={answered}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors sm:text-base',
                      !answered && 'border-border bg-obsidian hover:border-cobalt hover:bg-cobalt/10',
                      answered && isAnswer && 'border-mastered bg-mastered/15 text-foreground',
                      answered && isPicked && !isAnswer && 'border-zone-red bg-zone-red/15 text-foreground',
                      answered && !isAnswer && !isPicked && 'border-border bg-obsidian opacity-50',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold',
                        answered && isAnswer ? 'border-mastered bg-mastered text-obsidian' : answered && isPicked ? 'border-zone-red bg-zone-red text-white' : 'border-border text-muted-foreground',
                      )}
                    >
                      {LETTERS[i]}
                    </span>
                    <span className="font-mono">{choice}</span>
                  </button>
                )
              })}
            </div>
            {!answered && <p className="mt-3 hidden text-xs text-muted-foreground sm:block">Tip: press 1–{current.choices.length} to answer, Enter to continue.</p>}
          </div>

          {answered && isCorrect && (
            <div className="flex flex-col gap-3 rounded-2xl border border-mastered/50 bg-mastered/10 p-5" role="status">
              <div className="flex items-center gap-2">
                <CircleCheck className="size-5 text-mastered" aria-hidden="true" />
                <p className="font-semibold text-mastered">Mastered!</p>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-zone-yellow/15 px-2 py-0.5 text-xs font-semibold text-zone-yellow">
                  <Zap className="size-3" aria-hidden="true" /> +{missed.has(current.id) ? 5 : 10} XP
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{current.explanation}</p>
              <button
                type="button"
                onClick={advance}
                autoFocus
                className="inline-flex items-center gap-2 self-start rounded-lg bg-mastered px-4 py-2 text-sm font-semibold text-obsidian hover:bg-mastered/85"
              >
                {queue.length === 1 ? 'Finish' : 'Next question'} <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {answered && !isCorrect && (
            <FixCard question={current} picked={selected} onContinue={advance} />
          )}
        </div>
      )}
    </div>
  )
}

function FixCard({ question, picked, onContinue }: { question: Question; picked: number; onContinue: () => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zone-yellow/60 bg-card" role="alert">
      <div className="flex items-center gap-2 border-b border-zone-yellow/30 bg-zone-yellow/10 px-5 py-3">
        <Lightbulb className="size-5 text-zone-yellow" aria-hidden="true" />
        <p className="font-semibold text-zone-yellow">{"Let's Fix This"}</p>
        <span className="ml-auto text-xs text-muted-foreground">Moved to the end of your queue</span>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
          <div className="rounded-xl border border-zone-red/50 bg-zone-red/10 p-4">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zone-red">
              <CircleX className="size-3.5" aria-hidden="true" /> You picked
            </p>
            <p className="font-mono text-base text-foreground line-through decoration-zone-red/70">{question.choices[picked]}</p>
          </div>
          <div className="hidden items-center justify-center text-muted-foreground sm:flex" aria-hidden="true">
            <ArrowRight className="size-5" />
          </div>
          <div className="rounded-xl border border-mastered/50 bg-mastered/10 p-4">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mastered">
              <CircleCheck className="size-3.5" aria-hidden="true" /> Correct answer
            </p>
            <p className="font-mono text-base font-semibold text-foreground">{question.choices[question.answer]}</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-400">Why</p>
          <p className="text-sm leading-relaxed text-foreground">{question.explanation}</p>
        </div>
        <div className="rounded-lg border-l-4 border-cobalt bg-cobalt/10 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Memory hook</p>
          <p className="mt-0.5 text-sm font-medium text-foreground">{question.fix}</p>
        </div>
        <button
          type="button"
          onClick={onContinue}
          autoFocus
          className="inline-flex items-center gap-2 self-start rounded-lg bg-zone-yellow px-4 py-2 text-sm font-semibold text-obsidian hover:bg-zone-yellow/85"
        >
          Got it — keep going <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
