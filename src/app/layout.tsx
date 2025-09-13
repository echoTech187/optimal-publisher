import type { Metadata } from "next";
import { Encode_Sans_Condensed, Anton } from "next/font/google";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import "./globals.css";
import FlyonuiScript from "./components/FlyonuiScript";
import MobileSidebar from "./components/sidebar/mobile";

const encodeSansCondensed = Encode_Sans_Condensed({
  variable: "--font-encode-sans-condensed",
  subsets: ["latin"],
  weight: "400"
});
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400"
});


export const metadata: Metadata = {
  title: "Optimal Publisher - Platform Kursus Online Terbaik di Indonesia",
  description: "Optimal Untuk Negeri - Platform Kursus Online Terbaik di Indonesia. Tingkatkan keterampilan Anda dengan kursus berkualitas dari instruktur ahli. Mulai perjalanan belajar Anda hari ini!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Optimal Untuk Negeri - Platform Kursus Online Terbaik di Indonesia. Tingkatkan keterampilan Anda dengan kursus berkualitas dari instruktur ahli. Mulai perjalanan belajar Anda hari ini!" />
        <meta name="keywords" content="Optimal Untuk Negeri, kursus online, belajar online, pendidikan, keterampilan, pelatihan, instruktur ahli, platform pembelajaran, kursus berkualitas" />
        <meta name="author" content="Optimal Untuk Negeri" />
        <meta property="og:title" content="Optimal Untuk Negeri - Platform Kursus Online Terbaik di Indonesia" />
        <meta property="og:description" content="Tingkatkan keterampilan Anda dengan kursus berkualitas dari instruktur ahli. Mulai perjalanan belajar Anda hari ini!" />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:url" content="https://www.optimaluntuknegeri.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Optimal Untuk Negeri - Platform Kursus Online Terbaik di Indonesia" />
        <meta name="twitter:description" content="Tingkatkan keterampilan Anda dengan kursus berkualitas dari instruktur ahli. Mulai perjalanan belajar Anda hari ini!" />
        <meta name="twitter:image" content="/images/og-image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Encode+Sans+Condensed:wght@400;700&family=Anton&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${encodeSansCondensed.variable} ${encodeSansCondensed.variable} antialiased`}
      >
        <MobileSidebar />
        <Header />
        <div className="relative h-full w-full overflow-x-hidden overflow-y-auto">
          {children}
        </div>
        <Footer />
        <FlyonuiScript />
      </body>
    </html>
  );
}
