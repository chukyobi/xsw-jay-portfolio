import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-accent">Chukwudi </span>Obi
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            A full-stack developer specializing in building exceptional digital experiences.
          </p>

          <div className="mt-6">
            <div className="flex space-x-6">
              <Link
                href="https://github.com/chukyobi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://x.com/chukyobi_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/chukwudi-obi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:josphclinton.obi@gmail.com" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 w-full">
            <p className="text-center text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Chukwudi Obi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
