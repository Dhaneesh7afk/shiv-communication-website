import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import Customer from "@/models/Customer"
import { requireAdmin } from "@/lib/adminAuth"

export async function GET() {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await connectDB()

  const aggregates = await Order.aggregate([
    {
      $match: {
        $or: [
          { "userSnapshot.phone": { $exists: true, $ne: "" } },
          { "customer.phone": { $exists: true, $ne: "" } },
        ],
      },
    },
    { $sort: { createdAt: 1 } },
    {
      $addFields: {
        customerName: { $ifNull: ["$userSnapshot.name", "$customer.name"] },
        customerPhone: { $ifNull: ["$userSnapshot.phone", "$customer.phone"] },
      },
    },
    {
      $group: {
        _id: "$customerPhone",
        name: { $last: "$customerName" },
        phone: { $last: "$customerPhone" },
        orderCount: { $sum: 1 },
        totalSpent: { $sum: "$amount" },
        lastOrderAt: { $max: "$createdAt" },
      },
    },
  ])

  if (aggregates.length > 0) {
    const bulk = aggregates.map((customer) => ({
      updateOne: {
        filter: { phone: customer.phone },
        update: {
          $set: {
            name: customer.name || "Guest",
            phone: customer.phone,
            orderCount: customer.orderCount,
            totalSpent: customer.totalSpent,
            lastOrderAt: customer.lastOrderAt,
          },
        },
        upsert: true,
      },
    }))

    await Customer.bulkWrite(bulk)
  }

  const customers = await Customer.find().sort({ lastOrderAt: -1 }).lean()
  return NextResponse.json(customers)
}
