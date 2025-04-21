"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BriefcaseIcon, GraduationCapIcon, CalendarIcon } from "lucide-react"
import { getExperience, getEducation } from "@/lib/actions"
import type { Experience, Education } from "@/lib/types"
import { useIsMobile } from "@/hooks/use-mobile"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackExperience: Experience[] = [
  {
    id: "1",
    company: "Soltec Engineering",
    position: "Software Engineer",
    description:
      "Leading the development of the company's academy platform using React, Node.js, and PostgreSQL. Hosted on AWS cloud infracsture, Implemented CI/CD pipelines and improved application performance by 40%.",
    start_date: "2025-01-08",
    end_date: null,
    is_current: true,
  },
  {
    id: "2",
    company: "National Bureau of Statistics",
    position: "Data Editor",
    description:
      "comprehensive data manipulation, editing, and refinement processes by utilizing survey solutions for the National Agricultural Sample Survey (NASS) sponsored by the World Bank. Collaborated with the software engineering team to implement real-time updates of pertinent statistical data to both their database and public website.",
    start_date: "2022-08-01",
    end_date: "2023-07-23",
    is_current: false,
  },
  {
    id: "3",
    company: "Urban10 Media",
    position: "Software Developer",
    description:
      "Built responsive user interfaces using React and implemented state management with Redux. Worked in an agile environment with daily stand-ups and sprint planning.",
    start_date: "2021-07-12",
    end_date: "2022-05-28",
    is_current: false,
  },
]

const fallbackEducation: Education[] = [
  {
    id: "1",
    institution: "Nnamdi Azikwiwe University",
    degree: "Master of Science",
    field_of_study: "Computer Science",
    description:
      "Specialized in Software Engineering and Artificial Intelligence. Completing thesis on assistive glasses for the hearing impaired using artificial intelligence.",
    start_date: "2024-02-10",
    end_date: null,
    is_current: true,
  },
  {
    id: "2",
    institution: "Nnamdi Azikiwe University",
    degree: "Bachelor of Engineering",
    field_of_study: "Electronic and Computer Engineering",
    description:
      "Focused on computer engineering, electronic design algorithms, and data structures. Participated in multiple hackathons and coding competitions.",
    start_date: "2015-10-15",
    end_date: "2021-05-17",
    is_current: false,
  },
]

function formatDate(dateString: string | null) {
  if (!dateString) return "Present"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

export function ExperienceSection() {
  const [experience, setExperience] = useState<Experience[]>(fallbackExperience)
  const [education, setEducation] = useState<Education[]>(fallbackEducation)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience")

  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const mobileTimelineRef = useRef<HTMLDivElement>(null)
  const verticalLineRef = useRef<HTMLDivElement>(null)

  const isMobile = useIsMobile()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expData = await getExperience()
        const eduData = await getEducation()

        if (expData.length > 0) setExperience(expData)
        if (eduData.length > 0) setEducation(eduData)
      } catch (error) {
        console.error("Error fetching experience/education data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 80%",
          },
        },
      )

      if (!isMobile) {
        const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item")
        if (timelineItems) {
          gsap.fromTo(
            timelineItems,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.2,
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 80%",
              },
            },
          )
        }
      } else {
        const mobileItems = mobileTimelineRef.current?.querySelectorAll(".mobile-timeline-item")
        if (mobileItems) {
          gsap.fromTo(
            mobileItems,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.2,
              scrollTrigger: {
                trigger: mobileTimelineRef.current,
                start: "top 80%",
              },
            },
          )
        }

        if (verticalLineRef.current) {
          gsap.fromTo(
            verticalLineRef.current,
            { height: 0 },
            {
              height: "100%",
              duration: 1.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: mobileTimelineRef.current,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 0.5,
              },
            },
          )
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading, activeTab, isMobile])

  const currentData = activeTab === "experience" ? experience : education

  return (
    <section id="experience" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">My professional journey and academic background.</p>
        </div>

        <div ref={tabsRef}>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "experience" | "education")}>
            <TabsList className="grid grid-cols-2 w-[400px] mx-auto mb-8">
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <BriefcaseIcon className="h-4 w-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCapIcon className="h-4 w-4" />
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="mt-0">
  <div
    ref={timelineRef}
    className="grid md:grid-cols-2 gap-6"
  >
    {experience.map((item) => {
      const isCurrent = item.end_date === null || new Date(item.end_date) > new Date();
      return (
        <Card
          key={item.id}
          className="border border-border/50 hover:shadow-lg hover:border-blue-500/50 transition-all duration-300"
        >
          <CardContent className="p-6 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                {/* Optional company logo or icon */}
                <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center text-sm font-bold text-primary">
                  {item.company.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.company}</h3>
                  <p className="text-blue-accent">{item.position}</p>
                </div>
              </div>
              {isCurrent && (
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="h-3 w-3 mr-1" />
              <span>
                {formatDate(item.start_date)} – {item.end_date ? formatDate(item.end_date) : "Present"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      );
    })}
  </div>
</TabsContent>

<TabsContent value="education" className="mt-0">
  <div
    ref={timelineRef}
    className="grid md:grid-cols-2 gap-6"
  >
    {education.map((item) => {
      const graduated = item.end_date && new Date(item.end_date) < new Date();
      return (
        <Card
          key={item.id}
          className="border border-border/50 hover:shadow-lg hover:border-purple-500/50 transition-all duration-300"
        >
          <CardContent className="p-6 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                {/* Optional institution logo or icon */}
                <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center text-sm font-bold text-primary">
                  {item.institution.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.institution}</h3>
                  <p className="text-purple-accent">
                    {item.degree} in {item.field_of_study}
                  </p>
                </div>
              </div>
              {graduated && (
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Graduated
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="h-3 w-3 mr-1" />
              <span>
                {formatDate(item.start_date)} – {item.end_date ? formatDate(item.end_date) : "Present"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      );
    })}
  </div>
</TabsContent>

          </Tabs>
        </div>
      </div>
    </section>
  )
}
