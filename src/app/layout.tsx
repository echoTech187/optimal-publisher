import { Inter } from 'next/font/google'
import './globals.css'
import FlyonuiScript from '@/components/FlyonuiScript'

const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700']
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
      <body className={`${interFont.variable} font-sans antialiased`}>
        {children}
        <FlyonuiScript />
      </body>
    </html>
  )
}