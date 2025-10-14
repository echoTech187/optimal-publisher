
"use server";

import 'server-only';
import { cookies } from 'next/headers';

// Define the Package type based on what the component expects
interface ProgramPackage {
    id: number;
    name: string;
    category_id: number;
    // ... other properties
}

// Define the Program type based on what the component expects
interface Program {
    id: number;
    program_name: string;
    program_description: string;
    images: string; // Assuming 'images' is a path to the image
}

/**
 * Fetches the packages for a specific program.
 * @param programId - The ID of the program.
 * @returns A promise that resolves to an array of packages.
 */
export async function getProgramPackage(programId: number): Promise<ProgramPackage[]> {
    const token = (await cookies()).get('token')?.value || '';
    // const token = (await cookies()).get('token')?.value;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!token || isNaN(programId)) {
        return [];
    }

    if (!apiBaseUrl) {
        throw new Error("API base URL is not configured.");
    }

    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/program/package/${programId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error("Failed to fetch program package:", response.statusText);
            return [];
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("An error occurred while fetching program package:", error);
        return [];
    }
}

/**
 * Fetches a list of programs from the API using the user's auth token.
 * @returns A promise that resolves to an array of programs.
 */
export async function getPrograms(): Promise<Program[]> {
    const token = (await cookies()).get('token')?.value || '';
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!token) {
        console.log("No auth token found, returning empty array.");
        return [];
    }

    if (!apiBaseUrl) {
        throw new Error("API base URL is not configured in environment variables.");
    }

    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/programs`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            method: 'GET',
            cache: 'no-store', // Data is user-specific and dynamic
        });

        if (!response.ok) {
            console.error("Failed to fetch programs:", response.status, response.statusText);
            return []; // Return empty array on error to prevent UI crash
        }

        const data = await response.json();
        return data; // Assuming the API returns the array of programs directly

    } catch (error) {
        console.error("An error occurred while fetching programs:", error);
        return [];
    }
}
