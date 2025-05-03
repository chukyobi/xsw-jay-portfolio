import { NextApiRequest, NextApiResponse } from "next"
import { signIn } from "@/lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body

    try {
      const user = await signIn(email, password, res)
      return res.status(200).json({ message: "Login successful", user })
    } catch (error) {
      return res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" })
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" })
  }
}
