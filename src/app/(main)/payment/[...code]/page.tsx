
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

import Payment from "./payment";
import { fetchTransaction } from "@/features/payment/data";
import { fetchPaymentMethods } from "@/features/payment/data";

export const metadata: Metadata = {
    title: 'Selesaikan Pembayaran | Optimal Untuk Negeri',
};

// Helper component to fetch data and handle loading/errors
async function PaymentFetcher({ slug }: { slug: string | null }) {
    if (!slug) {
        notFound();
    }

    // Fetch transaction and payment methods in parallel
    const [transactionData, paymentMethods] = await Promise.all([
        fetchTransaction(slug),
        fetchPaymentMethods(),
    ]);

    if (!transactionData) {
        notFound();
    }
    return <div className="my-[80px]"><Payment data={transactionData} payment={paymentMethods} loading={false} /></div>;
}

// The main page component is now clean and simple
export default async function Page({ params }: { params: { code: string | null } }) {
    const { code } = await params
    const slug = code;

    return (
        <Suspense fallback={
            <div className='flex justify-center items-center h-screen'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        }>
            <PaymentFetcher slug={slug} />
        </Suspense>
    );
}
