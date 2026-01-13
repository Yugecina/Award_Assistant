import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Award Assistant - Advertising Awards Entry Helper",
  description: "AI-powered assistant for submitting entries to major advertising awards",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary">Award Assistant</h1>
              <div className="flex gap-4">
                <a href="/" className="hover:text-primary transition-colors">Home</a>
                <a href="/awards" className="hover:text-primary transition-colors">Awards</a>
                <a href="/projects" className="hover:text-primary transition-colors">Projects</a>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
