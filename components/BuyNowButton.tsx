"use client"

import { useRouter } from "next/navigation"

export default function BuyNowButton({ productId }: { productId: string }) {
  const router = useRouter()

  const handleBuyNow = () => {
    router.push(`/checkout/buy-now/${productId}`)
  }

  return (
    <button
      className="h-12 rounded-full border border-border/60 bg-background/80 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-emerald-500/60"
      onClick={handleBuyNow}
    >
      Buy Now
    </button>
  )
}
