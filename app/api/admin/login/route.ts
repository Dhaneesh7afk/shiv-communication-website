import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const cookieStore = await cookies()
    cookieStore.set("admin-token", process.env.ADMIN_SECRET!, {
      httpOnly: true,
      path: "/",
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  )
}
