export interface Transaction {
    id: string;
    created_at: string; // Assuming date is a string that can be parsed by Date
    pack_name: string;
    amount: number;
    transactionable?: Transactionable | undefined | null;
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
    title?: string;
    book_title?: string;
    address?: string;
    book_upload?: string;
    is_active?: boolean;
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