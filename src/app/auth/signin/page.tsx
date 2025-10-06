"use client";
import SignInForm from "./SignInForm.jsx";
import AuthHeader from "@/app/components/header/auth";
import Alert, { useAlert } from "@/app/ui/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuthentication } from "@/utils/authentication";
import { signInAction } from "@/app/api/auth";
import Image from "next/image";
export default function SignIn() {
    const navigation = useRouter();
    const params = useSearchParams();
    const type = params.get("type");
    const eventType = params.get("event");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { alertProps, showAlert, closeAlert } = useAlert();
    useEffect(() => {
        document.title = "Sign In";
        const authStatus = checkAuthentication();
        if (authStatus) navigation.push("/");
    }, []);
    async function signInHandler(event: any) {
        event.preventDefault();
        setIsSubmitted(true);

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const response = await signInAction(data);
        console.log(response);
        if (response.status === 200) {
            handleSuccessfulLogin(response.message);
        } else {
            showAlert({
                type: 'error',
                title: 'Login Gagal!',
                message: response.message,
                onCloseCallback: () => {
                    closeAlert();

                }
            });
            setIsSubmitted(false);
        }

    }
    function handleSuccessfulLogin(message: string) {
        // Perform state update here
        showAlert({
            type: 'success',
            title: 'Login Berhasil!',
            message: message,
            onCloseCallback: () => {
                setTimeout(() => {
                    setIsSubmitted(false);
                    if (type === "null") {
                        navigation.push("/optimal/dashboard");
                    } else if (type === "event") {
                        navigation.push("/event/" + eventType);
                    } else {
                        navigation.push("/program");
                    }
                }, 0)

            }
        })
    }
    return (
        <>
            <div className="relative w-screen min-h-screen h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 overflow-x-hidden">
                <div className="relative w-full h-screen overflow-hidden">
                    <Image src="/images/1.png" alt="Underline" width={2000} height={0} className="absolute left-1/2 -translate-x-1/2 top-1 mx-auto h-auto w-1/4 mt-9 z-1" />
                    <div className="absolute w-full h-full bg-purple-900/50 z-2"></div>
                    <section className="w-full h-full ">
                        <div className="fixed right-0 top-0 z-10 max-lg:w-full w-sm md:w-sm lg:w-md xl:w-lg h-screen flex items-center justify-center overflow-x-hidden overflow-y-auto">
                            <div className="relative flex flex-col items-center justify-center bg-white/60 shadow-md backdrop-blur-2xl px-8 w-full h-full mx-auto py-6">
                                <AuthHeader title="Login" subtitle="Masukan username dan password untuk melakukan." />
                                <form onSubmit={signInHandler} id="loginForm" name="loginForm" method="post" className="max-w-sm mx-auto w-full h-full">
                                    <SignInForm />
                                    <div className="flex items-center justify-between">
                                        <button type="submit" className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            {
                                                isSubmitted ?
                                                    <>
                                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                        <span className="ml-2">Loading...</span>
                                                    </>
                                                    :
                                                    <>
                                                        <span>Login</span>
                                                    </>
                                            }
                                        </button>
                                    </div>
                                </form>
                                <div className="w-full h-12 flex items-center justify-center gap-1">
                                    Belum memiliki akun? <a href={`/auth/register?type=${type}`} className="text-fuchsia-800 hover:text-fuchsia-700">Daftar disini</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Alert {...alertProps} />
        </>
    )
}