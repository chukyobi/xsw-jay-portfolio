import { TechnologyForm } from "../../components/technology-form"
import { getTechnologyById } from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"
import { notFound } from "next/navigation"

interface EditTechnologyPageProps {
  params: {
    id: string
  }
}

export default async function EditTechnologyPage({ params }: EditTechnologyPageProps) {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  const technology = await getTechnologyById(params.id)

  if (!technology) {
    notFound()
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Technology</h1>
        <TechnologyForm technology={technology} isEditing />
      </div>
    </section>
  )
}
