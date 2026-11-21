import type { ReactNode } from 'react'
import type { BioDiagramKey } from '@/lib/types'
import { Arrow, Box, C, Frame, T } from './diagram-primitives'

function CellCompare() {
  return (
    <Frame label="Prokaryotic cell without a nucleus compared with a eukaryotic cell with a nucleus">
      <T x={130} y={22} size={14} weight={700} color={C.yellow}>PROKARYOTE</T>
      <rect x={40} y={50} width={180} height={110} rx={50} fill={C.yellow} fillOpacity={0.12} stroke={C.yellow} strokeWidth={2} />
      <path d="M 90 100 C 110 80, 140 125, 165 95 C 180 80, 150 130, 110 120" fill="none" stroke={C.cobalt} strokeWidth={2.5} />
      <T x={130} y={140} size={11} color={C.cobalt}>free-floating DNA</T>
      {[[70, 80], [190, 90], [75, 130], [185, 128]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={3} fill={C.muted} />)}
      <T x={130} y={182} size={11} color={C.muted}>no nucleus · ribosomes · tiny</T>
      <T x={130} y={202} size={11} color={C.muted}>e.g. bacteria</T>

      <line x1={260} y1={40} x2={260} y2={210} stroke={C.edge} strokeWidth={2} />

      <T x={390} y={22} size={14} weight={700} color={C.green}>EUKARYOTE</T>
      <rect x={290} y={40} width={200} height={130} rx={24} fill={C.green} fillOpacity={0.12} stroke={C.green} strokeWidth={2} />
      <circle cx={390} cy={104} r={32} fill={C.cobalt} fillOpacity={0.25} stroke={C.cobalt} strokeWidth={2} />
      <T x={390} y={104} size={11} weight={700}>nucleus</T>
      <ellipse cx={322} cy={70} rx={18} ry={9} fill={C.red} fillOpacity={0.3} stroke={C.red} />
      <ellipse cx={458} cy={142} rx={18} ry={9} fill={C.red} fillOpacity={0.3} stroke={C.red} />
      <T x={458} y={124} size={9} color={C.red}>mitochondria</T>
      <T x={390} y={190} size={11} color={C.muted}>nucleus + membrane-bound organelles</T>
      <T x={390} y={210} size={11} color={C.muted}>e.g. plants, animals, fungi</T>
      <T x={260} y={230} size={11} color={C.text} weight={600}>Both have: cell membrane · cytoplasm · ribosomes · DNA</T>
    </Frame>
  )
}

function Organelles() {
  const items = [
    { name: 'Nucleus', job: 'stores DNA · control', color: C.cobalt },
    { name: 'Mitochondria', job: 'makes ATP', color: C.red },
    { name: 'Ribosome', job: 'builds proteins', color: C.yellow },
    { name: 'Chloroplast', job: 'photosynthesis (plants)', color: C.green },
    { name: 'Golgi', job: 'packages & ships', color: C.yellow },
    { name: 'Cell wall', job: 'rigid support (plants)', color: C.green },
  ]
  return (
    <Frame label="Organelles and their jobs">
      <T x={260} y={20} size={14} weight={700}>Organelle → Job (cell = factory)</T>
      {items.map((it, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const x = 20 + col * 250
        const y = 40 + row * 62
        return (
          <g key={it.name}>
            <Box x={x} y={y} w={230} h={50} color={it.color} />
            <circle cx={x + 26} cy={y + 25} r={12} fill={it.color} fillOpacity={0.4} stroke={it.color} />
            <T x={x + 48} y={y + 17} size={13} weight={700} anchor="start" color={it.color}>{it.name}</T>
            <T x={x + 48} y={y + 35} size={11} anchor="start" color={C.muted}>{it.job}</T>
          </g>
        )
      })}
      <T x={260} y={230} size={11} color={C.muted}>{'Plant-only: cell wall, chloroplasts, large central vacuole'}</T>
    </Frame>
  )
}

