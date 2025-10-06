import { useSearchParams } from "next/navigation";
import SignInForm from "./page";
import AuthHeader from "@/app/components/header/auth";
import { use, useEffect } from "react";
export default function SignIn() {
    const router = useSearchParams();
    const callback = router.get("type");

    return (
        <>
            <div className="relative w-screen min-h-screen h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 overflow-x-hidden">
                <div className="relative w-full h-screen overflow-hidden">
                    <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-1 m-0 p-0" >
                        <source src="/videos/video-original.mp4" type="video/mp4" />
                        <source src="/videos/video-original.webm" type="video/webm" />
                        <source src="/videos/video-original.ogv" type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute w-full h-full bg-purple-900/50 z-2"></div>
                    <section className="w-full h-full ">
                        <div className="fixed right-0 top-0 z-10 max-lg:w-full w-sm md:w-sm lg:w-md xl:w-lg h-screen flex items-center justify-center overflow-x-hidden overflow-y-auto">
                            <div className="relative flex flex-col items-center justify-center bg-white/60 shadow-md backdrop-blur-2xl px-8 w-full min-h-full mx-auto py-6">
                                <AuthHeader title="Login" subtitle="Masukan username dan password untuk melakukan." />
                                <SignInForm type={callback} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </>
    )
}