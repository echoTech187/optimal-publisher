import { Article } from "@/types/article";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

// Define a basic interface for an Article
// You should adjust this to match your actual API response


interface ApiSingleResponse {
  data: Article;
}

interface ApiResponse {
  data: Article[];
  // You might have pagination info here, e.g., meta: { total: number, per_page: number, ... }
}

/**
 * Fetches a single article by its slug.
 * @param slug - The slug of the article to fetch.
 * @returns A promise that resolves to the article object or null if not found.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const url = `${API_BASE_URL}/article/${slug}`;
    const response = await fetch(url, {
      cache: 'no-store', 
    });

    if (!response.ok) {
      if (response.status !== 404) {
        // Log more details for debugging
        const errorBody = await response.text();
        console.error(`API Error: ${response.status} ${response.statusText}`, { url, body: errorBody });
        throw new Error(`Failed to fetch article with slug ${slug}`);
      }
      return null;
    }

    const result: ApiSingleResponse = await response.json();
    return result.data;

  } catch (error) {
    console.error(`Error fetching article by slug ${slug}:`, error);
    return null; // Return null on error
  }
}


/**
 * Fetches a list of articles from the API.
 * @param params - Optional URL search parameters for filtering, pagination, etc.
 * @returns A promise that resolves to an array of articles.
 */
export async function getArticles(params?: URLSearchParams): Promise<Article[] > {
  try {
    const url = `${API_BASE_URL}/articles?${params?.toString() || ''}`;
    const response = await fetch(url, {
      cache: 'no-store', // Use 'no-store' for dynamic content, or 'revalidate' for periodic updates
    });

    if (!response.ok) {
      // Log more details for debugging
      const errorBody = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`, { url, body: errorBody });
      throw new Error(`Failed to fetch articles. Status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    return result.data;

  } catch (error) {
    console.error("Error fetching articles:", error);
    return []; // Return empty array on error
  }
}
