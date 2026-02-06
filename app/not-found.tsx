import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[320px] w-[640px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[260px] w-[420px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>
      <div className="max-w-xl w-full text-center cta-glass p-10">
        <h1 className="text-6xl font-black text-primary mb-3">404</h1>
        <h2 className="text-2xl font-black mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you are looking for might have been moved or does not exist. Let&apos;s get you back to our services.
        </p>
        <Button asChild className="rounded-full font-black tracking-wide text-xs px-6 py-4">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
