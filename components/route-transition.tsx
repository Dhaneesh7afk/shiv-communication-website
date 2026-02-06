"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export function RouteTransition() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)
  const [mounted, setMounted] = useState(false)
  const firstLoad = useRef(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (firstLoad.current) {
      firstLoad.current = false
      return
    }

    setActive(true)
    const timeout = window.setTimeout(() => setActive(false), 700)
    return () => window.clearTimeout(timeout)
  }, [pathname, mounted])

  if (!mounted) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_55%)]" />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,23,42,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="absolute left-0 right-0 top-1/2 h-px bg-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.45)] animate-pulse" />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border border-emerald-500/30" />
          <div className="absolute inset-2 rounded-full border border-emerald-500/50 animate-spin" />
          <div className="absolute inset-5 rounded-full bg-emerald-500/20" />
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Syncing
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Shiv Communication · Loading
      </div>
    </div>
  )
}
