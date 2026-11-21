
import type { Unit, Lesson, Question, Concept } from '@/lib/types'

// --------------------------------------------------
// QUESTION BUILDER
// --------------------------------------------------

const q = (
  id: string,
  prompt: string,
  choices: string[],
  answer: number,
  explanation: string,
  fix: string,
  code?: string,
): Question => ({
  id,
  prompt,
  choices,
  answer,
  explanation,
  fix,
  ...(code ? { code } : {}),
})

// --------------------------------------------------
// LESSON BUILDER
// --------------------------------------------------

type LessonData = {
  id: string
  number: string
  title: string
  hook: string
  eli12: string
  diagram: Lesson['diagram']
  diagramCaption: string
  concepts: Concept[]
  trap: Lesson['trap']
  example: Lesson['example']
  cheatSheet: string[]
  quiz: Question[]
}

const makeLesson = (data: LessonData): Lesson => ({
  ...data,
  flashcards: data.concepts.map((c) => ({
    front: c.term,
    back: c.detail,
    ...(c.symbol ? { code: c.symbol } : {}),
  })),
})

// ==================================================
// UNIT 1 — CELL STRUCTURES & PROCESSES
// ==================================================

const u1l1 = makeLesson({
  id: 'bio-u1-l1',
  number: '1.1',
  title: 'Prokaryotic vs. Eukaryotic Cells',
  hook: 'All living things are made of cells, but not every cell is built the same way. The biggest difference is whether it has a nucleus.',
  eli12: 'Think of a nucleus as a locked office where DNA is kept. Eukaryotic cells have that office. Prokaryotic cells keep their DNA in an area of the cell without a nucleus.',
  diagram: 'cell-compare',
  diagramCaption: 'Compare the DNA location, nucleus, and internal structures of prokaryotic and eukaryotic cells.',
  concepts: [
    { term: 'Cell', color: 'cobalt', detail: 'The basic structural and functional unit of life.' },
    { term: 'Prokaryote', color: 'green', detail: 'An organism whose cells lack a nucleus and membrane-bound organelles. Bacteria and Archaea are prokaryotes.' },
    { term: 'Eukaryote', color: 'cobalt', detail: 'An organism whose cells contain a nucleus and membrane-bound organelles. Animals, plants, fungi, and protists are eukaryotes.' },
    { term: 'Nucleoid', color: 'yellow', detail: 'The region of a prokaryotic cell where its DNA is located.' },
    { term: 'Cell Theory', color: 'green', detail: 'All living things are made of cells, cells are the basic unit of life, and cells come from preexisting cells.' },
  ],
  trap: {
    title: 'Bacteria do NOT have a nucleus',
    detail: 'Bacteria contain DNA, but it is not enclosed inside a nucleus. Having DNA does not automatically mean a cell is eukaryotic.',
  },
  example: {
    problem: 'A scientist observes a cell with DNA, ribosomes, and a cell membrane but no nucleus. What type of cell is it?',
    steps: [
      'Check whether the cell has a nucleus.',
      'The cell has DNA, but no nucleus.',
      'Cells without a nucleus are prokaryotic.',
    ],
    answer: 'Prokaryotic cell.',
  },
  cheatSheet: [
    'Prokaryote = NO nucleus',
    'Eukaryote = HAS a nucleus',
    'Both have DNA, ribosomes, cytoplasm, and a cell membrane',
    'Bacteria and Archaea = prokaryotes',
    'Plants, animals, fungi, and protists = eukaryotes',
  ],
  quiz: [
    q('q1', 'Which structure is absent in prokaryotic cells?', ['Cell membrane', 'Cytoplasm', 'Nucleus', 'Ribosomes'], 2, 'Prokaryotic cells do not have a membrane-bound nucleus.', 'No nucleus = prokaryote.'),
    q('q2', 'Which organism is prokaryotic?', ['Oak tree', 'Bacterium', 'Mushroom', 'Human'], 1, 'Bacteria are prokaryotes because their cells lack a nucleus.', 'Bacteria = prokaryotes.'),
    q('q3', 'Which structure is found in BOTH prokaryotic and eukaryotic cells?', ['Nucleus', 'Mitochondrion', 'Ribosome', 'Golgi apparatus'], 2, 'Both cell types contain ribosomes, which make proteins.', 'Both have ribosomes.'),
    q('q4', 'Where is the DNA of a typical prokaryotic cell located?', ['Inside a nucleus', 'In the nucleoid region', 'Inside the Golgi apparatus', 'Outside the cell'], 1, 'Prokaryotic DNA is found in the nucleoid region.', 'Nucleoid = DNA region without a nucleus.'),
    q('q5', 'Which statement is part of cell theory?', ['Only animals are made of cells', 'Cells appear from nonliving matter', 'All living things are made of cells', 'All cells have a nucleus'], 2, 'Cell theory states that all living things are made of cells.', 'Remember the three parts of cell theory.'),
  ],
})

const u1l2 = makeLesson({
  id: 'bio-u1-l2',
  number: '1.2',
  title: 'Cell Organelles and Their Functions',
  hook: 'A cell works like a small factory. Different organelles have different jobs that keep the cell alive.',
  eli12: 'The nucleus stores instructions, mitochondria release usable energy, and ribosomes build proteins. Each organelle has a specific job.',
  diagram: 'organelles',
  diagramCaption: 'Identify the main organelles and connect each structure to its job.',
  concepts: [
    { term: 'Nucleus', symbol: 'DNA', color: 'cobalt', detail: 'Contains most of the cell DNA and controls cell activities by regulating gene expression.' },
    { term: 'Mitochondrion', symbol: 'ATP', color: 'green', detail: 'Site of most cellular respiration in eukaryotic cells; produces much of the cell ATP.' },
    { term: 'Ribosome', symbol: 'Protein', color: 'yellow', detail: 'Builds proteins by joining amino acids according to genetic instructions.' },
    { term: 'Endoplasmic Reticulum', symbol: 'ER', color: 'cobalt', detail: 'Rough ER has ribosomes and helps make and process proteins. Smooth ER makes lipids and helps with detoxification.' },
    { term: 'Golgi Apparatus', color: 'green', detail: 'Modifies, sorts, and packages proteins and lipids for transport.' },
    { term: 'Lysosome', color: 'red', detail: 'Contains digestive enzymes that break down waste and worn-out cell parts.' },
    { term: 'Chloroplast', symbol: 'Photosynthesis', color: 'green', detail: 'In plant cells and some other organisms, captures light energy to make sugars through photosynthesis.' },
    { term: 'Cell Wall', color: 'yellow', detail: 'A rigid outer layer that supports and protects plant cells. It is outside the plasma membrane.' },
    { term: 'Vacuole', color: 'cobalt', detail: 'Stores water, nutrients, and waste. Plant cells often have a large central vacuole.' },
  ],
  trap: {
    title: 'Mitochondria vs. chloroplasts',
    detail: 'Mitochondria are involved in cellular respiration. Chloroplasts carry out photosynthesis. They are not interchangeable.',
  },
  example: {
    problem: 'A cell cannot produce enough proteins. Which organelle should be investigated first?',
    steps: [
      'Proteins are made from amino acids.',
      'Ribosomes join amino acids to make proteins.',
      'Check whether the ribosomes are functioning correctly.',
    ],
    answer: 'Ribosomes.',
  },
  cheatSheet: [
    'Nucleus = DNA and control',
    'Ribosome = protein production',
    'Mitochondria = cellular respiration and ATP',
    'Chloroplast = photosynthesis',
    'Golgi = modifies, sorts, packages',
    'Rough ER = proteins; Smooth ER = lipids',
    'Lysosome = digestion and recycling',
    'Vacuole = storage',
    'Cell wall = support and protection',
  ],
  quiz: [
    q('q1', 'Which organelle contains most of a eukaryotic cell’s DNA?', ['Ribosome', 'Nucleus', 'Golgi apparatus', 'Lysosome'], 1, 'The nucleus stores most of the genetic information in a eukaryotic cell.', 'Nucleus = DNA.'),
    q('q2', 'Which organelle makes proteins?', ['Ribosome', 'Mitochondrion', 'Vacuole', 'Chloroplast'], 0, 'Ribosomes assemble amino acids into proteins.', 'Ribosome = protein factory.'),
    q('q3', 'Which organelle modifies and packages proteins?', ['Nucleus', 'Golgi apparatus', 'Cell wall', 'Lysosome'], 1, 'The Golgi apparatus sorts and packages proteins for delivery.', 'Golgi = packaging center.'),
    q('q4', 'Which organelle performs photosynthesis?', ['Mitochondrion', 'Ribosome', 'Chloroplast', 'Nucleus'], 2, 'Chloroplasts contain chlorophyll and capture light energy.', 'Chloroplast = photosynthesis.'),
    q('q5', 'What is a major function of the lysosome?', ['Making DNA', 'Breaking down waste', 'Capturing sunlight', 'Storing genetic instructions'], 1, 'Lysosomes use digestive enzymes to break down materials.', 'Lysosome = cellular digestion.'),
  ],
})

