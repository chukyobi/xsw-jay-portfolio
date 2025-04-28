"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

const leftImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",

]

const rightImages = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg",
]

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const leftScrollRef = useRef<HTMLDivElement>(null)
  const rightScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )

      const left = leftScrollRef.current
      const right = rightScrollRef.current

      gsap.to(left, {
        yPercent: -50,
        repeat: -1,
        ease: "none",
        duration: 40,
      })

      gsap.to(right, {
        yPercent: 50,
        repeat: -1,
        ease: "none",
        duration: 40,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-start text-center px-4 overflow-hidden bg-background"
    >
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 bg-[url('/dot-grid.svg')] bg-repeat opacity-10 pointer-events-none z-0" />

      {/* Scrolling Images */}
      <div className="absolute inset-0 flex justify-between px-12 pointer-events-none z-0">
        {/* Left Column */}
        <div className="w-[250px] overflow-hidden relative">
          <div ref={leftScrollRef} className="flex flex-col space-y-6">
            {[...leftImages, ...leftImages, ...leftImages].map((src, i) => (
              <img
                key={`left-${i}`}
                src={src}
                alt="left-project"
                className="w-full rounded-xl object-cover opacity-20"
              />
            ))}
          </div>

          {/* Fade top and bottom */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Right Column */}
        <div className="w-[250px] overflow-hidden relative">
          <div ref={rightScrollRef} className="flex flex-col space-y-6">
            {[...rightImages, ...rightImages, ...rightImages].map((src, i) => (
              <img
                key={`right-${i}`}
                src={src}
                alt="right-project"
                className="w-full rounded-xl object-cover opacity-20"
              />
            ))}
          </div>

          {/* Fade top and bottom */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </div>

      {/* Top Content */}
      <div className="relative z-10 w-full px-6 pt-8">
        {/* Navbar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-lg font-bold">
            <span>Chukwudi</span>
            <span className="text-gray-200">Obi</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden md:inline">Let's Connect</span>
            <div className="bg-background border px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              Josephclinton.obi@gmail.com
            </div>
          </div>
        </div>

        {/* Hero Main Text */}
        <div className="mt-24 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
            SENIOR<br />SOFTWARE<br />ENGINEER<span className="inline-block align-top ml-2">©</span>
          </h1>

          <p className="text-muted-foreground text-sm md:text-base mt-6 font-medium">
            CRAFTING SCALABLE SOFTWARE THROUGH CREATIVE PROBLEM-SOLVING.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-16">
            {/* Skill icons here */}
          </div>
        </div>
      </div>
    </section>
  )
}
