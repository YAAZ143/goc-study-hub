'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Repeat } from 'lucide-react'
import type { Flashcard } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CodeBlock } from './shared'

export function Flashcards({ cards, onFinish }: { cards: Flashcard[]; onFinish: () => void }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]))

  const go = useCallback(
    (delta: number) => {
      setFlipped(false)
      setIndex((i) => {
        const next = (i + delta + cards.length) % cards.length
        setSeen((prev) => new Set(prev).add(next))
        return next
      })
    },
    [cards.length],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName)) return
      if (e.code === 'Space') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const card = cards[index]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Card <span className="font-semibold text-foreground">{index + 1}</span> of {cards.length}
        </p>
        <p className="hidden text-xs text-muted-foreground sm:block">
          <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">Space</kbd> flip ·{' '}
          <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">←</kbd>{' '}
          <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono">→</kbd> navigate
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label={flipped ? `Answer: ${card.back}. Press space to flip back.` : `Term: ${card.front}. Press space to flip.`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setFlipped((f) => !f)
        }}
        className="relative h-72 w-full cursor-pointer select-none rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt sm:h-80"
        style={{ perspective: '1400px' }}
      >
        <div
          className="relative size-full transition-transform duration-500"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl border border-cobalt/40 bg-gradient-to-br from-card to-obsidian p-8 text-center shadow-[0_0_40px_-12px] shadow-cobalt/40"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">Term</span>
            <p className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">{card.front}</p>
            <span className="text-xs text-muted-foreground">Click or press Space to flip</span>
          </div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-y-auto rounded-2xl border border-mastered/50 bg-gradient-to-br from-card to-obsidian p-8 text-center shadow-[0_0_40px_-12px] shadow-mastered/40"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-mastered">Definition</span>
            <p className="text-pretty text-lg leading-relaxed text-foreground sm:text-xl">{card.back}</p>
            {card.code && <CodeBlock code={card.code} className="w-full max-w-md text-left" />}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-cobalt/60"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Prev
        </button>
        <div className="flex gap-1.5" aria-hidden="true">
          {cards.map((_, i) => (
            <span
              key={i}
              className={cn('size-2 rounded-full transition-colors', i === index ? 'bg-cobalt' : seen.has(i) ? 'bg-mastered/70' : 'bg-border')}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:border-cobalt/60"
        >
          Next <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      {seen.size === cards.length && (
        <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-mastered/40 bg-mastered/10 p-4 sm:flex-row sm:items-center">
          <p className="text-sm text-foreground">
            <span className="font-semibold text-mastered">All {cards.length} cards reviewed.</span> Ready to lock it in?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIndex(0)
                setFlipped(false)
                setSeen(new Set([0]))
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm hover:border-cobalt/60"
            >
              <Repeat className="size-4" aria-hidden="true" /> Again
            </button>
            <button type="button" onClick={onFinish} className="rounded-lg bg-mastered px-3 py-1.5 text-sm font-semibold text-obsidian hover:bg-mastered/85">
              Start Mastery Loop
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
