"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientSupabaseClient } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ShieldCheck, Info } from "lucide-react"
import Link from "next/link"

export default function AdminSetupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError(null)
    setDebugInfo(null)

    try {
      // Check if environment variables are set
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Supabase environment variables are not set")
      }

      const supabase = createClientSupabaseClient()

      // Create the user with admin role
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "admin", // Set as admin
          },
        },
      })

      if (error) throw error

      // Set debug info
      setDebugInfo(
        JSON.stringify(
          {
            user: {
              id: data.user?.id,
              email: data.user?.email,
              role: data.user?.user_metadata?.role,
            },
            session: data.session
              ? {
                  expires_at: data.session.expires_at,
                }
              : null,
          },
          null,
          2,
        ),
      )

      toast({
        title: "Admin account created",
        description: "Please check your email to confirm your account",
      })

      // Sign in the user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.warn("Auto sign-in failed:", signInError)
        // Continue anyway, just show a warning
        toast({
          title: "Account created but auto-login failed",
          description: "Please try logging in manually",
          variant: "warning",
        })
        router.push("/admin/login")
      } else {
        router.push("/admin/dashboard")
      }

      router.refresh()
    } catch (error) {
      console.error("Admin setup failed:", error)

      const errorMessage = error instanceof Error ? error.message : "Failed to create admin account"

      setError(errorMessage)

      toast({
        title: "Setup failed",
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
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Admin Setup</CardTitle>
          <CardDescription className="text-center">
            Create your first admin account to manage your portfolio
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
                  <summary>Debug Info (Account Created)</summary>
                  <pre className="mt-2 text-xs overflow-auto">{debugInfo}</pre>
                </details>
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Admin Account"}
            </Button>
          </form>
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
