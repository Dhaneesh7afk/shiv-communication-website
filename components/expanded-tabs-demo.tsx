"use client"

import { useRouter } from "next/navigation"
import { Banknote, Home, MapPin, ShoppingBag, Smartphone, User, Wrench } from "lucide-react"
import { ExpandedTabs } from "@/components/ui/expanded-tabs"

export function MobileTabs() {
  const router = useRouter()

  const tabs = [
    { title: "Home", icon: Home },
    { title: "Repair", icon: Wrench },
    { title: "Shop", icon: ShoppingBag },
    { title: "Used", icon: Smartphone },
    { title: "Sell", icon: Banknote },
    { title: "Contact", icon: MapPin },
    { title: "Profile", icon: User },
  ]

  const routes = ["/", "/mobile-repair", "/shop", "/used-phones", "/old-phone-buy-sell", "/contact", "/account"]

  return (
    <div className="flex items-center justify-center">
      <ExpandedTabs
        tabs={tabs}
        className="bg-background/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
        onChange={(index) => {
          if (index === null) return
          const route = routes[index]
          if (route) router.push(route)
        }}
      />
    </div>
  )
}
