"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { PhoneCard } from "@/components/phone-card"

interface UsedPhone {
  _id: string
  brand: string
  model: string
  storage: string
  condition: string
  price: number
  image?: string
  images?: string[]
  available: boolean
}

export default function UsedPhonesClient() {
  const [phones, setPhones] = useState<UsedPhone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [brandFilter, setBrandFilter] = useState("All")
  const [conditionFilter, setConditionFilter] = useState("All")
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    let active = true

    const loadPhones = async () => {
      try {
        const res = await fetch("/api/phones")
        if (!res.ok) {
          throw new Error("Failed to load phones.")
        }
        const data = await res.json()
        if (!active) return
        setPhones(data.filter((p: UsedPhone) => p.available))
      } catch (err) {
        if (!active) return
        setError("Unable to load inventory right now. Please try again.")
      } finally {
        if (active) setLoading(false)
      }
    }

    loadPhones()

    return () => {
      active = false
    }
  }, [])

  const brands = useMemo(() => {
    const values = Array.from(new Set(phones.map((phone) => phone.brand).filter(Boolean)))
    return ["All", ...values.sort()]
  }, [phones])

  const conditions = useMemo(() => {
    const values = Array.from(new Set(phones.map((phone) => phone.condition).filter(Boolean)))
    return ["All", ...values.sort()]
  }, [phones])

  const filteredPhones = useMemo(() => {
    let filtered = phones

    if (query.trim()) {
      const term = query.toLowerCase()
      filtered = filtered.filter((phone) =>
        `${phone.brand} ${phone.model} ${phone.storage}`.toLowerCase().includes(term)
      )
    }

    if (brandFilter !== "All") {
      filtered = filtered.filter((phone) => phone.brand === brandFilter)
    }

    if (conditionFilter !== "All") {
      filtered = filtered.filter((phone) => phone.condition === conditionFilter)
    }

    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    }

    if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [phones, query, brandFilter, conditionFilter, sortBy])

  const isFiltered =
    query.trim().length > 0 || brandFilter !== "All" || conditionFilter !== "All" || sortBy !== "featured"

  const quickBrands = brands.slice(1, 5)

  return (
    <div className="space-y-6">
      <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by brand, model, or storage"
              className="h-12 w-full rounded-full border border-border/60 bg-background/70 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Search used phones"
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 lg:w-auto lg:grid-cols-3">
            <select
              value={brandFilter}
              onChange={(event) => setBrandFilter(event.target.value)}
              className="h-12 rounded-full border border-border/60 bg-background/70 px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Filter by brand"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select
              value={conditionFilter}
              onChange={(event) => setConditionFilter(event.target.value)}
              className="h-12 rounded-full border border-border/60 bg-background/70 px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Filter by condition"
            >
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-12 rounded-full border border-border/60 bg-background/70 px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Sort by"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {loading
              ? "Loading inventory..."
              : `Showing ${filteredPhones.length} of ${phones.length} devices`}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {quickBrands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setBrandFilter(brand)}
                className={`rounded-full border px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${
                  brandFilter === brand
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "border-border/60 bg-background/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                {brand}
              </button>
            ))}
            {isFiltered && (
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  setBrandFilter("All")
                  setConditionFilter("All")
                  setSortBy("featured")
                }}
                className="rounded-full border border-border/60 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[420px] rounded-[2rem] bg-secondary/40 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-[2rem] border border-dashed border-border/60 bg-secondary/10 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      )}

      {!loading && !error && phones.length === 0 && (
        <div className="rounded-[2rem] border border-dashed border-border/60 bg-secondary/10 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">No used phones currently in stock.</p>
        </div>
      )}

      {!loading && !error && phones.length > 0 && filteredPhones.length === 0 && (
        <div className="rounded-[2rem] border border-dashed border-border/60 bg-secondary/10 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            No phones match those filters. Try clearing or adjusting them.
          </p>
        </div>
      )}

      {!loading && !error && filteredPhones.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPhones.map((phone) => (
            <PhoneCard key={phone._id} phone={phone} />
          ))}
        </div>
      )}
    </div>
  )
}