const u1l3 = makeLesson({
  id: 'bio-u1-l3',
  number: '1.3',
  title: 'Plasma Membrane, Diffusion and Osmosis',
  hook: 'Cells need to control what enters and leaves. The plasma membrane acts as a selective barrier.',
  eli12: 'Imagine a security gate. Some substances can pass through, while others need help or cannot pass. Water also moves across membranes to balance concentrations.',
  diagram: 'osmosis',
  diagramCaption: 'Water moves across a selectively permeable membrane toward the side with the higher solute concentration.',
  concepts: [
    { term: 'Plasma Membrane', color: 'cobalt', detail: 'A selectively permeable phospholipid bilayer that controls movement into and out of the cell.' },
    { term: 'Selective Permeability', color: 'green', detail: 'The ability of a membrane to allow certain substances through while limiting others.' },
    { term: 'Diffusion', color: 'yellow', detail: 'The net movement of particles from an area of higher concentration to lower concentration.' },
    { term: 'Osmosis', symbol: 'H₂O', color: 'cobalt', detail: 'The diffusion of water across a selectively permeable membrane.' },
    { term: 'Hypertonic', color: 'red', detail: 'A solution with a higher solute concentration than the cell. Water tends to leave the cell.' },
    { term: 'Hypotonic', color: 'green', detail: 'A solution with a lower solute concentration than the cell. Water tends to enter the cell.' },
    { term: 'Isotonic', color: 'yellow', detail: 'A solution with the same effective solute concentration as the cell. There is no net water movement.' },
    { term: 'Active Transport', color: 'red', detail: 'Movement of substances against their concentration gradient using energy, often ATP.' },
  ],
  trap: {
    title: 'Water moves toward MORE solute',
    detail: 'In a hypertonic solution, water leaves the cell. In a hypotonic solution, water enters the cell. Isotonic means no net water movement, not that water stops moving.',
  },
  example: {
    problem: 'A cell is placed in a solution with more dissolved salt outside than inside. Which way does water move?',
    steps: [
      'The outside solution has a higher solute concentration.',
      'The outside solution is hypertonic to the cell.',
      'Water moves out of the cell toward the higher solute concentration.',
    ],
    answer: 'Water moves out of the cell. The cell may shrink.',
  },
  cheatSheet: [
    'Diffusion: high concentration → low concentration',
    'Osmosis = diffusion of water',
    'Hypertonic: water OUT, cell shrinks',
    'Hypotonic: water IN, cell swells',
    'Isotonic: no NET water movement',
    'Passive transport does not require cellular energy',
    'Active transport uses energy to move against a gradient',
  ],
  quiz: [
    q('q1', 'What is osmosis?', ['Movement of proteins', 'Diffusion of water across a selectively permeable membrane', 'Movement of salt using ATP', 'Cell division'], 1, 'Osmosis is the movement of water across a selectively permeable membrane.', 'Osmosis = water diffusion.'),
    q('q2', 'A cell placed in a hypertonic solution will usually:', ['Gain water', 'Lose water', 'Stay exactly the same', 'Begin photosynthesis'], 1, 'The surrounding solution has more solute, so water tends to leave the cell.', 'Hypertonic = water leaves.'),
    q('q3', 'What happens in an isotonic solution?', ['Water only enters', 'Water only leaves', 'There is no net water movement', 'The membrane disappears'], 2, 'Water moves in both directions at equal rates, producing no net change.', 'Isotonic = balanced net movement.'),
    q('q4', 'Which process requires ATP to move substances against a concentration gradient?', ['Osmosis', 'Simple diffusion', 'Active transport', 'Facilitated diffusion'], 2, 'Active transport uses energy to move substances against their gradient.', 'Against the gradient = active transport.'),
    q('q5', 'A cell is placed in a hypotonic solution. What is most likely to happen?', ['Water enters the cell', 'Water leaves the cell', 'No net water movement', 'The cell loses all its DNA'], 0, 'The solution has less solute outside, so water tends to enter the cell.', 'Hypotonic = water enters.'),
  ],
})

// ==================================================
// UNIT 2 — BIOCHEMICAL INTERACTIONS
// ==================================================

const u2l1 = makeLesson({
  id: 'bio-u2-l1',
  number: '2.1',
  title: 'The Four Biological Macromolecules',
  hook: 'Living things are built from four major groups of large biological molecules. Each group has a different job.',
  eli12: 'Carbohydrates are a quick energy source, lipids store energy, proteins do many cell jobs, and nucleic acids hold genetic instructions.',
  diagram: 'macromolecules',
  diagramCaption: 'Compare the four macromolecule groups by their elements, building blocks, and functions.',
  concepts: [
    { term: 'Carbohydrates', symbol: 'CHO', color: 'cobalt', detail: 'Made mainly of carbon, hydrogen, and oxygen. They provide quick energy and can also provide structural support. Their building blocks are monosaccharides.' },
    { term: 'Lipids', symbol: 'CHO', color: 'yellow', detail: 'Made mainly of carbon, hydrogen, and oxygen. They store long-term energy, form cell membranes, and provide insulation. Many are built from glycerol and fatty acids.' },
    { term: 'Proteins', symbol: 'CHON', color: 'green', detail: 'Contain carbon, hydrogen, oxygen, and nitrogen. They are made of amino acids and function as enzymes, transporters, structures, and more.' },
    { term: 'Nucleic Acids', symbol: 'CHONP', color: 'cobalt', detail: 'Contain carbon, hydrogen, oxygen, nitrogen, and phosphorus. DNA and RNA are made of nucleotides and store or help use genetic information.' },
    { term: 'Monomer', color: 'yellow', detail: 'A small molecular building block that can join with others to form a larger molecule.' },
    { term: 'Polymer', color: 'green', detail: 'A large molecule made from many repeating or linked smaller units.' },
  ],
  trap: {
    title: 'Know the element patterns',
    detail: 'Carbohydrates and most lipids contain CHO. Proteins contain CHON. Nucleic acids contain CHONP. These are common classroom patterns, not rules that every molecule follows without exception.',
  },
  example: {
    problem: 'A molecule contains carbon, hydrogen, oxygen, nitrogen, and phosphorus and stores genetic information. Identify it.',
    steps: [
      'Look for the element pattern CHONP.',
      'Connect genetic information with DNA or RNA.',
      'DNA and RNA belong to the nucleic acid group.',
    ],
    answer: 'Nucleic acid.',
  },
  cheatSheet: [
    'Carbohydrates = CHO = quick energy',
    'Lipids = mostly CHO = long-term energy and membranes',
    'Proteins = CHON = amino acids',
    'Nucleic acids = CHONP = DNA and RNA',
    'Monomer = small building block',
    'Polymer = large molecule made from smaller units',
  ],
  quiz: [
    q('q1', 'Which macromolecule is the main source of quick energy for cells?', ['Carbohydrate', 'Nucleic acid', 'Protein', 'Lipid'], 0, 'Carbohydrates such as glucose are commonly used for quick energy.', 'Carbohydrates = quick energy.'),
    q('q2', 'Which macromolecule is made of amino acids?', ['Lipids', 'Proteins', 'Carbohydrates', 'Nucleic acids'], 1, 'Amino acids are the building blocks of proteins.', 'Amino acids = proteins.'),
    q('q3', 'Which group contains DNA and RNA?', ['Lipids', 'Carbohydrates', 'Nucleic acids', 'Proteins'], 2, 'DNA and RNA are nucleic acids made of nucleotides.', 'DNA and RNA = nucleic acids.'),
    q('q4', 'Which element is commonly included in proteins but not in the basic CHO pattern?', ['Nitrogen', 'Helium', 'Iron', 'Calcium'], 0, 'Proteins contain nitrogen in addition to carbon, hydrogen, and oxygen.', 'Proteins = CHON.'),
    q('q5', 'What is a monomer?', ['A cell organelle', 'A small building block of a larger molecule', 'A type of enzyme', 'A form of energy'], 1, 'Monomers are smaller units that can join to form polymers.', 'Monomer = building block.'),
  ],
})

