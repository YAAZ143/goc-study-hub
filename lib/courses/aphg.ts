import type { Course, Lesson, Question, Unit, ConceptColor } from '@/lib/types'

const q = (
  id: string,
  prompt: string,
  choices: string[],
  answer: number,
  explanation: string,
  fix: string,
): Question => ({ id, prompt, choices, answer, explanation, fix })

const lesson = (
  id: string,
  number: string,
  title: string,
  hook: string,
  eli12: string,
  diagram: Lesson['diagram'],
  diagramCaption: string,
  concepts: Lesson['concepts'],
  trap: Lesson['trap'],
  example: Lesson['example'],
  cheatSheet: string[],
  flashcards: Lesson['flashcards'],
  quiz: Question[],
): Lesson => ({
  id,
  number,
  title,
  hook,
  eli12,
  diagram,
  diagramCaption,
  concepts,
  trap,
  example,
  cheatSheet,
  flashcards,
  quiz,
})

const concept = (
  term: string,
  detail: string,
  color: ConceptColor = 'cobalt',
  symbol?: string,
) => ({ term, detail, color, symbol })

// UNIT 1: THINKING GEOGRAPHICALLY

export const aphgUnit1: Unit = {
  id: 'aphg-unit-1',
  number: 1,
  title: 'Thinking Geographically',
  lessons: [
    lesson(
      'aphg-1-1',
      '1.1',
      'Maps and Map Projections',
      'Every flat world map changes the way Earth looks.',
      'A map is a smaller picture of Earth. Since Earth is round and paper is flat, every flat map has some distortion.',
      'three-blocks',
      'Compare the shape, size, and distance distortions found in different map projections.',
      [
        concept('Map projection', 'A way of showing Earth’s curved surface on a flat map.'),
        concept('Mercator projection', 'Keeps direction and shape fairly accurate but greatly enlarges areas near the poles.', 'yellow'),
        concept('Robinson projection', 'Balances several types of distortion to create a useful general world map.'),
        concept('Peters projection', 'Keeps relative area accurate but distorts shapes.', 'green'),
        concept('Distortion', 'A change in shape, size, distance, or direction caused by mapping a round Earth.', 'red'),
      ],
      {
        title: 'The Mercator map trap',
        detail: 'Greenland looks almost as large as Africa on a Mercator map, even though Africa is much larger. Do not assume map appearance means actual land area.',
      },
      {
        problem: 'A map is designed to show the true relative size of countries.',
        steps: [
          'Identify what the map needs to preserve.',
          'Area is the important property.',
          'Choose an equal-area projection such as the Peters projection.',
        ],
        answer: 'Peters projection',
      },
      [
        'All flat maps have some distortion.',
        'Mercator: useful for direction, distorts area near the poles.',
        'Peters: preserves relative area, distorts shape.',
        'Robinson: balances different types of distortion.',
        'Choose a projection based on the map’s purpose.',
      ],
      [
        { front: 'What is a map projection?', back: 'A method of showing Earth’s curved surface on a flat map.' },
        { front: 'What does the Mercator projection preserve well?', back: 'Direction and local shape.' },
        { front: 'What does the Peters projection preserve?', back: 'Relative area.' },
        { front: 'Why do all flat maps have distortion?', back: 'A curved surface cannot be flattened without changing some properties.' },
      ],
      [
        q('aphg-1-1-q1', 'Why do all flat world maps have some distortion?', ['Earth is too small to map', 'A curved surface is being shown on a flat surface', 'Maps cannot show direction', 'Earth has no fixed shape'], 1, 'Flattening a curved surface changes at least one map property.', 'Remember: round Earth, flat map, unavoidable distortion.'),
        q('aphg-1-1-q2', 'Which projection greatly enlarges areas near the poles?', ['Peters', 'Robinson', 'Mercator', 'Azimuthal'], 2, 'Mercator makes high-latitude areas appear much larger.', 'Connect Mercator with the large-looking Greenland.'),
        q('aphg-1-1-q3', 'Which projection preserves relative area?', ['Peters', 'Mercator', 'Robinson', 'Conic'], 0, 'Peters is an equal-area projection.', 'Equal-area means the sizes are proportional.'),
        q('aphg-1-1-q4', 'A sailor needs a map that shows direction accurately. Which projection is useful?', ['Peters', 'Mercator', 'Robinson', 'Population cartogram'], 1, 'Mercator is useful for navigation because of its direction properties.', 'Think navigation and direction.'),
        q('aphg-1-1-q5', 'What is distortion?', ['The scale of a map', 'The title of a map', 'A change in shape, area, distance, or direction', 'A type of region'], 2, 'Distortion is the change caused by representing Earth on a map.', 'Know the four types: shape, area, distance, direction.'),
      ],
    ),

    lesson(
      'aphg-1-2',
      '1.2',
      'Geographic Data and Technology',
      'Your phone can show exactly where you are.',
      'Geographers use technology and data to study places, patterns, and movement.',
      'ipo',
      'GPS collects location signals, GIS organizes geographic layers, and remote sensing gathers information from a distance.',
      [
        concept('GPS', 'Global Positioning System. Uses satellites to find a location on Earth.'),
        concept('GIS', 'Geographic Information System. Stores, layers, and analyzes geographic data.', 'green'),
        concept('Remote sensing', 'Collecting information about Earth from satellites or aircraft.'),
        concept('Spatial data', 'Information connected to a location.'),
        concept('Geotagging', 'Adding geographic location information to data or media.', 'yellow'),
      ],
      {
        title: 'GPS vs. GIS',
        detail: 'GPS tells you where something is. GIS helps organize and analyze information about that location.',
      },
      {
        problem: 'A city combines maps of roads, schools, income, and flood risk to decide where to build a new school.',
        steps: [
          'The city needs several geographic data layers.',
          'It needs to compare those layers.',
          'GIS can combine and analyze the information.',
        ],
        answer: 'GIS',
      },
      [
        'GPS = finds location.',
        'GIS = stores and analyzes geographic layers.',
        'Remote sensing = collects information from a distance.',
        'Spatial data is connected to a place.',
        'Geographers use technology to find patterns.',
      ],
      [
        { front: 'What does GPS do?', back: 'Uses satellites to determine location.' },
        { front: 'What does GIS do?', back: 'Organizes and analyzes geographic data using layers.' },
        { front: 'What is remote sensing?', back: 'Collecting information about Earth from a distance.' },
        { front: 'What is spatial data?', back: 'Data connected to a geographic location.' },
      ],
      [
        q('aphg-1-2-q1', 'Which technology uses satellites to determine location?', ['GIS', 'GPS', 'Remote sensing', 'Census'], 1, 'GPS uses satellite signals to determine location.', 'GPS answers: Where am I?'),
        q('aphg-1-2-q2', 'A researcher layers roads, income, and flood-risk maps. What is being used?', ['GPS', 'GIS', 'A map projection', 'A population pyramid'], 1, 'GIS combines geographic data layers for analysis.', 'Multiple map layers point to GIS.'),
        q('aphg-1-2-q3', 'What is remote sensing?', ['Collecting data from a distance', 'Counting people in a city', 'Drawing political borders', 'Measuring language'], 0, 'Satellites and aircraft can collect information without direct contact.', 'Think satellite images.'),
        q('aphg-1-2-q4', 'Which is an example of spatial data?', ['A person’s favorite song', 'A city’s coordinates', 'A random number', 'A book title'], 1, 'Coordinates connect information to a geographic location.', 'Spatial means related to space or location.'),
        q('aphg-1-2-q5', 'What is one major use of GIS?', ['Finding your exact location using satellites', 'Analyzing patterns across geographic layers', 'Changing Earth’s shape', 'Creating population growth'], 1, 'GIS helps identify patterns by combining geographic information.', 'GPS locates; GIS analyzes.'),
      ],
    ),

    lesson(
      'aphg-1-3',
      '1.3',
      'Scale and Regions',
      'The same place can look different depending on how far out you zoom.',
      'Geographers study places at different sizes and group places into regions based on shared features.',
      'three-blocks',
      'Compare local, regional, national, and global scales, then identify the three types of regions.',
      [
        concept('Scale', 'The geographic level used to study a pattern, from local to global.'),
        concept('Formal region', 'An area with a measurable shared feature, such as an official language or climate zone.'),
        concept('Functional region', 'An area organized around a central point or node, such as a city and its commuting zone.', 'green'),
        concept('Vernacular region', 'An area people recognize based on feelings or beliefs, such as the American South.'),
        concept('Globalization', 'The growing connection between places through trade, communication, and movement.', 'yellow'),
      ],
      {
        title: 'Do not mix up region types',
        detail: 'Formal = shared feature. Functional = organized around a node. Vernacular = based on people’s ideas or perceptions.',
      },
      {
        problem: 'A group of towns depends on one city for jobs, shopping, and transportation.',
        steps: [
          'Find the central point.',
          'Notice that nearby towns are connected to it.',
          'A region organized around a central point is functional.',
        ],
        answer: 'Functional region',
      },
      [
        'Local = small area.',
        'National = one country.',
        'Global = worldwide.',
        'Formal = shared measurable feature.',
        'Functional = central node and connected area.',
        'Vernacular = perceived or informal region.',
      ],
      [
        { front: 'What is a formal region?', back: 'An area with a shared measurable feature.' },
        { front: 'What is a functional region?', back: 'An area organized around a central node.' },
        { front: 'What is a vernacular region?', back: 'An area based on people’s perceptions or beliefs.' },
        { front: 'What does geographic scale mean?', back: 'The level at which a geographic issue is studied.' },
      ],
      [
        q('aphg-1-3-q1', 'A country where most people speak the same official language is an example of what region?', ['Functional', 'Vernacular', 'Formal', 'Random'], 2, 'A formal region has a measurable shared feature.', 'Look for an official or measurable feature.'),
        q('aphg-1-3-q2', 'A city and the surrounding towns that depend on it form what region?', ['Formal', 'Functional', 'Vernacular', 'Climate'], 1, 'The city is the central node of a functional region.', 'A central point means functional.'),
        q('aphg-1-3-q3', 'The American South is often considered what type of region?', ['Functional', 'Formal', 'Vernacular', 'Political scale'], 2, 'The South is commonly defined through cultural perceptions.', 'If people disagree about the exact border, think vernacular.'),
        q('aphg-1-3-q4', 'Studying a neighborhood’s traffic is an example of which scale?', ['Global', 'Local', 'National', 'Continental'], 1, 'A neighborhood is a local-scale area.', 'Small area means local.'),
        q('aphg-1-3-q5', 'Which region is organized around a central point?', ['Formal', 'Vernacular', 'Functional', 'Perceptual only'], 2, 'Functional regions connect places to a central node.', 'Remember: functional = connected to a center.'),
      ],
    ),
  ],
}

