"use client"

import { cn } from "@/lib/utils"

export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {children}
    </div>
  )
}

export function BentoGridItem({
  className,
  title,
  description,
  icon,
}: {
  className?: string
  title: string
  description: string
  icon?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "group rounded-3xl border bg-background/70 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      {icon && (
        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
      )}
      <h3 className="mt-6 text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 h-1 w-12 rounded-full bg-primary/60 transition-all group-hover:w-20" />
    </div>
  )
}
