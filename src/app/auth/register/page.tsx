"use client";
import AuthHeader from "@/app/components/header/auth";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import { PersonalInformation, Institution, TermsAndConditions } from "./form";
import { useRouter, useSearchParams } from "next/navigation";
import { baseUrl } from "@/app/constants/api";
import Alert, { useAlert } from '@/app/ui/Alert';
import { HSStepper } from "flyonui/flyonui";
import { checkAuthentication } from "@/utils/authentication";
import Image from "next/image";

declare global {
    interface Window {
        HSStepper: typeof HSStepper
    }
}


export default function RegisterForm() {
    const navigation = useRouter();

    const router = useSearchParams();
    const type = router.get("type");
    const eventType = router.get("event");
    const { alertProps, showAlert, closeAlert } = useAlert();
    const [finalValidate, setFinalValidate] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [institution, setInstitution] = useState([]);
    const [major, setMajor] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isFetched = useRef(false);
    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;
        document.title = "Register";
        const authStatus = checkAuthentication();
        if (authStatus) navigation.push("/");
        setTimeout(() => {
            if (window.HSStepper) {
                window.HSStepper.autoInit();
            }
        }, 100);
        async function getInstitution() {
            const inst = await fetch(baseUrl() + "/institutions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await inst.json();
            setInstitution(data);

        }
        async function getMajor() {
            const maj = await fetch(baseUrl() + "/majors", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await maj.json();
            setMajor(data);
        }
        getMajor();
        getInstitution();
        if (institution && major) {
            setIsLoading(false);
        }
    }, [])

    async function signUpHandler(event: any) {
        setIsSubmitted(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        const finalBtn = document.querySelector('[data-stepper-finish-btn]');
        finalBtn?.removeAttribute('style');
        try {
            const response = await fetch(baseUrl() + `/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(response);
            const result = await response.json();
            console.log(result);

            if (result.code === 200) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("exprires_in", Date.now() + result.exprires_in);
                handleSuccessfulRegistration(result);
            } else {

                showAlert({
                    type: 'error',
                    title: 'Registrasi Gagal!',
                    message: result.message,
                    onCloseCallback: () => {
                        closeAlert();

                    }
                });
                setIsSubmitted(false);
            }
        } catch (error: any) {
            showAlert({
                type: 'error',
                title: 'Registrasi Gagal!',
                message: error.message,
                onCloseCallback: () => {
                    closeAlert();
                }
            });
            setIsSubmitted(false);
        }
    }
    function handleSuccessfulRegistration(result: any) {
        // Perform state update here
        showAlert({
            type: 'success',
            title: 'Registrasi Berhasil!',
            message: result.message,
            onCloseCallback: () => {
                closeAlert();
                setIsSubmitted(false);
                setTimeout(() => {
                    closeAlert();
                    setIsSubmitted(false);
                    if (type === "null") {
                        navigation.push("/optimal/dashboard");
                    } else if (type === "event") {
                        navigation.push("/event/" + eventType);
                    } else {
                        navigation.push("/program");
                    }
                })

            }
        })
    }

    if (isLoading)
        return (
            <>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-white z-50 dark:bg-gray-800 dark:text-gray-50 overflow-hidden">Loading...</div>

            </>
        )
    return (
        <>
            <div className="relative w-screen min-h-screen h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 overflow-x-hidden">
                <div className="relative w-full h-screen overflow-hidden">
                    <Image src="/images/1.png" alt="Underline" width={2000} height={0} className="absolute left-0 top-0 h-screen z-1 object-cover" />
                    <div className="absolute w-full h-full bg-purple-900/50 z-2"></div>
                    <section className="w-full h-full">
                        <div className="fixed right-0 top-0 z-10 max-lg:w-full w-sm md:w-sm lg:w-md xl:w-lg h-screen flex items-center justify-center overflow-hidden">
                            <div className="flex flex-col items-center justify-center bg-white/80 shadow-md backdrop-blur-2xl px-8 w-full h-full mx-auto py-6 overflow-y-auto hidden-scroll">
                                <AuthHeader title="Registrasi" subtitle="Buat akun baru anda." />
                                <div data-stepper="" className="flex w-full items-start gap-10 rounded-lg p-4 shadow-none max-sm:flex-wrap max-sm:justify-center" id="wizard-validation" >
                                    <ul className="relative flex flex-col gap-2 md:flex-row hidden">
                                        <li className="group flex flex-1 flex-col items-center gap-2 md:flex-row" data-stepper-nav-item='{ "index": 1 }'>
                                            <span className="min-h-7.5 min-w-7.5 inline-flex flex-col items-center gap-2 align-middle text-sm md:flex-row">
                                                <span className="stepper-active:text-bg-primary stepper-active:shadow-sm shadow-base-300/20 stepper-success:text-bg-primary stepper-success:shadow-sm stepper-completed:text-bg-success stepper-error:text-bg-error text-bg-soft-neutral flex size-7.5 shrink-0 items-center justify-center rounded-full font-medium" >
                                                    <span className="stepper-success:hidden stepper-error:hidden stepper-completed:hidden text-sm">1</span>
                                                    <span className="icon-[tabler--check] stepper-success:block hidden size-4 shrink-0"></span>
                                                    <span className="icon-[tabler--x] stepper-error:block hidden size-4 shrink-0"></span>
                                                </span>
                                                <span className="text-base-content text-nowrap font-medium">Account Details</span>
                                            </span>
                                            <div
                                                className="stepper-success:bg-primary stepper-completed:bg-success bg-base-content/20 h-px w-full group-last:hidden max-md:mt-2 max-md:h-8 max-md:w-px md:flex-1"
                                            ></div>
                                        </li>
                                        <li className="group flex flex-1 flex-col items-center gap-2 md:flex-row" data-stepper-nav-item='{ "index": 2 }'>
                                            <span className="min-h-7.5 min-w-7.5 inline-flex flex-col items-center gap-2 align-middle text-sm md:flex-row">
                                                <span className="stepper-active:text-bg-primary stepper-active:shadow-sm shadow-base-300/20 stepper-success:text-bg-primary stepper-success:shadow-sm stepper-completed:text-bg-success stepper-error:text-bg-error text-bg-soft-neutral flex size-7.5 shrink-0 items-center justify-center rounded-full font-medium" >
                                                    <span className="stepper-success:hidden stepper-error:hidden stepper-completed:hidden text-sm">2</span>
                                                    <span className="icon-[tabler--check] stepper-success:block hidden size-4 shrink-0"></span>
                                                    <span className="icon-[tabler--x] stepper-error:block hidden size-4 shrink-0"></span>
                                                </span>
                                                <span className="text-base-content text-nowrap font-medium">Personal Info</span>
                                            </span>
                                            <div className="stepper-success:bg-primary stepper-completed:bg-success bg-base-content/20 h-px w-full group-last:hidden max-md:mt-2 max-md:h-8 max-md:w-px md:flex-1" ></div>
                                        </li>
                                    </ul>

                                    <form onSubmit={signUpHandler} method="post" className="max-w-sm mx-auto w-full needs-validation peer" id="wizard-validation-form" noValidate>
                                        <div id="account-details-validation" className="space-y-5" data-stepper-content-item='{ "index": 1 }'>
                                            <PersonalInformation setIsValid={setIsValidated} />
                                        </div>
                                        <div id="personal-info-validation" className="space-y-5" data-stepper-content-item='{ "index": 2 ,"isFinal": true }' style={{ display: "none" }} >
                                            <Institution type={type} setIsValid={setFinalValidate} institution={institution} major={major} />
                                        </div>
                                        <div className="mt-5 flex items-center justify-between gap-x-2">
                                            <button type="button" className="btn btn-prev hidden" data-stepper-back-btn="">
                                                <Icon icon="tabler:chevron-left" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />
                                                <span className="">Kembali</span>
                                            </button>
                                            <button type="button" className={`btn btn-next w-full justify-between rounded-sm `} disabled={isValidated ? false : true} data-stepper-next-btn="">
                                                <span className="">Lanjutkan</span>
                                                <Icon icon="tabler:chevron-right" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />
                                            </button>
                                            <button type="submit" data-stepper-finish-btn={""} style={{ display: "none" }} disabled={finalValidate && !isSubmitted ? false : true} className="btn justify-center rounded-sm w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 border-none outline-none shadow-outline focus:outline-none focus:shadow-outline">
                                                {
                                                    isSubmitted ?
                                                        <>
                                                            <Icon icon="tabler:loader-2" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180 animate-spin" />
                                                            <span className="">Loading...</span>
                                                        </>
                                                        : <>
                                                            <Icon icon="tabler:send" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />
                                                            <span className="">Daftar</span>
                                                        </>
                                                }

                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="w-full h-12 flex items-center justify-center gap-1">
                                    Sudah punya akun? <a href={`/auth/signin?type=${type}`} className="text-fuchsia-800 hover:text-fuchsia-700">Login disini</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >

            </div >
            <Alert {...alertProps} />
        </>
    );
}