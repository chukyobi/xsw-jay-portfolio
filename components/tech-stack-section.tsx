"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTechnologiesByCategory } from "@/lib/actions"
import type { Technology } from "@/lib/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Combine all fallback techs into one array
const fallbackTechnologies: Technology[] = [
  { id: "7", name: "Next.js", category: "frontend", icon: "/brand-nextjs.svg" },
  { id: "8", name: "Expo", category: "frontend", icon: "/icons8-expo.svg" },
  { id: "11", name: "Node.js", category: "backend", icon: "/logo-nodejs.svg" },
  { id: "12", name: "Express", category: "backend", icon: "/express-original.svg" },
  { id: "13", name: "Spring Boot", category: "backend", icon: "/spring-boot.svg" },
  { id: "14", name: "Golang", category: "languages", icon: "/Go-black.png" },

  
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

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <Card key={tech.id} className="tech-card p-4 border rounded-xl hover:shadow-md transition-all">
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
