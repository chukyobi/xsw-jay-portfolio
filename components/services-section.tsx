"use client"

import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Laptop, Zap, Cpu, ArrowUpRight } from "lucide-react"
import { getServices } from "@/lib/actions"
import type { Service } from "@/lib/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackServices = [
  {
    id: "1",
    title: "Web Development",
    description: "Building responsive, scalable web applications using React, Next.js, Node.js and modern tooling with best-in-class performance.",
    icon: "Laptop",
    gradient: "from-blue-500/20 to-blue-500/5",
    accent: "#3b82f6",
    number: "01",
  },
  {
    id: "2",
    title: "Mobile Development",
    description: "Cross-platform iOS & Android apps built with React Native / Expo — smooth, native-feeling experiences.",
    icon: "Code",
    gradient: "from-violet-500/20 to-violet-500/5",
    accent: "#8b5cf6",
    number: "02",
  },
  {
    id: "3",
    title: "Automation & Scripting",
    description: "Custom automation pipelines, bots and scripts that eliminate repetitive work and improve team productivity.",
    icon: "Zap",
    gradient: "from-amber-500/20 to-amber-500/5",
    accent: "#f59e0b",
    number: "03",
  },
  {
    id: "4",
    title: "Electronics & Embedded",
    description: "Designing and programming embedded systems, IoT devices and hardware-software integrations.",
    icon: "Cpu",
    gradient: "from-emerald-500/20 to-emerald-500/5",
    accent: "#10b981",
    number: "04",
  },
]

const iconMap: Record<string, any> = {
  Code,
  Laptop,
  Zap,
  Cpu,
}

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServices()
      if (data.length > 0) setServices(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Revert to using simple string selector which context scopes to sectionRef automatically
      gsap.fromTo(
        ".service-card-item",
        { opacity: 0, x: -50, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [services])

  return (
    <section id="services" ref={sectionRef} className="py-28 md:py-36 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-4">What I Do</p>
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              SERVICES
            </h2>
          </div>
          <p className="text-neutral-400 max-w-sm text-lg leading-relaxed">
            Specialized engineering services tailored to turn your ideas into premium digital products.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(services.length > 0 ? services : fallbackServices).map((service, idx) => {
            const IconName = service.icon || (fallbackServices[idx % fallbackServices.length].icon)
            const Icon = iconMap[IconName as string] || Laptop
            const gradient = (service as any).gradient || fallbackServices[idx % fallbackServices.length].gradient
            const accent = (service as any).accent || fallbackServices[idx % fallbackServices.length].accent
            const number = (service as any).number || `0${idx + 1}`
            return (
              <Link href={`/services/${service.id}`} key={service.id} className="block group">
                <div
                  className={`service-card-item relative h-full rounded-3xl border border-white/8 bg-gradient-to-br ${gradient} p-8 overflow-hidden cursor-pointer
                    hover:border-white/20 transition-all duration-500 hover:-translate-y-1 block`}
                >
                  {/* Number */}
                  <span className="absolute top-6 right-8 text-6xl font-black text-white/5 select-none group-hover:text-white/10 transition-all duration-500">
                    {number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                    style={{ backgroundColor: `${accent}18`, border: `1px solid ${accent}30` }}
                  >
                    <Icon className="h-7 w-7" style={{ color: accent }} />
                  </div>

                  <h3 className="text-xl font-bold mb-3 relative z-10 text-white group-hover:text-blue-400 transition-colors duration-300">{service.title}</h3>
                  <p className="text-neutral-400 leading-relaxed relative z-10 text-sm">{service.description}</p>

                  {/* Arrow indicator */}
                  <div className="mt-8 flex items-center gap-2 relative z-10 opacity-60 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: accent }}>Explore Service</span>
                    <ArrowUpRight className="h-4 w-4" style={{ color: accent }} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