function Osmosis() {
  const cells = [
    { x: 90, title: 'HYPERtonic', sub: 'more solute outside', rx: 30, ry: 24, color: C.red, out: true, result: 'cell SHRINKS' },
    { x: 260, title: 'ISOtonic', sub: 'equal solute', rx: 42, ry: 34, color: C.green, out: null, result: 'no net change' },
    { x: 430, title: 'HYPOtonic', sub: 'less solute outside', rx: 54, ry: 44, color: C.cobalt, out: false, result: 'cell SWELLS' },
  ]
  return (
    <Frame label="Osmosis in hypertonic, isotonic, and hypotonic solutions">
      {cells.map((c) => (
        <g key={c.title}>
          <T x={c.x} y={22} size={13} weight={700} color={c.color}>{c.title}</T>
          <T x={c.x} y={40} size={10} color={C.muted}>{c.sub}</T>
          <ellipse cx={c.x} cy={120} rx={c.rx} ry={c.ry} fill={c.color} fillOpacity={0.2} stroke={c.color} strokeWidth={2} />
          {c.out === true && (
            <>
              <Arrow x1={c.x + 22} y1={120} x2={c.x + 62} y2={120} color={C.cobalt} />
              <Arrow x1={c.x - 22} y1={120} x2={c.x - 62} y2={120} color={C.cobalt} />
            </>
          )}
          {c.out === false && (
            <>
              <Arrow x1={c.x + 80} y1={70} x2={c.x + 42} y2={92} color={C.cobalt} />
              <Arrow x1={c.x - 80} y1={70} x2={c.x - 42} y2={92} color={C.cobalt} />
            </>
          )}
          {c.out === null && (
            <>
              <Arrow x1={c.x + 50} y1={110} x2={c.x + 72} y2={110} color={C.cobalt} />
              <Arrow x1={c.x + 72} y1={130} x2={c.x + 50} y2={130} color={C.cobalt} />
            </>
          )}
          <T x={c.x} y={188} size={12} weight={700}>{c.result}</T>
        </g>
      ))}
      <T x={260} y={222} size={11} color={C.cobalt}>{'Water (blue arrows) moves toward MORE solute'}</T>
    </Frame>
  )
}

function Macromolecules() {
  const items = [
    { name: 'Carbohydrates', el: 'CHO', mono: 'monosaccharide', ex: 'glucose · quick energy', color: C.yellow },
    { name: 'Lipids', el: 'CHO', mono: 'glycerol + fatty acids', ex: 'fats · long-term energy', color: C.green },
    { name: 'Proteins', el: 'CHON', mono: 'amino acids', ex: 'enzymes · structure', color: C.red },
    { name: 'Nucleic acids', el: 'CHONP', mono: 'nucleotides', ex: 'DNA / RNA · genetic info', color: C.cobalt },
  ]
  return (
    <Frame label="The four macromolecules with their elements and monomers">
      <T x={260} y={20} size={14} weight={700}>The 4 Macromolecules</T>
      {items.map((m, i) => {
        const x = 12 + i * 126
        return (
          <g key={m.name}>
            <Box x={x} y={38} w={118} h={172} color={m.color} />
            <T x={x + 59} y={58} size={12} weight={700} color={m.color}>{m.name}</T>
            <Box x={x + 19} y={74} w={80} h={36} color={m.color} strong />
            <T x={x + 59} y={92} size={17} mono weight={700}>{m.el}</T>
            <T x={x + 59} y={128} size={9} color={C.muted}>monomer</T>
            <T x={x + 59} y={144} size={10} weight={600}>{m.mono}</T>
            <T x={x + 59} y={180} size={10} color={C.muted}>{m.ex}</T>
          </g>
        )
      })}
      <T x={260} y={228} size={11} color={C.muted}>{'N → protein (or nucleic acid) · P → nucleic acid'}</T>
    </Frame>
  )
}

