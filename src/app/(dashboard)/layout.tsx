import FlyonuiScript from "@/components/FlyonuiScript";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import DashboardLayoutClient from "./DashboardLayoutClient";

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
        <div className={`${interFont.variable}`}>
            <DashboardLayoutClient user={userParsed}>
                {children}
            </DashboardLayoutClient>
            <FlyonuiScript />
        </div>
    );
}