"use client";

import Link from "next/link";
import { useSignIn } from "@/features/auth/hooks/useSignIn";
import Alert from "@/components/ui/Alert";
import SubmitButton from "@/components/forms/SubmitButton";

export default function SignInForm() {
    // All logic is now encapsulated in the useSignIn hook
    const { params, formAction, alertProps } = useSignIn();

    // Extract params for hidden fields
    const type = params.get("type");
    const eventType = params.get("event");
    const redirectedFrom = params.get("redirectedFrom");

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