import { MetadataRoute } from "next"
import { connectDB } from "@/lib/db"
import UsedPhone from "@/models/UsedPhone"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://shivcommunication.shop"

  await connectDB()

  const phones = await UsedPhone.find({}, { _id: 1, brand: 1, model: 1 })

  const phoneUrls: MetadataRoute.Sitemap = phones.map((phone) => {
    const slug = `${phone.brand}-${phone.model}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    return {
      url: `${baseUrl}/used-phones/${slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }
  })

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/used-phones`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    ...phoneUrls,
  ]
}
