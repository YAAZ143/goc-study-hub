import type { ReactNode } from 'react'


export const C = {
  cobalt: '#3B82F6',
  green: '#10B981',
  yellow: '#F59E0B',
  red: '#EF4444',
  text: '#E5E7EB',
  muted: '#9CA3AF',
  edge: '#1F2937',
}

export function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 520 240" role="img" aria-label={label} className="h-auto w-full">
      {children}
    </svg>
  )
}

export function Box({
  x, y, w, h, color, dashed, opacity = 1, strong,
}: { x: number; y: number; w: number; h: number; color: string; dashed?: boolean; opacity?: number; strong?: boolean }) {
  return (
    <rect
      x={x} y={y} width={w} height={h} rx={8}
      fill={color} fillOpacity={strong ? 0.35 : 0.12}
      stroke={color} strokeWidth={strong ? 2.5 : 1.5}
      strokeDasharray={dashed ? '6 4' : undefined}
      opacity={opacity}
    />
  )
}

export function T({
  x, y, children, size = 14, color = C.text, anchor = 'middle', weight = 500, mono, opacity = 1,
}: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number; mono?: boolean; opacity?: number }) {
  return (
    <text
      x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontWeight={weight} opacity={opacity}
      dominantBaseline="middle"
      fontFamily={mono ? 'var(--font-geist-mono), ui-monospace, monospace' : 'var(--font-geist-sans), system-ui, sans-serif'}
    >
      {children}
    </text>
  )
}

export function Arrow({ x1, y1, x2, y2, color = C.muted }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const s = 8
  const p1 = `${x2 - s * Math.cos(a - 0.45)},${y2 - s * Math.sin(a - 0.45)}`
  const p2 = `${x2 - s * Math.cos(a + 0.45)},${y2 - s * Math.sin(a + 0.45)}`
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </g>
  )
}
