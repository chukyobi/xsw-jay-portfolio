"use client"

import { useEffect, useRef, useState } from "react"
import { getExperience } from "@/lib/actions"
import type { Experience } from "@/lib/types"

const fallbackExperience: Experience[] = [
  {
    id: "1",
    company: "Soltec Engineering",
    position: "Software Engineer",
    location: "Anambra, NG",
    description:
      "Leading the development of the company's academy platform using React, Node.js, and PostgreSQL. Hosted on AWS cloud infrastructure, implemented CI/CD pipelines and improved application performance by 40%.",
    start_date: "2025-01-08",
    end_date: "",
    is_current: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    company: "National Bureau of Statistics",
    position: "Technical Support Engineer",
    location: "Abuja, NG",
    description:
      "Comprehensive data manipulation, editing, and refinement processes utilizing SurveySolutions for the National Agricultural Sample Survey (NASS) sponsored by the World Bank. Collaborated with the software engineering team to implement real-time statistical data updates.",
    start_date: "2022-08-01",
    end_date: "2023-07-23",
    is_current: false,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    company: "Urban10 Media",
    position: "Software Developer",
    location: "Anambra, NG",
    description:
      "Built responsive user interfaces using React and implemented state management with Redux. Worked in an agile environment with daily stand-ups and sprint planning.",
    start_date: "2021-07-12",
    end_date: "2022-05-28",
    is_current: false,
    created_at: "",
    updated_at: "",
  },
]

function formatDate(dateString: string | null) {
  if (!dateString) return "Present"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

function calculateDuration(start: string, end: string | null) {
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

export function ExperienceSection() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expData = await getExperience()
        if (expData.length > 0) setExperience(expData)
      } catch (error) {
        console.error("Error fetching experience:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const data = experience.length ? experience : fallbackExperience

  return (
    <section id="experience" ref={sectionRef} className="py-28 md:py-36 bg-[#080808] text-white relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-4">Career Path</p>
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
            EXPERIENCE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left navigation */}
          <div className="flex flex-col gap-2">
            {data.map((exp, i) => (
              <button
                key={exp.id}
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
                  {formatDate(exp.start_date)} — {formatDate(exp.end_date ?? null)}
                </p>
                <p
                  className={`font-bold text-sm transition-colors ${activeIndex === i ? "text-white" : "text-neutral-400"
                    }`}
                >
                  {exp.company}
                </p>
                <p
                  className={`text-xs transition-colors mt-0.5 ${activeIndex === i ? "text-neutral-300" : "text-neutral-600"
                    }`}
                >
                  {exp.position}
                </p>
              </button>
            ))}
          </div>

          {/* Right detail */}
          <div className="md:col-span-2">
            {data[activeIndex] && (
              <div
                key={data[activeIndex].id}
                className="animate-in fade-in duration-300"
              >
                {/* Role header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight">
                      {data[activeIndex].position}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-blue-400 font-semibold">{data[activeIndex].company}</span>
                      {data[activeIndex].location && (
                        <>
                          <span className="text-neutral-700">•</span>
                          <span className="text-neutral-400 text-sm">{data[activeIndex].location}</span>
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
                <p className="text-neutral-400 leading-relaxed text-base">
                  {data[activeIndex].description}
                </p>

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
