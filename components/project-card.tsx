"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/types"

export function ProjectCard({ project }: { project: Project }) {
    const router = useRouter()

    return (
        <article className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">

            {/* Thumbnail — clicking navigates to detail page */}
            <div
                className="relative w-full h-56 overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => router.push(`/projects/${project.id}`)}
            >
                <Image
                    src={project.thumbnail_url || "/placeholder.svg?height=600&width=800"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/10 to-transparent" />

                {/* Arrow on hover */}
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 pointer-events-none">
                    <ArrowUpRight size={16} />
                </div>

                {/* Category badge */}
                {project.category && (
                    <div className="absolute top-4 left-4 pointer-events-none">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-neutral-200">
                            {project.category}
                        </span>
                    </div>
                )}

                {/* Quick-action buttons — these are plain <a> tags, NOT nested <Link> inside the card */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.live_url && (
                        <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white text-black rounded-full p-2 hover:bg-blue-400 hover:text-white transition-colors z-10"
                            title="Live Demo"
                        >
                            <ExternalLink size={14} />
                        </a>
                    )}
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white text-black rounded-full p-2 hover:bg-neutral-700 hover:text-white transition-colors z-10"
                            title="GitHub"
                        >
                            <Github size={14} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <Link href={`/projects/${project.id}`} className="block flex-1 group/title">
                    <h2 className="text-xl font-bold text-white mb-2 group-hover/title:text-blue-400 transition-colors leading-snug">
                        {project.title}
                    </h2>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                    </p>
                </Link>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {(project.technologies || []).slice(0, 5).map((tech, i) => (
                        <span
                            key={i}
                            className="text-xs font-medium px-3 py-1 rounded-full bg-white/8 text-neutral-300 border border-white/10"
                        >
                            {tech}
                        </span>
                    ))}
                    {(project.technologies || []).length > 5 && (
                        <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-neutral-600 border border-white/8">
                            +{(project.technologies || []).length - 5}
                        </span>
                    )}
                </div>
            </div>
        </article>
    )
}
