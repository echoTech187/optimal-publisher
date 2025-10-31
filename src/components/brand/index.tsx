import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function Brand({ onMenuClick }: { onMenuClick?: () => void }) {
    return (
        <div className="flex items-center gap-2">
            <button 
                className="p-2 rounded-md hover:bg-purple-600/30 transition-colors block lg:hidden" 
                aria-label="Open menu"
                onClick={onMenuClick}
            >
                <Icon icon="mdi:menu" className='text-black dark:text-white' width="24" height="24" />
            </button>
            <Link href="/" className="flex items-center gap-2">
                <Image priority={true} src="/penerbit-logo.png" alt="logo" width={100} height={80} className="h-10 lg:h-12 w-fit" />
            </Link>
        </div>
    );
}