import Link from "next/link"
import { notFound } from "next/navigation"
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google"
import { BadgeCheck, CheckCircle2, MessageCircle, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { connectDB } from "@/lib/db"
import UsedPhone from "@/models/UsedPhone"
import { UsedPhoneGallery } from "@/components/used-phones/used-phone-gallery"

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

export default async function UsedPhoneDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectDB()
  const phone = await UsedPhone.findById(id).lean()

  if (!phone) notFound()

  const images = phone.images?.length
    ? phone.images
    : phone.image
      ? [phone.image]
      : ["/placeholder.png"]

  const whatsappMessage = `Hello Shiv Communication, I am interested in buying the ${phone.brand} ${phone.model} (${phone.storage}) listed for ₹${phone.price}. Is it still available?`

  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  })

  const createdAt = phone.createdAt ? new Date(phone.createdAt).toLocaleDateString("en-IN") : "—"
  const updatedAt = phone.updatedAt ? new Date(phone.updatedAt).toLocaleDateString("en-IN") : "—"

  return (
    <div
      className={`${displayFont.variable} ${bodyFont.variable} min-h-screen`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <section className="bg-[#f2f4f7] dark:bg-slate-950 pb-24 pt-12 md:pt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/used-phones" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              Used Phones
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-100">{phone.brand}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm md:p-6">
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {phone.brand}
                  </p>
                  <h1
                    className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {phone.model} · {phone.storage}
                  </h1>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Condition: <span className="font-semibold text-slate-900 dark:text-slate-100">{phone.condition}</span>
                  </p>
                </div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/15 px-4 py-1 text-emerald-700 dark:text-emerald-300">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                  <span className="rounded-full border border-slate-200 dark:border-slate-800 px-4 py-1">{phone.condition}</span>
                  <span className="rounded-full border border-slate-200 dark:border-slate-800 px-4 py-1">{phone.storage}</span>
                </div>
                <UsedPhoneGallery images={images} alt={`${phone.brand} ${phone.model}`} />
              </div>

              <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Device details
                </p>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                  {[
                    { label: "Brand", value: phone.brand },
                    { label: "Model", value: phone.model },
                    { label: "Storage", value: phone.storage },
                    { label: "Condition", value: phone.condition },
                    { label: "Status", value: phone.available ? "Available" : "Reserved" },
                    { label: "Listed", value: createdAt },
                    { label: "Updated", value: updatedAt },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-4 py-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  What happens next
                </p>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                  {[
                    "Reserve the phone on WhatsApp to lock it.",
                    "Visit the store to inspect the device in person.",
                    "Complete payment after you are satisfied.",
                  ].map((step) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-200 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/15 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 self-start">
              <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Price</p>
                <div className="mt-3 text-3xl font-black text-slate-900 dark:text-slate-100">
                  {currency.format(phone.price)}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      phone.available ? "bg-emerald-500 dark:bg-emerald-400" : "bg-amber-500 dark:bg-amber-400"
                    }`}
                  />
                  {phone.available ? "In stock" : "Reserved"}
                </div>
                <div className="mt-6 grid gap-3">
                  <Button className="h-12 rounded-full text-xs font-semibold uppercase tracking-[0.2em]" asChild>
                    <a
                      href={`https://wa.me/919878157109?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Reserve on WhatsApp
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-full border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-[0.2em]"
                    asChild
                  >
                    <a href="tel:+919878157109">
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Call Store
                    </a>
                  </Button>
                </div>
                <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-4 text-xs text-slate-600 dark:text-slate-300">
                  Want more pictures or a video? Message us for a live walkthrough.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
