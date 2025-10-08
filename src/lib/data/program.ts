"use server";
import 'server-only';
import { cookies } from 'next/headers';
import { baseUrl } from '@/lib/utils/api';

export async function getPrograms() {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        // Or handle this case as per your app's logic
        return [];
    }

    try {
        const response = await fetch(baseUrl() + "/programs", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store', // Use 'no-store' for dynamic, user-specific data
        });

        if (!response.ok) {
            // You might want to handle errors more gracefully
            console.error("Failed to fetch programs:", response.statusText);
            return [];
        }

        const data = await response.json();
        return data; // Assuming the API returns { data: [...] }
    } catch (error) {
        console.error("An error occurred while fetching programs:", error);
        return [];
    }
}

export async function fetchMajor() {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        // Or handle this case as per your app's logic
        return [];
    }
    const response = await fetch(baseUrl() + "/majors",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const major = await response.json();
    return major;
}

export async function fetchBookTitle({ selectedMajor }: { selectedMajor: string; }) {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        // Or handle this case as per your app's logic
        return [];
    }
    const response = await fetch(baseUrl() + "/book-title/" + selectedMajor,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });
    const bookTitle = await response.json();
    return bookTitle;
}

export async function fetchBookTopic({ selectedBookTitle }: { selectedBookTitle: string; }) {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        // Or handle this case as per your app's logic
        return [];
    }
    const response = await fetch(baseUrl() + "/book-topic/" + selectedBookTitle,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
    const bookTopic = await response.json();
    return bookTopic;
}