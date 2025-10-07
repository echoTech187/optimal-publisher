
// A centralized type definition for the User object.
// This can be expanded and used throughout the application.

export interface User {
    id: number;
    full_name: string;
    // email: string;
    // Add other user properties from your API, e.g.,
    phone_number?: string;
    institution?: string;
    major?: string;
    position?: string;
}
