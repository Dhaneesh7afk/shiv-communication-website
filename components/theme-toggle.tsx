"use client"

import { motion } from "framer-motion"
import { useCallback } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

const styleId = "theme-transition-styles"

function updateStyles(css: string) {
  if (typeof window === "undefined") return
  let styleElement = document.getElementById(styleId) as HTMLStyleElement | null
  if (!styleElement) {
    styleElement = document.createElement("style")
    styleElement.id = styleId
    document.head.appendChild(styleElement)
  }
  styleElement.textContent = css
}

function createAnimation() {
  return `
    ::view-transition-group(root) {
      animation-duration: 0.75s;
      animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    }

    ::view-transition-new(root) {
      animation-name: reveal-light;
    }

    ::view-transition-old(root),
    .dark::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }

    .dark::view-transition-new(root) {
      animation-name: reveal-dark;
    }

    @keyframes reveal-dark {
      from {
        clip-path: circle(0% at 50% 50%);
      }
      to {
        clip-path: circle(110% at 50% 50%);
      }
    }

    @keyframes reveal-light {
      from {
        clip-path: circle(0% at 50% 50%);
      }
      to {
        clip-path: circle(110% at 50% 50%);
      }
    }
  `
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const toggleTheme = useCallback(() => {
    const next = isDark ? "light" : "dark"
    updateStyles(createAnimation())

    if (typeof document === "undefined") return
    const switchTheme = () => setTheme(next)

    if (!document.startViewTransition) {
      switchTheme()
      return
    }

    document.startViewTransition(switchTheme)
  }, [isDark, setTheme])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-background/70 shadow-sm transition active:scale-95",
        className
      )}
    >
      <span className="sr-only">Toggle theme</span>
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
        <motion.g animate={{ rotate: isDark ? -180 : 0 }} transition={{ ease: "easeInOut", duration: 0.5 }}>
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill="white"
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill="black"
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="white"
        />
      </svg>
    </button>
  )
}
