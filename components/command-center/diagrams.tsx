import type { ReactNode } from 'react'
import type { DiagramKey } from '@/lib/types'

const C = {
  cobalt: '#3B82F6',
  green: '#10B981',
  yellow: '#F59E0B',
  red: '#EF4444',
  text: '#E5E7EB',
  muted: '#9CA3AF',
  edge: '#1F2937',
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 520 240" role="img" aria-label={label} className="h-auto w-full">
      {children}
    </svg>
  )
}

function Box({
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

function T({
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

function Arrow({ x1, y1, x2, y2, color = C.muted }: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
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

function Ipo() {
  const boxes = [
    { x: 20, color: C.cobalt, title: 'INPUT', value: '7 + 3', sub: 'keyboard / mouse' },
    { x: 190, color: C.yellow, title: 'PROCESS', value: 'a + b', sub: 'CPU runs the code' },
    { x: 360, color: C.green, title: 'OUTPUT', value: '10', sub: 'screen / speaker' },
  ]
  return (
    <Frame label="Input, process, output diagram">
      <T x={260} y={34} size={16} weight={700}>{'Input → Process → Output'}</T>
      {boxes.map((b) => (
        <g key={b.title}>
          <Box x={b.x} y={70} w={140} h={100} color={b.color} />
          <T x={b.x + 70} y={98} color={b.color} weight={700}>{b.title}</T>
          <T x={b.x + 70} y={126} mono size={18}>{b.value}</T>
          <T x={b.x + 70} y={152} size={11} color={C.muted}>{b.sub}</T>
        </g>
      ))}
      <Arrow x1={164} y1={120} x2={186} y2={120} />
      <Arrow x1={334} y1={120} x2={356} y2={120} />
      <T x={260} y={208} size={12} color={C.muted}>Every program takes data in, transforms it, and sends results out</T>
    </Frame>
  )
}

function ThreeBlocks() {
  return (
    <Frame label="Sequencing, selection, and iteration diagram">
      <Box x={15} y={30} w={150} h={180} color={C.cobalt} />
      <T x={90} y={50} color={C.cobalt} weight={700}>SEQUENCING</T>
      {[72, 116, 160].map((y, i) => (
        <g key={y}>
          <Box x={45} y={y} w={90} h={26} color={C.cobalt} strong />
          <T x={90} y={y + 13} size={12}>{`Step ${i + 1}`}</T>
        </g>
      ))}
      <Arrow x1={90} y1={99} x2={90} y2={114} />
      <Arrow x1={90} y1={143} x2={90} y2={158} />

      <Box x={185} y={30} w={150} h={180} color={C.yellow} />
      <T x={260} y={50} color={C.yellow} weight={700}>SELECTION</T>
      <polygon points="260,72 305,108 260,144 215,108" fill={C.yellow} fillOpacity={0.3} stroke={C.yellow} strokeWidth={2} />
      <T x={260} y={108} size={12} mono>{'x > 5?'}</T>
      <Arrow x1={222} y1={118} x2={215} y2={160} color={C.green} />
      <Arrow x1={298} y1={118} x2={305} y2={160} color={C.red} />
      <Box x={192} y={162} w={50} h={26} color={C.green} strong />
      <T x={217} y={175} size={12}>yes</T>
      <Box x={280} y={162} w={50} h={26} color={C.red} strong />
      <T x={305} y={175} size={12}>no</T>

      <Box x={355} y={30} w={150} h={180} color={C.green} />
      <T x={430} y={50} color={C.green} weight={700}>ITERATION</T>
      <path d="M 475 112 C 500 112, 500 74, 430 74 L 430 92" fill="none" stroke={C.green} strokeWidth={2} />
      <polygon points="430,98 425,89 435,89" fill={C.green} />
      <Box x={385} y={98} w={90} h={34} color={C.green} strong />
      <T x={430} y={115} size={12}>do step</T>
      <T x={430} y={160} size={12} color={C.muted}>repeat until done</T>
      <T x={430} y={182} size={12} mono color={C.green}>for / while</T>
      <T x={260} y={228} size={12} color={C.muted}>Every algorithm = sequencing + selection + iteration</T>
    </Frame>
  )
}

function BinaryPlaces() {
  const places = [128, 64, 32, 16, 8, 4, 2, 1]
  const bits = [0, 0, 1, 0, 1, 1, 0, 1]
  return (
    <Frame label="Binary place values showing 00101101 equals 45">
      <T x={260} y={22} size={15} weight={700}>Binary place values (8 bits = 1 byte)</T>
      {places.map((p, i) => {
        const x = 36 + i * 56
        const on = bits[i] === 1
        return (
          <g key={p}>
            <T x={x + 26} y={50} size={10} color={C.muted} mono>{`2^${7 - i}`}</T>
            <T x={x + 26} y={68} size={13} color={on ? C.cobalt : C.muted} weight={700}>{p}</T>
            <Box x={x} y={82} w={52} h={50} color={on ? C.cobalt : C.edge} strong={on} />
            <T x={x + 26} y={107} size={22} mono weight={700} color={on ? C.text : C.muted}>{bits[i]}</T>
          </g>
        )
      })}
      <T x={260} y={164} size={18} color={C.green} weight={700} mono>32 + 8 + 4 + 1 = 45</T>
      <T x={260} y={200} size={12} color={C.muted}>{'n bits → 2ⁿ values · 8 bits → 256 values (0 to 255)'}</T>
    </Frame>
  )
}

function VariableBoxes() {
  return (
    <Frame label="Variable assignment diagram: score changes from 85 to 90">
      <T x={105} y={50} size={12} color={C.muted}>before</T>
      <Box x={40} y={70} w={130} h={80} color={C.cobalt} />
      <T x={105} y={88} size={12} color={C.cobalt} mono weight={700}>score</T>
      <T x={105} y={120} size={28} mono weight={700} opacity={0.5}>85</T>
      <line x1={82} y1={132} x2={128} y2={108} stroke={C.red} strokeWidth={3} />
      <Arrow x1={182} y1={110} x2={340} y2={110} color={C.yellow} />
      <T x={261} y={92} size={13} mono color={C.yellow} weight={700}>score = score + 5</T>
      <T x={261} y={130} size={11} color={C.muted}>right side first: 85 + 5</T>
      <T x={415} y={50} size={12} color={C.muted}>after</T>
      <Box x={350} y={70} w={130} h={80} color={C.green} strong />
      <T x={415} y={88} size={12} color={C.green} mono weight={700}>score</T>
      <T x={415} y={120} size={28} mono weight={700}>90</T>
      <T x={260} y={186} size={12} color={C.muted}>The old value is overwritten. The label stays the same.</T>
      <T x={260} y={212} size={12} mono color={C.yellow}>{'AP pseudocode: score ← score + 5'}</T>
    </Frame>
  )
}

function TypeBins() {
  const types = [
    { name: 'int', v: '42', color: C.cobalt },
    { name: 'float', v: '3.14', color: C.yellow },
    { name: 'str', v: '"hi"', color: C.green },
    { name: 'bool', v: 'True', color: C.red },
  ]
  const ops = [
    { e: '17 / 5', r: '3.4', l: 'division → float' },
    { e: '17 // 5', r: '3', l: 'floor division' },
    { e: '17 % 5', r: '2', l: 'remainder (MOD)' },
  ]
  return (
    <Frame label="Data types and division operators">
      {types.map((t, i) => {
        const x = 15 + i * 125
        return (
          <g key={t.name}>
            <Box x={x} y={20} w={110} h={86} color={t.color} />
            <T x={x + 55} y={44} color={t.color} weight={700} mono>{t.name}</T>
            <T x={x + 55} y={78} size={20} mono weight={700}>{t.v}</T>
          </g>
        )
      })}
      {ops.map((o, i) => {
        const x = 20 + i * 165
        return (
          <g key={o.e}>
            <Box x={x} y={128} w={150} h={88} color={C.yellow} />
            <T x={x + 75} y={152} size={15} mono>{o.e}</T>
            <T x={x + 75} y={180} size={22} mono weight={700} color={C.yellow}>{o.r}</T>
            <T x={x + 75} y={204} size={11} color={C.muted}>{o.l}</T>
          </g>
        )
      })}
    </Frame>
  )
}

function StringIndex() {
  const letters = 'PYTHON'.split('')
  return (
    <Frame label="String indexing diagram for PYTHON">
      <T x={260} y={22} size={15} mono weight={700}>{'word = "PYTHON"'}</T>
      <T x={70} y={58} size={11} color={C.cobalt} anchor="end">index</T>
      <T x={70} y={152} size={11} color={C.yellow} anchor="end">negative</T>
      {letters.map((l, i) => {
        const x = 80 + i * 60
        const inSlice = i >= 1 && i <= 3
        return (
          <g key={i}>
            <T x={x + 28} y={58} size={14} mono color={C.cobalt} weight={700}>{i}</T>
            <Box x={x} y={74} w={56} h={56} color={inSlice ? C.green : C.cobalt} strong={inSlice} />
            <T x={x + 28} y={103} size={24} mono weight={700}>{l}</T>
            <T x={x + 28} y={152} size={13} mono color={C.yellow}>{i - 6}</T>
          </g>
        )
      })}
      <path d="M 140 172 L 140 180 L 316 180 L 316 172" fill="none" stroke={C.green} strokeWidth={2} />
      <T x={260} y={200} size={13} mono color={C.green} weight={700}>{'word[1:4] → "YTH"'}</T>
      <T x={260} y={222} size={11} color={C.muted}>slice stops BEFORE index 4</T>
    </Frame>
  )
}

function TruthTable() {
  const rows: [boolean, boolean][] = [
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ]
  const cols = ['A', 'B', 'A and B', 'A or B']
  const v = (b: boolean) => (b ? 'True' : 'False')
  return (
    <Frame label="Truth table for and and or">
      {cols.map((c, i) => (
        <g key={c}>
          <rect x={60 + i * 100} y={20} width={100} height={36} fill={i < 2 ? C.cobalt : i === 2 ? C.green : C.yellow} fillOpacity={0.25} stroke={C.edge} />
          <T x={110 + i * 100} y={38} mono weight={700}>{c}</T>
        </g>
      ))}
      {rows.map(([a, b], r) => {
        const vals = [a, b, a && b, a || b]
        return vals.map((val, i) => (
          <g key={`${r}-${i}`}>
            <rect x={60 + i * 100} y={56 + r * 38} width={100} height={38} fill="transparent" stroke={C.edge} />
            <T x={110 + i * 100} y={75 + r * 38} mono weight={i >= 2 ? 700 : 500} color={val ? C.green : C.red}>{v(val)}</T>
          </g>
        ))
      })}
      <T x={260} y={224} size={12} mono color={C.muted}>{'not True → False · not False → True'}</T>
    </Frame>
  )
}

function Flowchart() {
  return (
    <Frame label="If elif else flowchart for grades">
      <polygon points="90,40 160,85 90,130 20,85" fill={C.yellow} fillOpacity={0.2} stroke={C.yellow} strokeWidth={2} />
      <T x={90} y={85} size={11} mono>{'score ≥ 90?'}</T>
      <Arrow x1={90} y1={130} x2={90} y2={156} color={C.green} />
      <T x={102} y={143} size={10} color={C.green} anchor="start">yes</T>
      <Box x={45} y={158} w={90} h={36} color={C.green} strong />
      <T x={90} y={176} size={12} mono>print A</T>

      <Arrow x1={160} y1={85} x2={188} y2={85} color={C.red} />
      <T x={174} y={72} size={10} color={C.red}>no</T>
      <polygon points="260,40 330,85 260,130 190,85" fill={C.yellow} fillOpacity={0.2} stroke={C.yellow} strokeWidth={2} />
      <T x={260} y={85} size={11} mono>{'score ≥ 80?'}</T>
      <Arrow x1={260} y1={130} x2={260} y2={156} color={C.green} />
      <T x={272} y={143} size={10} color={C.green} anchor="start">yes</T>
      <Box x={215} y={158} w={90} h={36} color={C.green} strong />
      <T x={260} y={176} size={12} mono>print B</T>

      <Arrow x1={330} y1={85} x2={366} y2={85} color={C.red} />
      <T x={348} y={72} size={10} color={C.red}>no</T>
      <Box x={368} y={67} w={135} h={36} color={C.red} strong />
      <T x={435} y={85} size={12} mono>else: print C</T>
      <T x={260} y={222} size={12} color={C.muted}>Checked top to bottom — ONLY the first True branch runs</T>
    </Frame>
  )
}

function LoopCycle() {
  return (
    <Frame label="For loop with range 1 to 4 diagram">
      <T x={260} y={24} size={15} mono weight={700}>{'for i in range(1, 4):'}</T>
      {[1, 2, 3].map((n, i) => {
        const x = 30 + i * 112
        return (
          <g key={n}>
            <Box x={x} y={60} w={92} h={62} color={C.cobalt} strong />
            <T x={x + 46} y={82} size={15} mono weight={700}>{`i = ${n}`}</T>
            <T x={x + 46} y={106} size={11} mono color={C.muted}>{`pass ${n}`}</T>
            {i < 2 && <Arrow x1={x + 94} y1={91} x2={x + 110} y2={91} />}
          </g>
        )
      })}
      <Arrow x1={348} y1={91} x2={370} y2={91} color={C.red} />
      <Box x={372} y={60} w={130} h={62} color={C.red} dashed />
      <T x={437} y={82} size={15} mono weight={700} color={C.red}>i = 4</T>
      <T x={437} y={106} size={11} color={C.red}>STOP — excluded</T>
      <path d="M 300 128 Q 188 178 76 128" fill="none" stroke={C.green} strokeWidth={2} />
      <polygon points="76,128 88,128 82,138" fill={C.green} />
      <T x={188} y={168} size={12} color={C.green}>repeat body each pass</T>
      <T x={260} y={214} size={12} color={C.muted}>range(start, stop) includes start, EXCLUDES stop → runs stop − start times</T>
    </Frame>
  )
}

function FunctionMachine() {
  return (
    <Frame label="Function machine: double of 7 returns 14">
      <T x={260} y={24} size={15} weight={700}>A function is a reusable machine</T>
      <circle cx={80} cy={115} r={32} fill={C.cobalt} fillOpacity={0.3} stroke={C.cobalt} strokeWidth={2} />
      <T x={80} y={115} size={22} mono weight={700}>7</T>
      <T x={80} y={162} size={11} color={C.cobalt}>argument</T>
      <Arrow x1={114} y1={115} x2={176} y2={115} color={C.cobalt} />
      <Box x={180} y={60} w={170} h={110} color={C.yellow} strong />
      <T x={265} y={92} size={14} mono weight={700}>def double(n):</T>
      <T x={265} y={122} size={14} mono color={C.yellow}>return n * 2</T>
      <T x={265} y={150} size={11} color={C.muted}>{'n ← 7'}</T>
      <Arrow x1={352} y1={115} x2={404} y2={115} color={C.green} />
      <circle cx={440} cy={115} r={32} fill={C.green} fillOpacity={0.3} stroke={C.green} strokeWidth={2} />
      <T x={440} y={115} size={22} mono weight={700}>14</T>
      <T x={440} y={162} size={11} color={C.green}>return value</T>
      <T x={260} y={212} size={12} color={C.muted}>{'def builds the machine · double(7) runs it'}</T>
    </Frame>
  )
}

function ParamsReturn() {
  return (
    <Frame label="Parameters and arguments mapping diagram">
      <T x={195} y={60} size={16} mono anchor="end" weight={700}>def area(</T>
      <Box x={200} y={40} w={50} h={40} color={C.cobalt} strong />
      <T x={225} y={60} size={18} mono weight={700}>w</T>
      <Box x={270} y={40} w={50} h={40} color={C.cobalt} strong />
      <T x={295} y={60} size={18} mono weight={700}>h</T>
      <T x={260} y={64} size={16} mono>,</T>
      <T x={325} y={60} size={16} mono anchor="start" weight={700}>):</T>
      <T x={352} y={60} size={12} anchor="start" color={C.cobalt}>{'← parameters'}</T>

      <Arrow x1={225} y1={148} x2={225} y2={84} color={C.muted} />
      <Arrow x1={295} y1={148} x2={295} y2={84} color={C.muted} />

      <T x={195} y={170} size={16} mono anchor="end" weight={700}>area(</T>
      <Box x={200} y={150} w={50} h={40} color={C.yellow} strong />
      <T x={225} y={170} size={18} mono weight={700}>3</T>
      <Box x={270} y={150} w={50} h={40} color={C.yellow} strong />
      <T x={295} y={170} size={18} mono weight={700}>5</T>
      <T x={260} y={174} size={16} mono>,</T>
      <T x={325} y={170} size={16} mono anchor="start" weight={700}>)</T>
      <T x={352} y={170} size={12} anchor="start" color={C.yellow}>{'← arguments'}</T>
      <T x={260} y={220} size={13} mono color={C.green} weight={700}>{'return w * h → 15 is sent back to the caller'}</T>
    </Frame>
  )
}

function ScopeBoxes() {
  return (
    <Frame label="Global and local scope diagram">
      <Box x={20} y={20} w={480} h={204} color={C.cobalt} />
      <T x={36} y={40} size={12} color={C.cobalt} anchor="start" weight={700}>GLOBAL SCOPE</T>
      <T x={36} y={80} size={16} mono anchor="start">x = 5</T>
      <Box x={200} y={52} w={284} h={118} color={C.yellow} strong />
      <T x={214} y={72} size={12} color={C.yellow} anchor="start" weight={700}>def make():  LOCAL SCOPE</T>
      <T x={214} y={104} size={15} mono anchor="start">secret = 42</T>
      <T x={214} y={132} size={12} anchor="start" color={C.green}>{'can read x here ✓'}</T>
      <T x={214} y={154} size={11} anchor="start" color={C.muted}>secret is destroyed when make() ends</T>
      <T x={260} y={200} size={14} mono color={C.red} weight={700}>{'print(secret) → NameError ✗'}</T>
    </Frame>
  )
}

function ListIndex() {
  const nums = [10, 20, 30, 40]
  return (
    <Frame label="List indexing: Python starts at 0, AP pseudocode starts at 1">
      <T x={260} y={22} size={15} mono weight={700}>nums = [10, 20, 30, 40]</T>
      <T x={92} y={62} size={12} anchor="end" color={C.cobalt} weight={700}>Python</T>
      <T x={92} y={158} size={12} anchor="end" color={C.yellow} weight={700}>AP exam</T>
      {nums.map((n, i) => {
        const x = 104 + i * 84
        return (
          <g key={n}>
            <T x={x + 38} y={62} size={16} mono color={C.cobalt} weight={700}>{i}</T>
            <Box x={x} y={80} w={76} h={56} color={i === 0 ? C.green : C.cobalt} strong={i === 0} />
            <T x={x + 38} y={109} size={22} mono weight={700}>{n}</T>
            <T x={x + 38} y={158} size={16} mono color={C.yellow} weight={700}>{i + 1}</T>
          </g>
        )
      })}
      <T x={260} y={200} size={13} mono color={C.green}>{'Python nums[0] = 10 · AP aList[1] = 10'}</T>
      <T x={260} y={222} size={11} color={C.muted}>Same first item, different index number!</T>
    </Frame>
  )
}

function ListOps() {
  const rows = [
    { op: 'nums = [3, 7]', items: [3, 7], fresh: -1 },
    { op: 'nums.append(9)', items: [3, 7, 9], fresh: 2 },
    { op: 'nums.insert(0, 1)', items: [1, 3, 7, 9], fresh: 0 },
    { op: 'nums.remove(7)', items: [1, 3, 9], fresh: -1, note: '← 7 removed by VALUE' },
  ]
  return (
    <Frame label="List operations: append, insert, remove">
      {rows.map((r, ri) => {
        const y = 20 + ri * 55
        return (
          <g key={r.op}>
            <T x={20} y={y + 17} size={13} mono anchor="start" color={ri === 0 ? C.muted : C.text}>{r.op}</T>
            {r.items.map((n, i) => (
              <g key={`${ri}-${i}`}>
                <Box x={200 + i * 48} y={y} w={42} h={34} color={i === r.fresh ? C.green : C.cobalt} strong={i === r.fresh} />
                <T x={221 + i * 48} y={y + 17} size={15} mono weight={700}>{n}</T>
              </g>
            ))}
            {r.note && <T x={200 + r.items.length * 48 + 8} y={y + 17} size={11} anchor="start" color={C.red}>{r.note}</T>}
          </g>
        )
      })}
    </Frame>
  )
}

function DictSearch() {
  const list = [3, 8, 12, 17, 23, 31, 40]
  const steps = [
    { y: 36, active: [0, 6], mid: 3, note: '17 < 23 → go right' },
    { y: 96, active: [4, 6], mid: 5, note: '31 > 23 → go left' },
    { y: 156, active: [4, 4], mid: 4, note: 'found 23 in 3 checks ✓' },
  ]
  return (
    <Frame label="Dictionary lookup and binary search diagram">
      <Box x={10} y={20} w={160} h={190} color={C.yellow} />
      <T x={90} y={40} size={13} color={C.yellow} weight={700}>{'dict  {key: value}'}</T>
      {[['"Ava"', '14'], ['"Leo"', '15'], ['"Mia"', '13']].map(([k, v], i) => (
        <g key={k}>
          <T x={60} y={78 + i * 36} size={13} mono anchor="middle">{k}</T>
          <T x={98} y={78 + i * 36} size={13} color={C.muted}>→</T>
          <T x={132} y={78 + i * 36} size={13} mono color={C.yellow} weight={700}>{v}</T>
        </g>
      ))}
      <T x={90} y={192} size={11} mono color={C.muted}>{'ages["Leo"] → 15'}</T>
      <T x={352} y={20} size={12} weight={700}>Binary search for 23 (sorted!)</T>
      {steps.map((s, si) => (
        <g key={si}>
          {list.map((n, i) => {
            const active = i >= s.active[0] && i <= s.active[1]
            const isMid = i === s.mid
            const color = isMid ? (si === 2 ? C.green : C.yellow) : C.cobalt
            return (
              <g key={`${si}-${n}`}>
                <Box x={196 + i * 46} y={s.y} w={40} h={30} color={color} strong={isMid} opacity={active ? 1 : 0.25} />
                <T x={216 + i * 46} y={s.y + 15} size={13} mono weight={700} opacity={active ? 1 : 0.3}>{n}</T>
              </g>
            )
          })}
          <T x={352} y={s.y + 44} size={11} color={si === 2 ? C.green : C.muted}>{s.note}</T>
        </g>
      ))}
      <T x={352} y={228} size={11} color={C.muted}>{'Linear: up to 7 checks · Binary: max 3'}</T>
    </Frame>
  )
}

const DIAGRAMS: Record<DiagramKey, () => ReactNode> = {
  ipo: Ipo,
  'three-blocks': ThreeBlocks,
  'binary-places': BinaryPlaces,
  'variable-boxes': VariableBoxes,
  'type-bins': TypeBins,
  'string-index': StringIndex,
  'truth-table': TruthTable,
  flowchart: Flowchart,
  'loop-cycle': LoopCycle,
  'function-machine': FunctionMachine,
  'params-return': ParamsReturn,
  'scope-boxes': ScopeBoxes,
  'list-index': ListIndex,
  'list-ops': ListOps,
  'dict-search': DictSearch,
}

export function Diagram({ name }: { name: DiagramKey }) {
  const Component = DIAGRAMS[name]
  return <Component />
}
