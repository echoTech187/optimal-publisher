import Link from "next/link";
import Image from "next/image";

const AuthHeader = ({ title, subtitle }: { title?: string, subtitle?: string }) => {
    return (
        <header className="relative w-full  py-4 transition-all mt-8">
            <div className="flex flex-col items-center justify-start sm:justify-between w-full container mx-auto">
                <div className={`text-lg font-bold mb-6`}>
                    <Link href="/" className="flex items-center gap-2">
                        <Image priority={true} src="/penerbit-logo.png" alt="Logo Optimal Publisher" width={100} height={80} className="h-18 w-fit" />
                    </Link>
                </div>
                <h2 className="text-5xl anton font-extrabold text-center leading-relaxed">{title}</h2>
                <p className=" mb-4">{subtitle}</p>
            </div>
        </header>
    );
}

export default AuthHeader