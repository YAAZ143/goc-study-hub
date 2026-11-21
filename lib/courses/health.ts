import type { Course, Lesson, Question, Unit, Flashcard, DiagramKey } from '@/lib/types'

const fc = (front: string, back: string): Flashcard => ({ front, back })

const q = (
  id: string,
  prompt: string,
  choices: string[],
  answer: number,
  explanation: string,
  fix: string,
): Question => ({ id, prompt, choices, answer, explanation, fix })

const makeLesson = (lesson: Lesson): Lesson => lesson

// ─── UNIT 1: PERSONAL CARE & DISEASE PREVENTION ───

export const healthUnit1: Unit = {
  id: 'health-unit-1',
  number: 1,
  title: 'Personal Care & Disease Prevention',
  lessons: [
    makeLesson({
      id: 'health-u1-l1',
      number: '1.1',
      title: 'Health Triangle & Risk Factors',
      hook: 'Health is more than just not being sick. It includes your body, mind, and relationships.',
      eli12: 'The health triangle has three sides: physical, mental/emotional, and social health. When one side is struggling, it can affect the others.',
      diagram: 'three-blocks',
      diagramCaption: 'The three sides of health work together.',
      concepts: [
        { term: 'Physical Health', color: 'green', detail: 'How well your body works. It includes sleep, exercise, nutrition, hygiene, and medical care.' },
        { term: 'Mental/Emotional Health', color: 'cobalt', detail: 'How you think, feel, handle stress, and manage emotions.' },
        { term: 'Social Health', color: 'yellow', detail: 'How you communicate, build relationships, and get along with others.' },
        { term: 'Risk Factor', color: 'red', detail: 'Anything that increases the chance of a health problem.' },
        { term: 'Protective Factor', color: 'green', detail: 'Something that lowers risk or helps protect your health.' },
      ],
      trap: {
        title: 'Do not mix up the three sides',
        detail: 'Playing a sport is physical health. Managing stress is mental/emotional health. Having supportive friendships is social health.',
      },
      example: {
        problem: 'A student gets enough sleep, talks to a trusted friend about stress, and spends time with family.',
        steps: [
          'Getting enough sleep supports physical health.',
          'Talking about stress supports mental/emotional health.',
          'Spending time with family supports social health.',
        ],
        answer: 'All three sides of the health triangle are being supported.',
      },
      cheatSheet: [
        'Physical = body',
        'Mental/emotional = thoughts and feelings',
        'Social = relationships',
        'Risk factors increase the chance of health problems.',
        'Protective factors help lower risk.',
      ],
      flashcards: [
        fc('What are the three sides of the health triangle?', 'Physical, mental/emotional, and social health.'),
        fc('What is physical health?', 'How well your body works and how you care for it.'),
        fc('What is mental/emotional health?', 'How you think, feel, and manage emotions.'),
        fc('What is social health?', 'How you communicate and build relationships.'),
        fc('What is a risk factor?', 'Something that increases the chance of a health problem.'),
        fc('What is a protective factor?', 'Something that lowers risk or helps protect your health.'),
      ],
      quiz: [
        q('h-u1-l1-q1', 'Which is an example of physical health?', ['Building friendships', 'Getting enough sleep', 'Managing anger', 'Communicating clearly'], 1, 'Sleep helps your body rest and recover.', 'Physical health is about the body.'),
        q('h-u1-l1-q2', 'Which part of the health triangle includes managing stress?', ['Physical', 'Social', 'Mental/emotional', 'Environmental'], 2, 'Managing stress is part of mental and emotional health.', 'Think about thoughts and feelings.'),
        q('h-u1-l1-q3', 'A supportive group of friends mainly helps which side of the triangle?', ['Social', 'Physical', 'Financial', 'Environmental'], 0, 'Friendships and relationships are part of social health.', 'Social health focuses on relationships.'),
        q('h-u1-l1-q4', 'What is a risk factor?', ['Something that always causes illness', 'Something that increases the chance of a health problem', 'A type of medicine', 'A way to prevent all diseases'], 1, 'Risk factors increase the chance of a problem but do not guarantee it.', 'Remember: risk means increased chance.'),
        q('h-u1-l1-q5', 'Which is a protective factor?', ['Avoiding all trusted adults', 'Getting very little sleep', 'Having supportive relationships', 'Ignoring health concerns'], 2, 'Supportive relationships can help protect health.', 'Protective factors help lower risk.'),
      ],
    }),
    makeLesson({
      id: 'health-u1-l2',
      number: '1.2',
      title: 'Communicable vs Non-Communicable Diseases & Pathogens',
      hook: 'Some diseases can spread from one person to another. Others cannot.',
      eli12: 'Communicable diseases are infectious and can spread. Non-communicable diseases do not spread from person to person.',
      diagram: 'three-blocks',
      diagramCaption: 'Communicable diseases can spread; non-communicable diseases cannot.',
      concepts: [
        { term: 'Communicable Disease', color: 'red', detail: 'A disease that can spread between people or through other sources, such as contaminated food or water.' },
        { term: 'Non-Communicable Disease', color: 'cobalt', detail: 'A disease that does not spread from person to person.' },
        { term: 'Pathogen', color: 'red', detail: 'A germ or microorganism that can cause disease.' },
        { term: 'Bacteria', color: 'yellow', detail: 'Single-celled organisms. Some are helpful, while others can cause infections.' },
        { term: 'Virus', color: 'yellow', detail: 'A tiny infectious agent that needs living cells to make more copies of itself.' },
        { term: 'Fungus', color: 'yellow', detail: 'An organism that can cause infections, such as some skin infections.' },
      ],
      trap: {
        title: 'Not every disease is contagious',
        detail: 'Diabetes and many forms of cancer are non-communicable. A cold and the flu are communicable.',
      },
      example: {
        problem: 'Classify the common cold and diabetes.',
        steps: [
          'The common cold is caused by a virus and can spread between people.',
          'Diabetes does not spread from one person to another.',
          'The cold is communicable; diabetes is non-communicable.',
        ],
        answer: 'Common cold = communicable. Diabetes = non-communicable.',
      },
      cheatSheet: [
        'Communicable = can spread.',
        'Non-communicable = does not spread person to person.',
        'Pathogen = disease-causing germ or microorganism.',
        'Bacteria, viruses, and fungi can cause some diseases.',
        'Handwashing and safe food handling can reduce the spread of germs.',
      ],
      flashcards: [
        fc('What is a communicable disease?', 'A disease that can spread between people or through other sources.'),
        fc('What is a non-communicable disease?', 'A disease that does not spread from person to person.'),
        fc('What is a pathogen?', 'A germ or microorganism that can cause disease.'),
        fc('What is one difference between bacteria and viruses?', 'Bacteria are living single-celled organisms; viruses need living cells to make copies.'),
        fc('Give an example of a communicable disease.', 'The common cold or flu.'),
        fc('Give an example of a non-communicable disease.', 'Diabetes.'),
      ],
      quiz: [
        q('h-u1-l2-q1', 'Which disease is communicable?', ['Diabetes', 'The common cold', 'A broken bone', 'A genetic condition'], 1, 'The common cold is caused by a virus and can spread.', 'Communicable means it can spread.'),
        q('h-u1-l2-q2', 'Which statement describes a non-communicable disease?', ['It always spreads through air', 'It is caused only by bacteria', 'It does not spread from person to person', 'It can only affect children'], 2, 'Non-communicable diseases do not spread from person to person.', 'Focus on whether it spreads.'),
        q('h-u1-l2-q3', 'What is a pathogen?', ['A disease-causing germ or microorganism', 'A type of vitamin', 'A health habit', 'A body organ'], 0, 'Pathogens are agents that can cause disease.', 'A pathogen can cause an infection.'),
        q('h-u1-l2-q4', 'Which statement about bacteria is correct?', ['All bacteria cause disease', 'Some bacteria are helpful and some can cause illness', 'Bacteria are always viruses', 'Bacteria cannot live outside humans'], 1, 'Many bacteria are harmless or helpful, while some cause infections.', 'Do not assume all bacteria are harmful.'),
        q('h-u1-l2-q5', 'Which action helps reduce the spread of communicable diseases?', ['Sharing drinking cups', 'Skipping handwashing', 'Washing hands regularly', 'Using someone else’s toothbrush'], 2, 'Handwashing helps remove germs and lower the chance of spreading them.', 'Choose a habit that reduces germs.'),
      ],
    }),
    makeLesson({
      id: 'health-u1-l3',
      number: '1.3',
      title: 'Immune System, Vaccines & Preventive Care',
      hook: 'Your body has a defense system that helps protect you from germs.',
      eli12: 'The immune system recognizes harmful germs and works to fight them. Vaccines help your immune system prepare for certain diseases.',
      diagram: 'flowchart',
      diagramCaption: 'A vaccine helps the immune system prepare to recognize a pathogen.',
      concepts: [
        { term: 'Immune System', color: 'green', detail: 'The body system that helps defend against pathogens and infections.' },
        { term: 'Antibody', color: 'cobalt', detail: 'A protein made by the immune system that recognizes a specific target, such as part of a pathogen.' },
        { term: 'Vaccine', color: 'green', detail: 'A preparation that trains the immune system to recognize a disease without requiring the person to experience the disease itself.' },
        { term: 'Immunity', color: 'yellow', detail: 'Protection against a particular disease or infection.' },
        { term: 'Preventive Care', color: 'green', detail: 'Health steps taken to prevent illness or find problems early.' },
      ],
      trap: {
        title: 'Vaccines are not treatments for every illness',
        detail: 'Vaccines help prevent certain diseases by preparing the immune system. They do not cure every infection or protect against every pathogen.',
      },
      example: {
        problem: 'How can a vaccine help protect someone from a disease?',
        steps: [
          'The vaccine exposes the immune system to a safe form or piece of a target pathogen.',
          'The immune system learns to recognize that target.',
          'If the person encounters the pathogen later, the immune system may respond faster.',
        ],
        answer: 'Vaccines help the immune system prepare to recognize and fight specific diseases.',
      },
      cheatSheet: [
        'Immune system = body defense system.',
        'Antibodies recognize specific targets.',
        'Vaccines train the immune system.',
        'Preventive care helps prevent illness or find problems early.',
        'Follow guidance from healthcare professionals about vaccines and checkups.',
      ],
      flashcards: [
        fc('What is the immune system?', 'The body system that helps defend against pathogens and infections.'),
        fc('What is an antibody?', 'A protein made by the immune system that recognizes a specific target.'),
        fc('What does a vaccine do?', 'It helps train the immune system to recognize a particular disease.'),
        fc('What is immunity?', 'Protection against a particular disease or infection.'),
        fc('What is preventive care?', 'Steps taken to prevent illness or find health problems early.'),
        fc('Do vaccines protect against every disease?', 'No. Each vaccine is designed to protect against specific diseases.'),
      ],
      quiz: [
        q('h-u1-l3-q1', 'What is the main job of the immune system?', ['Digest food', 'Help defend the body against pathogens', 'Move bones', 'Control body temperature only'], 1, 'The immune system helps protect the body from infections.', 'Think of the immune system as the body’s defense system.'),
        q('h-u1-l3-q2', 'What is an antibody?', ['A type of bone', 'A digestive enzyme', 'A protein that recognizes a specific target', 'A type of vaccine'], 2, 'Antibodies recognize specific targets, including parts of pathogens.', 'Antibodies are made by the immune system.'),
        q('h-u1-l3-q3', 'How do vaccines help?', ['They replace the immune system', 'They prepare the immune system to recognize a disease', 'They cure every disease', 'They prevent all infections'], 1, 'Vaccines help the immune system prepare for specific diseases.', 'Vaccines train; they do not protect against everything.'),
        q('h-u1-l3-q4', 'Which is an example of preventive care?', ['Ignoring a health concern', 'Sharing personal hygiene items', 'Getting recommended checkups', 'Avoiding all medical advice'], 2, 'Checkups can help prevent problems or find them early.', 'Preventive care happens before a problem becomes serious.'),
        q('h-u1-l3-q5', 'Which statement about immunity is correct?', ['It means protection against a disease', 'It means a person can never get sick', 'It only comes from exercise', 'It protects against every pathogen'], 0, 'Immunity provides protection against a particular disease or infection.', 'Immunity is not protection from every illness.'),
      ],
    }),
  ],
}

