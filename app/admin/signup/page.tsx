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
import { AlertCircle, ShieldCheck, CheckCircle } from "lucide-react"
import Link from "next/link"
import bcrypt from 'bcryptjs';



export default function AdminSignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
  
    setIsLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const supabase = createClientSupabaseClient();
  
      const hashedPassword = await bcrypt.hash(password, 10);  
  
      // Insert the user directly into the users table
      const { data, error: insertError } = await supabase.from("users").insert([
        {
          email,
          password_hash: hashedPassword, 
          is_admin: true,  
        },
      ]);
  
      if (insertError) {
        throw insertError;
      }
  
      setSuccess(true);
      toast({
        title: "Admin account created",
        description: "You can now log in with your credentials",
      });
  
      
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
  

      setTimeout(() => router.push("/admin/login"), 2000);
  
    } catch (error) {
      console.error("Admin signup failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create admin account";
      setError(errorMessage);
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-background">
      <Card className="w-full max-w-md relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-accent/30 to-purple-accent/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-tl from-yellow-highlight/30 to-green-500/30 blur-3xl pointer-events-none"></div>

        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-2 rounded-full bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Create Admin Account</CardTitle>
          <CardDescription className="text-center">
            Set up an administrator account to manage your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-500 text-green-500">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Account created successfully! You can now{" "}
                <Link href="/admin/login" className="font-medium underline">
                  log in
                </Link>
                .
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
              <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
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
          <Link href="/admin/login" className="text-sm text-primary hover:underline">
            Already have an account? Log in
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
