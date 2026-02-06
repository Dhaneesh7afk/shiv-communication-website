import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { requireAdmin } from "@/lib/adminAuth"
import Order from "@/models/Order"
import Customer from "@/models/Customer"

function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfMonth(date: Date) {
  const d = new Date(date)
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d
}

export async function GET() {
  const isAdmin = await requireAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await connectDB()

  const now = new Date()
  const todayStart = startOfDay(now)
  const monthStart = startOfMonth(now)

  const [todayRevenueAgg, monthRevenueAgg, totalOrders, totalCustomers, topProducts, bestCustomerAgg, last7Orders, last7Revenue] =
    await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: todayStart } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Order.countDocuments(),
      Customer.countDocuments(),
      Order.aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.title",
            quantity: { $sum: "$items.quantity" },
            revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
          },
        },
        { $sort: { quantity: -1 } },
        { $limit: 1 },
      ]),
      Customer.aggregate([
        { $sort: { totalSpent: -1 } },
        { $limit: 1 },
        { $project: { name: 1, phone: 1, totalSpent: 1, orderCount: 1 } },
      ]),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            total: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ])

  return NextResponse.json({
    todayRevenue: todayRevenueAgg[0]?.total || 0,
    monthRevenue: monthRevenueAgg[0]?.total || 0,
    totalOrders,
    totalCustomers,
    topProduct: topProducts[0] || null,
    bestCustomer: bestCustomerAgg[0] || null,
    ordersPerDay: last7Orders,
    revenuePerDay: last7Revenue,
  })
}
