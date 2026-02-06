import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { ArrowRight, Banknote, CheckCircle2, Info, MessageCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Domestic Money Transfer Services | Shiv Communication Mandi Gobindgarh",
  description:
    "Safe and fast bank-to-bank money transfer services in Mandi Gobindgarh. Send money anywhere in India instantly. Valid ID required for transactions.",
}

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

export default function MoneyTransferPage() {
  const headingFont = { fontFamily: "var(--font-display)" }

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`} style={{ fontFamily: "var(--font-body)" }}>
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_55%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.04),transparent_45%,rgba(16,185,129,0.06))]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Transfer Desk
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl" style={headingFont}>
                Send money,
                <span className="block text-emerald-600">securely and instantly</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Bank-to-bank transfers across India with instant confirmation and in-store guidance.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="tel:9878157109">
                    Call for Transfer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    WhatsApp Inquiry
                  </a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Instant transfer", desc: "IMPS and NEFT support." },
                  { title: "Verified identity", desc: "Safe KYC checks." },
                  { title: "Clear receipts", desc: "Printed confirmation for every transfer." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{item.title}</p>
                    <p className="mt-2 text-sm text-foreground/80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2.75rem] border border-border/60 bg-gradient-to-br from-background/90 via-background/70 to-secondary/60 p-6 shadow-[0_24px_90px_-60px_rgba(15,23,42,0.6)] md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Service highlights</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl" style={headingFont}>
                      Trusted transfer experience
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      icon: Banknote,
                      title: "Bank-to-bank",
                      desc: "Send money to all major banks in India.",
                    },
                    {
                      icon: CheckCircle2,
                      title: "Instant confirmation",
                      desc: "Receipts provided for every transaction.",
                    },
                    {
                      icon: Info,
                      title: "Secure process",
                      desc: "Authorized channels with proper verification.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-border/60 bg-background/80 p-4">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-border/60 bg-background/80 p-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">ID required</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">Carry a valid Govt. ID to transfer.</p>
                  </div>
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2.75rem] border border-border/60 bg-background/80 p-8 shadow-sm md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Transaction details</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl" style={headingFont}>
                What to bring
              </h3>
              <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                {[
                  "Valid government ID (Aadhaar, PAN, or Voter ID).",
                  "Beneficiary bank details or account number.",
                  "Sender mobile number for confirmation.",
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-emerald-500/10 text-sm font-semibold text-emerald-600">
                      {index + 1}
                    </div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="tel:9878157109">Call for Details</a>
                </Button>
                <Button variant="outline" className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    WhatsApp Inquiry
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-[2.75rem] border border-border/60 bg-gradient-to-br from-background via-background to-secondary/60 p-8 shadow-sm md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Transfer speed</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl" style={headingFont}>
                Instant, 24x7 availability
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                We support IMPS and NEFT transfers for all major banks with real-time confirmation.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["All major banks", "IMPS + NEFT", "In-store only"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
