"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getTechnologiesByCategory } from "@/lib/actions"
import type { Technology } from "@/lib/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackTechnologies: Technology[] = [
  { id: "1", name: "Next.js", category: "Frontend", icon: "/brand-nextjs.svg", created_at: "", updated_at: "" },
  { id: "2", name: "Expo", category: "Frontend", icon: "/icons8-expo.svg", created_at: "", updated_at: "" },
  { id: "3", name: "React", category: "Frontend", icon: "/react.svg", created_at: "", updated_at: "" },
  { id: "4", name: "Node.js", category: "Backend", icon: "/logo-nodejs.svg", created_at: "", updated_at: "" },
  { id: "5", name: "Express", category: "Backend", icon: "/express-original.svg", created_at: "", updated_at: "" },
  { id: "6", name: "Spring Boot", category: "Backend", icon: "/spring-boot.svg", created_at: "", updated_at: "" },
  { id: "7", name: "Golang", category: "Languages", icon: "/Go-black.png", created_at: "", updated_at: "" },
  { id: "8", name: "Java", category: "Languages", icon: "/icons8-java-logo.svg", created_at: "", updated_at: "" },
  { id: "9", name: "Python", category: "Languages", icon: "/python.svg", created_at: "", updated_at: "" },
  { id: "10", name: "TypeScript", category: "Languages", icon: "/typescript.svg", created_at: "", updated_at: "" },
  { id: "11", name: "PostgreSQL", category: "Database", icon: "/postgresql.svg", created_at: "", updated_at: "" },
  { id: "12", name: "Supabase", category: "Database", icon: "/supabase.svg", created_at: "", updated_at: "" },
]

export function TechStackSection() {
  const [technologies, setTechnologies] = useState<Technology[]>(fallbackTechnologies)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const sectionRef = useRef<HTMLDivElement>(null)
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
        ".tech-pill-item",
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [technologies])

  // Build categories
  const categories = ["All", ...Array.from(new Set(technologies.map((t) => t.category)))]
  const filtered =
    activeCategory === "All"
      ? technologies
      : technologies.filter((t) => t.category === activeCategory)

  return (
    <section id="tech-stack" ref={sectionRef} className="py-28 md:py-36 bg-[#0a0a0a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-4">Skills & Tools</p>
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">TECH STACK</h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-white/8 text-neutral-400 hover:bg-white/15 hover:text-white border border-white/10"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technologies */}
        <div ref={gridRef} className="flex flex-wrap gap-3">
          {filtered.map((tech) => (
            <div
              key={tech.id}
              className="tech-pill-item group flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 hover:bg-white/12 hover:border-white/25 transition-all duration-300 cursor-default"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 overflow-hidden flex-shrink-0">
                <Image
                  src={tech.icon || "/placeholder.svg"}
                  alt={tech.name}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
