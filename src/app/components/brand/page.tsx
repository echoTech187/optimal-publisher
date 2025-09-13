import Image from "next/image";
export default function Brand({ isVisible }: { isVisible?: boolean }) {
    return (
        <div className="text-lg font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={100} height={80} className="h-12 w-fit" />
        </div>
    );
}