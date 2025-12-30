export interface UsedPhone {
  id: string
  brand: string
  model: string
  storage: string
  condition: string
  price: number
  image: string
  available: boolean
}

export const usedPhones: UsedPhone[] = [
  {
    id: "1",
    brand: "Apple",
    model: "iPhone 13",
    storage: "128GB",
    condition: "Excellent",
    price: 38500,
    image: "/iphone-13-blue.jpg",
    available: true,
  },
  {
    id: "2",
    brand: "Samsung",
    model: "Galaxy S22",
    storage: "256GB",
    condition: "Good",
    price: 32000,
    image: "/samsung-s22-black.jpg",
    available: true,
  },
  {
    id: "3",
    brand: "OnePlus",
    model: "OnePlus 10R",
    storage: "128GB",
    condition: "Excellent",
    price: 24500,
    image: "/oneplus-10r.jpg",
    available: true,
  },
  {
    id: "4",
    brand: "Realme",
    model: "Realme 11 Pro+",
    storage: "256GB",
    condition: "Mint",
    price: 18900,
    image: "/realme-11-pro-plus.jpg",
    available: true,
  },
  {
    id: "5",
    brand: "Vivo",
    model: "Vivo V27",
    storage: "128GB",
    condition: "Good",
    price: 21000,
    image: "/vivo-v27.jpg",
    available: true,
  },
  {
    id: "6",
    brand: "Apple",
    model: "iPhone 12",
    storage: "64GB",
    condition: "Average",
    price: 26500,
    image: "/iphone-12-white.jpg",
    available: true,
  },
    {
    id: "7",
    brand: "Apple",
    model: "iPhone 6s",
    storage: "64GB",
    condition: "Average",
    price: 1500,
    image: "/iphone-6s.jpg",
    available: true,
  },
    {
    id: "8",
    brand: "Poco",
    model: "F1",
    storage: "256GB",
    condition: "Fair",
    price: 2000,
    image: "/poco-f1.jpg",
    available: true,
  },
  {
    id: "9",
    brand: "Oneplus",
    model: "Nord CE 2 Lite",
    storage: "128GB",
    condition: "Mint",
    price: 10000,
    image: "/opce2.jpeg",
    available: true,
  },
]
