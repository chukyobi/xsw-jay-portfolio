"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CalendarIcon, GraduationCapIcon, BriefcaseIcon } from "lucide-react"
import { getExperience, getEducation } from "@/lib/actions"
import type { Experience, Education } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackExperience: Experience[] = [
  {
    id: "1",
    company: "Soltec Engineering",
    position: "Software Engineer",
    description: "Leading platform development and CI/CD pipelines on AWS cloud infrastructure.",
    start_date: "2025-01-08",
    end_date: null,
    is_current: true,
  },
]

const fallbackEducation: Education[] = [
  {
    id: "1",
    institution: "Nnamdi Azikwiwe University",
    degree: "Master of Science",
    field_of_study: "Computer Science",
    description: "Specialized in Software Engineering and Artificial Intelligence.",
    start_date: "2024-02-10",
    end_date: null,
    is_current: true,
  },
]

function formatDate(dateString: string | null) {
  if (!dateString) return "Present"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

export function ExperienceSection() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expData = await getExperience()
        const eduData = await getEducation()

        if (expData.length > 0) setExperience(expData)
        if (eduData.length > 0) setEducation(eduData)
      } catch (error) {
        console.error("Error fetching experience/education:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading])

  const mergedTimeline = [
    ...(experience.length ? experience : fallbackExperience).map(item => ({
      type: "experience" as const,
      id: item.id,
      title: item.position,
      subtitle: item.company,
      description: item.description,
      start: item.start_date,
      end: item.end_date,
    })),
    ...(education.length ? education : fallbackEducation).map(item => ({
      type: "education" as const,
      id: item.id,
      title: `${item.degree} in ${item.field_of_study}`,
      subtitle: item.institution,
      description: item.description,
      start: item.start_date,
      end: item.end_date,
    })),
  ].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into my professional experience and educational background.
          </p>
        </div>

        <div className="relative pl-6 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-border">
          {mergedTimeline.map((item, index) => (
            <div key={item.id} className="timeline-item relative mb-12">
              <div className="absolute -left-[18px] top-1.5 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-background">
                {item.type === "experience" ? <BriefcaseIcon className="h-4 w-4" /> : <GraduationCapIcon className="h-4 w-4" />}
              </div>

              <Card className="ml-8">
                <CardContent className="p-6 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {formatDate(item.start)} - {item.end ? formatDate(item.end) : "Present"}
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{item.subtitle}</p>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {!mergedTimeline.length && (
          <div className="text-center text-muted-foreground mt-12">
            <p>No journey details available yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
