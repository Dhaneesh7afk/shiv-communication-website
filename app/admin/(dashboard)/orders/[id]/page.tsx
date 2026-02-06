import Link from "next/link"
import { notFound } from "next/navigation"
import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import OrderPaymentStatus from "@/components/admin/order-payment-status"
import { User, Package } from "lucide-react"
import OrderStatusSelect from "@/components/admin/order-status-select"

interface OrderItem {
  title: string
  price: number
  quantity: number
}

export default async function AdminOrderDetailPage({
  params,
}: {
  params: { id: string }
}) {
  await connectDB()
  const { id } = await params
  const order = await Order.findById(id).lean()

  if (!order) {
    notFound()
  }

  const payment = order.payment || {}
  const razorpayOrderId = payment.razorpayOrderId || payment.razorpay_order_id
  const razorpayPaymentId = payment.razorpayPaymentId || payment.razorpay_payment_id
  const snapshot = order.userSnapshot || {}

  return (
    <div className="space-y-8">
      <div className="admin-surface p-8 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="admin-pill mb-4">Order Details</div>
            <h1 className="text-3xl font-black tracking-tight">Order {order._id.toString()}</h1>
            <p className="text-muted-foreground">
              Created {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold tracking-wide text-emerald-600 hover:text-emerald-700"
          >
            Back to Orders
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr,1fr]">
        <div className="space-y-6">
          <div className="admin-surface p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-lg font-black">Customer</h2>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Name:</span> {snapshot.name || order.customer?.name || "Guest"}</p>
              <p><span className="text-muted-foreground">Phone:</span> {snapshot.phone || order.customer?.phone || "N/A"}</p>
              <p><span className="text-muted-foreground">Address:</span> {snapshot.address ? `${snapshot.address.line1}, ${snapshot.address.area}, ${snapshot.address.city} ${snapshot.address.pincode}` : order.customer?.address || "Not provided"}</p>
              <p><span className="text-muted-foreground">Auth:</span> {order.userAuthProvider || "N/A"}</p>
            </div>
          </div>

          <div className="admin-surface p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-lg font-black">Items</h2>
            </div>
            <div className="space-y-3">
              {(order.items as OrderItem[]).map((item, index: number) => (
                <div key={index} className="admin-list-item flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-black text-emerald-600">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Order Total</span>
              <span className="font-black text-emerald-600">₹{order.amount}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <OrderStatusSelect
            orderId={order._id.toString()}
            currentStatus={order.status}
            razorpayPaymentId={razorpayPaymentId}
          />
          <OrderPaymentStatus
            orderId={order._id.toString()}
            initialStatus={order.status}
            initialRazorpayOrderId={razorpayOrderId}
            initialRazorpayPaymentId={razorpayPaymentId}
          />
        </div>
      </div>
    </div>
  )
}
