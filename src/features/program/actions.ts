
"use server";

import { cookies } from "next/headers";

interface FormState {
    success: boolean;
    message: string;
    errors?: Record<string, string[] | undefined>;
    transactionCode?: string | null;
}

// Generic function to handle program submission
async function submitProgram(formData: FormData): Promise<FormState> {
    const token = (await cookies()).get('token')?.value;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!token) {
        return { success: false, message: "Akses ditolak. Silakan login kembali." };
    }
    if (!apiBaseUrl) {
        return { success: false, message: "Konfigurasi server eror." };
    }

    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/order`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || "Terjadi kesalahan pada server.",
                errors: result.errors,
            };
        }

        return {
            success: true,
            message: result.message || "Pesanan anda berhasil dibuat. Silahkan lakukan pembayaran.",
            transactionCode: result.transactionCode || null,
        };

    } catch (error) {
        return {
            success: false,
            message: "Gagal terhubung ke server. Silakan periksa koneksi Anda.",
        };
    }
}

// Specific action for the private program, which might have unique validation
export async function submitPrivateProgram(prevState: FormState, formData: FormData): Promise<FormState> {
    const manuscript = formData.get('manuscript') as File;

    if (!manuscript || manuscript.size === 0) {
        return { success: false, message: "Naskah wajib diunggah." };
    }
    if (manuscript.size > 5 * 1024 * 1024) { // 5MB
        return { success: false, message: "Ukuran file tidak boleh lebih dari 5MB." };
    }

    return submitProgram(formData);
}

// Action for the reference program
export async function submitReferenceProgram(prevState: FormState, formData: FormData): Promise<FormState> {
    // Add any specific validation for reference programs here if needed
    return submitProgram(formData);
}

// Action for the monograf program
export async function submitMonografProgram(prevState: FormState, formData: FormData): Promise<FormState> {
    // Add any specific validation for monograf programs here if needed
    return submitProgram(formData);
}
