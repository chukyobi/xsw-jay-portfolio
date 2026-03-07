"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { getTestimonials } from "@/lib/actions"
import type { Testimonial } from "@/lib/types"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "CTO",
    company: "TechCorp",
    content:
      "Working with this developer was an absolute pleasure. Their technical expertise and attention to detail resulted in a product that exceeded our expectations.",
    avatar_url: "/placeholder.svg?height=100&width=100",
    approved: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    name: "Sarah Williams",
    position: "Product Manager",
    company: "InnovateTech",
    content:
      "An exceptional developer who consistently delivers high-quality work. Their ability to understand complex requirements and translate them into elegant solutions is remarkable.",
    avatar_url: "/placeholder.svg?height=100&width=100",
    approved: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    name: "Michael Chen",
    position: "CEO",
    company: "StartupX",
    content:
      "We hired this developer for a critical project with tight deadlines. Not only did they deliver on time, but the quality of their work was outstanding. Highly recommended!",
    avatar_url: "/placeholder.svg?height=100&width=100",
    approved: true,
    created_at: "",
    updated_at: "",
  },
]

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials(false)
        if (data.length > 0) {
          const approved = data.filter((t) => t.approved === undefined || t.approved === true)
          setTestimonials(approved.length > 0 ? approved : data)
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      }
    }
    fetchTestimonials()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  const active = testimonials[activeIndex]

  return (
    <section id="testimonials" ref={sectionRef} className="py-28 md:py-36 bg-[#080808] text-white relative overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-4">Social Proof</p>
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              TESTIMONIALS
            </h2>
          </div>
          {/* Navigation controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-neutral-500">
              {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimonial card */}
        <div key={active?.id} ref={cardRef} className="animate-in fade-in duration-500">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-10 md:p-14 max-w-4xl">
            {/* Quote icon */}
            <Quote className="h-12 w-12 text-blue-500/30 mb-8" />

            {/* Content */}
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-neutral-200 mb-10">
              "{active?.content}"
            </p>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-8" />

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/20">
                  <Image
                    src={active?.avatar_url || "/placeholder.svg"}
                    alt={active?.name || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white">{active?.name}</h4>
                  <p className="text-sm text-neutral-400">
                    {active?.position}
                    {active?.company && ` · ${active.company}`}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-white" : "w-4 bg-neutral-700 hover:bg-neutral-500"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
