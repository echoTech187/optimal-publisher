"use client";
import { Suspense, useEffect } from "react";
import Payment from "./payment";
import { useParams, useSearchParams } from "next/navigation";
import { fetchPayment, fetchTransaction } from "@/features/program/data-access";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const router = useParams();
    const slug = router.code ? (Array.isArray(router.code) ? router.code[0] : router.code) : null;
    const [data, setData] = useState<any>([]);
    const [payment, setPayment] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    if (!slug) {
        return <section className="w-full h-auto py-[100px] px-4 max-w-[1300px] mx-auto 2xl:px-0" id="payment">Invalid payment code.</section>;
    }
    useEffect(() => {
        document.title = "Optimal Penerbit - Pembayaran";
        const getTransaction = async () => {
            const data = await fetchTransaction({ slug });
            const payment = await fetchPayment();
            if (!slug || !data || !payment) {
                setIsLoading(false);
                // Jika packageKey tidak valid, redirect atau tampilkan pesan error
                // redirect('/error/404'); // Atau halaman error lainnya
                return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
                    <div className="dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Pembayaran Tidak Ditemukan</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Pembayaran dengan kode {router.code ? (Array.isArray(router.code) ? router.code[0] : router.code) : null} tidak ditemukan.</p>
                        <Link href="/" className=" btn bg-fuchsia-800 text-white border-0 rounded-lg hover:bg-fuchsia-900 hover:text-white hover:rounded-lg">
                            Kembali ke halaman utama
                        </Link>
                    </div>
                </div>;;
            } else {
                setData(data.data);
                setPayment(payment.data);
                setIsLoading(false);
            }
        }
        getTransaction();
    }, []);

    if (!data) {
        return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
            <div className="dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Pembayaran Tidak Ditemukan</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Pembayaran dengan kode {router.code ? (Array.isArray(router.code) ? router.code[0] : router.code) : null} tidak ditemukan.</p>
                <Link href="/" className=" btn bg-fuchsia-800 text-white border-0 rounded-lg hover:bg-fuchsia-900 hover:text-white hover:rounded-lg">
                    Kembali ke halaman utama
                </Link>
            </div>
        </div>;
    }


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Payment data={data} payment={payment} loading={isLoading} />
        </Suspense>
    )
}