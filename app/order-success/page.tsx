import Link from "next/link"
import { CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"

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

export default function OrderSuccessPage() {
  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden`} style={{ fontFamily: "var(--font-body)" }}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_60%)] blur-2xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_55%)] blur-3xl" />
      </div>
      <div className="max-w-xl w-full text-center rounded-[2.75rem] border border-border/60 bg-background/80 p-10 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="h-9 w-9" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
          Payment confirmed
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Order placed successfully
        </h1>

        <p className="mt-4 text-muted-foreground">
          Thank you for shopping with <strong>Shiv Communication</strong>. Your payment was successful and your order is
          being processed.
        </p>

        <div className="mt-8 rounded-2xl border border-border/60 bg-background/70 p-6 text-left text-sm">
          <p className="mb-2">
            Order Status: <strong>Confirmed</strong>
          </p>
          <p className="mb-2">
            Payment: <strong>Paid via Razorpay</strong>
          </p>
          <p>
            Support: <strong>9878157109</strong>
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="h-12 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]">
            <Link href="/shop">Continue Shopping</Link>
          </Button>

          <Button asChild variant="outline" className="h-12 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-8">A confirmation message will be sent shortly.</p>
      </div>
    </div>
  )
}
