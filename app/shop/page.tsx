import { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { ArrowRight, CheckCircle2, Headphones, MessageCircle, Package, ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import ShopClient from "./shop-client"

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
  title: "Shop Accessories & Gadgets | Shiv Communication",
  description:
    "Buy mobile accessories, PC accessories and gadgets from Shiv Communication. Quality products at best prices.",
}

export default function ShopPage() {
  return (
    <div
      className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_55%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.04),transparent_45%,rgba(14,165,233,0.06))]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                Accessory Studio
              </div>
              <h1
                className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Accessories that feel
                <span className="block text-emerald-600">first-party</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Curated chargers, cases, audio, and add-ons tested in-store for fit, safety, and daily
                durability. Everything you need to upgrade, in one place.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="#catalog">
                    Shop Accessories
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
                    Ask Compatibility
                  </a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Tested in-store", desc: "Verified fit and performance." },
                  { title: "Same-day pickup", desc: "Grab it today in Mandi." },
                  { title: "Verified brands", desc: "Trusted, warranty-friendly." },
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
                      What&apos;s Popular
                    </p>
                    <h2
                      className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Most requested essentials
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { icon: Package, title: "Fast chargers", desc: "Safe, verified output." },
                    { icon: Headphones, title: "Audio & earbuds", desc: "Clear sound with warranty." },
                    { icon: ShieldCheck, title: "Device protection", desc: "Cases and screen guards." },
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Need help choosing?
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">We reply on WhatsApp fast.</p>
                  </div>
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div className="absolute -left-6 -bottom-6 hidden rounded-[2rem] border border-border/60 bg-background/80 p-4 shadow-lg lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  New Stock Weekly
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">Fresh drops every week</p>
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
                title: "Genuine & tested",
                desc: "We recommend only what works with your device.",
              },
              {
                icon: Package,
                title: "Quick pickup",
                desc: "Reserve on WhatsApp and pick up in minutes.",
              },
              {
                icon: Headphones,
                title: "Support included",
                desc: "Ask about compatibility or setup help anytime.",
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

      <section id="catalog" className="pb-24 pt-4 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Live Catalog
              </p>
              <h2
                className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Explore accessories by category
              </h2>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                Search, filter, and reserve instantly. Live stock availability is shown for every
                item.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Verified Accessories
            </div>
          </div>

          <ShopClient />
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-[3rem] border border-border/60 bg-gradient-to-br from-background via-background to-emerald-500/10 p-10 text-center shadow-xl md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_55%)]" />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Need a bundle?
              </p>
              <h2
                className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get a curated set for your device
              </h2>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                Tell us your phone model and budget. We will recommend the best charger, cable,
                case, and screen protection combo.
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
                    Request Bundle
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
