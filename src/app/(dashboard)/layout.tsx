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
    const userParsed = user ? JSON.parse(user) : null;
    if (!userParsed) {
        redirect('/signin');
    }

    return (
        <div className={`${interFont.variable} flex h-full w-full antialiased`}>
            <DashboardSidebar />
            <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto">
                <div className="flex flex-col h-full">
                    <DashboardHeader user={userParsed} />
                    {children}
                </div>
            </div>
            <FlyonuiScript />
        </div>
    );
}