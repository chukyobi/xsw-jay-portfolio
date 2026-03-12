"use client"

import { useEffect, useRef, useState } from "react"
import { getEducation } from "@/lib/actions"
import type { Education } from "@/lib/types"

const fallbackEducation: Education[] = [
  {
    id: "1",
    institution: "Federal University of Technology, Owerri",
    degree: "Bachelor of Engineering",
    field_of_study: "Information Management Technology",
    description:
      "Core coursework in Data Structures, Algorithms, Software Engineering, Database Management Systems, and Artificial Intelligence. Active member of National Association of Information Management Technology Students (NAIMTS)",
    start_date: "2017-10-01",
    end_date: "2022-12-01",
    is_current: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    institution: "Federal Government College, Nise",
    degree: "Senior Secondary Certificate",
    field_of_study: "Sciences",
    description: "Completed secondary education with distinction in Sciences.",
    start_date: "2011-09-01",
    end_date: "2017-06-30",
    is_current: false,
    created_at: "",
    updated_at: "",
  }
]

function formatDate(dateString: string | undefined | null) {
  if (!dateString) return "Present"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

function calculateDuration(start: string, end: string | undefined | null) {
  const startDate = new Date(start)
  const endDate = end ? new Date(end) : new Date()
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  const yearStr = years > 0 ? `${years}y` : ""
  const monthStr = remainingMonths > 0 ? `${remainingMonths}m` : ""
  return [yearStr, monthStr].filter(Boolean).join(" ")
}

export function EducationSection() {
  const [education, setEducation] = useState<Education[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eduData = await getEducation()
        if (eduData.length > 0) setEducation(eduData)
      } catch (error) {
        console.error("Error fetching education:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const data = education.length ? education : fallbackEducation

  return (
    <section id="education" ref={sectionRef} className="py-28 md:py-36 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="mb-16 text-right">
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-4">Academic Background</p>
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
            EDUCATION
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left navigation */}
          <div className="flex flex-col gap-2 order-2 md:order-1">
            {data.map((edu, i) => (
              <button
                key={edu.id}
                onClick={() => setActiveIndex(i)}
                className={`text-left px-5 py-4 rounded-2xl transition-all duration-300 group ${activeIndex === i
                    ? "bg-white/10 border border-white/20"
                    : "hover:bg-white/5 border border-transparent"
                  }`}
              >
                <p
                  className={`text-xs tracking-widest uppercase font-semibold mb-1 transition-colors ${activeIndex === i ? "text-blue-400" : "text-neutral-600 group-hover:text-neutral-400"
                    }`}
                >
                  {formatDate(edu.start_date)} — {formatDate(edu.end_date ?? null)}
                </p>
                <p
                  className={`font-bold text-sm transition-colors ${activeIndex === i ? "text-white" : "text-neutral-400"
                    }`}
                >
                  {edu.institution}
                </p>
                <p
                  className={`text-xs transition-colors mt-0.5 ${activeIndex === i ? "text-neutral-300" : "text-neutral-600"
                    }`}
                >
                  {edu.degree}
                </p>
              </button>
            ))}
          </div>

          {/* Right detail */}
          <div className="md:col-span-2 order-1 md:order-2">
            {data[activeIndex] && (
              <div
                key={data[activeIndex].id}
                className="animate-in fade-in duration-300"
              >
                {/* Role header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight">
                      {data[activeIndex].degree}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-blue-400 font-semibold">{data[activeIndex].institution}</span>
                      {data[activeIndex].field_of_study && (
                        <>
                          <span className="text-neutral-700">•</span>
                          <span className="text-neutral-400 text-sm">{data[activeIndex].field_of_study}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {data[activeIndex].is_current && (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current
                      </span>
                    )}
                    <span className="text-xs text-neutral-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                      {calculateDuration(data[activeIndex].start_date, data[activeIndex].end_date ?? null)}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-8" />

                {/* Description */}
                {data[activeIndex].description && (
                  <p className="text-neutral-400 leading-relaxed text-base">
                    {data[activeIndex].description}
                  </p>
                )}

                {/* Timeline badge */}
                <div className="mt-10 flex items-center gap-3">
                  <span className="text-sm text-neutral-600">
                    {formatDate(data[activeIndex].start_date)}
                  </span>
                  <div className="flex-1 h-px bg-neutral-800 relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-700"
                      style={{
                        width: data[activeIndex].is_current ? "100%" : "100%",
                      }}
                    />
                  </div>
                  <span className="text-sm text-neutral-600">
                    {formatDate(data[activeIndex].end_date ?? null)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
