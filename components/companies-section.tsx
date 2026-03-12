"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getCompanies } from "@/lib/actions"
import type { Company } from "@/lib/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackCompanies = [
  { id: "1", name: "AdavanApp", logo_url: "/adavanapp-logo-removebg-preview.png" },
  { id: "2", name: "Jambaze", logo_url: "/jambaze-logo.svg" },
  { id: "3", name: "JecBricks", logo_url: "/jecbricks-logo-removebg-preview.png" },
  { id: "4", name: "IPDigi", logo_url: "/ipdigi.png" },
  { id: "5", name: "Brand", logo_url: "/Black_Yellow_Minimalist_Brain_Logo-removebg-preview.png" },
]

export function CompaniesSection() {
  const [companies, setCompanies] = useState<Company[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompanies()
      if (data.length > 0) setCompanies(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite marquee — track1 scrolls left, track2 scrolls right  
      if (track1Ref.current) {
        gsap.to(track1Ref.current, {
          xPercent: -50,
          duration: 20,
          ease: "none",
          repeat: -1,
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const data = companies.length > 0 ? companies : fallbackCompanies
  const logos = [...data, ...data, ...data]

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#050505] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 sm:px-12 mb-12">
        <p className="text-xs font-semibold tracking-[0.3em] text-neutral-600 uppercase text-center">
          Companies & Partners
        </p>
        <h2 className="text-xl font-bold text-neutral-400 text-center mt-2">
          Trusted by innovative teams
        </h2>
      </div>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div ref={track1Ref} className="flex gap-16 items-center py-4" style={{ width: "200%" }}>
          {logos.map((company, index) => (
            <div
              key={`${company.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-36 h-16 group"
            >
              <Image
                src={company.logo_url || "/placeholder.svg"}
                alt={company.name}
                width={140}
                height={60}
                className="object-contain brightness-0 invert opacity-30 group-hover:opacity-70 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
