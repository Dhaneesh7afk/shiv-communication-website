"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ProductForm } from "@/components/admin/product-form"

interface Product {
  _id: string
  title: string
  category: "mobile-accessories" | "pc-accessories" | "gadgets"
  price: number
  stock: number
  description?: string
  images?: string[]
  isActive: boolean
}

export default function ProductEditClient({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadProduct = async () => {
      const res = await fetch(`/api/products/${productId}`, { cache: "no-store" })
      if (!res.ok) {
        toast({ title: "Error", description: "Failed to load product", variant: "destructive" })
        setLoading(false)
        return
      }
      const data = await res.json()
      setProduct(data)
      setLoading(false)
    }
    loadProduct()
  }, [productId, toast])

  const handleUpdate = async (data: Product) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      toast({ title: "Error", description: "Failed to update product", variant: "destructive" })
      return
    }
    toast({ title: "Product updated successfully" })
  }

  if (loading) {
    return (
      <div className="admin-surface p-8">
        <p className="text-sm text-muted-foreground">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="rounded-[2.5rem] border border-dashed bg-secondary/10 p-8 text-center text-muted-foreground">
        Product not found.
      </div>
    )
  }

  return (
    <div className="max-w-2xl admin-surface p-8">
      <ProductForm
        onSubmit={handleUpdate}
        isLoading={false}
        initialData={product}
        submitLabel="Update Product"
        successTitle="✅ Product updated successfully"
        showSuccessScreen={false}
      />
    </div>
  )
}
