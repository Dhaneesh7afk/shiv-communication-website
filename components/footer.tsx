import Link from "next/link"
import { Phone, MapPin, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t bg-background pt-16 md:pt-24 pb-24 md:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:gap-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6 md:space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                <Smartphone className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none uppercase">Shiv Communication</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-1">
                  Mandi Gobindgarh
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs">
              Mandi Gobindgarh&apos;s leading technical lab. Engineering professional repairs and digital convenience
              since inception.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mb-6 md:mb-8">Capabilities</h4>
            <ul className="space-y-3 md:space-y-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
              <li>
                <Link href="/mobile-repair" className="hover:text-primary transition-colors">
                  Mobile Repair
                </Link>
              </li>
              <li>
                <Link href="/computer-services" className="hover:text-primary transition-colors">
                  Computer Services
                </Link>
              </li>
              <li>
                <Link href="/recharge-bill-payments" className="hover:text-primary transition-colors">
                  Recharge & Bills
                </Link>
              </li>
              <li>
                <Link href="/money-transfer" className="hover:text-primary transition-colors">
                  Money Transfer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mb-6 md:mb-8">Access</h4>
            <ul className="space-y-3 md:space-y-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
              <li>
                <Link href="/used-phones" className="hover:text-primary transition-colors">
                  Stock Catalog
                </Link>
              </li>
              <li>
                <Link href="/old-phone-buy-sell" className="hover:text-primary transition-colors">
                  Sell Device
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Location
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mb-6 md:mb-8">Direct Contact</h4>
            <div className="space-y-3 md:space-y-4 text-sm md:text-sm font-bold">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                <span className="leading-tight uppercase tracking-tight">
                  Mandi Gobindgarh, <br /> Punjab, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:9878157109" className="hover:text-primary tracking-tighter">
                  98781 57109
                </a>
              </div>
            </div>
            <div className="mt-8 md:mt-10">
              <Button
                size="sm"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white w-full rounded-full h-11 md:h-12 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[#25D366]/10"
                asChild
              >
                <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                  Connect on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-16 md:mt-24 border-t pt-8 md:pt-12 text-center text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
          © {new Date().getFullYear()} Shiv Communication
        </div>
      </div>
    </footer>
  )
}
