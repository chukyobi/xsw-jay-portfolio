import { EducationForm } from "../components/education-form"
import { requireAdmin } from "@/lib/auth"

export default async function NewEducationPage() {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Add New Education</h1>
        <EducationForm />
      </div>
    </section>
  )
}
