'use client'

import { ChevronRight, Menu } from 'lucide-react'
import { CountdownTimer } from './countdown-timer'

export function TopBar({ crumbs, onMenu }: { crumbs: string[]; onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-obsidian/90 backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onMenu}
            className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Open course menu"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 items-center gap-1 text-sm">
              {crumbs.map((c, i) => (
                <li key={`${c}-${i}`} className="flex min-w-0 items-center gap-1">
                  {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />}
                  <span
                    className={i === crumbs.length - 1 ? 'truncate font-semibold text-foreground' : 'hidden truncate text-muted-foreground md:inline'}
                    aria-current={i === crumbs.length - 1 ? 'page' : undefined}
                  >
                    {c}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CountdownTimer label="Lesson" seconds={600} />
          <CountdownTimer label="Unit" seconds={3600} />
        </div>
      </div>
    </header>
  )
}