const u2l2 = makeLesson({
  id: 'bio-u2-l2',
  number: '2.2',
  title: 'Enzymes and Activation Energy',
  hook: 'Your cells carry out thousands of chemical reactions. Enzymes help these reactions happen fast enough for life.',
  eli12: 'An enzyme works like a helper that makes a reaction easier to start. It lowers the energy needed, but it does not get used up in the reaction.',
  diagram: 'activation-energy',
  diagramCaption: 'Compare the activation energy of a reaction with and without an enzyme.',
  concepts: [
    { term: 'Enzyme', color: 'green', detail: 'A biological catalyst, usually a protein, that speeds up a chemical reaction without being consumed.' },
    { term: 'Catalyst', color: 'cobalt', detail: 'A substance that increases reaction rate by lowering activation energy.' },
    { term: 'Activation Energy', symbol: 'Eₐ', color: 'yellow', detail: 'The minimum energy required to start a chemical reaction.' },
    { term: 'Substrate', color: 'green', detail: 'The reactant molecule that binds to an enzyme and is changed during the reaction.' },
    { term: 'Active Site', color: 'cobalt', detail: 'The region of an enzyme where the substrate binds and the reaction takes place.' },
    { term: 'Enzyme Specificity', color: 'yellow', detail: 'An enzyme usually works with particular substrates because its active site has a matching shape and chemical properties.' },
  ],
  trap: {
    title: 'Enzymes lower energy, not the final energy',
    detail: 'An enzyme lowers the activation energy barrier. It does not change the overall energy difference between reactants and products or change the reaction’s final products.',
  },
  example: {
    problem: 'A reaction takes place slowly. An enzyme is added. What happens to its activation energy?',
    steps: [
      'Enzymes are biological catalysts.',
      'Catalysts provide a reaction pathway with a lower activation energy.',
      'The reaction can happen faster under the same conditions.',
    ],
    answer: 'Activation energy decreases, so the reaction rate increases.',
  },
  cheatSheet: [
    'Enzyme = biological catalyst',
    'Substrate = molecule the enzyme acts on',
    'Active site = where substrate binds',
    'Enzymes lower activation energy (Eₐ)',
    'Enzymes are not used up by reactions',
    'Enzymes do not change the reaction products',
  ],
  quiz: [
    q('q1', 'What is the main job of an enzyme?', ['Raise activation energy', 'Speed up a reaction by lowering activation energy', 'Change an element into another element', 'Get permanently used up'], 1, 'Enzymes lower the activation energy needed for a reaction.', 'Enzyme = catalyst.'),
    q('q2', 'What is activation energy?', ['Energy stored in DNA', 'Minimum energy needed to start a reaction', 'Energy released only by sunlight', 'Energy needed to divide a cell'], 1, 'Activation energy is the energy barrier that must be overcome for a reaction to begin.', 'Eₐ = energy to get started.'),
    q('q3', 'The molecule an enzyme acts on is called the:', ['Product', 'Substrate', 'Nucleotide', 'Lipid'], 1, 'The substrate binds to the enzyme’s active site.', 'Substrate = enzyme target.'),
    q('q4', 'Where does a substrate bind to an enzyme?', ['Nucleus', 'Cell wall', 'Active site', 'Golgi apparatus'], 2, 'The active site is the region where the enzyme binds its substrate.', 'Active site = binding location.'),
    q('q5', 'What happens to an enzyme after a typical reaction?', ['It is permanently destroyed', 'It becomes DNA', 'It can be used again', 'It becomes the product'], 2, 'Enzymes are catalysts and are not consumed by the reactions they help.', 'Enzymes can be reused.'),
  ],
})

const u2l3 = makeLesson({
  id: 'bio-u2-l3',
  number: '2.3',
  title: 'How pH and Temperature Affect Enzymes',
  hook: 'Enzymes have conditions where they work best. Too much heat or an extreme pH can change their shape and reduce their activity.',
  eli12: 'An enzyme has a shape that fits its substrate. Changing the temperature or pH too much can change that shape, so the substrate no longer fits correctly.',
  diagram: 'enzyme-curve',
  diagramCaption: 'Enzyme activity rises toward an optimum temperature or pH, then may fall when conditions move too far from the optimum.',
  concepts: [
    { term: 'Optimum Temperature', color: 'green', detail: 'The temperature at which an enzyme works at its highest rate.' },
    { term: 'Optimum pH', color: 'cobalt', detail: 'The pH at which an enzyme has its highest activity.' },
    { term: 'Denaturation', color: 'red', detail: 'A change in a protein’s structure that can prevent it from functioning properly.' },
    { term: 'pH', symbol: '0–14', color: 'yellow', detail: 'A scale describing how acidic or basic a solution is. Values below 7 are acidic, 7 is neutral, and values above 7 are basic at standard classroom conditions.' },
    { term: 'Enzyme Activity', color: 'green', detail: 'The rate at which an enzyme catalyzes a reaction.' },
  ],
  trap: {
    title: 'More heat does not always mean faster reactions',
    detail: 'Increasing temperature can initially increase enzyme activity. Beyond the enzyme’s optimum, its structure may change and activity can drop sharply.',
  },
  example: {
    problem: 'An enzyme works best at 37°C. Its activity falls after being heated to 80°C. Explain why.',
    steps: [
      '37°C is its optimum temperature.',
      '80°C is far above its optimum.',
      'The high temperature can disrupt the protein’s shape and active site.',
    ],
    answer: 'The enzyme may have denatured, reducing its ability to bind its substrate.',
  },
  cheatSheet: [
    'Each enzyme has an optimum temperature and pH',
    'Low temperatures usually slow reactions',
    'High temperatures can denature enzymes',
    'Extreme pH can change enzyme shape',
    'Denaturation = loss of normal protein shape and function',
  ],
  quiz: [
    q('q1', 'What does optimum temperature mean?', ['The coldest possible temperature', 'The temperature of maximum enzyme activity', 'The temperature where all enzymes die', 'The temperature where pH equals 7'], 1, 'The optimum temperature is where the enzyme works most effectively.', 'Optimum = best working condition.'),
    q('q2', 'What can happen when an enzyme is exposed to very high temperatures?', ['Its active site may change shape', 'It becomes a carbohydrate', 'It always works faster', 'It gains a nucleus'], 0, 'High heat can disrupt the bonds that maintain the enzyme’s structure.', 'High heat can cause denaturation.'),
    q('q3', 'What is denaturation?', ['Making more ATP', 'Changing a protein’s structure so it may lose function', 'Copying DNA', 'Breaking glucose into pyruvate'], 1, 'Denaturation changes the normal structure of a protein.', 'Denaturation = shape changes.'),
    q('q4', 'A solution with pH 3 is:', ['Basic', 'Neutral', 'Acidic', 'Always an enzyme'], 2, 'Values below 7 are acidic on the standard pH scale.', 'Below 7 = acidic.'),
    q('q5', 'Why can extreme pH reduce enzyme activity?', ['It can change the enzyme’s structure and active site', 'It adds a nucleus', 'It turns proteins into DNA', 'It always removes the substrate'], 0, 'Extreme pH can disrupt interactions that maintain the enzyme’s shape.', 'pH can affect protein shape.'),
  ],
})

