import type { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Monitor,
  ShieldCheck,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Computer & Laptop Repair in Mandi Gobindgarh | Shiv Communication",
  description:
    "Expert computer services in Mandi Gobindgarh. Windows installation, software setup, virus removal, and computer accessories. Reliable IT support for home and office.",
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

const computerServices = [
  { service: "Windows Installation", price: "₹499 - ₹999" },
  { service: "Software Installation", price: "₹199 - ₹499" },
  { service: "Virus / Malware Removal", price: "₹299 - ₹699" },
  { service: "SSD / RAM Upgrade", price: "Starts ₹300 + Parts" },
  { service: "General Servicing & Cleanup", price: "₹299" },
]

export default function ComputerServicesPage() {
  const headingFont = { fontFamily: "var(--font-display)" }

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`} style={{ fontFamily: "var(--font-body)" }}>
      <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_55%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.04),transparent_45%,rgba(16,185,129,0.06))]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                IT Support Desk
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl" style={headingFont}>
                Computer service,
                <span className="block text-emerald-600">done right</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                From OS installs to hardware upgrades, we keep your laptop or desktop running like new with clear
                timelines and transparent pricing.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="tel:9878157109">
                    Call for Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-full px-8 text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    WhatsApp Help
                  </a>
                </Button>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Same-day fixes", desc: "Quick diagnostics with clear timelines." },
                  { title: "Secure backups", desc: "Data handled with care." },
                  { title: "Upgrade options", desc: "SSD + RAM improvements." },
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Service highlights</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl" style={headingFont}>
                      Everything your computer needs
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <Monitor className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { title: "OS & software setup", desc: "Windows installs and productivity tools." },
                    { title: "Hardware upgrades", desc: "SSD, RAM, and component refresh." },
                    { title: "Maintenance & cleanup", desc: "Performance tuning and safety checks." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-border/60 bg-background/80 p-4">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Cpu, title: "Hardware upgrades", desc: "Get your device running fast again." },
              { icon: ShieldCheck, title: "Data protection", desc: "Safe installations and backups." },
              { icon: Wrench, title: "Business support", desc: "Ongoing maintenance for offices." },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-[2.5rem] border border-border/60 bg-background/80 p-8 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground" style={headingFont}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2.75rem] border border-border/60 bg-background/80 p-8 shadow-sm md:p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <Monitor className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pricing guide</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl" style={headingFont}>
                    Core computer services
                  </h2>
                </div>
              </div>
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60">
                      <TableHead className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Service
                      </TableHead>
                      <TableHead className="text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Price
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {computerServices.map((item) => (
                      <TableRow key={item.service} className="border-border/40">
                        <TableCell className="py-4 text-sm font-semibold text-foreground">{item.service}</TableCell>
                        <TableCell className="py-4 text-right text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                          {item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Pricing varies by device and workload.
                </p>
              </div>
            </div>

            <div className="rounded-[2.75rem] border border-border/60 bg-gradient-to-br from-background via-background to-secondary/60 p-8 shadow-sm md:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Accessory desk</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground" style={headingFont}>
                Computer essentials in stock
              </h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Keyboards, mice, speakers, headsets, and cables available for quick pickup.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Genuine accessories and warranties",
                  "Same-day pickup in store",
                  "Guided recommendations",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Button className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                  <a href="tel:9878157109">Call for Stock</a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    WhatsApp Inquiry
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
