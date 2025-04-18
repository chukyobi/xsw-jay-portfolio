import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowLeft } from "lucide-react"
import { getProjectById } from "@/lib/actions"

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id)

  if (!project) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 mt-16 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/projects">
              <Button>Back to Projects</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="py-20 px-4 mt-16">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <Link href="/projects">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>

            <div className="flex space-x-2">
              {project.github_url && (
                <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
              )}
              {project.live_url && (
                <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={project.thumbnail_url || "/placeholder.svg?height=400&width=800"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, index) => (
              <span key={index} className="px-3 py-1 rounded-full bg-muted text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p>{project.description}</p>
                {project.long_description && <div className="mt-4">{project.long_description}</div>}
              </div>
            </CardContent>
          </Card>

          {/* Code Snippet Example */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Code Snippet</h2>
              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                <pre>
                  <code>
                    {`// Example code snippet
function calculateSomething() {
  const value = 42;
  return value * 2;
}

// Usage
const result = calculateSomething();
console.log(result); // 84`}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Flow Chart Example */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Project Architecture</h2>
              <div className="bg-muted p-4 rounded-md text-center">
                <p className="text-muted-foreground mb-2">Flow Chart Visualization</p>
                <div className="h-[200px] flex items-center justify-center">
                  <p>Architecture diagram would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