// ==================================================
// UNIT 3 — CELLULAR ENERGY
// ==================================================

const u3l1 = makeLesson({
  id: 'bio-u3-l1',
  number: '3.1',
  title: 'ATP: The Cell’s Energy Currency',
  hook: 'Cells need usable energy to move materials, build molecules, and carry out life processes. ATP transfers energy for many of these jobs.',
  eli12: 'Think of ATP as a rechargeable energy token. When its terminal phosphate is removed, energy becomes available for cell work. The cell can use energy to rebuild ATP.',
  diagram: 'atp-cycle',
  diagramCaption: 'ATP can lose a phosphate to become ADP, and energy can be used to add the phosphate back.',
  concepts: [
    { term: 'ATP', symbol: 'Adenosine triphosphate', color: 'green', detail: 'A molecule that transfers usable energy for cellular processes. It contains adenine, ribose, and three phosphate groups.' },
    { term: 'ADP', symbol: 'Adenosine diphosphate', color: 'cobalt', detail: 'A molecule with two phosphate groups that can be converted back into ATP by adding a phosphate using energy.' },
    { term: 'Phosphate', symbol: 'Pᵢ', color: 'yellow', detail: 'An inorganic phosphate group that can be added to ADP to form ATP.' },
    { term: 'Energy Coupling', color: 'green', detail: 'Using energy released by one process to help power another cellular process.' },
    { term: 'Cellular Work', color: 'cobalt', detail: 'Processes such as active transport, movement, and building larger molecules that require energy.' },
  ],
  trap: {
    title: 'ATP is recycled',
    detail: 'ATP → ADP + Pᵢ releases usable energy. ADP + Pᵢ → ATP requires an energy input. Cells continuously recycle ATP.',
  },
  example: {
    problem: 'What happens when ATP loses one phosphate group?',
    code: 'ATP → ADP + Pᵢ + energy',
    steps: [
      'ATP begins with three phosphate groups.',
      'One phosphate is removed.',
      'The molecule becomes ADP and energy is made available for cell work.',
    ],
    answer: 'ATP becomes ADP + Pᵢ, releasing usable energy.',
  },
  cheatSheet: [
    'ATP = 3 phosphate groups',
    'ADP = 2 phosphate groups',
    'ATP → ADP + Pᵢ releases usable energy',
    'ADP + Pᵢ → ATP requires energy',
    'ATP powers active transport, movement, and synthesis',
  ],
  quiz: [
    q('q1', 'What does ATP stand for?', ['Adenosine triphosphate', 'Amino transfer protein', 'Active transport process', 'Adenosine tissue phosphate'], 0, 'ATP stands for adenosine triphosphate.', 'ATP = adenosine triphosphate.'),
    q('q2', 'How many phosphate groups does ATP have?', ['One', 'Two', 'Three', 'Four'], 2, 'The word triphosphate means three phosphate groups.', 'Tri = three.'),
    q('q3', 'What is produced when ATP loses a phosphate?', ['ADP and inorganic phosphate', 'DNA and RNA', 'Glucose and oxygen', 'Two ATP molecules'], 0, 'Removing one phosphate from ATP produces ADP and inorganic phosphate.', 'ATP → ADP + Pᵢ.'),
    q('q4', 'Which process requires energy?', ['ATP losing a phosphate', 'Adding a phosphate to ADP to form ATP', 'ATP becoming ADP', 'All diffusion'], 1, 'Energy must be supplied to convert ADP back into ATP.', 'Building ATP requires energy.'),
    q('q5', 'Which activity can be powered by ATP?', ['Active transport', 'The movement of water by osmosis alone', 'Gravity', 'Sunlight entering a leaf'], 0, 'ATP provides energy for active transport across membranes.', 'ATP powers cellular work.'),
  ],
})

const u3l2 = makeLesson({
  id: 'bio-u3-l2',
  number: '3.2',
  title: 'Photosynthesis',
  hook: 'Plants capture light energy and use it to build sugar. That sugar stores chemical energy that can later be used by cells.',
  eli12: 'A leaf uses sunlight, water, and carbon dioxide to make glucose and release oxygen. Chloroplasts are where photosynthesis happens.',
  diagram: 'photosynthesis',
  diagramCaption: 'Light energy helps convert carbon dioxide and water into glucose and oxygen in chloroplasts.',
  concepts: [
    { term: 'Photosynthesis', color: 'green', detail: 'The process by which photoautotrophs use light energy to build organic molecules such as glucose from carbon dioxide and water.' },
    { term: 'Chlorophyll', color: 'green', detail: 'A light-absorbing pigment found in chloroplasts that captures energy for photosynthesis.' },
    { term: 'Chloroplast', color: 'cobalt', detail: 'The organelle where photosynthesis occurs in plants and many algae.' },
    { term: 'Reactants', color: 'yellow', detail: 'The starting substances in a chemical reaction. For photosynthesis, the overall reactants are carbon dioxide and water, with light energy required.' },
    { term: 'Products', color: 'green', detail: 'The substances made by a reaction. The overall products of photosynthesis are glucose and oxygen.' },
  ],
  trap: {
    title: 'Plants do cellular respiration too',
    detail: 'Photosynthesis stores energy in sugars. Plants also perform cellular respiration to release usable energy from those sugars.',
  },
  example: {
    problem: 'Write the balanced overall equation for photosynthesis.',
    code: '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
    steps: [
      'Carbon dioxide and water are the reactants.',
      'Light energy is required.',
      'Glucose and oxygen are the products.',
    ],
    answer: '6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂',
  },
  cheatSheet: [
    'Location = chloroplast',
    'Chlorophyll absorbs light',
    'Reactants = carbon dioxide + water + light',
    'Products = glucose + oxygen',
    'Photosynthesis stores light energy in chemical bonds',
  ],
  quiz: [
    q('q1', 'Where does photosynthesis occur in plant cells?', ['Mitochondrion', 'Chloroplast', 'Nucleus', 'Ribosome'], 1, 'Chloroplasts contain the structures and pigments needed for photosynthesis.', 'Photosynthesis = chloroplast.'),
    q('q2', 'Which gas is used as a reactant in photosynthesis?', ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], 2, 'Carbon dioxide supplies carbon used to build sugars.', 'CO₂ goes in.'),
    q('q3', 'Which substance is released as a product of photosynthesis?', ['Oxygen', 'Nitrogen', 'Carbon monoxide', 'Methane'], 0, 'Oxygen is released during the overall process of photosynthesis.', 'O₂ comes out.'),
    q('q4', 'What is the main energy source for photosynthesis?', ['ATP from food only', 'Light', 'Heat from the soil', 'Wind'], 1, 'Light energy is captured by pigments such as chlorophyll.', 'Photosynthesis uses light.'),
    q('q5', 'What energy-rich molecule is produced by photosynthesis?', ['Glucose', 'ADP', 'Water only', 'Lactic acid'], 0, 'Photosynthesis produces glucose, which stores chemical energy.', 'Photosynthesis makes sugar.'),
  ],
})

