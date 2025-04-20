import { CompanyForm } from "../../components/company-form"
import { getCompanyById } from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"
import { notFound } from "next/navigation"

interface EditCompanyPageProps {
  params: {
    id: string
  }
}

export default async function EditCompanyPage({ params }: EditCompanyPageProps) {
  // Check if user is authenticated and is an admin
  await requireAdmin()

  const company = await getCompanyById(params.id)

  if (!company) {
    notFound()
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Company</h1>
        <CompanyForm company={company} isEditing />
      </div>
    </section>
  )
}
