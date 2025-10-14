import type { Metadata } from "next";
import { Encode_Sans_Condensed, Anton, Inter } from "next/font/google";
import "../globals.css";
import FlyonuiScript from "@/components/FlyonuiScript";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { MobileSidebar } from "@/components/sidebar";
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

export default function WebLayout({ children }: { children: React.ReactNode }) {
    return (
            <div
                className={`${interFont.variable} ${encodeSansCondensed.variable} ${anton.variable} h-full w-full antialiased`}
            >
                <MobileSidebar />
                <Header />
                <div className="relative h-full w-full overflow-x-hidden overflow-y-auto">
                    {children}
                </div>
                <Footer />
                <FlyonuiScript />
            </div>
    );
}