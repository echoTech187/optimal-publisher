'use client';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/features/auth/actions";

const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: "tabler:dashboard" },
    { href: "/dashboard/programs", label: "All Programs", icon: "tabler:books" },
    // Add other nav items here
];

const DashboardSidebar = ({ isCollapsed, toggleSidebar }: { isCollapsed: boolean, toggleSidebar: () => void }) => {
    return (
        <aside
            className={`bg-fuchsia-900 text-white min-h-screen p-4 transition-all duration-300 ease-in-out ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className="flex items-center justify-between mb-8">
                <div className={`transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden' : 'w-auto'}`}>
                    <Image src="/penerbit-logo.png" alt="Optimal Publisher Logo" width={80} height={80} className="filter grayscale brightness-0 invert" />
                </div>
                <button className="p-2" onClick={toggleSidebar} aria-label="Toggle Sidebar">
                    <Icon icon={isCollapsed ? "tabler:layout-sidebar-right-expand" : "tabler:layout-sidebar-left-collapse"} width="24" height="24" />
                </button>
            </div>
            <nav>
                <ul>
                    {navLinks.map(link => (
                        <li key={link.href} className="mb-2">
                            <Link href={link.href} className="flex items-center p-2 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon={link.icon} width="24" height="24" />
                                {!isCollapsed && <span className="ml-3">{link.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
                <ul>
                    <li className="mb-2">
                        <Link href="/dashboard/settings" className="flex items-center p-2 hover:bg-fuchsia-800 rounded-lg">
                            <Icon icon="tabler:settings" width="24" height="24" />
                            {!isCollapsed && <span className="ml-3">Settings</span>}
                        </Link>
                    </li>
                    <li className="mb-2">
                        <form action={logout} method="POST">
                            <button type="submit" className="flex items-center p-2 w-full hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:logout" width="24" height="24" />
                                {!isCollapsed && <span className="ml-3">Logout</span>}
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default DashboardSidebar;
