import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/admin-shell"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = (await cookies()).get("admin-token")?.value

  if (token !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login")
  }

  return <AdminShell>{children}</AdminShell>
}
