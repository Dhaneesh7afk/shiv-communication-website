// app/sitemap.ts
import type { MetadataRoute } from "next"

const STATIC_PATHS: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/shop", changeFrequency: "daily", priority: 0.9 },
  { path: "/used-phones", changeFrequency: "daily", priority: 0.9 },
  { path: "/mobile-repair", changeFrequency: "weekly", priority: 0.7 },
  { path: "/mobile-accessories", changeFrequency: "weekly", priority: 0.7 },
  { path: "/recharge-bill-payments", changeFrequency: "monthly", priority: 0.6 },
  { path: "/emi-payments", changeFrequency: "monthly", priority: 0.6 },
  { path: "/computer-services", changeFrequency: "monthly", priority: 0.6 },
  { path: "/old-phone-buy-sell", changeFrequency: "monthly", priority: 0.6 },
  { path: "/money-transfer", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    "https://shivcommunication.shop"
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))

  try {
    const [{ connectDB }, ProductModule, UsedPhoneModule] = await Promise.all([
      import("@/lib/db"),
      import("@/models/Product"),
      import("@/models/UsedPhone"),
    ])
    await connectDB()

    const [products, usedPhones] = await Promise.all([
      ProductModule.default.find({ isActive: true })
        .select("slug updatedAt")
        .lean(),
      UsedPhoneModule.default.find({ available: true })
        .select("_id updatedAt")
        .lean(),
    ])

    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.updatedAt ?? now,
      changeFrequency: "weekly",
      priority: 0.8,
    }))

    const usedPhoneEntries: MetadataRoute.Sitemap = usedPhones.map((phone) => ({
      url: `${baseUrl}/used-phones/${phone._id}`,
      lastModified: phone.updatedAt ?? now,
      changeFrequency: "weekly",
      priority: 0.7,
    }))

    return [...staticEntries, ...productEntries, ...usedPhoneEntries]
  } catch (error) {
    console.warn("[sitemap] Falling back to static routes only.", error)
    return staticEntries
  }
}
