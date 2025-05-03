"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { checkSupabaseConnection } from "@/lib/supabase"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function DebugPage() {
  const [connectionStatus, setConnectionStatus] = useState<any>(null)
  const [envVars, setEnvVars] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check environment variables
    setEnvVars({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Not set",
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Not set",
    })
  }, [])

  const checkConnection = async () => {
    setIsLoading(true)
    try {
      const result = await checkSupabaseConnection()
      setConnectionStatus(result)
    } catch (error) {
      setConnectionStatus({
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: error,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const createTestUser = async () => {
    setIsLoading(true)
    try {
      const supabase = createClientSupabaseClient()
  
      const testEmail = "josephclinton.obi@gmail.com"
      const testPassword = "Zwxj2619!.com"
  
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            name: "Jay Clinton",
            role: "admin",
          },
        },
      })
  
      if (error) throw error
  
      // Wait for user creation to complete
      const user = data.user
      if (!user) throw new Error("User not returned from signUp")
  
      // Insert into custom 'users' table (if you have one)
      const { error: dbError } = await supabase.from("users").insert([
        {
          id: user.id,
          email: user.email,
          name: "Jay Clinton",
          role: "admin",
        },
      ])
  
      if (dbError) throw dbError
  
      return {
        success: true,
        email: testEmail,
        password: testPassword,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: error,
      }
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Supabase Debug Page</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Check if Supabase environment variables are set</CardDescription>
          </CardHeader>
          <CardContent>
            {envVars ? (
              <pre className="bg-muted p-4 rounded-md overflow-auto">{JSON.stringify(envVars, null, 2)}</pre>
            ) : (
              <p>Loading environment variables...</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connection Test</CardTitle>
            <CardDescription>Test connection to Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={checkConnection} disabled={isLoading} className="mb-4">
              {isLoading ? "Testing..." : "Test Connection"}
            </Button>

            {connectionStatus && (
              <pre className="bg-muted p-4 rounded-md overflow-auto">{JSON.stringify(connectionStatus, null, 2)}</pre>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create Test User</CardTitle>
            <CardDescription>Create a test user with admin role</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={createTestUser} disabled={isLoading} className="mb-4">
              {isLoading ? "Creating..." : "Create Test User"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
