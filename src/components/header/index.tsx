"use client";
import { useEffect, useState } from "react";
import Brand from "../brand";
import MenuNavigation from "../navigation";
import UserProfile from "../user/profile";

import { User } from "@/types/user";



const Header = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = "Optimal Penerbit";
        const fetchSession = async () => {
            try {
                const res = await fetch('/api/auth/session');
                const data = await res.json();
                setIsLoggedIn(data.isLoggedIn);
                setUser(data.user);
                setIsLoading(false);
            } catch (error) {
                setIsLoggedIn(false);
                setUser(null);
                setIsLoading(false);
            }
        };

        fetchSession();

        
        function handleResize() {
            setIsMobile(window.innerWidth <= 1023);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > window.innerHeight * 0.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            
        };
        
    }, []); 
    
    return (
        <header className={`fixed top-0 left-0 z-50 w-full  py-4 transition-all ${isVisible ? 'bg-white dark:bg-black/20 backdrop-blur-md border-b border-black/5' : 'bg-white dark:bg-black/40 backdrop-blur-md  border-b border-white/10'}`}>
            <div className="flex items-center justify-between w-full container mx-auto px-4 2xl:px-0">
                <Brand isVisible={isVisible} isMobile={isMobile} />
                <MenuNavigation isVisible={isVisible} />
                {!isLoading && (
                    isLoading ? (
                        <div className="">
                            <div className="size-9.5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                        </div>
                    ) : isLoggedIn && user ? (
                        <UserProfile user={user} />
                    ) : (
                        <div className="md:flex items-center space-x-4 hidden">
                            <button onClick={() => window.open('/register', '_parent')} className="py-2 px-4 rounded-md transition-colors border font-semibold border-orange-400 text-black dark:text-orange-400 hover:bg-gray-900 hover:border-gray-900 hover:text-orange-400">
                                Daftar
                            </button>
                            <button onClick={() => window.open('/signin', '_parent')} className={`py-2 px-4 rounded-md transition-colors font-semibold border ${isVisible ? 'bg-orange-400 border-orange-400 text-black' : 'bg-orange-400 border-orange-400 text-black'} hover:bg-gray-900 hover:border-gray-900 hover:text-orange-400`}>
                                Masuk
                            </button>
                        </div>
                    ))
                }
            </div>
        </header>
    );
}


export default Header;