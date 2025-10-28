
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';

import { fetchTransaction } from "@/features/payment/data";
import { fetchPaymentMethods } from "@/features/payment/data";
import { fetchEventDetail } from "@/features/event/data";
import { Html } from "next/document";

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
        fetchEventDetail(slug),
        fetchPaymentMethods(),
    ]);

    if (!transactionData) {
        notFound();
    }
    return (
        <>
            <form action="" className="mb-12">

                <section className="w-full max-w-7xl h-auto py-[100px] px-4 container mx-auto 2xl:px-0" id="payment">
                    <header className="relative text-2xl font-extrabold text-center mt-12 mb-12">
                        <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Selesaikan Pembayaran</h1>
                    </header>
                    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 bg-amber-100  p-6 rounded-lg mb-12">
                        <div className='w-full '>
                            <label className="block text-black " htmlFor="book_topic">Nama Acara</label>
                            <p className='text-black font-bold '>{transactionData.title}</p>
                        </div>
                        <div className='w-full '>
                            <label className="block text-black " htmlFor="book_topic">Tanggal Acara</label>
                            <p className='text-black font-bold'>{transactionData.event_date}</p>
                        </div>
                        <div className='w-full '>
                            <label className="block text-black " htmlFor="book_topic">Waktu Acara</label>
                            <p className='text-black font-bold'>{transactionData.event_time}</p>
                        </div>
                        <div className='w-full'>
                            <label className='block text-black ' htmlFor="book_topic">Lokasi Acara</label>
                            <p className='text-black font-bold'>{transactionData.location}</p>
                        </div>
                        <div className='w-full mb-4 col-span-full'>
                            <div className="html_content text-xs" dangerouslySetInnerHTML={{ __html: transactionData.description }}></div>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <button type="submit" className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Upload Bukti Pembayaran</button>
                    </div>
                </section>
            </form>
            {/* <Alert {...alertProps} /> */}
        </>
    );
}

// The main page component is now clean and simple
export default async function Page({ params }: { params: { slug: string | null } }) {
    const { slug } = await params;
    console.log(slug);
    return (
        <Suspense fallback={
            <div className='flex justify-center items-center h-screen my-[100px]'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        }>
            <PaymentFetcher slug={slug} />
        </Suspense>
    );
}
