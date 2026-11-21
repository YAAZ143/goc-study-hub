import type { Course, Lesson, Question, Unit, ConceptColor } from '@/lib/types'

const q = (
  id: string,
  prompt: string,
  choices: string[],
  answer: number,
  explanation: string,
  fix: string,
): Question => ({ id, prompt, choices, answer, explanation, fix })

const c = (
  term: string,
  detail: string,
  color: ConceptColor = 'cobalt',
  symbol?: string,
) => ({ term, detail, color, symbol })

const makeLesson = (
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

// UNIT 1: WHO AM I?

export const litUnit1: Unit = {
  id: 'lit-unit-1',
  number: 1,
  title: 'Who Am I?',
  lessons: [
    makeLesson(
      'lit-1-1',
      '1.1',
      'Direct and Indirect Characterization',
      'Authors do not always tell you what a character is like. Sometimes they let you figure it out.',
      'Characterization is how an author builds a character. Direct characterization tells you about the character. Indirect characterization shows you through actions, words, thoughts, effects on others, and appearance.',
      'three-blocks',
      'Compare direct characterization with the five STEAL clues used for indirect characterization.',
      [
        c('Direct characterization', 'The narrator directly tells the reader what a character is like.'),
        c('Indirect characterization', 'The reader figures out a character through actions, words, thoughts, effects on others, and appearance.'),
        c('STEAL', 'Speech, Thoughts, Effect on others, Actions, Looks.'),
        c('Protagonist', 'The main character who drives the story.'),
        c('Antagonist', 'A character or force that opposes the protagonist.', 'red'),
        c('Dynamic character', 'A character who changes in an important way during the story.', 'green'),
        c('Static character', 'A character who stays mostly the same.'),
        c('Round character', 'A complex character with several traits and feelings.'),
        c('Flat character', 'A character with only a few developed traits.'),
      ],
      {
        title: 'Direct vs. indirect',
        detail: '“Mia was generous” is direct characterization. “Mia gave her lunch to a classmate” is indirect because the reader must figure out that she is generous.',
      },
      {
        problem: 'A character gives their only umbrella to someone caught in the rain. What does this show?',
        steps: [
          'Look at what the character does.',
          'Giving away an umbrella is an action.',
          'The reader can infer that the character is kind or generous.',
        ],
        answer: 'Indirect characterization through Actions (A in STEAL).',
      },
      [
        'Direct = author tells you.',
        'Indirect = author shows you.',
        'S = Speech.',
        'T = Thoughts.',
        'E = Effect on others.',
        'A = Actions.',
        'L = Looks.',
        'Dynamic = changes; static = stays mostly the same.',
        'Round = complex; flat = simple.',
      ],
      [
        { front: 'What is direct characterization?', back: 'The author directly tells you a character’s traits.' },
        { front: 'What is indirect characterization?', back: 'You infer traits from clues in the story.' },
        { front: 'What does S mean in STEAL?', back: 'Speech: what the character says.' },
        { front: 'What does E mean in STEAL?', back: 'Effect on others: how others react to the character.' },
        { front: 'What is a dynamic character?', back: 'A character who changes in an important way.' },
        { front: 'What is a round character?', back: 'A complex character with several developed traits.' },
      ],
      [
        q('lit-1-1-q1', 'Which sentence is direct characterization?', ['Lena shared her food with a friend.', 'Lena was a generous person.', 'Lena smiled at the new student.', 'Everyone thanked Lena.'], 1, 'The narrator directly states that Lena is generous.', 'Direct means the author tells you the trait.'),
        q('lit-1-1-q2', 'In STEAL, what does the letter T stand for?', ['Tone', 'Theme', 'Thoughts', 'Transformation'], 2, 'Thoughts reveal what a character thinks and feels.', 'Remember the five STEAL clues.'),
        q('lit-1-1-q3', 'A character changes their beliefs after a major event. What type of character are they?', ['Static', 'Dynamic', 'Flat', 'Minor'], 1, 'A dynamic character changes during the story.', 'Dynamic means change.'),
        q('lit-1-1-q4', 'A character has many different feelings, strengths, and weaknesses. What type are they?', ['Flat', 'Static', 'Round', 'Antagonist'], 2, 'A round character is complex and developed.', 'Round means more than one simple trait.'),
        q('lit-1-1-q5', 'A character is described as having a nervous voice and avoiding eye contact. Which STEAL clues are used?', ['Speech and Looks', 'Theme and Tone', 'Plot and Setting', 'Conflict and Mood'], 0, 'The voice is speech, while eye contact is a visible behavior or appearance clue.', 'Identify what the author describes: words, appearance, actions, thoughts, or reactions.'),
      ],
    ),

    makeLesson(
      'lit-1-2',
      '1.2',
      'Point of View',
      'The same event can sound completely different depending on who tells it.',
      'Point of view is the perspective from which a story is told. Look at the pronouns and how much the narrator knows.',
      'three-blocks',
      'Compare first person, second person, third-person limited, and third-person omniscient.',
      [
        c('First person', 'A narrator tells the story using I, me, or we.'),
        c('Second person', 'The narrator addresses the reader as you.'),
        c('Third-person limited', 'A narrator uses he, she, or they but follows mainly one character’s thoughts.'),
        c('Third-person omniscient', 'An all-knowing narrator can reveal the thoughts and feelings of multiple characters.'),
        c('Narrator', 'The voice that tells the story.'),
        c('Perspective', 'The position or viewpoint from which events are understood.', 'yellow'),
      ],
      {
        title: 'Third-person limited vs. omniscient',
        detail: 'Both use he, she, or they. Limited follows mainly one character’s thoughts. Omniscient can reveal what several characters think.',
      },
      {
        problem: '“I walked into the classroom and hoped nobody noticed me.” Identify the point of view.',
        steps: [
          'Find the pronoun I.',
          'The narrator is speaking about their own experience.',
          'That means the story is told in first person.',
        ],
        answer: 'First-person point of view',
      },
      [
        'First person = I, me, we.',
        'Second person = you.',
        'Third person = he, she, they.',
        'Limited = mainly one character’s thoughts.',
        'Omniscient = knows multiple characters’ thoughts.',
        'Do not identify point of view only by the character speaking in dialogue.',
      ],
      [
        { front: 'What is first-person point of view?', back: 'A narrator uses I, me, or we.' },
        { front: 'What is second-person point of view?', back: 'The narrator addresses the reader as you.' },
        { front: 'What is third-person limited?', back: 'A narrator follows mainly one character’s thoughts.' },
        { front: 'What is third-person omniscient?', back: 'A narrator can reveal multiple characters’ thoughts.' },
        { front: 'Which pronouns often signal third person?', back: 'He, she, and they.' },
        { front: 'What is a narrator?', back: 'The voice that tells the story.' },
      ],
      [
        q('lit-1-2-q1', 'Which point of view uses I and me?', ['Second person', 'First person', 'Third-person limited', 'Third-person omniscient'], 1, 'First-person narrators tell the story using I or me.', 'Look for I, me, or we.'),
        q('lit-1-2-q2', 'Which point of view directly addresses the reader as you?', ['First person', 'Second person', 'Third person', 'Omniscient'], 1, 'Second person uses you to address the reader.', 'You = second person.'),
        q('lit-1-2-q3', 'A narrator reveals only one character’s private thoughts. This is:', ['First person', 'Second person', 'Third-person limited', 'Third-person omniscient'], 2, 'Third-person limited focuses on one character’s inner thoughts.', 'Limited = limited access to thoughts.'),
        q('lit-1-2-q4', 'A narrator explains what three different characters are thinking. This is:', ['Third-person limited', 'Third-person omniscient', 'Second person', 'First person'], 1, 'Omniscient narrators can know the thoughts of multiple characters.', 'Omniscient means all-knowing.'),
        q('lit-1-2-q5', 'Which detail is most useful when identifying point of view?', ['The story’s title', 'The narrator’s pronouns and knowledge', 'The number of pages', 'The author’s age'], 1, 'Pronouns and access to characters’ thoughts help identify the narrator’s perspective.', 'Check pronouns and what the narrator knows.'),
      ],
    ),

    makeLesson(
      'lit-1-3',
      '1.3',
      'Central Theme and Textual Evidence',
      'A story can be about friendship but have a deeper message about trust.',
      'A topic is what a story discusses. A theme is the message the author communicates about that topic. Textual evidence supports your interpretation.',
      'three-blocks',
      'Move from topic to a complete theme statement, then support it with evidence.',
      [
        c('Topic', 'The subject a story discusses, such as friendship, fear, or power.'),
        c('Theme', 'A message or lesson about a topic that the reader can apply beyond the story.'),
        c('Central theme', 'The main message developed throughout a text.'),
        c('Textual evidence', 'Specific details or quotations from a text that support an idea.'),
        c('Inference', 'A conclusion based on text clues and your reasoning.', 'green'),
        c('Theme statement', 'A complete sentence expressing what the text says about a topic.'),
      ],
      {
        title: 'A topic is not a theme',
        detail: '“Friendship” is only a topic. “True friendship requires trust and honesty” is a theme because it expresses a message about friendship.',
      },
      {
        problem: 'A story shows a character learning that honesty helps repair damaged relationships. Write its theme.',
        steps: [
          'Identify the topic: honesty and relationships.',
          'Ask what the character learns about the topic.',
          'Write the message as a complete sentence.',
        ],
        answer: 'Honesty can help people rebuild damaged relationships.',
      },
      [
        'Topic = one or two words.',
        'Theme = a complete message.',
        'A theme should apply beyond one character.',
        'Use evidence from the text to support a theme.',
        'Explain how the evidence proves your point.',
        'Avoid themes that are just plot summaries.',
      ],
      [
        { front: 'What is a topic?', back: 'The subject a text discusses.' },
        { front: 'What is a theme?', back: 'A message about a topic.' },
        { front: 'Is “courage” a complete theme?', back: 'No. It is a topic, not a full message.' },
        { front: 'What is textual evidence?', back: 'Specific details or quotations from a text.' },
        { front: 'What is an inference?', back: 'A conclusion based on clues and reasoning.' },
        { front: 'What makes a strong theme statement?', back: 'A complete message that applies beyond one story.' },
      ],
      [
        q('lit-1-3-q1', 'Which choice is a topic instead of a theme?', ['Honesty helps build trust.', 'Fear can prevent people from taking chances.', 'Friendship', 'People can learn from mistakes.'], 2, 'Friendship is a subject, not a complete message.', 'A topic is usually a short subject.'),
        q('lit-1-3-q2', 'Which choice is a theme statement?', ['Power', 'A lonely character', 'The story takes place in a forest.', 'People sometimes hurt others when they seek power.'], 3, 'A theme statement communicates a message about a topic.', 'Look for a complete idea that applies beyond the plot.'),
        q('lit-1-3-q3', 'What is textual evidence?', ['A personal opinion', 'A detail or quotation from the text', 'A guess with no support', 'The author’s biography'], 1, 'Textual evidence comes directly from the text.', 'Evidence must be connected to the reading.'),
        q('lit-1-3-q4', 'Why should a writer explain evidence after using it?', ['To make the paragraph longer', 'To show how it supports the claim', 'To repeat the quotation', 'To avoid discussing the theme'], 1, 'Explanation connects the evidence to the writer’s point.', 'Do not leave a quotation unexplained.'),
        q('lit-1-3-q5', 'Which is the best way to identify a central theme?', ['Look only at the title', 'Find a message repeated or developed through the text', 'Count the characters', 'Use only the first sentence'], 1, 'A central theme develops across the text.', 'Look at the whole story, not just one line.'),
      ],
    ),
  ],
}

// UNIT 2: HUMAN NATURE

export const litUnit2: Unit = {
  id: 'lit-unit-2',
  number: 2,
  title: 'Human Nature',
  lessons: [
    makeLesson(
      'lit-2-1',
      '2.1',
      'Plot Structure and Conflict',
      'Most stories build toward a moment when something has to change.',
      'Plot is the sequence of events in a story. Conflict is the struggle that creates problems for the characters.',
      'flowchart',
      'Follow the plot mountain from exposition to resolution and identify internal and external conflict.',
      [
        c('Exposition', 'Introduces characters, setting, and the starting situation.'),
        c('Inciting incident', 'The event that starts the main conflict.'),
        c('Rising action', 'Events that build tension and move toward the climax.'),
        c('Climax', 'The turning point or most intense moment of the story.', 'red'),
        c('Falling action', 'Events that follow the climax and lead toward the ending.'),
        c('Resolution', 'The ending where major conflicts are settled or left with a final outcome.'),
        c('Internal conflict', 'A struggle inside a character, such as fear or a difficult decision.'),
        c('External conflict', 'A struggle between a character and an outside force.', 'yellow'),
      ],
      {
        title: 'Climax vs. resolution',
        detail: 'The climax is the major turning point. The resolution is what happens as the story ends. They are not always the same event.',
      },
      {
        problem: 'A character must choose between telling the truth and protecting a friend. What kind of conflict is this?',
        steps: [
          'The struggle is happening inside the character.',
          'The character is deciding between two choices.',
          'This is internal conflict.',
        ],
        answer: 'Internal conflict',
      },
      [
        'Exposition = beginning and setup.',
        'Inciting incident = starts the main conflict.',
        'Rising action = builds tension.',
        'Climax = turning point.',
        'Falling action = events after climax.',
        'Resolution = ending.',
        'Internal = inside the character.',
        'External = outside force.',
      ],
      [
        { front: 'What is exposition?', back: 'The part that introduces characters, setting, and the situation.' },
        { front: 'What is the inciting incident?', back: 'The event that starts the main conflict.' },
        { front: 'What is rising action?', back: 'Events that build tension toward the climax.' },
        { front: 'What is the climax?', back: 'The turning point or most intense moment.' },
        { front: 'What is internal conflict?', back: 'A struggle within a character.' },
        { front: 'What is external conflict?', back: 'A struggle between a character and an outside force.' },
      ],
      [
        q('lit-2-1-q1', 'Which plot stage introduces the characters and setting?', ['Climax', 'Exposition', 'Falling action', 'Resolution'], 1, 'Exposition establishes the starting situation.', 'Exposition = introduction.'),
        q('lit-2-1-q2', 'Which plot stage is usually the turning point?', ['Exposition', 'Rising action', 'Climax', 'Resolution'], 2, 'The climax is the major turning point.', 'Climax = turning point.'),
        q('lit-2-1-q3', 'A character struggles with whether to forgive someone. This is:', ['External conflict', 'Internal conflict', 'Setting', 'Resolution'], 1, 'The struggle happens inside the character.', 'A decision inside the character is internal.'),
        q('lit-2-1-q4', 'A character struggles against a dangerous storm. This is:', ['Internal conflict', 'External conflict', 'Theme', 'Point of view'], 1, 'The storm is an outside force.', 'Outside force = external conflict.'),
        q('lit-2-1-q5', 'What usually happens during falling action?', ['The setting is introduced', 'Events follow the climax and lead toward the ending', 'The main conflict begins', 'The title is explained'], 1, 'Falling action comes after the climax and moves toward resolution.', 'Remember the order of the plot mountain.'),
      ],
    ),

    makeLesson(
      'lit-2-2',
      '2.2',
      'Tone and Mood',
      'A writer’s attitude and a reader’s feelings are two different things.',
      'Tone is the author’s or narrator’s attitude toward the subject. Mood is the feeling the text creates for the reader.',
      'three-blocks',
      'Separate the writer’s attitude from the atmosphere or feeling created by the text.',
      [
        c('Tone', 'The author’s or narrator’s attitude toward a subject or audience.'),
        c('Mood', 'The feeling or atmosphere created for the reader.'),
        c('Diction', 'The author’s word choice, which can help create tone and mood.'),
        c('Imagery', 'Descriptive language that appeals to the senses.', 'green'),
        c('Atmosphere', 'The overall emotional feeling of a scene or text.'),
      ],
      {
        title: 'Tone is not mood',
        detail: 'A narrator can describe a frightening event in a humorous tone. The tone is humorous, while the mood may still feel tense or uncomfortable.',
      },
      {
        problem: 'A narrator describes a storm using sarcastic comments. The reader feels nervous. Identify tone and mood.',
        steps: [
          'Sarcastic describes the narrator’s attitude.',
          'Nervous describes the reader’s feeling.',
          'Keep tone and mood separate.',
        ],
        answer: 'Tone: sarcastic. Mood: nervous or tense.',
      },
      [
        'Tone = writer’s attitude.',
        'Mood = reader’s feeling.',
        'Diction = word choice.',
        'Imagery = sensory details.',
        'Use specific words to describe tone and mood.',
        'Support both answers with details from the text.',
      ],
      [
        { front: 'What is tone?', back: 'The author’s or narrator’s attitude.' },
        { front: 'What is mood?', back: 'The feeling created for the reader.' },
        { front: 'What is diction?', back: 'The author’s word choice.' },
        { front: 'What is imagery?', back: 'Language that appeals to the senses.' },
        { front: 'A narrator sounds sarcastic. Is that tone or mood?', back: 'Tone.' },
        { front: 'A scene makes the reader feel nervous. Is that tone or mood?', back: 'Mood.' },
      ],
      [
        q('lit-2-2-q1', 'What does tone describe?', ['The reader’s feelings', 'The author’s attitude', 'The story’s location', 'The order of events'], 1, 'Tone is the attitude shown by the author or narrator.', 'Tone = attitude.'),
        q('lit-2-2-q2', 'What does mood describe?', ['The author’s age', 'The narrator’s pronouns', 'The feeling created for the reader', 'The story’s conflict'], 2, 'Mood is the emotional atmosphere experienced by the reader.', 'Mood = feeling.'),
        q('lit-2-2-q3', 'Which technique can help create tone and mood?', ['Diction', 'Page numbers', 'Paragraph length only', 'Character names only'], 0, 'Word choice strongly affects how a text sounds and feels.', 'Diction means word choice.'),
        q('lit-2-2-q4', 'A narrator makes fun of a character’s mistake. Which word might describe the tone?', ['Sarcastic', 'Peaceful', 'Lonely', 'Suspenseful'], 0, 'Making fun of someone can show a sarcastic attitude.', 'Describe the narrator’s attitude.'),
        q('lit-2-2-q5', 'A dark, empty hallway makes the reader feel uneasy. What is this feeling?', ['Tone', 'Mood', 'Diction', 'Point of view'], 1, 'Uneasy is the feeling created for the reader.', 'Reader feeling = mood.'),
      ],
    ),

    makeLesson(
      'lit-2-3',
      '2.3',
      'Foreshadowing, Flashback, Symbolism, and Irony',
      'A small detail early in a story can become important later.',
      'Authors use literary techniques to give clues, show earlier events, add meaning, or create a difference between what is expected and what happens.',
      'flowchart',
      'Compare clues about the future, scenes from the past, symbols, and different types of irony.',
      [
        c('Foreshadowing', 'Clues that hint at something that may happen later.'),
        c('Flashback', 'A scene that takes the story back to an earlier event.'),
        c('Symbolism', 'Using an object, person, or event to represent a larger idea.'),
        c('Verbal irony', 'When someone says something different from or opposite to what they mean.'),
        c('Situational irony', 'When the outcome is different from what is expected.'),
        c('Dramatic irony', 'When the audience knows something a character does not.', 'yellow'),
      ],
      {
        title: 'Foreshadowing vs. flashback',
        detail: 'Foreshadowing points toward a possible future event. Flashback shows an event that already happened.',
      },
      {
        problem: 'A character says, “What could possibly go wrong?” just before a major accident happens. What technique may this be?',
        steps: [
          'The statement comes before the accident.',
          'It hints that something bad may happen.',
          'This is foreshadowing.',
        ],
        answer: 'Foreshadowing',
      },
      [
        'Foreshadowing = hints about the future.',
        'Flashback = returns to the past.',
        'Symbolism = something represents a bigger idea.',
        'Verbal irony = words differ from intended meaning.',
        'Situational irony = outcome differs from expectation.',
        'Dramatic irony = audience knows more than a character.',
      ],
      [
        { front: 'What is foreshadowing?', back: 'A clue that hints at a future event.' },
        { front: 'What is a flashback?', back: 'A scene showing an event from the past.' },
        { front: 'What is symbolism?', back: 'Using something to represent a larger idea.' },
        { front: 'What is verbal irony?', back: 'Words mean something different from what is said.' },
        { front: 'What is situational irony?', back: 'The outcome is different from what is expected.' },
        { front: 'What is dramatic irony?', back: 'The audience knows something a character does not.' },
      ],
      [
        q('lit-2-3-q1', 'A character notices dark clouds before a dangerous storm. This may be:', ['Flashback', 'Foreshadowing', 'Symbolism only', 'Resolution'], 1, 'The clouds hint at a future event.', 'A clue about what may happen = foreshadowing.'),
        q('lit-2-3-q2', 'A story pauses to show a character’s childhood memory. This is:', ['Foreshadowing', 'Flashback', 'Dramatic irony', 'Climax'], 1, 'The story moves back to an earlier event.', 'Past event = flashback.'),
        q('lit-2-3-q3', 'A broken chain represents lost freedom. This is:', ['Symbolism', 'Flashback', 'Exposition', 'Point of view'], 0, 'The chain represents a larger idea beyond the object itself.', 'An object representing an idea = symbolism.'),
        q('lit-2-3-q4', 'The audience knows a character is walking into a trap, but the character does not. This is:', ['Verbal irony', 'Dramatic irony', 'Foreshadowing', 'Flashback'], 1, 'The audience knows information the character does not.', 'Audience knows more = dramatic irony.'),
        q('lit-2-3-q5', 'A fire station burns down. This is an example of:', ['Situational irony', 'Flashback', 'Direct characterization', 'Second person'], 0, 'The result is unexpected because a fire station is expected to prevent or respond to fires.', 'Unexpected outcome = situational irony.'),
      ],
    ),
  ],
}

// UNIT 3: SHORT STORIES

export const litUnit3: Unit = {
  id: 'lit-unit-3',
  number: 3,
  title: 'Short Stories',
  lessons: [
    makeLesson(
      'lit-3-1',
      '3.1',
      'Figurative Language',
      'Writers often use comparisons and exaggeration to make ideas easier to picture.',
      'Figurative language uses words in a nonliteral way to create meaning, emotion, or strong images.',
      'three-blocks',
      'Identify metaphor, simile, personification, hyperbole, and allusion.',
      [
        c('Metaphor', 'A direct comparison that says one thing is another.'),
        c('Simile', 'A comparison using like or as.'),
        c('Personification', 'Giving human qualities to something nonhuman.'),
        c('Hyperbole', 'Extreme exaggeration for effect.'),
        c('Allusion', 'A reference to a known person, story, event, or work.'),
        c('Literal language', 'Words used with their ordinary, direct meaning.', 'yellow'),
      ],
      {
        title: 'Metaphor vs. simile',
        detail: '“The classroom was a zoo” is a metaphor. “The classroom was like a zoo” is a simile because it uses like.',
      },
      {
        problem: '“The wind whispered through the trees.” Identify the figurative language.',
        steps: [
          'Wind is not a person.',
          'Whispering is a human action.',
          'The sentence gives a nonhuman thing a human quality.',
        ],
        answer: 'Personification',
      },
      [
        'Metaphor = direct comparison.',
        'Simile = comparison using like or as.',
        'Personification = human qualities given to nonhuman things.',
        'Hyperbole = exaggeration.',
        'Allusion = reference to something known.',
        'Ask what the language helps the reader picture or understand.',
      ],
      [
        { front: 'What is a metaphor?', back: 'A direct comparison saying one thing is another.' },
        { front: 'What is a simile?', back: 'A comparison using like or as.' },
        { front: 'What is personification?', back: 'Giving human qualities to something nonhuman.' },
        { front: 'What is hyperbole?', back: 'Extreme exaggeration for effect.' },
        { front: 'What is an allusion?', back: 'A reference to a known person, story, event, or work.' },
        { front: '“I have told you a million times” is what?', back: 'Hyperbole, because it exaggerates.' },
      ],
      [
        q('lit-3-1-q1', '“Her smile was sunshine.” This is:', ['Simile', 'Metaphor', 'Hyperbole', 'Allusion'], 1, 'The smile is directly compared to sunshine without like or as.', 'Direct comparison = metaphor.'),
        q('lit-3-1-q2', '“He ran like the wind.” This is:', ['Simile', 'Metaphor', 'Personification', 'Irony'], 0, 'The comparison uses like.', 'Like or as usually signals a simile.'),
        q('lit-3-1-q3', '“The alarm clock screamed at me.” This is:', ['Allusion', 'Personification', 'Hyperbole', 'Flashback'], 1, 'The clock is given a human action.', 'Nonhuman object acting human = personification.'),
        q('lit-3-1-q4', '“I waited forever for the bus.” This is:', ['Hyperbole', 'Simile', 'Allusion', 'Literal language'], 0, 'The speaker exaggerates the amount of time.', 'Extreme exaggeration = hyperbole.'),
        q('lit-3-1-q5', 'A sentence refers to a famous Greek myth without explaining it. This is:', ['Metaphor', 'Personification', 'Allusion', 'Mood'], 2, 'An allusion refers to a known story or event.', 'Reference to another work = allusion.'),
      ],
    ),

    makeLesson(
      'lit-3-2',
      '3.2',
      'Diction, Connotation, Denotation, and Syntax',
      'Changing one word can change how a sentence feels.',
      'Diction is word choice. Denotation is a word’s literal meaning, connotation is its associated feeling, and syntax is how words and sentences are arranged.',
      'three-blocks',
      'Separate the literal definition of a word from its emotional associations and sentence structure.',
      [
        c('Diction', 'The specific words an author chooses.'),
        c('Denotation', 'The literal dictionary meaning of a word.'),
        c('Connotation', 'The feelings or associations connected to a word.'),
        c('Positive connotation', 'An association that feels favorable or approving.', 'green'),
        c('Negative connotation', 'An association that feels unfavorable or disapproving.', 'red'),
        c('Syntax', 'The arrangement of words and phrases to create sentences.'),
        c('Sentence structure', 'The way sentences are built and organized.'),
      ],
      {
        title: 'Connotation vs. denotation',
        detail: '“Slim” and “skinny” can have similar literal meanings, but their connotations can feel different. Denotation is the definition; connotation is the feeling.',
      },
      {
        problem: 'An author describes a character’s home as “a cozy little cottage.” Which word creates a positive connotation?',
        steps: [
          'Look at the emotional feeling of the description.',
          'Cozy suggests warmth and comfort.',
          'That word creates a positive connotation.',
        ],
        answer: 'Cozy',
      },
      [
        'Diction = word choice.',
        'Denotation = literal definition.',
        'Connotation = feeling or association.',
        'Positive connotation = favorable feeling.',
        'Negative connotation = unfavorable feeling.',
        'Syntax = sentence arrangement.',
        'Authors use diction and syntax to affect meaning and tone.',
      ],
      [
        { front: 'What is diction?', back: 'The words an author chooses.' },
        { front: 'What is denotation?', back: 'A word’s literal dictionary meaning.' },
        { front: 'What is connotation?', back: 'The feelings or associations connected to a word.' },
        { front: 'What is positive connotation?', back: 'An association that feels favorable.' },
        { front: 'What is negative connotation?', back: 'An association that feels unfavorable.' },
        { front: 'What is syntax?', back: 'The arrangement of words and phrases in sentences.' },
      ],
      [
        q('lit-3-2-q1', 'What does diction mean?', ['Sentence order', 'Word choice', 'Plot structure', 'Point of view'], 1, 'Diction refers to the words an author chooses.', 'Diction = word choice.'),
        q('lit-3-2-q2', 'What is denotation?', ['A word’s emotional feeling', 'A word’s literal meaning', 'The author’s purpose', 'A type of conflict'], 1, 'Denotation is the direct dictionary meaning.', 'Denotation = definition.'),
        q('lit-3-2-q3', 'What is connotation?', ['The number of words in a sentence', 'The literal meaning only', 'The feelings associated with a word', 'The order of events'], 2, 'Connotation refers to associations and feelings.', 'Connotation = feeling.'),
        q('lit-3-2-q4', 'Which word usually has a more positive connotation?', ['Stubborn', 'Persistent', 'Bossy', 'Selfish'], 1, 'Persistent often suggests determination in a positive way.', 'Consider the feeling each word creates.'),
        q('lit-3-2-q5', 'What does syntax describe?', ['How sentences are arranged', 'The story’s main theme', 'The narrator’s identity', 'A character’s appearance'], 0, 'Syntax is the arrangement of words and phrases in sentences.', 'Syntax = sentence structure.'),
      ],
    ),

    makeLesson(
      'lit-3-3',
      '3.3',
      'Author’s Purpose and Motif',
      'Authors make choices because they want readers to think, feel, or learn something.',
      'Author’s purpose is the reason a text was written. A motif is a repeated image, idea, object, or pattern that helps develop meaning.',
      'three-blocks',
      'Use PIE to identify purpose and track repeated motifs across a story.',
      [
        c('Author’s purpose', 'The reason an author creates a text.'),
        c('Persuade', 'To convince the reader to agree or take action.'),
        c('Inform', 'To teach or provide facts and information.'),
        c('Entertain', 'To interest or engage the reader.', 'green'),
        c('PIE', 'Persuade, Inform, Entertain.'),
        c('Motif', 'A repeated image, idea, object, or pattern that supports a text’s meaning.'),
        c('Symbol', 'Something that represents a larger idea.'),
      ],
      {
        title: 'Motif vs. symbol',
        detail: 'A symbol represents an idea. A motif is a repeated element that appears throughout a work. A repeated symbol can become a motif.',
      },
      {
        problem: 'A story repeatedly mentions locked doors whenever a character feels trapped. What could the locked doors be?',
        steps: [
          'The locked doors appear more than once.',
          'They connect to the character’s feeling of being trapped.',
          'The repeated image is a motif and may also work as a symbol.',
        ],
        answer: 'A recurring motif representing feeling trapped.',
      },
      [
        'Persuade = convince.',
        'Inform = teach or explain.',
        'Entertain = engage the reader.',
        'PIE = Persuade, Inform, Entertain.',
        'Motif = repeated element with meaning.',
        'Symbol = something that represents a bigger idea.',
        'Use the whole text to identify purpose and motifs.',
      ],
      [
        { front: 'What does PIE stand for?', back: 'Persuade, Inform, Entertain.' },
        { front: 'What does persuade mean?', back: 'To convince someone to agree or act.' },
        { front: 'What does inform mean?', back: 'To teach or provide information.' },
        { front: 'What does entertain mean?', back: 'To interest or engage the reader.' },
        { front: 'What is a motif?', back: 'A repeated element that helps develop meaning.' },
        { front: 'How is a motif different from a symbol?', back: 'A motif repeats; a symbol represents a larger idea.' },
      ],
      [
        q('lit-3-3-q1', 'An article explains how earthquakes happen using facts. What is its main purpose?', ['Persuade', 'Inform', 'Entertain', 'Create suspense'], 1, 'The article teaches readers using factual information.', 'Facts and explanations usually mean inform.'),
        q('lit-3-3-q2', 'An advertisement tries to convince people to buy a product. Its purpose is to:', ['Inform only', 'Persuade', 'Entertain only', 'Describe setting'], 1, 'The advertisement wants readers to take an action.', 'Trying to convince = persuade.'),
        q('lit-3-3-q3', 'A short story written mainly to engage readers has which purpose?', ['Entertain', 'Persuade', 'List facts', 'Give directions'], 0, 'Stories often aim to entertain or engage readers.', 'A story often entertains.'),
        q('lit-3-3-q4', 'A repeated image of birds appears whenever a character thinks about freedom. This repeated image is a:', ['Counterclaim', 'Motif', 'Thesis', 'Flashback'], 1, 'A repeated image connected to an idea is a motif.', 'Repeated meaningful element = motif.'),
        q('lit-3-3-q5', 'What is the best way to identify an author’s purpose?', ['Look at one random word', 'Consider what the whole text is trying to do', 'Count the paragraphs', 'Only read the title'], 1, 'Purpose is based on the overall goal of the text.', 'Ask what the author wants readers to do or understand.'),
      ],
    ),
  ],
}

// UNIT 4: WRITING STUDIO

export const litUnit4: Unit = {
  id: 'lit-unit-4',
  number: 4,
  title: 'Writing Studio',
  lessons: [
    makeLesson(
      'lit-4-1',
      '4.1',
      'Writing Strong Thesis Statements',
      'A good essay starts with a clear answer to its main question.',
      'A thesis statement gives the main claim or argument of an essay. It should answer the prompt and guide the rest of the writing.',
      'three-blocks',
      'Build a thesis by answering the prompt, stating a clear position, and giving the main reasons or focus.',
      [
        c('Thesis statement', 'A sentence that states the main claim or argument of an essay.'),
        c('Claim', 'A statement the writer wants to prove.'),
        c('Argument', 'A position supported with reasons and evidence.'),
        c('Specificity', 'Using clear details instead of broad or vague statements.'),
        c('Controlling idea', 'The main point that guides a paragraph or essay.', 'green'),
        c('Prompt', 'The question or task the writing must answer.'),
      ],
      {
        title: 'A topic is not a thesis',
        detail: '“School uniforms” is a topic. “Schools should allow students to choose their clothing because it supports self-expression” is a thesis with a clear position and reason.',
      },
      {
        problem: 'Prompt: Should schools require uniforms? Write a clear thesis that takes a position.',
        steps: [
          'Choose a position: uniforms should not be required.',
          'Give a reason: students should have some choice in clothing.',
          'Combine the position and reason into one clear sentence.',
        ],
        answer: 'Schools should not require uniforms because students should have some freedom to express themselves through clothing.',
      },
      [
        'A thesis answers the prompt.',
        'A thesis states a clear position or main idea.',
        'Use specific language.',
        'Avoid simply naming the topic.',
        'Make sure the body paragraphs support the thesis.',
        'A thesis should match the assignment.',
      ],
      [
        { front: 'What is a thesis statement?', back: 'A sentence stating the essay’s main claim or argument.' },
        { front: 'What is a claim?', back: 'A statement the writer wants to prove.' },
        { front: 'What should a thesis do?', back: 'Answer the prompt and guide the essay.' },
        { front: 'Why should a thesis be specific?', back: 'Specific claims are easier to support with evidence.' },
        { front: 'Is “school uniforms” a complete thesis?', back: 'No. It only names a topic.' },
        { front: 'What should body paragraphs do?', back: 'Support and explain the thesis.' },
      ],
      [
        q('lit-4-1-q1', 'What is the main job of a thesis statement?', ['Introduce every character', 'State the essay’s main claim', 'List all quotations', 'Describe the setting'], 1, 'The thesis tells readers the main argument or point.', 'Thesis = main claim.'),
        q('lit-4-1-q2', 'Which is the strongest thesis?', ['Technology', 'School', 'Technology is useful.', 'Schools should teach digital safety because students use technology every day.'], 3, 'The strongest option makes a clear claim and gives a reason.', 'Choose the specific statement that answers a question.'),
        q('lit-4-1-q3', 'What is wrong with a thesis that only says “Friendship”?', ['It is too specific', 'It only names a topic', 'It uses evidence', 'It gives a complete argument'], 1, 'A topic alone does not communicate a full claim.', 'A thesis needs a complete idea.'),
        q('lit-4-1-q4', 'What should the body paragraphs of an essay do?', ['Ignore the thesis', 'Support the thesis', 'Introduce unrelated topics', 'Repeat the title'], 1, 'Body paragraphs develop the main claim with reasons and evidence.', 'Every main paragraph should connect to the thesis.'),
        q('lit-4-1-q5', 'What should a writer do first when creating a thesis?', ['Choose random quotations', 'Understand and answer the prompt', 'Write the conclusion', 'Count the sentences'], 1, 'The thesis must answer the actual assignment prompt.', 'Start by understanding the question.'),
      ],
    ),

    makeLesson(
      'lit-4-2',
      '4.2',
      'RACE Body Paragraph Structure',
      'A strong paragraph makes a point, proves it, and explains why it matters.',
      'RACE is a structure for answering a question with a clear claim and evidence from a text.',
      'flowchart',
      'Follow RACE: Restate, Answer, Cite, Explain.',
      [
        c('R - Restate', 'Restate the question or topic in your own words.'),
        c('A - Answer', 'Give a clear answer or claim.'),
        c('C - Cite', 'Include relevant evidence from the text.'),
        c('E - Explain', 'Explain how the evidence supports the answer.'),
        c('Quotation', 'The exact words copied from a source and placed in quotation marks.'),
        c('Paraphrase', 'Restating information in your own words.', 'green'),
        c('Analysis', 'Explaining the meaning and importance of evidence.'),
      ],
      {
        title: 'Do not stop after the quotation',
        detail: 'A quotation by itself does not explain your thinking. The E in RACE is where you connect the evidence to your claim.',
      },
      {
        problem: 'Question: How does the character show courage? Evidence: “She stepped forward even though she was afraid.”',
        steps: [
          'Restate: The character shows courage in the story.',
          'Answer: She acts even when she feels afraid.',
          'Cite: Use the quotation about stepping forward.',
          'Explain: This shows courage because she faces fear instead of avoiding the situation.',
        ],
        answer: 'The character shows courage by facing a difficult situation even though she is afraid. The text states, “She stepped forward even though she was afraid.” This shows that courage means acting despite fear.',
      },
      [
        'R = Restate the question.',
        'A = Answer with a clear claim.',
        'C = Cite text evidence.',
        'E = Explain how the evidence proves the claim.',
        'Use quotation marks for exact words.',
        'Always connect evidence back to your answer.',
      ],
      [
        { front: 'What does R stand for in RACE?', back: 'Restate the question or topic.' },
        { front: 'What does A stand for in RACE?', back: 'Answer with a clear claim.' },
        { front: 'What does C stand for in RACE?', back: 'Cite evidence from the text.' },
        { front: 'What does E stand for in RACE?', back: 'Explain how the evidence supports the answer.' },
        { front: 'Why is explanation important?', back: 'It connects the evidence to the writer’s claim.' },
        { front: 'What is paraphrasing?', back: 'Restating information in your own words.' },
      ],
      [
        q('lit-4-2-q1', 'What does R stand for in RACE?', ['Reason', 'Restate', 'Research', 'Review'], 1, 'RACE begins by restating the question or topic.', 'R = Restate.'),
        q('lit-4-2-q2', 'What does C stand for in RACE?', ['Conclude', 'Compare', 'Cite', 'Create'], 2, 'C means cite evidence from the text.', 'C = Cite.'),
        q('lit-4-2-q3', 'Which part of RACE explains why the evidence supports the answer?', ['Restate', 'Answer', 'Cite', 'Explain'], 3, 'The explanation connects the evidence to the claim.', 'E = Explain.'),
        q('lit-4-2-q4', 'What should a writer do when using an exact quotation?', ['Put it in quotation marks', 'Change the author’s words', 'Leave out the source', 'Present it as personal opinion'], 0, 'Exact words from a text should be marked as a quotation.', 'Exact wording needs quotation marks and a citation.'),
        q('lit-4-2-q5', 'Which paragraph has the strongest RACE structure?', ['A paragraph with only a quotation', 'A paragraph with a claim, evidence, and explanation', 'A paragraph with unrelated details', 'A paragraph with no answer'], 1, 'A strong RACE paragraph answers and supports the question.', 'Look for all four parts.'),
      ],
    ),

    makeLesson(
      'lit-4-3',
      '4.3',
      'Counterclaims, Transitions, and MLA Citations',
      'Strong arguments show that the writer understands more than one side.',
      'A counterclaim recognizes an opposing view. Transitions connect ideas. MLA citations show where borrowed information came from.',
      'three-blocks',
      'Build an argument by presenting a claim, recognizing another view, responding to it, and citing sources.',
      [
        c('Counterclaim', 'An opposing argument or viewpoint.'),
        c('Rebuttal', 'A response that explains why the counterclaim does not defeat the main claim.'),
        c('Transition', 'A word or phrase that connects ideas.'),
        c('MLA format', 'A style used to format academic writing and cite sources.'),
        c('In-text citation', 'A brief citation inside the essay that points to a source.'),
        c('Works Cited', 'The page listing the sources used in an MLA paper.', 'green'),
        c('Parenthetical citation', 'A citation placed in parentheses, often including the author’s last name and page number.'),
      ],
      {
        title: 'Counterclaim vs. rebuttal',
        detail: 'A counterclaim presents the other side. A rebuttal responds to that side and explains why your original claim still makes sense.',
      },
      {
        problem: 'Claim: Students should have less homework. Counterclaim: Homework helps students practice. Write a rebuttal.',
        steps: [
          'Recognize the opposing view: homework can provide practice.',
          'Respond with a reason.',
          'Explain why your claim still has support.',
        ],
        answer: 'Although homework can provide practice, too much homework can reduce the time students have for sleep and other responsibilities.',
      },
      [
        'Counterclaim = opposing view.',
        'Rebuttal = response to the opposing view.',
        'Transitions connect ideas.',
        'Examples: however, therefore, for example, in addition.',
        'MLA citations give credit to sources.',
        'In-text citations connect to the Works Cited page.',
        'Do not use a source without giving credit.',
      ],
      [
        { front: 'What is a counterclaim?', back: 'An opposing argument or viewpoint.' },
        { front: 'What is a rebuttal?', back: 'A response to an opposing argument.' },
        { front: 'What is a transition?', back: 'A word or phrase that connects ideas.' },
        { front: 'What is an in-text citation?', back: 'A brief source reference inside the essay.' },
        { front: 'What is the Works Cited page?', back: 'The page listing sources used in an MLA paper.' },
        { front: 'Why are MLA citations important?', back: 'They give credit and help readers identify sources.' },
      ],
      [
        q('lit-4-3-q1', 'What is a counterclaim?', ['The main title', 'An opposing viewpoint', 'A concluding sentence', 'A source list'], 1, 'A counterclaim presents a different side of the argument.', 'Counterclaim = the other side.'),
        q('lit-4-3-q2', 'What is a rebuttal?', ['A response to a counterclaim', 'A list of sources', 'A story setting', 'A type of figurative language'], 0, 'A rebuttal explains why the main argument still has support.', 'Rebuttal = response.'),
        q('lit-4-3-q3', 'Which word is a transition?', ['Character', 'However', 'Theme', 'Quotation'], 1, 'However connects ideas and signals contrast.', 'Transitions connect sentences and ideas.'),
        q('lit-4-3-q4', 'What is the purpose of an MLA in-text citation?', ['To decorate a paragraph', 'To give credit to a source', 'To replace the thesis', 'To introduce a character'], 1, 'In-text citations identify where borrowed information came from.', 'Citations give credit.'),
        q('lit-4-3-q5', 'Where are the full source details listed in an MLA paper?', ['The title', 'The introduction', 'The Works Cited page', 'The thesis statement'], 2, 'The Works Cited page lists the sources used in the paper.', 'Works Cited = full source list.'),
      ],
    ),
  ],
}

// UNIT EXAMS
// Each exam contains 10 questions selected from the unit's lesson quizzes.

const makeUnitExam = (unit: Unit): Question[] =>
  unit.lessons
    .flatMap((item) => item.quiz)
    .slice(0, 10)
    .map((question, index) => ({
      ...question,
      id: `${unit.id}-exam-${index + 1}`,
    }))

export const litUnitExams: Record<string, Question[]> = {
  'lit-unit-1': makeUnitExam(litUnit1),
  'lit-unit-2': makeUnitExam(litUnit2),
  'lit-unit-3': makeUnitExam(litUnit3),
  'lit-unit-4': makeUnitExam(litUnit4),
}

// COURSE FINAL
// Five questions from each of the four units.

export const litFinalExam: Question[] = [
  ...litUnit1.lessons.flatMap((item) => item.quiz).slice(0, 5),
  ...litUnit2.lessons.flatMap((item) => item.quiz).slice(0, 5),
  ...litUnit3.lessons.flatMap((item) => item.quiz).slice(0, 5),
  ...litUnit4.lessons.flatMap((item) => item.quiz).slice(0, 5),
].map((question, index) => ({
  ...question,
  id: `lit-final-${index + 1}`,
}))

export const litComp: Course = {
  id: 'lit',
  number: 4,
  title: 'Literature and Composition I',
  short: '9th Lit',
  zone: 'yellow',
  units: [litUnit1, litUnit2, litUnit3, litUnit4],
}

export default litComp