import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MobileStickyBar } from "@/components/mobile-sticky-bar"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: {
    default: "Shiv Communication | Mobile Repair, Recharge & EMI in Mandi Gobindgarh",
    template: "%s | Shiv Communication Mandi Gobindgarh",
  },
  description:
    "Mandi Gobindgarh's trusted mobile & computer service center. Expert repairs, recharges, EMI payments, money transfer & used phones. Call 9878157109.",
  keywords: [
    "Mobile Repair Mandi Gobindgarh",
    "iPhone Repair Punjab",
    "Computer Repair Mandi Gobindgarh",
    "Mobile Recharge Shop",
    "Used Phones Mandi Gobindgarh",
    "Money Transfer Service",
    "EMI Payment Center",
  ],
  openGraph: {
    title: "Shiv Communication | Mobile & Computer Services",
    description: "Fast and trusted mobile & computer services in Mandi Gobindgarh, Punjab.",
    url: "https://shivcommunication.com",
    siteName: "Shiv Communication",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyBar />
        <Analytics />
      </body>
    </html>
  )
}
