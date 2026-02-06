"use client"

import { useState } from "react"
import Link from "next/link"
import { ProductForm } from "@/components/admin/product-form"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function handleAddProduct(data: any) {
    try {
      setLoading(true)

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()

      toast({ title: "Product added successfully" })
    } catch {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="admin-surface p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Add Product</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/products/list">
              <Button variant="outline" className="rounded-full font-semibold tracking-wide text-xs admin-btn-outline">
                View Products
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <ProductForm onSubmit={handleAddProduct} isLoading={loading} />
    </div>
  )
}
