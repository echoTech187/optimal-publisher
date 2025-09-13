import Image from "next/image";
import Link from "next/link";
export default function Brand({ isVisible }: { isVisible?: boolean }) {
    return (
        <div className="text-lg font-bold flex items-center gap-2">
            <Link href="/">
                <Image src="/logo.png" alt="logo" width={100} height={80} className="h-12 w-fit" />
            </Link>
        </div>
    );
}