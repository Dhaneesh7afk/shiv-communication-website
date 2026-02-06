import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Wrench,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Expert Mobile Repair in Mandi Gobindgarh | Shiv Communication",
  description:
    "Professional mobile repair services for iPhone, Samsung, Vivo, Oppo & more. Screen, battery, and charging port repairs in 30-60 mins at Shiv Communication.",
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

const repairServices = [
  { service: "Screen Replacement", price: "₹799 - ₹3,999" },
  { service: "Battery Replacement", price: "₹699 - ₹1,499" },
  { service: "Charging Port Repair", price: "₹299 - ₹799" },
  { service: "Speaker / Mic Repair", price: "₹199 - ₹599" },
  { service: "Software Issues", price: "₹199 - ₹499" },
  { service: "Water Damage Repair", price: "Starts ₹499" },
]

export default function MobileRepairPage() {
  const headingFont = { fontFamily: "var(--font-display)" }

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`} style={{ fontFamily: "var(--font-body)" }}>
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.15),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14),transparent_55%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.04),transparent_45%,rgba(14,165,233,0.06))]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Repair Lab
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl" style={headingFont}>
                Precision fixes,
                <span className="block text-emerald-600">same-day confidence</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Diagnosed and repaired by certified technicians. We test every component so your phone leaves the shop
                ready for daily use.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="tel:9878157109">
                    Call for Repair
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
                    WhatsApp Estimate
                  </a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "30-60 min", desc: "Most repairs done same day." },
                  { title: "Verified parts", desc: "Quality-tested spares only." },
                  { title: "Clear pricing", desc: "Transparent quotes upfront." },
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Repair promise</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl" style={headingFont}>
                      What you can expect
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { title: "Live diagnostics", desc: "We test display, battery, cameras, and ports." },
                    { title: "Clear timelines", desc: "Get realistic turnaround updates." },
                    { title: "Post-repair checks", desc: "Final QA before handover." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-border/60 bg-background/80 p-4">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Need help now?</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">Send a photo for quick review.</p>
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
              { icon: Clock, title: "Fast turnaround", desc: "Quick diagnostics and same-day repairs." },
              { icon: ShieldCheck, title: "Quality parts", desc: "Original or verified replacement parts." },
              { icon: Zap, title: "Skilled technicians", desc: "Handled by experienced repair pros." },
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
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="rounded-[2.75rem] border border-border/60 bg-background/80 p-8 shadow-sm md:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pricing guide</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl" style={headingFont}>
                    Popular repair pricing
                  </h2>
                </div>
              </div>
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60">
                      <TableHead className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Service
                      </TableHead>
                      <TableHead className="text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Price
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {repairServices.map((item) => (
                      <TableRow key={item.service} className="border-border/40">
                        <TableCell className="py-4 text-sm font-semibold text-foreground">{item.service}</TableCell>
                        <TableCell className="py-4 text-right text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                          {item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Express 60-minute service for common issues.
                </p>
              </div>
            </div>

            <div className="rounded-[2.75rem] border border-border/60 bg-gradient-to-br from-background via-background to-secondary/60 p-8 shadow-sm md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Lab capability</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground" style={headingFont}>
                We repair across all major brands
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                iPhone, Samsung, Vivo, Oppo, Realme, Xiaomi, OnePlus, and more.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "iPhone",
                  "Samsung",
                  "Vivo",
                  "Oppo",
                  "Realme",
                  "Xiaomi",
                  "OnePlus",
                  "Moto",
                  "Pixel",
                ].map((brand) => (
                  <span
                    key={brand}
                    className="rounded-full border border-border/60 bg-background/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-border/60 bg-background/80 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Need a repair quote?</p>
                    <p className="text-xs text-muted-foreground">Call or send photos on WhatsApp.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Button className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="tel:9878157109">Call Technical Team</a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    Message WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
