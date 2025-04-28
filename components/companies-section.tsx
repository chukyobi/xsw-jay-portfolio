"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Sample data - would be fetched from Supabase in a real implementation
const companiesData = [
  { id: "1", name: "Company 1", logoUrl: "/adavanapp-logo-removebg-preview.png?height=80&width=200" },
  { id: "2", name: "Company 2", logoUrl: "/jambaze-logo.svg?height=80&width=200" },
  // { id: "3", name: "Company 3", logoUrl: "/nbs-logo.png?height=80&width=200" },
  // { id: "4", name: "Company 4", logoUrl: "/urban10-logo.svg?height=80&width=200" },
  
]

export function CompaniesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        },
      )

      // Parallax scrolling for logos
      if (logosRef.current) {
        gsap.to(logosRef.current, {
          x: "-50%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Companies I've Worked With</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Trusted by innovative companies around the world.</p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div ref={logosRef} className="flex space-x-16 py-8 w-[200%]">
          {[...companiesData, ...companiesData].map((company, index) => (
            <div
              key={`${company.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-40 h-20 grayscale opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={company.logoUrl || "/placeholder.svg"}
                alt={company.name}
                width={160}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
