"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowRight } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Sample data - would be fetched from Supabase in a real implementation
const projectsData = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    thumbnail_url: "/placeholder.svg?height=400&width=600",
    github_url: "https://github.com",
    live_url: "https://example.com",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    thumbnail_url: "/placeholder.svg?height=400&width=600",
    github_url: "https://github.com",
    live_url: "https://example.com",
    technologies: ["React", "Firebase", "Material UI", "Redux"],
  },
  {
    id: "3",
    title: "Fitness Tracker Mobile App",
    description: "A cross-platform mobile application for tracking workouts and fitness progress.",
    thumbnail_url: "/placeholder.svg?height=400&width=600",
    github_url: "https://github.com",
    live_url: "https://example.com",
    technologies: ["React Native", "Expo", "Firebase", "Redux"],
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

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

      // Projects animation
      if (projectsRef.current) {
        const projects = projectsRef.current.querySelectorAll(".project-card")
        gsap.fromTo(
          projects,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 75%",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work and personal projects.
          </p>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <Card
              key={project.id}
              className="project-card border border-border/50 hover:border-blue-accent/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.thumbnail_url || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                <div className="flex space-x-2">
                  {project.github_url && (
                    <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="outline">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                  )}
                  {project.live_url && (
                    <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Live Demo</span>
                      </Button>
                    </Link>
                  )}
                </div>
                <Link href={`/projects/${index + 1}`}>
                  <Button variant="ghost" className="text-blue-accent">
                    Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/projects">
            <Button className="group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
