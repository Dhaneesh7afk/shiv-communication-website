import type { Metadata } from "next"
import { Smartphone, ShieldCheck, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Expert Mobile Repair in Mandi Gobindgarh | Shiv Communication",
  description:
    "Professional mobile repair services for iPhone, Samsung, Vivo, Oppo & more. Screen, battery, and charging port repairs in 30-60 mins at Shiv Communication.",
}

const repairServices = [
  { service: "Screen Replacement", price: "₹799 – ₹3,999" },
  { service: "Battery Replacement", price: "₹699 – ₹1,499" },
  { service: "Charging Port Repair", price: "₹299 – ₹799" },
  { service: "Speaker / Mic Repair", price: "₹199 – ₹599" },
  { service: "Software Issues", price: "₹199 – ₹499" },
  { service: "Water Damage Repair", price: "Starts ₹499" },
]

export default function MobileRepairPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Professional Lab
          </div>
          <h1 className="text-5xl font-black tracking-tighter sm:text-6xl lg:text-8xl leading-[0.9] uppercase">
            Precision <br />
            <span className="text-muted-foreground/30">Repair.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Advanced hardware diagnostics and surgical repairs in the heart of Mandi Gobindgarh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2 space-y-16">
            <Card className="border-none shadow-none bg-secondary/30 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  Pricing Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 pt-8">
                <Table>
                  <TableHeader>
                    <TableRow className="border-muted/50">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Type
                      </TableHead>
                      <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Price
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {repairServices.map((item) => (
                      <TableRow key={item.service} className="border-muted/30">
                        <TableCell className="py-4 font-bold text-sm uppercase tracking-tight">
                          {item.service}
                        </TableCell>
                        <TableCell className="text-right py-4 font-black text-primary">{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="mt-8 text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
                  * Express 60-Minute Service
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Clock, title: "Speed", desc: "60-Min Turnaround" },
                { icon: ShieldCheck, title: "Original", desc: "Quality Guaranteed" },
                { icon: Zap, title: "Expert", desc: "Surgical Precision" },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-10 bg-muted/30 rounded-[2rem] group hover:bg-secondary transition-all"
                >
                  <benefit.icon className="h-8 w-8 text-primary mb-6" />
                  <h3 className="font-black uppercase tracking-widest text-xs">{benefit.title}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-2">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 sticky top-32">
            <Card className="bg-primary text-primary-foreground border-none rounded-[2.5rem] shadow-2xl shadow-primary/20 overflow-hidden relative">
              <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
              <CardContent className="p-10 relative z-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">
                  Need an <br />
                  <span className="opacity-40">Estimate?</span>
                </h3>
                <p className="text-sm font-medium opacity-70 mb-10 leading-relaxed">
                  Provide your device details via WhatsApp for an immediate technical assessment and quote.
                </p>
                <div className="space-y-4">
                  <Button
                    className="w-full h-14 rounded-full bg-background text-primary hover:bg-background/90 font-black uppercase tracking-widest text-xs"
                    asChild
                  >
                    <a href="tel:9878157109">Call Technical Team</a>
                  </Button>
                  <Button
                    className="w-full h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none font-black uppercase tracking-widest text-xs"
                    asChild
                  >
                    <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                      Message WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-secondary/20 rounded-[2rem] p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-primary/40">
                  Lab Capability
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-wrap gap-2">
                  {["iPhone", "Samsung", "Vivo", "Oppo", "Realme", "Xiaomi", "OnePlus", "Moto", "Pixel"].map(
                    (brand) => (
                      <span
                        key={brand}
                        className="px-4 py-2 bg-background/50 rounded-xl text-[10px] font-black uppercase tracking-widest border border-muted/50"
                      >
                        {brand}
                      </span>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
