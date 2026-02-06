import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    image: String,
    address: {
      line1: String,
      area: String,
      city: String,
      pincode: String,
    },
    authProvider: { type: String, enum: ["google", "phone"] },
    phoneVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const existingModel = mongoose.models.User
if (process.env.NODE_ENV !== "production" && existingModel) {
  mongoose.deleteModel("User")
}

export default mongoose.models.User || mongoose.model("User", UserSchema)
