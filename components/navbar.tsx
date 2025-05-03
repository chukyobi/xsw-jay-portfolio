"use client";

import {
  Home,
  Twitter,
  Instagram,
  Mail,
  FileText,
  Github,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <div
      className="fixed z-50 flex items-center space-x-4 px-6 py-2 bg-white border rounded-full shadow-md
                    left-1/2 -translate-x-1/2 
                    bottom-6 top-auto
                    md:bottom-6 md:top-auto
                    sm:bottom-6 sm:top-auto xs:bottom-6 xs:top-auto"
    >
      {/* Icons */}
      <Link href="/" className="text-muted-foreground hover:text-yellow-500">
        <Home className="w-5 h-5" />
      </Link>
      <div className="h-5 w-px bg-muted" />

      <div className="relative group flex flex-col items-center">
        <Link
          href="mailto:josephclinton.obi@gmail.com"
          className="text-muted-foreground hover:text-green-500 transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <Mail className="w-5 h-5" />
        </Link>
        <span className="absolute top-3 text-xs text-muted-foreground opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          mail
        </span>
      </div>

      <div className="relative group flex flex-col items-center">
        <Link
          href="https://docs.google.com/document/d/1qsa6TBTrUexoVbwmaJezEkeyJgeJAfuHX8A7YpCaBbI/edit?usp=sharing"
          target="_blank"
          className="text-muted-foreground hover:text-blue-500 transition-all duration-300 transform group-hover:-translate-y-1"
        >
          <FileText className="w-5 h-5" />
        </Link>
        <span className="absolute top-3 text-xs text-muted-foreground opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          cv
        </span>
      </div>

      <div className="h-5 w-px bg-muted" />

      {/* Github Button */}
      <Link
        href="https://github.com/chukyobi"
        target="_blank"
        className=" ml-2"
      >
        {/* <Github className="w-5 h-5" /> */}
        <img src="/icons8-github.svg" alt="github-logo" className="w-7 h-7" />
      </Link>
    </div>
  );
}
