import type { Course } from '@/lib/types'

import { cspUnit1 } from './csp/unit-1'
import { cspUnit2 } from './csp/unit-2'
import { cspUnit3 } from './csp/unit-3'
import { cspUnit4 } from './csp/unit-4'
import { cspUnit5 } from './csp/unit-5'

import { biology } from './biology'
import { algebra } from './algebra'
import { aphg } from './aphg'
import { litComp } from './lit-comp'
import { health } from './health'

export const courses: Course[] = [
  {
    id: 'csp',
    number: 1,
    title: 'AP Computer Science Principles',
    short: 'AP CSP',
    zone: 'red',
    units: [
      cspUnit1,
      cspUnit2,
      cspUnit3,
      cspUnit4,
      cspUnit5,
    ],
  },
  { ...biology, id: 'bio', number: 2, zone: 'red' },
  { ...algebra, id: 'alg', number: 3, zone: 'red' },
  { ...aphg, id: 'geo', number: 4, zone: 'red' },
  { ...litComp, id: 'lit', number: 5, zone: 'yellow' },
  { ...health, id: 'hpf', number: 6, zone: 'yellow' },
]

export const getCourse = (id: string) =>
  courses.find((course) => course.id === id)

export const getUnit = (courseId: string, unitId: string) =>
  getCourse(courseId)?.units.find((unit) => unit.id === unitId)

export const getLesson = (
  courseId: string,
  unitId: string,
  lessonId: string,
) =>
  getUnit(courseId, unitId)?.lessons.find((lesson) => lesson.id === lessonId)

export default courses
