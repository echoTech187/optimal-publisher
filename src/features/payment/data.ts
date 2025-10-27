
"use server";

import 'server-only';
import { cookies } from 'next/headers';

// Define the Payment Method type
interface PaymentMethod {
    // Add properties of a payment method object here
    id: string;
    name: string;
    // ... other properties
}

// Define the Transaction type based on what the component expects
interface Transaction {
    id: string;
    amount: number;
    status_id: number;
    transaction_code: string;
    pack_name: string;
    book_title: string | null;
    title?: string;
    payment_method_id: string;
    payment_method: PaymentMethod;
    created_at: string;
    updated_at: string;
    
    // ... other properties
}

/**
 * Fetches available payment methods from the API.
 * @returns A promise that resolves to an array of payment methods.
 */
export async function fetchPaymentMethods(): Promise<PaymentMethod[]> {
    const token = (await cookies()).get('token')?.value || '';
    // const token = (await cookies()).get('token')?.value;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!token) {
        return [];
    }

    if (!apiBaseUrl) {
        throw new Error("API base URL is not configured.");
    }

    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/payment-methods`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error("Failed to fetch payment methods:", response.statusText);
            return [];
        }

        const result = await response.json();
        return result.data; // Assuming the API returns { data: [...] }

    } catch (error) {
        console.error("Error fetching payment methods:", error);
        return [];
    }
}

/**
 * Fetches transaction details from the API.
 * @param slug - The unique identifier for the transaction.
 * @returns A promise that resolves to the transaction data.
 */
export async function fetchTransaction(slug: string | null): Promise<any | null> {
    const token = (await cookies()).get('token')?.value || ''; // const token = (await cookies()).get('token')?.value;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!token || !slug) {
        return null;
    }

    if (!apiBaseUrl) {
        throw new Error("API base URL is not configured.");
    }

    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/transaction/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error("Failed to fetch transaction:", response.statusText);
            return null;
        }

        const result = await response.json();
        return result.data; // Assuming the API returns { data: { ...transaction } }

    } catch (error) {
        console.error("Error fetching transaction:", error);
        return null;
    }
}
