"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Download, Code, Database, Server } from "lucide-react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const iconsLeftRef = useRef<HTMLDivElement>(null)
  const iconsRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

      gsap.fromTo(
        iconsLeftRef.current?.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.6,
        },
      )

      gsap.fromTo(
        iconsRightRef.current?.children,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.6,
        },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="items-center">
          {/* Left icons */}
          <div ref={iconsLeftRef} className="flex gap-4 items-end space-y-12">
            <div className="flex flex-col items-center">
              <Code className="w-8 h-8 text-blue-accent mb-2 lg:w-12 h-12" />
              <span className="text-sm text-muted-foreground">Frontend</span>
            </div>
            <div className="flex flex-col items-center">
              <Server className="w-8 h-8 text-purple-accent mb-2 lg:w-12 h-12" />
              <span className="text-sm text-muted-foreground">Backend</span>
            </div>
            <div className="flex flex-col items-center">
              <Database className="w-8 h-8 text-yellow-highlight mb-2 lg:w-12 h-12" />
              <span className="text-sm text-muted-foreground">Database</span>
            </div>
          </div>

          {/* Center content (now full width on lg screens) */}
          <div className="flex flex-col items-center text-center lg:col-span-3" ref={textRef}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Software <span className="text-blue-accent">Engineer</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Building modern web applications with cutting-edge technologies and exceptional user experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button asChild>
                <Link href="/#projects">View Projects</Link>
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Right icons */}
          <div ref={iconsRightRef} className="flex items-start space-y-12">
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-blue-accent mb-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-muted-foreground">Stack</span>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-purple-accent mb-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 18L22 12L16 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6L2 12L8 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-muted-foreground">DevOps</span>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-yellow-highlight mb-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M12 8V12L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-muted-foreground">Fast</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
