"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brand from "../brand";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <aside id="mobile-sidebar" className={`fixed top-0 left-0 z-140 md:hidden h-screen overlay [--body-scroll:true] border-base-content/20 overlay-open:translate-x-0 drawer drawer-start sm:overlay-layout-open:translate-x-0 hidden w-full border-e [--auto-close:sm] [--is-layout-affect:true] [--opened:lg] sm:absolute sm:z-0 sm:flex sm:shadow-none lg:[--overlay-backdrop:false] ${isOpen ? 'block' : 'hidden'}`}>
            <div className="drawer-header">
                <Brand isVisible={true} isMobile={false} />
                <button className="btn btn-circle btn-sm overlay-close lg:hidden" aria-label="Close" type="button" onClick={handleCloseSidebar}>
                    <Icon icon="mdi:close" width="24" height="24" />
                </button>
            </div>
            <div className="drawer-body px-2 h-full">
                <nav>
                    <ul className="menu" onClick={handleCloseSidebar}>
                        <li>
                            <Link href="/">Beranda</Link>
                        </li>
                        <li>
                            <Link href="/#book">Buku</Link>
                        </li>
                        <li>
                            <Link href="/#package">Layanan</Link>
                        </li>
                        {/* <li>
                            <a href="/#reviews">Ulasan</a>
                        </li> */}
                        <li>
                            <Link href="/#news-events">Berita & Acara</Link>
                        </li>
                        {/* <li>
                            <a href="/#articles">Artikel</a>
                        </li> */}
                        {/* <li>
                            <a href="/#faqs">FAQs</a>
                        </li> */}
                        <li>
                            <Link href="/#contact">Hubungi Kami</Link>
                        </li>
                    </ul>
                </nav>
                <div className="drawer-footer fixed bottom-0 left-0 justify-start border-t border-base-content/20 w-full">
                    <div className="px-4">
                        <button onClick={() => window.open('https://wa.link/gkfaqz', '_parent')} className="max-sm:fixed max-sm:bottom-4 max-sm:right-6 max-sm:z-50 max-sm:w-[50px] max-sm:h-[50px] flex items-center justify-center gap-2 max-md:px-4 min-md:px-4 bg-green-800 rounded-full py-2 font-semibold text-white hover:bg-green-900 cursor-pointer transition ease-in-out duration-300 whitespace-nowrap">
                            <Icon icon="tabler:brand-whatsapp" className="size-5" />
                            <span className="max-sm:hidden text-sm">WhatsApp Kami</span>
                        </button>
                    </div>
                </div>
            </div>

        </aside>
    )
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
                className={`bg-fuchsia-900 text-white w-64 min-h-screen p-4 fixed top-0 left-0 z-40 transform transition-transform lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0 w-full md:w-1/2 lg:w-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between mb-8">
                    <Image src="/penerbit-logo.png" alt="Optimal Publisher Logo" width={80} height={80} className="filter grayscale brightness-0 invert" />
                    <button className="lg:hidden" onClick={onClose}>
                        <Icon icon="tabler:x" width="24" height="24" />
                    </button>
                </div>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <Link href="/dashboard" className="flex items-center p-2 active:bg-fuchsia-800 *:active:bg-fuchsia-800 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:dashboard" width="24" height="24" />
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="flex items-center p-2  active:bg-fuchsia-800 *:active:bg-fuchsia-800 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:books" width="24" height="24" />
                                <span className="ml-3">All Programs</span>
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="flex items-center p-2  active:bg-fuchsia-800 *:active:bg-fuchsia-800 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:message-circle" width="24" height="24" />
                                <span className="ml-3">Messages</span>
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="flex items-center p-2  active:bg-fuchsia-800 *:active:bg-fuchsia-800 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:users" width="24" height="24" />
                                <span className="ml-3">Friends</span>
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link href="#" className="flex items-center p-2  active:bg-fuchsia-800 *:active:bg-fuchsia-800 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:calendar" width="24" height="24" />
                                <span className="ml-3">Schedule</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-4 w-[calc(100%-32px)]">
                    <ul>
                        <li className="mb-4 w-full">
                            <Link href="#" className="flex items-center p-2  active:bg-fuchsia-800 *:active:bg-fuchsia-800 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:settings" width="24" height="24" />
                                <span className="ml-3">Settings</span>
                            </Link>
                        </li>
                        <li className="mb-4 w-full">
                            <Link href="#" className="flex items-center p-2  active:bg-fuchsia-800 *:active:bg-fuchsia-800 hover:bg-fuchsia-800 rounded-lg">
                                <Icon icon="tabler:logout" width="24" height="24" />
                                <span className="ml-3">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export { MobileSidebar, DashboardSidebar }