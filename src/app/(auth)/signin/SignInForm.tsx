"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login } from "@/features/auth/actions";
import Alert, { useAlert } from "@/components/ui/Alert";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button 
            type="submit" 
            disabled={pending} 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-800 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 disabled:opacity-50"
        >
            {pending ? (
                <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                    <span>Processing...</span>
                </>
            ) : (
                "Sign In"
            )}
        </button>
    );
}

export default function SignInForm() {
    const params = useSearchParams();
    const type = params.get("type");
    const eventType = params.get("event");
    const redirectedFrom = params.get("redirectedFrom");

    const { alertProps, showAlert, closeAlert } = useAlert();
    const [state, formAction] = useActionState(login, { success: false, message: null });

    useEffect(() => {
        document.title = "Login | Optimal Publisher";
        if (state?.message) {
            showAlert({
                type: state.success ? 'success' : 'error',
                title: state.success ? 'Login Successful!' : 'Login Failed!',
                message: state.message,
                onCloseCallback: closeAlert,
            });
        }
    }, [state]);

    return (
        <>
            <form action={formAction} className="space-y-6 w-full max-w-md">
                <input type="hidden" name="type" value={type ?? ''} />
                <input type="hidden" name="event" value={eventType ?? ''} />
                <input type="hidden" name="redirectedFrom" value={redirectedFrom ?? ''} />

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        No. Telepon
                    </label>
                    <div className="mt-1">
                        <input 
                            id="phone" 
                            name="phone" 
                            type="tel" 
                            autoComplete="tel"
                            autoFocus 
                            required 
                            className="block w-full px-3 py-2 input rounded-md bg-white/50 border-white/40 hover:border-white/45 hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </label>
                    <div className="mt-1">
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            autoComplete="current-password"
                            required 
                            className="block w-full px-3 py-2 input rounded-md bg-white/50 border-white/40 hover:border-white/45 hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <a href="#" className="font-medium text-fuchsia-600 hover:text-fuchsia-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <SubmitButton />
                </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Belum memiliki akun?{' '}
                <Link href={`/register?${params.toString()}`} className="font-medium text-fuchsia-600 hover:text-fuchsia-500">
                    Daftar disini
                </Link>
            </p>

            <Alert {...alertProps} />
        </>
    );
}