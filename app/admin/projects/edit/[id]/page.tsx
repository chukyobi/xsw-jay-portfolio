import { ProjectForm } from "../../components/project-form"
import { getProjectById } from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"
import { notFound } from "next/navigation"

interface EditProjectPageProps {
  params: {
    id: string
  }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
        <ProjectForm project={project} isEditing />
      </div>
    </section>
  )
}
