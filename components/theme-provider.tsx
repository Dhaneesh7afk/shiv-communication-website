"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: (next: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(next: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", next === "dark")
}

export function ThemeProvider({
  children,
  forcedTheme,
}: {
  children: React.ReactNode
  forcedTheme?: Theme
}) {
  const [theme, setThemeState] = useState<Theme>(forcedTheme ?? "light")

  useEffect(() => {
    if (forcedTheme) {
      setThemeState(forcedTheme)
      applyTheme(forcedTheme)
      return
    }
    const stored = window.localStorage.getItem("theme") as Theme | null
    if (stored === "light" || stored === "dark") {
      setThemeState(stored)
      applyTheme(stored)
      return
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const next = prefersDark ? "dark" : "light"
    setThemeState(next)
    applyTheme(next)
  }, [forcedTheme])

  const setTheme = (next: Theme) => {
    if (forcedTheme) return
    setThemeState(next)
    window.localStorage.setItem("theme", next)
    applyTheme(next)
  }

  const toggleTheme = () => {
    if (forcedTheme) return
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}
