import Image from "next/image";

export default function FullPageLoader() {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-white/20 backdrop-blur-3xl shadow-xl z-50 flex justify-center items-center">
            <Image src="/penerbit-logo.png" alt="logo" width={200} height={100} priority={true} className="animate-pulse w-24" />
        </div>
    );
}
