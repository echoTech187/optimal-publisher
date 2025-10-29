"use server";

import { cookies } from "next/headers";
import { getSession } from "../auth/session";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;
export async function fetchEventData() {
    try {
        // const queryString = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/events`;
        const response = await fetch(url, {
            // Using no-cache to ensure fresh data on every request,
            // or revalidate for periodic refetching.
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const result = await response.json();
        // The API returns an empty `data` array when there are no results,
        // which is fine. No need to return an empty array explicitly.
        return result.data;
    } catch (error) {
        return [];

    }
}

export async function fetchEventDetail(params?: URLSearchParams | Record<string, string> | string) {
    try {
        const url = `${API_BASE_URL}/event${params ? `/${params}` : ''}`;
        const response = await fetch(url, {
            // Using no-cache to ensure fresh data on every request,
            // or revalidate for periodic refetching.
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const result = await response.json();
        // The API returns an empty `data` array when there are no results,
        // which is fine. No need to return an empty array explicitly.
        return result.data;
    } catch (error) {
        return [];

    }
}




export async function fetchUserEventTransaction(slug: string) {
    try {
        const token = (await cookies()).get('token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
        }
        const session = await getSession();
        if (!session) {
            return { success: false, message: "Not authenticated" };
        }
        // const queryString = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/event/transaction/${session.slug}/${slug}`;
        const response = await fetch(url, {
            // Using no-cache to ensure fresh data on every request,
            // or revalidate for periodic refetching.
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

        });
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const result = await response.json();
        // The API returns an empty `data` array when there are no results,
        // which is fine. No need to return an empty array explicitly.
        if(result.success){
            return result.isRegistered;
        }else{
            return false;
        }
    } catch (error) {
        return error;

    }
}