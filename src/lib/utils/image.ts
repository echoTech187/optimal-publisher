
/**
 * Constructs the full URL for an image from the API.
 * Assumes the API returns a path relative to the 'storage' directory.
 * @param relativePath - The relative path of the image (e.g., 'posts/image.jpg').
 * @returns The full, absolute URL for the image or a placeholder if the path is not provided.
 */
export function getImageUrl(relativePath: string | null | undefined): string {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
        console.error("API base URL is not configured for images.");
        return '/images/placeholder.png'; // Return a placeholder on config error
    }

    if (!relativePath) {
        return '/images/placeholder.png'; // Return a placeholder if the path is empty
    }

    // Ensure there are no double slashes
    return `${apiBaseUrl}/storage/${relativePath.replace(/^\//, '')}`;
}
