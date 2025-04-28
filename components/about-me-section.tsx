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
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {/* Left Text Block */}
          <div className="flex flex-col justify-between h-full space-y-10">
            <p className="text-muted-foreground text-lg leading-relaxed">
              I’m a passionate software engineer crafting meaningful digital experiences that empower users and drive innovation.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              — Merging creativity with strong engineering principles, I focus on building clean, intuitive, and scalable applications.
            </p>
          </div>

          {/* Center Image */}
          <div className="flex justify-center">
            <img
              src="/ProfileJay.jpeg"
              alt="Chukwudi Obi"
              className="rounded-3xl w-[300px] h-[400px] object-cover shadow-2xl border-2 border-border"
            />
          </div>

          {/* Right Text Block */}
          <div className="flex flex-col justify-between h-full space-y-10">
            <p className="text-muted-foreground text-lg leading-relaxed">
              — Beyond the code, I’m fascinated by AI, cybersecurity, and building accessible tech that truly serves people.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Always learning, always evolving — committed to creating tech that bridges gaps and sparks change.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
