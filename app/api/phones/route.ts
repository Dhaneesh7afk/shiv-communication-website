import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import UsedPhone from "@/models/UsedPhone"
import cloudinary from "@/lib/cloudinary"
import { requireAdmin } from "@/lib/adminAuth"

export async function GET() {
  await connectDB()

  const phones = await UsedPhone.find().sort({ createdAt: -1 }).lean()
  const normalized = phones.map((phone: any) => ({
    ...phone,
    images: phone.images?.length ? phone.images : phone.image ? [phone.image] : [],
  }))

  return NextResponse.json(normalized, {
    headers: {
      "Cache-Control": "no-store",
    },
  })
}

export async function POST(req: Request) {
  try {
    requireAdmin()
    await connectDB()

    // ✅ CHANGE: use formData instead of json
    const formData = await req.formData()

    const imageFiles = (formData.getAll("images") as File[]).filter((file) => file && file.size > 0)
    const image = formData.get("image") as File | null
    const filesToUpload = imageFiles.length ? imageFiles : image && image.size > 0 ? [image] : []
    const imageUrls: string[] = []
    const cloudinaryPublicIds: string[] = []

    // ✅ Upload image to Cloudinary (if provided)
    for (const file of filesToUpload) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "used-phones" },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(buffer)
      })

      if (uploadResult?.secure_url) {
        imageUrls.push(uploadResult.secure_url)
      }
      if (uploadResult?.public_id) {
        cloudinaryPublicIds.push(uploadResult.public_id)
      }
    }

    const imageUrl = imageUrls[0] || ""
    const cloudinaryPublicId = cloudinaryPublicIds[0] || ""

    // ✅ Create phone using form fields
    const phone = await UsedPhone.create({
      brand: formData.get("brand"),
      model: formData.get("model"),
      storage: formData.get("storage"),
      condition: formData.get("condition"),
      price: Number(formData.get("price")),
      available: formData.get("available") === "true",
      image: imageUrl,
      images: imageUrls,
      cloudinaryPublicId,
      cloudinaryPublicIds,
    })

    return NextResponse.json(phone)
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }
}
