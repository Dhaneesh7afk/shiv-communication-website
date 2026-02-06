import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { ArrowRight, CheckCircle2, MessageCircle, Package, RotateCcw, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import UsedPhonesClient from "./used-phones-client"

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

export const metadata: Metadata = {
  title: "Used Mobile Phones for Sale | Shiv Communication Mandi Gobindgarh",
  description:
    "Buy quality-checked used smartphones at the best prices in Mandi Gobindgarh. iPhone, Samsung, OnePlus & more.",
}

export default function UsedPhonesPage() {
  return (
    <div
      className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12),transparent_55%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.04),transparent_45%,rgba(16,185,129,0.06))]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                Certified Pre-Owned
              </div>
              <h1
                className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Pre-Owned Phones,
                <span className="block text-emerald-600">Zero Compromise</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Hand-verified devices from trusted brands, checked for performance, battery health,
                and overall condition before they hit the shelf.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="#inventory">
                    Browse Inventory
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a
                    href="https://wa.me/919878157109"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reserve on WhatsApp
                  </a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Quality Checks",
                    desc: "Display, camera, speaker, mic, charging and network tests.",
                  },
                  {
                    title: "Verified Listings",
                    desc: "Only devices that pass inspection are listed.",
                  },
                  {
                    title: "Quick Support",
                    desc: "Setup help and software guidance after purchase.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-sm"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm text-foreground/80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2.75rem] border border-border/60 bg-gradient-to-br from-background/90 via-background/70 to-secondary/60 p-6 shadow-[0_24px_90px_-60px_rgba(15,23,42,0.6)] md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      What You Get
                    </p>
                    <h2
                      className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      A premium pre-owned experience
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      title: "Verified performance",
                      desc: "Smooth usage, camera clarity, audio, and network tested.",
                    },
                    {
                      title: "Transparent condition",
                      desc: "Clear grading with real photos and in-hand checks.",
                    },
                    {
                      title: "Fast response",
                      desc: "WhatsApp replies with availability and live pictures.",
                    },
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Need a specific model?
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      We can source and notify quickly.
                    </p>
                  </div>
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div className="absolute -left-6 -bottom-6 hidden rounded-[2rem] border border-border/60 bg-background/80 p-4 shadow-lg lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Updated Hourly
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">Live inventory & pricing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Quality-Checked",
                desc: "Detailed functional checks before listing.",
              },
              {
                icon: Package,
                title: "Accessories When Available",
                desc: "Bills, boxes, and chargers shared if included.",
              },
              {
                icon: RotateCcw,
                title: "After-Sale Support",
                desc: "Setup and software guidance post-purchase.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-[2.5rem] border border-border/60 bg-background/80 p-8 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3
                  className="mt-5 text-xl font-semibold tracking-tight text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inventory" className="pb-24 pt-4 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Live Inventory
              </p>
              <h2
                className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Pick your next phone with confidence
              </h2>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                Fresh stock lands daily. Filter by brand, condition, or storage and reserve instantly.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Verified Listings
            </div>
          </div>

          <UsedPhonesClient />
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto grid gap-6 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.75rem] border border-border/60 bg-background/80 p-8 shadow-sm md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Simple Process
            </p>
            <h3
              className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              From shortlist to pickup in minutes
            </h3>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              {[
                "Browse inventory or send a model request on WhatsApp.",
                "Get live photos, condition notes, and price confirmation.",
                "Visit the store to inspect, test, and take it home.",
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-emerald-500/10 text-sm font-semibold text-emerald-600">
                    {index + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2.75rem] border border-border/60 bg-gradient-to-br from-background via-background to-secondary/60 p-8 shadow-sm md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Local Advantage
            </p>
            <h3
              className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Trusted by Mandi Gobindgarh
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Get expert guidance from the team, compare multiple devices in person, and make the
              final call with zero pressure.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {[
                "Side-by-side comparison support.",
                "Instant WhatsApp quotes and availability.",
                "Walk-in pickup for quick peace of mind.",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-[3rem] border border-border/60 bg-gradient-to-br from-background via-background to-emerald-500/10 p-10 text-center shadow-xl md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_55%)]" />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Custom Request
              </p>
              <h2
                className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Tell us the model, we will do the rest
              </h2>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                Share your budget and preferred brand. We will send options with live photos and
                exact condition notes.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-14 rounded-full px-10 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a
                    href="https://wa.me/919878157109"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request on WhatsApp
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-10 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="tel:+919878157109">Call the Store</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
