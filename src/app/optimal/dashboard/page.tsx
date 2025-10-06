"use client";
import DashboardLayout from "@/app/layout/dashboard";
import { useEffect } from "react"

export default function Dashboard() {
    useEffect(() => {
        document.title = "Dashboard";
    })
    return (<>
        <DashboardLayout>
        <main className="h-full w-full">Dashboard</main>
        </DashboardLayout>
    </>)
}