"use client";
import { Suspense, useEffect } from "react";
import Payment from "./payment";
import { useParams, useSearchParams } from "next/navigation";
import { fetchPayment, fetchTransaction } from "@/lib/data/program";
import { useState } from "react";

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
                return <section className="w-full h-auto py-[100px] px-4 max-w-[1300px] mx-auto 2xl:px-0" id="payment">Invalid payment code.</section>;
            } else {
                setData(data.data);
                setPayment(payment.data);
                setIsLoading(false);
            }
        }
        getTransaction();
    }, []);



    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Payment data={data} payment={payment} loading={isLoading} />
        </Suspense>
    )
}