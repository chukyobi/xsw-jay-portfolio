import { EducationForm } from "../../components/education-form"
import { getEducationById } from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"
import { notFound } from "next/navigation"

interface EditEducationPageProps {
  params: {
    id: string
  }
}

export default async function EditEducationPage({ params }: EditEducationPageProps) {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  const education = await getEducationById(params.id)

  if (!education) {
    notFound()
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Education</h1>
        <EducationForm education={education} isEditing />
      </div>
    </section>
  )
}
