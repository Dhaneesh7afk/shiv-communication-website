"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push("/admin/inventory/")
      router.refresh()
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden admin-shell-bg">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md admin-surface p-8 space-y-4">
        <h1 className="text-2xl font-black text-center text-slate-900">Admin Login</h1>

        <Input
          placeholder="Email"
          className="rounded-full border-slate-200/80 bg-white text-slate-900 placeholder:text-slate-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          className="rounded-full border-slate-200/80 bg-white text-slate-900 placeholder:text-slate-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button className="w-full rounded-full font-black tracking-wide text-xs admin-btn-primary" onClick={login}>
          Login
        </Button>
      </div>
    </div>
  )
}
