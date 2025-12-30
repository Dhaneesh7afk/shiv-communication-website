import type { Metadata } from "next"
import { ShieldCheck, Ban as Bank, Info, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Domestic Money Transfer Services | Shiv Communication Mandi Gobindgarh",
  description:
    "Safe and fast bank-to-bank money transfer services in Mandi Gobindgarh. Send money anywhere in India instantly. Valid ID required for transactions.",
}

export default function MoneyTransferPage() {
  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Transfer Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            Money <br />
            <span className="text-muted-foreground/30">Transfer.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Send money to any bank account in India instantly and safely from our shop.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase">Fast Domestic <span className="text-muted-foreground/40">Transfers</span></h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
              We provide a secure platform for domestic money transfers, allowing you to send funds to your loved ones
              anywhere in India within minutes.
            </p>
            <div className="grid gap-4 md:gap-6">
              {[
                { title: "Bank to Bank Transfer", desc: "Instant IMPS/NEFT to all Indian banks", icon: Bank },
                { title: "Secure Transactions", desc: "Authenticated and tracked transfers", icon: ShieldCheck },
                { title: "Instant Confirmation", desc: "Receipt provided for every transaction", icon: Info },
              ].map((service, i) => (
                <div key={i} className="flex gap-4 p-5 md:p-6 rounded-2xl md:rounded-[2rem] border-none shadow-none bg-secondary/30 group hover:bg-secondary transition-all">
                  <div className="text-primary mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-sm md:text-base mb-1">{service.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Alert className="border-none bg-primary/5 rounded-[2rem] p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <AlertTitle className="font-black uppercase tracking-tight text-sm mb-2">Important Requirement</AlertTitle>
                  <AlertDescription className="text-muted-foreground px-0 font-bold leading-3 text-left tracking-normal text-xs">
                    {"A valid Government ID (Aadhaar Card, Pan Card, or Voter ID) is required for all money transfer transactions."}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
            <Card className="border-none shadow-none bg-background rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-6 md:p-8 pb-6 bg-secondary/20">
                <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter">Transaction Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <ul className="space-y-4 md:space-y-6 mb-8 md:mb-10">
                  <li className="flex justify-between items-center text-xs md:text-sm py-3 border-b border-muted">
                    <span className="text-muted-foreground font-bold uppercase tracking-wider">Transfer Time</span>
                    <span className="font-black text-primary uppercase tracking-tight">Instant (24x7)</span>
                  </li>
                  <li className="flex justify-between items-center text-xs md:text-sm py-3 border-b border-muted">
                    <span className="text-muted-foreground font-bold uppercase tracking-wider">Supported Banks</span>
                    <span className="font-black uppercase tracking-tight">All Major Banks</span>
                  </li>
                  <li className="flex justify-between items-center text-xs md:text-sm py-3 border-b border-muted">
                    <span className="text-muted-foreground font-bold uppercase tracking-wider">Service Mode</span>
                    <span className="font-black uppercase tracking-tight">In-Store Only</span>
                  </li>
                </ul>
                <div className="space-y-3 md:space-y-4">
                  <Button className="w-full h-12 md:h-14 rounded-full font-black uppercase tracking-widest text-xs" asChild>
                    <a href="tel:9878157109">
                      <Phone className="mr-2 h-4 w-4" />
                      Call for Details
                    </a>
                  </Button>
                  <Button
                    className="w-full h-12 md:h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none font-black uppercase tracking-widest text-xs"
                    asChild
                  >
                    <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      WhatsApp Inquiry
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
