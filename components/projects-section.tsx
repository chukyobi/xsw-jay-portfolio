"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { getProjects } from "@/lib/actions"
import type { Project } from "@/lib/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Soltec Academy Platform",
    description: "A full-featured learning management platform with video streaming, progress tracking, and collaborative tools.",
    thumbnail_url: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    status: "published",
    live_url: "#",
    github_url: "#",
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    title: "Portfolio CMS",
    description: "A headless CMS built to manage portfolio content with real-time updates, authentication and media uploads.",
    thumbnail_url: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "Supabase", "TypeScript"],
    status: "published",
    live_url: "#",
    github_url: "#",
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    title: "NBS Data Portal",
    description: "Statistical data management system for the National Bureau of Statistics — World Bank sponsored project.",
    thumbnail_url: "/placeholder.svg?height=600&width=800",
    technologies: ["React", "SurveySolutions", "PostgreSQL"],
    status: "published",
    live_url: "#",
    github_url: "#",
    created_at: "",
    updated_at: "",
  },
]

function ProjectCard({ project }: { project: Project }) {
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/projects/${project.id}`)} className="block group">
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
        {/* Image */}
        <div className="relative w-full h-60 overflow-hidden">
          <Image
            src={project.thumbnail_url || "/placeholder.svg?height=600&width=800"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />

          {/* Quick links */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            {project.live_url && project.live_url !== "#" && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black rounded-full p-2 hover:bg-blue-400 hover:text-white transition-colors z-10"
                title="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.github_url && project.github_url !== "#" && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black rounded-full p-2 hover:bg-neutral-700 hover:text-white transition-colors z-10"
                title="GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            )}
          </div>

          {/* View Details hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
            <span className="flex items-center gap-2 bg-white text-black text-xs font-bold px-4 py-2 rounded-full pointer-events-none">
              View Details <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {(project.technologies || []).slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-medium px-3 py-1 rounded-full bg-white/8 text-neutral-300 border border-white/10"
              >
                {tech}
              </span>
            ))}
            {(project.technologies || []).length > 4 && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/8 text-neutral-500 border border-white/10">
                +{(project.technologies || []).length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects(6)
        if (data.length > 0) setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    if (isLoading) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card-reveal",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [isLoading])

  const displayProjects = projects.length > 0 ? projects : fallbackProjects

  return (
    <section id="projects" ref={sectionRef} className="py-28 md:py-36 bg-[#060606] text-white relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-4">My Work</p>
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              PROJECTS
            </h2>
          </div>
          <Link href="/projects">
            <button className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm">
              View All
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
        </div>

        {/* Projects grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-3xl bg-neutral-900 h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <div key={project.id} className="project-card-reveal">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
