import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET!

export async function setAuthCookie(userId: string) {
  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "30d",
  })

  ;(await cookies()).set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
}

export async function getUserFromCookie() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) return null

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string }

    return decoded
  } catch {
    return null
  }
}
