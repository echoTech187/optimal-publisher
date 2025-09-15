"use client";
import { useEffect, useState } from "react";
import Brand from "../brand/page";
import MenuNavigation from "../navigation/page";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Header() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        document.title = "Optimal Courses";
        function handleResize() {
            setIsMobile(window.innerWidth <= 640);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > window.innerHeight * 0.5) {
                isVisible || setIsVisible(true);
            } else {
                isVisible && setIsVisible(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isVisible]);
    return (
        <header className={`fixed top-0 left-0 z-50 w-full  py-4 transition-all ${isVisible ? 'bg-white dark:bg-black/20 backdrop-blur-md border-b border-black/5' : 'bg-white dark:bg-black/40 backdrop-blur-md  border-b border-white/10'}`}>
            <div className="flex items-center justify-start md:justify-between w-full max-w-[1300px] mx-auto px-4 2xl:px-0">
                <Brand isVisible={isVisible} isMobile={isMobile} />
                <MenuNavigation isVisible={isVisible} />

                <div className="px-4">
            <button onClick={() => window.open('https://wa.link/gkfaqz', '_blank')} className="max-sm:fixed max-sm:bottom-4 max-sm:right-6 max-sm:z-50 max-sm:w-[50px] max-sm:h-[50px] flex items-center justify-center gap-2 max-md:px-4 min-md:px-4 bg-green-800 rounded-full py-2 font-semibold text-white hover:bg-green-900 cursor-pointer transition ease-in-out duration-300 whitespace-nowrap">
                <Icon icon="tabler:brand-whatsapp" className="size-5" />
                <span className="max-sm:hidden text-sm">WhatsApp Kami</span>
            </button>
        </div>

            </div>
        </header>
    );
}