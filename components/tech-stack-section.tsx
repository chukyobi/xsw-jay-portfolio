"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTechnologiesByCategory } from "@/lib/actions"
import type { Technology } from "@/lib/types"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Fallback data in case the database is empty
const fallbackTechnologies: Record<string, Technology[]> = {
  languages: [
    { id: "1", name: "JavaScript", category: "languages", icon: "/placeholder.svg?height=50&width=50" },
    { id: "2", name: "TypeScript", category: "languages", icon: "/placeholder.svg?height=50&width=50" },
    { id: "3", name: "C#", category: "languages", icon: "/placeholder.svg?height=50&width=50" },
    { id: "4", name: "Golang", category: "languages", icon: "/placeholder.svg?height=50&width=50" },
    { id: "5", name: "Proteus", category: "languages", icon: "/placeholder.svg?height=50&width=50" },
  ],
  frontend: [
    { id: "6", name: "React.js", category: "frontend", icon: "/placeholder.svg?height=50&width=50" },
    { id: "7", name: "Next.js", category: "frontend", icon: "/placeholder.svg?height=50&width=50" },
    { id: "8", name: "Expo", category: "frontend", icon: "/placeholder.svg?height=50&width=50" },
    { id: "9", name: "Tailwind CSS", category: "frontend", icon: "/placeholder.svg?height=50&width=50" },
    { id: "10", name: "GSAP", category: "frontend", icon: "/placeholder.svg?height=50&width=50" },
  ],
  backend: [
    { id: "11", name: "Node.js", category: "backend", icon: "/placeholder.svg?height=50&width=50" },
    { id: "12", name: "Express", category: "backend", icon: "/placeholder.svg?height=50&width=50" },
    { id: "13", name: "Spring Boot", category: "backend", icon: "/placeholder.svg?height=50&width=50" },
    { id: "14", name: "REST API", category: "backend", icon: "/placeholder.svg?height=50&width=50" },
    { id: "15", name: "GraphQL", category: "backend", icon: "/placeholder.svg?height=50&width=50" },
  ],
  databases: [
    { id: "16", name: "MongoDB", category: "databases", icon: "/placeholder.svg?height=50&width=50" },
    { id: "17", name: "MySQL", category: "databases", icon: "/placeholder.svg?height=50&width=50" },
    { id: "18", name: "PostgreSQL", category: "databases", icon: "/placeholder.svg?height=50&width=50" },
    { id: "19", name: "Supabase", category: "databases", icon: "/placeholder.svg?height=50&width=50" },
    { id: "20", name: "Redis", category: "databases", icon: "/placeholder.svg?height=50&width=50" },
  ],
}

// Category colors and icons
const categoryConfig = {
  languages: { color: "bg-blue-accent/10 text-blue-accent border-blue-accent/20", icon: "🔤" },
  frontend: { color: "bg-purple-accent/10 text-purple-accent border-purple-accent/20", icon: "🖥️" },
  backend: { color: "bg-green-500/10 text-green-500 border-green-500/20", icon: "⚙️" },
  databases: { color: "bg-yellow-highlight/10 text-yellow-highlight border-yellow-highlight/20", icon: "🗄️" },
  devops: { color: "bg-red-500/10 text-red-500 border-red-500/20", icon: "🚀" },
  tools: { color: "bg-orange-500/10 text-orange-500 border-orange-500/20", icon: "🔧" },
}

export function TechStackSection() {
  const [technologies, setTechnologies] = useState<Record<string, Technology[]>>(fallbackTechnologies)
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await getTechnologiesByCategory()
        if (Object.keys(data).length > 0) {
          setTechnologies(data)
        }
      } catch (error) {
        console.error("Error fetching technologies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTechnologies()
  }, [])

  useEffect(() => {
    if (isLoading) return

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

      // Categories animation
      const categories = categoriesRef.current?.querySelectorAll(".tech-category")
      if (categories) {
        gsap.fromTo(
          categories,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 75%",
            },
          },
        )
      }

      // Tech cards animation
      const techCards = document.querySelectorAll(".tech-card")
      gsap.fromTo(
        techCards,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.03,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading])

  return (
    <section id="tech-stack" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of technologies I work with to build modern, scalable, and robust applications.
          </p>
        </div>

        <div ref={categoriesRef} className="space-y-12">
          {Object.entries(technologies).map(([category, techs]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig] || {
              color: "bg-primary/10 text-primary border-primary/20",
              icon: "💻",
            }

            return (
              <div key={category} className="tech-category">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`text-2xl p-2 rounded-md ${config.color.split(" ")[0]}`}>{config.icon}</div>
                  <h3 className="text-2xl font-bold capitalize">{category}</h3>
                  <div className="flex-1 h-px bg-border"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {techs.map((tech) => (
                    <Card
                      key={tech.id}
                      className={`tech-card overflow-hidden border hover:shadow-md transition-all duration-300 ${config.color.split(" ")[2]}`}
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-12 h-12 flex items-center justify-center mb-3">
                          <Image
                            src={tech.icon || "/placeholder.svg?height=50&width=50"}
                            alt={tech.name}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <Badge variant="outline" className={config.color}>
                          {tech.name}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
