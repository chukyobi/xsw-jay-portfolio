"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const technologies = {
  languages: [
    { name: "JavaScript", logo: "/placeholder.svg?height=50&width=50" },
    { name: "TypeScript", logo: "/placeholder.svg?height=50&width=50" },
    { name: "C#", logo: "/placeholder.svg?height=50&width=50" },
    { name: "Golang", logo: "/placeholder.svg?height=50&width=50" },
    { name: "Proteus", logo: "/placeholder.svg?height=50&width=50" },
  ],
  frontend: [
    { name: "React.js", logo: "/placeholder.svg?height=50&width=50" },
    { name: "Next.js", logo: "/placeholder.svg?height=50&width=50" },
    { name: "Expo", logo: "/placeholder.svg?height=50&width=50" },
    { name: "Tailwind CSS", logo: "/placeholder.svg?height=50&width=50" },
    { name: "GSAP", logo: "/placeholder.svg?height=50&width=50" },
  ],
  backend: [
    { name: "Node.js", logo: "/placeholder.svg?height=50&width=50" },
    { name: "Express", logo: "/placeholder.svg?height=50&width=50" },
    { name: "Spring Boot", logo: "/placeholder.svg?height=50&width=50" },
    { name: "REST API", logo: "/placeholder.svg?height=50&width=50" },
    { name: "GraphQL", logo: "/placeholder.svg?height=50&width=50" },
  ],
  databases: [
    { name: "MongoDB", logo: "/placeholder.svg?height=50&width=50" },
    { name: "MySQL", logo: "/placeholder.svg?height=50&width=50" },
    { name: "PostgreSQL", logo: "/placeholder.svg?height=50&width=50" },
    { name: "Supabase", logo: "/placeholder.svg?height=50&width=50" },
    { name: "Redis", logo: "/placeholder.svg?height=50&width=50" },
  ],
}

export function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="tech-stack" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of technologies I work with to build modern, scalable, and robust applications.
          </p>
        </div>

        <div ref={tabsRef}>
          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="languages">Languages</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="databases">Databases</TabsTrigger>
            </TabsList>
            {Object.entries(technologies).map(([category, techs]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {techs.map((tech) => (
                    <Card
                      key={tech.name}
                      className="overflow-hidden border border-border/50 hover:border-blue-accent/50 transition-colors"
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 flex items-center justify-center mb-4">
                          <Image
                            src={tech.logo || "/placeholder.svg"}
                            alt={tech.name}
                            width={50}
                            height={50}
                            className="object-contain"
                          />
                        </div>
                        <h3 className="font-medium">{tech.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
