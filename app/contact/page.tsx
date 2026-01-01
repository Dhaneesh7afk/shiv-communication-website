import type { Metadata } from "next"
import { MapPin, Clock, Phone, Star, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contact & Location | Shiv Communication Mandi Gobindgarh",
  description:
    "Find Shiv Communication in Mandi Gobindgarh, Punjab. Visit our shop for mobile repair, recharges, and used phones. Business hours: 9 AM - 8:30 PM.",
}

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Visit Us
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            Mandi Gobindgarh <br />
            <span className="text-muted-foreground/30">Location</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Mandi Gobindgarh&apos;s leading technical lab. Visit us for expert assistance and premium digital services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-8 md:space-y-12">
            <div className="grid gap-6 md:gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Our Address",
                  content: "Shiv Communication, Sangatpura Chowk, Mandi Gobindgarh, Punjab, India",
                  action: {
                    label: "Get Directions",
                    href: "https://www.google.com/maps/dir/?api=1&destination=30.6657074894138,76.28087061047621",
                  },

                },
                {
                  icon: Clock,
                  title: "Business Hours",
                  content: "Monday - Sunday | 9:00 AM - 8:30 PM",
                  subContent: "Open all 7 days for your convenience",
                },
                { icon: Phone, title: "Call or Message", content: "9878157109", hasButtons: true },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="border-none shadow-none bg-secondary/30 rounded-[2rem] p-6 md:p-8 group hover:bg-secondary transition-all"
                >
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-2">{item.title}</h3>
                        <p className="text-sm md:text-base font-medium text-muted-foreground/70 leading-relaxed mb-4">
                          {item.content}
                        </p>
                        {item.subContent && (
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                            {item.subContent}
                          </p>
                        )}
                        {item.action && (
                          <Button
                            variant="link"
                            className="px-0 h-auto text-[10px] font-black uppercase tracking-[0.2em] text-primary"
                            asChild
                          >
                            <a href={item.action.href} target="_blank" rel="noopener noreferrer">
                              {item.action.label} →
                            </a>
                          </Button>
                        )}
                        {item.hasButtons && (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              className="flex-1 h-12 rounded-full font-black uppercase tracking-widest text-[10px]"
                              asChild
                            >
                              <a href="tel:9878157109">Call Now</a>
                            </Button>
                            <Button
                              className="flex-1 h-12 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none font-black uppercase tracking-widest text-[10px]"
                              asChild
                            >
                              <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                                WhatsApp
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-2xl font-black mb-6 text-white/40">
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                  <Star className="fill-current" />
                </div>
                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4">
                  Trusted Community <br />
                  <span className="opacity-40">Technical Lab.</span>
                </h4>
                <p className="text-sm md:text-base font-medium opacity-70 italic leading-relaxed">
                  &quot;Excellent service and very fair prices. Shiv Communication is the only place I go for my mobile
                  recharges and repairs in Mandi Gobindgarh.&quot;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 opacity-40" />
                  </div>
                  <p className="font-black uppercase tracking-widest text-[10px]">Local Mandi Customer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] md:h-[600px] lg:h-full w-full overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border bg-muted grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl shadow-primary/5">
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
    </div>
  )
}
