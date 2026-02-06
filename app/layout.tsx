import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Providers } from "@/components/providers"
import { cookies } from "next/headers"
import { ScrollRevealProvider } from "@/components/scroll-reveal-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Spotlight } from "@/components/aceternity/spotlight"
import { GridPattern } from "@/components/aceternity/grid-pattern"
import { MobileTabs } from "@/components/expanded-tabs-demo"
import { RouteTransition } from "@/components/route-transition"
import { ThemeToggle } from "@/components/theme-toggle"

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
    url: "https://shivcommunication.shop",
    siteName: "Shiv Communication",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
  generator: "dhaneeshdotdev",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get("admin-token")?.value
  const isAdmin = adminToken === process.env.ADMIN_PASSWORD
  const themeScript = isAdmin
    ? `(() => { try { document.documentElement.classList.remove("dark"); } catch (e) {} })();`
    : `(() => { try { const stored = localStorage.getItem("theme"); const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; const useDark = stored ? stored === "dark" : prefersDark; document.documentElement.classList.toggle("dark", useDark); } catch (e) {} })();`

  return (
    <html lang="en" suppressHydrationWarning>
      <body
  suppressHydrationWarning
  className={`${geistSans.variable} ${geistMono.variable} 
  font-sans antialiased min-h-screen flex flex-col 
  bg-background text-foreground`}
>

        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* ✅ PROVIDER WRAPS EVERYTHING */}
        <Providers>
          <ThemeProvider forcedTheme={isAdmin ? "light" : undefined}>
            <div className="relative flex flex-1 flex-col overflow-hidden">
              {!isAdmin && (
                <>
                  <GridPattern className="opacity-60 dark:opacity-40" />
                  <Spotlight className="-top-32" fill="rgba(59,130,246,0.12)" />
                  <Spotlight className="top-[40%] left-[70%] h-[420px] w-[420px]" fill="rgba(14,165,233,0.12)" />
                </>
              )}

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="md:hidden">
                  <RouteTransition />
                </div>
                {!isAdmin && <Navbar />}
                <main >
                  <ScrollRevealProvider>{children}</ScrollRevealProvider>
                </main>
              </div>
            </div>

            {!isAdmin && (
              <>
                <div className="fixed bottom-20 right-4 z-20 md:hidden">
                  <ThemeToggle className="h-10 w-10 border border-border/60 bg-background/80 shadow-lg" />
                </div>
                <div className="fixed bottom-0 left-0 right-0 z-10 bg-background/50 backdrop-blur-1xl md:hidden">
                  <div className="container mx-auto px-2 py-2">
                    <MobileTabs />
                  </div>
                </div>
              </>
            )}

            {!isAdmin && <Footer />}
          </ThemeProvider>
        </Providers>
  
        <Analytics />
      </body>
    </html>
  )
}
