import Image from "next/image";
import { Suspense } from "react";
import AuthHeader from "@/components/header/auth";
import FullPageLoader from "@/components/ui/FullPageLoader";
import SignInForm from "./SignInForm";
import { getSession } from "@/features/auth/session";
import { redirect } from "next/navigation";

async function SignInContent({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await getSession();
    if (session) {
        const raw = searchParams['redirectedFrom'];
        const redirectedFrom = Array.isArray(raw) ? raw[0] : raw;
        redirect(redirectedFrom || "/");
    }

    return (
        <div className="relative w-screen min-h-screen h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 overflow-x-hidden">
            <div className="relative w-full h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center ">
                <Image priority={true} src="/images/1.png" alt="Background" width={2000} height={1000} className="absolute left-0 top-0 h-screen w-screen z-1 object-cover" />
                <div className="max-lg:absolute left-0 top-0 w-full h-full relative lg:col-span-1 xl:col-span-2">
                    
                    <div className="absolute top-0 left-0 h-full w-full bg-purple-900/50 z-2 flex flex-col gap-12 items-center justify-center p-12">
                        <h2 className="text-2xl lg:text-3xl xl:text-4xl text-white text-center font-bold">
                            Karyamu Layak Mendapat Pengakuan Resmi
                        </h2>
                        <p className="text-lg lg:text-xl xl:text-2xl text-white text-center font-medium">
                            "Dapatkan ISBN, ISSN, dan perlindungan HKI dengan proses cepat dan mudah. Kami pastikan setiap ide dan tulisanmu terlindungi secara hukum dan siap diterbitkan secara profesional"
                        </p>
                    </div>
                </div>
                <section className="w-full h-full col-span-1 lg:col-span-1  relative">
                    <div className="absolute top-0 right-0 z-20 w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center justify-start bg-white/80  backdrop-blur-2xl px-8 w-full h-full mx-auto py-6 overflow-y-auto">
                            <AuthHeader title="Login" subtitle="Selamat datang kembali." />
                            <SignInForm />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function SignInPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return (
        <Suspense fallback={<FullPageLoader />}>
            <SignInContent searchParams={searchParams} />
        </Suspense>
    );
}