
import Image from "next/image";
import AuthHeader from "@/components/header/auth";
import { isAuthenticated } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm"; // We will put the form logic here

// This is now an async Server Component
export default async function SignInPage() {
    // 1. Check authentication on the server
    const authenticated = await isAuthenticated();
    if (authenticated) {
        // 2. If logged in, redirect on the server before rendering
        redirect("/optimal/dashboard");
    }

    // 3. If not logged in, render the page with the client component form
    return (
        <>
            <div className="relative w-screen min-h-screen h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 overflow-x-hidden">
                <div className="relative w-full h-screen overflow-hidden">
                    <Image src="/images/1.png" alt="Underline" width={2000} height={0} className="absolute left-0 top-0 h-screen z-1 object-cover" />
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
        </>
    );
}
