"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brand from "../brand";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/types/user";
import { logout } from "@/features/auth/actions";

const MobileSidebar = ({ user, isOpen, onClose }: { user: User, isOpen: boolean, onClose: () => void }) => {


    const navLinks = [
        { href: "/", label: "Beranda", icon: "tabler:home" },
        { href: "/#book", label: "Buku", icon: "tabler:book" },
        { href: "/#services", label: "Layanan", icon: "tabler:hand-rock" },
        { href: "/#news-events", label: "Berita & Acara", icon: "tabler:news" },
        { href: "/#contacts", label: "Hubungi Kami", icon: "tabler:phone" },
    ];

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 w-72 h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-xl transform transition-transform md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <Brand />
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose} aria-label="Close">
                        <Icon icon="mdi:close" width="24" height="24" />
                    </button>
                </div>

                <div className="flex flex-col h-[calc(100%-65px)]">

                    {user ? (
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/placeholder.png" alt={`Avatar ${user.full_name}`} width={40} height={40} className="rounded-full" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{user.full_name}</span>
                                        <span className="text-xs text-gray-600 dark:text-gray-300">{user?.institution?.name}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : null
                    }

                    <div className="p-4 flex-grow">
                        <nav>
                            <ul className="space-y-2">
                                {navLinks.map(link => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="flex items-center gap-3 p-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>
                                            <Icon icon={link.icon} className="w-6 h-6" />
                                            <span>{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    {
                        user ? (
                            <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700">
                                <form action={logout}>
                                    <button type="submit" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2" aria-label="Logout">
                                        <Icon icon="tabler:logout" className="w-6 h-6 text-gray-600 dark:text-gray-300" /> Keluar
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2 p-4">
                                <Link href="/signin" className="text-center p-3 rounded-lg text-sm font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Login</Link>
                                <Link href="/register" className="text-center p-3 rounded-lg text-sm font-semibold bg-fuchsia-800 text-white hover:bg-fuchsia-700">Register</Link>
                            </div>
                        )
                    }


                </div>
            </aside>
        </>
    );
}

const DashboardSidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <aside
                className={`bg-fuchsia-900 text-white w-64 min-h-screen p-4 fixed top-0 left-0 z-40 transform transition-transform lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between mb-8">
                    <Image src="/penerbit-logo.png" priority={true} alt="Optimal Publisher Logo" width={80} height={80} className="filter grayscale brightness-0 invert" />
                    <button className="lg:hidden p-2" onClick={onClose} aria-label="Close">
                        <Icon icon="tabler:x" width="24" height="24" />
                    </button>
                </div>
                <nav>
                    <ul>
                        <li className="mb-2">
                            <Link href="/dashboard" className="flex items-center p-2 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:dashboard" width="24" height="24" />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="#" className="flex items-center p-2 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:books" width="24" height="24" />
                                <span className="ml-3">All Programs</span>
                            </Link>
                        </li>
                        {/* Add other nav items here */}
                    </ul>
                </nav>
                <div className="absolute bottom-4 left-4 right-4">
                    <ul>
                        <li className="mb-2">
                            <Link href="#" className="flex items-center p-2 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:settings" width="24" height="24" />
                                <span className="ml-3">Settings</span>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <form action="/logout" method="POST">
                                <button type="submit" className="flex items-center p-2 w-full hover:bg-fuchsia-800 rounded-lg">
                                    <Icon icon="tabler:logout" width="24" height="24" />
                                    <span className="ml-3">Logout</span>
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export { MobileSidebar, DashboardSidebar }