"use client"

import Image from "next/image"
import { CheckCircle2, Sparkles } from "lucide-react"
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

interface BuyNowProduct {
  _id: string
  title: string
  price: number
  image: string | null
}

export default function BuyNowClient({ product }: { product: BuyNowProduct }) {
  const handleBuyNow = async () => {
    const res = await fetch("/api/orders/buy-now", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
      }),
    })

    if (!res.ok) {
      if (res.status === 400) {
        alert("Complete your profile before checkout.")
        window.location.href = "/checkout"
        return
      }
      alert("Login required")
      return
    }

    const data = await res.json()

    const loaded = await loadRazorpay()
    if (!loaded) {
      alert("Payment SDK failed to load. Please try again.")
      return
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      order_id: data.razorpayOrderId,
      name: "Shiv Communication",
      handler: () => {
        window.location.href = "/order-success"
      },
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.open()
  }

  return (
    <div className="rounded-[2.75rem] border border-border/60 bg-background/80 p-8 shadow-xl md:p-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Buy now checkout
          </div>
          <h2 className="mt-4 text-xl md:text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            {product.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Instant confirmation after payment.</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          Instant
        </span>
      </div>

      {product.image && (
        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border/60 bg-background/70 p-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-muted">
            <Image src={product.image} alt={product.title} fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{product.title}</p>
            <p className="text-xs text-muted-foreground">Verified accessory</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">₹{product.price}</span>
      </div>

      <Button
        onClick={handleBuyNow}
        className="mt-8 h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
      >
        Pay ₹{product.price}
      </Button>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        Secure payment powered by Razorpay
      </div>
    </div>
  )
}
