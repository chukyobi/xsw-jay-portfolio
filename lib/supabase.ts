import { createClient } from "@supabase/supabase-js"

// This is safe to expose on the client as it only includes public anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
  )
}

// Create a singleton instance for the client
let clientInstance: ReturnType<typeof createClient> | null = null

export function createClientSupabaseClient() {
  if (typeof window === "undefined") {
    console.warn("Attempted to create client Supabase instance on the server")
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Cannot create Supabase client: Missing environment variables")
    throw new Error("Supabase configuration error: Missing environment variables")
  }

  if (clientInstance) return clientInstance

  try {
    // For client components
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "supabase.auth.token",
      },
    })

    return clientInstance
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    throw new Error("Failed to initialize Supabase client")
  }
}

// Server-side Supabase client that doesn't use next/headers
export function createServerSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Cannot create Supabase server client: Missing environment variables")
    throw new Error("Supabase configuration error: Missing environment variables")
  }

  try {
    // For server components, without using next/headers
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  } catch (error) {
    console.error("Error creating Supabase server client:", error)
    throw new Error("Failed to initialize Supabase server client")
  }
}

// Debug function to check Supabase connection
export async function checkSupabaseConnection() {
  try {
    const supabase = createClientSupabaseClient()
    const { data, error } = await supabase.from("projects").select("count").limit(1)

    if (error) {
      return {
        connected: false,
        error: error.message,
        details: error,
      }
    }

    return {
      connected: true,
      data,
    }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error,
    }
  }
}
