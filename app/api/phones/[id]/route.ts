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

    const contentType = req.headers.get("content-type") || ""

    let updateData: any = {}

    // ✅ CASE 1: multipart/form-data (edit + image)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()

      const imageFiles = (formData.getAll("images") as File[]).filter((file) => file && file.size > 0)
      const image = formData.get("image") as File | null
      const filesToUpload = imageFiles.length ? imageFiles : image && image.size > 0 ? [image] : []
      let imageUrl: string | undefined
      let cloudinaryPublicId: string | undefined
      let imageUrls: string[] = []
      let cloudinaryPublicIds: string[] = []

      if (filesToUpload.length > 0) {
        const existingPhone = await UsedPhone.findById(id)

        const idsToDelete = existingPhone?.cloudinaryPublicIds?.length
          ? existingPhone.cloudinaryPublicIds
          : existingPhone?.cloudinaryPublicId
            ? [existingPhone.cloudinaryPublicId]
            : []

        if (idsToDelete.length) {
          await Promise.all(
            idsToDelete.map((publicId: string) =>
              cloudinary.uploader.destroy(publicId)
            )
          )
        }

        for (const file of filesToUpload) {
          const buffer = Buffer.from(await file.arrayBuffer())

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

        imageUrl = imageUrls[0]
        cloudinaryPublicId = cloudinaryPublicIds[0]
      }

      updateData = {
        brand: formData.get("brand"),
        model: formData.get("model"),
        storage: formData.get("storage"),
        condition: formData.get("condition"),
        price: Number(formData.get("price")),
        available: formData.get("available") === "true",
      }

      if (imageUrl) {
        updateData.image = imageUrl
        updateData.images = imageUrls
        updateData.cloudinaryPublicId = cloudinaryPublicId
        updateData.cloudinaryPublicIds = cloudinaryPublicIds
      }
    }

    // ✅ CASE 2: simple JSON / toggle request
    else {
      const body = await req.json()
      updateData = body
    }

    const updatedPhone = await UsedPhone.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    )

    return NextResponse.json(updatedPhone)
  } catch (err) {
    console.error("PUT /api/phones ERROR:", err)

    // ❗ NOT unauthorized — real server error
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    requireAdmin()
    await connectDB()

    const { id } = await context.params
    const phone = await UsedPhone.findById(id)

    if (!phone) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const idsToDelete = phone.cloudinaryPublicIds?.length
      ? phone.cloudinaryPublicIds
      : phone.cloudinaryPublicId
        ? [phone.cloudinaryPublicId]
        : []

    if (idsToDelete.length) {
      await Promise.all(
        idsToDelete.map((publicId: string) => cloudinary.uploader.destroy(publicId))
      )
    }

    await UsedPhone.findByIdAndDelete(id)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("DELETE /api/phones ERROR:", err)
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}
