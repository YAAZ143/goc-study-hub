export type Zone = 'red' | 'yellow'
export type ConceptColor = 'cobalt' | 'green' | 'yellow' | 'red'

export type DiagramKey =
  | 'ipo'
  | 'three-blocks'
  | 'binary-places'
  | 'variable-boxes'
  | 'type-bins'
  | 'string-index'
  | 'truth-table'
  | 'flowchart'
  | 'loop-cycle'
  | 'function-machine'
  | 'params-return'
  | 'scope-boxes'
  | 'list-index'
  | 'list-ops'
  | 'dict-search'

export interface Question {
  id: string
  prompt: string
  code?: string
  choices: string[]
  answer: number
  explanation: string
  fix: string
}

export interface Flashcard {
  front: string
  back: string
  code?: string
}

export interface Concept {
  term: string
  symbol?: string
  color: ConceptColor
  detail: string
}

export interface Lesson {
  id: string
  number: string
  title: string
  hook: string
  eli12: string
  diagram: DiagramKey
  diagramCaption: string
  concepts: Concept[]
  trap: { title: string; detail: string; code?: string }
  example: { problem: string; code?: string; steps: string[]; answer: string }
  cheatSheet: string[]
  flashcards: Flashcard[]
  quiz: Question[]
}

export interface Unit {
  id: string
  number: number
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  number: number
  title: string
  short: string
  zone: Zone
  units: Unit[]
}

export type View =
  | { type: 'dashboard' }
  | { type: 'schedule' }
  | { type: 'course'; courseId: string }
  | { type: 'item'; courseId: string; itemId: string }
