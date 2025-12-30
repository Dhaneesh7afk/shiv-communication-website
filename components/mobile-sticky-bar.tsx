import { Phone, MessageSquare } from "lucide-react"

export function MobileStickyBar() {
  return (
    // <CHANGE> Better touch targets and visual hierarchy
    <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t bg-background md:hidden shadow-2xl shadow-black/10">
      <a
        href="tel:9878157109"
        className="flex flex-1 items-center justify-center space-x-2 py-4 bg-primary text-primary-foreground font-black text-sm uppercase tracking-wider"
      >
        <Phone className="h-5 w-5" />
        <span>Call Now</span>
      </a>
      <a
        href="https://wa.me/919878157109"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center space-x-2 py-4 bg-[#25D366] text-white font-black text-sm uppercase tracking-wider"
      >
        <MessageSquare className="h-5 w-5" />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}
