"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"

export default function AddToCartButton({
  product,
}: {
  product: any
}) {
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0],
      slug: product.slug,
    })

    router.push("/cart")
  }

  return (
    <button
      onClick={handleAddToCart}
      className="h-12 rounded-full bg-primary px-8 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg shadow-primary/10 transition hover:shadow-primary/25"
    >
      Add to Cart
    </button>
  )
}
