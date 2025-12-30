import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import UsedPhone from "@/models/UsedPhone"
import cloudinary from "@/lib/cloudinary"
import { requireAdmin } from "@/lib/adminAuth"

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    requireAdmin()
    await connectDB()

    const { id } = await context.params

    const formData = await req.formData()

    const image = formData.get("image") as File | null
    let imageUrl: string | undefined = undefined
    let cloudinaryPublicId: string | undefined = undefined

    // ✅ Upload new image ONLY if provided
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // 🔴 fetch existing phone to delete old image
      const existingPhone = await UsedPhone.findById(id)

      if (existingPhone?.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(
          existingPhone.cloudinaryPublicId
        )
      }

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
      cloudinaryPublicId = uploadResult.public_id
    }

    const updateData: any = {
      brand: formData.get("brand"),
      model: formData.get("model"),
      storage: formData.get("storage"),
      condition: formData.get("condition"),
      price: Number(formData.get("price")),
      available: formData.get("available") === "true",
    }

    if (imageUrl) {
      updateData.image = imageUrl
      updateData.cloudinaryPublicId = cloudinaryPublicId
    }

    const updatedPhone = await UsedPhone.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    )

    return NextResponse.json(updatedPhone)
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    requireAdmin()
    await connectDB()

    const { id } = await context.params

    const phone = await UsedPhone.findById(id)

    // ✅ Delete image from Cloudinary first
    if (phone?.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(
        phone.cloudinaryPublicId
      )
    }

    await UsedPhone.findByIdAndDelete(id)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }
}
