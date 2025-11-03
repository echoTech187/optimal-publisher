'use client';

import { useState, useEffect } from "react";
import { User } from "@/types/user";
import NewDashboardSidebar from "@/components/sidebar/NewDashboardSidebar";
import DashboardHeader from "@/components/header/DashboardHeader";

export default function DashboardLayoutClient({ children, user }: { children: React.ReactNode, user: User }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSidebarOpen]);

    return (
        <div className="flex bg-[#F4F7FE] min-h-screen font-sans">
            <NewDashboardSidebar user={user} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
                <main className=" flex-grow lg:bg-[#F4F7FE] lg:rounded-b-lg">
                    {children}
                </main>
            </div>
        </div>
    );
}