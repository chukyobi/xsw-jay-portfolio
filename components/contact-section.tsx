"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Twitter, MapPin, Phone } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out.
          </p>
        </div>

        <div ref={contentRef} className="max-w-3xl mx-auto">
          <Card className="border border-border/50 hover:border-blue-accent/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-blue-accent" />
                      <Link href="mailto:contact@example.com" className="text-muted-foreground hover:text-foreground">
                        contact@example.com
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-blue-accent" />
                      <span className="text-muted-foreground">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-blue-accent" />
                      <span className="text-muted-foreground">San Francisco, CA</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Social Media</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Github className="h-5 w-5 mr-3 text-blue-accent" />
                      <Link
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        github.com/username
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5 mr-3 text-blue-accent" />
                      <Link
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        linkedin.com/in/username
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <Twitter className="h-5 w-5 mr-3 text-blue-accent" />
                      <Link
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        twitter.com/username
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
