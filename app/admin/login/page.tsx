"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, AlertCircle, Info } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setDebugInfo(null)

    try {
      // Check if environment variables are set
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Supabase environment variables are not set")
      }

      // Log the attempt (for debugging)
      console.log(`Attempting to sign in with email: ${email}`)

      // Create Supabase client directly
      const supabase = createClientSupabaseClient()

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Supabase auth error:", error)
        throw new Error(error.message)
      }

      if (!data.user || !data.session) {
        throw new Error("Authentication failed - no user or session returned")
      }

      console.log("Sign in successful:", data)

      // Set debug info
      setDebugInfo(
        JSON.stringify(
          {
            user: {
              id: data.user.id,
              email: data.user.email,
              role: data.user.user_metadata?.role,
            },
            session: {
              expires_at: data.session.expires_at,
            },
          },
          null,
          2,
        ),
      )

      toast({
        title: "Login successful",
        description: "You have been logged in successfully",
      })

      router.push("/admin/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Login failed:", error)

      const errorMessage = error instanceof Error ? error.message : "Invalid credentials or connection error"

      setError(errorMessage)

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {debugInfo && (
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <details>
                  <summary>Debug Info (Login Successful)</summary>
                  <pre className="mt-2 text-xs overflow-auto">{debugInfo}</pre>
                </details>
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account? Visit the{" "}
              <Link href="/admin/setup" className="text-primary hover:underline">
                setup page
              </Link>{" "}
              to create an admin account.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            Back to Portfolio
          </Link>
          <Link href="/admin/debug" className="text-sm text-muted-foreground hover:text-primary">
            Debug
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
