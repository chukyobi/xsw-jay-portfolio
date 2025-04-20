"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, Github, Linkedin, Twitter, Code, Database, Server } from "lucide-react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const scatteredIconsRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      )

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.2 },
      )

      const icons = scatteredIconsRef.current?.querySelectorAll(".icon")
      if (icons) {
        gsap.fromTo(
          icons,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 0.5,
          },
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scatteredIcons = [
    { icon: <Code />, style: "top-[10%] left-[5%]" },
    { icon: <Server />, style: "top-[25%] right-[10%]" },
    { icon: <Database />, style: "bottom-[15%] left-[10%]" },
    { icon: <Code />, style: "bottom-[20%] right-[8%]" },
    { icon: <Server />, style: "top-[40%] left-[50%]" },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Scattered Floating Icons */}
      <div ref={scatteredIconsRef} className="absolute inset-0 pointer-events-none">
        {scatteredIcons.map((item, idx) => (
          <div
            key={idx}
            className={`icon absolute ${item.style} text-muted-foreground`}
          >
            <div className="w-10 h-10 md:w-12 md:h-12">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Left Social Links with Node Lines */}
      <div className="absolute left-4 top-1/3 flex flex-col items-center space-y-4 z-50">
        {[Github, Twitter, Linkedin].map((Icon, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-px h-6 bg-muted-foreground" />
            <Link
              href="#"
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        ))}
      </div>

      {/* Content Wrapper */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Central Content */}
          <div className="lg:col-span-3 flex flex-col items-start justify-center text-left space-y-6">
            <div ref={textRef}>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Crafting <span className="text-blue-accent">Scalable Web</span> Solutions
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mt-4">
                I specialize in designing full-stack applications that are fast, secure, and delightfully intuitive.
              </p>
              <div className="mt-6 flex gap-4">
                <Button asChild>
                  <Link href="/#projects">Explore Projects</Link>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download CV
                </Button>
              </div>
            </div>
          </div>

          {/* Corner Full Height Image */}
          <div className="lg:col-span-2 relative flex justify-end items-end h-full">
            <div
              ref={imageRef}
              className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] max-w-sm rounded-[3rem] overflow-hidden border-4 border-blue-accent/30 hover:border-blue-accent transition-all duration-300 group"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Profile"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>About Me</DialogTitle>
                    <DialogDescription>
                      Full-stack developer with 5+ years of real-world experience
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 text-sm">
                    <p>
                      I love solving meaningful problems through code, blending beautiful UI with powerful backend
                      systems. I specialize in React, Next.js, Node.js, and cloud-native tools.
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>React, Next.js, Tailwind</li>
                      <li>Node.js, Express, Go, Spring Boot</li>
                      <li>MongoDB, MySQL, PostgreSQL</li>
                      <li>Docker, AWS, CI/CD</li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
