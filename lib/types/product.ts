export interface Product {
  _id?: string
  title: string
  category: "mobile-accessories" | "pc-accessories" | "gadgets"
  price: number
  stock: number
  images?: string[]
  description?: string
  isActive: boolean
}
