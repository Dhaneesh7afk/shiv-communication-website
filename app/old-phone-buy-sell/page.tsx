import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuoteForm } from "@/components/quote-form"

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
  title: "Sell Your Old Phone | Shiv Communication Mandi Gobindgarh",
  description:
    "Get the best price for your old smartphone in Mandi Gobindgarh. Instant cash payment and transparent valuation at Shiv Communication. Sell today on WhatsApp.",
}

export default function OldPhoneBuySellPage() {
  return (
    <div
      className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_55%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.04),transparent_45%,rgba(16,185,129,0.06))]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                Trade-In Desk
              </div>
              <h1
                className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Sell your phone,
                <span className="block text-emerald-600">get paid today</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Fast, transparent valuations with real market pricing. Walk in with your phone, walk
                out with cash or bank transfer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a
                    href="https://wa.me/919878157109"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Quote on WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="tel:+919878157109">Call the Store</a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "10-min valuation", desc: "Quick response on WhatsApp." },
                  { title: "Fair pricing", desc: "No hidden deductions." },
                  { title: "Same-day payout", desc: "Cash or bank transfer." },
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
              <QuoteForm />
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-border/60 bg-background/80 p-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Prefer WhatsApp?
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    Send photos for faster accuracy.
                  </p>
                </div>
                <MessageCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="mt-4 hidden lg:block lg:ml-auto">
                <div className="rounded-[2rem] border border-border/60 bg-background/80 p-4 shadow-lg">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Walk-in Friendly
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">Instant verification in-store</p>
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
              {
                icon: Zap,
                title: "Instant valuation",
                desc: "Get the estimate within minutes of sharing details.",
              },
              {
                icon: ShieldCheck,
                title: "Transparent checks",
                desc: "We explain the final price clearly before payout.",
              },
              {
                icon: Banknote,
                title: "Immediate payment",
                desc: "Cash or bank transfer after a quick verification.",
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

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto grid gap-6 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.75rem] border border-border/60 bg-background/80 p-8 shadow-sm md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              How it works
            </p>
            <h3
              className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Clear process, zero confusion
            </h3>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              {[
                "Share your phone details or request a live estimate.",
                "We verify condition in-store and confirm the final price.",
                "Get paid immediately and complete the exchange.",
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
              Why customers trust us
            </p>
            <h3
              className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Local support, fast decisions
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Our team has handled hundreds of trade-ins with honest pricing and quick turnaround
              in Mandi Gobindgarh.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {[
                { icon: Clock, text: "Fast inspection and confirmation." },
                { icon: ShieldCheck, text: "Clear condition checks, no surprises." },
                { icon: CheckCircle2, text: "Instant payout once verified." },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-foreground/80">
                  <item.icon className="h-4 w-4 text-emerald-600" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
