"use client"

import Link from "next/link"
import {
  Banknote,
  Home,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  User,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCart } from "@/context/CartContext"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { cart } = useCart()

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/mobile-repair", label: "Repair", icon: Wrench },
    { href: "/used-phones", label: "Used", icon: Smartphone },
    { href: "/old-phone-buy-sell", label: "Sell", icon: Banknote },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/contact", label: "Contact", icon: MapPin },
  ]

  return (
    <header className="fixed top-0 z-50 hidden w-full md:block">
      <div className="mx-auto flex w-full items-center justify-center px-2 md:px-4">
        <div
          className={`flex h-11 w-full min-w-0 items-center justify-between rounded-full border border-border/50 bg-background/70 px-3 backdrop-blur-xl transition-all duration-300 md:h-12 md:max-w-[min(92vw,48rem)] ${
            isScrolled ? "shadow-[0_20px_50px_-40px_rgba(15,23,42,0.7)]" : ""
          }`}
        >
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/70">
              <Smartphone className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-6" />
            </span>
          </Link>

          <div className="hidden md:flex lg:hidden flex-1 min-w-0 items-center justify-center">
            <span className="typewriter text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-foreground/70">
              Shiv Communication
            </span>
          </div>

          <nav className="hidden min-w-0 lg:flex items-center gap-1 rounded-full border border-border/50 bg-background/60 px-1 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3 py-2 transition-all ${
                  pathname === link.href
                    ? "text-foreground bg-muted/60"
                    : "hover:text-foreground hover:bg-muted/40"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-1/2 -bottom-1 h-px -translate-x-1/2 bg-foreground/60 transition-all duration-300 ${
                    pathname === link.href ? "w-8" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="border border-border/50 bg-background/70" />
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/70 hover:bg-muted/60 transition-colors"
            >
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/70 hover:bg-muted/60 transition-colors"
            >
              {session?.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="Profile" className="h-full w-full rounded-full object-cover" />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[420px] p-0 border-l-0">
                <div className="flex h-full flex-col bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_45%)]">
                  <SheetHeader className="p-6 border-b border-border/60 bg-background/80 backdrop-blur">
                    <SheetTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-background/80">
                          <Smartphone className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-base font-semibold">Shiv Communication</p>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Open Today · 09:00 - 20:30
                          </p>
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/70">
                        {session?.user?.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={session.user.image} alt="Profile" className="h-full w-full rounded-full object-cover" />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <div className="rounded-[2rem] border border-border/60 bg-background/80 p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Quick actions
                        </p>
                        <ThemeToggle className="h-9 w-9 rounded-full border border-border/60 bg-background/70" />
                      </div>
                      <div className="mt-4 grid gap-3">
                        <Button variant="outline" className="h-11 justify-start rounded-full" asChild>
                          <a href="tel:9878157109">
                            <Phone className="mr-2 h-4 w-4" />
                            Call: 9878157109
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Navigate
                      </p>
                      <div className="grid gap-2">
                        <SheetClose asChild>
                          <Link
                            href="/account"
                            className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/40"
                          >
                            <User className="h-4 w-4 text-foreground" />
                            Account
                          </Link>
                        </SheetClose>
                        {navLinks.map((link) => {
                          const Icon = link.icon
                          return (
                            <SheetClose key={link.href} asChild>
                              <Link
                                href={link.href}
                                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                                  pathname === link.href
                                    ? "border-foreground/40 bg-muted/60 text-foreground"
                                    : "border-border/60 bg-background/80 text-foreground hover:border-foreground/40"
                                }`}
                              >
                                <Icon className="h-4 w-4 text-foreground" />
                                {link.label}
                              </Link>
                            </SheetClose>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-border/60 bg-background/80 backdrop-blur">
                    <div className="rounded-[2rem] border border-border/60 bg-background/70 p-4 text-xs text-muted-foreground">
                      Need fast support? Call and we will respond quickly.
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
