"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BriefcaseIcon, GraduationCapIcon } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Sample data - would be fetched from Supabase in a real implementation
const experienceData = [
  {
    id: "1",
    company: "Tech Innovations Inc.",
    position: "Senior Full-Stack Developer",
    description:
      "Led the development of a SaaS platform using React, Node.js, and PostgreSQL. Implemented CI/CD pipelines and improved application performance by 40%.",
    startDate: "2021-06-01",
    endDate: null,
    isCurrent: true,
  },
  {
    id: "2",
    company: "Digital Solutions Ltd.",
    position: "Full-Stack Developer",
    description:
      "Developed and maintained multiple web applications using the MERN stack. Collaborated with design and product teams to deliver high-quality software solutions.",
    startDate: "2019-03-01",
    endDate: "2021-05-31",
    isCurrent: false,
  },
  {
    id: "3",
    company: "WebTech Startup",
    position: "Frontend Developer",
    description:
      "Built responsive user interfaces using React and implemented state management with Redux. Worked in an agile environment with daily stand-ups and sprint planning.",
    startDate: "2017-09-01",
    endDate: "2019-02-28",
    isCurrent: false,
  },
]

const educationData = [
  {
    id: "1",
    institution: "Tech University",
    degree: "Master of Science",
    fieldOfStudy: "Computer Science",
    description:
      "Specialized in Software Engineering and Artificial Intelligence. Completed thesis on optimizing neural networks for edge computing.",
    startDate: "2015-09-01",
    endDate: "2017-06-30",
    isCurrent: false,
  },
  {
    id: "2",
    institution: "State University",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Engineering",
    description:
      "Focused on software development, algorithms, and data structures. Participated in multiple hackathons and coding competitions.",
    startDate: "2011-09-01",
    endDate: "2015-06-30",
    isCurrent: false,
  },
]

function formatDate(dateString: string | null) {
  if (!dateString) return "Present"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("experience")

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Tabs animation
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

      // Timeline animation
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
    }, sectionRef)

    return () => ctx.revert()
  }, [activeTab])

  return (
    <section id="experience" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">My professional journey and academic background.</p>
        </div>

        <div ref={tabsRef}>
          <Tabs defaultValue="experience" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <div ref={timelineRef} className="relative flex flex-col items-center">
                {/* Main vertical line */}
                <div className="absolute h-full w-1 bg-blue-accent/30 left-1/2 transform -translate-x-1/2"></div>

                {experienceData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`timeline-item relative w-full flex ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    } mb-12`}
                  >
                    {/* Horizontal connector line */}
                    <div
                      className={`absolute top-8 h-0.5 bg-blue-accent/30 w-1/4 ${
                        index % 2 === 0 ? "left-1/2" : "right-1/2"
                      }`}
                    ></div>

                    {/* Node */}
                    <div className="absolute left-1/2 top-8 w-4 h-4 rounded-full bg-blue-accent transform -translate-x-1/2 -translate-y-1/2 z-10"></div>

                    {/* Content */}
                    <Card
                      className={`w-5/12 border border-border/50 hover:border-blue-accent/50 transition-all duration-300 ${
                        index % 2 === 0 ? "ml-auto mr-8" : "mr-auto ml-8"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="mb-2">
                          <h3 className="font-bold text-lg">{item.company}</h3>
                          <p className="text-blue-accent">{item.position}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(item.startDate)} - {formatDate(item.endDate)}
                          </p>
                        </div>
                        <p className="text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-0">
              <div ref={timelineRef} className="relative flex flex-col items-center">
                {/* Main vertical line */}
                <div className="absolute h-full w-1 bg-purple-accent/30 left-1/2 transform -translate-x-1/2"></div>

                {educationData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`timeline-item relative w-full flex ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    } mb-12`}
                  >
                    {/* Horizontal connector line */}
                    <div
                      className={`absolute top-8 h-0.5 bg-purple-accent/30 w-1/4 ${
                        index % 2 === 0 ? "left-1/2" : "right-1/2"
                      }`}
                    ></div>

                    {/* Node */}
                    <div className="absolute left-1/2 top-8 w-4 h-4 rounded-full bg-purple-accent transform -translate-x-1/2 -translate-y-1/2 z-10"></div>

                    {/* Content */}
                    <Card
                      className={`w-5/12 border border-border/50 hover:border-purple-accent/50 transition-all duration-300 ${
                        index % 2 === 0 ? "ml-auto mr-8" : "mr-auto ml-8"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="mb-2">
                          <h3 className="font-bold text-lg">{item.institution}</h3>
                          <p className="text-purple-accent">
                            {item.degree} in {item.fieldOfStudy}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(item.startDate)} - {formatDate(item.endDate)}
                          </p>
                        </div>
                        <p className="text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
