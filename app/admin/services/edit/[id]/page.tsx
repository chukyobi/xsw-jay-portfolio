import { ServiceForm } from "../../components/service-form"
import { getServiceById } from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"
import { notFound } from "next/navigation"

interface EditServicePageProps {
  params: {
    id: string
  }
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  const service = await getServiceById(params.id)

  if (!service) {
    notFound()
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Service</h1>
        <ServiceForm service={service} isEditing />
      </div>
    </section>
  )
}