const u3l3 = makeLesson({
  id: 'bio-u3-l3',
  number: '3.3',
  title: 'Cellular Respiration and Fermentation',
  hook: 'Cells break down glucose to transfer its energy into ATP. Oxygen allows aerobic respiration to produce much more ATP than fermentation.',
  eli12: 'Cellular respiration is how cells get usable energy from food. When oxygen is unavailable, some cells can use fermentation to keep glycolysis running.',
  diagram: 'respiration',
  diagramCaption: 'Follow glucose through glycolysis, aerobic respiration, or fermentation when oxygen is unavailable.',
  concepts: [
    { term: 'Cellular Respiration', color: 'green', detail: 'A set of processes that transfers energy from organic molecules such as glucose into ATP.' },
    { term: 'Glycolysis', color: 'cobalt', detail: 'The first stage of glucose breakdown. It occurs in the cytoplasm and produces pyruvate, a net gain of 2 ATP, and NADH.' },
    { term: 'Aerobic Respiration', color: 'green', detail: 'Cellular respiration that uses oxygen as the final electron acceptor in the electron transport chain.' },
    { term: 'Fermentation', color: 'yellow', detail: 'A pathway that regenerates NAD⁺ so glycolysis can continue when oxygen is unavailable. It does not add ATP beyond glycolysis.' },
    { term: 'Lactic Acid Fermentation', color: 'yellow', detail: 'A fermentation pathway that converts pyruvate into lactate while regenerating NAD⁺.' },
    { term: 'Alcoholic Fermentation', color: 'cobalt', detail: 'A pathway used by yeast and some microorganisms that produces ethanol and carbon dioxide while regenerating NAD⁺.' },
    { term: 'Mitochondrion', color: 'green', detail: 'In eukaryotes, the main site of the later stages of aerobic cellular respiration.' },
  ],
  trap: {
    title: 'Fermentation does not make extra ATP',
    detail: 'Glycolysis produces a net 2 ATP per glucose. Fermentation regenerates NAD⁺, allowing glycolysis to continue, but fermentation itself does not produce additional ATP.',
  },
  example: {
    problem: 'A cell breaks down glucose without oxygen. Which pathway can allow glycolysis to continue?',
    steps: [
      'Glycolysis requires NAD⁺ to continue.',
      'Without oxygen, the electron transport chain cannot keep regenerating NAD⁺ in the usual aerobic way.',
      'Fermentation regenerates NAD⁺.',
    ],
    answer: 'Fermentation allows glycolysis to continue.',
  },
  cheatSheet: [
    'Glycolysis occurs in cytoplasm',
    'Glycolysis produces a net 2 ATP per glucose',
    'Aerobic respiration uses oxygen',
    'Most aerobic ATP production occurs through oxidative phosphorylation',
    'Fermentation regenerates NAD⁺',
    'Lactic acid fermentation produces lactate',
    'Alcoholic fermentation produces ethanol and CO₂',
  ],
  quiz: [
    q('q1', 'Where does glycolysis occur?', ['Nucleus', 'Cytoplasm', 'Golgi apparatus', 'Chloroplast only'], 1, 'Glycolysis takes place in the cytoplasm.', 'Glycolysis = cytoplasm.'),
    q('q2', 'What is the net ATP gain from glycolysis per glucose molecule?', ['0', '2', '18', '36'], 1, 'Glycolysis uses 2 ATP and produces 4 ATP, for a net gain of 2.', 'Net glycolysis = 2 ATP.'),
    q('q3', 'What is the final electron acceptor in aerobic respiration?', ['Carbon dioxide', 'Glucose', 'Oxygen', 'Nitrogen'], 2, 'Oxygen accepts electrons at the end of the electron transport chain.', 'Aerobic respiration uses O₂.'),
    q('q4', 'What is the main role of fermentation?', ['Make glucose from sunlight', 'Regenerate NAD⁺ so glycolysis can continue', 'Copy DNA', 'Produce oxygen'], 1, 'Fermentation restores NAD⁺ needed for glycolysis.', 'Fermentation regenerates NAD⁺.'),
    q('q5', 'Which product is associated with alcoholic fermentation?', ['Ethanol and carbon dioxide', 'Oxygen and glucose', 'DNA and RNA', 'Water and starch'], 0, 'Alcoholic fermentation produces ethanol and carbon dioxide.', 'Alcoholic fermentation = ethanol + CO₂.'),
  ],
})

// ==================================================
// UNIT 4 — MOLECULAR GENETICS
// ==================================================

const u4l1 = makeLesson({
  id: 'bio-u4-l1',
  number: '4.1',
  title: 'DNA Structure and Replication',
  hook: 'DNA stores the instructions for building and maintaining an organism. Before a cell divides, it must copy its DNA.',
  eli12: 'DNA looks like a twisted ladder. Its two strands are held together by matching bases. During replication, each original strand helps build a new matching strand.',
  diagram: 'dna-pairs',
  diagramCaption: 'A pairs with T, and G pairs with C. Each original strand acts as a template during replication.',
  concepts: [
    { term: 'DNA', symbol: 'Double helix', color: 'cobalt', detail: 'Deoxyribonucleic acid stores hereditary information in the sequence of its nucleotide bases.' },
    { term: 'Nucleotide', color: 'green', detail: 'The building block of DNA and RNA. A DNA nucleotide contains a sugar, phosphate group, and nitrogenous base.' },
    { term: 'Adenine', symbol: 'A', color: 'yellow', detail: 'A nitrogenous base in DNA that pairs with thymine.' },
    { term: 'Thymine', symbol: 'T', color: 'yellow', detail: 'A nitrogenous base in DNA that pairs with adenine.' },
    { term: 'Guanine', symbol: 'G', color: 'green', detail: 'A nitrogenous base in DNA that pairs with cytosine.' },
    { term: 'Cytosine', symbol: 'C', color: 'green', detail: 'A nitrogenous base in DNA that pairs with guanine.' },
    { term: 'Semiconservative Replication', color: 'cobalt', detail: 'DNA replication in which each new DNA molecule contains one original strand and one newly made strand.' },
    { term: 'DNA Polymerase', color: 'green', detail: 'An enzyme that builds new DNA strands by adding complementary nucleotides.' },
  ],
  trap: {
    title: 'Do not mix up the base pairs',
    detail: 'In DNA, A pairs with T and G pairs with C. RNA uses uracil (U) instead of thymine.',
  },
  example: {
    problem: 'Find the complementary DNA strand for ATGCC.',
    code: 'Original:      A T G C C\nComplement:    T A C G G',
    steps: [
      'A pairs with T.',
      'T pairs with A.',
      'G pairs with C.',
      'C pairs with G.',
      'C pairs with G.',
    ],
    answer: 'TACGG',
  },
  cheatSheet: [
    'DNA = double helix',
    'Nucleotide = sugar + phosphate + base',
    'A = T',
    'G ≡ C',
    'DNA replication is semiconservative',
    'DNA polymerase builds the new strand',
  ],
  quiz: [
    q('q1', 'Which base pairs with adenine in DNA?', ['Cytosine', 'Guanine', 'Thymine', 'Uracil'], 2, 'Adenine pairs with thymine in DNA.', 'A–T.'),
    q('q2', 'Which base pairs with guanine?', ['Cytosine', 'Thymine', 'Adenine', 'Uracil'], 0, 'Guanine pairs with cytosine.', 'G–C.'),
    q('q3', 'What is a nucleotide made of?', ['Amino acids only', 'Sugar, phosphate, and nitrogenous base', 'Fatty acids and glycerol', 'Glucose and oxygen'], 1, 'A nucleotide contains a sugar, phosphate group, and nitrogenous base.', 'Three nucleotide parts.'),
    q('q4', 'What does semiconservative replication mean?', ['Both new strands are completely new', 'Each DNA copy has one old strand and one new strand', 'DNA is never copied', 'Only half the genes are copied'], 1, 'Each replicated DNA molecule keeps one original strand and has one new strand.', 'One old + one new.'),
    q('q5', 'What is the role of DNA polymerase?', ['Break down glucose', 'Build new DNA strands', 'Make ATP in mitochondria', 'Package proteins'], 1, 'DNA polymerase adds complementary nucleotides to build new DNA.', 'Polymerase builds DNA.'),
  ],
})

