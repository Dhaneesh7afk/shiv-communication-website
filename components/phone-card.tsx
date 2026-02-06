import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, MessageCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
interface UsedPhone {
  _id: string
  brand: string
  model: string
  storage: string
  condition: string
  price: number
  image?: string
  images?: string[]
  available: boolean
}


interface PhoneCardProps {
  phone: UsedPhone
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const whatsappMessage = `Hello Shiv Communication, I am interested in buying the ${phone.brand} ${phone.model} (${phone.storage}) listed for ₹${phone.price}. Is it still available?`
  const heroImage = phone.images?.[0] || phone.image || "/placeholder.png"

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-border/60 bg-background/80 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.6)] transition duration-500 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_40px_90px_-55px_rgba(15,23,42,0.7)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative p-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-muted">
          <Image
            src={heroImage}
            alt={`${phone.brand} ${phone.model}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
            {phone.condition}
          </div>
          <div className="absolute right-4 top-4 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {phone.storage}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span>{phone.brand}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            <BadgeCheck className="h-3 w-3" />
            Verified
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
          {phone.model}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Inspected for performance, battery, and overall condition.
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-2xl font-black text-foreground">
              ₹{phone.price.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Live price with store verification.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:flex">
            <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-300" />
            Quality Check
          </div>
        </div>
      </div>

      <CardFooter className="relative p-5 pt-0">
        <div className="grid w-full gap-3">
          <Button
            className="h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/10 transition duration-500 group-hover:shadow-emerald-500/25"
            asChild
          >
            <a
              href={`https://wa.me/919878157109?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Reserve ${phone.brand} ${phone.model} on WhatsApp`}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Reserve
            </a>
          </Button>
          <Button variant="outline" className="h-11 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
            <Link href={`/used-phones/${phone._id}`}>Show details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
