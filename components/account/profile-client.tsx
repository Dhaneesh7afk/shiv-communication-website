"use client"

import { useMemo, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Address = {
  line1?: string
  area?: string
  city?: string
  pincode?: string
}

type ProfileData = {
  name?: string
  email?: string
  phone?: string
  image?: string
  address?: Address
  authProvider?: string
  phoneVerified?: boolean
}

export function ProfileClient({ user }: { user: ProfileData }) {
  const { data: session } = useSession()
  const [name, setName] = useState(user.name || "")
  const [image, setImage] = useState(user.image || "")
  const [address, setAddress] = useState<Address>({
    line1: user.address?.line1 || "",
    area: user.address?.area || "",
    city: user.address?.city || "",
    pincode: user.address?.pincode || "",
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const initials = useMemo(() => {
    const src = name || user.email || "User"
    return src
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("")
  }, [name, user.email])

  const phoneVerified = Boolean(session?.user?.phoneVerified) || Boolean(user.phoneVerified)

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    const res = await fetch("/api/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        image,
        address,
      }),
    })
    setSaving(false)
    setSaved(res.ok)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete your account profile?")
    if (!confirmed) return
    const res = await fetch("/api/users/me", { method: "DELETE" })
    if (res.ok) {
      await signOut({ callbackUrl: "/" })
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="h-14 w-14 rounded-md bg-[#0f1111] text-white flex items-center justify-center overflow-hidden">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name || "Profile"} className="h-full w-full object-cover" />
            ) : (
              <span className="text-lg font-semibold">{initials}</span>
            )}
          </div>
          <div className="min-w-[140px]">
            <p className="text-sm font-semibold text-[#0f1111] dark:text-slate-100">{name || "Profile"}</p>
            <p className="text-xs text-[#565959] dark:text-slate-400">{user.email || user.phone || ""}</p>
          </div>
          <div className="ml-auto flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">
            <span className="rounded-full border border-[#d5d9d9] dark:border-slate-800 bg-[#f7fafa] dark:bg-slate-800/60 px-3 py-1">
              {user.authProvider || "Account"}
            </span>
            <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-emerald-700">
              {phoneVerified ? "Phone Verified" : "Phone Pending"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">
                  Profile information
                </p>
                <p className="mt-2 text-sm text-[#565959] dark:text-slate-400">Identity & login details</p>
              </div>
              {saved && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-600">Saved</span>
              )}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-[#565959] dark:text-slate-400">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:border-[#888c8c]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#565959] dark:text-slate-400">Email</label>
                <input
                  value={user.email || ""}
                  readOnly
                  className="mt-2 w-full rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-[#f7fafa] dark:bg-slate-800/60 px-3 py-2 text-sm text-[#565959] dark:text-slate-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#565959] dark:text-slate-400">Phone</label>
                <input
                  value={user.phone || ""}
                  readOnly
                  className="mt-2 w-full rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-[#f7fafa] dark:bg-slate-800/60 px-3 py-2 text-sm text-[#565959] dark:text-slate-400"
                />
                {!phoneVerified && (
                  <p className="mt-2 text-xs text-amber-600">
                    Verify phone.{" "}
                    <Link href="/login?next=/account" className="underline font-semibold">
                      Verify
                    </Link>
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-semibold text-[#565959] dark:text-slate-400">Profile image URL</label>
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://"
                  className="mt-2 w-full rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:border-[#888c8c]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">
                Shipping address
              </p>
              <p className="mt-2 text-sm text-[#565959] dark:text-slate-400">Delivery details</p>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-[#565959] dark:text-slate-400">Address line</label>
                <input
                  value={address.line1 || ""}
                  onChange={(e) => setAddress((prev) => ({ ...prev, line1: e.target.value }))}
                  className="mt-2 w-full rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:border-[#888c8c]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#565959] dark:text-slate-400">Area / Locality</label>
                <input
                  value={address.area || ""}
                  onChange={(e) => setAddress((prev) => ({ ...prev, area: e.target.value }))}
                  className="mt-2 w-full rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:border-[#888c8c]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#565959] dark:text-slate-400">City</label>
                <input
                  value={address.city || ""}
                  onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                  className="mt-2 w-full rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:border-[#888c8c]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#565959] dark:text-slate-400">Pincode</label>
                <input
                  value={address.pincode || ""}
                  onChange={(e) => setAddress((prev) => ({ ...prev, pincode: e.target.value }))}
                  className="mt-2 w-full rounded-md border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:border-[#888c8c]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-[#d5d9d9] dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#565959] dark:text-slate-400">Actions</p>
            <div className="mt-4 space-y-3">
              <Button
                onClick={handleSave}
                className="w-full rounded-md border border-[#fcd200] bg-[#ffd814] text-[#0f1111] dark:bg-amber-300 dark:text-slate-900 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#f7ca00]"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-md border-[#d5d9d9] dark:border-slate-800 text-xs font-semibold uppercase tracking-[0.12em]"
                asChild
              >
                <Link href="/account/orders">View orders</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-md border-red-300 text-red-600 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-red-50"
                onClick={handleDelete}
              >
                Delete account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
