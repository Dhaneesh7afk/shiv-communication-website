"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import {
  Banknote,
  ChevronDown,
  Clock,
  CreditCard,
  ShieldCheck,
  Smartphone,
} from "lucide-react"

const items = [
  {
    id: "repair-time",
    icon: Clock,
    title: "How long does mobile repair take?",
    content: "Most common repairs like screen and battery replacements are completed within 30-60 minutes.",
  },
  {
    id: "emi",
    icon: CreditCard,
    title: "Do you support EMI payments?",
    content: "Yes, we support EMI payments for various finance companies and consumer loans.",
  },
  {
    id: "sell-phone",
    icon: Smartphone,
    title: "Can I sell my old phone here?",
    content: "Yes. You can use our WhatsApp form to get a quick quote and walk in for verification.",
  },
  {
    id: "bill-payments",
    icon: Banknote,
    title: "Do you handle all bill payments?",
    content: "We handle electricity, water, gas, mobile, and DTH recharges for major providers.",
  },
  {
    id: "money-transfer",
    icon: ShieldCheck,
    title: "Is money transfer safe?",
    content: "Absolutely. We use secure, bank-authorized channels for all domestic money transfers.",
  },
]

export function FaqBouncy() {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="w-full space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id
        const Icon = item.icon

        return (
          <motion.div
            key={item.id}
            layout
            transition={{ layout: { type: "spring", bounce: 0.35, duration: 0.75 } }}
            className={`rounded-2xl border px-4 transition-colors ${
              isOpen
                ? "border-transparent bg-background shadow-[0_18px_45px_-35px_rgba(15,23,42,0.6)]"
                : "border-border/60 bg-background/80"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm md:text-[15px] font-semibold"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/70 text-foreground/80">
                  <Icon className="h-4 w-4" />
                </span>
                {item.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/60 text-foreground/70"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.7 }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pl-11 pr-2 text-sm text-muted-foreground/90">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
