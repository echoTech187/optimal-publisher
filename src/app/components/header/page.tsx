"use client";
import { useEffect, useState } from "react";
import Brand from "../brand/page";
import MenuNavigation from "../navigation/page";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Image from "next/image";
import UserProfile from "../user/profile/page";

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        document.title = "Optimal Courses";
        function handleResize() {
            setIsMobile(window.innerWidth <= 1023);
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
            <div className="flex items-center justify-start sm:justify-between w-full max-w-[1300px] mx-auto px-4 2xl:px-0">
                <Brand isVisible={isVisible} isMobile={isMobile} />
                <MenuNavigation isVisible={isVisible} />

                 <div className="md:flex items-center space-x-4 hidden">
                    <button onClick={() => window.open('/auth/register', '_parent')} className="py-2 px-4 rounded-md transition-colors border font-semibold border-orange-400 text-black dark:text-orange-400 hover:bg-gray-900 hover:border-gray-900 hover:text-orange-400">
                        Daftar
                    </button>
                    <button onClick={() => window.open('/auth', '_parent')} className={`py-2 px-4 rounded-md transition-colors font-semibold border ${isVisible ? 'bg-orange-400 border-orange-400 text-black' : 'bg-orange-400 border-orange-400 text-black'} hover:bg-gray-900 hover:border-gray-900 hover:text-orange-400`}>
                        Masuk
                    </button>
                </div>
                {/* <div className="px-4">
                    <button onClick={() => window.open('https://wa.link/gkfaqz', '_parent')} className="max-sm:fixed max-sm:bottom-4 max-sm:right-6 max-sm:z-50 max-sm:w-[50px] max-sm:h-[50px] flex items-center justify-center gap-2 max-md:px-4 min-md:px-4 bg-green-800 rounded-full py-2 font-semibold text-white hover:bg-green-900 cursor-pointer transition ease-in-out duration-300 whitespace-nowrap">
                        <Icon icon="tabler:brand-whatsapp" className="size-5" />
                        <span className="max-sm:hidden text-sm">WhatsApp Kami</span>
                    </button>
                </div> */}

            </div>
        </header>
    );
}
const DashboardHeader = () => {
    return (
        <header className="w-full py-4 transition-all bg-white dark:bg-black/20 backdrop-blur-md border-b border-black/5">
            <div className="flex items-center justify-between lg:justify-end w-full px-4">
                <UserProfile />
            </div>
        </header>
    );
}
const AuthHeader = ({ title, subtitle }: { title?: string, subtitle?: string }) => {
    return (
        <header className="relative w-full  py-4 transition-all mt-8">
            <div className="flex flex-col items-center justify-start sm:justify-between w-full max-w-[1300px] mx-auto">
                <div className={`text-lg font-bold mb-6`}>
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/penerbit-logo.png" alt="logo" width={100} height={80} className="h-18 w-fit" />
                    </Link>
                </div>
                <h2 className="text-5xl anton font-extrabold text-center leading-relaxed">{title}</h2>
                <p className=" mb-4">{subtitle}</p>
            </div>
        </header>
    );
}
export { Header, DashboardHeader, AuthHeader };