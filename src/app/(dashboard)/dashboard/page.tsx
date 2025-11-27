"use client";

import Image from "next/image";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

// Import the extracted components
import DashboardHeroSection from "@/components/dashboard/DashboardHeroSection";
import DashboardEventNewsEventCardSection from "@/components/dashboard/DashboardEventNewsEventCardSection";

function DashboardPage() {
    const { isLoading, articles, upcomingEvents } = useDashboard();

    if (isLoading) {
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-white/20 backdrop-blur-3xl shadow-xl z-50 flex justify-center items-center">
                <Image src="/penerbit-logo.png" alt="logo" width={200} height={100} priority={true} className="animate-pulse w-24" />
            </div>
        );
    }

    return (
        <div className="container m-auto p-6 ">
            <DashboardHeroSection />
            <DashboardEventNewsEventCardSection events={upcomingEvents} articles={articles} />
        </div>
    );
}

export default DashboardPage;