// ─── UNIT 2: NUTRITION ───

export const healthUnit2: Unit = {
  id: 'health-unit-2',
  number: 2,
  title: 'Nutrition',
  lessons: [
    makeLesson({
      id: 'health-u2-l1',
      number: '2.1',
      title: '6 Essential Nutrients & Macro Calories 4/4/9',
      hook: 'Food gives your body energy and materials it needs to work and grow.',
      eli12: 'The six essential nutrients are carbohydrates, proteins, fats, vitamins, minerals, and water. Carbs and protein provide about 4 calories per gram, while fat provides about 9.',
      diagram: 'three-blocks',
      diagramCaption: 'The six nutrient groups have different jobs in the body.',
      concepts: [
        { term: 'Carbohydrates', color: 'yellow', detail: 'The body’s main source of energy. They provide about 4 calories per gram.' },
        { term: 'Protein', color: 'green', detail: 'Helps build and repair body tissues. It provides about 4 calories per gram.' },
        { term: 'Fats', color: 'red', detail: 'Provide stored energy, help protect organs, and help the body absorb certain vitamins. They provide about 9 calories per gram.' },
        { term: 'Vitamins', color: 'cobalt', detail: 'Help regulate body processes and support normal growth and health.' },
        { term: 'Minerals', color: 'cobalt', detail: 'Help with functions such as building bones and supporting nerves and muscles.' },
        { term: 'Water', color: 'green', detail: 'Helps regulate temperature, transport substances, and support many body functions.' },
      ],
      trap: {
        title: 'Remember 4 / 4 / 9',
        detail: 'Carbohydrates = 4 calories per gram. Protein = 4 calories per gram. Fat = 9 calories per gram. Vitamins, minerals, and water do not provide calories.',
      },
      example: {
        problem: 'How many calories come from 10 grams of carbohydrates and 5 grams of fat?',
        steps: [
          'Carbohydrates: 10 × 4 = 40 calories.',
          'Fat: 5 × 9 = 45 calories.',
          'Add them: 40 + 45 = 85 calories.',
        ],
        answer: '85 calories total.',
      },
      cheatSheet: [
        'Six nutrients: carbohydrates, protein, fats, vitamins, minerals, water.',
        'Carbs = 4 calories per gram.',
        'Protein = 4 calories per gram.',
        'Fat = 9 calories per gram.',
        'Vitamins, minerals, and water do not provide calories.',
      ],
      flashcards: [
        fc('What are the six essential nutrients?', 'Carbohydrates, proteins, fats, vitamins, minerals, and water.'),
        fc('How many calories are in 1 gram of carbohydrates?', 'About 4 calories.'),
        fc('How many calories are in 1 gram of protein?', 'About 4 calories.'),
        fc('How many calories are in 1 gram of fat?', 'About 9 calories.'),
        fc('Which nutrient helps build and repair tissues?', 'Protein.'),
        fc('Which nutrient helps regulate body temperature?', 'Water.'),
      ],
      quiz: [
        q('h-u2-l1-q1', 'Which list contains all six essential nutrients?', ['Carbs, protein, fat, vitamins, minerals, water', 'Sugar, salt, fiber, caffeine, water, fat', 'Protein, oxygen, sunlight, minerals, water, sugar', 'Carbs, protein, fiber, salt, water, oxygen'], 0, 'The six groups are carbohydrates, protein, fats, vitamins, minerals, and water.', 'Memorize the six nutrient groups.'),
        q('h-u2-l1-q2', 'How many calories does 1 gram of fat provide?', ['4', '7', '9', '12'], 2, 'Fat provides about 9 calories per gram.', 'The macro pattern is 4 / 4 / 9.'),
        q('h-u2-l1-q3', 'Which nutrient is the body’s main source of energy?', ['Vitamins', 'Carbohydrates', 'Minerals', 'Water'], 1, 'Carbohydrates are the body’s main energy source.', 'Think of carbs as the main quick energy source.'),
        q('h-u2-l1-q4', 'How many calories are in 8 grams of protein?', ['16', '24', '32', '72'], 2, '8 × 4 = 32 calories.', 'Multiply grams of protein by 4.'),
        q('h-u2-l1-q5', 'Which nutrient helps build and repair body tissues?', ['Protein', 'Water', 'Vitamins', 'Carbohydrates'], 0, 'Protein helps build and repair tissues.', 'Think about growth and tissue repair.'),
      ],
    }),
    makeLesson({
      id: 'health-u2-l2',
      number: '2.2',
      title: 'Reading FDA Nutrition Facts Labels & 5%/20% DV Rule',
      hook: 'A Nutrition Facts label helps you understand what is in a serving of food.',
      eli12: 'Start with the serving size. Then check calories and nutrients. The 5% and 20% Daily Value rule helps you quickly tell whether a nutrient amount is low or high.',
      diagram: 'three-blocks',
      diagramCaption: 'Check serving size first, then use the label to compare nutrients.',
      concepts: [
        { term: 'Serving Size', color: 'red', detail: 'The amount of food or drink the nutrition information is based on.' },
        { term: 'Calories', color: 'yellow', detail: 'A measure of the energy food provides.' },
        { term: 'Daily Value (DV)', color: 'cobalt', detail: 'A guide showing how much a nutrient in one serving contributes to a daily diet.' },
        { term: '5% DV', color: 'green', detail: 'About 5% DV or less is considered low for a nutrient.' },
        { term: '20% DV', color: 'yellow', detail: 'About 20% DV or more is considered high for a nutrient.' },
      ],
      trap: {
        title: 'Serving size comes first',
        detail: 'If you eat two servings, you usually get twice the listed calories and nutrients. The label is based on one serving unless it says otherwise.',
      },
      example: {
        problem: 'A food label lists 10% DV of calcium and 25% DV of sodium. What does that tell you?',
        steps: [
          '10% DV of calcium is between 5% and 20%.',
          '25% DV of sodium is at least 20%.',
          'The sodium amount is high by the 5%/20% rule.',
        ],
        answer: 'Calcium is neither low nor high by the quick rule; sodium is high.',
      },
      cheatSheet: [
        'Check serving size first.',
        'Calories show energy per serving.',
        '5% DV or less = low.',
        '20% DV or more = high.',
        'Use the label to compare foods and nutrients.',
      ],
      flashcards: [
        fc('What should you check first on a Nutrition Facts label?', 'The serving size.'),
        fc('What does % Daily Value show?', 'How much a nutrient in one serving contributes to a daily diet.'),
        fc('What does 5% DV or less mean?', 'The nutrient amount is low.'),
        fc('What does 20% DV or more mean?', 'The nutrient amount is high.'),
        fc('If you eat two servings, what happens to the listed calories?', 'You generally consume twice the calories listed for one serving.'),
        fc('What do calories measure?', 'The energy food provides.'),
      ],
      quiz: [
        q('h-u2-l2-q1', 'What should you look at first on a Nutrition Facts label?', ['The serving size', 'The vitamins', 'The brand name', 'The package color'], 0, 'All the listed nutrition information is based on the serving size.', 'Start with the amount the label calls one serving.'),
        q('h-u2-l2-q2', 'What does 5% DV or less usually mean?', ['High', 'Low', 'Average', 'Zero calories'], 1, 'The quick label rule considers 5% DV or less low.', '5 is low; 20 is high.'),
        q('h-u2-l2-q3', 'What does 20% DV or more usually mean?', ['Low', 'No nutrients', 'High', 'No calories'], 2, 'The quick label rule considers 20% DV or more high.', 'Remember the 20% high rule.'),
        q('h-u2-l2-q4', 'A snack has 150 calories per serving. You eat two servings. How many calories is that?', ['150', '200', '250', '300'], 3, '150 × 2 = 300 calories.', 'Multiply the amount per serving by the number of servings.'),
        q('h-u2-l2-q5', 'What does % Daily Value help you understand?', ['The package price', 'How much a nutrient contributes to a daily diet', 'How long food takes to cook', 'How many ingredients are in the food'], 1, '% DV shows the contribution of a nutrient in one serving.', 'It is a nutrient comparison guide.'),
      ],
    }),
    makeLesson({
      id: 'health-u2-l3',
      number: '2.3',
      title: 'Caloric Balance & Hydration',
      hook: 'Your body uses energy all day, even when you are resting.',
      eli12: 'Caloric balance compares energy taken in from food and drinks with energy used by the body. Hydration means having enough water for the body to work properly.',
      diagram: 'three-blocks',
      diagramCaption: 'Energy intake and energy use both matter; water supports body functions.',
      concepts: [
        { term: 'Caloric Balance', color: 'cobalt', detail: 'The relationship between calories consumed and calories used by the body.' },
        { term: 'Energy Intake', color: 'yellow', detail: 'Energy the body gets from foods and drinks.' },
        { term: 'Energy Use', color: 'green', detail: 'Energy the body uses for basic functions, movement, and daily activities.' },
        { term: 'Hydration', color: 'green', detail: 'Having enough fluid for the body to function well.' },
        { term: 'Dehydration', color: 'red', detail: 'A condition that happens when the body loses more fluid than it takes in.' },
      ],
      trap: {
        title: 'Energy is used even at rest',
        detail: 'Your body uses energy for breathing, circulation, and other basic functions, even when you are not exercising.',
      },
      example: {
        problem: 'Why does drinking water matter during a hot day or physical activity?',
        steps: [
          'The body loses water through sweat and other normal processes.',
          'Water helps regulate body temperature and supports body functions.',
          'Replacing lost fluids helps maintain hydration.',
        ],
        answer: 'Water helps the body regulate temperature and function properly.',
      },
      cheatSheet: [
        'Energy intake = calories from food and drinks.',
        'Energy use = calories used by the body.',
        'The body uses energy even while resting.',
        'Hydration means having enough fluid.',
        'Water needs can change with heat, activity, and individual needs.',
      ],
      flashcards: [
        fc('What is caloric balance?', 'The relationship between calories consumed and calories used.'),
        fc('What is energy intake?', 'Energy the body gets from food and drinks.'),
        fc('What is energy use?', 'Energy the body uses for basic functions and activities.'),
        fc('What is hydration?', 'Having enough fluid for the body to function properly.'),
        fc('What is dehydration?', 'When the body loses more fluid than it takes in.'),
        fc('Does your body use energy while resting?', 'Yes. It uses energy for breathing, circulation, and other basic functions.'),
      ],
      quiz: [
        q('h-u2-l3-q1', 'What is caloric balance?', ['The relationship between energy consumed and energy used', 'The amount of water in a bottle', 'The number of vitamins in food', 'The time spent sleeping'], 0, 'Caloric balance compares energy intake with energy use.', 'Think calories in compared with calories used.'),
        q('h-u2-l3-q2', 'Which is an example of energy use?', ['Calories in a meal', 'Energy used for breathing', 'The serving size on a label', 'The amount of water in a glass'], 1, 'The body uses energy for basic functions such as breathing.', 'Energy use happens even when resting.'),
        q('h-u2-l3-q3', 'What does hydration mean?', ['Avoiding all drinks', 'Having enough fluid for the body to function', 'Eating only fruits', 'Getting more sleep'], 1, 'Hydration means having enough fluid in the body.', 'Water supports many body functions.'),
        q('h-u2-l3-q4', 'What is dehydration?', ['Having too much energy', 'Having too many vitamins', 'Losing more fluid than the body takes in', 'Getting enough sleep'], 2, 'Dehydration happens when fluid loss is greater than fluid intake.', 'Think about the body losing more water than it replaces.'),
        q('h-u2-l3-q5', 'When might someone need to pay extra attention to hydration?', ['During hot weather and physical activity', 'Only while sleeping', 'Only during winter', 'Never'], 0, 'Heat and activity can increase fluid loss.', 'Sweating means the body is losing fluid.'),
      ],
    }),
  ],
}

