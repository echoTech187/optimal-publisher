"use client";
import { useEffect, useState } from "react";
import Brand from "../brand/page";
import MenuNavigation from "../navigation/page";

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
        <header className={`fixed top-0 left-0 z-50 w-full  py-4 transition-all ${isVisible ? 'bg-white backdrop-blur-md border-b border-black/5' : 'bg-white backdrop-blur-md  border-b border-white/10'}`}>
            <div className="flex items-center justify-start md:justify-between w-full max-w-[1300px] mx-auto px-4 2xl:px-0">
                <Brand isVisible={isVisible} isMobile={isMobile} />
                <MenuNavigation isVisible={isVisible} />

                <div className="md:flex items-center space-x-4 hidden">
                    <button className="py-2 px-4 rounded-md transition-colors border font-semibold border-orange-400 text-black hover:bg-gray-900 hover:border-gray-900 hover:text-orange-400">
                        Daftar
                    </button>
                    <button className={`py-2 px-4 rounded-md transition-colors font-semibold border ${isVisible ? 'bg-orange-400 border-orange-400 text-black' : 'bg-orange-400 border-orange-400 text-black'} hover:bg-gray-900 hover:border-gray-900 hover:text-orange-400`}>
                        Masuk
                    </button>
                </div>
            </div>
        </header>
    );
}