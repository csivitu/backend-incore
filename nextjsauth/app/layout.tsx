import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Self-host Auth example",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="bg-neutral-950 text-white">
      <body className={inter.className}>
        <div className="flex flex-col justify-between w-full h-full min-h-screen">
          <Header />
          <main className="flex-auto w-full max-w-3xl px-4 py-4 mx-auto sm:px-6 md:py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
