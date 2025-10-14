'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function register(previousState: any, formData: FormData) {
    const data = Object.fromEntries(formData);

    try {
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
                message: result.message || "Registration failed. Please try again.",
            };
        }

        // Securely set authentication token in an HttpOnly cookie
        (await cookies()).set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: result.expires_in, // Use the expiration from the API
                path: '/',
            });

        // Optionally, you can also store non-sensitive user info
        (await
            // Optionally, you can also store non-sensitive user info
            cookies()).set('user', JSON.stringify(result.user), {
                httpOnly: true, // Still good practice
                secure: process.env.NODE_ENV === 'production',
                maxAge: result.expires_in,
                path: '/',
            });

    } catch (error: any) {
        return {
            success: false,
            message: error.message || "An unexpected error occurred.",
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
        // The old code used signInAction, let's assume it calls the /login endpoint
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
                message: result.message || "Login failed. Please check your credentials.",
            };
        }

        // Set cookies on successful login
        (await
            // Set cookies on successful login
            cookies()).set('token', result.token, {
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
        return {
            success: false,
            message: error.message || "An unexpected error occurred.",
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