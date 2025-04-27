"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

const placeholderImages = [
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

      gsap.to(leftScrollRef.current, {
        yPercent: -50,
        repeat: -1,
        ease: "none",
        duration: 30,
      })

      gsap.to(rightScrollRef.current, {
        yPercent: 50,
        repeat: -1,
        ease: "none",
        duration: 30,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Gradient Fade Top */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      {/* Gradient Fade Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* Left Scrolling Images */}
      <div className="absolute top-24 bottom-24 left-4 w-40 overflow-hidden opacity-30 hidden md:block">
        <div ref={leftScrollRef} className="flex flex-col gap-8">
          {[...placeholderImages, ...placeholderImages].map((src, i) => (
            <img
              key={`left-${i}`}
              src={src}
              alt="project"
              className="w-full rounded-xl shadow-xl object-cover"
            />
          ))}
        </div>
      </div>

      {/* Right Scrolling Images */}
      <div className="absolute top-24 bottom-24 right-4 w-40 overflow-hidden opacity-30 hidden md:block">
        <div ref={rightScrollRef} className="flex flex-col gap-8">
          {[...placeholderImages, ...placeholderImages].map((src, i) => (
            <img
              key={`right-${i}`}
              src={src}
              alt="project"
              className="w-full rounded-xl shadow-xl object-cover"
            />
          ))}
        </div>
      </div>

      {/* Top Navbar */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-6">
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

      {/* Background Dots */}
      <div className="absolute inset-2 bg-dot bg-repeat opacity-10 pointer-events-none" />

      {/* Hero Text */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
        SENIOR<br />SOFTWARE<br />ENGINEER<span className="inline-block align-top ml-2">©</span>
      </h1>

      {/* Subheading */}
      <p className="text-muted-foreground text-sm md:text-base mt-6 font-medium">
        CRAFTING SCALABLE SOFTWARE THROUGH CREATIVE PROBLEM-SOLVING.
      </p>

      {/* Skills */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-16">
        {/* Skill icons here */}
      </div>
    </section>
  )
}