function ActivationEnergy() {
  return (
    <Frame label="Energy diagram showing an enzyme lowers activation energy">
      <line x1={50} y1={30} x2={50} y2={200} stroke={C.muted} strokeWidth={1.5} />
      <line x1={50} y1={200} x2={500} y2={200} stroke={C.muted} strokeWidth={1.5} />
      <T x={30} y={115} size={11} color={C.muted}>Energy</T>
      <T x={275} y={218} size={11} color={C.muted}>{'Reaction progress →'}</T>
      <path d="M 60 150 C 140 150, 180 40, 260 40 C 340 40, 380 175, 480 175" fill="none" stroke={C.red} strokeWidth={2.5} />
      <path d="M 60 150 C 140 150, 190 100, 260 100 C 330 100, 380 175, 480 175" fill="none" stroke={C.green} strokeWidth={2.5} strokeDasharray="7 4" />
      <line x1={140} y1={150} x2={140} y2={44} stroke={C.red} strokeDasharray="3 3" />
      <Arrow x1={140} y1={148} x2={140} y2={46} color={C.red} />
      <T x={146} y={70} size={12} anchor="start" color={C.red} weight={700}>{'Eₐ (no enzyme)'}</T>
      <Arrow x1={200} y1={148} x2={200} y2={104} color={C.green} />
      <T x={206} y={128} size={12} anchor="start" color={C.green} weight={700}>{'Eₐ (enzyme)'}</T>
      <T x={78} y={140} size={11} color={C.text} anchor="start">reactants</T>
      <T x={470} y={162} size={11} color={C.text} anchor="end">products</T>
      <T x={390} y={60} size={11} color={C.muted}>{'Enzyme lowers the hill,'}</T>
      <T x={390} y={76} size={11} color={C.muted}>{'not the start or end'}</T>
    </Frame>
  )
}

function EnzymeCurve() {
  return (
    <Frame label="Enzyme activity curves for temperature and pH with optimum peaks">
      {[{ ox: 30, title: 'Temperature', opt: '37°C (human)', color: C.red, path: 'M 40 190 C 90 180, 130 60, 160 60 C 180 60, 190 150, 215 190' },
        { ox: 280, title: 'pH', opt: 'pepsin 2 · amylase 7', color: C.cobalt, path: 'M 290 190 C 310 120, 330 60, 350 60 C 370 60, 380 190, 395 190 M 395 190 C 420 120, 440 70, 460 70 C 480 70, 490 160, 505 190' },
      ].map((g) => (
        <g key={g.title}>
          <line x1={g.ox} y1={40} x2={g.ox} y2={190} stroke={C.muted} />
          <line x1={g.ox} y1={190} x2={g.ox + 220} y2={190} stroke={C.muted} />
          <T x={g.ox + 110} y={22} size={13} weight={700} color={g.color}>{`Activity vs ${g.title}`}</T>
          <path d={g.path} fill="none" stroke={g.color} strokeWidth={2.5} />
          <T x={g.ox + 110} y={210} size={11} color={C.muted}>{`optimum: ${g.opt}`}</T>
        </g>
      ))}
      <T x={160} y={48} size={10} color={C.green}>optimum</T>
      <T x={205} y={120} size={10} color={C.red} anchor="start">denatured</T>
      <T x={260} y={232} size={11} color={C.text} weight={600}>{'Past the optimum → active site changes shape → DENATURED'}</T>
    </Frame>
  )
}

function AtpCycle() {
  return (
    <Frame label="ATP and ADP cycle releasing and storing energy">
      <Box x={40} y={80} w={150} h={70} color={C.green} strong />
      <T x={115} y={104} size={20} mono weight={700}>ATP</T>
      <T x={115} y={130} size={11} color={C.muted}>{'A–P–P–P (3 phosphates)'}</T>
      <Box x={330} y={80} w={150} h={70} color={C.yellow} strong />
      <T x={405} y={104} size={18} mono weight={700}>{'ADP + Pᵢ'}</T>
      <T x={405} y={130} size={11} color={C.muted}>{'A–P–P + free phosphate'}</T>
      <path d="M 190 90 C 240 40, 280 40, 328 90" fill="none" stroke={C.red} strokeWidth={2.5} />
      <polygon points="330,92 320,88 326,80" fill={C.red} />
      <T x={260} y={36} size={12} color={C.red} weight={700}>{'energy RELEASED (used by cell)'}</T>
      <path d="M 330 140 C 280 190, 240 190, 192 140" fill="none" stroke={C.cobalt} strokeWidth={2.5} />
      <polygon points="190,138 200,142 194,150" fill={C.cobalt} />
      <T x={260} y={198} size={12} color={C.cobalt} weight={700}>{'energy STORED (from food / respiration)'}</T>
      <T x={260} y={228} size={11} color={C.muted}>{'ATP ⇌ ADP + Pᵢ — like a rechargeable battery'}</T>
    </Frame>
  )
}

