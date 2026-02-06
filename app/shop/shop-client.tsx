"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  _id: string
  title: string
  slug: string
  category: string
  price: number
  stock: number
  images?: string[]
  description?: string
}

export default function ShopClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [availabilityFilter, setAvailabilityFilter] = useState("All")
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    let active = true

    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) {
          throw new Error("Failed to load products.")
        }
        const data = await res.json()
        if (!active) return
        setProducts(data)
      } catch (err) {
        if (!active) return
        setError("Unable to load products right now. Please try again.")
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      active = false
    }
  }, [])

  const categories = useMemo(() => {
    const values = Array.from(new Set(products.map((product) => product.category).filter(Boolean)))
    return ["All", ...values.sort()]
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (query.trim()) {
      const term = query.toLowerCase()
      filtered = filtered.filter((product) =>
        `${product.title} ${product.category} ${product.description ?? ""}`
          .toLowerCase()
          .includes(term)
      )
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    if (availabilityFilter === "In Stock") {
      filtered = filtered.filter((product) => product.stock > 0)
    }

    if (availabilityFilter === "Out of Stock") {
      filtered = filtered.filter((product) => product.stock <= 0)
    }

    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    }

    if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    return filtered
  }, [products, query, categoryFilter, availabilityFilter, sortBy])

  const isFiltered =
    query.trim().length > 0 ||
    categoryFilter !== "All" ||
    availabilityFilter !== "All" ||
    sortBy !== "featured"

  const quickCategories = categories.slice(1, 5)

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
              placeholder="Search by product name or category"
              className="h-12 w-full rounded-full border border-border/60 bg-background/70 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Search accessories"
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:w-auto lg:grid-cols-3">
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="h-12 rounded-full border border-border/60 bg-background/70 px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={availabilityFilter}
              onChange={(event) => setAvailabilityFilter(event.target.value)}
              className="h-12 rounded-full border border-border/60 bg-background/70 px-4 text-sm text-foreground shadow-sm outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Filter by availability"
            >
              <option value="All">All Stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
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
              ? "Loading catalog..."
              : `Showing ${filteredProducts.length} of ${products.length} items`}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {quickCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryFilter(category)}
                className={`rounded-full border px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${
                  categoryFilter === category
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "border-border/60 bg-background/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
            {isFiltered && (
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  setCategoryFilter("All")
                  setAvailabilityFilter("All")
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {!loading && !error && products.length === 0 && (
        <div className="rounded-[2rem] border border-dashed border-border/60 bg-secondary/10 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            No products available right now. Please check back soon.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && filteredProducts.length === 0 && (
        <div className="rounded-[2rem] border border-dashed border-border/60 bg-secondary/10 px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            No products match those filters. Try clearing or adjusting them.
          </p>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug}`}
              prefetch
              scroll={false}
              className="group relative flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-border/60 bg-background/80 p-5 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.6)] transition duration-500 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_40px_90px_-55px_rgba(15,23,42,0.7)] md:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-muted/40">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-x-4 top-4 flex flex-wrap items-center gap-2">
                    <span className="min-w-0 max-w-[60%] truncate rounded-full border border-slate-200/80 bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-sm">
                      {(product.category || "Accessory")
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </span>
                    <span
                      className={`ml-auto whitespace-nowrap rounded-full border border-border/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                        product.stock > 0
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "bg-red-500/10 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3
                    className="text-lg font-semibold tracking-tight text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Verified fit and fast pickup available.
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-4">
                {product.stock > 0 ? (
                  <Button className="h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]" tabIndex={-1}>
                    View Product
                  </Button>
                ) : (
                  <Button className="h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]" disabled tabIndex={-1}>
                    Out of Stock
                  </Button>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
