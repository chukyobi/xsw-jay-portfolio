import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Tag,
  Globe,
  Code2,
  ArrowUpRight,
} from "lucide-react"
import { getProjectById, getAllProjects } from "@/lib/actions"

export const revalidate = 0

// Pre-generate paths for known published projects
export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p) => ({ id: p.id }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  // Format date helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <main className="min-h-screen bg-[#060606] text-white">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden mt-0">
        <Image
          src={project.thumbnail_url || "/placeholder.svg?height=800&width=1600"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/50 via-transparent to-transparent" />

        {/* Back button — top left */}
        <div className="absolute top-28 left-6 sm:left-12 z-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/20 text-sm text-neutral-300 font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All Projects
          </Link>
        </div>

        {/* Status badge */}
        {project.status && (
          <div className="absolute top-28 right-6 sm:right-12 z-10">
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full border ${project.status === "published"
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                  : "bg-amber-500/20 border-amber-500/40 text-amber-400"
                }`}
            >
              {project.status === "published" ? "● Live" : "○ Draft"}
            </span>
          </div>
        )}
      </div>

      {/* Main content */}
      <section className="px-6 sm:px-12 pb-28 -mt-28 relative z-10">
        <div className="container mx-auto max-w-5xl">

          {/* Project title + CTA row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              {project.category && (
                <span className="inline-block text-xs font-semibold tracking-[0.25em] text-blue-400 uppercase mb-3">
                  {project.category}
                </span>
              )}
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                {project.title}
              </h1>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-sm font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8 mb-10" />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left — main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Short description */}
              <div>
                <p className="text-xl text-neutral-300 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* Long description / case study */}
              {project.long_description && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/10 max-w-[40px]" />
                    Project Overview
                  </h2>
                  <div className="text-neutral-400 leading-loose text-base whitespace-pre-line">
                    {project.long_description}
                  </div>
                </div>
              )}

              {/* Technologies Used */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10 max-w-[40px]" />
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(project.technologies || []).map((tech, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-2xl bg-white/8 border border-white/12 text-neutral-200 hover:bg-white/15 hover:border-white/25 transition-all duration-200"
                    >
                      <Code2 className="h-3.5 w-3.5 text-blue-400" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional images section placeholder — could be extended */}
              <div className="rounded-3xl border border-white/8 overflow-hidden">
                <div className="bg-white/3 px-6 py-4 border-b border-white/8">
                  <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Preview</p>
                </div>
                <div className="relative w-full aspect-video">
                  <Image
                    src={project.thumbnail_url || "/placeholder.svg?height=800&width=1600"}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right — sidebar metadata */}
            <div className="space-y-6">

              {/* Project info card */}
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 space-y-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-[0.2em]">
                  Project Info
                </h3>

                {/* Created */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="h-4 w-4 text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-0.5">Year</p>
                    <p className="text-sm font-medium text-neutral-200">
                      {formatDate(project.created_at) || "—"}
                    </p>
                  </div>
                </div>

                {/* Category */}
                {project.category && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Tag className="h-4 w-4 text-neutral-400" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-600 mb-0.5">Category</p>
                      <p className="text-sm font-medium text-neutral-200">{project.category}</p>
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="h-4 w-4 text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-0.5">Status</p>
                    <p
                      className={`text-sm font-semibold ${project.status === "published" ? "text-emerald-400" : "text-amber-400"
                        }`}
                    >
                      {project.status === "published" ? "Live" : "In Progress"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/8" />

                {/* Links */}
                <div className="space-y-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between w-full py-3 px-4 rounded-2xl border border-white/10 hover:border-white/25 hover:bg-white/8 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2.5">
                        <ExternalLink className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
                          Live Demo
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-neutral-600 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between w-full py-3 px-4 rounded-2xl border border-white/10 hover:border-white/25 hover:bg-white/8 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2.5">
                        <Github className="h-4 w-4 text-neutral-300" />
                        <span className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
                          View Code
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-neutral-600 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* CTA — hire me */}
              <div className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6 text-center">
                <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                  Interested in working together on a similar project?
                </p>
                <Link href="/#contact">
                  <button className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold rounded-2xl transition-all duration-300 hover:-translate-y-0.5">
                    Let's Talk
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