// ─── UNIT 3: SUBSTANCE ABUSE ───

export const healthUnit3: Unit = {
  id: 'health-unit-3',
  number: 3,
  title: 'Substance Abuse',
  lessons: [
    makeLesson({
      id: 'health-u3-l1',
      number: '3.1',
      title: 'Drug Classifications: Depressants, Stimulants, Opioids & Hallucinogens',
      hook: 'Different substances affect the brain and body in different ways.',
      eli12: 'Drug classifications describe common effects substances can have on the central nervous system. These categories help explain why substances can affect alertness, pain, and perception.',
      diagram: 'three-blocks',
      diagramCaption: 'Different drug groups can affect the central nervous system in different ways.',
      concepts: [
        { term: 'Depressants', color: 'yellow', detail: 'Substances that slow activity in the central nervous system. Some can cause drowsiness and slower reactions.' },
        { term: 'Stimulants', color: 'red', detail: 'Substances that increase activity in the central nervous system and can increase alertness and heart rate.' },
        { term: 'Opioids', color: 'red', detail: 'A class of drugs used in some medical settings for pain. They can also cause dependence and dangerous breathing problems.' },
        { term: 'Hallucinogens', color: 'cobalt', detail: 'Substances that can change perception, thoughts, or the way a person experiences their surroundings.' },
        { term: 'Central Nervous System', color: 'green', detail: 'The brain and spinal cord. It helps control thoughts, movement, and many body functions.' },
      ],
      trap: {
        title: 'A medical use does not mean no risk',
        detail: 'Some substances have medical uses when prescribed and monitored by a healthcare professional. Taking them without medical direction can be dangerous.',
      },
      example: {
        problem: 'A health question describes a substance that slows brain activity and causes drowsiness. Which category fits?',
        steps: [
          'The description says the substance slows central nervous system activity.',
          'Depressants slow activity in the central nervous system.',
          'Match the description to the category.',
        ],
        answer: 'Depressant.',
      },
      cheatSheet: [
        'Depressants = slow central nervous system activity.',
        'Stimulants = increase central nervous system activity.',
        'Opioids = pain-relieving drug class with serious risks.',
        'Hallucinogens = can change perception.',
        'Never take medication that was not prescribed to you.',
      ],
      flashcards: [
        fc('What do depressants do?', 'They slow activity in the central nervous system.'),
        fc('What do stimulants do?', 'They increase activity in the central nervous system.'),
        fc('What are opioids?', 'A class of drugs used in some medical settings for pain, with risks including dependence and breathing problems.'),
        fc('What can hallucinogens affect?', 'Perception, thoughts, and the way a person experiences their surroundings.'),
        fc('What makes up the central nervous system?', 'The brain and spinal cord.'),
        fc('Why should someone only use medication as directed?', 'Misuse can cause serious health problems, including dangerous effects on the brain and body.'),
      ],
      quiz: [
        q('h-u3-l1-q1', 'Which drug category slows activity in the central nervous system?', ['Stimulants', 'Depressants', 'Hallucinogens', 'Vitamins'], 1, 'Depressants slow central nervous system activity.', 'The word depressant connects to slowing activity.'),
        q('h-u3-l1-q2', 'Which category increases activity in the central nervous system?', ['Depressants', 'Opioids', 'Stimulants', 'Hallucinogens'], 2, 'Stimulants increase central nervous system activity.', 'Stimulants can increase alertness and heart rate.'),
        q('h-u3-l1-q3', 'Which category can change a person’s perception?', ['Hallucinogens', 'Minerals', 'Antibiotics', 'Vitamins'], 0, 'Hallucinogens can change perception and experiences.', 'Look for the category connected to perception.'),
        q('h-u3-l1-q4', 'What makes up the central nervous system?', ['Heart and lungs', 'Stomach and intestines', 'Bones and muscles', 'Brain and spinal cord'], 3, 'The central nervous system consists of the brain and spinal cord.', 'It is the main control system of the body.'),
        q('h-u3-l1-q5', 'What is the safest approach to prescription medication?', ['Share it with friends', 'Take it only as directed by a healthcare professional', 'Take more if it seems slow', 'Use someone else’s prescription'], 1, 'Medication should only be used as directed for the person it was prescribed to.', 'Prescriptions are specific to the patient and situation.'),
      ],
    }),
    makeLesson({
      id: 'health-u3-l2',
      number: '3.2',
      title: 'Nicotine, Vaping & Marijuana Effects on Teen Brain',
      hook: 'The brain continues developing through the teen years, so substances can affect it in important ways.',
      eli12: 'Nicotine is addictive and can affect attention, learning, mood, and brain development. Vaping can expose the lungs and body to harmful substances. Marijuana can affect memory, attention, coordination, and judgment.',
      diagram: 'three-blocks',
      diagramCaption: 'Nicotine, vaping products, and marijuana can affect the developing brain and body.',
      concepts: [
        { term: 'Nicotine', color: 'red', detail: 'An addictive substance found in tobacco products and many vaping products. It can affect the developing teen brain.' },
        { term: 'Vaping', color: 'red', detail: 'Using an electronic device to inhale an aerosol. The aerosol may contain nicotine and other harmful substances.' },
        { term: 'Addiction', color: 'red', detail: 'A condition involving difficulty controlling substance use even when it causes harm.' },
        { term: 'Marijuana/Cannabis', color: 'yellow', detail: 'A substance that can affect memory, attention, coordination, reaction time, and judgment.' },
        { term: 'Brain Development', color: 'cobalt', detail: 'The brain continues changing and developing during adolescence and into young adulthood.' },
      ],
      trap: {
        title: 'Vapor is not just harmless water',
        detail: 'Vaping aerosol can contain nicotine, tiny particles, and other substances. A product being flavored does not make it safe.',
      },
      example: {
        problem: 'Why can nicotine be especially concerning for teenagers?',
        steps: [
          'The teen brain is still developing.',
          'Nicotine is addictive and can affect brain systems involved in attention, learning, and mood.',
          'This can make nicotine use especially risky during adolescence.',
        ],
        answer: 'Nicotine can affect a developing brain and can lead to addiction.',
      },
      cheatSheet: [
        'Nicotine is addictive.',
        'Many vaping products contain nicotine.',
        'Vaping aerosol is not harmless water vapor.',
        'Marijuana can affect memory, attention, coordination, and judgment.',
        'The brain continues developing during the teen years.',
      ],
      flashcards: [
        fc('What is nicotine?', 'An addictive substance found in tobacco and many vaping products.'),
        fc('Why is nicotine risky for teens?', 'It can affect the developing brain and lead to addiction.'),
        fc('Is vaping aerosol just harmless water vapor?', 'No. It can contain nicotine, particles, and other harmful substances.'),
        fc('What is one possible effect of marijuana?', 'It can affect memory, attention, coordination, reaction time, or judgment.'),
        fc('Does the brain continue developing during adolescence?', 'Yes. Brain development continues through the teen years and into young adulthood.'),
        fc('What is addiction?', 'Difficulty controlling substance use even when it causes harm.'),
      ],
      quiz: [
        q('h-u3-l2-q1', 'Why is nicotine especially concerning for teenagers?', ['It improves memory permanently', 'The brain is still developing and nicotine is addictive', 'It contains essential nutrients', 'It has no effect on the brain'], 1, 'Nicotine can affect the developing brain and lead to addiction.', 'Remember that brain development continues during adolescence.'),
        q('h-u3-l2-q2', 'Which statement about vaping aerosol is correct?', ['It is always just water vapor', 'It contains only oxygen', 'It may contain nicotine and other harmful substances', 'It cannot affect the lungs'], 2, 'Vaping aerosol can contain nicotine, particles, and other substances.', 'Vapor does not mean harmless.'),
        q('h-u3-l2-q3', 'Which ability can marijuana affect?', ['Memory and attention', 'Hair color', 'Height overnight', 'Blood type'], 0, 'Marijuana can affect memory, attention, coordination, and judgment.', 'Think about brain functions.'),
        q('h-u3-l2-q4', 'What does addiction involve?', ['Always being healthy', 'Never feeling stressed', 'Having difficulty controlling substance use despite harm', 'Using only vitamins'], 2, 'Addiction involves difficulty controlling use even when it causes problems.', 'The key idea is loss of control despite harm.'),
        q('h-u3-l2-q5', 'Which statement is true about teen brain development?', ['It ends in early childhood', 'It continues during adolescence and into young adulthood', 'It stops during sleep', 'It is not affected by substances'], 1, 'The brain continues developing through adolescence and into young adulthood.', 'Teen brain development is still underway.'),
      ],
    }),
    makeLesson({
      id: 'health-u3-l3',
      number: '3.3',
      title: 'Addiction Cycle & Peer Refusal Skills',
      hook: 'Knowing how to respond to pressure can help you make choices that match your values and safety.',
      eli12: 'Addiction can involve repeated substance use, cravings, and difficulty stopping. Refusal skills help someone say no clearly, leave an unsafe situation, and get support.',
      diagram: 'flowchart',
      diagramCaption: 'A clear refusal, leaving, and getting support are useful ways to respond to pressure.',
      concepts: [
        { term: 'Addiction Cycle', color: 'red', detail: 'A repeating pattern that can involve cravings, substance use, temporary effects, and continued use despite harm.' },
        { term: 'Craving', color: 'yellow', detail: 'A strong desire or urge to use a substance.' },
        { term: 'Peer Pressure', color: 'yellow', detail: 'Influence from people in the same age or social group to act a certain way.' },
        { term: 'Refusal Skill', color: 'green', detail: 'A communication strategy used to say no to something unsafe or unwanted.' },
        { term: 'Support System', color: 'cobalt', detail: 'Trusted people and services that can help someone make safe choices or get help.' },
      ],
      trap: {
        title: 'You do not need to argue',
        detail: 'A short, firm no is enough. You can repeat it, leave, contact someone you trust, or ask an adult for help.',
      },
      example: {
        problem: 'A friend pressures someone to try a vaping product. What is a safe response?',
        steps: [
          'Say no clearly: “No, I do not want to.”',
          'Do not feel that you need to explain or argue.',
          'Leave the situation if the pressure continues.',
          'Contact a trusted adult if help is needed.',
        ],
        answer: 'Use a clear refusal, leave if needed, and get support from a trusted person.',
      },
      cheatSheet: [
        'Addiction can involve cravings and continued use despite harm.',
        'Peer pressure is influence from others in your social group.',
        'Say no clearly and confidently.',
        'Leave an unsafe situation.',
        'Ask a trusted adult for help when needed.',
      ],
      flashcards: [
        fc('What is a craving?', 'A strong desire or urge to use a substance.'),
        fc('What is peer pressure?', 'Influence from people in the same age or social group to act a certain way.'),
        fc('What is a refusal skill?', 'A strategy for saying no to something unsafe or unwanted.'),
        fc('Name one useful refusal skill.', 'Say no clearly, give a short reason, suggest another activity, or leave.'),
        fc('What is a support system?', 'Trusted people and services that can help someone.'),
        fc('What should someone do if pressure continues?', 'Leave the situation and contact a trusted adult or another safe support person.'),
      ],
      quiz: [
        q('h-u3-l3-q1', 'What is peer pressure?', ['A type of vitamin', 'Influence from people in your social group', 'A medical checkup', 'A kind of exercise'], 1, 'Peer pressure is influence from people in the same age or social group.', 'Think about influence from friends or classmates.'),
        q('h-u3-l3-q2', 'Which is an example of a refusal skill?', ['Agreeing to avoid an argument', 'Staying in an unsafe situation', 'Clearly saying no and leaving', 'Keeping pressure a secret'], 2, 'A clear no and leaving are useful refusal skills.', 'Choose a response that protects safety.'),
        q('h-u3-l3-q3', 'What is a craving?', ['A strong urge to use a substance', 'A type of vaccine', 'A healthy meal', 'A kind of friendship'], 0, 'A craving is a strong desire or urge.', 'Cravings can be part of addiction.'),
        q('h-u3-l3-q4', 'What is a good choice if someone keeps pressuring you?', ['Stay and argue for a long time', 'Give in to the pressure', 'Keep it secret from everyone', 'Leave and contact a trusted person'], 3, 'Leaving and getting support can help keep someone safe.', 'You do not have to handle pressure alone.'),
        q('h-u3-l3-q5', 'What can an addiction cycle involve?', ['Cravings and continued use despite harm', 'Only one use with no effects', 'A guaranteed improvement in health', 'A normal sleep schedule'], 0, 'Addiction can involve cravings and repeated use even when it causes harm.', 'Look for the pattern of continued use despite problems.'),
      ],
    }),
  ],
}

