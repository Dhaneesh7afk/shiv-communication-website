import { ServiceCard } from "@/components/service-card"
import { QuoteForm } from "@/components/quote-form"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Monitor,
  PhoneCall,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Zap,
} from "lucide-react"
import { RatingStars } from "@/components/ratingStars"
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { FaqBouncy } from "@/components/faq-bouncy"

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Shiv Communication",
  image: "https://shivcommunication.com/logo.png",
  "@id": "https://shivcommunication.com",
  url: "https://shivcommunication.com",
  telephone: "+919878157109",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Market",
    addressLocality: "Mandi Gobindgarh",
    addressRegion: "PB",
    postalCode: "147301",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.665121,
    longitude: 76.291771,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "20:30",
  },
}

export default function Home() {
  const headingFont = { fontFamily: "var(--font-display)" }

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`} style={{ fontFamily: "var(--font-body)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[560px] w-[1040px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_55%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.04),transparent_45%,rgba(14,165,233,0.06))]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Trusted Local Tech Partner
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl" style={headingFont}>
                Repairs, recharges,
                <span className="block text-emerald-600">and everything in between</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                Shiv Communication is your one-stop destination for mobile repair, accessories, digital payments, and
                trusted local support in Mandi Gobindgarh.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    Get Free Estimate
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "5000+ customers", desc: "Trusted across Mandi." },
                  { title: "10+ years", desc: "Consistent local support." },
                  { title: "4.9 rating", desc: "Loved by repeat customers." },
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Open today</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl" style={headingFont}>
                      Visit our store
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { icon: Clock, title: "Timings", desc: "09:00 - 20:30 (All days)" },
                    { icon: MapPin, title: "Location", desc: "Sangatpura Chowk, Mandi Gobindgarh" },
                    { icon: PhoneCall, title: "Contact", desc: "9878157109 for quick support" },
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
                <Button
                  variant="outline"
                  className="mt-6 h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="#location">Get Directions</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Core strengths</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl" style={headingFont}>
                Built for speed, clarity, and trust
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg">
              Every service is designed to be simple for you and efficient for us, so you get predictable results.
            </p>
          </div>
          <BentoGrid>
            <BentoGridItem
              title="Same-day repairs"
              description="Fast diagnostics with honest timelines for most devices."
              icon={<Zap className="h-5 w-5" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Verified parts"
              description="Only trusted spares and accessories, backed with testing."
              icon={<ShieldCheck className="h-5 w-5" />}
            />
            <BentoGridItem
              title="Transparent pricing"
              description="No hidden charges. Clear estimates before work begins."
              icon={<Banknote className="h-5 w-5" />}
            />
            <BentoGridItem
              title="Local support"
              description="On-ground help in Mandi Gobindgarh with real humans."
              icon={<PhoneCall className="h-5 w-5" />}
              className="md:col-span-2"
            />
          </BentoGrid>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Services</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight" style={headingFont}>
                The full service stack
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                From hardware repair to digital payments, everything is handled by experts.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="h-1 w-20 bg-emerald-500 rounded-full" />
              <div className="h-1 w-10 bg-muted rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            <ServiceCard
              title="Mobile Repair"
              description="Hardware & software surgery."
              details={["Screens", "Batteries", "Water Damage", "Motherboard"]}
              icon={Smartphone}
              footerText="Certified Techs"
              href="/mobile-repair"
            />
            <ServiceCard
              title="Digital Payments"
              description="Recharges & bill support."
              details={["Recharge", "DTH", "Electricity", "EMI Payments"]}
              icon={Banknote}
              footerText="Instant Sync"
              href="/recharge-bill-payments"
            />
            <ServiceCard
              title="Computer Care"
              description="Laptops & desktop service."
              details={["Windows", "SSDs", "Virus Removal", "Hardware"]}
              icon={Monitor}
              footerText="Quality Parts"
              href="/computer-services"
            />
            <ServiceCard
              title="Sell Device"
              description="Best value for your phone."
              details={["Used Phones", "Old Device Sale", "Instant Cash"]}
              icon={ShoppingBag}
              footerText="Best Exchange"
              href="/old-phone-buy-sell"
            />
            <ServiceCard
              title="EMI Payments"
              description="Pay EMIs with ease."
              details={["EMI Payments", "Bill Management", "Finance Support"]}
              icon={CreditCard}
              footerText="Secure & Fast"
              href="/emi-payments"
            />
            <ServiceCard
              title="Money Transfer"
              description="Instant bank transfers."
              details={["IMPS", "NEFT", "Secure Transfers", "Receipts"]}
              icon={Banknote}
              footerText="Trusted Desk"
              href="/money-transfer"
            />
            <ServiceCard
              title="Buy Used Phones"
              description="Quality pre-owned devices."
              details={["iPhone", "Samsung", "Vivo", "Oppo & more"]}
              icon={ShoppingBag}
              footerText="Verified Stock"
              href="/used-phones"
            />
            <ServiceCard
              title="Shop Accessories"
              description="Protection & add-ons."
              details={["Cases", "Chargers", "Headphones", "Screen Guards"]}
              icon={ShoppingBag}
              footerText="Curated Picks"
              href="/shop"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center rounded-full border bg-background/60 backdrop-blur-sm px-4 py-1.5 mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Service Promise
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={headingFont}>
                Quick fixes, honest pricing, same-day support
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                We diagnose before we replace. You get a clear quote, clean repair, and the confidence of local experts.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "30-60 min for common repairs",
                  "Certified technicians and genuine parts",
                  "Transparent updates over WhatsApp",
                  "Secure payments and warranty support",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm font-semibold text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-semibold mb-4" style={headingFont}>Quick actions</h3>
              <div className="space-y-4">
                <Button size="lg" className="w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    WhatsApp Estimate
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="/shop">Browse Accessories</a>
                </Button>
                <Button size="lg" variant="outline" className="w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="/used-phones">View Used Phones</a>
                </Button>
              </div>
              <div className="mt-6 rounded-2xl bg-secondary/30 p-4 text-sm text-muted-foreground">
                Need help choosing? Call or visit the shop for live recommendations.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Instant Cash
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={headingFont}>
                Sell your old mobile
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Do not let your old phone sit in a drawer. Get an instant price quote and get paid today at Shiv
                Communication.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: ShieldCheck, text: "Transparent valuation" },
                  { icon: Zap, text: "Instant cash payment" },
                  { icon: ShoppingBag, text: "Best exchange rates" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center text-muted-foreground font-medium">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-3xl blur-2xl -z-10" />
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">How it works</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={headingFont}>
                From drop-off to done in 3 steps
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg">
              Walk in, WhatsApp, or call. We diagnose fast and keep you updated until delivery.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Diagnose", description: "Quick inspection and transparent quote.", icon: ShieldCheck },
              { title: "Repair", description: "Certified technicians and genuine parts.", icon: Zap },
              { title: "Deliver", description: "Same-day pickup for most repairs.", icon: CheckCircle2 },
            ].map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-border/60 bg-background/80 p-6 md:p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold" style={headingFont}>{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6" style={headingFont}>
              Why choose Shiv Communication?
            </h2>
            <p className="text-muted-foreground text-lg">
              We combine technical expertise with customer-first service to deliver the best experience in Mandi Gobindgarh.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Trusted local shop in Mandi Gobindgarh",
              "Transparent pricing with no hidden costs",
              "Fastest repair turnaround in the area",
              "Friendly and expert customer support",
              "Comprehensive one-stop solution",
              "Latest equipment and quality spares",
            ].map((point) => (
              <div key={point} className="flex items-start space-x-4 bg-secondary/20 p-6 rounded-2xl border border-border/60 hover:bg-secondary/30 transition-colors">
                <div className="rounded-full bg-emerald-500/10 p-2 shrink-0 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="font-semibold leading-tight pt-1">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-6 md:p-10 shadow-lg">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Customer stories</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight" style={headingFont}>
                  Trusted by families and businesses in Mandi Gobindgarh
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Real feedback from customers who visit us for repairs, recharges, and accessories.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <RatingStars rating={4.8} />
                <span className="text-sm font-semibold text-muted-foreground">4.8/5 based on local reviews</span>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { quote: "Screen replaced in 40 minutes, price was exactly as quoted.", name: "Gurpreet Singh" },
                { quote: "Great support. They helped me set up EMI payment in minutes.", name: "Navneet Kaur" },
                { quote: "Bought a used phone, condition was excellent and fully checked.", name: "Harpreet Sharma" },
              ].map((review) => (
                <div key={review.name} className="rounded-2xl border border-border/60 bg-secondary/20 p-5 text-sm">
                  <p className="font-semibold text-foreground">"{review.quote}"</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {review.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="location" className="py-16 md:py-24 lg:py-32 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl md:rounded-[2.5rem] bg-background border border-border/60 p-6 md:p-8 lg:p-16 shadow-2xl">
            <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8 md:space-y-10">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight" style={headingFont}>
                  Find us in the city
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Location</p>
                    <p className="font-semibold">Sangatpura Chowk, Mandi Gobindgarh</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Hours</p>
                    <p className="font-semibold">Mon - Sun | 09:00 - 20:30</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Button size="lg" className="rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer">
                      Get Directions
                    </a>
                  </Button>
                  <div className="p-1">
                    <RatingStars rating={4.5} />
                  </div>
                </div>
              </div>
              <div className="h-[300px] md:h-[400px] w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-border/60 bg-muted grayscale hover:grayscale-0 transition-all duration-700 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214.49205594808936!2d76.28087061047621!3d30.6657074894138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39101b392061f159%3A0xdcf55c53b5ec2b67!2sShiv%20Communication!5e0!3m2!1sen!2sin!4v1766686510137!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-12 md:py-20 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={headingFont}>
                Frequently asked questions
              </h2>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Click on items to expand & collapse
              </p>
              <div className="mx-auto mt-3 h-8 w-px bg-border/70" />
            </div>

            <div className="w-full max-w-xl rounded-[2rem] border border-border/60 bg-background/70 p-3 shadow-[0_26px_70px_-50px_rgba(15,23,42,0.6)] backdrop-blur">
              <FaqBouncy />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
