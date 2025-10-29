
// A centralized type definition for the User object.
// This can be expanded and used throughout the application.

export interface User {
    id: string;
    slug: string;
    full_name: string;
    phone_number?: string;
    institution?: string;
    major?: string;
    position?: string;
}
