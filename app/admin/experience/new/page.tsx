import { ExperienceForm } from "../components/experience-form"
import { requireAdmin } from "@/lib/auth"

export default async function NewExperiencePage() {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Add New Experience</h1>
        <ExperienceForm />
      </div>
    </section>
  )
}
