export const dynamic = "force-dynamic"
export const revalidate = 0

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import AdminInventoryClient from "./AdminInventoryClient"

export default async function AdminInventoryPage() {
  const token = (await cookies()).get("admin-token")?.value

  if (!token || token !== process.env.ADMIN_SECRET) {
    redirect("/admin/login")
  }

  return <AdminInventoryClient />
}
