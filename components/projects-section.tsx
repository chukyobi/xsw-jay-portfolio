"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projectsData = [
  {
    id: "1",
    title: "Webflow Template",
    thumbnail_url: "/right2.png", 
    technologies: ["Figma", "Webflow", "UI/UX"],
    href: "/projects/1",
  },
  {
    id: "2",
    title: "Kendrick Agency",
    thumbnail_url: "/placeholder.svg",
    technologies: ["Next.js", "GSAP", "Framer Motion"],
    href: "/projects/2",
  },
  {
    id: "3",
    title: "Color Bubble",
    thumbnail_url: "/placeholder.svg",
    technologies: ["React", "Three.js"],
    href: "/projects/3",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      const cards = document.querySelectorAll(".project-card")

      cards.forEach((card) => {
        const techs = card.querySelectorAll(".tech-pill")

        card.addEventListener("mouseenter", () => {
          techs.forEach((pill) => {
            gsap.to(pill, {
              y: () => gsap.utils.random(-10, 10),
              repeat: -1,
              yoyo: true,
              duration: 1,
              ease: "sine.inOut",
            })
          })
        })

        card.addEventListener("mouseleave", () => {
          techs.forEach((pill) => {
            gsap.killTweensOf(pill)
            gsap.to(pill, { y: 0, duration: 0.5, ease: "power3.out" })
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-[#0D0D0D] text-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
            RECENT <br /> PROJECTS <span className="text-gray-500 text-xl">(2024)</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <Link key={project.id} href={project.href}>
              <div className="project-card group relative overflow-hidden rounded-2xl bg-neutral-900 hover:shadow-lg transition-shadow">
                <div className="relative h-[300px] w-full overflow-hidden">
                  <Image
                    src={project.thumbnail_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Tech stack pills */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="tech-pill text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Title */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-16">
          <Link href="/projects">
            <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
              View All Projects
              <span className="inline-block transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
