'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

function format(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function CountdownTimer({ label, seconds }: { label: string; seconds: number }) {
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(false)
  const endAt = useRef(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      const left = Math.max(0, Math.round((endAt.current - Date.now()) / 1000))
      setRemaining(left)
      if (left === 0) setRunning(false)
    }, 250)
    return () => clearInterval(id)
  }, [running])

  function toggle() {
    if (running) {
      setRunning(false)
      return
    }
    const base = remaining === 0 ? seconds : remaining
    setRemaining(base)
    endAt.current = Date.now() + base * 1000
    setRunning(true)
  }

  function reset() {
    setRunning(false)
    setRemaining(seconds)
  }

  const done = remaining === 0
  const lowTime = !done && remaining <= 60

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border bg-card px-2.5 py-1.5',
        done ? 'border-zone-red animate-pulse' : running ? 'border-cobalt/60' : 'border-border',
      )}
    >
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <span
          className={cn(
            'font-mono text-lg font-semibold tabular-nums',
            done ? 'text-zone-red' : lowTime ? 'text-zone-yellow' : 'text-foreground',
          )}
          aria-live={done ? 'assertive' : 'off'}
        >
          {done ? "Time's up" : format(remaining)}
        </span>
      </div>
      <button
        type="button"
        onClick={toggle}
        className="flex size-8 items-center justify-center rounded-md bg-cobalt text-white transition-colors hover:bg-cobalt/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
        aria-label={running ? `Pause ${label}` : `Start ${label}`}
      >
        {running ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
      </button>
      <button
        type="button"
        onClick={reset}
        className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
        aria-label={`Reset ${label}`}
      >
        <RotateCcw className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
