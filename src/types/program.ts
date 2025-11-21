
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

export interface ProgramPackage {
    id: number;
    slug: string;
    name: string;
    category_id: number;
    isbn_program_id: number;
    description: string;
    price: number;
    discount: number;
    is_primary_package: boolean;
    form_fields?: FormField[];
    package_features?: PackageFeature[];
    is_active: boolean;

}

export interface FormField {
    id: number;
    name: string;
    type: string;
    label: string;
    rules: string;
    placeholder: string;
    required_frontend: boolean;
    upload_url?: string;
    source_label_column?: string;
    source_label_field?: string;
    source_url?: string;
    options?: string;
    repeater_fields?: FormRepeater[];
}

export interface PackageFeature {
    feature_name: string;
}

export interface FormRepeater {
    name: string;
    type: string;
    label: string;
}