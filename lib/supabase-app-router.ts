import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// This is safe to expose on the client as it only includes public anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
  )
}

// Create a Supabase client for App Router with cookies
export function createAppRouterSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Cannot create Supabase server client: Missing environment variables")
    throw new Error("Supabase configuration error: Missing environment variables")
  }

  try {
    const cookieStore = cookies()

    // For server components in App Router
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    })
  } catch (error) {
    console.error("Error creating Supabase server client:", error)
    throw new Error("Failed to initialize Supabase server client")
  }
}
