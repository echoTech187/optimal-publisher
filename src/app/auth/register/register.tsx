'use client';

import AuthHeader from "@/components/header/auth";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState, useRef,useActionState } from "react";
import {  useFormStatus } from "react-dom";
import { PersonalInformation, Institution } from "./form";
import { useSearchParams } from "next/navigation";
import Alert, { useAlert } from '@/components/ui/Alert';
import { HSStepper } from "flyonui/flyonui";
import Image from "next/image";

// Import functions from our new lib files
import { getInstitutions, getMajors } from "@/lib/data/auth";
import { register } from "@/lib/actions/auth";

declare global {
    interface Window {
        HSStepper: typeof HSStepper
    }
}

// A new component to handle the submit button's state
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" data-stepper-finish-btn='' style={{ display: "none" }} disabled={pending} className="btn justify-center rounded-sm w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 border-none outline-none shadow-outline focus:outline-none focus:shadow-outline">
            {pending ? (
                <>
                    <Icon icon="tabler:loader-2" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180 animate-spin" />
                    <span className="">Loading...</span>
                </>
            ) : (
                <>
                    <Icon icon="tabler:send" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />
                    <span className="">Daftar</span>
                </>
            )}
        </button>
    );
}


export default function Register() {
    const router = useSearchParams();
    const type = router.get("type");
    const eventType = router.get("event");

    const { alertProps, showAlert, closeAlert } = useAlert();
    
    // useActionState hook to manage form state with the server action
    const initialState = { success: false, message: null };
    const [state, formAction] = useActionState(register, initialState);

    const [isValidated, setIsValidated] = useState(false);
    const [finalValidate, setFinalValidate] = useState(false);
    const [institution, setInstitution] = useState([]);
    const [major, setMajor] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isFetched = useRef(false);

    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;

        document.title = "Register";
        
        setTimeout(() => {
            if (window.HSStepper) {
                window.HSStepper.autoInit();
            }
        }, 100);

        // Fetch initial data using functions from lib/data
        async function fetchInitialData() {
            setIsLoading(true);
            const [instData, majorData] = await Promise.all([
                getInstitutions(),
                getMajors()
            ]);
            setInstitution(instData);
            setMajor(majorData);
            setIsLoading(false);
        }

        fetchInitialData();
    }, []);

    // useEffect to show alerts when the server action returns a message
    useEffect(() => {
        if (state?.message) {
            showAlert({
                type: state.success ? 'success' : 'error',
                title: state.success ? 'Registrasi Berhasil!' : 'Registrasi Gagal!',
                message: state.message,
                onCloseCallback: closeAlert,
            });
        }
    }, [state]);


    if (isLoading) {
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-white z-50 dark:bg-gray-800 dark:text-gray-50 overflow-hidden">Loading...</div>
        );
    }

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
                                    {/* Stepper navigation remains the same */}
                                    <ul className="relative flex flex-col gap-2 md:flex-row hidden">
                                        {/* ... Stepper li items ... */}
                                    </ul>

                                    {/* The form now uses the formAction */}
                                    <form action={formAction} className="max-w-sm mx-auto w-full needs-validation peer" id="wizard-validation-form" noValidate>
                                        {/* Hidden inputs to pass along query params */}
                                        <input type="hidden" name="type" value={type ?? ''} />
                                        <input type="hidden" name="event" value={eventType ?? ''} />

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
                                            <button type="button" className={`btn btn-next w-full justify-between rounded-sm `} disabled={!isValidated} data-stepper-next-btn="">
                                                <span className="">Lanjutkan</span>
                                                <Icon icon="tabler:chevron-right" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />
                                            </button>
                                            {/* The submit button is now its own component */}
                                            <SubmitButton />
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
