import mongoose, { Schema, models } from "mongoose"

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: ["mobile-accessories", "pc-accessories", "gadgets"],
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        images: {
            type: [String], // Cloudinary URLs
            default: [],
        },

        stock: {
            type: Number,
            default: 0,
        },

        description: {
            type: String,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

    },
    { timestamps: true }
)

export default models.Product || mongoose.model("Product", ProductSchema)
