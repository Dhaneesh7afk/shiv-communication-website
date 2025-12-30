import type { Metadata } from "next"
import { Package, Smartphone, Headset, Zap, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Mobile Accessories Shop in Mandi Gobindgarh | Shiv Communication",
  description:
    "Premium mobile back covers, tempered glass, fast chargers, and earphones in Mandi Gobindgarh. Quality mobile accessories starting from ₹99 at Shiv Communication.",
}

const categories = [
  { name: "Back Covers", price: "Starts ₹99", icon: Package, desc: "Stylish & rugged protection" },
  { name: "Tempered Glass", price: "Starts ₹99", icon: Smartphone, desc: "Premium screen protection" },
  { name: "Fast Chargers", price: "Starts ₹299", icon: Zap, desc: "Original & high-quality cables" },
  { name: "Earphones", price: "Starts ₹149", icon: Headset, desc: "Wired & wireless audio" },
]

export default function AccessoriesPage() {
  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 mb-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Stock Catalog
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            Premium <br />
            <span className="text-muted-foreground/30">Gear.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            Complete protection and premium audio for your smartphone at the best prices in Mandi Gobindgarh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32">
          {categories.map((cat) => (
            <Card
              key={cat.name}
              className="overflow-hidden border-none shadow-none bg-secondary/30 rounded-[2rem] group hover:bg-secondary transition-all duration-500"
            >
              <CardContent className="p-8 md:p-10 text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
                  <cat.icon className="h-7 w-7" />
                </div>
                <h3 className="font-black uppercase tracking-tight text-lg md:text-xl mb-2">{cat.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-6">
                  {cat.desc}
                </p>
                <div className="inline-block px-6 py-2 rounded-full bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px]">
                  {cat.price}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary text-primary-foreground rounded-[2.5rem] md:rounded-[3.5rem] p-10 md:p-16 lg:p-24 overflow-hidden relative group">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl transition-transform duration-1000 group-hover:scale-110" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none mb-8">
                Latest <br />
                <span className="opacity-30">Inventory.</span>
              </h2>
              <p className="mb-10 opacity-70 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                We regularly update our stock with the latest back covers and audio tech. Visit our store to see the
                full monochrome collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="h-14 px-10 rounded-full bg-background text-primary hover:bg-background/90 font-black uppercase tracking-widest text-xs"
                  asChild
                >
                  <a href="tel:9878157109">
                    <Phone className="mr-2 h-4 w-4" />
                    Call for Stock
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="h-14 px-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none font-black uppercase tracking-widest text-xs"
                  asChild
                >
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[Smartphone, Package, Zap, Headset].map((Icon, i) => (
                <div
                  key={i}
                  className="aspect-square bg-white/5 rounded-[2rem] flex items-center justify-center p-8 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-12 w-12 opacity-30 group-hover:opacity-60 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