function Photosynthesis() {
  return (
    <Frame label="Photosynthesis inputs and outputs in the chloroplast">
      <T x={260} y={20} size={14} weight={700} color={C.green}>{'Photosynthesis (in the CHLOROPLAST)'}</T>
      <ellipse cx={260} cy={115} rx={90} ry={50} fill={C.green} fillOpacity={0.18} stroke={C.green} strokeWidth={2} />
      <T x={260} y={108} size={13} weight={700}>chloroplast</T>
      <T x={260} y={126} size={10} color={C.muted}>{'light rxns → Calvin cycle'}</T>
      {[['6CO₂', 50], ['6H₂O', 115], ['light', 180]].map(([l, y]) => (
        <g key={l as string}>
          <T x={70} y={y as number} size={14} mono weight={700} color={l === 'light' ? C.yellow : C.cobalt}>{l}</T>
          <Arrow x1={105} y1={y as number} x2={170} y2={115} color={l === 'light' ? C.yellow : C.cobalt} />
        </g>
      ))}
      {[['C₆H₁₂O₆', 85], ['6O₂', 145]].map(([l, y]) => (
        <g key={l as string}>
          <Arrow x1={350} y1={115} x2={405} y2={y as number} color={C.green} />
          <T x={455} y={y as number} size={14} mono weight={700} color={C.green}>{l}</T>
        </g>
      ))}
      <T x={260} y={208} size={12} mono>{'6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂'}</T>
      <T x={260} y={230} size={11} color={C.muted}>{'Light energy → chemical energy (glucose)'}</T>
    </Frame>
  )
}

function Respiration() {
  return (
    <Frame label="Aerobic respiration versus anaerobic fermentation pathways">
      <Box x={200} y={14} w={120} h={40} color={C.yellow} strong />
      <T x={260} y={34} size={12} weight={700}>{'Glycolysis → 2 ATP'}</T>
      <Arrow x1={230} y1={56} x2={130} y2={92} color={C.green} />
      <Arrow x1={290} y1={56} x2={390} y2={92} color={C.red} />
      <T x={150} y={68} size={11} color={C.green} anchor="end">{'O₂ present'}</T>
      <T x={372} y={68} size={11} color={C.red} anchor="start">{'no O₂'}</T>
      <Box x={20} y={94} w={230} h={100} color={C.green} />
      <T x={135} y={114} size={13} weight={700} color={C.green}>AEROBIC (mitochondria)</T>
      <T x={135} y={136} size={11}>{'Krebs cycle → ETC'}</T>
      <T x={135} y={158} size={20} mono weight={700} color={C.green}>~36–38 ATP</T>
      <T x={135} y={180} size={10} color={C.muted}>{'+ CO₂ + H₂O'}</T>
      <Box x={270} y={94} w={230} h={100} color={C.red} />
      <T x={385} y={114} size={13} weight={700} color={C.red}>ANAEROBIC (fermentation)</T>
      <T x={385} y={136} size={11}>{'muscles → lactic acid'}</T>
      <T x={385} y={154} size={11}>{'yeast → ethanol + CO₂'}</T>
      <T x={385} y={178} size={18} mono weight={700} color={C.red}>2 ATP total</T>
      <T x={260} y={216} size={12} mono>{'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP'}</T>
      <T x={260} y={234} size={10} color={C.muted}>{'Respiration is photosynthesis in reverse'}</T>
    </Frame>
  )
}

