import { CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Zone } from '@/lib/types'

export function ZoneBadge({ zone, mastered, className }: { zone: Zone; mastered?: boolean; className?: string }) {
  if (mastered) {
    return (
      <span className={cn('inline-flex items-center gap-1 rounded-full bg-mastered/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mastered', className)}>
        <CircleCheck className="size-3" aria-hidden="true" />
        Mastered
      </span>
    )
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
        zone === 'red' ? 'bg-zone-red/15 text-zone-red' : 'bg-zone-yellow/15 text-zone-yellow',
        className,
      )}
    >
      {zone === 'red' ? 'Red Zone' : 'Yellow Zone'}
    </span>
  )
}

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <pre className={cn('overflow-x-auto rounded-lg border border-border bg-obsidian p-3 font-mono text-[13px] leading-relaxed text-slate-200', className)}>
      <code>{code}</code>
    </pre>
  )
}

export function ProgressBar({ value, tone = 'cobalt', label }: { value: number; tone?: 'cobalt' | 'green'; label: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2 w-full overflow-hidden rounded-full bg-border"
    >
      <div
        className={cn('h-full rounded-full transition-all duration-500', tone === 'green' ? 'bg-mastered' : 'bg-cobalt')}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
