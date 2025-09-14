import { Icon } from '@iconify/react';

export default function MenuNavigation({ isVisible }: { isVisible?: boolean }) {
    return (
        <>
            <div className="hidden md:block">
                <nav>
                    <ul className={`flex items-center justify-center gap-4 font-normal ${isVisible ? 'text-black dark:text-white' : 'text-black dark:text-orange-100'}`}>
                        <li className={`relative hover:rounded-md font-semibold ${isVisible ? 'hover:text-orange-400' : 'hover:bg-orange-400/70'}  px-4 py-2 cursor-pointer transition-colors`}>
                            <a href="#package">Layanan</a>
                        </li>
                        <li className={`relative hover:rounded-md font-semibold ${isVisible ? 'hover:text-orange-400' : 'hover:bg-orange-400/70'}  px-4 py-2 cursor-pointer transition-colors`}>
                            <a href="#reviews">Ulasan</a>
                        </li>
                        <li className={`relative hover:rounded-md font-semibold ${isVisible ? 'hover:text-orange-400' : 'hover:bg-orange-400/70'}  px-4 py-2 cursor-pointer transition-colors`}>
                            <a href="#articles">Artikel</a>
                        </li>
                        <li className={`relative hover:rounded-md font-semibold ${isVisible ? 'hover:text-orange-400' : 'hover:bg-orange-400/70'}  px-4 py-2 cursor-pointer transition-colors`}>
                            <a href="#faqs">FAQ</a>
                        </li>
                    </ul>
                </nav>
            </div>

        </>
    );
}