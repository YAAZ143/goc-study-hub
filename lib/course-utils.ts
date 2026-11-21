import type { Course, Lesson, Question, Unit } from './types'

export type SeqItem =
  | { kind: 'lesson'; id: string; unit: Unit; lesson: Lesson }
  | { kind: 'unitExam'; id: string; unit: Unit }
  | { kind: 'final'; id: string }

export const unitExamId = (unit: Unit) => `${unit.id}-exam`
export const finalExamId = (course: Course) => `${course.id}-final`

export function getSequence(course: Course): SeqItem[] {
  const items: SeqItem[] = []
  for (const unit of course.units) {
    for (const lesson of unit.lessons) items.push({ kind: 'lesson', id: lesson.id, unit, lesson })
    items.push({ kind: 'unitExam', id: unitExamId(unit), unit })
  }
  if (course.units.length > 0) items.push({ kind: 'final', id: finalExamId(course) })
  return items
}

export function findItem(course: Course, id: string) {
  const seq = getSequence(course)
  const index = seq.findIndex((s) => s.id === id)
  return { item: index >= 0 ? seq[index] : undefined, prev: index > 0 ? seq[index - 1] : undefined, next: seq[index + 1] }
}

export function isUnlocked(course: Course, id: string, completed: Record<string, boolean>) {
  const { item, prev } = findItem(course, id)
  if (!item) return false
  return !prev || !!completed[prev.id]
}

export function itemLabel(item: SeqItem) {
  if (item.kind === 'lesson') return `Lesson ${item.lesson.number}: ${item.lesson.title}`
  if (item.kind === 'unitExam') return `Unit ${item.unit.number} Exam`
  return 'Course Final Exam'
}

export function getUnitExamQuestions(unit: Unit): Question[] {
  const [a, b, c] = unit.lessons
  return [...a.quiz.slice(0, 4), ...b.quiz.slice(0, 3), ...c.quiz.slice(0, 3)]
}

export function getFinalExamQuestions(course: Course): Question[] {
  return course.units.flatMap((u) => {
    const [a, b, c] = u.lessons
    return [a.quiz[4], b.quiz[4], c.quiz[3], c.quiz[4]]
  })
}

export function courseReadiness(course: Course, completed: Record<string, boolean>) {
  const seq = getSequence(course)
  if (seq.length === 0) return 0
  return Math.round((seq.filter((s) => completed[s.id]).length / seq.length) * 100)
}

export function firstOpenItem(course: Course, completed: Record<string, boolean>) {
  const seq = getSequence(course)
  return seq.find((s) => !completed[s.id]) ?? seq[seq.length - 1]
}

export function getCountdown(startDate: string | null) {
  const start = startDate ? new Date(startDate) : new Date()
  start.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const elapsed = Math.max(0, Math.round((today.getTime() - start.getTime()) / 86_400_000))
  return { day: Math.min(7, elapsed + 1), daysLeft: Math.max(0, 7 - elapsed) }
}

export function shuffle<T>(list: T[]): T[] {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
