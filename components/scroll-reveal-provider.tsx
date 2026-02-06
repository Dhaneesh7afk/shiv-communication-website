"use client"

import { useEffect, useRef } from "react"

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = new Set<HTMLElement>()

    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => targets.add(el))
    root.querySelectorAll<HTMLElement>("section, article").forEach((el) => targets.add(el))

    root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      Array.from(group.children).forEach((child) => {
        if (child instanceof HTMLElement) targets.add(child)
      })
    })

    if (targets.size === 0) {
      Array.from(root.children).forEach((child) => {
        if (child instanceof HTMLElement) targets.add(child)
      })
    }

    const revealNow = (el: HTMLElement) => {
      el.classList.add("scroll-reveal")
      if (prefersReduced) {
        el.classList.add("scroll-reveal-visible")
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("scroll-reveal-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2 }
    )

    let index = 0
    targets.forEach((el) => {
      if (!el.isConnected) return
      revealNow(el)
      if (!prefersReduced) {
        el.style.transitionDelay = `${Math.min(index * 60, 240)}ms`
        observer.observe(el)
        index += 1
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={rootRef} data-reveal-group>
      {children}
    </div>
  )
}
