export interface Program {
    id: number;
    program_name: string;
    program_description: string;
    images: string;
}

export interface EventNews {
    slug: string;
    title: string;
    description: string;
    image: string;
    registration_cost?: string|number|null;
    event_date: string;
    event_time: string;
    location: string;
    created_at: string;
    created_by: string;
}