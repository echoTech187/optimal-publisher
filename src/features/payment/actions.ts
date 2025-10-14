"use server";

import { cookies } from "next/headers";

export default async function uploadPaymentProof(data: FormData) {
    const token = (await cookies()).get('token')?.value;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!token) {
        return { success: false, message: 'Unauthorized' };
    }
    if (!apiBaseUrl) {
        return { success: false, message: 'API URL is not configured' };
    }

    const response = await fetch(`${apiBaseUrl}/api/v1/receipt-proof`, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const result = await response.json();
    return result;
}

