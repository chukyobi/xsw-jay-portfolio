import { setCookie, destroyCookie } from "nookies"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createClientSupabaseClient } from "@/lib/supabase"
import { NextApiResponse } from "next"

type User = {
  id: string
  email: string
  password_hash: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables")
}

function createJWT(user: Pick<User, "id" | "email" | "is_admin">) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1d" })
}

function verifyJWT(token: string): Pick<User, "id" | "email" | "is_admin"> | null {
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch {
    return null
  }
}

// ✅ Use this in API routes only
export async function signIn(email: string, password: string, res: NextApiResponse) {
  const supabase = createClientSupabaseClient()

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single<User>()

  if (error || !user) throw new Error("Invalid email or user not found")

  const isValid = await bcrypt.compare(password, user.password_hash)
  if (!isValid) throw new Error("Invalid password")

  const token = createJWT({
    id: user.id,
    email: user.email,
    is_admin: user.is_admin,
  })

  setCookie({ res }, "admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  return user
}

export async function signOut(res: NextApiResponse) {
  destroyCookie({ res }, "admin_session", { path: "/" })
}

// These functions are for Server Components / Middleware only
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getUserFromSession(): Promise<Pick<User, "id" | "email" | "is_admin"> | null> {
  const cookieStore = await cookies()
const token = cookieStore.get("admin_session")?.value

  if (!token) return null
  return verifyJWT(token)
}

export async function requireAuth() {
  const user = await getUserFromSession()
  if (!user) redirect("/admin/login")
  return user
}

export async function requireAdmin() {
  const user = await getUserFromSession()
  if (!user || !user.is_admin) redirect("/admin/login")
  return user
}
