'use client';

import Image from "next/image";
import { useRegister } from "@/features/auth/hooks/useRegister";

// UI Components
import FullPageLoader from '@/components/ui/FullPageLoader';
import AuthHeader from "@/components/header/auth";
import Alert from '@/components/ui/Alert';
import { Stepper } from '@/components/ui/stepper';
import FinalSubmitButton from "@/components/forms/FinalSubmitButton";

// Form Step Components
import { PersonalInformation, Institution } from "./form";

export default function Register() {
    const {
        isLoading,
        activeStep,
        stepsValidity,
        institution,
        major,
        alertProps,
        type,
        eventType,
        redirectedFrom,
        formAction,
        setActiveStep,
        onValidationChangeStep1,
        onValidationChangeStep2,
    } = useRegister();

    const stepsConfig = [
        { title: 'Account Details' },
        { title: 'Personal Info' }
    ];

    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <>
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
                                <AuthHeader title="Registrasi" subtitle="Buat akun baru anda." />

                                <div className="w-full p-4">
                                    <Stepper
                                        totalSteps={stepsConfig.length}
                                        steps={stepsConfig}
                                        onStepChange={setActiveStep}
                                    >
                                        <Stepper.Nav className="hidden" />

                                        <form action={formAction} className="max-w-md mx-auto w-full needs-validation peer" noValidate>
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