// ─── UNIT 4: MENTAL & EMOTIONAL HEALTH ───

export const healthUnit4: Unit = {
  id: 'health-unit-4',
  number: 4,
  title: 'Mental & Emotional Health',
  lessons: [
    makeLesson({
      id: 'health-u4-l1',
      number: '4.1',
      title: 'Stress Response: Eustress vs Distress & Coping',
      hook: 'Stress is a normal response to challenges. The goal is learning healthy ways to handle it.',
      eli12: 'Eustress is positive stress that can motivate someone. Distress is negative stress that feels difficult to manage. Healthy coping skills can help with both.',
      diagram: 'three-blocks',
      diagramCaption: 'Stress can be motivating or overwhelming, and coping skills can help.',
      concepts: [
        { term: 'Stress', color: 'yellow', detail: 'The body and mind’s response to a demand, challenge, or change.' },
        { term: 'Eustress', color: 'green', detail: 'Positive stress that can motivate or help someone focus on a challenge.' },
        { term: 'Distress', color: 'red', detail: 'Negative stress that can feel overwhelming or difficult to manage.' },
        { term: 'Stress Response', color: 'cobalt', detail: 'The body’s physical and mental reaction to a stressful situation.' },
        { term: 'Coping Skills', color: 'green', detail: 'Healthy actions used to manage stress, such as taking breaks, talking to someone, or organizing tasks.' },
      ],
      trap: {
        title: 'Not all stress is the same',
        detail: 'A little stress before a performance can help someone prepare. Stress that feels overwhelming or lasts a long time may need extra support.',
      },
      example: {
        problem: 'A student feels motivated to prepare for a presentation. What type of stress might this be?',
        steps: [
          'The student feels pressure because of an upcoming challenge.',
          'The pressure is helping the student prepare.',
          'Positive, motivating stress is called eustress.',
        ],
        answer: 'Eustress.',
      },
      cheatSheet: [
        'Stress = response to a challenge or demand.',
        'Eustress = positive or motivating stress.',
        'Distress = negative or overwhelming stress.',
        'Coping skills help manage stress.',
        'Ask for support if stress becomes difficult to manage.',
      ],
      flashcards: [
        fc('What is stress?', 'The body and mind’s response to a demand, challenge, or change.'),
        fc('What is eustress?', 'Positive stress that can motivate someone.'),
        fc('What is distress?', 'Negative stress that can feel overwhelming.'),
        fc('What are coping skills?', 'Healthy actions used to manage stress.'),
        fc('Name one healthy coping skill.', 'Taking a break, talking to someone trusted, or organizing tasks.'),
        fc('When should someone seek extra support?', 'When stress feels overwhelming, lasts a long time, or affects daily life.'),
      ],
      quiz: [
        q('h-u4-l1-q1', 'What is eustress?', ['Positive stress that can motivate someone', 'Stress that is always harmful', 'A disease', 'A type of medication'], 0, 'Eustress is positive stress that can help someone focus or prepare.', 'The prefix helps connect it with positive stress.'),
        q('h-u4-l1-q2', 'What is distress?', ['A type of exercise', 'Negative stress that can feel overwhelming', 'A healthy meal', 'A kind of friendship'], 1, 'Distress is negative stress that can be difficult to manage.', 'Distress is the more difficult form of stress.'),
        q('h-u4-l1-q3', 'Which is a healthy coping skill?', ['Ignoring every problem', 'Keeping all feelings secret', 'Talking with a trusted person', 'Avoiding sleep'], 2, 'Talking with someone trusted can help manage stress.', 'Choose a safe, healthy way to handle stress.'),
        q('h-u4-l1-q4', 'What is the stress response?', ['The body and mind’s reaction to a stressful situation', 'The amount of food eaten', 'A type of vaccine', 'A measure of physical strength'], 0, 'The stress response is how the body and mind react to a challenge.', 'It includes both physical and mental reactions.'),
        q('h-u4-l1-q5', 'When may someone need extra support for stress?', ['When stress affects daily life or feels overwhelming', 'Whenever they have one busy day', 'Only when they are alone', 'Never'], 0, 'Ongoing or overwhelming stress can be a reason to talk to a trusted adult or professional.', 'Getting support is a healthy response.'),
      ],
    }),
    makeLesson({
      id: 'health-u4-l2',
      number: '4.2',
      title: 'Anxiety, Depression & Eating Disorders',
      hook: 'Mental health is part of overall health, and people deserve support when they are struggling.',
      eli12: 'Anxiety disorders and depression are real health conditions. Eating disorders are also serious conditions that affect a person’s health and relationship with food. They are not character flaws or choices.',
      diagram: 'three-blocks',
      diagramCaption: 'Mental health conditions can affect thoughts, feelings, behavior, and daily life.',
      concepts: [
        { term: 'Anxiety Disorder', color: 'yellow', detail: 'A mental health condition involving ongoing or intense fear or worry that can interfere with daily life.' },
        { term: 'Depression', color: 'cobalt', detail: 'A mental health condition that can affect mood, interest, energy, sleep, concentration, and daily activities.' },
        { term: 'Eating Disorder', color: 'red', detail: 'A serious mental and physical health condition involving difficulties with eating, food, or body-related thoughts.' },
        { term: 'Mental Health Professional', color: 'green', detail: 'A trained person, such as a counselor, psychologist, or psychiatrist, who helps with mental health needs.' },
        { term: 'Treatment', color: 'green', detail: 'Support and care that can help someone manage a health condition. Treatment depends on the person and condition.' },
      ],
      trap: {
        title: 'Mental health conditions are not personal failures',
        detail: 'Anxiety, depression, and eating disorders are health conditions. A person should not be blamed or judged for experiencing them.',
      },
      example: {
        problem: 'A student has ongoing worry that is interfering with school and daily activities. What is a helpful next step?',
        steps: [
          'Recognize that ongoing worry affecting daily life deserves attention.',
          'Talk with a trusted adult, such as a parent, guardian, or school counselor.',
          'A qualified health professional can help decide what support may be useful.',
        ],
        answer: 'Talk to a trusted adult and seek guidance from a qualified health professional.',
      },
      cheatSheet: [
        'Anxiety disorders involve ongoing or intense fear or worry.',
        'Depression can affect mood, interest, energy, and daily life.',
        'Eating disorders are serious mental and physical health conditions.',
        'Mental health conditions are not character flaws.',
        'Trusted adults and qualified professionals can help.',
      ],
      flashcards: [
        fc('What is an anxiety disorder?', 'A mental health condition involving ongoing or intense fear or worry that can interfere with daily life.'),
        fc('What is depression?', 'A mental health condition that can affect mood, interest, energy, sleep, and daily activities.'),
        fc('What is an eating disorder?', 'A serious condition involving difficulties with eating, food, or body-related thoughts.'),
        fc('Are mental health conditions character flaws?', 'No. They are health conditions, not personal failures.'),
        fc('Who can help with mental health concerns?', 'A trusted adult, school counselor, or qualified mental health professional.'),
        fc('Can mental health conditions be treated?', 'Yes. Support and treatment can help, and the right approach depends on the person.'),
      ],
      quiz: [
        q('h-u4-l2-q1', 'Which statement about anxiety disorders is correct?', ['They are always a choice', 'They involve ongoing or intense fear or worry that can affect daily life', 'They only affect adults', 'They cannot be treated'], 1, 'Anxiety disorders can involve intense or ongoing worry that interferes with daily life.', 'Look for the effect on everyday activities.'),
        q('h-u4-l2-q2', 'Which can be affected by depression?', ['Mood and energy', 'Only hair color', 'Only height', 'Blood type'], 0, 'Depression can affect mood, interest, energy, sleep, and concentration.', 'Depression can affect several parts of daily life.'),
        q('h-u4-l2-q3', 'Which statement about eating disorders is true?', ['They are not real health conditions', 'They only affect one age group', 'They are serious mental and physical health conditions', 'They are always easy to recognize'], 2, 'Eating disorders are serious conditions that can affect mental and physical health.', 'Treat them as health conditions, not choices.'),
        q('h-u4-l2-q4', 'What is a helpful response when someone is struggling with mental health?', ['Make fun of them', 'Tell them to hide it', 'Ignore them', 'Listen without judgment and help them reach a trusted adult'], 3, 'Listening without judgment and helping someone find support can make it easier to get help.', 'Choose support, not blame.'),
        q('h-u4-l2-q5', 'Who is trained to help with mental health concerns?', ['A mental health professional', 'A random online commenter', 'A classmate with no training', 'A person selling supplements'], 0, 'Qualified professionals are trained to assess and support mental health needs.', 'Look for trained, trusted support.'),
      ],
    }),
    makeLesson({
      id: 'health-u4-l3',
      number: '4.3',
      title: 'Warning Signs, Stigma & 988 Lifeline',
      hook: 'Noticing when someone needs support can help them connect with help sooner.',
      eli12: 'Changes in mood, behavior, or daily routines can be signs that someone is struggling. Stigma makes it harder to ask for help. In the United States, 988 connects people with crisis support.',
      diagram: 'flowchart',
      diagramCaption: 'Notice changes, listen without judgment, and connect the person with support.',
      concepts: [
        { term: 'Warning Sign', color: 'yellow', detail: 'A change in mood, behavior, or daily functioning that may show someone needs support.' },
        { term: 'Stigma', color: 'red', detail: 'Negative beliefs or unfair treatment toward people because of a health condition.' },
        { term: '988 Lifeline', color: 'green', detail: 'A free, confidential crisis support service in the United States available by call or text at 988.' },
        { term: 'Trusted Adult', color: 'cobalt', detail: 'A responsible adult a young person feels safe talking to, such as a parent, guardian, teacher, or counselor.' },
        { term: 'Active Listening', color: 'green', detail: 'Giving someone your attention, listening carefully, and responding respectfully.' },
      ],
      trap: {
        title: 'Do not promise to keep a safety concern secret',
        detail: 'If someone may be in danger or needs urgent help, tell a trusted adult or contact emergency support. Getting help matters more than keeping a secret.',
      },
      example: {
        problem: 'A friend says they are overwhelmed and need help. What can you do?',
        steps: [
          'Listen calmly and take what they say seriously.',
          'Avoid judging, teasing, or dismissing their feelings.',
          'Encourage them to speak with a trusted adult or counselor.',
          'If there is immediate danger, get an adult and contact emergency services.',
        ],
        answer: 'Listen, take the concern seriously, and help connect them with support.',
      },
      cheatSheet: [
        'Warning signs can include major changes in mood, behavior, or daily routines.',
        'Stigma means unfair beliefs or treatment about a health condition.',
        'Listen without judgment.',
        'Tell a trusted adult when someone needs help.',
        'In the U.S., call or text 988 for crisis support.',
        'For immediate danger, call 911.',
      ],
      flashcards: [
        fc('What is a warning sign?', 'A change in mood, behavior, or daily functioning that may show someone needs support.'),
        fc('What is stigma?', 'Negative beliefs or unfair treatment toward people because of a health condition.'),
        fc('What is the 988 Lifeline?', 'A free, confidential crisis support service in the United States.'),
        fc('How can someone contact 988?', 'By calling or texting 988 in the United States.'),
        fc('What is active listening?', 'Giving someone attention, listening carefully, and responding respectfully.'),
        fc('What should you do if someone may be in immediate danger?', 'Get a trusted adult and contact emergency services by calling 911.'),
      ],
      quiz: [
        q('h-u4-l3-q1', 'What is stigma?', ['A type of exercise', 'Unfair beliefs or treatment toward people because of a health condition', 'A kind of medicine', 'A health checkup'], 1, 'Stigma involves negative beliefs or unfair treatment.', 'Think about judgment or unfair treatment.'),
        q('h-u4-l3-q2', 'What number can people in the U.S. call or text for crisis support?', ['211', '411', '988', '611'], 2, 'The 988 Lifeline provides crisis support by call or text.', 'Remember 988 for crisis support.'),
        q('h-u4-l3-q3', 'Which is an example of active listening?', ['Interrupting and judging', 'Ignoring the person', 'Changing the subject immediately', 'Listening carefully and responding respectfully'], 3, 'Active listening means giving someone attention and responding respectfully.', 'Choose the response that shows you are listening.'),
        q('h-u4-l3-q4', 'What should you do if a friend may be in immediate danger?', ['Keep it secret', 'Get a trusted adult and contact emergency services', 'Wait several days', 'Post about it online'], 1, 'Immediate danger requires help from a trusted adult and emergency services.', 'Safety concerns should not be kept secret.'),
        q('h-u4-l3-q5', 'Which can be a warning sign that someone needs support?', ['A major change in mood or daily behavior', 'Wearing a different shirt', 'Trying a new hobby', 'Reading a book'], 0, 'Major changes in mood, behavior, or daily functioning can be warning signs.', 'Look for meaningful changes that affect daily life.'),
      ],
    }),
  ],
}

