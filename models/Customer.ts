import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Guest" },
    phone: { type: String, required: true, unique: true },
    orderCount: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    lastOrderAt: { type: Date },
  },
  { timestamps: true }
)

const existingModel = mongoose.models.Customer
if (process.env.NODE_ENV !== "production" && existingModel) {
  mongoose.deleteModel("Customer")
}

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema)
