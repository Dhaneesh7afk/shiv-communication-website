import { notFound } from "next/navigation"
import { connectDB } from "@/lib/db"
import Customer from "@/models/Customer"
import Order from "@/models/Order"

const getLabel = (value: string) => (value === "PAID" ? "RECEIVED" : value)

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: { id: string }
}) {
  await connectDB()
  const { id } = await params 
  const customer = await Customer.findById(id).lean()

  if (!customer) {
    notFound()
  }

  const orders = await Order.find({ "customer.phone": customer.phone })
    .sort({ createdAt: -1 })
    .lean()

  const totalSpent = orders.reduce((sum, order) => sum + (order.amount || 0), 0)

  return (
    <div className="space-y-6">
      <div className="admin-surface p-8 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">{customer.name || "Guest"}</h1>
            <p className="text-muted-foreground">{customer.phone}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs font-medium tracking-wide text-emerald-600">
            Total LTV: ₹{totalSpent}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Orders", value: customer.orderCount },
          { label: "Total Spent", value: `₹${totalSpent}` },
          {
            label: "Last Order",
            value: customer.lastOrderAt ? new Date(customer.lastOrderAt).toLocaleDateString() : "N/A",
          },
        ].map((stat) => (
          <div key={stat.label} className="admin-stat">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">{stat.label}</p>
            <p className="mt-4 text-2xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="admin-surface p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Order History</h2>
          <span className="text-xs font-medium tracking-wide text-muted-foreground">
            {orders.length} orders
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-secondary/10 p-10 text-center text-muted-foreground">
            No orders for this customer.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <a
                key={order._id}
                href={`/admin/orders/${order._id}`}
                className="admin-list-item block"
              >
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-wide text-muted-foreground">Order ID</p>
                    <p className="font-semibold break-all">{order._id.toString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-600">₹{order.amount}</p>
                    <span className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium tracking-wide text-emerald-600">
                      {getLabel(order.status)}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
