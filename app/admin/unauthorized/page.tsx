import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-500/10">
            <ShieldAlert className="h-12 w-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. Please contact the administrator if you believe this is an
          error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
          <Link href="/admin/login">
            <Button variant="outline">Login as Admin</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
