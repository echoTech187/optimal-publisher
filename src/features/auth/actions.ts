'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as yup from 'yup';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// --- Validation Schemas ---
const registerSchema = yup.object({
    name: yup.string().required("Nama wajib diisi."),
    phone: yup.string().required("Nomor telepon wajib diisi."),
    email: yup.string().email("Email tidak valid.").required("Email wajib diisi."),
    password: yup.string().min(8, "Password minimal 8 karakter.").required("Password wajib diisi."),
    password_confirmation: yup.string()
        .oneOf([yup.ref('password')], 'Konfirmasi password tidak cocok.')
        .required('Konfirmasi password wajib diisi.'),
});

const loginSchema = yup.object({
    phone: yup.string().required("Nomor telepon wajib diisi."),
    password: yup.string().required("Password wajib diisi."),
});


export async function register(previousState: any, formData: FormData) {
    const data = Object.fromEntries(formData);

    try {
        // 1. Validate data on the server
        await registerSchema.validate(data, { abortEarly: false });

        // 2. Proceed with API call if validation is successful
        const response = await fetch(`${apiBaseUrl}/api/v1/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.code !== 200) {
            return {
                success: false,
                message: result.message || "Registrasi gagal. Silakan coba lagi.",
            };
        }

        // Securely set authentication token in an HttpOnly cookie
        (await cookies()).set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: result.expires_in, // Use the expiration from the API
                path: '/',
            });

        (await cookies()).set('user', JSON.stringify(result.user), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: result.expires_in,
                path: '/',
            });

    } catch (error: any) {
        // Handle validation errors from Yup or other errors
        if (error instanceof yup.ValidationError) {
            return { success: false, message: error.errors.join(', ') };
        }
        return {
            success: false,
            message: error.message || "Terjadi kesalahan tak terduga.",
        };
    }

    // Redirect on success
    const redirectedFrom = formData.get("redirectedFrom") as string;
    if (redirectedFrom) {
        redirect(redirectedFrom);
    }

    const type = formData.get("type") as string;
    const eventType = formData.get("event") as string;

    if (type === "event") {
        redirect(`/event/${eventType}`);
    } else if (type === "isbn") {
        redirect('/program');
    }

    redirect(redirectedFrom || '/dashboard');
}

export async function login(previousState: any, formData: FormData) {
    const data = Object.fromEntries(formData);
    try {
        // 1. Validate data on the server
        await loginSchema.validate(data, { abortEarly: false });

        // 2. Proceed with API call if validation is successful
        const response = await fetch(`${apiBaseUrl}/api/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || "Login gagal. Silakan periksa kembali kredensial Anda.",
            };
        }

        // Set cookies on successful login
        (await cookies()).set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: result.expires_in,
                path: '/',
            });

        (await cookies()).set('user', JSON.stringify(result.user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: result.expires_in,
            path: '/',
        });

    } catch (error: any) {
        // Handle validation errors from Yup or other errors
        if (error instanceof yup.ValidationError) {
            return { success: false, message: error.errors.join(', ') };
        }
        return {
            success: false,
            message: error.message || "Terjadi kesalahan tak terduga.",
        };
    }

    // Redirect on success
    const redirectedFrom = formData.get("redirectedFrom") as string;
    if (redirectedFrom) {
        redirect(redirectedFrom);
    }

    const type = formData.get("type") as string;
    const eventType = formData.get("event") as string;

    if (type === "event") {
        redirect(`/event/${eventType}`);
    } else if (type === "isbn") {
        redirect('/program');
    }

    redirect(redirectedFrom || '/dashboard');
}

export async function logout() {
    (await cookies()).delete('token');
    (await cookies()).delete('user');
    redirect('/signin');
}

export async function validateOrRefreshToken() {
    try {
        var tokenCookie = (await cookies()).get('token')?.value;
        if (!tokenCookie) {
            (await cookies()).delete('token');
            (await cookies()).delete('user');
            return false;
        }

        const response = await fetch(`${apiBaseUrl}/api/v1/validate-token`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenCookie}`,
            },
        });
        const result = await response.json();
        if (response.ok && response.status === 200) {
            if (result.token) {
                (await cookies()).set('token', result.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: result.expires_in,
                    path: '/',
                });

                (await cookies()).set('user', JSON.stringify(result.user), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: result.expires_in,
                    path: '/',
                });
            }
            return true;
        }

        (await cookies()).delete('token');
        (await cookies()).delete('user');
        return false;


    } catch (error) {
        console.error("Error validating or refreshing token:", error);
        (await cookies()).delete('token');
        (await cookies()).delete('user');
        return false;
    }
}