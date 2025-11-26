import { FormField, PackageFeature } from "./program";

export interface Transaction {
    id: string;
    isbn_program_id: number;
    created_at: string; // Assuming date is a string that can be parsed by Date
    pack_name: string;
    pack: Package;
    amount: number;
    transactionable?: Transactionable[] | undefined | null;
    transaction_code: string;
    payment_method?: PaymentMethod | null;
    status?: TransactionStatus | null;
    invoice_url?: string;
    receipt_url?: string | null;
    receipt_date?: string | null;
    discount?: number | null;
    tax?: number | null;
    invoice_number?: string | null;
    invoice_date?: string | null;
    is_active?: boolean;
};
export interface Package {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    is_primary_package: boolean;
    form_class_name?: string;
    form_fields?: FormField[];
    package_features?: PackageFeature[];
    is_active: boolean;
};

export interface TransactionStatus {
    id: number;
    status: string;
};

export interface PaymentMethod {
    id: string;
    name: string;
    description: string;
    icon: string;
    icon_active: string;
    code: string;
    is_active: boolean;
};

export interface Transactionable {
    id: number;
    package_name: string;
    title?: string;
    book_title?: string | BookTitle[] | null;
    address?: string;
    book_upload?: string;
    topic?: Topic;
    is_active?: boolean;
};

export interface Topic {
    id: number;
    topic_name: string;
};

export interface BookTitle {
    id: number;
    title: string;
};

export interface PlanDetail {
    color: string;
    icon: string;
    name: string;
    description: string;
    features: string[];
    price: string;
    deliveryTime: string;
    popular: boolean;
    id: number;
};

export interface PlanProps {
    plan: PlanDetail;
    onSelect: (package_id: number) => Promise<void>;
    isUpdating: boolean;
};