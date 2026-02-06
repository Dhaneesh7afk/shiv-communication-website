"use client"

import { cn } from "@/lib/utils"

export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 [background-size:56px_56px] [background-image:linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top,black_35%,transparent_70%)]",
        className
      )}
    />
  )
}
