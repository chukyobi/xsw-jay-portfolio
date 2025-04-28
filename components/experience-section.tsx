"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BriefcaseIcon, GraduationCapIcon, CalendarIcon } from "lucide-react"
import { getExperience, getEducation } from "@/lib/actions"
import type { Experience, Education } from "@/lib/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function formatDate(dateString: string | null) {
  if (!dateString) return "Present"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

export function ExperienceSection() {
  const [timelineItems, setTimelineItems] = useState<(Experience | Education & { type: "experience" | "education" })[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expData = await getExperience()
        const eduData = await getEducation()

        const expMapped = expData.map(item => ({ ...item, type: "experience" }))
        const eduMapped = eduData.map(item => ({ ...item, type: "education" }))

        const merged = [...expMapped, ...eduMapped].sort((a, b) => {
          return new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        })

        setTimelineItems(merged)
      } catch (error) {
        console.error("Error fetching experience/education:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!timelineItems.length) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".timeline-card")
      if (cards) {
        gsap.fromTo(cards, 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power2.out", scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }}
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [timelineItems])

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A timeline of my professional experiences and academic milestones.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-border h-full"></div>

          <div className="flex flex-col gap-12">
            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0
              const isExperience = item.type === "experience"
              const isCurrent = !item.end_date || new Date(item.end_date) > new Date()

              return (
                <div key={item.id} className={`timeline-card relative w-full md:w-1/2 ${isLeft ? "md:pr-10 md:ml-auto" : "md:pl-10 md:mr-auto"} group`}>
                  <div className={`relative bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}>
                    {/* Icon */}
                    <div className="absolute -left-6 top-6 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                      {isExperience ? <BriefcaseIcon className="w-5 h-5" /> : <GraduationCapIcon className="w-5 h-5" />}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="uppercase tracking-wide font-semibold">{isExperience ? "Work Experience" : "Education"}</span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {formatDate(item.start_date)} – {formatDate(item.end_date)}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold">
                        {isExperience ? (item as Experience).position : (item as Education).degree}
                      </h3>

                      <p className="text-blue-accent">
                        {isExperience ? (item as Experience).company : (item as Education).institution}
                      </p>

                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>

                      {isCurrent && (
                        <span className="mt-2 inline-block text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
