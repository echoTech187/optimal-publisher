'use client';

import { useState } from "react";
import { User } from "@/types/user";
import { DashboardSidebar } from "@/components/sidebar";
import DashboardHeader from "@/components/header/DashboardHeader";

export default function DashboardLayoutClient({ children, user }: { children: React.ReactNode, user: User }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex bg-gray-100 dark:bg-gray-900 antialiased">
            <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
                <DashboardHeader user={user} onMenuClick={() => setSidebarOpen(true)} />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
