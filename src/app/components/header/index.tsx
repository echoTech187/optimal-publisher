"use client";
import { useEffect, useState } from "react";
import Brand from "../brand/page";
import MenuNavigation from "../navigation/page";
import UserProfile from "../user/profile/page";

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    console.log(isLoggedIn);
    useEffect(() => {
        document.title = "Optimal Courses";
        const token = localStorage.getItem("token");
        console.log(token);
        const user = localStorage.getItem("user");
        console.log(user);
        if (token) {
            setIsLoggedIn(true);
            const userData = JSON.parse(user as string);
            setUser(userData);
        } else {
            setIsLoggedIn(false);
            setUser({});
        }
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
                {
                    isLoggedIn ?
                        <UserProfile data={user} />
                        :
                        <div className="md:flex items-center space-x-4 hidden">
                            <button onClick={() => window.open('/auth/register', '_parent')} className="py-2 px-4 rounded-md transition-colors border font-semibold border-orange-400 text-black dark:text-orange-400 hover:bg-gray-900 hover:border-gray-900 hover:text-orange-400">
                                Daftar
                            </button>
                            <button onClick={() => window.open('/auth/signin', '_parent')} className={`py-2 px-4 rounded-md transition-colors font-semibold border ${isVisible ? 'bg-orange-400 border-orange-400 text-black' : 'bg-orange-400 border-orange-400 text-black'} hover:bg-gray-900 hover:border-gray-900 hover:text-orange-400`}>
                                Masuk
                            </button>
                        </div>
                }

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

export default Header;