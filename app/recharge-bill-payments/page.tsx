import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { ArrowRight, Banknote, CheckCircle2, MessageCircle, Phone, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Online Recharge & Bill Payments in Mandi Gobindgarh | Shiv Communication",
  description:
    "Instant mobile & DTH recharge, electricity, water, and gas bill payments at Shiv Communication. Safe and reliable digital payments for all networks.",
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

const services = [
  { name: "Mobile Recharge", desc: "All networks (Jio, Airtel, Vi, BSNL)", icon: Phone },
  { name: "DTH Recharge", desc: "Tata Play, Airtel DTH, Dish TV, etc.", icon: Zap },
  { name: "Electricity Bills", desc: "Instant confirmation and receipt", icon: Zap },
  { name: "Utility Bills", desc: "Water, Gas, and Broadband bills", icon: Banknote },
]

export default function RechargePage() {
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
                Digital Desk
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl" style={headingFont}>
                Recharge and bills,
                <span className="block text-emerald-600">done in minutes</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Fast, verified recharge and bill payment services with instant confirmation and receipts.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="tel:9878157109">
                    Call for Payment
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
                  { title: "Instant receipts", desc: "Get confirmation immediately." },
                  { title: "Official rates", desc: "No hidden charges." },
                  { title: "Guided help", desc: "We assist first-time users." },
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Core services</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl" style={headingFont}>
                      Recharge and bill coverage
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {services.map((service) => (
                    <div key={service.name} className="rounded-2xl border border-border/60 bg-background/80 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                          <service.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{service.name}</p>
                          <p className="text-xs text-muted-foreground">{service.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-border/60 bg-background/80 p-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Need help?</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">We handle the entire payment for you.</p>
                  </div>
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: CheckCircle2, title: "Instant confirmation", desc: "Receipts on the spot." },
              { icon: ShieldCheck, title: "Secure channels", desc: "Bank-authorized payments only." },
              { icon: Phone, title: "Local assistance", desc: "Friendly support in store." },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-[2.5rem] border border-border/60 bg-background/80 p-8 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground" style={headingFont}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-[3rem] border border-border/60 bg-gradient-to-br from-background via-background to-emerald-500/10 p-10 shadow-xl md:p-16">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Supported operators</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl" style={headingFont}>
                  All major networks covered
                </h2>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">
                  Mobile, DTH, broadband, electricity, and utility bill payments handled instantly.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Jio",
                    "Airtel",
                    "Vi",
                    "BSNL",
                    "Tata Play",
                    "Dish TV",
                    "PSPCL",
                    "Netplus",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Need a quick payment?</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground" style={headingFont}>
                  Walk in with your number
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  We will process it instantly and share the confirmation receipt.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                    <a href="tel:9878157109">Call Now</a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                    asChild
                  >
                    <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                      WhatsApp Support
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
