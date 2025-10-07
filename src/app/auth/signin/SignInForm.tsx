
"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { login } from "@/lib/actions/auth";
import Alert, { useAlert } from "@/components/ui/Alert";

// Submit button that is aware of the form's pending state
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {pending ? (
                <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block"></span>
                    <span className="ml-2">Loading...</span>
                </>
            ) : (
                <span>Login</span>
            )}
        </button>
    );
}

export default function SignInForm() {
    const params = useSearchParams();
    const type = params.get("type");
    const eventType = params.get("event");

    const { alertProps, showAlert, closeAlert } = useAlert();

    const initialState = { success: false, message: null };
    const [state, formAction] = useActionState(login, initialState);

    useEffect(() => {
        document.title = "Login | Optimal Penerbit";
    

        if (state?.message) {
            showAlert({
                type: state.success ? 'success' : 'error',
                title: state.success ? 'Login Berhasil!' : 'Login Gagal!',
                message: state.message,
                onCloseCallback: closeAlert,
            });
        }
    }, [state]);

    return (
        <>
            <form action={formAction} id="loginForm" name="loginForm" className="max-w-sm mx-auto w-full">
                {/* Hidden inputs to pass params to the server action */}
                <input type="hidden" name="type" value={type ?? ''} />
                <input type="hidden" name="event" value={eventType ?? ''} />

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
                    <input type="tel" name="phone" id="phone" autoFocus required className="input rounded-md bg-white/50 border-white/40 w-full" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required className="input rounded-md bg-white/50 border-white/40 w-full" />
                </div>

                <div className="flex items-center justify-between">
                    <SubmitButton />
                </div>
            </form>

            <div className="w-full max-w-sm mx-auto h-12 flex items-center justify-center gap-1">
                Belum memiliki akun? <a href={`/auth/register?type=${type}`} className="text-fuchsia-800 hover:text-fuchsia-700">Daftar disini</a>
            </div>

            {/* Alert component to show feedback */}
            <Alert {...alertProps} />
        </>
    );
}
