"use client"

import { useRef, useEffect } from "react"
import { Phone, Rocket } from "lucide-react"
// import { FaDiscord } from "react-icons/fa"
import { gsap } from "gsap"

const leftImages = [
  "/left1.png",
  "/left2.png",
  "/left3.png",
  "/left4.png",
  "/left5.png",
  
 
]

const rightImages = [
  "/right1.png",
  "/right2.png",
  "/right3.png",
  "/right4.png",
  "/right5.png",
  
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
        yPercent: -50,
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
     <div className="absolute inset-0 bg-dot bg-repeat opacity-10 pointer-events-none" />

      {/* Scrolling Images */}
      <div className="absolute inset-0 flex justify-between px-12 pointer-events-none z-0">
        {/* Left Column */}
        <div className="w-[250px] h-[300px] overflow-hidden relative">
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
        <div className="w-[250px] h-[300px] overflow-hidden relative">
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
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </div>
        <div className="absolute inset-0 bg-dot bg-repeat opacity-10 pointer-events-none" />

      {/* Top Content */}
      <div className="relative z-10 w-full px-6 pt-8">
        {/* Navbar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-lg font-bold">
            <span>Chukwudi</span>
            <span className="text-gray-200">Obi</span>
          </div>
          <div className="flex items-center space-x-4">
           <span className="text-sm text-muted-foreground hidden md:inline">
      Join My Community
    </span>

    <div className="relative flex items-center justify-center bg-background border px-4 py-2 rounded-full">
      {/* Discord Icon */}
{/*       <FaDiscord className="text-indigo-500 w-6 h-6" /> */}

      {/* Online Green Dot */}
      <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
    </div>
          </div>
        </div>

        {/* Hero Main Text */}
        <div className="mt-24 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
            SENIOR<br /><span className="text-blue-500">SOFTWARE</span><br />ENGINEER<span className="inline-block align-top ml-2">©</span>
          </h1>

          <p className="text-muted-foreground text-sm md:text-base mt-6 font-medium">
            CRAFTING SCALABLE SOFTWARE THROUGH CREATIVE PROBLEM-SOLVING.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-16">
            <button className="flex items-center justify-center gap-1 px-8 py-4 rounded-full bg-background border border-white/20 text-lg font-semibold hover:bg-white hover:text-background transition-all duration-300">
              <Phone size={20} />
              Book a Call
            </button>
            <button className="flex items-center justify-center gap-1 px-8 py-4 rounded-full bg-blue-500 text-background text-lg font-semibold hover:bg-blue-600 transition-all duration-300">
              <Rocket size={20} />
              Amazing Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