const u4l2 = makeLesson({
  id: 'bio-u4-l2',
  number: '4.2',
  title: 'Transcription and Translation',
  hook: 'DNA contains instructions for proteins, but ribosomes use RNA to read those instructions and build proteins.',
  eli12: 'Transcription copies a gene’s information into messenger RNA. Translation happens at a ribosome, where the mRNA code is used to join amino acids together.',
  diagram: 'central-dogma',
  diagramCaption: 'Information flows from DNA to RNA during transcription and from RNA to protein during translation.',
  concepts: [
    { term: 'Central Dogma', symbol: 'DNA → RNA → Protein', color: 'cobalt', detail: 'The basic flow of genetic information: DNA is transcribed into RNA, and RNA is translated into a protein.' },
    { term: 'Transcription', color: 'green', detail: 'The process of using a DNA template to make an RNA molecule.' },
    { term: 'Messenger RNA', symbol: 'mRNA', color: 'yellow', detail: 'RNA that carries a copy of genetic instructions from DNA to a ribosome.' },
    { term: 'Translation', color: 'green', detail: 'The process in which a ribosome reads mRNA codons and joins amino acids to make a polypeptide.' },
    { term: 'Codon', symbol: '3 bases', color: 'cobalt', detail: 'A sequence of three mRNA nucleotides that specifies an amino acid or a stop signal.' },
    { term: 'Transfer RNA', symbol: 'tRNA', color: 'yellow', detail: 'RNA that carries an amino acid to a ribosome and has an anticodon that pairs with an mRNA codon.' },
    { term: 'Ribosome', color: 'green', detail: 'A structure made of RNA and proteins where translation takes place.' },
  ],
  trap: {
    title: 'Transcription vs. translation',
    detail: 'Transcription is DNA → RNA. Translation is mRNA → protein. A codon is a group of three bases on mRNA, not DNA.',
  },
  example: {
    problem: 'An mRNA sequence contains the codon AUG. What does it commonly signal?',
    code: 'mRNA: 5′-AUG-3′',
    steps: [
      'Read the sequence as an mRNA codon.',
      'AUG codes for methionine.',
      'AUG commonly serves as the start codon.',
    ],
    answer: 'AUG is the start codon and codes for methionine.',
  },
  cheatSheet: [
    'DNA → RNA → Protein',
    'Transcription = DNA to RNA',
    'Translation = mRNA to protein',
    'mRNA carries instructions',
    'Ribosome = translation site',
    'Codon = 3 mRNA bases',
    'tRNA brings amino acids',
    'AUG = common start codon',
  ],
  quiz: [
    q('q1', 'What is transcription?', ['Making RNA from a DNA template', 'Making DNA from protein', 'Building a cell membrane', 'Breaking down glucose'], 0, 'Transcription copies genetic information from DNA into RNA.', 'Transcription = DNA → RNA.'),
    q('q2', 'Where does translation take place?', ['At ribosomes', 'Inside lysosomes', 'At the cell wall', 'Only in chloroplasts'], 0, 'Ribosomes read mRNA and build polypeptides.', 'Translation = ribosome.'),
    q('q3', 'How many bases are in one codon?', ['One', 'Two', 'Three', 'Four'], 2, 'Each codon contains three mRNA nucleotides.', 'Codon = three bases.'),
    q('q4', 'What is the job of mRNA?', ['Carry genetic instructions to a ribosome', 'Store all cell energy', 'Digest waste', 'Form the cell wall'], 0, 'Messenger RNA carries genetic instructions from DNA to ribosomes.', 'mRNA = message.'),
    q('q5', 'What does tRNA bring to the ribosome?', ['Glucose', 'Amino acids', 'Oxygen', 'DNA polymerase'], 1, 'Transfer RNA carries specific amino acids during translation.', 'tRNA brings amino acids.'),
  ],
})

const u4l3 = makeLesson({
  id: 'bio-u4-l3',
  number: '4.3',
  title: 'Mutations and Their Effects',
  hook: 'A mutation is a change in genetic information. Some mutations have little effect, while others can change a protein or affect an organism.',
  eli12: 'Think of DNA like a set of written instructions. Changing one letter can change a word. Adding or removing letters can shift how the rest of the instructions are read.',
  diagram: 'mutations',
  diagramCaption: 'Compare substitution, insertion, and deletion mutations and how they can affect a reading frame.',
  concepts: [
    { term: 'Mutation', color: 'yellow', detail: 'A change in the nucleotide sequence of DNA.' },
    { term: 'Substitution', color: 'cobalt', detail: 'A point mutation in which one nucleotide is replaced by another.' },
    { term: 'Insertion', color: 'red', detail: 'A mutation in which one or more nucleotides are added to a DNA sequence.' },
    { term: 'Deletion', color: 'red', detail: 'A mutation in which one or more nucleotides are removed from a DNA sequence.' },
    { term: 'Frameshift Mutation', color: 'red', detail: 'A mutation caused by an insertion or deletion that changes the reading frame when the number of bases added or removed is not a multiple of three.' },
    { term: 'Silent Mutation', color: 'green', detail: 'A nucleotide change that does not change the amino acid specified by the codon.' },
    { term: 'Nonsense Mutation', color: 'red', detail: 'A mutation that changes an amino-acid codon into a stop codon.' },
    { term: 'Missense Mutation', color: 'yellow', detail: 'A mutation that changes a codon so it specifies a different amino acid.' },
  ],
  trap: {
    title: 'Not every insertion causes a frameshift',
    detail: 'Insertions or deletions that change the number of bases by a multiple of three do not shift the reading frame, although they can still affect the protein.',
  },
  example: {
    problem: 'A DNA sequence loses one nucleotide. What type of mutation is this, and what may happen?',
    code: 'Original: ATG-CCA-GTA\nChanged:  ATC-CAG-TA...',
    steps: [
      'A nucleotide was removed.',
      'The mutation is a deletion.',
      'Because one base was removed, the reading frame can shift.',
    ],
    answer: 'A deletion that can cause a frameshift mutation.',
  },
  cheatSheet: [
    'Mutation = change in DNA sequence',
    'Substitution = replace a base',
    'Insertion = add bases',
    'Deletion = remove bases',
    'Frameshift = reading frame changes',
    'Silent = same amino acid',
    'Missense = different amino acid',
    'Nonsense = stop codon appears',
  ],
  quiz: [
    q('q1', 'What is a mutation?', ['A change in a DNA sequence', 'A type of cell organelle', 'A process that makes ATP', 'A normal ribosome'], 0, 'A mutation is a change in the nucleotide sequence of DNA.', 'Mutation = DNA change.'),
    q('q2', 'Which mutation replaces one nucleotide with another?', ['Insertion', 'Deletion', 'Substitution', 'Replication'], 2, 'A substitution changes one base to a different base.', 'Substitution = replace.'),
    q('q3', 'Which change can cause a frameshift?', ['A one-base insertion', 'A three-base insertion', 'A three-base deletion', 'A silent substitution'], 0, 'Adding one base shifts the grouping of bases into codons.', 'A non-multiple of three can shift the frame.'),
    q('q4', 'What is a silent mutation?', ['A mutation that always kills a cell', 'A mutation that does not change the amino acid', 'A mutation that removes an entire chromosome', 'A mutation that adds oxygen'], 1, 'The changed codon still specifies the same amino acid.', 'Silent = same amino acid.'),
    q('q5', 'Which mutation creates a premature stop codon?', ['Silent', 'Nonsense', 'Neutral insertion', 'Replication'], 1, 'A nonsense mutation changes a codon into a stop signal.', 'Nonsense = stop codon.'),
  ],
})