// ─── UNIT 5: SAFETY, FIRST AID & CPR ───

export const healthUnit5: Unit = {
  id: 'health-unit-5',
  number: 5,
  title: 'Safety, First Aid & CPR',
  lessons: [
    makeLesson({
      id: 'health-u5-l1',
      number: '5.1',
      title: 'Check-Call-Care & Good Samaritan Laws',
      hook: 'In an emergency, staying calm and following a simple order can help protect everyone.',
      eli12: 'Check the scene for safety, call for emergency help, and provide care within your training. Good Samaritan laws may protect people who voluntarily help in an emergency, depending on the law and situation.',
      diagram: 'flowchart',
      diagramCaption: 'Check the scene, call for help, and provide care within your training.',
      concepts: [
        { term: 'Check', color: 'yellow', detail: 'Look for danger and check whether the person appears to need help. Do not enter an unsafe scene.' },
        { term: 'Call', color: 'red', detail: 'Call 911 or tell someone specific to call. Give the location and describe the emergency.' },
        { term: 'Care', color: 'green', detail: 'Provide appropriate help within your training and follow the emergency dispatcher’s directions.' },
        { term: 'Good Samaritan Law', color: 'cobalt', detail: 'A law that may protect people who voluntarily provide emergency help in good faith. Rules differ by location.' },
        { term: 'Emergency Dispatcher', color: 'green', detail: 'A trained person who answers emergency calls and can give instructions while help is on the way.' },
      ],
      trap: {
        title: 'Do not put yourself in danger',
        detail: 'Check for hazards before approaching. If the scene is unsafe, stay back and call emergency services.',
      },
      example: {
        problem: 'You see someone who may need help after an accident. What should you do first?',
        steps: [
          'Check the area for hazards before approaching.',
          'If it is safe, call 911 or direct a specific person to call.',
          'Provide appropriate care within your training and follow dispatcher instructions.',
        ],
        answer: 'Check the scene, call for help, and provide care safely.',
      },
      cheatSheet: [
        'Check = make sure the scene is safe.',
        'Call = contact 911 and give clear information.',
        'Care = help within your training.',
        'Follow emergency dispatcher instructions.',
        'Good Samaritan laws vary by location and situation.',
      ],
      flashcards: [
        fc('What does Check-Call-Care mean?', 'Check scene safety, call emergency services, and provide care within your training.'),
        fc('What should you check before approaching someone?', 'Look for hazards that could make the scene unsafe.'),
        fc('What number do you call for an emergency in the U.S.?', '911.'),
        fc('What is a Good Samaritan law?', 'A law that may protect people who voluntarily provide emergency help in good faith.'),
        fc('Should you provide care beyond your training?', 'No. Stay within your training and follow dispatcher instructions.'),
        fc('What can an emergency dispatcher do?', 'They can gather information and give instructions while help is on the way.'),
      ],
      quiz: [
        q('h-u5-l1-q1', 'What is the first step in Check-Call-Care?', ['Care', 'Call', 'Check', 'Leave without looking'], 2, 'Check the scene for safety before approaching.', 'Safety comes first.'),
        q('h-u5-l1-q2', 'What emergency number is used in the United States?', ['311', '911', '411', '988'], 1, '911 is the emergency number in the United States.', 'Use 911 for emergencies requiring immediate response.'),
        q('h-u5-l1-q3', 'What should you do if the scene is unsafe?', ['Run into the scene', 'Ignore the danger', 'Move dangerous objects yourself', 'Stay back and call emergency services'], 3, 'Do not put yourself in danger. Call for trained help.', 'Your safety matters too.'),
        q('h-u5-l1-q4', 'What is the purpose of a Good Samaritan law?', ['To require everyone to perform medical procedures', 'To protect people who voluntarily help in good faith in certain situations', 'To replace emergency services', 'To guarantee that no one can be sued'], 1, 'These laws may offer legal protection, but details vary by location and situation.', 'The protection is not unlimited or identical everywhere.'),
        q('h-u5-l1-q5', 'How should someone provide emergency care?', ['Only within their training and while following instructions', 'By guessing at advanced procedures', 'By ignoring the dispatcher', 'By moving every injured person'], 0, 'Provide appropriate care within your training and follow dispatcher instructions.', 'Do not attempt procedures you have not learned.'),
      ],
    }),
    makeLesson({
      id: 'health-u5-l2',
      number: '5.2',
      title: 'Hands-Only CPR 100–120/min & AED Usage',
      hook: 'CPR and an AED can help in a cardiac emergency while emergency responders are on the way.',
      eli12: 'Hands-only CPR uses chest compressions for an adult or teen who suddenly collapses and is unresponsive and not breathing normally. Call 911, follow dispatcher instructions, and use an AED as soon as one is available.',
      diagram: 'flowchart',
      diagramCaption: 'Call emergency services, start appropriate CPR, and follow the AED voice prompts.',
      concepts: [
        { term: 'CPR', color: 'red', detail: 'Cardiopulmonary resuscitation. It helps keep blood moving when someone is in cardiac arrest.' },
        { term: 'Hands-Only CPR', color: 'green', detail: 'A form of CPR for an adult or teen in cardiac arrest that uses chest compressions without rescue breaths.' },
        { term: 'Compression Rate', color: 'yellow', detail: 'For adult CPR, the recommended chest compression rate is 100–120 compressions per minute.' },
        { term: 'AED', color: 'cobalt', detail: 'An automated external defibrillator. It checks the heart rhythm and may advise a shock when needed.' },
        { term: 'Cardiac Arrest', color: 'red', detail: 'A medical emergency in which the heart suddenly stops pumping blood effectively.' },
      ],
      trap: {
        title: 'An AED gives spoken instructions',
        detail: 'Turn on the AED and follow its prompts. Make sure nobody is touching the person when the device is analyzing or delivering a shock.',
      },
      example: {
        problem: 'An adult suddenly collapses, is unresponsive, and is not breathing normally. What is the general response?',
        steps: [
          'Check that the scene is safe.',
          'Call 911 or direct someone to call and get an AED.',
          'Start CPR by following dispatcher instructions and your training.',
          'Use the AED as soon as it arrives and follow its voice prompts.',
        ],
        answer: 'Call 911, begin CPR, and use an AED as soon as available.',
      },
      cheatSheet: [
        'CPR helps keep blood moving during cardiac arrest.',
        'Hands-only CPR uses chest compressions.',
        'Adult compression rate: 100–120 per minute.',
        'Call 911 and get an AED.',
        'Follow the AED voice prompts and keep clear when instructed.',
        'Take a certified CPR course to learn correct technique.',
      ],
      flashcards: [
        fc('What does CPR stand for?', 'Cardiopulmonary resuscitation.'),
        fc('What is hands-only CPR?', 'CPR using chest compressions without rescue breaths for an adult or teen in cardiac arrest.'),
        fc('What is the recommended adult CPR compression rate?', '100–120 compressions per minute.'),
        fc('What does AED stand for?', 'Automated external defibrillator.'),
        fc('What does an AED do?', 'It checks the heart rhythm and may advise a shock when needed.'),
        fc('What should you do when an AED arrives?', 'Turn it on and follow its voice prompts, keeping everyone clear when instructed.'),
      ],
      quiz: [
        q('h-u5-l2-q1', 'What is the recommended adult CPR compression rate?', ['40–60 per minute', '60–80 per minute', '100–120 per minute', '150–180 per minute'], 2, 'The recommended adult compression rate is 100–120 per minute.', 'Remember the range: 100 to 120.'),
        q('h-u5-l2-q2', 'What does AED stand for?', ['Automatic Emergency Device', 'Automated External Defibrillator', 'Advanced Energy Detector', 'Airway Emergency Device'], 1, 'AED stands for automated external defibrillator.', 'It is a device used during certain cardiac emergencies.'),
        q('h-u5-l2-q3', 'What should you do when an AED arrives?', ['Ignore it', 'Use it without turning it on', 'Follow its voice prompts', 'Let people touch the person during analysis'], 2, 'AEDs provide spoken instructions. Follow them carefully.', 'Turn it on and listen to the prompts.'),
        q('h-u5-l2-q4', 'What should happen while someone starts CPR?', ['No one should call 911', 'Someone should call 911 and get an AED', 'Everyone should leave', 'The AED should be hidden'], 1, 'Emergency services should be contacted and an AED brought as soon as possible.', 'Call and get the equipment while CPR begins.'),
        q('h-u5-l2-q5', 'What is the main purpose of CPR during cardiac arrest?', ['To keep blood moving through the body', 'To treat a broken bone', 'To lower body temperature', 'To replace all medical treatment'], 0, 'CPR helps circulate blood until advanced help is available.', 'Think about circulation.'),
      ],
    }),
    makeLesson({
      id: 'health-u5-l3',
      number: '5.3',
      title: 'Choking, Severe Bleeding & Burns',
      hook: 'First aid means giving safe, immediate help until trained medical care is available.',
      eli12: 'For choking, severe bleeding, or serious burns, call 911 when needed and follow instructions from emergency dispatchers. Only use first-aid steps you have been trained to perform.',
      diagram: 'flowchart',
      diagramCaption: 'Recognize the emergency, get help, and provide safe care within your training.',
      concepts: [
        { term: 'Choking', color: 'red', detail: 'A blockage of the airway that makes it difficult or impossible to breathe.' },
        { term: 'Severe Bleeding', color: 'red', detail: 'Bleeding that is heavy or will not stop and needs urgent medical attention.' },
        { term: 'Burn', color: 'yellow', detail: 'An injury to the skin or other tissue caused by heat, chemicals, electricity, or radiation.' },
        { term: 'First Aid', color: 'green', detail: 'Immediate, basic help given to someone who is injured or suddenly ill until further care is available.' },
        { term: 'Emergency Response', color: 'cobalt', detail: 'Getting appropriate help quickly, including calling emergency services when the situation is serious.' },
      ],
      trap: {
        title: 'Do not use unsafe home remedies',
        detail: 'For serious injuries, call 911 and follow dispatcher instructions. Do not put butter, oils, or random products on a burn, and do not delay emergency care.',
      },
      example: {
        problem: 'Someone has a serious burn. What is a safe general response?',
        steps: [
          'Move away from the source of danger if it is safe.',
          'Call 911 for a serious burn or other emergency.',
          'Follow dispatcher instructions and get medical help.',
          'Do not apply butter, oils, or household products to the burn.',
        ],
        answer: 'Get away from the danger, contact emergency services when needed, and follow professional instructions.',
      },
      cheatSheet: [
        'Choking can block the airway and become an emergency.',
        'Call 911 for severe or life-threatening emergencies.',
        'For severe bleeding, get emergency help and follow dispatcher instructions.',
        'For serious burns, get medical help and avoid home remedies.',
        'Use first-aid skills only within your training.',
      ],
      flashcards: [
        fc('What is choking?', 'A blockage of the airway that makes breathing difficult or impossible.'),
        fc('What should you do for a life-threatening choking emergency?', 'Call 911 or have someone call, and follow dispatcher instructions and your training.'),
        fc('What is severe bleeding?', 'Heavy bleeding or bleeding that will not stop and needs urgent medical attention.'),
        fc('What is a burn?', 'An injury caused by heat, chemicals, electricity, or radiation.'),
        fc('What should you avoid putting on a serious burn?', 'Butter, oils, and random household products.'),
        fc('What is first aid?', 'Immediate basic help given until further medical care is available.'),
      ],
      quiz: [
        q('h-u5-l3-q1', 'What is choking?', ['A type of muscle strain', 'A blockage of the airway', 'A broken bone', 'A mild headache'], 1, 'Choking happens when the airway is blocked, making breathing difficult or impossible.', 'Think about the airway and breathing.'),
        q('h-u5-l3-q2', 'What should you do during a life-threatening emergency?', ['Wait to see what happens', 'Try random treatments', 'Call 911 and follow dispatcher instructions', 'Post about it online'], 2, 'Emergency services can provide instructions and send trained responders.', 'Get professional help quickly.'),
        q('h-u5-l3-q3', 'Which is a safe general response to a serious burn?', ['Apply butter', 'Apply random household products', 'Ignore it', 'Get medical help and follow professional instructions'], 3, 'Serious burns need appropriate medical care. Avoid home remedies.', 'Do not put butter or oils on burns.'),
        q('h-u5-l3-q4', 'What is severe bleeding?', ['A small bruise', 'Heavy bleeding or bleeding that will not stop', 'A normal scratch', 'A mild itch'], 1, 'Severe bleeding needs urgent attention.', 'Look for bleeding that is heavy or will not stop.'),
        q('h-u5-l3-q5', 'What is the main purpose of first aid?', ['Replace all medical treatment', 'Give immediate basic help until further care is available', 'Diagnose every illness', 'Avoid calling emergency services'], 1, 'First aid provides basic help while further care is arranged.', 'First aid does not replace professional medical care.'),
      ],
    }),
  ],
}

