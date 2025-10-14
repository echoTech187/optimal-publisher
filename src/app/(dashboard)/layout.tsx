import FlyonuiScript from "@/components/FlyonuiScript";
import DashboardHeader from "@/components/header/dashboard";
import { DashboardSidebar } from "@/components/sidebar";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

const interFont = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: "500"
})
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const user = (await cookies()).get('user')?.value;
    console.log(user);
    const userParsed = user ? JSON.parse(user) : null;
    if (!userParsed) {
        redirect('/signin');
    }

    return (<html lang="en">
        <head>
            <title>Login - Optimal Penerbit</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Optimal Untuk Negeri - Platform Kursus Online Terbaik di Indonesia. Tingkatkan keterampilan Anda dengan kursus berkualitas dari instruktur ahli. Mulai perjalanan belajar Anda hari ini!" />
            <meta name="keywords" content="Optimal Untuk Negeri, kursus online, belajar online, pendidikan, keterampilan, pelatihan, instruktur ahli, platform pembelajaran, kursus berkualitas" />
            <meta name="author" content="Optimal Untuk Negeri" />
        </head>
        <body
            className={`${interFont.variable} ${interFont.variable} antialiased`}
        >
            <div className="flex h-full w-full">
                <DashboardSidebar />
                <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto">
                    <div className="flex flex-col h-full">
                        <DashboardHeader user={userParsed} />
                        {children}
                    </div>
                </div>
            </div>
            <FlyonuiScript />
        </body>
    </html>);
}