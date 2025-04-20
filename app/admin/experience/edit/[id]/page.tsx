import { ExperienceForm } from "../../components/experience-form"
import { getExperienceById } from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"
import { notFound } from "next/navigation"

interface EditExperiencePageProps {
  params: {
    id: string
  }
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  const experience = await getExperienceById(params.id)

  if (!experience) {
    notFound()
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Experience</h1>
        <ExperienceForm experience={experience} isEditing />
      </div>
    </section>
  )
}
