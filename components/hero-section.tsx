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
      {/* Navbar INSIDE Hero */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-6">
        <div className="flex items-center space-x-2 text-lg font-bold">
          <span>Chukwudi</span>
          <span className="text-gray-200">Obi</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground hidden md:inline">Let's Connect</span>
          <div className="bg-background border px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            ogwunelsondavid@gmail.com
          </div>
        </div>
      </div>

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
        {/* Skill icons here */}
      </div>
    </section>
  )
}
