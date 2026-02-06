import mongoose from "mongoose"

const UsedPhoneSchema = new mongoose.Schema(
  {
   
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ["Mint", "Excellent", "Good", "Fair", "Average"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    cloudinaryPublicId: {
     type: String,
     default: "",
    },
    cloudinaryPublicIds: {
      type: [String],
      default: [],
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const existingModel = mongoose.models.UsedPhone
if (process.env.NODE_ENV !== "production" && existingModel) {
  mongoose.deleteModel("UsedPhone")
}

export default mongoose.models.UsedPhone ||
  mongoose.model("UsedPhone", UsedPhoneSchema)
