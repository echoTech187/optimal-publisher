// src/features/auth/hooks/useRegister.ts
"use client";

import { useState, useEffect, useActionState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { register } from "@/features/auth/actions";
import { fetchInstitutions, fetchMajors } from "@/features/form/data";
import { useAlert } from '@/components/ui/Alert';

const initialState = { success: false, message: null };

export function useRegister() {
    const router = useSearchParams();
    const { alertProps, showAlert, closeAlert } = useAlert();
    const [state, formAction] = useActionState(register, initialState);

    // Stepper and validation state
    const [activeStep, setActiveStep] = useState(1);
    const [stepsValidity, setStepsValidity] = useState<{ [key: number]: boolean }>({ 1: false, 2: false });

    // Data fetching state
    const [institution, setInstitution] = useState([]);
    const [major, setMajor] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get redirect params
    const type = router.get("type");
    const eventType = router.get("event");
    const redirectedFrom = router.get("redirectedFrom");

    // --- Logic and Effects ---

    // Callback to update step validity
    const handleValidationChange = useCallback((step: number, isValid: boolean) => {
        setStepsValidity(prev => ({ ...prev, [step]: isValid }));
    }, []);

    const onValidationChangeStep1 = useCallback((isValid: boolean) => {
        handleValidationChange(1, isValid);
    }, [handleValidationChange]);

    const onValidationChangeStep2 = useCallback((isValid: boolean) => {
        handleValidationChange(2, isValid);
    }, [handleValidationChange]);

    // Effect to fetch initial data for dropdowns
    useEffect(() => {
        document.title = "Register";
        async function fetchInitialData() {
            setIsLoading(true);
            try {
                const [instData, majorData] = await Promise.all([fetchInstitutions(), fetchMajors()]);
                setInstitution(instData);
                setMajor(majorData);
            } catch (error) {
                console.error("Failed to fetch initial registration data:", error);
                // Optionally show an alert to the user
                showAlert({
                    type: 'error',
                    title: 'Gagal Memuat Data',
                    message: 'Tidak dapat memuat data institusi dan jurusan. Silakan coba lagi nanti.',
                    onCloseCallback: closeAlert,
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchInitialData();
    }, [showAlert, closeAlert]); // Dependencies for the alert system

    // Effect to show alert on server action result
    useEffect(() => {
        if (state?.message) {
            showAlert({
                type: state.success ? 'success' : 'error',
                title: state.success ? 'Registrasi Berhasil!' : 'Registrasi Gagal!',
                message: state.message,
                onCloseCallback: closeAlert,
            });
        }
    }, [state, showAlert, closeAlert]);

    return {
        // State
        isLoading,
        activeStep,
        stepsValidity,
        institution,
        major,
        alertProps,
        
        // Params for hidden fields
        type,
        eventType,
        redirectedFrom,

        // Actions and Handlers
        formAction,
        setActiveStep,
        onValidationChangeStep1,
        onValidationChangeStep2,
    };
}
