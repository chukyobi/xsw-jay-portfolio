import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "#contact", label: "Contact" },
]

const socials = [
  { href: "https://github.com/chukyobi", icon: Github, label: "GitHub" },
  { href: "https://twitter.com/xswjay", icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com/in/chukwudi-obi", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:xswjaydev@gmail.com", icon: Mail, label: "Email" },
]

export function Footer() {
  return (
    <footer className="bg-[#040404] border-t border-white/8 text-white">
      <div className="container mx-auto px-6 sm:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-black tracking-tight mb-4 inline-block">
              xsw<span className="text-blue-400">jay</span>
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed mt-4 max-w-xs">
              A full-stack software engineer building exceptional digital experiences across web, mobile and hardware.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-neutral-500 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-neutral-500 mb-6">Connect</h4>
            <div className="flex flex-col gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
                  >
                    <Icon className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm font-medium">{s.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Chukwudi Obi · All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="text-xs text-neutral-700 hover:text-neutral-400 transition-colors">
              Admin
            </Link>
            <span className="text-xs text-neutral-600">Built with Next.js & ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
