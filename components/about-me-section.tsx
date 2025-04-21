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
  const kineticRef1 = useRef<HTMLDivElement>(null)
  const kineticRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
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

      // Kinetic CHUKWUDI
      gsap.fromTo(
        kineticRef1.current,
        { opacity: 0, y: 60 },
        {
          opacity: 0.05,
          y: 0,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      )

      // Kinetic OBI
      gsap.fromTo(
        kineticRef2.current,
        { opacity: 0, y: 80 },
        {
          opacity: 0.07,
          y: 10,
          duration: 3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
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
      className="py-24 md:py-32 bg-background border-t border-border relative overflow-hidden"
    >
      {/* Accent line */}
      <div className="absolute left-4 top-16 bottom-16 w-0.5 bg-gradient-to-b from-muted to-transparent rounded-full hidden md:block" />

      {/* Background kinetic text */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <h1
          ref={kineticRef1}
          className="absolute top-1/4 text-[16vw] md:text-[13vw] font-black tracking-tight whitespace-nowrap text-white opacity-5 select-none"
        >
          CHUKWUDI
        </h1>
        <h1
          ref={kineticRef2}
          className="absolute top-1/2 text-[14vw] md:text-[11vw] font-extrabold tracking-tight whitespace-nowrap text-white opacity-5 select-none"
        >
          OBI
        </h1>
      </div>

      {/* Foreground content */}
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div
          ref={contentRef}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/ProfileJay.jpeg" 
              alt="Chukwudi Obi"
              className="rounded-2xl w-80 h-100 object-cover shadow-xl border border-border"
            />
          </div>

          {/* Text content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug border-l-4 border-primary pl-4">
              Who I Am
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              I’m a software engineer passionate about designing meaningful
              technology experiences that make life easier, smarter, and more
              connected.
            </p>

            <div className="w-24 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full" />

            <p className="text-muted-foreground text-lg leading-relaxed">
              — With a background rooted in creative problem-solving and strong
              engineering principles, I enjoy building clean, scalable, and
              intuitive systems.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              — My journey blends hands-on development with a love for AI,
              cybersecurity, and digital accessibility. I write code with
              empathy — always thinking about how tech can truly serve.
            </p>

            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground text-base">
              “The best interfaces feel invisible — guiding, never demanding.”
            </blockquote>

            <p className="text-muted-foreground text-lg leading-relaxed">
              — Outside the codebase, I explore the intersections of tech,
              human experience, and social impact — continually asking: how can
              we build smarter and better for everyone?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
