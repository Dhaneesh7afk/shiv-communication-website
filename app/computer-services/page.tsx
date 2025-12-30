import type { Metadata } from "next"
import { Monitor, Cpu, ShieldCheck, Wrench, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Computer & Laptop Repair in Mandi Gobindgarh | Shiv Communication",
  description:
    "Expert computer services in Mandi Gobindgarh. Windows installation, software setup, virus removal, and computer accessories. Reliable IT support for home and office.",
}

const computerServices = [
  { service: "Windows Installation", price: "₹499 – ₹999" },
  { service: "Software Installation", price: "₹199 – ₹499" },
  { service: "Virus / Malware Removal", price: "₹299 – ₹699" },
  { service: "SSD / RAM Upgrade", price: "Starts ₹300 + Parts" },
  { service: "General Servicing & Cleanup", price: "₹299" },
]

export default function ComputerServicesPage() {
  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            IT Solutions
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            Computer <br />
            <span className="text-muted-foreground/30">Care.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Professional IT support and hardware services for desktops and laptops in Mandi Gobindgarh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          <div className="lg:col-span-2 space-y-12 md:space-y-16">
            <Card className="border-none shadow-none bg-secondary/30 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 md:p-12 pb-0">
                <CardTitle className="flex items-center gap-4 text-xl md:text-2xl font-black uppercase tracking-tighter">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                    <Monitor className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  Service Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 md:p-12">
                <Table>
                  <TableHeader>
                    <TableRow className="border-muted/50">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Service
                      </TableHead>
                      <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Price
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {computerServices.map((item) => (
                      <TableRow key={item.service} className="border-muted/30">
                        <TableCell className="py-4 font-bold text-sm md:text-base uppercase tracking-tight">
                          {item.service}
                        </TableCell>
                        <TableCell className="text-right py-4 font-black text-primary">{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  icon: Cpu,
                  title: "Hardware Upgrades",
                  desc: "Make your old laptop or desktop fast again with SSD and RAM upgrades.",
                },
                {
                  icon: ShieldCheck,
                  title: "Data Protection",
                  desc: "Safe OS installations and data backup services for your peace of mind.",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="bg-secondary/20 border-none rounded-[2rem] p-6 md:p-8 group hover:bg-secondary transition-all"
                >
                  <CardContent className="p-0">
                    <div className="flex gap-4 md:gap-6 items-start">
                      <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-black uppercase tracking-tight text-sm md:text-base mb-2">{item.title}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6 md:space-y-8 lg:sticky lg:top-32">
            <Card className="bg-primary text-primary-foreground border-none rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-primary/20 overflow-hidden relative">
              <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
              <CardContent className="p-8 md:p-10 relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 mb-6">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-4">
                  Desktop <br />
                  <span className="opacity-40">Add-ons.</span>
                </h3>
                <p className="text-sm font-medium opacity-70 mb-8 leading-relaxed">
                  We stock keyboards, mice, speakers, headsets, and various computer cables at great prices.
                </p>
                <Button
                  className="w-full h-12 md:h-14 rounded-full bg-background text-primary hover:bg-background/90 font-black uppercase tracking-widest text-xs"
                  asChild
                >
                  <a href="tel:9878157109">
                    <Phone className="mr-2 h-4 w-4" />
                    Call for Stock
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-secondary/10 rounded-[2rem] p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-primary/40">
                  Lab Capability
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-tight">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Custom Gaming PC Builds
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-tight">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Annual Maintenance (AMC)
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
