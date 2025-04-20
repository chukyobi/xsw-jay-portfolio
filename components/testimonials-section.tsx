"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { getTestimonials } from "@/lib/actions"
import type { Testimonial } from "@/lib/types"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Fallback data in case the database is empty
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
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    position: "Design Director",
    company: "CreativeStudio",
    content:
      "A rare find - someone who understands both design and development. They transformed our concepts into a beautiful, functional application that our users love.",
    avatar_url: "/placeholder.svg?height=100&width=100",
    approved: true,
  },
]

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [allCardsViewed, setAllCardsViewed] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Get all testimonials since we can't filter by approval status
        const data = await getTestimonials(false)
        if (data.length > 0) {
          // If testimonials have an approved property, filter to only show approved ones
          // Otherwise, show all testimonials
          const filteredTestimonials = data.filter((t) => t.approved === undefined || t.approved === true)
          setTestimonials(filteredTestimonials.length > 0 ? filteredTestimonials : data)
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (isLoading) return

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

      // Pin the entire testimonials section until all cards are viewed
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top", // Start pinning when section reaches top of viewport
          end: `+=${testimonials.length * 100}vh`, // Pin for the equivalent of one viewport height per testimonial
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            // Calculate which testimonial to show based on scroll progress
            const newIndex = Math.min(Math.floor(self.progress * testimonials.length), testimonials.length - 1)
            setActiveIndex(newIndex)

            // Check if all cards have been viewed
            if (newIndex === testimonials.length - 1 && self.progress > 0.9) {
              setAllCardsViewed(true)
            } else {
              setAllCardsViewed(false)
            }
          },
          onLeave: () => {
            // Ensure all cards are considered viewed when leaving the section
            setAllCardsViewed(true)
          },
        })
      }

      // Create progress indicators animation
      gsap.fromTo(
        ".progress-indicator",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: ".progress-indicators",
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading, testimonials.length])

  // Calculate rotation and offset for stacked cards
  const getCardStyle = (index: number) => {
    const isActive = index === activeIndex
    const isBehind = index > activeIndex
    const isHidden = index < activeIndex

    if (isHidden) {
      return {
        display: "none",
        zIndex: 0,
        opacity: 0,
      }
    }

    if (isActive) {
      return {
        transform: "translateY(0) rotate(0deg) scale(1)",
        zIndex: 30,
        opacity: 1,
      }
    }

    // Calculate values for stacked cards behind the active one
    const offset = (index - activeIndex) * 15 // Vertical offset in pixels
    const rotation = (index - activeIndex) * 1.5 // Slight rotation in degrees
    const scale = 1 - (index - activeIndex) * 0.05 // Slight scaling
    const opacity = Math.max(0.5, 1 - (index - activeIndex) * 0.2) // Opacity

    return {
      transform: `translateY(${offset}px) rotate(${rotation}deg) scale(${scale})`,
      zIndex: 30 - (index - activeIndex) * 5,
      opacity,
    }
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-16 md:py-24 bg-background/50 relative min-h-screen flex flex-col justify-center"
    >
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What clients and colleagues say about working with me.
          </p>
        </div>

        <div ref={cardsRef} className="relative h-[450px] flex items-center justify-center mt-8">
          {/* Card stack container */}
          <div className="relative w-full max-w-2xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="testimonial-card absolute top-0 left-0 w-full transition-all duration-500 ease-out"
                style={getCardStyle(index)}
              >
                <Card className="border border-border/50 hover:border-blue-accent/50 transition-all duration-300 overflow-hidden testimonial-glow">
                  <CardContent className="p-8">
                    <Quote className="h-10 w-10 text-blue-accent/30 mb-4" />
                    <p className="text-lg mb-6 italic">{testimonial.content}</p>
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.avatar_url || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}
                          {testimonial.company && `, ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicators */}
        <div className="progress-indicators flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`progress-indicator h-2 w-12 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-blue-accent" : index < activeIndex ? "bg-blue-accent/50" : "bg-muted"
              }`}
            ></div>
          ))}
        </div>

        {/* Scroll indicator - only show when on the last testimonial */}
        <div
          className={`flex justify-center mt-8 transition-opacity duration-500 ${
            activeIndex === testimonials.length - 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-muted-foreground text-sm flex flex-col items-center">
            <p>Scroll down to continue</p>
            <svg
              className="w-6 h-6 mt-2 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
