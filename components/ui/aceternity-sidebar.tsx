"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within <Sidebar />")
  }
  return context
}

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean
  setOpen: (open: boolean) => void
  hoverExpand?: boolean
}

export function Sidebar({
  open,
  setOpen,
  hoverExpand = true,
  className,
  children,
  ...props
}: SidebarProps) {
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 opacity-0 transition-opacity md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        onMouseEnter={hoverExpand ? () => setOpen(true) : undefined}
        onMouseLeave={hoverExpand ? () => setOpen(false) : undefined}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-svh flex-col border-r border-slate-200/70 bg-white/95 text-slate-900 shadow-lg backdrop-blur transition-[width,transform] duration-300",
          open ? "w-64 translate-x-0" : "w-16 -translate-x-full md:translate-x-0",
          "md:w-16 md:hover:w-64",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

type SidebarBodyProps = React.HTMLAttributes<HTMLDivElement>

export function SidebarBody({ className, ...props }: SidebarBodyProps) {
  return (
    <div className={cn("flex h-full flex-col", className)} {...props} />
  )
}

type SidebarLinkItem = {
  label: string
  href: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
}

type SidebarLinkProps = {
  link: SidebarLinkItem
  className?: string
}

export function SidebarLink({ link, className }: SidebarLinkProps) {
  const { open, setOpen } = useSidebar()

  const baseClasses =
    "group flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold transition-all"
  const activeClasses = link.active
    ? "bg-emerald-500/10 text-emerald-700 shadow-[0_12px_30px_-20px_rgba(16,185,129,0.6)]"
    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"

  const handleClick = () => {
    link.onClick?.()
    if (typeof window !== "undefined") {
      const isMobile = window.matchMedia("(max-width: 767px)").matches
      if (isMobile) setOpen(false)
    }
  }

  const content = (
    <>
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl border transition-all",
          link.active
            ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-600"
            : "border-slate-200/80 bg-white text-slate-500"
        )}
      >
        {link.icon}
      </span>
      <span
        className={cn(
          "truncate text-sm font-medium transition-all duration-300",
          open ? "opacity-100" : "w-0 opacity-0"
        )}
      >
        {link.label}
      </span>
    </>
  )

  if (link.href === "#") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(baseClasses, activeClasses, "w-full text-left", className)}
      >
        {content}
      </button>
    )
  }

  return (
    <Link href={link.href} onClick={handleClick} className={cn(baseClasses, activeClasses, className)}>
      {content}
    </Link>
  )
}