function DnaPairs() {
  const top = ['A', 'T', 'G', 'C', 'G', 'A', 'T']
  const pair: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' }
  const col = (b: string) => (b === 'A' || b === 'T' ? C.cobalt : C.green)
  return (
    <Frame label="DNA base pairing A with T using two bonds and G with C using three bonds">
      <T x={260} y={20} size={14} weight={700}>{'DNA base pairing'}</T>
      <line x1={50} y1={60} x2={470} y2={60} stroke={C.yellow} strokeWidth={4} />
      <line x1={50} y1={150} x2={470} y2={150} stroke={C.yellow} strokeWidth={4} />
      <T x={30} y={60} size={10} mono color={C.yellow}>{"5'"}</T>
      <T x={30} y={150} size={10} mono color={C.yellow}>{"3'"}</T>
      {top.map((b, i) => {
        const x = 75 + i * 62
        const p = pair[b]
        const triple = b === 'G' || b === 'C'
        return (
          <g key={i}>
            <Box x={x - 18} y={64} w={36} h={28} color={col(b)} strong />
            <T x={x} y={78} mono weight={700}>{b}</T>
            {(triple ? [-6, 0, 6] : [-4, 4]).map((d) => (
              <line key={d} x1={x + d} y1={94} x2={x + d} y2={116} stroke={C.muted} strokeDasharray="2 2" />
            ))}
            <Box x={x - 18} y={118} w={36} h={28} color={col(p)} strong />
            <T x={x} y={132} mono weight={700}>{p}</T>
          </g>
        )
      })}
      <T x={150} y={182} size={14} mono weight={700} color={C.cobalt}>{'A = T (2 bonds)'}</T>
      <T x={370} y={182} size={14} mono weight={700} color={C.green}>{'G ≡ C (3 bonds)'}</T>
      <T x={260} y={214} size={11} color={C.muted}>{'Replication is semi-conservative: each new DNA = 1 old + 1 new strand'}</T>
    </Frame>
  )
}

function CentralDogma() {
  return (
    <Frame label="Central dogma: DNA transcribed to mRNA in nucleus, translated to protein at ribosome">
      {[
        { x: 20, title: 'DNA', seq: 'TAC GGA', color: C.cobalt, where: 'nucleus' },
        { x: 190, title: 'mRNA', seq: 'AUG CCU', color: C.yellow, where: 'nucleus → cytoplasm' },
        { x: 360, title: 'Protein', seq: 'Met – Pro', color: C.green, where: 'ribosome' },
      ].map((b) => (
        <g key={b.title}>
          <Box x={b.x} y={50} w={140} h={90} color={b.color} />
          <T x={b.x + 70} y={72} weight={700} color={b.color}>{b.title}</T>
          <T x={b.x + 70} y={100} size={16} mono weight={700}>{b.seq}</T>
          <T x={b.x + 70} y={126} size={10} color={C.muted}>{b.where}</T>
        </g>
      ))}
      <Arrow x1={162} y1={95} x2={188} y2={95} color={C.yellow} />
      <Arrow x1={332} y1={95} x2={358} y2={95} color={C.green} />
      <T x={175} y={36} size={11} color={C.yellow} weight={700}>TRANSCRIPTION</T>
      <T x={345} y={36} size={11} color={C.green} weight={700}>TRANSLATION</T>
      <T x={260} y={170} size={12}>{'RNA uses U instead of T  ·  1 codon = 3 bases = 1 amino acid'}</T>
      <T x={260} y={194} size={12} mono color={C.green}>{'Start codon AUG = Met · Stop: UAA UAG UGA'}</T>
      <T x={260} y={220} size={11} color={C.muted}>{'tRNA anticodon matches the mRNA codon'}</T>
    </Frame>
  )
}

