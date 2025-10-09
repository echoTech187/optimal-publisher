import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
export default function Brand({ isVisible, isMobile }: { isVisible?: boolean, isMobile?: boolean }) {
    return (
        <>
            <div className={`${isMobile ? 'block' : 'hidden'} flex items-center gap-2`}>
                <button className="p-2 rounded-md hover:bg-purple-600/30 transition-colors" aria-haspopup="dialog" aria-expanded="false" aria-controls="mobile-sidebar" data-overlay="#mobile-sidebar">
                    <Icon icon="mdi:menu" className='text-black' width="24" height="24" />
                </button>
                <div className={`text-lg font-bold ${isVisible ? 'text-black' : ''}`}>
                    <Link href="/" className="flex items-center gap-2">
                        <Image priority={true}src="/penerbit-logo.png" alt="logo" width={100} height={80} className="h-12 w-fit" />
                        {/* <Image priority={true}src="/Optimal.png" alt="brand" width={100} height={80} className="h-10 w-fit" /> */}
                    </Link>
                </div>
            </div>
            <div className={`text-lg font-bold ${isVisible ? 'text-black' : ''} hidden lg:block`}>
                    <Link href="/" className="flex items-center gap-2">
                        <Image priority={true}src="/penerbit-logo.png" alt="logo" width={100} height={80} className="h-12 w-fit" />
                        {/* <Image priority={true}src="/Optimal.png" alt="brand" width={100} height={80} className="h-10 w-fit" /> */}
                    </Link>
                </div>
        </>
    );
}