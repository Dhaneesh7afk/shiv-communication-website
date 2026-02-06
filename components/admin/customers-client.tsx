"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search, RefreshCw, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Customer {
  _id: string
  name: string
  phone: string
  orderCount: number
  totalSpent: number
  lastOrderAt?: string
}

export default function CustomersClient() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchCustomers = async () => {
    setLoading(true)
    const res = await fetch("/api/customers", { cache: "no-store" })
    if (res.ok) {
      const data = await res.json()
      setCustomers(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const filtered = useMemo(() => {
    return customers.filter((customer) => {
      const term = query.toLowerCase()
      return (
        customer.name?.toLowerCase().includes(term) ||
        customer.phone?.includes(term)
      )
    })
  }, [customers, query])

  const stats = useMemo(() => {
    const totalSpent = customers.reduce((sum, customer) => sum + (customer.totalSpent || 0), 0)
    const totalOrders = customers.reduce((sum, customer) => sum + (customer.orderCount || 0), 0)
    return {
      totalCustomers: customers.length,
      totalOrders,
      totalSpent,
    }
  }, [customers])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black">Customers</h1>
        </div>
        <Button
          variant="outline"
          className="rounded-full font-semibold tracking-wide text-xs admin-btn-outline"
          onClick={fetchCustomers}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Customers", value: stats.totalCustomers },
          { label: "Total Orders", value: stats.totalOrders },
          { label: "Total LTV", value: `₹${stats.totalSpent}` },
        ].map((stat) => (
          <div key={stat.label} className="admin-stat">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">{stat.label}</p>
            <p className="mt-4 text-2xl font-black">{loading ? "—" : stat.value}</p>
          </div>
        ))}
      </div>

      <div className="admin-surface p-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search by name or phone..."
              className="pl-9 rounded-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground">
            <Users className="h-4 w-4" />
            {filtered.length} listed
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-secondary/30 p-6 text-sm text-muted-foreground">
            Loading customers...
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-secondary/10 p-10 text-center text-muted-foreground">
            No customers found.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((customer) => (
              <Link
                key={customer._id}
                href={`/admin/customers/${customer._id}`}
                className="admin-list-item flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold">{customer.name || "Guest"}</p>
                  <p className="text-sm text-muted-foreground">{customer.phone}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-wide text-muted-foreground">
                  <span className="rounded-full bg-secondary/40 px-3 py-1">
                    Orders: {customer.orderCount}
                  </span>
                  <span className="rounded-full bg-secondary/40 px-3 py-1">
                    LTV: ₹{customer.totalSpent}
                  </span>
                  <span className="rounded-full bg-secondary/40 px-3 py-1">
                    Last: {customer.lastOrderAt ? new Date(customer.lastOrderAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
