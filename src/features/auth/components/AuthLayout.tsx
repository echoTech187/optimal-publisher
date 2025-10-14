import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import FlyonuiScript from "@/components/FlyonuiScript";


const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "500"
})


export const metadata: Metadata = {
    title: "Login - Optimal Penerbit",
    description: "Optimal Untuk Negeri - Platform Kursus Online Terbaik di Indonesia. Tingkatkan keterampilan Anda dengan kursus berkualitas dari instruktur ahli. Mulai perjalanan belajar Anda hari ini!",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (<html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Optimal Untuk Negeri - Platform Kursus Online Terbaik di Indonesia. Tingkatkan keterampilan Anda dengan kursus berkualitas dari instruktur ahli. Mulai perjalanan belajar Anda hari ini!" />
            <meta name="keywords" content="Optimal Untuk Negeri, kursus online, belajar online, pendidikan, keterampilan, pelatihan, instruktur ahli, platform pembelajaran, kursus berkualitas" />
            <meta name="author" content="Optimal Untuk Negeri" />
        </head>
        <body
            className={`${interFont.variable} ${interFont.variable} antialiased`}
        >
            {children}
            <FlyonuiScript />
        </body>
    </html>);
}