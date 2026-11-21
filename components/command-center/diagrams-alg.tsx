import type { ReactNode } from 'react'
import type { AlgDiagramKey } from '@/lib/types'
import { Arrow, Box, C, Frame, T } from './diagram-primitives'

type Pt = [number, number]

function makeGrid(ox: number, oy: number, size: number, min: number, max: number) {
  const unit = size / (max - min)
  const px = (x: number) => ox + (x - min) * unit
  const py = (y: number) => oy + (max - y) * unit
  const path = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${px(x).toFixed(1)} ${py(y).toFixed(1)}`).join(' ')
  const fn = (f: (x: number) => number, a = min, b = max, steps = 60) => {
    const pts: Pt[] = []
    for (let i = 0; i <= steps; i++) {
      const x = a + ((b - a) * i) / steps
      const y = f(x)
      if (y >= min - 0.5 && y <= max + 0.5) pts.push([x, y])
    }
    return path(pts)
  }
  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i)
  const node = (
    <g>
      <rect x={ox} y={oy} width={size} height={size} fill="#0B1220" stroke={C.edge} />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={oy} x2={px(t)} y2={oy + size} stroke={C.edge} strokeWidth={1} />
          <line x1={ox} y1={py(t)} x2={ox + size} y2={py(t)} stroke={C.edge} strokeWidth={1} />
        </g>
      ))}
      <line x1={px(0)} y1={oy} x2={px(0)} y2={oy + size} stroke={C.muted} strokeWidth={1.5} />
      <line x1={ox} y1={py(0)} x2={ox + size} y2={py(0)} stroke={C.muted} strokeWidth={1.5} />
      <T x={ox + size - 6} y={py(0) - 8} size={10} color={C.muted}>x</T>
      <T x={px(0) + 8} y={oy + 8} size={10} color={C.muted}>y</T>
    </g>
  )
  return { px, py, path, fn, node }
}

function Dot({ x, y, color, open }: { x: number; y: number; color: string; open?: boolean }) {
  return <circle cx={x} cy={y} r={5} fill={open ? '#0B1220' : color} stroke={color} strokeWidth={2} />
}

function SlopeGrid() {
  const g = makeGrid(20, 20, 200, -1, 7)
  return (
    <Frame label="Slope triangle from (1, 1) to (5, 4): rise 3 over run 4">
      {g.node}
      <path d={g.fn((x) => 0.75 * x + 0.25, -1, 7)} stroke={C.cobalt} strokeWidth={2.5} fill="none" />
      <line x1={g.px(1)} y1={g.py(1)} x2={g.px(5)} y2={g.py(1)} stroke={C.yellow} strokeWidth={2.5} strokeDasharray="5 3" />
      <line x1={g.px(5)} y1={g.py(1)} x2={g.px(5)} y2={g.py(4)} stroke={C.green} strokeWidth={2.5} strokeDasharray="5 3" />
      <Dot x={g.px(1)} y={g.py(1)} color={C.cobalt} />
      <Dot x={g.px(5)} y={g.py(4)} color={C.cobalt} />
      <T x={g.px(3)} y={g.py(1) + 12} size={11} color={C.yellow} weight={700}>run 4</T>
      <T x={g.px(5) + 26} y={g.py(2.5)} size={11} color={C.green} weight={700}>rise 3</T>
      <T x={375} y={40} size={14} weight={700}>{'m = Δy / Δx'}</T>
      <T x={375} y={70} size={13} mono>{'= (4 − 1) / (5 − 1)'}</T>
      <T x={375} y={98} size={18} mono weight={700} color={C.cobalt}>{'m = 3/4'}</T>
      {[['+ slope ↗ rises', C.green], ['− slope ↘ falls', C.red], ['0 slope → horizontal', C.yellow], ['undefined → vertical', C.muted]].map(([l, c], i) => (
        <T key={l} x={375} y={136 + i * 22} size={12} color={c}>{l}</T>
      ))}
    </Frame>
  )
}

function LineForms() {
  const g = makeGrid(20, 20, 200, -5, 5)
  return (
    <Frame label="Graph of y = 2x − 3 showing y-intercept and x-intercept">
      {g.node}
      <path d={g.fn((x) => 2 * x - 3)} stroke={C.cobalt} strokeWidth={2.5} fill="none" />
      <Dot x={g.px(0)} y={g.py(-3)} color={C.green} />
      <Dot x={g.px(1.5)} y={g.py(0)} color={C.yellow} />
      <T x={g.px(0) + 34} y={g.py(-3)} size={10} color={C.green}>(0, −3)</T>
      <T x={g.px(1.5) + 36} y={g.py(0) + 12} size={10} color={C.yellow}>(1.5, 0)</T>
      <Box x={250} y={22} w={250} h={60} color={C.cobalt} />
      <T x={375} y={40} size={11} color={C.cobalt} weight={700}>SLOPE-INTERCEPT</T>
      <T x={375} y={64} size={17} mono weight={700}>{'y = mx + b'}</T>
      <Box x={250} y={92} w={250} h={60} color={C.yellow} />
      <T x={375} y={110} size={11} color={C.yellow} weight={700}>STANDARD FORM</T>
      <T x={375} y={134} size={17} mono weight={700}>{'Ax + By = C'}</T>
      <T x={375} y={174} size={12} mono>{'y = 2x − 3  ⇔  2x − y = 3'}</T>
      <T x={375} y={198} size={11} color={C.muted}>{'b = y-intercept (x = 0)'}</T>
      <T x={375} y={218} size={11} color={C.muted}>{'x-intercept: set y = 0'}</T>
    </Frame>
  )
}

function LineTransform() {
  const g = makeGrid(20, 20, 200, -5, 5)
  return (
    <Frame label="Transformations of the parent line y = x">
      {g.node}
      <path d={g.fn((x) => x)} stroke={C.muted} strokeWidth={2} fill="none" strokeDasharray="5 3" />
      <path d={g.fn((x) => x + 2)} stroke={C.green} strokeWidth={2.5} fill="none" />
      <path d={g.fn((x) => 3 * x)} stroke={C.red} strokeWidth={2.5} fill="none" />
      <path d={g.fn((x) => -x)} stroke={C.yellow} strokeWidth={2.5} fill="none" />
      {[
        ['y = x', 'parent function', C.muted],
        ['y = x + 2', 'shift UP 2 (b changes)', C.green],
        ['y = 3x', 'steeper (|m| > 1)', C.red],
        ['y = −x', 'reflect over x-axis', C.yellow],
      ].map(([eq, d, c], i) => (
        <g key={eq}>
          <rect x={250} y={30 + i * 46} width={14} height={14} rx={3} fill={c} />
          <T x={274} y={37 + i * 46} size={14} mono weight={700} anchor="start">{eq}</T>
          <T x={274} y={55 + i * 46} size={11} anchor="start" color={C.muted}>{d}</T>
        </g>
      ))}
      <T x={375} y={222} size={11} color={C.muted}>{'0 < |m| < 1 → flatter'}</T>
    </Frame>
  )
}

function TableToLine() {
  const rows = [[0, 5], [1, 8], [2, 11], [3, 14]]
  return (
    <Frame label="Table of values with constant rate of change of 3 gives y = 3x + 5">
      <Box x={30} y={20} w={170} h={200} color={C.cobalt} />
      <T x={78} y={40} weight={700} color={C.cobalt} mono>x</T>
      <T x={152} y={40} weight={700} color={C.cobalt} mono>y</T>
      <line x1={115} y1={28} x2={115} y2={212} stroke={C.cobalt} />
      {rows.map(([x, y], i) => (
        <g key={x}>
          <T x={78} y={76 + i * 38} mono size={16}>{x}</T>
          <T x={152} y={76 + i * 38} mono size={16} weight={700} color={i === 0 ? C.green : C.text}>{y}</T>
          {i < 3 && <T x={224} y={95 + i * 38} size={12} color={C.yellow} weight={700}>+3</T>}
        </g>
      ))}
      <T x={375} y={40} size={13} weight={700}>{'Step 1: rate of change'}</T>
      <T x={375} y={62} size={13} mono color={C.yellow}>{'m = Δy/Δx = 3/1 = 3'}</T>
      <T x={375} y={100} size={13} weight={700}>{'Step 2: y when x = 0'}</T>
      <T x={375} y={122} size={13} mono color={C.green}>b = 5</T>
      <Box x={290} y={150} w={170} h={46} color={C.cobalt} strong />
      <T x={375} y={173} size={18} mono weight={700}>{'y = 3x + 5'}</T>
      <T x={375} y={218} size={11} color={C.muted}>{'From 2 points: find m, then plug in to get b'}</T>
    </Frame>
  )
}

function ArithSeq() {
  const terms = [4, 7, 10, 13, 16]
  return (
    <Frame label="Arithmetic sequence 4, 7, 10, 13, 16 with common difference 3">
      <T x={260} y={22} size={14} weight={700}>{'Arithmetic sequence: add d every time'}</T>
      {terms.map((t, i) => (
        <g key={t}>
          <Box x={30 + i * 96} y={50} w={70} h={56} color={i === 0 ? C.green : C.cobalt} strong />
          <T x={65 + i * 96} y={70} size={11} color={C.muted} mono>{`a${'₁₂₃₄₅'[i]}`}</T>
          <T x={65 + i * 96} y={90} size={20} mono weight={700}>{t}</T>
          {i < 4 && <T x={113 + i * 96} y={40} size={12} color={C.yellow} weight={700}>+3</T>}
        </g>
      ))}
      <Box x={110} y={130} w={300} h={48} color={C.yellow} />
      <T x={260} y={154} size={18} mono weight={700}>{'aₙ = a₁ + (n − 1)d'}</T>
      <T x={260} y={200} size={13} mono color={C.green}>{'a₂₀ = 4 + (19)(3) = 61'}</T>
      <T x={260} y={224} size={11} color={C.muted}>{'Sequences are linear functions with domain n = 1, 2, 3, …'}</T>
    </Frame>
  )
}

function Correlation() {
  const sets: { title: string; r: string; color: string; pts: Pt[] }[] = [
    { title: 'Strong +', r: 'r ≈ 0.95', color: C.green, pts: [[1, 1.2], [2, 2.1], [3, 2.8], [4, 4.2], [5, 4.8], [6, 6.1], [7, 6.8]] },
    { title: 'None', r: 'r ≈ 0', color: C.yellow, pts: [[1, 5], [2, 2], [3, 6], [4, 3], [5, 6.5], [6, 1.5], [7, 4]] },
    { title: 'Strong −', r: 'r ≈ −0.95', color: C.red, pts: [[1, 6.8], [2, 6.2], [3, 4.9], [4, 4.1], [5, 3.2], [6, 1.9], [7, 1.1]] },
  ]
  return (
    <Frame label="Scatter plots with positive, zero, and negative correlation coefficients">
      {sets.map((s, i) => {
        const ox = 20 + i * 168
        const px = (x: number) => ox + x * 18
        const py = (y: number) => 170 - y * 18
        return (
          <g key={s.title}>
            <rect x={ox} y={36} width={150} height={146} fill="#0B1220" stroke={C.edge} />
            <T x={ox + 75} y={22} size={13} weight={700} color={s.color}>{s.title}</T>
            {s.pts.map(([x, y]) => <circle key={`${x}`} cx={px(x)} cy={py(y)} r={4.5} fill={s.color} />)}
            {s.title !== 'None' && (
              <line x1={px(0.5)} y1={py(s.title === 'Strong +' ? 0.6 : 7.4)} x2={px(7.5)} y2={py(s.title === 'Strong +' ? 7.4 : 0.6)} stroke={s.color} strokeDasharray="4 3" />
            )}
            <T x={ox + 75} y={200} size={14} mono weight={700}>{s.r}</T>
          </g>
        )
      })}
      <T x={260} y={228} size={11} color={C.muted}>{'−1 ≤ r ≤ 1 · closer to ±1 = stronger · correlation ≠ causation'}</T>
    </Frame>
  )
}

function NumberLine() {
  const x0 = 40
  const step = 44
  const px = (n: number) => x0 + (n + 1) * step
  return (
    <Frame label="Number lines for x greater than 2 with open circle and x less than or equal to 2 with closed circle">
      {[{ y: 70, label: 'x > 2', open: true, dir: 1, color: C.cobalt, note: 'open circle ○ for > or <' },
        { y: 160, label: 'x ≤ 2', open: false, dir: -1, color: C.green, note: 'closed circle ● for ≥ or ≤' }].map((r) => (
        <g key={r.label}>
          <T x={20} y={r.y - 30} size={15} mono weight={700} anchor="start" color={r.color}>{r.label}</T>
          <T x={500} y={r.y - 30} size={11} anchor="end" color={C.muted}>{r.note}</T>
          <line x1={30} y1={r.y} x2={490} y2={r.y} stroke={C.muted} strokeWidth={1.5} />
          {Array.from({ length: 10 }, (_, i) => i - 1).map((n) => (
            <g key={n}>
              <line x1={px(n)} y1={r.y - 5} x2={px(n)} y2={r.y + 5} stroke={C.muted} />
              <T x={px(n)} y={r.y + 18} size={10} color={C.muted} mono>{n}</T>
            </g>
          ))}
          <line x1={px(2)} y1={r.y} x2={r.dir > 0 ? 486 : 34} y2={r.y} stroke={r.color} strokeWidth={4} />
          <polygon points={r.dir > 0 ? `494,${r.y} 482,${r.y - 6} 482,${r.y + 6}` : `26,${r.y} 38,${r.y - 6} 38,${r.y + 6}`} fill={r.color} />
          <Dot x={px(2)} y={r.y} color={r.color} open={r.open} />
        </g>
      ))}
      <T x={260} y={220} size={12} color={C.red} weight={700}>{'Multiply or divide by a NEGATIVE → FLIP the sign'}</T>
    </Frame>
  )
}

function InequalityGraph() {
  const g = makeGrid(20, 20, 200, -5, 5)
  const g2 = makeGrid(290, 20, 200, -5, 5)
  return (
    <Frame label="Graphs of y greater than x plus 1 with dashed line and y less than or equal to negative x plus 2 with solid line">
      {g.node}
      <path d={`${g.path([[-5, -4], [4, 5]])} L ${g.px(-5)} ${g.py(5)} Z`} fill={C.cobalt} fillOpacity={0.22} />
      <path d={g.fn((x) => x + 1)} stroke={C.cobalt} strokeWidth={2.5} fill="none" strokeDasharray="7 5" />
      <T x={120} y={232} size={12} mono weight={700} color={C.cobalt}>{'y > x + 1 (dashed, above)'}</T>
      {g2.node}
      <path d={`${g2.path([[-3, 5], [5, -3]])} L ${g2.px(-5)} ${g2.py(-5)} L ${g2.px(-5)} ${g2.py(5)} Z`} fill={C.green} fillOpacity={0.22} />
      <path d={g2.fn((x) => -x + 2)} stroke={C.green} strokeWidth={2.5} fill="none" />
      <T x={390} y={232} size={12} mono weight={700} color={C.green}>{'y ≤ −x + 2 (solid, below)'}</T>
    </Frame>
  )
}

function FeasibleRegion() {
  const g = makeGrid(20, 20, 200, -1, 7)
  return (
    <Frame label="System of inequalities with shaded feasible region where both overlap">
      {g.node}
      <path d={`${g.path([[0, 0], [0, 6], [2, 4], [4, 0]])} Z`} fill={C.green} fillOpacity={0.35} />
      <path d={g.fn((x) => 6 - x, -1, 7)} stroke={C.cobalt} strokeWidth={2.5} fill="none" />
      <path d={g.fn((x) => 8 - 2 * x, 0.5, 4.5)} stroke={C.yellow} strokeWidth={2.5} fill="none" />
      <Dot x={g.px(2)} y={g.py(4)} color={C.red} />
      <T x={g.px(2) + 30} y={g.py(4) - 10} size={11} color={C.red} weight={700}>(2, 4)</T>
      <T x={375} y={36} size={14} weight={700}>System</T>
      <T x={375} y={62} size={14} mono color={C.cobalt}>{'x + y ≤ 6'}</T>
      <T x={375} y={86} size={14} mono color={C.yellow}>{'2x + y ≤ 8'}</T>
      <T x={375} y={110} size={14} mono color={C.muted}>{'x ≥ 0, y ≥ 0'}</T>
      <Box x={270} y={130} w={210} h={50} color={C.green} />
      <T x={375} y={148} size={12} weight={700} color={C.green}>FEASIBLE REGION</T>
      <T x={375} y={166} size={11}>where ALL shadings overlap</T>
      <T x={375} y={204} size={11} color={C.muted}>{'Test a point like (0, 0) to pick a side'}</T>
    </Frame>
  )
}

function RealNumbers() {
  return (
    <Frame label="Nested sets of the real number system">
      <rect x={10} y={14} width={500} height={212} rx={14} fill={C.cobalt} fillOpacity={0.08} stroke={C.cobalt} strokeWidth={1.5} />
      <T x={30} y={32} size={13} weight={700} anchor="start" color={C.cobalt}>REAL NUMBERS</T>
      <rect x={24} y={46} width={320} height={170} rx={12} fill={C.green} fillOpacity={0.1} stroke={C.green} />
      <T x={40} y={64} size={12} weight={700} anchor="start" color={C.green}>{'Rational (a/b, ends or repeats)'}</T>
      <T x={40} y={84} size={11} anchor="start" color={C.muted} mono>{'½  −0.75  0.333…'}</T>
      <rect x={60} y={98} width={260} height={110} rx={10} fill={C.yellow} fillOpacity={0.1} stroke={C.yellow} />
      <T x={76} y={116} size={12} weight={700} anchor="start" color={C.yellow}>Integers</T>
      <T x={76} y={134} size={11} anchor="start" color={C.muted} mono>{'−3  −1'}</T>
      <rect x={160} y={124} width={150} height={78} rx={8} fill={C.red} fillOpacity={0.1} stroke={C.red} />
      <T x={235} y={140} size={11} weight={700} color={C.red}>{'Whole (0, 1, 2…)'}</T>
      <rect x={176} y={152} width={118} height={42} rx={6} fill={C.cobalt} fillOpacity={0.15} stroke={C.cobalt} />
      <T x={235} y={166} size={10} weight={700} color={C.cobalt}>Natural</T>
      <T x={235} y={182} size={10} mono>{'1, 2, 3…'}</T>
      <rect x={356} y={46} width={140} height={170} rx={12} fill={C.red} fillOpacity={0.1} stroke={C.red} strokeDasharray="5 3" />
      <T x={426} y={66} size={12} weight={700} color={C.red}>Irrational</T>
      <T x={426} y={86} size={10} color={C.muted}>never ends,</T>
      <T x={426} y={100} size={10} color={C.muted}>never repeats</T>
      {['π', '√2', '√7', 'e'].map((s, i) => <T key={s} x={426} y={128 + i * 22} size={15} mono weight={700}>{s}</T>)}
    </Frame>
  )
}

function RadicalTree() {
  return (
    <Frame label="Factor tree simplifying square root of 72 to 6 root 2">
      <T x={130} y={22} size={14} weight={700}>{'√72 factor tree'}</T>
      <Box x={95} y={36} w={70} h={34} color={C.cobalt} strong />
      <T x={130} y={53} mono weight={700} size={16}>72</T>
      <Arrow x1={115} y1={72} x2={75} y2={104} />
      <Arrow x1={145} y1={72} x2={185} y2={104} />
      <Box x={40} y={106} w={70} h={34} color={C.green} strong />
      <T x={75} y={123} mono weight={700} size={16}>36</T>
      <T x={75} y={156} size={10} color={C.green}>perfect square!</T>
      <Box x={150} y={106} w={70} h={34} color={C.yellow} strong />
      <T x={185} y={123} mono weight={700} size={16}>2</T>
      <T x={130} y={200} size={12} color={C.muted}>{'Find the LARGEST perfect square factor'}</T>
      <T x={385} y={40} size={13} weight={700}>Steps</T>
      {['√72', '= √36 · √2', '= 6√2'].map((s, i) => (
        <T key={s} x={385} y={74 + i * 34} size={18} mono weight={700} color={i === 2 ? C.green : C.text}>{s}</T>
      ))}
      <T x={385} y={182} size={11} color={C.muted} mono>{'Squares: 4 9 16 25 36 49 64 81 100'}</T>
      <T x={385} y={206} size={11} color={C.muted}>{'√(a·b) = √a · √b'}</T>
    </Frame>
  )
}

function RadicalOps() {
  const rows = [
    { op: 'ADD / SUBTRACT', ex: '3√5 + 2√5 = 5√5', note: 'only LIKE radicals (same inside)', color: C.green },
    { op: 'MULTIPLY', ex: '√3 · √12 = √36 = 6', note: 'multiply insides, then simplify', color: C.cobalt },
    { op: 'DIVIDE', ex: '√50 / √2 = √25 = 5', note: 'divide insides, then simplify', color: C.yellow },
    { op: 'RATIONALIZE', ex: '1/√2 = √2/2', note: 'multiply top and bottom by √2', color: C.red },
  ]
  return (
    <Frame label="Rules for adding, multiplying, dividing, and rationalizing radicals">
      {rows.map((r, i) => (
        <g key={r.op}>
          <Box x={14} y={14 + i * 54} w={492} h={46} color={r.color} />
          <T x={30} y={37 + i * 54} size={11} weight={700} anchor="start" color={r.color}>{r.op}</T>
          <T x={250} y={37 + i * 54} size={15} mono weight={700}>{r.ex}</T>
          <T x={494} y={37 + i * 54} size={10} anchor="end" color={C.muted}>{r.note}</T>
        </g>
      ))}
    </Frame>
  )
}

function Parabola() {
  const g = makeGrid(20, 20, 200, -3, 7)
  return (
    <Frame label="Parabola f(x) = (x − 2)² − 1 with vertex at (2, −1)">
      {g.node}
      <line x1={g.px(2)} y1={20} x2={g.px(2)} y2={220} stroke={C.yellow} strokeDasharray="5 4" strokeWidth={1.5} />
      <path d={g.fn((x) => (x - 2) ** 2 - 1, -1, 5)} stroke={C.cobalt} strokeWidth={2.5} fill="none" />
      <Dot x={g.px(2)} y={g.py(-1)} color={C.red} />
      <T x={g.px(2) + 34} y={g.py(-1) + 4} size={11} color={C.red} weight={700}>{'(2, −1)'}</T>
      <Box x={250} y={22} w={250} h={56} color={C.cobalt} strong />
      <T x={375} y={50} size={17} mono weight={700}>{'f(x) = a(x − h)² + k'}</T>
      <T x={375} y={100} size={13} mono>{'f(x) = (x − 2)² − 1'}</T>
      {[['vertex (h, k) = (2, −1)', C.red], ['axis: x = 2', C.yellow], ['a > 0 opens UP ∪', C.green], ['a < 0 opens DOWN ∩', C.muted], ['|a| > 1 narrower', C.muted]].map(([l, c], i) => (
        <T key={l} x={375} y={128 + i * 20} size={12} color={c}>{l}</T>
      ))}
    </Frame>
  )
}

function AxisSymmetry() {
  const g = makeGrid(20, 20, 200, -2, 8)
  return (
    <Frame label="Parabola y = x² − 4x + 3 with axis of symmetry x = 2 and roots 1 and 3">
      {g.node}
      <line x1={g.px(2)} y1={20} x2={g.px(2)} y2={220} stroke={C.yellow} strokeDasharray="5 4" strokeWidth={2} />
      <path d={g.fn((x) => x * x - 4 * x + 3, -0.8, 4.8)} stroke={C.cobalt} strokeWidth={2.5} fill="none" />
      <Dot x={g.px(1)} y={g.py(0)} color={C.green} />
      <Dot x={g.px(3)} y={g.py(0)} color={C.green} />
      <Dot x={g.px(2)} y={g.py(-1)} color={C.red} />
      <Dot x={g.px(0)} y={g.py(3)} color={C.yellow} />
      <T x={375} y={30} size={13} mono weight={700}>{'y = x² − 4x + 3'}</T>
      <T x={375} y={52} size={11} color={C.muted} mono>{'a = 1, b = −4, c = 3'}</T>
      <Box x={270} y={66} w={210} h={44} color={C.yellow} strong />
      <T x={375} y={88} size={16} mono weight={700}>{'x = −b / 2a = 2'}</T>
      <T x={375} y={130} size={12} color={C.red}>{'vertex: plug in x = 2 → (2, −1)'}</T>
      <T x={375} y={152} size={12} color={C.green}>{'zeros: x = 1 and x = 3'}</T>
      <T x={375} y={174} size={12} color={C.yellow}>{'y-intercept = c = 3'}</T>
      <T x={375} y={204} size={11} color={C.muted}>{'Axis is halfway between the zeros'}</T>
    </Frame>
  )
}

function DomainRange() {
  const g = makeGrid(20, 20, 200, -5, 5)
  return (
    <Frame label="Downward parabola with maximum 4 showing domain all reals and range y less than or equal to 4">
      {g.node}
      <path d={g.fn((x) => -((x - 1) ** 2) + 4, -2, 4)} stroke={C.cobalt} strokeWidth={2.5} fill="none" />
      <line x1={20} y1={g.py(4)} x2={220} y2={g.py(4)} stroke={C.red} strokeDasharray="4 3" />
      <Dot x={g.px(1)} y={g.py(4)} color={C.red} />
      <line x1={g.px(-5) + 4} y1={214} x2={g.px(5) - 4} y2={214} stroke={C.green} strokeWidth={4} />
      <line x1={14} y1={g.py(4)} x2={14} y2={218} stroke={C.yellow} strokeWidth={4} />
      <T x={375} y={34} size={13} mono weight={700}>{'f(x) = −(x − 1)² + 4'}</T>
      <Box x={270} y={54} w={210} h={52} color={C.green} />
      <T x={375} y={72} size={11} weight={700} color={C.green}>DOMAIN (all x-values)</T>
      <T x={375} y={92} size={13} mono>{'all real numbers'}</T>
      <Box x={270} y={116} w={210} h={52} color={C.yellow} />
      <T x={375} y={134} size={11} weight={700} color={C.yellow}>RANGE (all y-values)</T>
      <T x={375} y={154} size={13} mono>{'y ≤ 4'}</T>
      <T x={375} y={190} size={11} color={C.red}>{'a < 0 → maximum at vertex (1, 4)'}</T>
      <T x={375} y={210} size={11} color={C.muted}>{'Range always starts at k'}</T>
    </Frame>
  )
}

function Factoring() {
  return (
    <Frame label="Area model factoring x² + 5x + 6 into (x + 2)(x + 3)">
      <T x={140} y={20} size={13} weight={700}>{'x² + 5x + 6 (area model)'}</T>
      <T x={95} y={44} mono weight={700} color={C.cobalt}>x</T>
      <T x={190} y={44} mono weight={700} color={C.cobalt}>+3</T>
      <T x={30} y={90} mono weight={700} color={C.yellow}>x</T>
      <T x={30} y={165} mono weight={700} color={C.yellow}>+2</T>
      <Box x={50} y={56} w={90} h={70} color={C.cobalt} strong />
      <T x={95} y={91} mono weight={700} size={16}>{'x²'}</T>
      <Box x={145} y={56} w={90} h={70} color={C.green} />
      <T x={190} y={91} mono weight={700} size={16}>3x</T>
      <Box x={50} y={131} w={90} h={66} color={C.green} />
      <T x={95} y={164} mono weight={700} size={16}>2x</T>
      <Box x={145} y={131} w={90} h={66} color={C.yellow} strong />
      <T x={190} y={164} mono weight={700} size={16}>6</T>
      <T x={385} y={30} size={12} weight={700}>{'Find two numbers that…'}</T>
      <T x={385} y={54} size={13} mono color={C.yellow}>{'MULTIPLY to c = 6'}</T>
      <T x={385} y={76} size={13} mono color={C.green}>{'ADD to b = 5'}</T>
      <T x={385} y={100} size={14} mono weight={700}>{'→ 2 and 3'}</T>
      <Box x={290} y={118} w={190} h={40} color={C.cobalt} strong />
      <T x={385} y={138} size={16} mono weight={700}>{'(x + 2)(x + 3) = 0'}</T>
      <T x={385} y={180} size={12} color={C.muted}>{'Zero Product Property:'}</T>
      <T x={385} y={202} size={14} mono weight={700} color={C.red}>{'x = −2 or x = −3'}</T>
    </Frame>
  )
}

function CompleteSquare() {
  return (
    <Frame label="Completing the square for x² + 6x by adding 9">
      <T x={140} y={20} size={13} weight={700}>{'x² + 6x  →  add (6/2)² = 9'}</T>
      <Box x={40} y={40} w={110} h={110} color={C.cobalt} strong />
      <T x={95} y={95} mono weight={700} size={18}>{'x²'}</T>
      <Box x={154} y={40} w={46} h={110} color={C.green} />
      <T x={177} y={95} mono weight={700} size={13}>3x</T>
      <Box x={40} y={154} w={110} h={46} color={C.green} />
      <T x={95} y={177} mono weight={700} size={13}>3x</T>
      <Box x={154} y={154} w={46} h={46} color={C.yellow} strong dashed />
      <T x={177} y={177} mono weight={700} size={14} color={C.yellow}>9</T>
      <T x={120} y={222} size={11} color={C.yellow}>{'the missing corner'}</T>
      <T x={385} y={30} size={13} weight={700}>{'Solve x² + 6x − 7 = 0'}</T>
      {['x² + 6x = 7', 'x² + 6x + 9 = 7 + 9', '(x + 3)² = 16', 'x + 3 = ±4', 'x = 1 or x = −7'].map((s, i) => (
        <T key={s} x={385} y={62 + i * 30} size={14} mono weight={i === 4 ? 700 : 500} color={i === 4 ? C.green : i === 3 ? C.red : C.text}>{s}</T>
      ))}
      <T x={385} y={218} size={11} color={C.muted}>{'Square root → don’t forget ±'}</T>
    </Frame>
  )
}

function Discriminant() {
  const cases = [
    { title: 'D > 0', sub: '2 real solutions', color: C.green, k: -2 },
    { title: 'D = 0', sub: '1 real solution', color: C.yellow, k: 0 },
    { title: 'D < 0', sub: '0 real (2 complex)', color: C.red, k: 2 },
  ]
  return (
    <Frame label="Quadratic formula and the three discriminant cases">
      <Box x={70} y={8} w={380} h={46} color={C.cobalt} strong />
      <T x={260} y={31} size={17} mono weight={700}>{'x = (−b ± √(b² − 4ac)) / 2a'}</T>
      {cases.map((c, i) => {
        const ox = 26 + i * 166
        const px = (x: number) => ox + 70 + x * 22
        const py = (y: number) => 150 - y * 22
        const pts = Array.from({ length: 31 }, (_, j) => -2.2 + (4.4 * j) / 30).map((x) => `${px(x)},${py(x * x + c.k)}`)
        return (
          <g key={c.title}>
            <rect x={ox} y={66} width={140} height={120} fill="#0B1220" stroke={C.edge} />
            <line x1={ox} y1={150} x2={ox + 140} y2={150} stroke={C.muted} />
            <polyline points={pts.filter((_, j) => { const x = -2.2 + (4.4 * j) / 30; const y = py(x * x + c.k); return y > 66 && y < 186 }).join(' ')} fill="none" stroke={c.color} strokeWidth={2.5} />
            <T x={ox + 70} y={204} size={14} mono weight={700} color={c.color}>{c.title}</T>
            <T x={ox + 70} y={224} size={11} color={C.muted}>{c.sub}</T>
          </g>
        )
      })}
    </Frame>
  )
}

function Differences() {
  const lin = [3, 5, 7, 9, 11]
  const quad = [1, 4, 9, 16, 25]
  const block = (ox: number, title: string, vals: number[], color: string, verdict: string) => {
    const d1 = vals.slice(1).map((v, i) => v - vals[i])
    const d2 = d1.slice(1).map((v, i) => v - d1[i])
    return (
      <g>
        <T x={ox + 115} y={20} size={13} weight={700} color={color}>{title}</T>
        {vals.map((v, i) => <T key={i} x={ox + 20 + i * 48} y={50} size={15} mono weight={700}>{v}</T>)}
        <T x={ox - 4} y={50} size={10} anchor="end" color={C.muted}>y</T>
        {d1.map((v, i) => <T key={i} x={ox + 44 + i * 48} y={86} size={13} mono color={C.cobalt}>{`+${v}`}</T>)}
        <T x={ox - 4} y={86} size={10} anchor="end" color={C.cobalt}>1st</T>
        {d2.map((v, i) => <T key={i} x={ox + 68 + i * 48} y={122} size={13} mono color={C.yellow}>{v}</T>)}
        <T x={ox - 4} y={122} size={10} anchor="end" color={C.yellow}>2nd</T>
        <Box x={ox} y={146} w={230} h={40} color={color} strong />
        <T x={ox + 115} y={166} size={13} weight={700}>{verdict}</T>
      </g>
    )
  }
  return (
    <Frame label="First differences constant means linear; second differences constant means quadratic">
      {block(30, 'Linear', lin, C.cobalt, '1st differences equal → LINEAR')}
      {block(280, 'Quadratic', quad, C.green, '2nd differences equal → QUADRATIC')}
      <T x={260} y={214} size={11} color={C.muted}>{'x-values must go up by equal steps (x = 1, 2, 3, 4, 5)'}</T>
    </Frame>
  )
}

function Projectile() {
  const ox = 40
  const oy = 200
  const sx = 70
  const sy = 1.9
  const h = (t: number) => -16 * t * t + 48 * t + 6
  const pts = Array.from({ length: 41 }, (_, i) => (3.12 * i) / 40).map((t) => `${ox + t * sx},${oy - h(t) * sy}`)
  return (
    <Frame label="Projectile path h(t) = −16t² + 48t + 6 with maximum height 42 feet at 1.5 seconds">
      <line x1={ox} y1={oy} x2={ox + 240} y2={oy} stroke={C.muted} />
      <line x1={ox} y1={oy} x2={ox} y2={20} stroke={C.muted} />
      <T x={ox + 120} y={oy + 18} size={10} color={C.muted}>{'time t (sec)'}</T>
      <T x={ox - 18} y={30} size={10} color={C.muted}>h</T>
      <polyline points={pts.join(' ')} fill="none" stroke={C.cobalt} strokeWidth={2.5} />
      <Dot x={ox} y={oy - 6 * sy} color={C.yellow} />
      <Dot x={ox + 1.5 * sx} y={oy - 42 * sy} color={C.red} />
      <Dot x={ox + 3.12 * sx} y={oy} color={C.green} />
      <T x={ox + 1.5 * sx} y={oy - 42 * sy - 14} size={11} color={C.red} weight={700}>{'max (1.5, 42)'}</T>
      <T x={ox + 30} y={oy - 6 * sy + 2} size={10} color={C.yellow}>{'h₀ = 6'}</T>
      <T x={ox + 3.12 * sx} y={oy - 14} size={10} color={C.green}>lands</T>
      <Box x={300} y={20} w={204} h={44} color={C.cobalt} strong />
      <T x={402} y={42} size={14} mono weight={700}>{'h(t) = −16t² + v₀t + h₀'}</T>
      {[['−16 = gravity (ft/s²)', C.muted], ['v₀ = 48 ft/s launch speed', C.text], ['h₀ = 6 ft starting height', C.yellow], ['max at t = −b/2a = 1.5 s', C.red], ['lands when h(t) = 0', C.green]].map(([l, c], i) => (
        <T key={l} x={402} y={88 + i * 26} size={12} color={c}>{l}</T>
      ))}
    </Frame>
  )
}

function ModelCompare() {
  return (
    <Frame label="Choosing a linear or quadratic model from a table or a situation">
      <Box x={14} y={14} w={240} h={212} color={C.cobalt} />
      <T x={134} y={36} size={14} weight={700} color={C.cobalt}>LINEAR model</T>
      <path d="M 40 170 L 230 70" stroke={C.cobalt} strokeWidth={3} />
      <T x={134} y={188} size={11}>constant rate of change</T>
      <T x={134} y={206} size={12} mono weight={700}>{'y = mx + b'}</T>
      <Box x={266} y={14} w={240} h={212} color={C.green} />
      <T x={386} y={36} size={14} weight={700} color={C.green}>QUADRATIC model</T>
      <path d="M 296 70 Q 386 270 476 70" stroke={C.green} strokeWidth={3} fill="none" />
      <T x={386} y={188} size={11}>{'rises then falls (max/min)'}</T>
      <T x={386} y={206} size={12} mono weight={700}>{'y = ax² + bx + c'}</T>
      <T x={134} y={150} size={10} color={C.muted}>{'e.g. $5 per ticket'}</T>
      <T x={386} y={60} size={10} color={C.muted}>{'e.g. area, thrown ball, profit'}</T>
    </Frame>
  )
}

export const ALG_DIAGRAMS: Record<AlgDiagramKey, () => ReactNode> = {
  'slope-grid': SlopeGrid,
  'line-forms': LineForms,
  'line-transform': LineTransform,
  'table-to-line': TableToLine,
  'arith-seq': ArithSeq,
  correlation: Correlation,
  'number-line': NumberLine,
  'inequality-graph': InequalityGraph,
  'feasible-region': FeasibleRegion,
  'real-numbers': RealNumbers,
  'radical-tree': RadicalTree,
  'radical-ops': RadicalOps,
  parabola: Parabola,
  'axis-symmetry': AxisSymmetry,
  'domain-range': DomainRange,
  factoring: Factoring,
  'complete-square': CompleteSquare,
  discriminant: Discriminant,
  differences: Differences,
  projectile: Projectile,
  'model-compare': ModelCompare,
}