// ==================================================
// UNIT 5 — PATTERNS OF INHERITANCE
// ==================================================

const u5l1 = makeLesson({
  id: 'bio-u5-l1',
  number: '5.1',
  title: 'Mitosis and Meiosis',
  hook: 'Cells divide for growth, repair, and reproduction. Mitosis and meiosis produce different kinds of cells.',
  eli12: 'Mitosis makes two matching body cells. Meiosis makes four genetically different sex cells, each with half the usual chromosome number.',
  diagram: 'mitosis-meiosis',
  diagramCaption: 'Mitosis maintains chromosome number; meiosis reduces chromosome number by half.',
  concepts: [
    { term: 'Mitosis', symbol: '2n → 2n', color: 'green', detail: 'Cell division that produces two genetically similar daughter cells with the same chromosome number as the original cell.' },
    { term: 'Meiosis', symbol: '2n → n', color: 'cobalt', detail: 'A specialized type of cell division that produces haploid cells with half the original chromosome number.' },
    { term: 'Diploid', symbol: '2n', color: 'yellow', detail: 'A cell with two sets of chromosomes, one set inherited from each parent.' },
    { term: 'Haploid', symbol: 'n', color: 'green', detail: 'A cell with one set of chromosomes, such as a typical sperm or egg cell.' },
    { term: 'Gamete', color: 'cobalt', detail: 'A reproductive cell, such as a sperm or egg, that joins with another gamete during fertilization.' },
    { term: 'Crossing Over', color: 'yellow', detail: 'The exchange of DNA between homologous chromosomes during prophase I of meiosis, creating new combinations of alleles.' },
    { term: 'Fertilization', color: 'green', detail: 'The joining of two haploid gametes to form a diploid zygote.' },
  ],
  trap: {
    title: 'Do not mix up the final cell counts',
    detail: 'Mitosis normally produces two daughter cells. Meiosis produces four haploid cells. Mitosis is used for growth and repair; meiosis helps make gametes.',
  },
  example: {
    problem: 'A diploid cell has 12 chromosomes. How many chromosomes will each normal daughter cell have after mitosis and after meiosis?',
    steps: [
      'The original diploid cell has 2n = 12.',
      'Mitosis keeps the chromosome number the same.',
      'Meiosis reduces the chromosome number by half.',
    ],
    answer: 'Mitosis: 12 chromosomes per daughter cell. Meiosis: 6 chromosomes per haploid cell.',
  },
  cheatSheet: [
    'Mitosis: 2n → 2n',
    'Mitosis produces 2 similar daughter cells',
    'Meiosis: 2n → n',
    'Meiosis produces 4 haploid cells',
    'Diploid = two chromosome sets',
    'Haploid = one chromosome set',
    'Crossing over occurs in prophase I',
    'Fertilization restores diploid number',
  ],
  quiz: [
    q('q1', 'What is the main result of mitosis?', ['Four haploid cells', 'Two genetically similar daughter cells', 'One gamete', 'Four different organisms'], 1, 'Mitosis normally produces two daughter cells with the same chromosome number.', 'Mitosis = two matching cells.'),
    q('q2', 'What does meiosis produce?', ['Two diploid cells', 'Four haploid cells', 'One diploid cell', 'Two identical body cells'], 1, 'Meiosis reduces chromosome number and normally produces four haploid cells.', 'Meiosis = four haploid cells.'),
    q('q3', 'What does diploid mean?', ['One chromosome set', 'Two chromosome sets', 'No chromosomes', 'Four chromosome sets'], 1, 'Diploid cells contain two sets of chromosomes.', 'Diploid = 2n.'),
    q('q4', 'When does crossing over normally occur?', ['Prophase I of meiosis', 'During cytokinesis of mitosis', 'During translation', 'During photosynthesis'], 0, 'Homologous chromosomes exchange DNA during prophase I.', 'Crossing over = prophase I.'),
    q('q5', 'A cell with 20 chromosomes undergoes meiosis. How many chromosomes are in each normal haploid product?', ['5', '10', '20', '40'], 1, 'Meiosis reduces the chromosome number by half.', '20 ÷ 2 = 10.'),
  ],
})

const u5l2 = makeLesson({
  id: 'bio-u5-l2',
  number: '5.2',
  title: 'Punnett Squares and Mendelian Genetics',
  hook: 'Traits are passed from parents to offspring through alleles. Punnett squares help predict possible combinations.',
  eli12: 'Each parent passes one allele for a gene to an offspring. A Punnett square shows the combinations that could happen.',
  diagram: 'punnett',
  diagramCaption: 'Combine one allele from each parent to predict possible offspring genotypes and phenotypes.',
  concepts: [
    { term: 'Gene', color: 'cobalt', detail: 'A segment of DNA that contributes to a functional product and can influence a trait.' },
    { term: 'Allele', color: 'green', detail: 'A version of a gene. An individual may inherit different alleles from each parent.' },
    { term: 'Dominant Allele', symbol: 'A', color: 'yellow', detail: 'An allele expressed in the phenotype when at least one copy is present in a simple complete-dominance model.' },
    { term: 'Recessive Allele', symbol: 'a', color: 'yellow', detail: 'An allele expressed in the phenotype in a simple complete-dominance model when two copies are present.' },
    { term: 'Genotype', color: 'cobalt', detail: 'The allele combination an organism has for a gene, such as AA, Aa, or aa.' },
    { term: 'Phenotype', color: 'green', detail: 'An observable characteristic influenced by genotype and sometimes the environment.' },
    { term: 'Homozygous', color: 'yellow', detail: 'Having two identical alleles for a gene, such as AA or aa.' },
    { term: 'Heterozygous', color: 'cobalt', detail: 'Having two different alleles for a gene, such as Aa.' },
  ],
  trap: {
    title: 'Genotype is not phenotype',
    detail: 'Genotype describes the alleles. Phenotype describes the observable trait. In complete dominance, AA and Aa can have the same phenotype.',
  },
  example: {
    problem: 'Cross two heterozygous parents: Aa × Aa. Find the genotype and phenotype ratios under complete dominance.',
    code: '      A     a\n A   AA    Aa\n a   Aa    aa',
    steps: [
      'Each parent can pass A or a.',
      'The four combinations are AA, Aa, Aa, and aa.',
      'Three combinations have at least one dominant A.',
      'One combination is aa.',
    ],
    answer: 'Genotype ratio = 1 AA : 2 Aa : 1 aa. Phenotype ratio = 3 dominant : 1 recessive.',
  },
  cheatSheet: [
    'Gene = DNA section associated with a trait',
    'Allele = version of a gene',
    'Genotype = allele combination',
    'Phenotype = observable trait',
    'Homozygous = same alleles (AA or aa)',
    'Heterozygous = different alleles (Aa)',
    'Aa × Aa → 1:2:1 genotype ratio',
    'Aa × Aa → 3:1 phenotype ratio with complete dominance',
  ],
  quiz: [
    q('q1', 'What is an allele?', ['A version of a gene', 'A cell organelle', 'A type of protein only', 'A complete chromosome set'], 0, 'Alleles are different versions of the same gene.', 'Allele = gene version.'),
    q('q2', 'What does genotype describe?', ['An organism’s allele combination', 'Only its physical appearance', 'Its habitat', 'Its age'], 0, 'Genotype refers to the alleles an organism has.', 'Genotype = genes/alleles.'),
    q('q3', 'What does phenotype describe?', ['The DNA replication process', 'Observable characteristics', 'The number of ribosomes', 'The cell membrane'], 1, 'Phenotype refers to observable traits.', 'Phenotype = what is observed.'),
    q('q4', 'Which genotype is heterozygous?', ['AA', 'aa', 'Aa', 'AAA'], 2, 'Heterozygous means having two different alleles.', 'Heterozygous = different.'),
    q('q5', 'In Aa × Aa, what is the chance of aa offspring?', ['0%', '25%', '50%', '100%'], 1, 'One of the four equally likely combinations is aa.', 'One out of four = 25%.'),
  ],
})

