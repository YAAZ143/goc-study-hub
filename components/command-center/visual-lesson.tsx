'use client'

import { useState } from 'react'
import { ArrowRight, Brain, Sparkles, Target, Timer, TriangleAlert } from 'lucide-react'
import type { ConceptColor, Lesson } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Diagram } from './diagrams'
import { CodeBlock } from './shared'

const CONCEPT_STYLE: Record<ConceptColor, { border: string; text: string; chip: string }> = {
  cobalt: { border: 'border-l-cobalt', text: 'text-blue-400', chip: 'bg-cobalt/15 text-blue-300' },
  green: { border: 'border-l-mastered', text: 'text-mastered', chip: 'bg-mastered/15 text-emerald-300' },
  yellow: { border: 'border-l-zone-yellow', text: 'text-zone-yellow', chip: 'bg-zone-yellow/15 text-amber-300' },
  red: { border: 'border-l-zone-red', text: 'text-red-400', chip: 'bg-zone-red/15 text-red-300' },
}

export function VisualLesson({ lesson, onContinue }: { lesson: Lesson; onContinue: () => void }) {
  const [eli12, setEli12] = useState(false)

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-cobalt/40 bg-gradient-to-br from-cobalt/15 to-card p-5 sm:p-6" aria-labelledby="hook-title">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 id="hook-title" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
            <Sparkles className="size-4" aria-hidden="true" /> The Hook
          </h2>
          <button
            type="button"
            role="switch"
            aria-checked={eli12}
            onClick={() => setEli12((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-border bg-obsidian px-3 py-1 text-xs font-medium"
          >
            <span className={cn('relative h-4 w-7 rounded-full transition-colors', eli12 ? 'bg-mastered' : 'bg-border')}>
              <span className={cn('absolute top-0.5 size-3 rounded-full bg-white transition-all', eli12 ? 'left-3.5' : 'left-0.5')} />
            </span>
            {"Explain Like I'm 12"}
          </button>
        </div>
        <p className="text-pretty text-lg leading-relaxed text-foreground sm:text-xl">{eli12 ? lesson.eli12 : lesson.hook}</p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6" aria-labelledby="diagram-title">
        <h2 id="diagram-title" className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Visual Diagram</h2>
        <div className="rounded-xl border border-border bg-obsidian p-3 sm:p-5">
          <Diagram name={lesson.diagram} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{lesson.diagramCaption}</p>
      </section>

      <section aria-labelledby="concepts-title">
        <h2 id="concepts-title" className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Brain className="size-4" aria-hidden="true" /> Concept Breakdown
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {lesson.concepts.map((c) => {
            const s = CONCEPT_STYLE[c.color]
            return (
              <div key={c.term} className={cn('rounded-xl border border-border border-l-4 bg-card p-4', s.border)}>
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <h3 className={cn('font-semibold', s.text)}>{c.term}</h3>
                  {c.symbol && <code className={cn('rounded px-1.5 py-0.5 font-mono text-xs', s.chip)}>{c.symbol}</code>}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{c.detail}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-zone-red/60 bg-zone-red/10 p-5" aria-labelledby="trap-title">
        <h2 id="trap-title" className="mb-2 flex items-center gap-2 font-semibold text-red-400">
          <TriangleAlert className="size-5" aria-hidden="true" /> Exam Trap: {lesson.trap.title}
        </h2>
        <p className="text-sm leading-relaxed text-foreground">{lesson.trap.detail}</p>
        {lesson.trap.code && <CodeBlock code={lesson.trap.code} className="mt-3" />}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5" aria-labelledby="example-title">
        <h2 id="example-title" className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Target className="size-4" aria-hidden="true" /> Worked Example
        </h2>
        <p className="font-medium text-foreground">{lesson.example.problem}</p>
        {lesson.example.code && <CodeBlock code={lesson.example.code} className="mt-3" />}
        <ol className="mt-4 flex flex-col gap-2">
          {lesson.example.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-cobalt/20 font-mono text-xs font-bold text-blue-300">{i + 1}</span>
              <span className="pt-0.5 text-foreground/90">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-lg bg-mastered/10 px-4 py-2.5 font-mono text-sm font-semibold text-mastered">{'→ '}{lesson.example.answer}</p>
      </section>

      <section className="rounded-2xl border border-mastered/50 bg-mastered/10 p-5" aria-labelledby="cheat-title">
        <h2 id="cheat-title" className="mb-3 flex items-center gap-2 font-semibold text-mastered">
          <Timer className="size-5" aria-hidden="true" /> 60-Second Cheat Sheet
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {lesson.cheatSheet.map((line) => (
            <li key={line} className="flex gap-2 text-sm text-foreground">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mastered" aria-hidden="true" />
              <span className="font-mono">{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        onClick={onContinue}
        className="inline-flex items-center gap-2 self-end rounded-lg bg-cobalt px-5 py-2.5 text-sm font-semibold text-white hover:bg-cobalt/85"
      >
        Next: Flip Flashcards <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
