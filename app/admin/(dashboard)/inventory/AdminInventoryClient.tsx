"use client"

import * as React from "react"
import { Plus, Edit, Trash2, Search, PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneForm } from "@/components/admin/phone-form"
import { useToast } from "@/hooks/use-toast"
import { Suspense } from "react"

/* ✅ FRONTEND TYPE */
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

function AdminInventoryContent() {
  const [phones, setPhones] = React.useState<UsedPhone[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showAvailableOnly, setShowAvailableOnly] = React.useState(false)
  const [editingPhone, setEditingPhone] =
    React.useState<UsedPhone | null>(null)
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const { toast } = useToast()

  const fetchPhones = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/phones", { cache: "no-store" })
      const data = await res.json()
      setPhones(data)
    } catch {
      toast({
        title: "Error",
        description: "Failed to load inventory",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  React.useEffect(() => {
    fetchPhones()
  }, [fetchPhones])

  const filteredPhones = phones.filter((p) =>
    `${p.brand} ${p.model}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const visiblePhones = showAvailableOnly
    ? filteredPhones.filter((p) => p.available)
    : filteredPhones

  const handleToggleAvailability = async (
    id: string,
    currentStatus: boolean
  ) => {
    setPhones((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, available: !currentStatus } : p
      )
    )

    try {
      const res = await fetch(`/api/phones/${id}`, {
        method: "PUT",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !currentStatus }),
      })
      if (!res.ok) throw new Error()
      toast({ title: "Updated", description: "Availability updated" })
    } catch {
      setPhones((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, available: currentStatus } : p
        )
      )
      toast({
        title: "Error",
        description: "Update failed",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this phone?")) return

    try {
      const res = await fetch(`/api/phones/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error()
      setPhones((prev) => prev.filter((p) => p._id !== id))
      toast({ title: "Deleted", description: "Phone removed" })
    } catch {
      toast({
        title: "Error",
        description: "Delete failed",
        variant: "destructive",
      })
    }
  }

  /* ✅ UPDATED: FormData submit */
  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      const url = editingPhone
        ? `/api/phones/${editingPhone._id}`
        : "/api/phones"

      const method = editingPhone ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        body: formData, // ✅ NO headers, NO JSON
      })

      if (!res.ok) throw new Error()

      toast({
        title: "Success",
        description: `Phone ${
          editingPhone ? "updated" : "added"
        } successfully`,
      })

      setIsFormOpen(false)
      setEditingPhone(null)
      fetchPhones()
    } catch {
      toast({
        title: "Error",
        description: "Save failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Used Phones</h1>
        </div>

        <Dialog
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open)
            if (!open) setEditingPhone(null)
          }}
        >
          <DialogTrigger asChild>
            <Button className="rounded-full font-semibold tracking-wide text-xs admin-btn-primary">
              <Plus className="mr-2 h-4 w-4" /> Add Phone
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPhone ? "Edit Phone" : "Add Phone"}
              </DialogTitle>
            </DialogHeader>
            <PhoneForm
              phone={editingPhone || undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Listings", value: phones.length },
          { label: "Available Now", value: phones.filter((p) => p.available).length },
          { label: "Hidden Listings", value: phones.filter((p) => !p.available).length },
        ].map((stat) => (
          <div key={stat.label} className="admin-stat">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">{stat.label}</p>
            <p className="mt-4 text-2xl font-black">{isLoading ? "—" : stat.value}</p>
          </div>
        ))}
      </div>

      <Card className="admin-surface">
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search by brand or model..."
                className="pl-9 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground">
              <Switch checked={showAvailableOnly} onCheckedChange={setShowAvailableOnly} />
              Show available only
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {visiblePhones.length === 0 ? (
            <div className="flex h-48 items-center justify-center">
              <PackageOpen className="h-10 w-10 opacity-40" />
            </div>
          ) : (
            <>
              <div className="space-y-3 sm:hidden">
                {visiblePhones.map((phone) => (
                  <div key={phone._id} className="admin-list-item">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{phone.brand} {phone.model}</p>
                        <p className="text-xs text-muted-foreground">{phone.storage} • {phone.condition}</p>
                      </div>
                      <span className="text-sm font-black text-emerald-600">₹{phone.price}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground">
                        <Switch
                          checked={phone.available}
                          onCheckedChange={() =>
                            handleToggleAvailability(
                              phone._id,
                              phone.available
                            )
                          }
                        />
                        {phone.available ? "Live" : "Hidden"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-xs font-semibold tracking-wide admin-btn-outline"
                          onClick={() => {
                            setEditingPhone(phone)
                            setIsFormOpen(true)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="rounded-full text-xs font-semibold tracking-wide"
                          onClick={() => handleDelete(phone._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block w-full overflow-x-auto">
                <Table className="admin-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phone</TableHead>
                      <TableHead>Storage</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visiblePhones.map((phone) => (
                      <TableRow key={phone._id} className="transition-colors hover:bg-muted/30">
                        <TableCell>
                          {phone.brand} {phone.model}
                        </TableCell>
                        <TableCell>{phone.storage}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {phone.condition}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{phone.price}</TableCell>
                        <TableCell>
                          <Switch
                            checked={phone.available}
                            onCheckedChange={() =>
                              handleToggleAvailability(
                                phone._id,
                                phone.available
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingPhone(phone)
                              setIsFormOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDelete(phone._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminInventoryPage() {
  return (
    <Suspense fallback={null}>
      <AdminInventoryContent />
    </Suspense>
  )
}
