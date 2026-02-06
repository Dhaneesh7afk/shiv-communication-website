"use client"

import { cn } from "@/lib/utils"

export function Spotlight({
  className,
  fill = "rgba(59, 130, 246, 0.1)",
}: {
  className?: string
  fill?: string
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl",
        className
      )}
      style={{
        background: `radial-gradient(closest-side, ${fill}, transparent 70%)`,
      }}
    />
  )
}
