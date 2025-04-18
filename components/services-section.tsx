"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Laptop, Zap, Cpu } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Sample data - would be fetched from Supabase in a real implementation
const servicesData = [
  {
    id: "1",
    title: "Web Development",
    description: "Building responsive, scalable web applications with modern frameworks and technologies.",
    icon: <Laptop className="h-12 w-12 text-blue-accent" />,
  },
  {
    id: "2",
    title: "Mobile Development",
    description: "Creating native and cross-platform mobile applications for iOS and Android.",
    icon: <Code className="h-12 w-12 text-blue-accent" />,
  },
  {
    id: "3",
    title: "Automation",
    description: "Streamlining workflows and processes through custom automation solutions.",
    icon: <Zap className="h-12 w-12 text-blue-accent" />,
  },
  {
    id: "4",
    title: "Electronics and Design",
    description: "Designing and implementing electronic systems and hardware solutions.",
    icon: <Cpu className="h-12 w-12 text-blue-accent" />,
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card")
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-16 md:py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized services tailored to meet your development needs.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {servicesData.map((service) => (
            <Card
              key={service.id}
              className="service-card border border-border/50 hover:border-blue-accent/50 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-md bg-blue-accent/10">{service.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
