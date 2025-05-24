import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ConstellationAnimation } from "@/components/constellation-animation"
import { PageTransition } from "@/components/page-transition"
import { ChatProvider } from "@/components/chat-provider"
import { ChatInterface } from "@/components/chat-interface"
import { ThemeClientWrapper } from "@/components/theme-client-wrapper"
import Home from "./page"
import Projects from "./projects/page"
import Blog from "./blog/page"
import Tools from "./tools/page"
import { Analytics } from "@vercel/analytics/next"

import { PageCarousel } from "@/components/PageCarousel"
import { PageTransition2 } from "@/components/page-transition2"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Aabhimanyu Gupta | Neural Architect",
  description:
    "Digital presence of Aabhimanyu Gupta, a neural architect operating in the AI-dominated landscape of 2077.",
}
const pages = [
  { path: "/", component: <Home />, label: "Home" },
  { path: "/projects", component: <Projects />, label: "Projects" },
  { path: "/blog", component: <Blog />, label: "Blog" },
  { path: "/tools", component: <Tools />, label: "Tools" }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ThemeClientWrapper>
          <ChatProvider>
            <div className="flex flex-col relative h-screen">
              <div className="absolute inset-0 bg-noise-pattern opacity-5 pointer-events-none"></div>
              <ConstellationAnimation />
              <Navbar />
              <PageTransition>
                <main className="flex-1 relative pt-16 pb-16 pt-12 pb-12 max-h-[calc(100vh-4rem-4rem)] xs:pt-20 xs:pb-20 xs:max-h-[calc(100vh-5rem-5rem)]">
                  {children}
                  <Analytics />
                </main>
              </PageTransition>
              <Footer />
              <ChatInterface />
            </div>
          </ChatProvider>
          </ThemeClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
