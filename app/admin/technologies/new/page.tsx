import { TechnologyForm } from "../components/technology-form"
import { requireAdmin } from "@/lib/auth"

export default async function NewTechnologyPage() {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Add New Technology</h1>
        <TechnologyForm />
      </div>
    </section>
  )
}
