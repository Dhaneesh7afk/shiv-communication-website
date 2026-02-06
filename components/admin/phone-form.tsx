"use client"

import { useEffect, useState } from "react"
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
import { Switch } from "@/components/ui/switch"

interface UsedPhone {
  _id?: string
  brand: string
  model: string
  storage: string
  condition: string
  price: number
  image?: string
  images?: string[]
  available: boolean
}

interface PhoneFormProps {
  phone?: UsedPhone
  onSubmit: (data: FormData) => void
  onCancel: () => void
  isLoading: boolean
}

export function PhoneForm({
  phone,
  onSubmit,
  onCancel,
  isLoading,
}: PhoneFormProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const { register, handleSubmit, setValue, watch } =
    useForm<Partial<UsedPhone>>({
      defaultValues: phone || {
        brand: "",
        model: "",
        storage: "",
        condition: "Excellent",
        price: 0,
        available: true,
      },
    })

  const available = watch("available")
  const condition = watch("condition")

  const submitHandler = (data: Partial<UsedPhone>) => {
    const formData = new FormData()

    formData.append("brand", data.brand || "")
    formData.append("model", data.model || "")
    formData.append("storage", data.storage || "")
    formData.append("condition", data.condition || "")
    formData.append("price", String(data.price || 0))
    formData.append("available", String(data.available))

    if (imageFiles.length) {
      imageFiles.forEach((file) => formData.append("images", file))
    }

    onSubmit(formData)
  }

  useEffect(() => {
    if (imageFiles.length) {
      const urls = imageFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls(urls)
      return () => urls.forEach((url) => URL.revokeObjectURL(url))
    }
    setPreviewUrls([])
  }, [imageFiles])

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      {/* Brand + Model */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="admin-surface-soft p-4 space-y-2">
          <Label>Brand</Label>
          <Input {...register("brand", { required: true })} placeholder="e.g. Apple" />
        </div>
        <div className="admin-surface-soft p-4 space-y-2">
          <Label>Model</Label>
          <Input {...register("model", { required: true })} placeholder="e.g. iPhone 15" />
        </div>
      </div>

      {/* Storage + Price */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="admin-surface-soft p-4 space-y-2">
          <Label>Storage</Label>
          <Input {...register("storage", { required: true })} placeholder="e.g. 128GB" />
        </div>
        <div className="admin-surface-soft p-4 space-y-2">
          <Label>Price (₹)</Label>
          <Input
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Condition */}
      <div className="admin-surface-soft p-4 space-y-2">
        <Label>Condition</Label>
        <Select
          value={condition}
          onValueChange={(value) => setValue("condition", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            {["Mint", "Excellent", "Good", "Fair", "Average"].map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Image Upload */}
      <div className="admin-surface-soft p-4 space-y-2">
        <Label>Phone Images</Label>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files?.length) {
              setImageFiles(Array.from(e.target.files))
            }
          }}
        />
        {(previewUrls.length || phone?.images?.length || phone?.image) && (
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
            {previewUrls.length > 0
              ? previewUrls.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Phone preview"
                    className="h-24 w-full rounded-2xl object-cover border"
                  />
                ))
              : (phone?.images?.length ? phone.images : phone?.image ? [phone.image] : []).map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Phone preview"
                    className="h-24 w-full rounded-2xl object-cover border"
                  />
                ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="admin-surface-soft flex items-center justify-between px-4 py-3">
        <div>
          <Label>Available for sale</Label>
        </div>
        <Switch
          checked={available}
          onCheckedChange={(checked) => setValue("available", checked)}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-full font-black tracking-wide text-xs admin-btn-outline"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-full font-black tracking-wide text-xs admin-btn-primary"
        >
          {isLoading ? "Saving..." : phone ? "Update Phone" : "Add Phone"}
        </Button>
      </div>
    </form>
  )
}
