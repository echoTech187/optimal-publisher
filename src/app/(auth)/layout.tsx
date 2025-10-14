import { Inter } from "next/font/google";

const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "500"
})
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div  className={`${interFont.variable} ${interFont.variable} antialiased`}>{children}</div>;
}