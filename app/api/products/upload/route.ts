import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { requireAdmin } from "@/lib/adminAuth"

export async function POST(req: Request) {
  try {
    requireAdmin()

    const formData = await req.formData()
    const files = formData.getAll("images") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files" }, { status: 400 })
    }

    const uploadedUrls: string[] = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(buffer)
      })

      uploadedUrls.push(uploadResult.secure_url)
    }

    return NextResponse.json({ images: uploadedUrls })
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
