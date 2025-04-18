import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react"
import { getAllProjects } from "@/lib/actions"

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="py-20 px-4 mt-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-bold">
              All <span className="text-primary">Projects</span>
            </h1>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="border border-border/50 hover:border-primary/50 transition-all hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.thumbnail_url || "/placeholder.svg?height=192&width=384"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                  <div className="flex space-x-2">
                    {project.github_url && (
                      <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="outline">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                      </Link>
                    )}
                    {project.live_url && (
                      <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="outline">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Live Demo</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                  <Link href={`/projects/${index + 1}`}>
                    <Button variant="ghost" className="text-primary">
                      Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
