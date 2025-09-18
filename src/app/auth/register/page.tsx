"use client";
import { AuthHeader } from "@/app/components/header/page";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { PersonalInformation, Institution, TermsAndConditions } from "./form";
import { useSearchParams } from "next/navigation";

export default function RegisterForm() {
    const router = useSearchParams();
    const type = router.get("type");
    useEffect(() => {
        document.title = "Register";
    })
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
                    <section className="w-full h-full">
                        <div className="fixed right-0 top-0 z-10 max-lg:w-full w-sm md:w-sm lg:w-md xl:w-lg h-screen flex items-center justify-center overflow-x-hidden overflow-y-auto">
                            <div className="flex flex-col items-center justify-center bg-white/80 shadow-md backdrop-blur-2xl px-8 w-full min-h-full mx-auto py-6">
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
                                    <form action="/program" method="post" className="max-w-sm mx-auto w-full form-validate" id="wizard-validation-form" noValidate>
                                        <div id="account-details-validation" className="space-y-5" data-stepper-content-item='{ "index": 1 }'>
                                            <PersonalInformation />
                                        </div>
                                        <div id="personal-info-validation" className="space-y-5" data-stepper-content-item='{ "index": 2 }' style={{ display: "none" }} >
                                            <Institution type={type} />
                                        </div>
                                        <div className="mt-5 flex items-center justify-between gap-x-2">
                                            <button type="button" className="btn btn-prev hidden" data-stepper-back-btn="">
                                                <Icon icon="tabler:chevron-left" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />
                                                <span className="">Kembali</span>
                                            </button>
                                            <button type="button" className="btn btn-next w-full justify-between rounded-sm" data-stepper-next-btn="">
                                                <span className="">Lanjutkan</span>
                                                <Icon icon="tabler:chevron-right" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />
                                            </button>
                                            <button type="submit" data-stepper-finish-btn="" style={{ display: "none" }} className="btn justify-center rounded-sm w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 border-none outline-none shadow-outline focus:outline-none focus:shadow-outline">
                                                <Icon icon="tabler:send" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />
                                                <span className="">Daftar</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="w-full h-12 flex items-center justify-center gap-1">
                                    Sudah punya akun? <a href={`/auth?type=${type}`} className="text-fuchsia-800 hover:text-fuchsia-700">Login disini</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >

            </div >

        </>
    );
}