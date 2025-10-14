import { Inter } from 'next/font/google'
import './globals.css'
import FlyonuiScript from '@/components/FlyonuiScript'

const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "300"
})

export const metadata = {
  title: 'Optimal Publisher',
  description: 'Optimal Untuk Negeri - Platform Kursus Online Terbaik di Indonesia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${interFont.variable} ${interFont.variable} antialiased`}>
        {children}
        <FlyonuiScript />
      </body>
    </html>
  )
}