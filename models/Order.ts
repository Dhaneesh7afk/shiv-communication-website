import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userAuthProvider: {
      type: String,
      enum: ["google", "phone"],
    },
    userSnapshot: {
      name: String,
      phone: String,
      address: {
        line1: String,
        area: String,
        city: String,
        pincode: String,
      },
    },
    items: [
      {
        productId: String,
        title: String,
        price: Number,
        quantity: Number,
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    customer: {
      name: String,
      phone: String,
      address: String,
    },

    // 🔐 Razorpay details (filled AFTER payment)
    payment: {
      razorpayOrderId: {
        type: String,
        required: false,
      },
      razorpayPaymentId: {
        type: String,
      },
      razorpaySignature: {
        type: String,
      },
      razorpay_order_id: {
        type: String,
      },
      razorpay_payment_id: {
        type: String,
      },
      razorpay_signature: {
        type: String,
      },
      refundStatus: {
        type: String,
        enum: ["NONE", "REFUNDED"],
        default: "NONE",
      },
    },

    status: {
      type: String,
      enum: [
        "CREATED",
        "PAID",
        "PACKED",
        "READY",
        "DELIVERED",
        "CANCELLED",
        "FAILED",
      ],
      default: "CREATED",
    },
  },
  { timestamps: true }
)

const existingModel = mongoose.models.Order
if (process.env.NODE_ENV !== "production" && existingModel) {
  mongoose.deleteModel("Order")
}

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)
