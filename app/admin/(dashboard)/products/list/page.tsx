"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface Product {
  _id: string
  title: string
  category: string
  price: number
  stock: number
  isActive: boolean
}

export default function AdminProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState("")
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const { toast } = useToast()

  async function fetchProducts() {
    const res = await fetch("/api/products", { cache: "no-store" })
    const data = await res.json()
    setProducts(data)
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" })

    if (res.ok) {
      setProducts((p) => p.filter((x) => x._id !== id))
      toast({ title: "Product deleted" })
    } else {
      toast({ title: "Delete failed", variant: "destructive" })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      `${product.title} ${product.category}`.toLowerCase().includes(query.toLowerCase())
    )
    return showActiveOnly ? filtered.filter((product) => product.isActive) : filtered
  }, [products, query, showActiveOnly])

  const stats = useMemo(() => {
    return {
      total: products.length,
      active: products.filter((product) => product.isActive).length,
      lowStock: products.filter((product) => product.stock <= 3).length,
    }
  }, [products])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black mb-2">Products</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Products", value: stats.total },
          { label: "Active Listings", value: stats.active },
          { label: "Low Stock", value: stats.lowStock },
        ].map((stat) => (
          <div key={stat.label} className="admin-stat">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">{stat.label}</p>
            <p className="mt-4 text-2xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="admin-surface p-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search products..."
              className="pl-9 rounded-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground">
            <input
              id="active-only"
              type="checkbox"
              checked={showActiveOnly}
              onChange={(e) => setShowActiveOnly(e.target.checked)}
              className="h-4 w-4 accent-emerald-500"
            />
            <label htmlFor="active-only">Active only</label>
          </div>
          <Button
            variant="outline"
            className="rounded-full font-semibold tracking-wide text-xs admin-btn-outline"
            onClick={fetchProducts}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <div className="space-y-4">
          {visibleProducts.map((p) => (
            <div
              key={p._id}
              className={`admin-list-item flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                p.stock <= 3 ? "border-amber-200 bg-amber-50/40" : ""
              } ${!p.isActive ? "opacity-70" : ""}`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{p.title}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-medium tracking-wide ${
                      p.isActive ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {p.isActive ? "Active" : "Hidden"}
                  </span>
                  {p.stock <= 3 && (
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-medium tracking-wide text-amber-700">
                      Low Stock
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  ₹{p.price} • Stock: {p.stock} • {p.category}
                </p>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/products/${p._id}`}>
                  <Button
                    variant="outline"
                    className="rounded-full font-semibold tracking-wide text-xs admin-btn-outline"
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  className="rounded-full font-semibold tracking-wide text-xs"
                  onClick={() => deleteProduct(p._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}

          {visibleProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed bg-secondary/10 p-10 text-center text-muted-foreground">
              No products match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
