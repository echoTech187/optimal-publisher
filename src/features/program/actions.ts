
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
    if (manuscript.size > 10 * 1024 * 1024) { // 10MB
        return { success: false, message: "Ukuran file tidak boleh lebih dari 10MB." };
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
    const newFormData = new FormData();
    const members: { name: string; phone: string }[] = [];

    for (let [key, value] of formData.entries()) {
        const memberMatch = key.match(/members\[(\d+)\]\.(name|phone)/);
        if (memberMatch) {
            const index = parseInt(memberMatch[1], 10);
            const field = memberMatch[2];

            if (!members[index]) {
                members[index] = { name: '', phone: '' };
            }
            members[index][field as 'name' | 'phone'] = value as string;
        } else {
            newFormData.append(key, value);
        }
    }

    // Append members as a JSON string or individual fields, depending on backend expectation
    // For now, let's try appending as individual fields with array notation
    members.forEach((member, index) => {
        newFormData.append(`members[${index}][name]`, member.name);
        newFormData.append(`members[${index}][phone]`, member.phone);
    });

    return submitProgram(newFormData);
}
