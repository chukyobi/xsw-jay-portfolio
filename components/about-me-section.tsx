"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background border-t border-border"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div ref={contentRef} className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug">
            Who I Am
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            I’m a software engineer passionate about designing meaningful
            technology experiences that make life easier, smarter, and more
            connected. With a background rooted in both creative problem-solving
            and strong engineering principles, I enjoy building clean, scalable,
            and intuitive digital systems.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed">
            My journey blends years of hands-on development across front-end and
            back-end systems with a growing love for AI, cybersecurity, and
            digital accessibility. I believe in crafting code with empathy —
            always thinking about the user first, and how technology can serve
            rather than overwhelm.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Outside the codebase, I explore innovative intersections of tech,
            human experience, and social impact — continually asking: how can we
            build smarter and better for everyone?
          </p>
        </div>
      </div>
    </section>
  )
}
