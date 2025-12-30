export const dynamic = "force-dynamic"
import { headers } from "next/headers"

import type { Metadata } from "next"
import { PhoneCard } from "@/components/phone-card"
import { ShieldCheck, Package, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Used Mobile Phones for Sale | Shiv Communication Mandi Gobindgarh",
  description:
    "Buy quality-checked used smartphones at the best prices in Mandi Gobindgarh. iPhone, Samsung, OnePlus & more.",
}

/* TYPE FOR DB DATA */
interface UsedPhone {
  _id: string
  brand: string
  model: string
  storage: string
  condition: string
  price: number
  image?: string
  available: boolean
}

/* SERVER COMPONENT */
export default async function UsedPhonesPage() {
const res = await fetch("/api/phones", {
  cache: "no-store",
})


if (!res.ok) {
  console.error("Failed to fetch phones")
  return null
}

const text = await res.text()
const phones: UsedPhone[] = text ? JSON.parse(text) : []


  const availablePhones = phones.filter((phone) => phone.available)

  return (
    <div className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* HERO */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Verified Inventory
          </div>
          <h1 className="text-5xl font-black tracking-tighter sm:text-6xl lg:text-8xl leading-[0.9] uppercase">
            Used <br />
            <span className="text-muted-foreground/30">Stock.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground font-medium max-w-xl mx-auto">
            Every device is quality checked and verified.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: ShieldCheck, title: "100% Verified", desc: "Rigorous diagnostic check" },
            { icon: Package, title: "Full Kit", desc: "Bill & box mostly included" },
            { icon: RotateCcw, title: "Post-Sale", desc: "Software & testing support" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-10 bg-secondary/30 rounded-[2.5rem]"
            >
              <div className="bg-background p-4 rounded-2xl shadow-sm text-primary mb-6">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="font-black uppercase tracking-widest text-sm">
                {item.title}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* PHONES GRID */}
        {availablePhones.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availablePhones.map((phone) => (
              <PhoneCard key={phone._id} phone={phone} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-secondary/10 rounded-3xl border border-dashed">
            <p className="text-muted-foreground">
              No used phones currently in stock.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-32 p-12 md:p-24 bg-primary text-primary-foreground rounded-[3rem] text-center">
          <h2 className="text-4xl font-black uppercase mb-8">
            Custom Request
          </h2>
          <p className="mb-12 opacity-70 max-w-xl mx-auto text-lg">
            Looking for a specific model? Inventory updates hourly.
          </p>
          <Button
            size="lg"
            className="h-16 rounded-full bg-background text-primary font-black uppercase"
            asChild
          >
            <a
              href="https://wa.me/919878157109"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request Phone
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
