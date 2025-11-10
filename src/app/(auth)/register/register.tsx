'use client';
import FullPageLoader from '@/components/ui/FullPageLoader';
import { useEffect, useState, useActionState, useCallback } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Local components
import { PersonalInformation, Institution } from "./form";
import AuthHeader from "@/components/header/auth";
import Alert, { useAlert } from '@/components/ui/Alert';
import { Stepper } from '@/components/ui/stepper';
import { Icon } from "@iconify/react/dist/iconify.js";

// Server Actions & Data
import { fetchInstitutions, fetchMajors } from "@/features/form/data";
import { register } from "@/features/auth/actions";

import { useLoading } from "@/context/LoadingContext";

// A submit button that can be disabled by both form pending status and parent validation state.
function FinalSubmitButton({ isValid }: { isValid: boolean }) {
    const { pending } = useFormStatus();
    const { showLoader, hideLoader } = useLoading();

    useEffect(() => {
        if (pending) {
            showLoader();
        } else {
            hideLoader();
        }
        return () => hideLoader();
    }, [pending, showLoader, hideLoader]);

    return (
        <button
            type="submit"
            disabled={pending || !isValid}
            className="btn justify-center rounded-sm w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white text-base font-bold py-2 px-4 border-none outline-none shadow-outline focus:outline-none focus:shadow-outline disabled:bg-fuchsia-400"
        >
            {pending ? "Loading..." : (
                <>
                    <Icon icon="tabler:send" width="24" height="24" className="text-primary-content size-5 rtl:rotate-180" />
                    <span>Daftar</span>
                </>
            )}
        </button>
    );
}

export default function Register() {
    const router = useSearchParams();
    const type = router.get("type");
    const eventType = router.get("event");
    const redirectedFrom = router.get("redirectedFrom");

    const { alertProps, showAlert, closeAlert } = useAlert();

    const initialState = { success: false, message: null };
    const [state, formAction] = useActionState(register, initialState);

    // --- Centralized State Management ---
    const [activeStep, setActiveStep] = useState(1);
    const [stepsValidity, setStepsValidity] = useState<{ [key: number]: boolean }>({ 1: false, 2: false });

    // Data fetching state
    const [institution, setInstitution] = useState([]);
    const [major, setMajor] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- Stepper Configuration ---
    const stepsConfig = [
        { title: 'Account Details' },
        { title: 'Personal Info' }
    ];

    const handleValidationChange = useCallback((step: number, isValid: boolean) => {
        setStepsValidity(prev => ({ ...prev, [step]: isValid }));
    }, []);

    const onValidationChangeStep1 = useCallback((isValid: boolean) => {
        handleValidationChange(1, isValid);
    }, [handleValidationChange]);

    const onValidationChangeStep2 = useCallback((isValid: boolean) => {
        handleValidationChange(2, isValid);
    }, [handleValidationChange]);

    // Fetch initial data
    useEffect(() => {
        document.title = "Register";
        async function fetchInitialData() {
            setIsLoading(true);
            const [instData, majorData] = await Promise.all([fetchInstitutions(), fetchMajors()]);
            console.log(instData, majorData);
            setInstitution(instData);
            setMajor(majorData);
            setIsLoading(false);
        }
        fetchInitialData();
    }, []);

    // Show alert on form action result
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
        return <FullPageLoader />;
    }
    return (
        <>
            <div className="relative w-screen min-h-screen h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700 overflow-x-hidden">
                <div className="relative w-full h-screen overflow-hidden">
                    <Image priority={true}src="/images/1.png" alt="Underline" width={2000} height={0} className="absolute left-0 top-0 h-screen z-1 object-cover" />
                    <div className="absolute w-full h-full bg-purple-900/50 z-2"></div>
                    <section className="w-full h-full">
                        <div className="fixed right-0 top-0 z-10 max-lg:w-full w-sm md:w-sm lg:w-md xl:w-lg h-screen flex items-center justify-center overflow-hidden">
                            <div className="flex flex-col items-center justify-center bg-white/80 shadow-md backdrop-blur-2xl px-8 w-full h-full mx-auto py-6 overflow-y-auto hidden-scroll">
                                <AuthHeader title="Registrasi" subtitle="Buat akun baru anda." />

                                <div className="w-full p-4">
                                    <Stepper
                                        totalSteps={stepsConfig.length}
                                        steps={stepsConfig}
                                        onStepChange={setActiveStep} // <-- Using the callback to sync active step
                                    >
                                        {/* Hidden Nav, as per original design. Can be shown by removing `hidden` */}
                                        <Stepper.Nav className="hidden" />

                                        <form action={formAction} className="max-w-sm mx-auto w-full needs-validation peer" noValidate>
                                            <input type="hidden" name="type" value={type ?? ''} />
                                            <input type="hidden" name="event" value={eventType ?? ''} />
                                            <input type="hidden" name="redirectedFrom" value={redirectedFrom ?? ''} />

                                            <Stepper.Content>
                                                <Stepper.Step index={1}>
                                                    <div className="space-y-5">
                                                        <PersonalInformation
                                                            onValidationChange={onValidationChangeStep1}
                                                        />
                                                    </div>
                                                </Stepper.Step>
                                                <Stepper.Step index={2}>
                                                    <div className="space-y-5">
                                                        <Institution
                                                            type={type}
                                                            onValidationChange={onValidationChangeStep2}
                                                            institution={institution}
                                                            major={major}
                                                        />
                                                    </div>
                                                </Stepper.Step>
                                            </Stepper.Content>

                                            <Stepper.Controls>
                                                {/* <Stepper.PrevButton /> */}
                                                {/* Disable button based on the current active step's validity */}
                                                <Stepper.NextButton disabled={!stepsValidity[activeStep]} />
                                                <Stepper.FinishButton>
                                                    <FinalSubmitButton isValid={stepsValidity[activeStep]} />
                                                </Stepper.FinishButton>
                                            </Stepper.Controls>
                                        </form>
                                    </Stepper>
                                </div>

                                <div className="w-full h-12 flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                                    Sudah punya akun? <a href={`/signin?type=${type}`} className="text-fuchsia-800 hover:text-fuchsia-700">Login disini</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Alert {...alertProps} />
        </>
    );
}