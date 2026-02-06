import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageCarousel from "@/components/product/ImageCarousel"
import AddToCartButton from "@/components/cart/AddToCartButton"
import BuyNowButton from "@/components/BuyNowButton"

interface Product {
  title: string
  price: number
  stock: number
  description?: string
  images?: string[]
  _id?: string
  slug?: string
}

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/slug/${slug}`, { cache: "no-store" })

  if (!res.ok) return null
  return res.json()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/slug/${slug}`, { cache: "no-store" })

  if (!res.ok) {
    return {
      title: "Product Not Found | Shiv Communication",
    }
  }

  const product = await res.json()

  return {
    title: `${product.title} | Shiv Communication`,
    description: product.description || `Buy ${product.title} at best price from Shiv Communication.`,
    openGraph: {
      title: product.title,
      description: product.description || `Buy ${product.title} at best price from Shiv Communication.`,
      images: product.images?.length ? [{ url: product.images[0] }] : [],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const product = await getProduct(slug)

  if (!product) notFound()

  const headingFont = { fontFamily: "var(--font-display)" }

  return (
    <div className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`} style={{ fontFamily: "var(--font-body)" }}>
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_60%)] blur-2xl" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_55%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.04),transparent_45%,rgba(16,185,129,0.06))]" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1.5 mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Product Details
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground" style={headingFont}>
            {product.title}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Verified accessories and gadgets with trusted support and fast pickup.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-4 md:p-6 shadow-sm">
              <ImageCarousel images={product.images || []} title={product.title} />
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-emerald-700 dark:text-emerald-300">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.stock > 0 ? (
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold uppercase tracking-[0.2em]">
                    In Stock
                  </span>
                ) : (
                  <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-700 dark:text-red-300 font-semibold uppercase tracking-[0.2em]">
                    Out of Stock
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-muted-foreground leading-relaxed max-w-xl">{product.description}</p>
              )}

              <div className="flex flex-wrap gap-4">
                <AddToCartButton product={product} />
                <BuyNowButton productId={slug} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                {["Quality Checked", "Secure Payment", "Fast Support", "Trusted Seller"].map((item) => (
                  <div key={item} className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-center font-semibold">
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Why buy here?</p>
                <div className="mt-4 space-y-3">
                  {[
                    { icon: ShieldCheck, text: "Verified accessories and warranty support." },
                    { icon: Truck, text: "Quick pickup from the store." },
                    { icon: CheckCircle2, text: "Transparent pricing and live stock." },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-sm text-foreground/80">
                      <item.icon className="h-4 w-4 text-emerald-600" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="mt-6 h-12 w-full rounded-full text-xs font-semibold uppercase tracking-[0.2em]"
                  asChild
                >
                  <a href="https://wa.me/919878157109" target="_blank" rel="noopener noreferrer">
                    Ask on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
