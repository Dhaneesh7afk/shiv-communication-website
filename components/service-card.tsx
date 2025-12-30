import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

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
      <Card className="group flex flex-col h-full border-none shadow-none bg-transparent hover:bg-secondary/50 transition-all duration-500 rounded-2xl p-4">
        <CardHeader className="p-0 mb-6">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
            <Icon className="h-7 w-7" />
          </div>
          <CardTitle className="text-xl font-black uppercase tracking-tight leading-none group-hover:translate-x-1 transition-transform duration-500">
            {title}
          </CardTitle>
          <CardDescription className="text-sm mt-3 font-medium text-muted-foreground/70">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <ul className="space-y-2 mb-6">
            {details.map((detail, i) => (
              <li
                key={i}
                className="flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground"
              >
                <span className="mr-3 h-1 w-1 rounded-full bg-primary/30" />
                {detail}
              </li>
            ))}
          </ul>
          {footerText && (
            <div className="pt-4 border-t border-muted/50">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">{footerText}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
