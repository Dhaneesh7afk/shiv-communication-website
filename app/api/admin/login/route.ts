import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const { password } = await req.json()

  if (!process.env.ADMIN_PASSWORD) {
    console.error("ADMIN_PASSWORD missing")
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    )
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    )
  }

  // ...existing code...
  // replace cookies().set(...) + return with:
  const res = NextResponse.json({ success: true })
  res.cookies.set("admin-token", password, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  })
  return res
// ...existing code...
}
