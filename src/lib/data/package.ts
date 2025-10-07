import 'server-only';
import { cookies } from 'next/headers';
import { baseUrl } from '@/lib/utils/api';

export default async function getProgramPackage(props: any) {
    const token = (await cookies()).get('token')?.value;
    const {slug} = props;
    if (!token || !slug) {
        // Or handle this case as per your app's logic
        return []; 
    }
    try {
        const response = await fetch(baseUrl() + "/program/package/"+slug, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store', // Use 'no-store' for dynamic, user-specific data
        });
        const data = await response.json();
        if (!response.ok) {
            // You might want to handle errors more gracefully
            console.error("Failed to fetch programs package:", response);
            return [];
        }

        // const data = await response.json();
        return data; // Assuming the API returns { data: [...] }
    } catch (error) {
        console.error("An error occurred while fetching programs package:", error);
        return [];
    }
}
