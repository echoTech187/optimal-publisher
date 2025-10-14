"use client";
import { useEffect, useState } from "react";
import UserProfile from "../user/profile";
import { User } from "@/types/user";
import { getSession } from "@/features/auth/session";
import { redirect } from "next/navigation";

const DashboardHeader = ({user}: {user: User}) => {

    
    return (
        <header className="w-full py-4 transition-all bg-white dark:bg-black/20 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center justify-between lg:justify-end w-full px-4">
                <UserProfile user={user} />
            </div>
        </header>
    );
}

export default DashboardHeader