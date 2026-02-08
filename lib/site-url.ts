import { headers } from "next/headers"

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  const headerList = headers()
  const host = headerList.get("x-forwarded-host") || headerList.get("host")
  const proto = headerList.get("x-forwarded-proto") || "http"

  if (host) return `${proto}://${host}`
  return "http://localhost:3000"
}
