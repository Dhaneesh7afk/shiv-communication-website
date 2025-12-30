"use client"

import { useState } from "react"
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
  const [imageFile, setImageFile] = useState<File | null>(null)

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

    if (imageFile) {
      formData.append("image", imageFile)
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {/* Brand + Model */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Brand</Label>
          <Input {...register("brand", { required: true })} placeholder="e.g. Apple" />
        </div>
        <div className="space-y-2">
          <Label>Model</Label>
          <Input {...register("model", { required: true })} placeholder="e.g. iPhone 15" />
        </div>
      </div>

      {/* Storage + Price */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Storage</Label>
          <Input {...register("storage", { required: true })} placeholder="e.g. 128GB" />
        </div>
        <div className="space-y-2">
          <Label>Price (₹)</Label>
          <Input
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-2">
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
      <div className="space-y-2">
        <Label>Phone Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImageFile(e.target.files[0])
            }
          }}
        />
      </div>

      {/* Availability */}
      <div className="flex items-center space-x-2">
        <Switch
          checked={available}
          onCheckedChange={(checked) => setValue("available", checked)}
        />
        <Label>Available for sale</Label>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : phone ? "Update Phone" : "Add Phone"}
        </Button>
      </div>
    </form>
  )
}
