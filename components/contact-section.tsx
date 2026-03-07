"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Linkedin, Mail, Twitter, MapPin, Phone, ArrowUpRight } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const contactInfo = [
  { icon: Mail, label: "Email", value: "xswjaydev@gmail.com", href: "mailto:xswjaydev@gmail.com" },
  { icon: Phone, label: "Phone", value: "+234 912 345 6789", href: "tel:+2349123456789" },
  { icon: MapPin, label: "Location", value: "Anambra, Nigeria", href: null },
]

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/chukyobi", handle: "chukyobi" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/chukwudi-obi", handle: "chukwudi-obi" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/xswjay", handle: "@xswjay" },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
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

  return (
    <section id="contact" ref={sectionRef} className="py-28 md:py-36 bg-[#060606] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-4">Say Hello</p>
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-2xl">
            LET'S BUILD<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              SOMETHING
            </span>{" "}
            GREAT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="space-y-8">
            <p className="text-neutral-400 text-lg leading-relaxed">
              I'm always open to new opportunities, collaborations, and interesting projects.
              Drop me a message and let's talk!
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="contact-item flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300">
                      <Icon className="h-5 w-5 text-neutral-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600 uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-neutral-200 hover:text-white transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-neutral-200">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right — Social links + CTA */}
          <div className="space-y-8">
            <div className="border border-white/10 rounded-3xl p-8 bg-white/3 space-y-4">
              <h3 className="text-lg font-bold text-white mb-6">Find me online</h3>
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item flex items-center justify-between p-4 rounded-2xl border border-white/8 hover:border-white/20 hover:bg-white/8 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-neutral-400 group-hover:text-white transition-colors" />
                      <div>
                        <p className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
                          {s.label}
                        </p>
                        <p className="text-xs text-neutral-600">{s.handle}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-neutral-600 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )
              })}
            </div>

            {/* Email CTA */}
            <a
              href="mailto:xswjaydev@gmail.com"
              className="flex items-center justify-center gap-3 w-full py-4 px-8 rounded-2xl bg-white text-black font-bold hover:bg-neutral-200 transition-all duration-300 group"
            >
              Send an Email
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
