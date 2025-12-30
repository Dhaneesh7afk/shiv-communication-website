import type { Metadata } from "next"
import { ShieldCheck, Banknote, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "EMI & Finance Payment Assistance in Mandi Gobindgarh | Shiv Communication",
  description:
    "Assistance for mobile EMI, consumer loan EMI, and credit card bill payments. Safe and reliable finance support services at Shiv Communication.",
}

export default function EMIPaymentsPage() {
  return (
    // <CHANGE> Updated to match minimal premium aesthetic
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Finance Support
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            EMI <br />
            <span className="text-muted-foreground/30">Finance.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Professional assistance for managing your loans and monthly installments securely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-24">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase">Safe & <span className="text-muted-foreground/40">Reliable</span></h2>
            <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
              We help you stay on top of your monthly payments by providing a convenient and secure way to pay your EMIs
              for various finance companies.
            </p>
            {/* <CHANGE> Updated card design */}
            <div className="grid gap-4 md:gap-6">
              {[
                {
                  title: "Mobile EMI",
                  desc: "Payments for Bajaj Finance, Home Credit, Samsung Finance+",
                  icon: Banknote,
                },
                { title: "Loan EMIs", desc: "Consumer loan and personal loan installments", icon: ShieldCheck },
                { title: "Credit Cards", desc: "Assistance with credit card bill payments", icon: Banknote },
              ].map((service, i) => (
                <div key={i} className="flex gap-4 p-5 md:p-6 rounded-2xl md:rounded-[2rem] bg-secondary/30 border-none group hover:bg-secondary transition-all">
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
          {/* <CHANGE> Updated card with minimal aesthetic */}
          <Card className="border-none shadow-2xl shadow-primary/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-6 md:p-8">
              <CardTitle className="text-center text-xl md:text-2xl font-black uppercase tracking-tighter">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 md:pt-10 p-6 md:p-8 space-y-6 md:space-y-8">
              {[
                "Bring your loan account number or registered mobile number to the shop.",
                "We verify the pending EMI amount on our authorized merchant portal.",
                "Make the payment and receive an instant digital receipt of the transaction."
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-black">
                    {i + 1}
                  </div>
                  <p className="text-xs md:text-sm font-medium leading-relaxed pt-1">{step}</p>
                </div>
              ))}
              <div className="pt-4 md:pt-6 text-center">
                <p className="text-[10px] md:text-xs text-muted-foreground mb-4 font-bold uppercase tracking-widest">Questions about your EMI?</p>
                <Button size="sm" className="w-full h-12 rounded-full font-black uppercase tracking-widest text-xs" asChild>
                  <a href="tel:9878157109">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Ask for Help
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* <CHANGE> Updated partner section with better mobile styling */}
        <div className="rounded-[2rem] md:rounded-[2.5rem] bg-secondary/20 p-8 md:p-12 lg:p-16 text-center border-none">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 md:mb-8 uppercase tracking-tighter">Supported <span className="text-muted-foreground/40">Partners</span></h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 text-sm md:text-base lg:text-xl font-black uppercase tracking-tight text-muted-foreground/60">
            <span>Bajaj Finserv</span>
            <span>Home Credit</span>
            <span>Samsung Finance+</span>
            <span>HDB Finance</span>
            <span>IDFC First</span>
            <span>TVS Credit</span>
          </div>
          <p className="mt-8 md:mt-10 text-[10px] md:text-xs text-muted-foreground italic max-w-2xl mx-auto font-medium leading-relaxed">
            Disclaimer: Shiv Communication acts as an authorized collection point. All transactions are subject to
            successful verification from the respective finance company.
          </p>
        </div>
      </div>
    </div>
  )
}
