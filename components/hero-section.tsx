"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, Code, Database, Server } from "lucide-react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const iconsLeftRef = useRef<HTMLDivElement>(null)
  const iconsRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.fromTo(textRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 0.3 },
      )

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left icons */}
          <div ref={iconsLeftRef} className="hidden lg:flex flex-col items-end space-y-12">
            <div className="flex flex-col items-center">
              <Code className="w-12 h-12 text-blue-accent mb-2" />
              <span className="text-sm text-muted-foreground">Frontend</span>
            </div>
            <div className="flex flex-col items-center">
              <Server className="w-12 h-12 text-purple-accent mb-2" />
              <span className="text-sm text-muted-foreground">Backend</span>
            </div>
            <div className="flex flex-col items-center">
              <Database className="w-12 h-12 text-yellow-highlight mb-2" />
              <span className="text-sm text-muted-foreground">Database</span>
            </div>
          </div>

          {/* Center content */}
          <div className="flex flex-col items-center text-center lg:col-span-1">
            <div ref={textRef}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Full-Stack <span className="text-blue-accent">Developer</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
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

            <div
              ref={imageRef}
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-blue-accent/20 hover:border-blue-accent transition-all duration-300 group"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Image
                src="/ProfileJay.jpeg?height=300&width=300"
                alt="Profile"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

{/*               <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>About Me</DialogTitle>
                    <DialogDescription>
                      Full-stack developer with expertise in modern web technologies
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <p>
                      I'm a passionate full-stack developer with over 5 years of experience building web and mobile
                      applications. I specialize in React, Next.js, Node.js, and various database technologies.
                    </p>
                    <p>
                      My goal is to create elegant, efficient, and user-friendly solutions that solve real-world
                      problems.
                    </p>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Skills:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Frontend: React, Next.js, TypeScript, Tailwind CSS</li>
                        <li>Backend: Node.js, Express, Spring Boot, Go</li>
                        <li>Databases: MongoDB, MySQL, PostgreSQL</li>
                        <li>Mobile: React Native, Expo</li>
                        <li>DevOps: Docker, AWS, CI/CD</li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog> */}
            </div>
          </div>

          {/* Right icons */}
          <div ref={iconsRightRef} className="hidden lg:flex flex-col items-start space-y-12">
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
