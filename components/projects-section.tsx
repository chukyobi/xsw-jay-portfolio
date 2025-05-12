"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink } from "lucide-react" // using lucide icons (very clean)

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projectsData = [
  {
    id: "1",
    title: "Webflow Template",
    thumbnail_url: "/left1.png",
    technologies: ["Figma", "Webflow", "UI/UX"],
    href: "/projects/1",
    github: "https://github.com/example/webflow-template",
    live: "https://example.com/webflow-template",
    size: "large",
  },
  {
    id: "2",
    title: "Kendrick Agency",
    thumbnail_url: "/alpharand.png",
    technologies: ["Next.js", "GSAP", "Framer Motion"],
    href: "/projects/2",
    github: "https://github.com/example/kendrick-agency",
    live: "https://example.com/kendrick-agency",
    size: "small",
  },
  {
    id: "3",
    title: "Bubbles Cinema",
    thumbnail_url: "/right4.png",
    technologies: ["React", "Three.js"],
    href: "/projects/3",
    github: "https://github.com/example/bubbles-cinema",
    live: "https://example.com/bubbles-cinema",
    size: "small",
  },
  {
    id: "4",
    title: "Estate Nigeria",
    thumbnail_url: "/right3.png",
    technologies: ["Next.js", "Tailwind"],
    href: "/projects/4",
    github: "https://github.com/example/estate-nigeria",
    live: "https://example.com/estate-nigeria",
    size: "large",
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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
      <div className="container mx-auto px-6 sm:px-12">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
            RECENT <br /> PROJECTS <span className="text-gray-500 text-xl">(2025)</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          {/* Left Column */}
          <div className="flex flex-col gap-10 items-center">
            {projectsData.filter((_, i) => i % 2 === 0).map((project) => (
              <div key={project.id} className="block w-[90%]">
                <div
                  className={`project-card group relative overflow-hidden rounded-3xl bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 ${
                    project.size === "large" ? "h-[600px]" : "h-[550px]"
                  }`}
                >
                  {/* Main card click area */}
                  <div 
                    onClick={() => router.push(project.href)}
                    className="cursor-pointer absolute inset-0 z-0"
                  ></div>
                  
                  {/* External Live Link Icon */}
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-10 bg-white text-black rounded-full p-2 hover:bg-gray-300 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} />
                  </a>

                  <div className="relative w-full h-5/6">
                    <Image
                      src={project.thumbnail_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-3xl"
                    />
                  </div>

                  {/* Bottom Solid Info Section */}
                  <div className="h-1/6 flex items-center justify-between px-4 bg-neutral-900 rounded-b-3xl">
                    <div className="flex gap-2 flex-wrap">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="tech-pill px-3 py-1 rounded-full bg-neutral-800 text-white text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 z-10" onClick={(e) => e.stopPropagation()}>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-xs underline">
                        Visit
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs underline">
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column (Offset) */}
          <div className="flex flex-col gap-10 items-center mt-12 sm:mt-20">
            {projectsData.filter((_, i) => i % 2 !== 0).map((project) => (
              <div key={project.id} className="block w-[90%]">
                <div
                  className={`project-card group relative overflow-hidden rounded-3xl bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 ${
                    project.size === "large" ? "h-[600px]" : "h-[550px]"
                  }`}
                >
                  {/* Main card click area */}
                  <div 
                    onClick={() => router.push(project.href)}
                    className="cursor-pointer absolute inset-0 z-0"
                  ></div>
                  
                  {/* External Live Link Icon */}
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-10 bg-white text-black rounded-full p-2 hover:bg-gray-300 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} />
                  </a>

                  <div className="relative w-full h-5/6">
                    <Image
                      src={project.thumbnail_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-3xl"
                    />
                  </div>

                  {/* Bottom Solid Info Section */}
                  <div className="h-1/6 flex items-center justify-between px-4 bg-neutral-900 rounded-b-3xl">
                    <div className="flex gap-2 flex-wrap">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="tech-pill px-3 py-1 rounded-full bg-neutral-800 text-white text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 z-10" onClick={(e) => e.stopPropagation()}>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-xs underline">
                        Visit
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs underline">
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
