"use client"

import Image from "next/image"
import Link from "next/link"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const headingFont = { fontFamily: "var(--font-display)" }

  if (cart.length === 0) {
    return (
      <div className={`${displayFont.variable} ${bodyFont.variable} min-h-[70vh] flex items-center justify-center px-6`} style={{ fontFamily: "var(--font-body)" }}>
        <div className="w-full max-w-xl rounded-[2.75rem] border border-border/60 bg-background/80 p-10 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight" style={headingFont}>
            Your cart is empty
          </h1>
          <p className="mt-3 text-muted-foreground">Browse accessories and add them here to checkout.</p>
          <Button className="mt-8 h-12 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]" asChild>
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`} style={{ fontFamily: "var(--font-body)" }}>
      <section className="relative overflow-hidden pt-16 pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 left-0 h-[320px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_55%)] blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
              Secure Checkout
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight" style={headingFont}>
              Shopping cart
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Review your items, adjust quantities, and proceed when ready.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto grid gap-8 px-4 md:px-6 lg:grid-cols-3 md:gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-6 rounded-[2.5rem] border border-border/60 bg-background/80 p-5 shadow-sm sm:flex-row md:p-6"
              >
                {item.image && (
                  <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-muted sm:w-28">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground" style={headingFont}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div className="flex items-center rounded-full border border-border/60 bg-background/70">
                      <button
                        className="px-4 py-2 text-lg font-semibold"
                        onClick={() => updateQty(item._id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) => updateQty(item._id, Number(event.target.value))}
                        className="w-16 bg-transparent text-center text-sm font-semibold outline-none"
                      />
                      <button
                        className="px-4 py-2 text-lg font-semibold"
                        onClick={() => updateQty(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky top-28 h-fit rounded-[2.5rem] border border-border/60 bg-background/80 p-6 shadow-lg md:p-8">
            <h2 className="text-2xl font-semibold" style={headingFont}>
              Order summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold">Free</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between border-t border-border/60 pt-4 text-lg font-semibold">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <Button className="mt-6 h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Secure payments powered by Razorpay
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
