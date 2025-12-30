import Image from "next/image"
import { BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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


interface PhoneCardProps {
  phone: UsedPhone
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const whatsappMessage = `Hello Shiv Communication, I am interested in buying the ${phone.brand} ${phone.model} (${phone.storage}) listed for ₹${phone.price}. Is it still available?`

  return (
    <Card className="group overflow-hidden flex flex-col h-full border-none shadow-none bg-transparent hover:bg-secondary/30 transition-all duration-500 rounded-[2rem]">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-[2rem] shadow-inner">
        <Image
          src={phone.image || "/placeholder.png"}
          alt={`${phone.brand} ${phone.model}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground border-none text-[10px] font-black uppercase tracking-widest px-3 py-1">
          {phone.condition}
        </Badge>
      </div>
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">{phone.brand}</span>
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-primary/60">
            <BadgeCheck className="h-3 w-3 mr-1" /> Verified
          </div>
        </div>
        <h3 className="text-xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-1 transition-transform duration-500">
          {phone.model} <br />
          <span className="text-muted-foreground/40 text-sm tracking-widest font-bold">({phone.storage})</span>
        </h3>
      </CardHeader>
      <CardContent className="px-6 pt-0 flex-1">
        <div className="text-2xl font-black tracking-tighter text-primary mt-4">
          ₹{phone.price.toLocaleString("en-IN")}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mt-2">
          Full Kit Available
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full h-12 rounded-full font-bold shadow-lg shadow-primary/5 group-hover:shadow-primary/20 transition-all duration-500"
          asChild
        >
          <a
            href={`https://wa.me/919878157109?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy on WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