const u5l3 = makeLesson({
  id: 'bio-u5-l3',
  number: '5.3',
  title: 'Non-Mendelian and Sex-Linked Inheritance',
  hook: 'Not every trait follows simple dominant and recessive inheritance. Some traits show blended, shared, or sex-linked patterns.',
  eli12: 'Sometimes neither allele completely hides the other. In incomplete dominance the traits blend, while codominance shows both traits at once.',
  diagram: 'non-mendelian',
  diagramCaption: 'Compare complete dominance, incomplete dominance, codominance, and X-linked inheritance.',
  concepts: [
    { term: 'Incomplete Dominance', color: 'yellow', detail: 'A pattern in which the heterozygous phenotype is intermediate between the two homozygous phenotypes.' },
    { term: 'Codominance', color: 'green', detail: 'A pattern in which both alleles are fully expressed in a heterozygote.' },
    { term: 'Multiple Alleles', color: 'cobalt', detail: 'A gene has more than two possible alleles in a population, although an individual usually carries only two.' },
    { term: 'Sex-Linked Trait', color: 'yellow', detail: 'A trait controlled by a gene on a sex chromosome. Many classroom examples involve genes on the X chromosome.' },
    { term: 'Carrier', color: 'green', detail: 'An individual who has one copy of a recessive allele for a trait and can pass it to offspring without showing the recessive phenotype.' },
    { term: 'Polygenic Trait', color: 'cobalt', detail: 'A trait influenced by multiple genes, often producing a wide range of phenotypes.' },
  ],
  trap: {
    title: 'Incomplete dominance vs. codominance',
    detail: 'Incomplete dominance produces an intermediate phenotype. Codominance shows both alleles clearly at the same time. Neither means that one allele disappears.',
  },
  example: {
    problem: 'A red flower crossed with a white flower produces pink offspring. What inheritance pattern is shown?',
    steps: [
      'The offspring are not fully red.',
      'The offspring are not fully white.',
      'The phenotype is intermediate between the two parent phenotypes.',
    ],
    answer: 'Incomplete dominance.',
  },
  cheatSheet: [
    'Incomplete dominance = intermediate phenotype',
    'Codominance = both alleles expressed',
    'AB blood type = codominance',
    'ABO blood group = multiple alleles',
    'Sex-linked traits = genes on sex chromosomes',
    'X-linked recessive traits are often more common in males',
    'Polygenic = multiple genes affect one trait',
  ],
  quiz: [
    q('q1', 'Red flowers crossed with white flowers produce pink offspring. This is:', ['Codominance', 'Incomplete dominance', 'Complete dominance', 'Multiple alleles only'], 1, 'Pink is an intermediate phenotype between red and white.', 'Intermediate = incomplete dominance.'),
    q('q2', 'A flower displays both red and white patches at the same time. This is:', ['Incomplete dominance', 'Codominance', 'Mutation', 'Mitosis'], 1, 'Both alleles are expressed visibly in the heterozygote.', 'Both shown = codominance.'),
    q('q3', 'Which blood type demonstrates codominance of A and B alleles?', ['Type O', 'Type A', 'Type B', 'Type AB'], 3, 'An individual with type AB blood expresses both A and B antigens.', 'AB = both A and B.'),
    q('q4', 'What is a sex-linked trait?', ['A trait controlled by a gene on a sex chromosome', 'A trait controlled only by nutrition', 'A trait found only in plants', 'A trait caused by ATP'], 0, 'Sex-linked genes are located on the X or Y chromosome.', 'Sex-linked = sex chromosome gene.'),
    q('q5', 'What does polygenic inheritance mean?', ['One gene controls every trait', 'Many genes contribute to one trait', 'Only the mother passes alleles', 'No alleles are inherited'], 1, 'Polygenic traits are influenced by multiple genes.', 'Poly = many genes.'),
  ],
})

// ==================================================
// COURSE UNITS
// ==================================================

export const biologyUnit1: Unit = {
  id: 'bio-u1',
  number: 1,
  title: 'Cell Structures & Processes',
  lessons: [u1l1, u1l2, u1l3],
}

export const biologyUnit2: Unit = {
  id: 'bio-u2',
  number: 2,
  title: 'Biochemical Interactions',
  lessons: [u2l1, u2l2, u2l3],
}

export const biologyUnit3: Unit = {
  id: 'bio-u3',
  number: 3,
  title: 'Cellular Energy',
  lessons: [u3l1, u3l2, u3l3],
}

export const biologyUnit4: Unit = {
  id: 'bio-u4',
  number: 4,
  title: 'Molecular Genetics',
  lessons: [u4l1, u4l2, u4l3],
}

export const biologyUnit5: Unit = {
  id: 'bio-u5',
  number: 5,
  title: 'Patterns of Inheritance',
  lessons: [u5l1, u5l2, u5l3],
}

export const biologyUnits: Unit[] = [
  biologyUnit1,
  biologyUnit2,
  biologyUnit3,
  biologyUnit4,
  biologyUnit5,
]

// ==================================================
// UNIT EXAMS
// 10 questions per unit, selected from all 3 lessons.
// ==================================================

const makeExam = (id: string, lessons: Lesson[]): Question[] => {
  const selected = [
    ...lessons[0].quiz.slice(0, 3),
    ...lessons[1].quiz.slice(0, 3),
    ...lessons[2].quiz.slice(0, 4),
  ]

  return selected.map((question, index) => ({
    ...question,
    id: `${id}-q${index + 1}`,
  }))
}

export const biologyUnitExams: Record<string, Question[]> = {
  'bio-u1': makeExam('bio-u1-exam', biologyUnit1.lessons),
  'bio-u2': makeExam('bio-u2-exam', biologyUnit2.lessons),
  'bio-u3': makeExam('bio-u3-exam', biologyUnit3.lessons),
  'bio-u4': makeExam('bio-u4-exam', biologyUnit4.lessons),
  'bio-u5': makeExam('bio-u5-exam', biologyUnit5.lessons),
}

// Individual named exports are available if the app needs them.
export const biologyUnit1Exam = biologyUnitExams['bio-u1']
export const biologyUnit2Exam = biologyUnitExams['bio-u2']
export const biologyUnit3Exam = biologyUnitExams['bio-u3']
export const biologyUnit4Exam = biologyUnitExams['bio-u4']
export const biologyUnit5Exam = biologyUnitExams['bio-u5']

// ==================================================
// COURSE FINAL EXAM
// 20 questions, 4 from each unit.
// ==================================================

export const biologyFinalExam: Question[] = biologyUnits.flatMap(
  (unit, unitIndex) =>
    biologyUnitExams[unit.id]
      .slice(0, 4)
      .map((question, questionIndex) => ({
        ...question,
        id: `bio-final-u${unitIndex + 1}-q${questionIndex + 1}`,
      })),
)

// ==================================================
// COURSE EXPORT
// ==================================================

export const biology = {
  id: 'bio',
  number: 2,
  title: 'Biology',
  short: 'Biology',
  zone: 'red' as const,
  units: biologyUnits,
  unitExams: biologyUnitExams,
  finalExam: biologyFinalExam,
}
