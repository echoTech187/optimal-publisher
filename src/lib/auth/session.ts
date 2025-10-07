import 'server-only'; // Ensures this code only runs on the server
import { cookies } from 'next/headers';
import { User } from '@/types/user'; // <-- Import the centralized User type

/**
 * Reads the user session from the cookies.
 * @returns The user object if the session is valid, otherwise null.
 */
export async function getSession(): Promise<User | null> {
    // Read the user session from the cookies
    const sessionCookie = (await cookies()).get('user')?.value;
    if (!sessionCookie) {
        return null;
    }

    try {
        // Parse the cookie value and cast it to the User type
        const session = JSON.parse(sessionCookie) as User;
        return session;
    } catch (error) {
        console.error("Failed to parse session cookie:", error);
        return null;
    }
}

/**
 * Checks if the user is authenticated by verifying the token cookie.
 * @returns True if the token exists, otherwise false.
 */
export async function isAuthenticated(): Promise<boolean> {
    const tokenCookie = (await cookies()).get('token')?.value;
    return !!tokenCookie;
}
