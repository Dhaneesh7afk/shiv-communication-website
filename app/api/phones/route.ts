import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import UsedPhone from "@/models/UsedPhone"
import cloudinary from "@/lib/cloudinary"
import { requireAdmin } from "@/lib/adminAuth"

export async function GET() {
  await connectDB()

  const phones = await UsedPhone.find().sort({ createdAt: -1 })

  return NextResponse.json(phones, {
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

    const image = formData.get("image") as File | null
    let imageUrl = ""

    // ✅ Upload image to Cloudinary (if provided)
    if (image) {
      const bytes = await image.arrayBuffer()
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

      imageUrl = uploadResult.secure_url
     var cloudinaryPublicId = uploadResult.public_id

    }

    // ✅ Create phone using form fields
    const phone = await UsedPhone.create({
      brand: formData.get("brand"),
      model: formData.get("model"),
      storage: formData.get("storage"),
      condition: formData.get("condition"),
      price: Number(formData.get("price")),
      available: formData.get("available") === "true",
      image: imageUrl,
      cloudinaryPublicId,
    })

    return NextResponse.json(phone)
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }
}
