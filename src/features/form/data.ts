
"use server";

import 'server-only';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchData(endpoint: string) {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        return [];
    }
    if (!API_BASE_URL) {
        throw new Error("API base URL is not configured.");
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`Failed to fetch data from ${endpoint}:`, response.statusText);
            return [];
        }

        return await response.json();

    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return [];
    }
}

export async function fetchInstitutions() {
    return fetchData("/institutions");
}

export async function fetchMajors() {
    return fetchData("/majors");
}

export async function fetchBookTitles(selectedMajor: string) {
    if (!selectedMajor) return [];
    return fetchData(`/book-title/${selectedMajor}`);
}

export async function fetchBookTopics(selectedBookTitle: string) {
    if (!selectedBookTitle) return [];
    return fetchData(`/book-topic/${selectedBookTitle}`);
}
