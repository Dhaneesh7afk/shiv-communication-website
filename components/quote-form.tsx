"use client"

import type React from "react"
import { Smartphone } from "lucide-react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function QuoteForm() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    storage: "",
    condition: "",
    whatsapp: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hello Shiv Communication, I want a price quote for my old phone:%0A- Brand: ${formData.brand}%0A- Model: ${formData.model}%0A- Storage: ${formData.storage}%0A- Condition: ${formData.condition}%0A- My WhatsApp: ${formData.whatsapp}`
    window.open(`https://wa.me/919878157109?text=${message}`, "_blank")
  }

  if (!mounted) {
    return (
      <Card className="w-full max-w-md mx-auto rounded-[2.75rem] border border-border/60 bg-background/80 shadow-xl">
        <CardHeader className="p-8 pb-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 mb-4">
            <Smartphone className="h-6 w-6" />
          </div>
          <CardTitle className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Get a quote in seconds
          </CardTitle>
          <CardDescription className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mt-4">
            Share details to receive an instant valuation via WhatsApp.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <div className="space-y-4 animate-pulse">
            <div className="h-12 rounded-full bg-muted/40" />
            <div className="h-12 rounded-full bg-muted/40" />
            <div className="h-12 rounded-full bg-muted/40" />
            <div className="h-12 rounded-full bg-muted/40" />
            <div className="h-12 rounded-full bg-muted/40" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto rounded-[2.75rem] border border-border/60 bg-background/80 shadow-xl">
      <CardHeader className="p-8 pb-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 mb-4">
          <Smartphone className="h-6 w-6" />
        </div>
        <CardTitle className="text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Get a quote in seconds
        </CardTitle>
        <CardDescription className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mt-4">
          Share details to receive an instant valuation via WhatsApp.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="brand" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Brand
            </Label>
            <Select onValueChange={(v) => setFormData((prev) => ({ ...prev, brand: v }))} required>
              <SelectTrigger id="brand" className="h-12 rounded-full border border-border/60 bg-background/70 px-4 text-sm">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iPhone">iPhone</SelectItem>
                <SelectItem value="Samsung">Samsung</SelectItem>
                <SelectItem value="Vivo">Vivo</SelectItem>
                <SelectItem value="Oppo">Oppo</SelectItem>
                <SelectItem value="OnePlus">OnePlus</SelectItem>
                <SelectItem value="Realme">Realme</SelectItem>
                <SelectItem value="Mi/Xiaomi">Mi/Xiaomi</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="model" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Model name
            </Label>
            <Input
              id="model"
              className="h-12 rounded-full border border-border/60 bg-background/70 px-4 focus-visible:ring-emerald-500/20"
              placeholder="e.g. iPhone 13"
              onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storage" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Storage
            </Label>
            <Input
              id="storage"
              className="h-12 rounded-full border border-border/60 bg-background/70 px-4 focus-visible:ring-emerald-500/20"
              placeholder="e.g. 128GB"
              onChange={(e) => setFormData((prev) => ({ ...prev, storage: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="condition" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Condition
            </Label>
            <Select onValueChange={(v) => setFormData((prev) => ({ ...prev, condition: v }))} required>
              <SelectTrigger id="condition" className="h-12 rounded-full border border-border/60 bg-background/70 px-4 text-sm">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Excellent">Excellent (No scratches)</SelectItem>
                <SelectItem value="Good">Good (Minor scratches)</SelectItem>
                <SelectItem value="Average">Average (Visible wear)</SelectItem>
                <SelectItem value="Poor">Poor (Cracked/Major issues)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              WhatsApp number
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              className="h-12 rounded-full border border-border/60 bg-background/70 px-4 focus-visible:ring-emerald-500/20"
              placeholder="e.g. 98781 57109"
              onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))}
              required
            />
          </div>
          <Button type="submit" className="h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]">
            Get Instant Quote
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
