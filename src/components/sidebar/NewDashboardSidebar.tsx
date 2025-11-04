'use client';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types/user";

import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: "ic:round-dashboard" },
    { href: "/transactions", label: "Daftar Transaksi", icon: "ic:round-swap-horiz" },
    { href: "/hki", label: "Daftar Hak Kekayaan Intelektual", icon: "ic:round-assignment" },
    { href: "/repository", label: "Repository", icon: "ic:round-assessment" },
    { href: "/profile", label: "Profile", icon: "ic:round-person" },
    { href: "/settings", label: "Settings", icon: "ic:round-settings" },
    { href: "/logout", label: "Logout", icon: "ic:round-logout" },
];

const SidebarContent = ({ user }: { user: User }) => {
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const pathname = usePathname();

    return (
        <div className="max-w-96 bg-white p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-12">
                <a href="/dashboard" className="text-lg font-bold text-gray-800">
                <Image src="/penerbit-logo.png" alt="Optimal Publisher Logo" width={100} height={80} className="h-10 lg:h-12 w-auto object-contain" />
                </a>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src={user.avatar || "/images/placeholder.png"} alt={user.full_name} width={40} height={40} className="rounded-full" />
                        <div>
                            <div className="text-xs text-gray-500">{dateString.toUpperCase().replace(/, \d{4}/, '')}</div>
                            <div className="font-bold text-sm lg:text-lg text-gray-800">Welcome back,</div>
                            <div className="font-bold text-sm lg:text-lg text-gray-800">{user.full_name}!</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full hover:bg-gray-200">
                            <Icon icon="ph:moon-bold" className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>

            <nav className="flex-grow">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.href} className="mb-1">
                            <Link href={link.href} className={`flex items-center gap-3 p-3 rounded-lg text-base transition-colors font-semibold ${
                                pathname === link.href ? 'bg-fuchsia-100 text-fuchsia-800/60' : 'text-gray-500 hover:bg-gray-100'
                            }`}>
                                <Icon icon={link.icon} className="w-6 h-6" />
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            
        </div>
    );
};

const NewDashboardSidebar = ({ user, isOpen, onClose }: { user: User, isOpen: boolean, onClose: () => void }) => {
    return (
        <>
            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 bg-black/30 z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <div className={`fixed top-0 left-0 z-50 h-full transform transition-transform lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent user={user} />
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <SidebarContent user={user} />
            </div>
        </>
    );
}

export default NewDashboardSidebar;
