import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { getAllProjects } from "@/lib/actions"
import { ProjectCard } from "@/components/project-card"

export const revalidate = 0

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <main className="min-h-screen bg-[#060606] text-white">
      <Navbar />

      <section className="pt-32 pb-24 px-6 sm:px-12">
        <div className="container mx-auto max-w-7xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase mb-4">
                Portfolio
              </p>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                ALL PROJECTS
              </h1>
              <p className="text-neutral-400 mt-4 text-lg max-w-md">
                {projects.length} project{projects.length !== 1 ? "s" : ""} shipped across web, mobile &amp; hardware.
              </p>
            </div>
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-sm text-neutral-300 font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Back to Home
            </Link>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8 mb-16" />

          {/* Projects grid */}
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <ArrowUpRight className="h-7 w-7 text-neutral-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">No Projects Yet</h2>
              <p className="text-neutral-500 max-w-sm">
                Published projects will appear here once they are added from the admin dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
