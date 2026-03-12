import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chukwudi Obi | Software Engineer",
  description: "My portfolio showcasing software development skills",
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`}>
        <Script
          id="metamask-suppressor"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                var msg = e.message || '';
                var file = e.filename || '';
                if ((typeof msg === 'string' && msg.includes('MetaMask')) || (typeof file === 'string' && file.includes('inpage.js'))) {
                  e.stopImmediatePropagation();
                }
              }, true);
              window.addEventListener('unhandledrejection', function(e) {
                var msg = (e.reason && e.reason.message) || '';
                if (typeof msg === 'string' && msg.includes('MetaMask')) {
                  e.preventDefault();
                }
              }, true);
            `,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