// ─── UNIT EXAMS ───

const makeUnitExam = (unit: Unit): Question[] =>
  unit.lessons.flatMap((lesson) => lesson.quiz).slice(0, 10).map((question, index) => ({
    ...question,
    id: `${unit.id}-exam-${index + 1}`,
  }))

export const healthUnitExams: Record<string, Question[]> = {
  [healthUnit1.id]: makeUnitExam(healthUnit1),
  [healthUnit2.id]: makeUnitExam(healthUnit2),
  [healthUnit3.id]: makeUnitExam(healthUnit3),
  [healthUnit4.id]: makeUnitExam(healthUnit4),
  [healthUnit5.id]: makeUnitExam(healthUnit5),
}

// ─── FINAL EXAM ───

export const healthFinalExam: Question[] = [
  ...healthUnit1.lessons.flatMap((lesson) => lesson.quiz).slice(0, 4),
  ...healthUnit2.lessons.flatMap((lesson) => lesson.quiz).slice(0, 4),
  ...healthUnit3.lessons.flatMap((lesson) => lesson.quiz).slice(0, 4),
  ...healthUnit4.lessons.flatMap((lesson) => lesson.quiz).slice(0, 4),
  ...healthUnit5.lessons.flatMap((lesson) => lesson.quiz).slice(0, 4),
].map((question, index) => ({
  ...question,
  id: `health-final-${index + 1}`,
}))

// ─── COURSE ───

export const health: Course = {
  id: 'hpf',
  number: 6,
  title: 'Health & Personal Fitness',
  short: 'Health',
  zone: 'yellow',
  units: [
    healthUnit1,
    healthUnit2,
    healthUnit3,
    healthUnit4,
    healthUnit5,
  ],
}

export default health