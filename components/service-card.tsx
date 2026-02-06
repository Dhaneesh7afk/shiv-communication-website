import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  details: string[]
  icon: LucideIcon
  footerText?: string
  href: string
}

export function ServiceCard({ title, description, details, icon: Icon, footerText, href }: ServiceCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-border/60 bg-background/80 p-6 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.6)] transition duration-500 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_40px_90px_-55px_rgba(15,23,42,0.7)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
        <CardHeader className="relative z-10 p-0 mb-6">
          <div className="flex items-start justify-between">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <Icon className="h-6 w-6" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition duration-300 group-hover:-rotate-45 group-hover:text-emerald-600" />
          </div>
          <CardTitle className="mt-5 text-xl font-semibold tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </CardTitle>
          <CardDescription className="text-sm mt-3 font-medium text-muted-foreground/80 leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 p-0 flex-1">
          <ul className="space-y-3 mb-6">
            {details.map((detail) => (
              <li
                key={detail}
                className="flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
              >
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-emerald-500/40" />
                {detail}
              </li>
            ))}
          </ul>
          {footerText && (
            <div className="pt-4 border-t border-border/60">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                {footerText}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
