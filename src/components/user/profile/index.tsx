
"use client";
import { useState, useRef, useEffect } from "react";
import { logout } from "@/features/auth/actions"; // <-- Import server action
import { User } from "@/types/user";
import Image from "next/image";

// --- User Profile Component ---

export default function UserProfile({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const userData = user;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]" ref={dropdownRef}>
            <button 
                type="button" 
                className="dropdown-toggle flex items-center" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="avatar">
                    <div className="size-9.5 rounded-full">
                        <Image priority={true}src="/images/placeholder.png" alt="avatar 1" width={0} height={0} className="size-full object-cover"/>
                    </div>
                </div>
            </button>
            <ul 
                className={`absolute top-10 right-0 z-50 dropdown-menu min-w-60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                role="menu"
            >
                <li className="dropdown-header gap-2">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <Image priority={true}src="/images/placeholder.png" alt="avatar" width={0} height={0} className="size-full object-cover"/>
                        </div>
                    </div>
                    <div>
                        <h6 className="text-base-content text-base font-semibold">{userData.full_name}</h6>
                        <small className="text-base-content/50">{userData.position}</small>
                    </div>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <span className="icon-[tabler--user]"></span>
                        My Profile
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <span className="icon-[tabler--settings]"></span>
                        Settings
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <span className="icon-[tabler--receipt-rupee]"></span>
                        Billing
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <span className="icon-[tabler--help-triangle]"></span>
                        FAQs
                    </a>
                </li>
                <li className="dropdown-footer gap-2">
                    <form action={logout} className="w-full">
                        <button type="submit" className="btn btn-error btn-soft btn-block">
                            <span className="icon-[tabler--logout]"></span>
                            Sign out
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    );
}
