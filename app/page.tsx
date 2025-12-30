"use client"

import { ServiceCard } from "@/components/service-card"
import { QuoteForm } from "@/components/quote-form"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ShieldCheck, Zap, Banknote, Smartphone, Monitor, ShoppingBag, Star } from "lucide-react"

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
  return (
    <div className="min-h-screen bg-background font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20 lg:pt-32 lg:pb-32">
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 md:px-4 py-1.5 mb-6 md:mb-8 text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
            Trusted Local Tech Partner
          </div>
          <h1 className="mb-6 md:mb-8 text-balance text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter leading-[0.9]">
            Professional Repair <br />
            <span className="text-muted-foreground/50">Modern Convenience</span>
          </h1>
          <p className="mx-auto mb-8 md:mb-12 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed px-4">
            Elevating mobile and computer services in Mandi Gobindgarh with expert care and instant digital solutions.
          </p>
          <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 px-4">
            <Button
  size="lg"
  className="w-full sm:w-auto px-10 h-14 rounded-full text-base font-bold shadow-primary/25 my-0.5"
  onClick={() =>
    window.open(
      "https://wa.me/919878157109?text=Hello%20I%20want%20a%20free%20estimate",
      "_blank"
    )
  }
>
  Get Free Estimate
</Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-10 h-14 rounded-full text-base font-bold border-2 bg-transparent my-0"
              asChild
            >
              <a href="#services">Explore Services</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 lg:py-32 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">
                The Full Service <br />
                <span className="text-muted-foreground/40">Technical Stack.</span>
              </h2>
              <p className="mt-4 md:mt-6 text-muted-foreground text-base md:text-lg">
                From hardware surgery to financial recharges, we handle it all with precision.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="h-1 w-20 bg-primary" />
              <div className="h-1 w-10 bg-muted" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-12">
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
              description="Recharges & Bill support."
              details={["Recharge", "DTH", "Electricity", "EMI Payments"]}
              icon={Banknote}
              footerText="Instant Sync"
              href="/recharge-bill-payments"
            />
            <ServiceCard
              title="Computer Care"
              description="Laptops & Desktop service."
              details={["Windows", "SSDs", "Virus Removal", "Hardware"]}
              icon={Monitor}
              footerText="Quality Parts"
              href="/computer-services"
            />
            <ServiceCard
              title="Buy & Sell"
              description="Best value for devices."
              details={["Used Phones", "Old Device Sale", "Instant Cash"]}
              icon={ShoppingBag}
              footerText="Best Exchange"
              href="/used-phones"
            />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sell Your Old Mobile</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Don't let your old phone sit in a drawer. Get an instant price quote and get paid today at Shiv
                Communication.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center text-muted-foreground">
                  <ShieldCheck className="mr-3 h-5 w-5 text-primary" /> Transparent Valuation
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Zap className="mr-3 h-5 w-5 text-primary" /> Instant Cash Payment
                </li>
                <li className="flex items-center text-muted-foreground">
                  <ShoppingBag className="mr-3 h-5 w-5 text-primary" /> Best Exchange Rates
                </li>
              </ul>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Why Choose Shiv Communication?</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Trusted local shop in Mandi Gobindgarh",
              "Transparent pricing with no hidden costs",
              "Fastest repair turnaround in the area",
              "Friendly and expert customer support",
              "Comprehensive one-stop solution",
              "Latest equipment and quality spares",
            ].map((point, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="rounded-full bg-primary-foreground/20 p-1">
                  <Zap className="h-4 w-4" />
                </div>
                <p className="font-medium">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 md:py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl md:rounded-[2.5rem] bg-background border p-6 md:p-8 lg:p-16 shadow-2xl shadow-primary/5">
            <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8 md:space-y-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none">
                  Find Us <br />
                  <span className="text-muted-foreground/40">In The City.</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Location</p>
                    <p className="font-bold">
                  Sangatpura Chowk, <br />
                      Mandi Gobindgarh
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Hours</p>
                    <p className="font-bold">
                      Mon — Sun <br />
                      09:00 — 21:30
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-6">
                  <Button size="lg" className="rounded-full px-8" asChild>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer">
                      Get Directions
                    </a>
                  </Button>
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center"
                      >
                        <Star className="h-4 w-4 fill-primary text-primary" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">4.5+ Rating</p>
                </div>
              </div>
              <div className="h-[300px] md:h-[400px] w-full overflow-hidden rounded-2xl md:rounded-[2rem] border bg-muted grayscale hover:grayscale-0 transition-all duration-700 shadow-inner">
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

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-20 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-8 md:mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does mobile repair take?</AccordionTrigger>
              <AccordionContent>
                Most common repairs like screen and battery replacements are completed within 30–60 minutes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do you support EMI payments?</AccordionTrigger>
              <AccordionContent>
                Yes, we support EMI payments for various finance companies and consumer loans.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I sell my old phone here?</AccordionTrigger>
              <AccordionContent>
                Yes! We buy old phones at competitive prices. You can use our WhatsApp form to get a quick quote.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Do you do all bill payments?</AccordionTrigger>
              <AccordionContent>
                We handle electricity, water, gas, and mobile/DTH recharge for all major providers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is money transfer safe?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We use secure, bank-authorized channels for all domestic money transfers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  )
}
