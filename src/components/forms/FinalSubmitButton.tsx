// src/components/forms/FinalSubmitButton.tsx
"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useLoading } from "@/context/LoadingContext";
import { Icon } from "@iconify/react/dist/iconify.js";

interface FinalSubmitButtonProps {
    isValid: boolean;
}

export default function FinalSubmitButton({ isValid }: FinalSubmitButtonProps) {
    const { pending } = useFormStatus();
    const { showLoader, hideLoader } = useLoading();

    useEffect(() => {
        if (pending) {
            showLoader();
        } else {
            hideLoader();
        }
        // Cleanup function to hide loader if component unmounts while pending
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
