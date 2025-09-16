"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Brand from "../brand/page";
import { useState } from "react";

export default function MobileSidebar() {
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
                        <button onClick={() => window.open('https://wa.link/gkfaqz', '_blank')} className="max-sm:fixed max-sm:bottom-4 max-sm:right-6 max-sm:z-50 max-sm:w-[50px] max-sm:h-[50px] flex items-center justify-center gap-2 max-md:px-4 min-md:px-4 bg-green-800 rounded-full py-2 font-semibold text-white hover:bg-green-900 cursor-pointer transition ease-in-out duration-300 whitespace-nowrap">
                            <Icon icon="tabler:brand-whatsapp" className="size-5" />
                            <span className="max-sm:hidden text-sm">WhatsApp Kami</span>
                        </button>
                    </div>
                </div>
            </div>

        </aside>
    )
}