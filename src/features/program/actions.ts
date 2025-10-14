"use server";
import { fetchBookTitle, fetchBookTopic } from "./data-access";
import { baseUrl } from "@/lib/utils/api";
import { cookies } from "next/headers";


export async function changeBookTitle(props:{e: any, setBookTitle: any}) {
    const {e} = props;
    const data = await fetchBookTitle({ selectedMajor: e.target.value });
    props.setBookTitle(data);
}

export async function changeBookTopic(props:{e: any, setBookTopic: any}) {
    const {e} = props;
    const data = await fetchBookTopic({ selectedBookTitle: e.target.value });
    props.setBookTopic(data);
}

interface FormState {
    success: boolean;
    message: string;
    errors?: Record<string, string[] | undefined>;
    transactionCode?: string | null;
}

export async function submitPrivateProgram(prevState: FormState, formData: FormData): Promise<FormState> {
    const manuscript = formData.get('manuscript') as File;
    const token = (await cookies()).get('token')?.value;
    // Validasi dasar di sisi Next.js (opsional, karena sudah ada di Laravel)
    if (!manuscript || manuscript.size === 0) {
        return {
            success: false,
            message: "Naskah wajib diunggah.",
        };
    }

    if (manuscript.size > 5 * 1024 * 1024) { // 5MB
        return {
            success: false,
            message: "Ukuran file tidak boleh lebih dari 5MB.",
        };
    }

    try {
        const response = await fetch(`${baseUrl()}/order`, {
            method: 'POST',
            body: formData,
            headers: {
                // Jangan set 'Content-Type': 'multipart/form-data',
                // Fetch API akan menanganinya secara otomatis bersama dengan boundary.
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            // You might want to handle errors more gracefully

            // If there's no transaction code, return the original response
            return {
                success: false,
                message: result.message || "Terjadi kesalahan pada server.",
                errors: result.errors,
            };
        } else if (response.ok && !result.transactionCode) {
            return {
                success: false,
                message: result.message || "Terjadi kesalahan pada server.",
                errors: result.errors,
            };
        }
        // If the response is OK, return success
        return {
            success: true,
            message: result.message || "Pesanan anda berhasil dibuat. Silahkan lakukan pembayaran.",
            transactionCode: result.transactionCode || null,
        };

    } catch (error) {
        // console.error("Error submitting form:", error);
        return {
            success: false,
            message: "Gagal terhubung ke server. Silakan periksa koneksi Anda.",
        };
    }
}
export async function submitReferenceProgram(prevState: FormState, formData: FormData): Promise<FormState> {
    // const manuscript = formData.get('manuscript') as File;
    const token = (await cookies()).get('token')?.value;
    // Validasi dasar di sisi Next.js (opsional, karena sudah ada di Laravel)
    // if (!manuscript || manuscript.size === 0) {
    //     return {
    //         success: false,
    //         message: "Naskah wajib diunggah.",
    //     };
    // }

    // if (manuscript.size > 5 * 1024 * 1024) { // 5MB
    //     return {
    //         success: false,
    //         message: "Ukuran file tidak boleh lebih dari 5MB.",
    //     };
    // }

    try {
        const response = await fetch(`${baseUrl()}/order`, {
            method: 'POST',
            body: formData,
            headers: {
                // Jangan set 'Content-Type': 'multipart/form-data',
                // Fetch API akan menanganinya secara otomatis bersama dengan boundary.
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            // You might want to handle errors more gracefully

            // If there's no transaction code, return the original response
            return {
                success: false,
                message: result.message || "Terjadi kesalahan pada server.",
                errors: result.errors,
            };
        } else if (response.ok && !result.transactionCode) {
            return {
                success: false,
                message: result.message || "Terjadi kesalahan pada server.",
                errors: result.errors,
            };
        }
        // If the response is OK, return success
        return {
            success: true,
            message: result.message || "Pesanan anda berhasil dibuat. Silahkan lakukan pembayaran.",
            transactionCode: result.transactionCode || null,
        };

    } catch (error) {
        // console.error("Error submitting form:", error);
        return {
            success: false,
            message: "Gagal terhubung ke server. Silakan periksa koneksi Anda.",
        };
    }
}

export async function submitMonografProgram(prevState: FormState, formData: FormData): Promise<FormState> {
    // const manuscript = formData.get('manuscript') as File;
    const token = (await cookies()).get('token')?.value;
    // Validasi dasar di sisi Next.js (opsional, karena sudah ada di Laravel)
    // if (!manuscript || manuscript.size === 0) {
    //     return {
    //         success: false,
    //         message: "Naskah wajib diunggah.",
    //     };
    // }

    // if (manuscript.size > 5 * 1024 * 1024) { // 5MB (opsional, karena sudah ada di Laravel)
    //     return {
    //         success: false,
    //         message: "Ukuran file tidak boleh lebih dari 5MB.",
    //     };
    // }

    try {
        const response = await fetch(`${baseUrl()}/order`, {
            method: 'POST',
            body: formData,
            headers: {
                // Jangan set 'Content-Type': 'multipart/form-data',
                // Fetch API akan menanganinya secara otomatis bersama dengan boundary.
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            // You might want to handle errors more gracefully

            // If there's no transaction code, return the original response
            return {
                success: false,
                message: result.message || "Terjadi kesalahan pada server.",
                errors: result.errors,
            };
        } else if (response.ok && !result.transactionCode) {
            return {
                success: false,
                message: result.message || "Terjadi kesalahan pada server.",
                errors: result.errors,
            };
        }
        // If the response is OK, return success
        return {
            success: true,
            message: result.message || "Pesanan anda berhasil dibuat. Silahkan lakukan pembayaran.",
            transactionCode: result.transactionCode || null,
        };
    } catch (error) {
        // console.error("Error submitting form:", error);
        return {
            success: false,
            message: "Gagal terhubung ke server. Silakan periksa koneksi Anda.",
        };
    }

}