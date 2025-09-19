"use client";
import { useEffect } from "react"

export default function Dashboard() {
    useEffect(() => {
        document.title = "Dashboard";
    })
    return (<>
        <main className="h-full w-full">Dashboard</main>
    </>)
}