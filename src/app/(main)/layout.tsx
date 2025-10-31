'use client';

import { useEffect, useState } from 'react';
import "../globals.css";
import FlyonuiScript from "@/components/FlyonuiScript";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { MobileSidebar } from "@/components/sidebar";
import { getSession } from '@/features/auth/session';
import Image from "next/image";

export default function WebLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarOpen = () => setIsSidebarOpen(true);
    const handleSidebarClose = () => setIsSidebarOpen(false);
    const [data, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Optimal Penerbit";
        async function getUserSession() {
            const session = await getSession();
            setUser(session);
            setIsLoading(false);
        }
        getUserSession();
    }, []);

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

    if (isLoading) return (
        <div className="fixed h-screen w-screen bg-white/20 backdrop-blur-3xl shadow-xl z-50 flex justify-center items-center">
            <Image src="/penerbit-logo.png" alt="logo" width={200} height={100} priority={true}  className="animate-pulse w-24"/>
        </div>
    )
    return (
        <div className="h-full w-full antialiased">
            <MobileSidebar user={data} isOpen={isSidebarOpen} onClose={handleSidebarClose} />
            <Header onMenuClick={handleSidebarOpen} />
            <div className="relative h-full w-full overflow-x-hidden overflow-y-auto">
                {children}
            </div>
            <Footer />
            <FlyonuiScript />
        </div>
    );
}