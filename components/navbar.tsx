import Link from "next/link"
import { Phone, MessageSquare, Menu, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/mobile-repair", label: "Repair" },
    { href: "/used-phones", label: "Used Phones" },
    { href: "/old-phone-buy-sell", label: "Sell Phone" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20">
            <Smartphone className="h-4 w-4 md:h-6 md:w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-xl font-bold tracking-tight leading-none">Shiv Communication</span>
            <span className="text-[16px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-0.5 md:mt-1">
              Mandi Gobindgarh
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold tracking-wide uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-all relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            size="sm"
            className="hidden lg:flex px-6 rounded-full shadow-lg shadow-primary/10"
            asChild
          >
            <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open Menu">
                <Menu className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  Shiv Communication
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-muted mx-7"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-2.5 ml-5 mr-5">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="tel:9878157109">
                      <Phone className="mr-2 h-4 w-4" />
                      Call: 9878157109
                    </a>
                  </Button>
                  <Button className="w-full justify-start bg-[#25D366] hover:bg-[#128C7E] text-white" asChild>
                    <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
