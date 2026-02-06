"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import {
  LayoutGrid,
  ClipboardList,
  Package,
  Boxes,
  Menu,
  LogOut,
  ArrowUpRight,
  Users,
  LineChart,
  Search,
  PackagePlus,
} from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/aceternity-sidebar"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid, group: "Home" },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList, group: "Management" },
  { href: "/admin/customers", label: "Customers", icon: Users, group: "Management" },
  { href: "/admin/analytics", label: "Analytics", icon: LineChart, group: "Insights" },
  { href: "/admin/inventory", label: "Used Phones", icon: Boxes, group: "Catalog" },
  { href: "/admin/products/list", label: "Products List", icon: Package, group: "Catalog" },
  { href: "/admin/products", label: "Add Product", icon: Package, group: "Quick Actions" },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [commandOpen, setCommandOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const nav = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        active: pathname === item.href,
      })),
    [pathname]
  )

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  const activeLabel = nav.find((item) => item.active)?.label ?? "Dashboard"
  const quickCommands = [
    { label: "Add Product", href: "/admin/products", icon: PackagePlus, shortcut: "P" },
    { label: "Add Used Phone", href: "/admin/inventory", icon: Boxes, shortcut: "U" },
    { label: "View Orders", href: "/admin/orders", icon: ClipboardList, shortcut: "O" },
  ]

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  const sidebarLinks = nav.map((item) => ({
    label: item.label,
    href: item.href,
    active: item.active,
    icon: <item.icon className="h-4 w-4" />,
  }))

  const Logo = () => (
    <div className="flex items-center gap-3 px-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-400 to-sky-500 text-white shadow-[0_18px_40px_-25px_rgba(16,185,129,0.9)]">
        <span className="text-sm font-black">SC</span>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre text-sm font-semibold text-slate-900"
      >
        Shiv Communication
      </motion.span>
    </div>
  )

  const LogoIcon = () => (
    <div className="flex items-center gap-3 px-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-400 to-sky-500 text-white shadow-[0_18px_40px_-25px_rgba(16,185,129,0.9)]">
        <span className="text-sm font-black">SC</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen admin-shell-bg text-foreground">
      <div className="flex min-h-screen w-full">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} className="bg-white/96">
          <SidebarBody className="justify-between gap-8 px-3 pb-6 pt-5">
            <div className="flex flex-1 flex-col overflow-hidden">
              {sidebarOpen ? <Logo /> : <LogoIcon />}
              <div className="mt-6 flex flex-col gap-1">
                {sidebarLinks.map((link) => (
                  <SidebarLink key={link.href} link={link} />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <SidebarLink
                link={{
                  label: "View Website",
                  href: "/",
                  icon: <ArrowUpRight className="h-4 w-4" />,
                }}
              />
              <SidebarLink
                link={{
                  label: "Logout",
                  href: "#",
                  icon: <LogOut className="h-4 w-4" />,
                  onClick: handleLogout,
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

        <div className="min-w-0 flex-1 md:pl-16">
          <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3 px-4 py-3 md:px-6">
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-slate-200/80 bg-white"
                onClick={() => setSidebarOpen((open) => !open)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-3">
                <p className="text-lg font-black text-slate-900">{activeLabel}</p>
              </div>

              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="group flex w-full flex-1 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-emerald-400/40 hover:text-slate-900 md:max-w-xl"
              >
                <Search className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">Search or run a command...</span>
                <span className="ml-auto hidden items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 md:flex">
                  <span className="admin-kbd">⌘</span>
                  <span className="admin-kbd">K</span>
                </span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <Link href="/admin/products" className="hidden sm:block">
                  <Button className="rounded-2xl font-semibold tracking-wide text-xs admin-btn-primary">
                    Add Product
                  </Button>
                </Link>
                <Link href="/admin/inventory" className="hidden lg:block">
                  <Button variant="outline" className="rounded-2xl font-semibold tracking-wide text-xs admin-btn-outline">
                    Add Used Phone
                  </Button>
                </Link>
              </div>
            </div>

            <CommandDialog
              open={commandOpen}
              onOpenChange={setCommandOpen}
              className="admin-surface border-slate-200/80"
            >
              <CommandInput placeholder="Search admin commands..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  {navItems.map((item) => (
                    <CommandItem
                      key={item.href}
                      value={item.label}
                      onSelect={() => {
                        setCommandOpen(false)
                        router.push(item.href)
                      }}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Quick Actions">
                  {quickCommands.map((item) => (
                    <CommandItem
                      key={item.href}
                      value={item.label}
                      onSelect={() => {
                        setCommandOpen(false)
                        router.push(item.href)
                      }}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    </CommandItem>
                  ))}
                  <CommandItem
                    value="View Website"
                    onSelect={() => {
                      setCommandOpen(false)
                      router.push("/")
                    }}
                  >
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    View Website
                  </CommandItem>
                  <CommandItem
                    value="Logout"
                    onSelect={() => {
                      setCommandOpen(false)
                      handleLogout()
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </header>

          <main className="space-y-6 px-4 pb-10 pt-6 md:px-6 lg:px-8" data-reveal-group>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
