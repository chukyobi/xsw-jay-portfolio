"use client"

import { Home, Twitter, Instagram, FileText } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <div className="fixed flex items-center justify-center gap-4 px-6 py-2 rounded-full border shadow-md bg-white z-50
      top-6 md:top-6 md:bottom-auto bottom-6
      left-1/2 transform -translate-x-1/2
      w-[90%] max-w-[380px]">
      
      {/* Icons */}
      <Link href="/" className="text-muted-foreground hover:text-foreground">
        <Home className="w-5 h-5" />
      </Link>
      <div className="h-5 w-px bg-muted" />
      <Link href="https://twitter.com/chukyobi_" target="_blank" className="text-muted-foreground hover:text-foreground">
        <Twitter className="w-5 h-5" />
      </Link>
      <Link href="https://instagram.com/chuky.obi_" target="_blank" className="text-muted-foreground hover:text-foreground">
        <Instagram className="w-5 h-5" />
      </Link>
      <Link href="/resume.pdf" target="_blank" className="text-muted-foreground hover:text-foreground">
        <FileText className="w-5 h-5" />
      </Link>
      <div className="h-5 w-px bg-muted" />

      {/* Github Button */}
      <Link
        href="https://github.com/chukyobi"
        target="_blank"
        className="bg-black text-white text-sm font-medium px-4 py-2 rounded-full ml-2"
      >
        My Github
      </Link>
    </div>
  )
}
