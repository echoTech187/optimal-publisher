
import 'server-only';
import { cookies } from 'next/headers';
import { baseUrl } from '@/lib/utils/api';

export async function getPrograms() {
    const token = cookies().get('token')?.value;

    if (!token) {
        // Or handle this case as per your app's logic
        return []; 
    }

    try {
        const response = await fetch(baseUrl() + "/program", {
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
        return data.data; // Assuming the API returns { data: [...] }
    } catch (error) {
        console.error("An error occurred while fetching programs:", error);
        return [];
    }
}
