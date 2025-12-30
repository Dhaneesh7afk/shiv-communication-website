import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not defined in .env.local")
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return

  try {
    await mongoose.connect(MONGODB_URI)
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection failed", err)
  }
}
