import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { Lock } from "lucide-react"
import CheckoutClient from "./checkoutClient"

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

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?next=/checkout")
  }

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`} style={{ fontFamily: "var(--font-body)" }}>
      <section className="relative overflow-hidden pt-16 pb-10 md:pt-24 md:pb-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[320px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_55%)] blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
              <Lock className="h-3.5 w-3.5 text-emerald-500" />
              Secure Payments
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Checkout
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Add delivery details and complete your payment securely.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <CheckoutClient />
      </section>
    </div>
  )
}
