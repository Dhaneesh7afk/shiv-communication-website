import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { Clock, MapPin, MessageCircle, Phone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact & Location | Shiv Communication Mandi Gobindgarh",
  description:
    "Find Shiv Communication in Mandi Gobindgarh, Punjab. Visit our shop for mobile repair, recharges, and used phones. Business hours: 9 AM - 8:30 PM.",
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

export default function ContactPage() {
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
                Visit Us
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl" style={headingFont}>
                Find Shiv Communication,
                <span className="block text-emerald-600">right in Mandi</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Your local hub for repairs, recharges, and accessories. Drop by for quick support or reach us online.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="tel:9878157109">
                    Call the Store
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Open daily", desc: "09:00 to 20:30" },
                  { title: "Central location", desc: "Sangatpura Chowk" },
                  { title: "Quick response", desc: "Call or WhatsApp" },
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Customer rating</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl" style={headingFont}>
                      Trusted by locals
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  "Excellent service and fair pricing. Shiv Communication is our go-to for repairs and recharges."
                </p>
                <div className="mt-6 flex items-center gap-2 text-emerald-600">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">4.9/5</span>
                </div>
                <div className="mt-6 rounded-2xl border border-border/60 bg-background/80 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Need directions?</p>
                      <p className="text-xs text-muted-foreground">We can guide you live on call.</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="mt-6 h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=30.6657074894138,76.28087061047621"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="grid gap-6">
              {[
                {
                  icon: MapPin,
                  title: "Our Address",
                  content: "Shiv Communication, Sangatpura Chowk, Mandi Gobindgarh, Punjab",
                },
                {
                  icon: Clock,
                  title: "Business Hours",
                  content: "Monday - Sunday | 09:00 AM - 08:30 PM",
                },
                {
                  icon: Phone,
                  title: "Call or Message",
                  content: "9878157109",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2.5rem] border border-border/60 bg-background/80 p-6 shadow-sm md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground" style={headingFont}>
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-6 shadow-sm md:p-8">
                <h3 className="text-lg font-semibold text-foreground" style={headingFont}>
                  Quick contact
                </h3>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Button className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                    <a href="tel:9878157109">Call Now</a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                    asChild
                  >
                    <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="h-[400px] md:h-[520px] w-full overflow-hidden rounded-[2.75rem] border border-border/60 bg-muted shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214.49205594808936!2d76.28087061047621!3d30.6657074894138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39101b392061f159%3A0xdcf55c53b5ec2b67!2sShiv%20Communication!5e0!3m2!1sen!2sin!4v1766686510137!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shiv Communication Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
