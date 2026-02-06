"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface Product {
  title: string
  category: "mobile-accessories" | "pc-accessories" | "gadgets"
  price: number
  stock: number
  description?: string
  images?: string[]
  isActive: boolean
}

const CATEGORY_LABELS: Record<Product["category"], string> = {
  "mobile-accessories": "Mobile Accessories",
  "pc-accessories": "PC Accessories",
  gadgets: "Gadgets",
}

export function ProductForm({
  onSubmit,
  isLoading,
  initialData,
  submitLabel = "Add Product",
  successTitle = "Product saved successfully",
  showSuccessScreen = true,
}: {
  onSubmit: (data: Product) => Promise<void> | void
  isLoading: boolean
  initialData?: Partial<Product>
  submitLabel?: string
  successTitle?: string
  showSuccessScreen?: boolean
}) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true)

  const { register, handleSubmit, setValue, reset, watch } = useForm<Product>({
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || "mobile-accessories",
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      description: initialData?.description || "",
      images: initialData?.images || [],
      isActive: initialData?.isActive ?? true,
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        category: initialData.category || "mobile-accessories",
        price: initialData.price || 0,
        stock: initialData.stock || 0,
        description: initialData.description || "",
        images: initialData.images || [],
        isActive: initialData.isActive ?? true,
      })
      setIsActive(initialData.isActive ?? true)
    }
  }, [initialData, reset])

  useEffect(() => {
    if (!savedAt) return
    const timer = setTimeout(() => setSavedAt(null), 3000)
    return () => clearTimeout(timer)
  }, [savedAt])

  async function handleFinalSubmit(data: Product) {
    data.isActive = isActive
    await onSubmit(data)
    if (showSuccessScreen) {
      setSuccess(true)
    } else {
      setSavedAt(Date.now())
    }
  }

  const title = watch("title")
  const category = watch("category")
  const price = watch("price")
  const stock = watch("stock")
  const description = watch("description")
  const images = watch("images") || []

  const currency = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }),
    []
  )

  const savedLabel = savedAt
    ? new Date(savedAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not saved"

  if (success) {
    return (
      <div className="admin-surface p-6 md:p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 text-xl">
            ✓
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">{successTitle}</h2>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            className="rounded-full font-black tracking-wide text-xs admin-btn-primary"
            onClick={() => {
              reset()
              setSuccess(false)
            }}
          >
            Add Another Product
          </Button>

          <Button
            variant="outline"
            className="rounded-full font-black tracking-wide text-xs admin-btn-outline"
            onClick={() => router.push("/admin/products/list")}
          >
            Go to Product List
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.35fr,0.65fr]">
        <div className="space-y-6">
          <section className="admin-surface p-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Product Details</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label>Product Name</Label>
                <Input
                  {...register("title", { required: true })}
                  placeholder="e.g., Apple USB-C Charger"
                />
              </div>

              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  defaultValue={initialData?.category || "mobile-accessories"}
                  onValueChange={(v) => setValue("category", v as Product["category"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile-accessories">Mobile Accessories</SelectItem>
                    <SelectItem value="pc-accessories">PC Accessories</SelectItem>
                    <SelectItem value="gadgets">Gadgets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="admin-surface p-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Pricing</h2>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label>Price (₹)</Label>
                <Input type="number" {...register("price", { valueAsNumber: true })} />
              </div>

              <div className="grid gap-2">
                <Label>Stock</Label>
                <Input type="number" {...register("stock", { valueAsNumber: true })} />
              </div>
            </div>
          </section>

          <section className="admin-surface p-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Description</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea rows={4} {...register("description")} placeholder="Add product description" />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3">
              <div>
                <Label>Active Listing</Label>
              </div>
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => {
                  setIsActive(checked)
                  setValue("isActive", checked)
                }}
              />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="admin-surface p-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Images</h2>
            </div>

            <div className="mt-5 grid gap-3">
              <Input
                type="file"
                multiple
                accept="image/*"
                disabled={uploading}
                onChange={async (e) => {
                  if (!e.target.files) return

                  setUploading(true)

                  const formData = new FormData()
                  Array.from(e.target.files).forEach((file) => formData.append("images", file))

                  const res = await fetch("/api/products/upload", {
                    method: "POST",
                    body: formData,
                  })

                  const data = await res.json()

                  if (res.ok) {
                    setValue("images", data.images)
                  }

                  setUploading(false)
                }}
              />

              {uploading && <p className="text-xs text-slate-500">Uploading images...</p>}
              {!uploading && images.length === 0 && (
                <p className="text-xs text-slate-500">No images uploaded.</p>
              )}
              {images.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {images.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt="Uploaded"
                      className="h-20 w-full rounded-xl object-cover border border-slate-200/80"
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="admin-surface p-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Preview</h2>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/80 p-4">
              <p className="text-sm font-semibold text-slate-900">{title || "Untitled product"}</p>
              <p className="text-xs text-slate-500">{CATEGORY_LABELS[category]}</p>
              <p className="mt-3 text-2xl font-black text-slate-900">
                {price ? currency.format(price) : "Set price"}
              </p>
              <p className="text-xs text-slate-500">{stock || 0} in stock</p>
              {description && (
                <p className="mt-3 text-xs text-slate-500 line-clamp-3">{description}</p>
              )}
            </div>

            <div className="mt-4 grid gap-2 text-xs text-slate-500">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="font-semibold text-slate-700">{isActive ? "Active" : "Hidden"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Images</span>
                <span className="font-semibold text-slate-700">{images.length} uploaded</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last saved</span>
                <span className="font-semibold text-slate-700">{savedLabel}</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Button
          type="submit"
          disabled={isLoading || uploading}
          className="rounded-full font-black tracking-wide text-xs admin-btn-primary"
        >
          {isLoading ? "Saving..." : submitLabel}
        </Button>
        {!showSuccessScreen && savedAt && (
          <p className="text-xs font-bold tracking-wide text-blue-600">Saved just now</p>
        )}
      </div>
    </form>
  )
}