function Mutations() {
  const rows = [
    { label: 'Original', seq: ['THE', 'CAT', 'ATE', 'RAT'], color: C.cobalt, note: 'normal reading frame' },
    { label: 'Point (substitution)', seq: ['THE', 'BAT', 'ATE', 'RAT'], color: C.yellow, note: '1 base swapped → 1 codon changes', hi: [1] },
    { label: 'Frameshift (deletion)', seq: ['THE', 'ATA', 'TER', 'AT_'], color: C.red, note: 'every codon after it changes', hi: [1, 2, 3] },
  ]
  return (
    <Frame label="Point mutation compared with frameshift mutation">
      {rows.map((r, ri) => (
        <g key={r.label}>
          <T x={20} y={36 + ri * 66} size={12} weight={700} anchor="start" color={r.color}>{r.label}</T>
          {r.seq.map((c, i) => {
            const hot = r.hi?.includes(i)
            return (
              <g key={i}>
                <Box x={180 + i * 66} y={20 + ri * 66} w={58} h={34} color={hot ? r.color : C.cobalt} strong={hot} />
                <T x={209 + i * 66} y={37 + ri * 66} mono weight={700}>{c}</T>
              </g>
            )
          })}
          <T x={20} y={56 + ri * 66} size={10} anchor="start" color={C.muted}>{r.note}</T>
        </g>
      ))}
      <T x={260} y={226} size={11} color={C.text} weight={600}>{'Insertions/deletions (not by 3) shift the frame → usually worse'}</T>
    </Frame>
  )
}

