"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, Code, Database, Server } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Gradient shadows */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-accent/30 to-purple-accent/30 blur-3xl pointer-events-none"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-bl from-yellow-highlight/30 to-green-500/30 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left icons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex flex-col items-end space-y-12"
          >
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
          </motion.div>

          {/* Center content */}
          <div className="flex flex-col items-center text-center lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 1, ease: "backOut", delay: 0.3 }}
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-blue-accent/20 hover:border-blue-accent transition-all duration-300 group"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Profile"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              </Dialog>
            </motion.div>
          </div>

          {/* Right icons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:flex flex-col items-start space-y-12"
          >
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
              <span className="text-sm text-muted-foreground">Code</span>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
