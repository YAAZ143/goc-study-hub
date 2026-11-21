import type { Course } from '@/lib/types'

export function PrintCheatSheet({ course }: { course: Course }) {
  return (
    <div className="print-sheet hidden text-black print:block">
      <div className="mb-2 flex items-baseline justify-between border-b-2 border-black pb-1">
        <h1 className="text-[14px] font-bold">{course.title} — 1-Page Cheat Sheet</h1>
        <p className="text-[9px]">GOC Finals Command Center · AP pseudocode lists start at 1, Python at 0</p>
      </div>
      <div className="columns-3 gap-3 text-[8.5px] leading-snug">
        {course.units.map((unit) => (
          <section key={unit.id} className="mb-1.5">
            <h2 className="mb-0.5 break-after-avoid bg-black px-1 text-[9px] font-bold uppercase text-white">
              Unit {unit.number}: {unit.title}
            </h2>
            {unit.lessons.map((lesson) => (
              <div key={lesson.id} className="mb-1 break-inside-avoid">
                <h3 className="font-bold">
                  {lesson.number} {lesson.title}
                </h3>
                <ul className="list-disc pl-3">
                  {lesson.cheatSheet.map((line) => (
                    <li key={line} className="font-mono">{line}</li>
                  ))}
                </ul>
                <p className="italic">Trap: {lesson.trap.title}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
