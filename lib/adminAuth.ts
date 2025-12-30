import { cookies } from "next/headers"

export async function isAdminAuthenticated() {
  const token = (await cookies()).get("admin-token")?.value
  return token === process.env.ADMIN_SECRET
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("UNAUTHORIZED")
  }
}
