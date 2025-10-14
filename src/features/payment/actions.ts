"use server";

import { cookies } from "next/headers";
import { baseUrl } from "@/lib/utils/api";

export default async function uploadPaymentProof(data: FormData) {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return { success: false, message: 'Unauthorized' };
    }
    const response = await fetch(baseUrl() + '/receipt-proof', {
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

