"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface CartItem {
  _id: string
  title: string
  price: number
  image?: string
  quantity: number
  slug: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void

  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCart(JSON.parse(stored))
  }, [])

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

 const addToCart = (item: Omit<CartItem, "quantity">) => {
  setCart((prev) => {
    const existing = prev.find((p) => p._id === item._id)

    if (existing) {
      return prev.map((p) =>
        p._id === item._id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    }

    return [...prev, { ...item, quantity: 1 }]
  })
}


  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p._id !== id))
  }

  const updateQty = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, quantity: qty } : p
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
