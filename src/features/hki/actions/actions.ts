"use server"; // Menandakan bahwa ini adalah Server Action

import { cookies } from "next/headers";

export async function postRegister(data: any) {
    console.log(data);
    const token = (await cookies()).get('token')?.value;

    // Lakukan fetch ke backend Laravel Anda
    const response = await fetch("http://127.0.0.1:8000/api/v1/hki-register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    console.log(response);
    if (!response.ok) {
        // Tangani error jika respons tidak berhasil
        const errorData = await response.json().catch(() => ({ message: 'Terjadi kesalahan pada server.' }));
        throw new Error(errorData.message || 'Gagal melakukan registrasi.');
    }
    const result = await response.json();
    console.log(result);
    // Kembalikan data jika berhasil
    return result;
}

export async function getPricingPackages() {
    const token = (await cookies()).get('token')?.value;

    const response = await fetch("http://127.0.0.1:8000/api/v1/hki-pricing-packages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Gagal mengambil data paket harga.');
    }

    return await response.json();
}

export async function updateHkiPackage({ code_transaction, package_id } :{ code_transaction: string, package_id: number }) {
    const token = (await cookies()).get('token')?.value;

    const response = await fetch("http://127.0.0.1:8000/api/v1/hki-pricing-package/update", {
        method: "POST", // or PUT/PATCH as per your API design
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ code_transaction, package_id }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Gagal memperbarui paket harga.');
    }

    return await response.json();
}
