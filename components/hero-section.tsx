"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      {/* Background Polka Dots */}
      <div className="absolute inset-0 bg-dot bg-repeat opacity-10 pointer-events-none" />

      {/* Main Title */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
        SENIOR<br />SOFTWARE<br />ENGINEER<span className="inline-block align-top ml-2">©</span>
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground text-sm md:text-base mt-6 font-medium">
        CURRENTLY CRAFTING EXPERIENCES AT AJIAN LABS (2024 - PRESENT)
      </p>

      {/* Skills icons */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-16">
        {/* You can replace these with actual icons */}
        <img src="/icons/js.svg" alt="JS" className="w-8 h-8" />
        <img src="/icons/react.svg" alt="React" className="w-8 h-8" />
        <img src="/icons/nodejs.svg" alt="Node.js" className="w-8 h-8" />
        <img src="/icons/python.svg" alt="Python" className="w-8 h-8" />
        {/* Add more icons... */}
      </div>
    </section>
  )
}
