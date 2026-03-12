"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getProfile } from "@/lib/actions"
import type { Profile } from "@/lib/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackStats = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Shipped" },
  { value: "5+", label: "Tech Domains" },
]

const fallbackDescription = [
  "I'm a software engineer with a strong focus on building clean, scalable full-stack applications that deliver real value to users.",
  "From web and mobile apps to automation and hardware-integrated systems, I bring ideas to life across the entire engineering stack — with a deep love for elegant code and intentional design.",
  "When I'm not building, I'm exploring AI, cybersecurity, and how technology can close gaps in underserved communities."
]

export function AboutSection() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProfile()
      if (data) setProfile(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline line
      gsap.fromTo(
        lineRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
          },
        }
      )

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      )

      // Stats stagger
      gsap.fromTo(
        ".about-stat",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headline = profile?.headline || "Crafting digital experiences that matter."
  const name = profile?.name || "Chukwudi Obi"
  const location = profile?.location || "Lagos, Nigeria 🇳🇬"
  const imageUrl = profile?.image_url || "/ProfileJay.jpeg"
  const descriptions = profile?.description || fallbackDescription
  const stats = profile?.stats || fallbackStats

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 md:py-36 bg-[#080808] text-white relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 relative z-10">
        {/* Top label */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-semibold tracking-[0.3em] text-neutral-400 uppercase">About Me</span>
          <div ref={lineRef} className="h-px bg-neutral-700 w-0" />
        </div>

        {/* Main content */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          {/* Left — Image */}
          <div className="relative">
            <div className="relative w-full max-w-[400px] mx-auto md:mx-0">
              {/* Decorative border */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border border-white/10" />
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-white/5" />
              <img
                src={imageUrl}
                alt={name}
                className="relative z-10 rounded-3xl w-full h-[480px] object-cover object-top shadow-2xl"
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                <p className="text-xs text-neutral-400">Currently based in</p>
                <p className="text-sm font-semibold text-white">{location}</p>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="flex flex-col gap-8">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              {headline.split(" digital")[0] || "Crafting digital"}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {headline.includes("experiences") ? "experiences" : "experience"}
              </span>{" "}
              {headline.split("that ")[1] ? `that ${headline.split("that ")[1]}` : "that matter."}
            </h2>

            <div className="space-y-5 text-neutral-400 text-lg leading-relaxed">
              {descriptions.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/software engineer/g, "<span class=\"text-white font-semibold\">software engineer</span>") }} />
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 mt-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="about-stat border border-white/10 rounded-2xl p-4 bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <p className="text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
