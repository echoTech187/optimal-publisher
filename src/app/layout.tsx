import { LoadingProvider } from '@/context/LoadingContext';
import { Inter } from 'next/font/google'
import './globals.css'
import FlyonuiScript from '@/components/FlyonuiScript';

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
    <html lang="id">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/penerbit-logo.png" />
      </head>
      <body className={`${interFont.variable} font-sans antialiased`}>
        <LoadingProvider>
          {children}
        </LoadingProvider>
        <FlyonuiScript />
        <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
        <link rel="stylesheet" href="https://cdn.datatables.net/2.3.4/css/dataTables.dataTables.min.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/responsive/3.0.7/css/responsive.dataTables.min.css" />

        <script src="https://cdn.datatables.net/2.3.4/js/dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/responsive/3.0.7/js/dataTables.responsive.min.js"></script>
      </body>
    </html>
  )
}