function MitosisMeiosis() {
  const cell = (cx: number, cy: number, r: number, color: string, label: string) => (
    <g key={`${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={2} />
      <T x={cx} y={cy} size={12} mono weight={700}>{label}</T>
    </g>
  )
  return (
    <Frame label="Mitosis produces two identical diploid cells; meiosis produces four haploid gametes">
      <T x={130} y={18} size={13} weight={700} color={C.cobalt}>{'MITOSIS (body cells)'}</T>
      {cell(130, 60, 24, C.cobalt, '2n')}
      <Arrow x1={118} y1={86} x2={88} y2={128} color={C.cobalt} />
      <Arrow x1={142} y1={86} x2={172} y2={128} color={C.cobalt} />
      {cell(80, 150, 22, C.cobalt, '2n')}
      {cell(180, 150, 22, C.cobalt, '2n')}
      <T x={130} y={196} size={11} color={C.muted}>{'1 division · 2 IDENTICAL cells'}</T>
      <T x={130} y={214} size={11} color={C.muted}>growth · repair</T>

      <line x1={260} y1={30} x2={260} y2={220} stroke={C.edge} strokeWidth={2} />

      <T x={390} y={18} size={13} weight={700} color={C.green}>{'MEIOSIS (gametes)'}</T>
      {cell(390, 52, 20, C.green, '2n')}
      <Arrow x1={380} y1={73} x2={350} y2={96} color={C.green} />
      <Arrow x1={400} y1={73} x2={430} y2={96} color={C.green} />
      {cell(340, 110, 16, C.green, 'n')}
      {cell(440, 110, 16, C.green, 'n')}
      {[300, 360, 420, 480].map((x, i) => (
        <g key={x}>
          <Arrow x1={i < 2 ? 340 : 440} y1={127} x2={x} y2={146} color={C.green} />
          {cell(x, 160, 13, C.yellow, 'n')}
        </g>
      ))}
      <T x={390} y={196} size={11} color={C.muted}>{'2 divisions · 4 UNIQUE cells'}</T>
      <T x={390} y={214} size={11} color={C.muted}>{'crossing over → variation'}</T>
    </Frame>
  )
}

function Punnett() {
  const cells = [['BB', 'Bb'], ['Bb', 'bb']]
  return (
    <Frame label="Punnett square for Bb crossed with Bb giving a 3 to 1 ratio">
      <T x={150} y={20} size={14} weight={700}>{'Bb × Bb'}</T>
      <T x={95} y={50} size={16} mono weight={700} color={C.cobalt}>B</T>
      <T x={185} y={50} size={16} mono weight={700} color={C.cobalt}>b</T>
      <T x={38} y={100} size={16} mono weight={700} color={C.yellow}>B</T>
      <T x={38} y={180} size={16} mono weight={700} color={C.yellow}>b</T>
      {cells.map((row, r) => row.map((g, c) => {
        const rec = g === 'bb'
        return (
          <g key={`${r}${c}`}>
            <Box x={55 + c * 90} y={62 + r * 80} w={84} h={74} color={rec ? C.red : C.green} strong />
            <T x={97 + c * 90} y={99 + r * 80} size={20} mono weight={700}>{g}</T>
          </g>
        )
      }))}
      <Box x={290} y={50} w={210} h={60} color={C.green} />
      <T x={395} y={70} size={12} weight={700} color={C.green}>Genotype ratio</T>
      <T x={395} y={92} size={16} mono weight={700}>{'1 BB : 2 Bb : 1 bb'}</T>
      <Box x={290} y={124} w={210} h={60} color={C.cobalt} />
      <T x={395} y={144} size={12} weight={700} color={C.cobalt}>Phenotype ratio</T>
      <T x={395} y={166} size={16} mono weight={700}>{'3 dominant : 1 recessive'}</T>
      <T x={395} y={208} size={11} color={C.muted}>{'Each box = 25% chance'}</T>
    </Frame>
  )
}

function NonMendelian() {
  return (
    <Frame label="Incomplete dominance, codominance, and sex-linked inheritance">
      <Box x={10} y={20} w={160} h={190} color={C.red} />
      <T x={90} y={40} size={12} weight={700} color={C.red}>INCOMPLETE</T>
      <circle cx={55} cy={80} r={16} fill={C.red} />
      <T x={90} y={80} size={14}>×</T>
      <circle cx={125} cy={80} r={16} fill="#F9FAFB" />
      <Arrow x1={90} y1={100} x2={90} y2={124} />
      <circle cx={90} cy={146} r={18} fill="#F472B6" />
      <T x={90} y={182} size={11}>{'red × white → PINK'}</T>
      <T x={90} y={198} size={10} color={C.muted}>blend</T>

      <Box x={180} y={20} w={160} h={190} color={C.yellow} />
      <T x={260} y={40} size={12} weight={700} color={C.yellow}>CODOMINANCE</T>
      <circle cx={260} cy={110} r={34} fill="#F9FAFB" />
      {[[244, 96], [272, 100], [254, 124], [278, 124], [262, 86]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={6} fill={C.red} />)}
      <T x={260} y={170} size={11}>{'both show fully (spots)'}</T>
      <T x={260} y={190} size={10} color={C.muted} mono>{'AB blood type'}</T>

      <Box x={350} y={20} w={160} h={190} color={C.cobalt} />
      <T x={430} y={40} size={12} weight={700} color={C.cobalt}>SEX-LINKED</T>
      <T x={430} y={76} size={16} mono weight={700}>{'XᴴXʰ'}</T>
      <T x={430} y={96} size={10} color={C.muted}>carrier female</T>
      <T x={430} y={130} size={16} mono weight={700} color={C.red}>{'XʰY'}</T>
      <T x={430} y={150} size={10} color={C.muted}>affected male</T>
      <T x={430} y={182} size={11}>{'genes on X chromosome'}</T>
      <T x={430} y={198} size={10} color={C.muted}>males need only 1 copy</T>
      <T x={260} y={230} size={11} color={C.muted}>{'Blend = incomplete · Both = co · On X = sex-linked'}</T>
    </Frame>
  )
}

export const BIO_DIAGRAMS: Record<BioDiagramKey, () => ReactNode> = {
  'cell-compare': CellCompare,
  organelles: Organelles,
  osmosis: Osmosis,
  macromolecules: Macromolecules,
  'activation-energy': ActivationEnergy,
  'enzyme-curve': EnzymeCurve,
  'atp-cycle': AtpCycle,
  photosynthesis: Photosynthesis,
  respiration: Respiration,
  'dna-pairs': DnaPairs,
  'central-dogma': CentralDogma,
  mutations: Mutations,
  'mitosis-meiosis': MitosisMeiosis,
  punnett: Punnett,
  'non-mendelian': NonMendelian,
}
