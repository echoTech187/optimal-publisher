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
                            <a href="/">Beranda</a>
                        </li>
                        <li>
                            <a href="/#book">Buku</a>
                        </li>
                        <li>
                            <a href="/#package">Layanan</a>
                        </li>
                        {/* <li>
                            <a href="/#reviews">Ulasan</a>
                        </li> */}
                        <li>
                            <a href="/#news-events">Berita & Acara</a>
                        </li>
                        {/* <li>
                            <a href="/#articles">Artikel</a>
                        </li> */}
                        {/* <li>
                            <a href="/#faqs">FAQs</a>
                        </li> */}
                        <li>
                            <a href="/#contact">Hubungi Kami</a>
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
const DashboardSidebar = () => {
    return (<>
        <div className="relative h-screen max-lg:w-0 w-96 bg-gradient-to-r from-gray-200 to-white backdrop-blur-xl dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
            <aside id="collapsible-sidebar" className="overlay bg-transparent border-none text-white [--body-scroll:true] border-base-content/20 overlay-open:translate-x-0 drawer drawer-start sm:overlay-layout-open:translate-x-0 hidden w-full border-e [--auto-close:sm] [--is-layout-affect:true] [--opened:lg] sm:absolute sm:z-0 sm:flex sm:shadow-none lg:[--overlay-backdrop:false]" role="dialog" tabIndex={-1} >
                <div className="drawer-header p-4">
                    <div className={`text-lg font-bold`}>
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/penerbit-logo.png" alt="logo" width={100} height={80} className="h-12 w-fit" />
                        </Link>
                    </div>
                    <button className="btn btn-sm overlay-close lg:hidden" aria-label="Close" type="button">
                        <Icon icon="tabler:x" width="24" height="24" />
                    </button>
                </div>
                <div className="drawer-body p-4">
                    <ul className="menu p-0">
                        <li>
                            <a href="#">
                                <Icon icon="tabler:home" width="24" height="24" />
                                Beranda
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Icon icon="tabler:books" width="24" height="24" />
                                Repositori
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Icon icon="tabler:wallet" width="24" height="24" />
                                Riwayat Pembayaran
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Icon icon="tabler:shopping-cart" width="24" height="24" />
                                Riwayat Pesanan
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Icon icon="tabler:settings" width="24" height="24" />
                                Pengaturan
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <Icon icon="tabler:logout" width="24" height="24" />
                                Keluar
                            </a>
                        </li>
                    </ul>
                    
                </div>
                <div className="drawer-footer justify-center p-4">
                    <div className="bg-base-200/30 border-base-content/10 rounded-md border p-3">
                        <div className="avatar avatar-placeholder">
                            <div className="bg-neutral text-neutral-content w-10 rounded-full">
                                <span className="icon-[tabler--crown] size-6 shrink-0"></span>
                            </div>
                        </div>
                        <h5 className="text-base-content mt-4 text-lg font-semibold">Upgrade to Pro</h5>
                        <p className="text-base-content/80 text-xs">Reminder, extra projects, advanced search and more</p>
                        <button className="btn btn-primary btn-block mt-2">Upgrade Now</button>
                    </div>
                </div>
            </aside>
        </div>

    </>)
}

export { MobileSidebar, DashboardSidebar }