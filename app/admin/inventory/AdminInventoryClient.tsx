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
  available: boolean
}

function AdminInventoryContent() {
  const [phones, setPhones] = React.useState<UsedPhone[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
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
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Shiv Communication
            </h1>
            <p className="text-muted-foreground">
              Inventory Management Dashboard
            </p>
          </div>

          <Dialog
            open={isFormOpen}
            onOpenChange={(open) => {
              setIsFormOpen(open)
              if (!open) setEditingPhone(null)
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Phone
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
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

        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardContent>
            {filteredPhones.length === 0 ? (
              <div className="flex h-48 items-center justify-center">
                <PackageOpen className="h-10 w-10 opacity-40" />
              </div>
            ) : (
              <Table>
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
                  {filteredPhones.map((phone) => (
                    <TableRow key={phone._id}>
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
            )}
          </CardContent>
        </Card>
      </div>
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
