import type { Metadata } from "next"
import { QuoteForm } from "@/components/quote-form"
import { ShieldCheck, Banknote, Zap, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Sell Your Old Phone | Shiv Communication Mandi Gobindgarh",
  description:
    "Get the best price for your old smartphone in Mandi Gobindgarh. Instant cash payment and transparent valuation at Shiv Communication. Sell today on WhatsApp.",
}

export default function OldPhoneBuySellPage() {
  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-12 md:space-y-16">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Exchange Program
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                Sell Your <br />
                <span className="text-muted-foreground/30">Device.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed max-w-xl">
                Don&apos;t let your old device lose its value. We offer the most competitive prices for used smartphones
                in Mandi Gobindgarh.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "Instant Valuation",
                  desc: "Get an estimated price within minutes on WhatsApp.",
                  icon: Zap,
                },
                {
                  title: "Transparent Process",
                  desc: "Fair evaluation based on condition and market value.",
                  icon: ShieldCheck,
                },
                {
                  title: "Immediate Payment",
                  desc: "Get paid instantly in cash or bank transfer once verified.",
                  icon: Banknote,
                },
              ].map((benefit, i) => (
                <div key={i} className="flex gap-6 md:gap-8 group">
                  <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
                    <benefit.icon className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-base md:text-lg mb-2">{benefit.title}</h3>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground/70 leading-relaxed max-w-sm">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 md:p-10 bg-secondary/30 rounded-[2.5rem] border-none">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageSquare className="h-4 w-4" />
                </div>
                Direct Chat
              </h3>
              <p className="text-sm font-medium text-muted-foreground/70 mb-6 leading-relaxed">
                Send us photos of your phone directly on WhatsApp for a more accurate technical assessment.
              </p>
              <a
                href="https://wa.me/919878157109"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center px-8 rounded-full bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
              >
                Message Technical Team
              </a>
            </div>
          </div>

          <div className="bg-background p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border shadow-2xl shadow-primary/5">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  )
}
