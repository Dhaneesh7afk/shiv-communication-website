"use client"

import { useCart } from "@/context/CartContext"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") return resolve(false)
    if ((window as any).Razorpay) return resolve(true)
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

export default function CheckoutClient() {
  const { cart, clearCart } = useCart()
  const { data: session } = useSession()
  const [form, setForm] = useState({
    name: "",
    phone: "",
    line1: "",
    area: "",
    city: "",
    pincode: "",
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState(false)

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  useEffect(() => {
    const loadProfile = async () => {
      const res = await fetch("/api/users/me", { cache: "no-store" })
      if (!res.ok) return
      const user = await res.json()
      setForm((prev) => ({
        ...prev,
        name: user?.name || "",
        phone: user?.phone || "",
        line1: user?.address?.line1 || "",
        area: user?.address?.area || "",
        city: user?.address?.city || "",
        pincode: user?.address?.pincode || "",
      }))
    }
    loadProfile()
  }, [])

  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Full name is required"
    if (!form.phone.trim()) e.phone = "Verified phone is required"
    if (!form.line1.trim()) e.line1 = "Address line is required"
    if (!form.area.trim()) e.area = "Area / locality is required"
    if (!form.city.trim()) e.city = "City is required"
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Pincode must be 6 digits"
    return e
  }, [form])

  const phoneVerified = Boolean(session?.user?.phoneVerified) || Boolean(session?.user?.phone)
  const canPay = Object.keys(errors).length === 0 && phoneVerified && Boolean(session?.user?.id)

  const handlePayment = async () => {
    if (!canPay) {
      setTouched({
        name: true,
        phone: true,
        line1: true,
        area: true,
        city: true,
        pincode: true,
      })
      return
    }
    setSaving(true)
    await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        address: {
          line1: form.line1,
          area: form.area,
          city: form.city,
          pincode: form.pincode,
        },
        phoneVerified,
      }),
    })

    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart,
        customer: {
          name: form.name,
          phone: form.phone,
          address: `${form.line1}, ${form.area}, ${form.city} ${form.pincode}`,
        },
        address: {
          line1: form.line1,
          area: form.area,
          city: form.city,
          pincode: form.pincode,
        },
      }),
    })

    if (!res.ok) {
      alert("Order creation failed")
      setSaving(false)
      return
    }

    const data = await res.json()

    const loaded = await loadRazorpay()
    if (!loaded) {
      alert("Payment SDK failed to load. Please try again.")
      setSaving(false)
      return
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      order_id: data.razorpayOrderId,
      name: "Shiv Communication",
      handler: function () {
        clearCart()
        window.location.href = "/order-success"
      },
      theme: { color: "#000000" },
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.open()
    setSaving(false)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center px-6">
        <div className="w-full max-w-xl rounded-[2.75rem] border border-border/60 bg-background/80 p-10 shadow-xl">
          <h1 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Your cart is empty
          </h1>
          <p className="mt-3 text-muted-foreground">Add items from the shop to proceed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-3 md:gap-12">
      <div className="lg:col-span-2 space-y-8">
        {!phoneVerified && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-700">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>
                Please verify your phone number before checkout. {" "}
                <a href="/login?next=/checkout" className="underline font-semibold">
                  Verify now
                </a>
              </span>
            </div>
          </div>
        )}

        <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Delivery address
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {["name", "phone", "line1", "area", "city", "pincode"].map((field) => {
              const placeholders: Record<string, string> = {
                name: "Full Name",
                phone: "Phone Number",
                line1: "Address line",
                area: "Area / Locality",
                city: "City",
                pincode: "Pincode",
              }

              return (
                <div key={field}>
                  <input
                    placeholder={placeholders[field]}
                    value={(form as any)[field]}
                    onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                    onBlur={() => setTouched((prev) => ({ ...prev, [field]: true }))}
                    className="h-12 w-full rounded-full border border-border/60 bg-background/70 px-4 text-sm font-medium outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
                  />
                  {touched[field] && errors[field] && (
                    <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Payment method
          </h2>
          <div className="mt-4 space-y-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" checked readOnly />
              Online Payment (UPI / Card / Wallet)
            </label>
            <label className="flex items-center gap-2 opacity-50">
              <input type="radio" disabled />
              Cash on Delivery (Coming Soon)
            </label>
          </div>
        </div>
      </div>

      <div className="sticky top-28 h-fit rounded-[2.5rem] border border-border/60 bg-background/80 p-6 shadow-lg md:p-8">
        <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Order summary
        </h2>

        <div className="mt-6 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-4">
              {item.image && (
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>

        <div className="my-6 border-t border-border/60" />

        <div className="flex justify-between font-semibold mb-2">
          <span>Subtotal</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <span>Delivery</span>
          <span>FREE</span>
        </div>

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        <Button
          onClick={handlePayment}
          disabled={!canPay || saving}
          className="mt-6 h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
        >
          {saving ? "Processing..." : `Pay ₹${total.toLocaleString("en-IN")}`}
        </Button>

        {canPay && (
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            All details verified and ready to pay.
          </div>
        )}

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Secure payments powered by Razorpay
        </p>
      </div>
    </div>
  )
}
