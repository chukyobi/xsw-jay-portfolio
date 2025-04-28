"use client"

import { useEffect, useRef } from "react"
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
    thumbnail_url: "/lumina-ecommerce.png",
    technologies: ["Figma", "Webflow", "UI/UX"],
    href: "/projects/1",
    size: "large",
  },
  {
    id: "2",
    title: "Kendrick Agency",
    thumbnail_url: "/alpharand.png",
    technologies: ["Next.js", "GSAP", "Framer Motion"],
    href: "/projects/2",
    size: "small",
  },
  {
    id: "3",
    title: "Color Bubble",
    thumbnail_url: "/cinema_app.png",
    technologies: ["React", "Three.js"],
    href: "/projects/3",
    size: "small",
  },
  {
    id: "4",
    title: "Black Square",
    thumbnail_url: "/real-eastate.png",
    technologies: ["Next.js", "Tailwind"],
    href: "/projects/4",
    size: "large",
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
              y: () => gsap.utils.random(-8, 8),
              repeat: -1,
              yoyo: true,
              duration: 1.2,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {projectsData.filter((_, i) => i % 2 === 0).map((project) => (
              <Link key={project.id} href={project.href} className="block">
                <div
                  className={`project-card group relative overflow-hidden rounded-2xl bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 ${
                    project.size === "large" ? "h-[6000px]" : "h-[550px]"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={project.thumbnail_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Tech stack */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="tech-pill px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-4 left-4 text-lg font-bold">
                    {project.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column (OFFSET) */}
          <div className="flex flex-col gap-8 mt-16 sm:mt-24">
            {projectsData.filter((_, i) => i % 2 !== 0).map((project) => (
              <Link key={project.id} href={project.href} className="block">
                <div
                  className={`project-card group relative overflow-hidden rounded-2xl bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 ${
                    project.size === "large" ? "h-[600px]" "w-[400]": "h-[550px]" "w-[350]"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={project.thumbnail_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Tech stack */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="tech-pill px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-4 left-4 text-lg font-bold">
                    {project.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All */}
        <div className="flex justify-center mt-20">
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
