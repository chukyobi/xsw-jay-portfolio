import { createServerSupabaseClient } from "@/lib/supabase"
import { createClientSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function signIn(email: string, password: string) {
  try {
    const supabase = createClientSupabaseClient()

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

    return data
  } catch (error) {
    console.error("Sign in error:", error)
    throw error
  }
}

export async function signOut() {
  const supabase = createClientSupabaseClient()
  await supabase.auth.signOut()
}

export async function signUp(email: string, password: string, name: string) {
  try {
    const supabase = createClientSupabaseClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: "user", // Default role
        },
      },
    })

    if (error) {
      console.error("Supabase signup error:", error)
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.error("Sign up error:", error)
    throw error
  }
}

export async function getUser() {
  const supabase = createClientSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getSession() {
  const supabase = createClientSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

// For App Router only - will need to be modified for Pages Router
export async function requireAuth() {
  try {
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect("/admin/login")
    }

    return session
  } catch (error) {
    console.error("Auth check error:", error)
    redirect("/admin/login")
  }
}

// For App Router only - will need to be modified for Pages Router
export async function requireAdmin() {
  try {
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect("/admin/login")
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user?.user_metadata?.role !== "admin") {
      redirect("/admin/unauthorized")
    }

    return session
  } catch (error) {
    console.error("Admin check error:", error)
    redirect("/admin/login")
  }
}
