"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { getTechnologiesByCategory } from "@/lib/actions"
import type { Technology } from "@/lib/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackTechnologies: Technology[] = [
  {
    id: "7", name: "Next.js", category: "frontend", icon: "/brand-nextjs.svg",
    created_at: "",
    updated_at: ""
  },
  {
    id: "8", name: "Expo", category: "frontend", icon: "/icons8-expo.svg",
    created_at: "",
    updated_at: ""
  },
  {
    id: "11", name: "Node.js", category: "backend", icon: "/logo-nodejs.svg",
    created_at: "",
    updated_at: ""
  },
  {
    id: "12", name: "Express", category: "backend", icon: "/express-original.svg",
    created_at: "",
    updated_at: ""
  },
  {
    id: "13", name: "Spring Boot", category: "backend", icon: "/spring-boot.svg",
    created_at: "",
    updated_at: ""
  },
  {
    id: "14", name: "Golang", category: "languages", icon: "/Go-black.png",
    created_at: "",
    updated_at: ""
  },
  {
    id: "15", name: "Java", category: "languages", icon: "/icons8-java-logo.svg",
    created_at: "",
    updated_at: ""
  },
  {
    id: "16", name: "Python", category: "languages", icon: "/python.svg",
    created_at: "",
    updated_at: ""
  },
]

export function TechStackSection() {
  const [technologies, setTechnologies] = useState<Technology[]>(fallbackTechnologies)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await getTechnologiesByCategory()
        const flatTechs = Object.values(data).flat()
        if (flatTechs.length > 0) {
          setTechnologies(flatTechs)
        }
      } catch (error) {
        console.error("Error fetching technologies:", error)
      }
    }

    fetchTechnologies()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".tech-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
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
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tools and technologies I use to build robust, scalable applications.
          </p>
        </div>

        {/* Mobile: Horizontal scroll | Tablet/Desktop: Grid */}
        <div
          ref={gridRef}
          className="md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 flex md:flex-none overflow-x-auto space-x-4 scrollbar-hide px-1 -mx-1"
        >
          {technologies.map((tech) => (
            <Card
              key={tech.id}
              className="tech-card min-w-[45%] md:min-w-0 p-4 border rounded-xl hover:shadow-md transition-all flex-shrink-0 md:flex-shrink"
            >
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg">
                  <Image
                    src={tech.icon || "/placeholder.svg"}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-lg">{tech.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
