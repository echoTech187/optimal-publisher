// src/features/auth/hooks/useSignIn.ts
"use client";

import { useEffect, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/features/auth/actions";
import { useAlert } from "@/components/ui/Alert";

// Define the initial state for the server action
const initialState = {
    success: false,
    message: null,
};

export function useSignIn() {
    const params = useSearchParams();
    const { alertProps, showAlert, closeAlert } = useAlert();
    const [state, formAction] = useActionState(login, initialState);

    useEffect(() => {
        // Set the document title when the component mounts
        document.title = "Login | Optimal Publisher";

        // Show an alert when the server action returns a message
        if (state?.message) {
            showAlert({
                type: state.success ? 'success' : 'error',
                title: state.success ? 'Login Successful!' : 'Login Failed!',
                message: state.message,
                onCloseCallback: closeAlert,
            });
        }
    }, [state, showAlert, closeAlert]);

    return {
        params,
        formAction,
        alertProps,
    };
}
