import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { ArrowRight, Headphones, Package, ShieldCheck, Smartphone, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Mobile Accessories Shop in Mandi Gobindgarh | Shiv Communication",
  description:
    "Premium mobile back covers, tempered glass, fast chargers, and earphones in Mandi Gobindgarh. Quality mobile accessories starting from ₹99 at Shiv Communication.",
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

const categories = [
  { name: "Back Covers", price: "Starts ₹99", icon: Package, desc: "Stylish and rugged protection" },
  { name: "Tempered Glass", price: "Starts ₹99", icon: Smartphone, desc: "Premium screen protection" },
  { name: "Fast Chargers", price: "Starts ₹299", icon: Zap, desc: "Verified cables and adapters" },
  { name: "Audio", price: "Starts ₹149", icon: Headphones, desc: "Wired and wireless audio" },
]

export default function AccessoriesPage() {
  const headingFont = { fontFamily: "var(--font-display)" }

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`} style={{ fontFamily: "var(--font-body)" }}>
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
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Accessory Desk
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl" style={headingFont}>
                Everyday add-ons,
                <span className="block text-emerald-600">picked by experts</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                From screen protection to fast chargers, we test fit and performance in store so you get the right
                accessory the first time.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="/shop">
                    Browse Catalog
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
                    Ask Compatibility
                  </a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Verified fit", desc: "We match by model and case size." },
                  { title: "Warranty help", desc: "Guidance on brand warranties." },
                  { title: "Same-day pickup", desc: "Reserve on WhatsApp." },
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Popular picks</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl" style={headingFont}>
                      Essentials in stock
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {categories.map((cat) => (
                    <div key={cat.name} className="rounded-2xl border border-border/60 bg-background/80 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                          <cat.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                          <p className="text-xs text-muted-foreground">{cat.desc}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
                        {cat.price}
                      </p>
                    </div>
                  ))}
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
              { icon: ShieldCheck, title: "Genuine products", desc: "We stock trusted, warranty-friendly brands." },
              { icon: Package, title: "Quick pickup", desc: "Reserve and collect in minutes." },
              { icon: Headphones, title: "Sound tested", desc: "Audio accessories tested in store." },
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
          <div className="relative overflow-hidden rounded-[3rem] border border-border/60 bg-gradient-to-br from-background via-background to-emerald-500/10 p-10 text-center shadow-xl md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_55%)]" />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Custom bundle</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl" style={headingFont}>
                Tell us your phone model, we will build the kit
              </h2>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                Chargers, cables, cases, and screen protection matched to your device and budget.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-14 rounded-full px-10 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
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
