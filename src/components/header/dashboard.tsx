"use client";
import { useEffect, useState } from "react";
import UserProfile from "../user/profile";
import { User } from "@/types/user";
import { getSession } from "@/features/auth/session";
import { redirect } from "next/navigation";

const DashboardHeader = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await getSession();
                if (response) {
                    setUser(response);
                } else {
                    redirect("/signin");
                }
                
            } catch (error) {
                redirect("/signin");
            }
        }
        getUser();
    }, []);
    if (!user) {
        return null;
    }
    return (
        <header className="w-full py-4 transition-all bg-white dark:bg-black/20 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center justify-between lg:justify-end w-full px-4">
                <UserProfile user={user} />
            </div>
        </header>
    );
}

export default DashboardHeader