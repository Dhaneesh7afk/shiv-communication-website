// ...existing code...
import { cookies } from "next/headers"

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get("admin-token")?.value
  return token === process.env.ADMIN_PASSWORD 
}

export async function requireAdmin(): Promise<boolean> {
  return isAdminAuthenticated()
}
// ...existing code...