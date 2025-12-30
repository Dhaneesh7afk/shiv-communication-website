import type { Metadata } from "next"
import { Banknote, CheckCircle2, Phone, Zap, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Online Recharge & Bill Payments in Mandi Gobindgarh | Shiv Communication",
  description:
    "Instant mobile & DTH recharge, electricity, water, and gas bill payments at Shiv Communication. Safe and reliable digital payments for all networks.",
}

const services = [
  { name: "Mobile Recharge", desc: "All networks (Jio, Airtel, Vi, BSNL)", icon: Phone },
  { name: "DTH Recharge", desc: "Tata Play, Airtel DTH, Dish TV, etc.", icon: Zap },
  { name: "Electricity Bills", desc: "Instant confirmation & receipt", icon: Zap },
  { name: "Utility Bills", desc: "Water, Gas, and Broadband bills", icon: Banknote },
]

export default function RechargePage() {
  return (
    // <CHANGE> Updated to match minimal premium aesthetic with better mobile spacing
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Digital Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            Recharge <br />
            <span className="text-muted-foreground/30">& Bills.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Instant digital payment services for all your daily utility needs.
          </p>
        </div>

        {/* <CHANGE> Updated card design to match minimalist aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
          {services.map((service) => (
            <Card key={service.name} className="border-none shadow-none bg-secondary/30 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 group hover:bg-secondary transition-all duration-500">
              <CardHeader className="p-0 mb-6">
                <div className="mb-4 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg md:text-xl font-black uppercase tracking-tight">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-xs md:text-sm font-medium text-muted-foreground/70">{service.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase">Why Pay <span className="text-muted-foreground/40">With Us?</span></h2>
            <ul className="space-y-4 md:space-y-6">
              {[
                "Instant confirmation for all recharges and bills",
                "Official operator rates with no extra fees",
                "Secure bank-authorized payment channels",
                "Friendly assistance for first-time digital payers",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 md:gap-4">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                  </div>
                  <span className="text-sm md:text-base font-medium">{item}</span>
                </li>
              ))}
            </ul>
            {/* <CHANGE> Better mobile button layout */}
            <div className="pt-4 md:pt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 rounded-full font-black uppercase tracking-widest text-xs" asChild>
                <a href="tel:9878157109">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none font-black uppercase tracking-widest text-xs" asChild>
                <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
          {/* <CHANGE> Updated card design with better mobile styling */}
          <Card className="border-none shadow-none bg-secondary/20 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xs md:text-sm font-black uppercase tracking-widest text-primary/40">Supported Operators</CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2">
                <p className="text-[10px] md:text-xs font-black uppercase text-muted-foreground tracking-widest">Mobile</p>
                <p className="text-xs md:text-sm font-bold">Jio, Airtel, Vi, BSNL</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] md:text-xs font-black uppercase text-muted-foreground tracking-widest">DTH</p>
                <p className="text-xs md:text-sm font-bold">Tata Play, Airtel, Dish TV</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] md:text-xs font-black uppercase text-muted-foreground tracking-widest">Electricity</p>
                <p className="text-xs md:text-sm font-bold">PSPCL & Major Boards</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] md:text-xs font-black uppercase text-muted-foreground tracking-widest">Broadband</p>
                <p className="text-xs md:text-sm font-bold">Airtel, JioFiber, Netplus</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
