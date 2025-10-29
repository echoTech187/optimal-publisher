import Image from "next/image";
import AuthHeader from "@/components/header/auth";
import { getSession } from "@/features/auth/session";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";
import { Suspense } from "react";

async function SignInContent({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const session = await getSession();
    if (session) {
        const raw = searchParams['redirectedFrom'];
        const redirectedFrom = Array.isArray(raw) ? raw[0] : raw;
        redirect(redirectedFrom || "/");
    }

    return (
        <div className="relative w-screen min-h-screen h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 overflow-x-hidden">
            <div className="relative w-full h-screen overflow-hidden">
                <Image priority={true} src="/images/1.png" alt="Underline" width={2000} height={0} className="absolute left-0 top-0 h-screen z-1 object-cover" />
                <div className="absolute w-full h-full bg-purple-900/50 z-2"></div>
                <section className="w-full h-full">
                    <div className="fixed right-0 top-0 z-10 max-lg:w-full w-sm md:w-sm lg:w-md xl:w-lg h-screen flex items-center justify-center overflow-hidden">
                        <div className="flex flex-col items-center justify-center bg-white/80 shadow-md backdrop-blur-2xl px-8 w-full h-full mx-auto py-6 overflow-y-auto hidden-scroll">
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
        <Suspense fallback={<div>Loading...</div>}>
            <SignInContent searchParams={searchParams} />
        </Suspense>
    );
}