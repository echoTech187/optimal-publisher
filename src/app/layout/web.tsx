
import type { Metadata } from "next";
import { Encode_Sans_Condensed, Anton, Inter } from "next/font/google";
import "../globals.css";
import FlyonuiScript from "../components/FlyonuiScript";
import Footer from "../components/footer/page";
import Header from "../components/header";
import { MobileSidebar } from "../components/sidebar";
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

const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "500"
})


export const metadata: Metadata = {
    title: "Optimal Publisher - Platform Kursus Online Terbaik di Indonesia",
    description: "Optimal Untuk Negeri - Platform Kursus Online Terbaik di Indonesia. Tingkatkan keterampilan Anda dengan kursus berkualitas dari instruktur ahli. Mulai perjalanan belajar Anda hari ini!",
};
export default function WebLayout({ children }: { children: React.ReactNode }) {
    return (<>
        <html lang="en">
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
                <MobileSidebar />
                <Header />
                <div className="relative h-full w-full overflow-x-hidden overflow-y-auto">
                    {children}
                </div>
                <Footer />
                <FlyonuiScript />
            </body>
        </html>
    </>);
}