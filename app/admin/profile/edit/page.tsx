import { getProfile } from "@/lib/actions"
import { requireAdmin } from "@/lib/auth"
import { ProfileForm } from "../components/profile-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function EditProfilePage() {
  await requireAdmin()
  const profile = await getProfile()

  if (!profile) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
        <p className="mb-8 text-muted-foreground">Please seed the database first from the admin dashboard.</p>
        <Link href="/admin/dashboard">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard?tab=profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold italic">Edit About <span className="text-primary italic"> Me</span></h1>
      </div>
      <ProfileForm profile={profile} />
    </div>
  )
}
