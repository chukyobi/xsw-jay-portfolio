import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/auth"

export default async function AdminPage() {
  // Properly check auth and redirect to dashboard
  await requireAdmin()
  redirect("/admin/dashboard")
}