// UNIT 2: POPULATION AND MIGRATION

export const aphgUnit2: Unit = {
  id: 'aphg-unit-2',
  number: 2,
  title: 'Population and Migration',
  lessons: [
    lesson(
      'aphg-2-1',
      '2.1',
      'Population Distribution and Density',
      'Most people on Earth live in a few major clusters.',
      'Population distribution describes where people live. Population density measures how crowded an area is.',
      'three-blocks',
      'The four major population clusters are East Asia, South Asia, Europe, and Southeast Asia.',
      [
        concept('Population distribution', 'The pattern of where people live.'),
        concept('Population density', 'The number of people living in a given area.'),
        concept('Arithmetic density', 'Total population divided by total land area.'),
        concept('Physiological density', 'Total population divided by arable land.'),
        concept('Agricultural density', 'Number of farmers divided by arable land.', 'green'),
        concept('Carrying capacity', 'The largest population an environment can support with available resources.', 'yellow'),
      ],
      {
        title: 'Density formulas',
        detail: 'Arithmetic uses all land. Physiological uses arable land. Agricultural uses farmers. Check the words in the question before choosing a formula.',
      },
      {
        problem: 'A country has 12 million people and 300,000 square kilometers of land. Find arithmetic density.',
        steps: [
          'Write the formula: population ÷ land area.',
          'Substitute: 12,000,000 ÷ 300,000.',
          'Divide: 40.',
        ],
        answer: '40 people per square kilometer',
      },
      [
        'Four major clusters: East Asia, South Asia, Europe, Southeast Asia.',
        'Arithmetic density = people ÷ total land.',
        'Physiological density = people ÷ arable land.',
        'Agricultural density = farmers ÷ arable land.',
        'Carrying capacity depends on resources and technology.',
      ],
      [
        { front: 'What is population distribution?', back: 'Where people are located across an area.' },
        { front: 'Arithmetic density formula?', back: 'Total population ÷ total land area.' },
        { front: 'Physiological density formula?', back: 'Total population ÷ arable land.' },
        { front: 'What is carrying capacity?', back: 'The largest population an environment can support with available resources.' },
      ],
      [
        q('aphg-2-1-q1', 'Which is one of the four major population clusters?', ['Northern Canada', 'East Asia', 'Sahara', 'Antarctica'], 1, 'East Asia is one of the four major population clusters.', 'Memorize East Asia, South Asia, Europe, and Southeast Asia.'),
        q('aphg-2-1-q2', 'What is arithmetic density?', ['Farmers per arable land', 'Population per total land area', 'Population per farm', 'Births per year'], 1, 'Arithmetic density divides total population by total land area.', 'Arithmetic uses all land.'),
        q('aphg-2-1-q3', 'Which density uses only land suitable for farming?', ['Arithmetic', 'Physiological', 'Agricultural', 'Urban'], 1, 'Physiological density compares population with arable land.', 'Physiological = people compared with farmable land.'),
        q('aphg-2-1-q4', 'A country has 8 million people and 200,000 km² of land. What is its arithmetic density?', ['20 people/km²', '40 people/km²', '80 people/km²', '400 people/km²'], 1, '8,000,000 ÷ 200,000 = 40.', 'Divide population by total land area.'),
        q('aphg-2-1-q5', 'What does carrying capacity describe?', ['The number of countries in a region', 'The maximum population an environment can support', 'The number of births in a year', 'The size of a city'], 1, 'Carrying capacity depends on available resources and environmental limits.', 'Think resources supporting a population.'),
      ],
    ),

    lesson(
      'aphg-2-2',
      '2.2',
      'Population Composition and Change',
      'A population pyramid can tell you what a country may need in the future.',
      'Population composition describes who lives in a place. Population change is affected by births, deaths, and migration.',
      'three-blocks',
      'Read population pyramids by comparing age groups and the shape of the population.',
      [
        concept('Population pyramid', 'A graph showing a population by age and sex.'),
        concept('CBR', 'Crude Birth Rate: births per 1,000 people per year.'),
        concept('CDR', 'Crude Death Rate: deaths per 1,000 people per year.'),
        concept('NIR', 'Natural Increase Rate: birth rate minus death rate, converted to a percentage.'),
        concept('TFR', 'Total Fertility Rate: average number of children a woman is expected to have.'),
        concept('IMR', 'Infant Mortality Rate: infant deaths per 1,000 live births.', 'red'),
        concept('Dependency ratio', 'Compares dependents, usually young and elderly people, with the working-age population.', 'yellow'),
      ],
      {
        title: 'Birth rate vs. fertility rate',
        detail: 'CBR counts births per 1,000 people in a year. TFR estimates the average number of children per woman.',
      },
      {
        problem: 'A country has a CBR of 30 and a CDR of 10 per 1,000 people.',
        steps: [
          'Subtract the CDR from the CBR.',
          '30 − 10 = 20 per 1,000.',
          'Convert to a percentage by dividing by 10.',
        ],
        answer: 'NIR = 2% (before migration)',
      },
      [
        'Wide pyramid base = many young people and likely rapid growth.',
        'Narrow base = fewer young people and possible decline.',
        'CBR = births per 1,000.',
        'CDR = deaths per 1,000.',
        'NIR = (CBR − CDR) ÷ 10.',
        'TFR = average children per woman.',
        'IMR = infant deaths per 1,000 live births.',
      ],
      [
        { front: 'What does a population pyramid show?', back: 'Population by age and sex.' },
        { front: 'What is CBR?', back: 'Births per 1,000 people per year.' },
        { front: 'What is TFR?', back: 'The average number of children a woman is expected to have.' },
        { front: 'What does a wide pyramid base suggest?', back: 'A large young population and possible rapid growth.' },
      ],
      [
        q('aphg-2-2-q1', 'What does a population pyramid display?', ['Land area and climate', 'Age and sex composition', 'Political boundaries', 'Languages'], 1, 'Population pyramids show age groups and sex.', 'Look at the two sides and age bands.'),
        q('aphg-2-2-q2', 'CBR measures:', ['Deaths per 1,000', 'Births per 1,000', 'Children per woman', 'Infant deaths per 100'], 1, 'Crude Birth Rate counts births per 1,000 people each year.', 'CBR begins with birth.'),
        q('aphg-2-2-q3', 'A country has CBR 24 and CDR 8. What is its NIR?', ['0.8%', '1.6%', '2.4%', '3.2%'], 1, '(24 − 8) ÷ 10 = 1.6%.', 'Subtract, then divide by 10.'),
        q('aphg-2-2-q4', 'What does TFR measure?', ['Births per 1,000 people', 'Average children per woman', 'Deaths per 1,000 people', 'People per square mile'], 1, 'TFR estimates the average number of children per woman.', 'TFR is a fertility measure.'),
        q('aphg-2-2-q5', 'A population pyramid with a very wide base usually suggests:', ['A large elderly population only', 'A high share of young people', 'No population growth', 'No births'], 1, 'A wide base represents many children and often high birth rates.', 'The bottom of the pyramid represents the youngest ages.'),
      ],
    ),

    lesson(
      'aphg-2-3',
      '2.3',
      'Demographic Transition and Migration',
      'Countries often change their birth and death rates as they develop.',
      'The Demographic Transition Model explains changes in birth rates and death rates. Migration explains why people move between places.',
      'flowchart',
      'DTM stages move from high birth and death rates to low birth and death rates. Migration adds or removes people from a population.',
      [
        concept('DTM Stage 1', 'High birth rate and high death rate; little long-term growth.'),
        concept('DTM Stage 2', 'Death rate falls while birth rate stays high; rapid growth.'),
        concept('DTM Stage 3', 'Birth rate falls; population growth slows.'),
        concept('DTM Stage 4', 'Low birth rate and low death rate; population is relatively stable.'),
        concept('DTM Stage 5', 'Birth rates may remain below death rates; population can decline.', 'yellow'),
        concept('Malthusian theory', 'Thomas Malthus argued that population could grow faster than food supply.'),
        concept('Push factor', 'A condition that encourages people to leave a place.'),
        concept('Pull factor', 'A condition that attracts people to a new place.', 'green'),
        concept('Forced migration', 'Movement where people are compelled to leave, such as by conflict or persecution.'),
        concept('Voluntary migration', 'Movement based mainly on personal choice, such as seeking work or education.'),
      ],
      {
        title: 'DTM Stage 2 vs. Stage 3',
        detail: 'Stage 2 has a falling death rate but still-high birth rate. Stage 3 has a falling birth rate too, so growth slows.',
      },
      {
        problem: 'A country has falling death rates, high birth rates, and very rapid population growth.',
        steps: [
          'Death rates are falling.',
          'Birth rates are still high.',
          'That pattern matches Stage 2.',
        ],
        answer: 'DTM Stage 2',
      },
      [
        'Stage 1: high birth, high death.',
        'Stage 2: death falls, rapid growth.',
        'Stage 3: birth falls, slower growth.',
        'Stage 4: low birth, low death.',
        'Stage 5: possible natural decrease.',
        'Malthus warned population could outgrow food supply.',
        'Push = makes people leave; pull = attracts people.',
        'Forced = compelled; voluntary = chosen.',
      ],
      [
        { front: 'What happens in DTM Stage 2?', back: 'Death rates fall while birth rates remain high, causing rapid growth.' },
        { front: 'What happens in DTM Stage 3?', back: 'Birth rates begin to fall and population growth slows.' },
        { front: 'What did Malthus argue?', back: 'Population could grow faster than food production.' },
        { front: 'What is a push factor?', back: 'A condition that encourages people to leave a place.' },
        { front: 'What is a pull factor?', back: 'A condition that attracts people to a place.' },
      ],
      [
        q('aphg-2-3-q1', 'Which DTM stage has falling death rates and high birth rates?', ['Stage 1', 'Stage 2', 'Stage 4', 'Stage 5'], 1, 'Stage 2 has improved survival while birth rates remain high.', 'Stage 2 is the rapid-growth stage.'),
        q('aphg-2-3-q2', 'In which DTM stage do birth rates begin to fall?', ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 5 only'], 2, 'Stage 3 is marked by declining birth rates.', 'Stage 3 slows population growth.'),
        q('aphg-2-3-q3', 'What was Malthus concerned about?', ['Too many political borders', 'Population growing faster than food supply', 'The spread of languages', 'The number of map projections'], 1, 'Malthus believed population growth could exceed food production.', 'Connect Malthus with population and food.'),
        q('aphg-2-3-q4', 'A drought causes people to leave their homes. The drought is a:', ['Pull factor', 'Push factor', 'Functional region', 'Intervening opportunity'], 1, 'A drought makes the original location less attractive and pushes people away.', 'Push means it drives people out.'),
        q('aphg-2-3-q5', 'A person moves to another country because of a job offer. This is usually:', ['Forced migration', 'Voluntary migration', 'Internal migration only', 'Forced displacement'], 1, 'Choosing to move for employment is generally voluntary migration.', 'A personal job choice is voluntary.'),
      ],
    ),
  ],
}

// UNIT 3: CULTURAL PATTERNS AND PROCESSES

export const aphgUnit3: Unit = {
  id: 'aphg-unit-3',
  number: 3,
  title: 'Cultural Patterns and Processes',
  lessons: [
    lesson(
      'aphg-3-1',
      '3.1',
      'Folk Culture and Popular Culture',
      'A local tradition and a worldwide trend spread in different ways.',
      'Culture includes shared beliefs, customs, and practices. Folk culture is often local, while popular culture spreads widely.',
      'three-blocks',
      'Compare the scale, spread, and origins of folk culture and popular culture.',
      [
        concept('Culture', 'Shared beliefs, values, customs, and practices.'),
        concept('Folk culture', 'Traditions usually practiced by smaller, often close-knit groups.'),
        concept('Popular culture', 'Cultural practices and products spread widely across large populations.'),
        concept('Cultural landscape', 'The visible features of a place shaped by human culture.'),
        concept('Material culture', 'Physical objects created and used by a culture.', 'green'),
        concept('Nonmaterial culture', 'Beliefs, values, language, and customs.', 'yellow'),
      ],
      {
        title: 'Folk does not mean old-fashioned',
        detail: 'Folk culture is often local and tied to tradition. Popular culture is widespread. The difference is how culture is practiced and spread, not whether it is good or bad.',
      },
      {
        problem: 'A small mountain community passes down a traditional dance through generations.',
        steps: [
          'The dance is tied to a local community.',
          'It is passed down through generations.',
          'This is an example of folk culture.',
        ],
        answer: 'Folk culture',
      },
      [
        'Culture = shared way of life.',
        'Folk culture = local and traditional.',
        'Popular culture = widespread.',
        'Material culture = physical objects.',
        'Nonmaterial culture = ideas and beliefs.',
        'Cultural landscape = visible human changes to a place.',
      ],
      [
        { front: 'What is folk culture?', back: 'Local traditions often passed down through generations.' },
        { front: 'What is popular culture?', back: 'Cultural practices and products spread widely.' },
        { front: 'What is material culture?', back: 'Physical objects made or used by a culture.' },
        { front: 'What is a cultural landscape?', back: 'Visible features of a place shaped by human activity and culture.' },
      ],
      [
        q('aphg-3-1-q1', 'A tradition practiced mainly by a small local community is usually:', ['Popular culture', 'Folk culture', 'Globalization', 'Assimilation'], 1, 'Folk culture is often local and passed through generations.', 'Local tradition points to folk culture.'),
        q('aphg-3-1-q2', 'Which is an example of popular culture?', ['A worldwide music trend', 'A family recipe used in one village', 'A local ceremony', 'A language spoken by one isolated group'], 0, 'Popular culture spreads across large populations.', 'Worldwide spread points to popular culture.'),
        q('aphg-3-1-q3', 'Which is material culture?', ['A belief about family', 'A language', 'A traditional building', 'A religious value'], 2, 'A building is a physical object and part of the cultural landscape.', 'Material means physical.'),
        q('aphg-3-1-q4', 'Which is nonmaterial culture?', ['A traditional tool', 'A house', 'A belief system', 'A road'], 2, 'Beliefs and values are nonmaterial.', 'Nonmaterial means ideas, beliefs, and customs.'),
        q('aphg-3-1-q5', 'What is a cultural landscape?', ['A map projection', 'Visible features shaped by culture', 'A population pyramid', 'A political boundary only'], 1, 'Buildings, roads, and religious structures can show cultural influence.', 'Think about what culture leaves on the land.'),
      ],
    ),

    lesson(
      'aphg-3-2',
      '3.2',
      'Cultural Diffusion',
      'A trend can spread because people move, copy others, or change an idea.',
      'Diffusion is the spread of ideas and cultural traits from one place or group to another.',
      'flowchart',
      'Compare relocation, contagious, hierarchical, and stimulus diffusion.',
      [
        concept('Cultural diffusion', 'The spread of cultural ideas, traits, or practices.'),
        concept('Relocation diffusion', 'A trait spreads because people move and bring it with them.'),
        concept('Contagious diffusion', 'A trait spreads quickly from person to person or place to place.'),
        concept('Hierarchical diffusion', 'A trait spreads from important people or places to others.'),
        concept('Stimulus diffusion', 'An idea spreads, but people change or adapt it.', 'yellow'),
        concept('Acculturation', 'A group adopts some traits of another culture while keeping parts of its original culture.', 'green'),
        concept('Assimilation', 'A group becomes more absorbed into another culture and may lose distinct traits.', 'red'),
      ],
      {
        title: 'Stimulus vs. contagious diffusion',
        detail: 'Contagious diffusion spreads through direct contact. Stimulus diffusion spreads an idea that is changed to fit a new culture.',
      },
      {
        problem: 'A fast-food company opens in another country, but changes its menu to fit local food preferences.',
        steps: [
          'The original idea spreads to a new place.',
          'The idea is changed to fit local culture.',
          'This is stimulus diffusion.',
        ],
        answer: 'Stimulus diffusion',
      },
      [
        'Diffusion = spread of cultural traits.',
        'Relocation = people move and bring culture.',
        'Contagious = spreads person to person.',
        'Hierarchical = spreads from influential people or places.',
        'Stimulus = idea spreads but is changed.',
        'Acculturation = adopts some traits, keeps some original traits.',
        'Assimilation = becomes more absorbed into another culture.',
      ],
      [
        { front: 'What is relocation diffusion?', back: 'People move and bring cultural traits with them.' },
        { front: 'What is contagious diffusion?', back: 'A trait spreads through direct contact from person to person.' },
        { front: 'What is hierarchical diffusion?', back: 'A trait spreads from influential people or places to others.' },
        { front: 'What is stimulus diffusion?', back: 'An idea spreads but is changed or adapted.' },
        { front: 'How is assimilation different from acculturation?', back: 'Assimilation involves becoming more absorbed into another culture; acculturation involves adopting some traits while retaining others.' },
      ],
      [
        q('aphg-3-2-q1', 'People move to a new country and bring their language with them. This is:', ['Contagious diffusion', 'Relocation diffusion', 'Hierarchical diffusion', 'Stimulus diffusion'], 1, 'The people physically move and carry the cultural trait.', 'People moving = relocation.'),
        q('aphg-3-2-q2', 'A dance trend spreads quickly between friends at school. This is:', ['Relocation diffusion', 'Contagious diffusion', 'Stimulus diffusion', 'Assimilation'], 1, 'The trend spreads through direct contact.', 'Person-to-person spread = contagious.'),
        q('aphg-3-2-q3', 'A fashion trend begins with celebrities and then spreads to the public. This is:', ['Hierarchical diffusion', 'Relocation diffusion', 'Stimulus diffusion', 'Forced migration'], 0, 'The trend spreads from influential people to others.', 'Influential people = hierarchical.'),
        q('aphg-3-2-q4', 'A food idea spreads to a new country but is changed to match local tastes. This is:', ['Contagious diffusion', 'Relocation diffusion', 'Stimulus diffusion', 'Assimilation'], 2, 'The original idea is adapted in the new location.', 'Changed idea = stimulus.'),
        q('aphg-3-2-q5', 'A group adopts some outside cultural traits but keeps many original traditions. This is:', ['Assimilation', 'Acculturation', 'Gerrymandering', 'Global scale'], 1, 'Acculturation allows a group to retain parts of its original culture.', 'Some adoption, some retention = acculturation.'),
      ],
    ),

    lesson(
      'aphg-3-3',
      '3.3',
      'Language and Religion',
      'Language and religion help explain cultural patterns across the world.',
      'Languages and religions spread through migration, trade, conquest, and other forms of cultural diffusion.',
      'three-blocks',
      'Organize languages into families and compare universalizing and ethnic religions.',
      [
        concept('Language family', 'A group of languages that developed from a common ancestral language.'),
        concept('Indo-European', 'A major language family that includes English, Spanish, Hindi, and many others.'),
        concept('Lingua franca', 'A common language used by people who speak different native languages.'),
        concept('Universalizing religion', 'A religion that seeks converts and is open to people from many backgrounds.'),
        concept('Ethnic religion', 'A religion closely connected to a particular ethnic group or place.'),
        concept('Monotheism', 'Belief in one god.', 'green'),
        concept('Polytheism', 'Belief in multiple gods.', 'yellow'),
      ],
      {
        title: 'Universalizing vs. ethnic religion',
        detail: 'Universalizing religions seek followers across different groups. Ethnic religions are more closely tied to a specific people or place.',
      },
      {
        problem: 'A religion actively seeks converts around the world and is practiced by people from many backgrounds.',
        steps: [
          'The religion is not limited to one ethnic group.',
          'It seeks followers in many places.',
          'This describes a universalizing religion.',
        ],
        answer: 'Universalizing religion',
      },
      [
        'Language families share an ancestral language.',
        'Indo-European includes English, Spanish, and Hindi.',
        'Lingua franca = shared communication language.',
        'Universalizing religions seek converts.',
        'Ethnic religions are tied closely to a people or place.',
        'Monotheism = one god.',
        'Polytheism = multiple gods.',
      ],
      [
        { front: 'What is a language family?', back: 'Languages that developed from a common ancestral language.' },
        { front: 'What is a lingua franca?', back: 'A shared language used by people with different native languages.' },
        { front: 'What is a universalizing religion?', back: 'A religion that seeks converts and followers from many backgrounds.' },
        { front: 'What is an ethnic religion?', back: 'A religion closely tied to a particular ethnic group or place.' },
        { front: 'What is monotheism?', back: 'Belief in one god.' },
      ],
      [
        q('aphg-3-3-q1', 'English, Spanish, and Hindi belong to which major language family?', ['Sino-Tibetan', 'Indo-European', 'Niger-Congo', 'Austronesian'], 1, 'These languages are part of the Indo-European family.', 'Remember the Indo-European examples.'),
        q('aphg-3-3-q2', 'What is a lingua franca?', ['A language used only at home', 'A shared language used by different language groups', 'A language with no speakers', 'A religious boundary'], 1, 'A lingua franca helps people with different native languages communicate.', 'Think shared communication.'),
        q('aphg-3-3-q3', 'Which type of religion seeks converts around the world?', ['Ethnic', 'Universalizing', 'Local-only', 'Ancestral language'], 1, 'Universalizing religions seek followers from many backgrounds.', 'Universalizing = open to all groups.'),
        q('aphg-3-3-q4', 'A religion closely tied to one ethnic group is:', ['Universalizing', 'Ethnic', 'A lingua franca', 'A language family'], 1, 'Ethnic religions are closely connected to a specific people or place.', 'Ethnic = connected to an ethnic group.'),
        q('aphg-3-3-q5', 'Belief in multiple gods is called:', ['Monotheism', 'Polytheism', 'Assimilation', 'Diffusion'], 1, 'Poly means many, so polytheism means belief in multiple gods.', 'Mono = one; poly = many.'),
      ],
    ),
  ],
}

// UNIT 4: POLITICAL PATTERNS AND PROCESSES

export const aphgUnit4: Unit = {
  id: 'aphg-unit-4',
  number: 4,
  title: 'Political Patterns and Processes',
  lessons: [
    lesson(
      'aphg-4-1',
      '4.1',
      'States, Nations, and Boundaries',
      'A nation and a country are not always the same thing.',
      'Political geography studies states, nations, borders, and how political power is organized across space.',
      'three-blocks',
      'Compare states, nations, nation-states, and multinational states.',
      [
        concept('State', 'A political area with a defined territory, permanent population, government, and recognition.'),
        concept('Nation', 'A group of people connected by shared culture, history, or identity.'),
        concept('Nation-state', 'A state whose borders mostly match one nation.'),
        concept('Multinational state', 'A state containing multiple nations or cultural groups.'),
        concept('Stateless nation', 'A nation that does not have its own independent state.'),
        concept('Sovereignty', 'The authority of a state to govern itself.', 'green'),
        concept('Boundary', 'A line that separates political areas.', 'yellow'),
      ],
      {
        title: 'Nation vs. state',
        detail: 'A state is a political territory. A nation is a group of people with a shared identity. A nation can exist without its own state.',
      },
      {
        problem: 'A cultural group shares language and history but does not control an independent country.',
        steps: [
          'The group shares a common identity.',
          'It does not have its own independent state.',
          'This is a stateless nation.',
        ],
        answer: 'Stateless nation',
      },
      [
        'State = political territory and government.',
        'Nation = people with shared identity.',
        'Nation-state = one nation mostly matches one state.',
        'Multinational state = multiple nations in one state.',
        'Stateless nation = nation without its own state.',
        'Sovereignty = authority to govern.',
      ],
      [
        { front: 'What is a state?', back: 'A political area with territory, population, government, and recognition.' },
        { front: 'What is a nation?', back: 'A group connected by shared culture, history, or identity.' },
        { front: 'What is a nation-state?', back: 'A state whose borders mostly match one nation.' },
        { front: 'What is a stateless nation?', back: 'A nation without its own independent state.' },
        { front: 'What is sovereignty?', back: 'A state’s authority to govern itself.' },
      ],
      [
        q('aphg-4-1-q1', 'Which term describes a political area with a government and defined territory?', ['Nation', 'State', 'Ethnic religion', 'Vernacular region'], 1, 'A state has territory, population, government, and recognition.', 'Political territory = state.'),
        q('aphg-4-1-q2', 'A group of people connected by shared culture and identity is a:', ['State', 'Nation', 'Boundary', 'Province'], 1, 'A nation is based on shared identity.', 'People and identity = nation.'),
        q('aphg-4-1-q3', 'A nation that does not have its own independent state is called:', ['Nation-state', 'Multinational state', 'Stateless nation', 'Federal state'], 2, 'A stateless nation has a shared identity without its own state.', 'No independent state = stateless nation.'),
        q('aphg-4-1-q4', 'What does sovereignty mean?', ['The ability to speak many languages', 'Authority to govern independently', 'A type of migration', 'A map projection'], 1, 'Sovereignty is the authority of a state to govern itself.', 'Think political control.'),
        q('aphg-4-1-q5', 'A country containing several distinct nations is a:', ['Multinational state', 'Nation-state', 'Stateless nation', 'Formal region'], 0, 'A multinational state contains multiple nations or cultural groups.', 'Multiple nations inside one state.'),
      ],
    ),

    lesson(
      'aphg-4-2',
      '4.2',
      'Maritime Boundaries and Political Control',
      'Countries can claim control over parts of the ocean.',
      'Countries have maritime zones that define their rights over nearby ocean waters and resources.',
      'three-blocks',
      'Measure maritime zones outward from a country’s coastal baseline.',
      [
        concept('Territorial sea', 'Extends up to 12 nautical miles from a coastal baseline.'),
        concept('Exclusive Economic Zone (EEZ)', 'Extends up to 200 nautical miles; the coastal state has special rights to resources.'),
        concept('Contiguous zone', 'Extends up to 24 nautical miles from the baseline.'),
        concept('UNCLOS', 'United Nations Convention on the Law of the Sea; sets rules for ocean use and maritime zones.'),
        concept('Maritime boundary', 'A boundary dividing ocean areas between states.', 'yellow'),
      ],
      {
        title: '12 nautical miles vs. 200 nautical miles',
        detail: 'The territorial sea reaches 12 nautical miles. The EEZ can reach 200 nautical miles. Do not switch these numbers.',
      },
      {
        problem: 'A fishing company wants to know where a coastal country has special rights to marine resources.',
        steps: [
          'The question is about resource rights.',
          'The relevant maritime zone extends up to 200 nautical miles.',
          'That zone is the EEZ.',
        ],
        answer: 'Exclusive Economic Zone (EEZ)',
      },
      [
        'UNCLOS sets rules for ocean use.',
        'Territorial sea = up to 12 nautical miles.',
        'Contiguous zone = up to 24 nautical miles.',
        'EEZ = up to 200 nautical miles.',
        'EEZ gives special resource rights, not complete ownership of the ocean.',
      ],
      [
        { front: 'What does UNCLOS regulate?', back: 'International rules for ocean use and maritime boundaries.' },
        { front: 'How far does the territorial sea extend?', back: 'Up to 12 nautical miles from the baseline.' },
        { front: 'How far can an EEZ extend?', back: 'Up to 200 nautical miles from the baseline.' },
        { front: 'What rights does an EEZ provide?', back: 'Special rights to explore, manage, and use marine resources.' },
      ],
      [
        q('aphg-4-2-q1', 'Which agreement sets many international rules for ocean use?', ['NATO', 'UNCLOS', 'NAFTA', 'The DTM'], 1, 'UNCLOS is the United Nations Convention on the Law of the Sea.', 'Connect UNCLOS with ocean law.'),
        q('aphg-4-2-q2', 'How far does the territorial sea extend?', ['12 nautical miles', '24 nautical miles', '100 nautical miles', '200 nautical miles'], 0, 'The territorial sea extends up to 12 nautical miles.', 'Territorial sea = 12.'),
        q('aphg-4-2-q3', 'How far can an EEZ extend?', ['12 nautical miles', '24 nautical miles', '100 nautical miles', '200 nautical miles'], 3, 'An EEZ can extend up to 200 nautical miles.', 'EEZ = 200.'),
        q('aphg-4-2-q4', 'What is a major right provided by an EEZ?', ['Complete ownership of all international waters', 'Special rights to marine resources', 'The right to control every ship worldwide', 'The right to change another country’s borders'], 1, 'The coastal state has special rights to explore and use resources in its EEZ.', 'Think fishing, energy, and other marine resources.'),
        q('aphg-4-2-q5', 'How far does the contiguous zone extend?', ['12 nautical miles', '24 nautical miles', '100 nautical miles', '200 nautical miles'], 1, 'The contiguous zone extends up to 24 nautical miles from the baseline.', 'Contiguous zone = 24.'),
      ],
    ),

    lesson(
      'aphg-4-3',
      '4.3',
      'Electoral Geography and Political Forces',
      'The way voting districts are drawn can affect election results.',
      'Political geography also studies how political power is organized and how boundaries can affect representation.',
      'flowchart',
      'Compare gerrymandering methods and the forces that unite or divide a state.',
      [
        concept('Gerrymandering', 'Drawing electoral district boundaries to benefit a political group.'),
        concept('Packing', 'Concentrating opposing voters into a small number of districts.'),
        concept('Cracking', 'Splitting opposing voters across several districts to reduce their influence.'),
        concept('Centripetal force', 'A force that unites people and strengthens a state.', 'green'),
        concept('Centrifugal force', 'A force that divides people and can weaken a state.', 'red'),
        concept('Federal state', 'A state where power is shared between national and regional governments.'),
        concept('Unitary state', 'A state where most political power is held by the central government.'),
      ],
      {
        title: 'Packing vs. cracking',
        detail: 'Packing puts many opposing voters into a few districts. Cracking spreads them across many districts so they have less influence in each one.',
      },
      {
        problem: 'A district map divides one group of voters across several districts so they cannot form a majority in any of them.',
        steps: [
          'The voters are being split apart.',
          'The goal is to reduce their voting influence.',
          'This is cracking.',
        ],
        answer: 'Cracking',
      },
      [
        'Gerrymandering = drawing districts for political advantage.',
        'Packing = put opposing voters together.',
        'Cracking = split opposing voters apart.',
        'Centripetal = brings a state together.',
        'Centrifugal = pulls a state apart.',
        'Federal = power shared.',
        'Unitary = central government holds most power.',
      ],
      [
        { front: 'What is gerrymandering?', back: 'Drawing electoral districts to benefit a political group.' },
        { front: 'What is packing?', back: 'Concentrating opposing voters into a small number of districts.' },
        { front: 'What is cracking?', back: 'Splitting opposing voters across several districts.' },
        { front: 'What is a centripetal force?', back: 'A force that unites people and strengthens a state.' },
        { front: 'What is a centrifugal force?', back: 'A force that divides people and can weaken a state.' },
      ],
      [
        q('aphg-4-3-q1', 'What is gerrymandering?', ['Drawing districts for political advantage', 'Moving people to another country', 'Creating a language family', 'Changing a map projection'], 0, 'Gerrymandering manipulates electoral boundaries for political benefit.', 'Think election district maps.'),
        q('aphg-4-3-q2', 'Putting many opposing voters into a few districts is:', ['Cracking', 'Packing', 'Assimilation', 'Diffusion'], 1, 'Packing concentrates opposing voters in fewer districts.', 'Packing = putting voters together.'),
        q('aphg-4-3-q3', 'Splitting opposing voters across several districts is:', ['Packing', 'Cracking', 'Relocation', 'Sovereignty'], 1, 'Cracking divides a group to reduce its influence in each district.', 'Cracking = splitting apart.'),
        q('aphg-4-3-q4', 'Which is an example of a centripetal force?', ['A shared national identity', 'A separatist movement', 'A civil conflict', 'Strong regional divisions'], 0, 'A shared identity can unite people and strengthen a state.', 'Centripetal = pulls together.'),
        q('aphg-4-3-q5', 'Which is an example of a centrifugal force?', ['A common language', 'National celebrations', 'A separatist movement', 'Shared national symbols'], 2, 'Separatist movements can divide a state.', 'Centrifugal = pulls apart.'),
      ],
    ),
  ],
}

// UNIT EXAMS
// Each exam uses 10 questions drawn from its unit's lesson quizzes.

const exam = (unit: Unit): Question[] =>
  unit.lessons.flatMap((item) => item.quiz).slice(0, 10)

export const aphgUnitExams: Record<string, Question[]> = {
  'aphg-unit-1': exam(aphgUnit1),
  'aphg-unit-2': exam(aphgUnit2),
  'aphg-unit-3': exam(aphgUnit3),
  'aphg-unit-4': exam(aphgUnit4),
}

// COURSE FINAL: 5 questions from each unit.

export const aphgFinalExam: Question[] = [
  ...aphgUnit1.lessons.flatMap((item) => item.quiz).slice(0, 5),
  ...aphgUnit2.lessons.flatMap((item) => item.quiz).slice(0, 5),
  ...aphgUnit3.lessons.flatMap((item) => item.quiz).slice(0, 5),
  ...aphgUnit4.lessons.flatMap((item) => item.quiz).slice(0, 5),
].map((question, index) => ({
  ...question,
  id: `aphg-final-${index + 1}`,
}))

export const aphg: Course = {
  id: 'geo',
  number: 5,
  title: 'AP Human Geography',
  short: 'AP HuG',
  zone: 'red',
  units: [aphgUnit1, aphgUnit2, aphgUnit3, aphgUnit4],
}

export default aphg