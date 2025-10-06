
import { baseUrl } from "@/lib/utils/api";

export async function getInstitutions() {
    try {
        const response = await fetch(baseUrl() + "/institutions");
        if (!response.ok) {
            throw new Error('Failed to fetch institutions');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching institutions:", error);
        return [];
    }
}

export async function getMajors() {
    try {
        const response = await fetch(baseUrl() + "/majors");
        if (!response.ok) {
            throw new Error('Failed to fetch majors');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching majors:", error);
        return [];
    }
}
