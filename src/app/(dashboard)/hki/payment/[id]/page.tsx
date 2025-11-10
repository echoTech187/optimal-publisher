"use client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { fetchHkiTransaction, fetchPaymentMethods } from "@/features/payment/data";
import { PaymentMethod } from "@/types/transaction";
import FullPageLoader from "@/components/ui/FullPageLoader";

// In a real application, you would fetch the transaction status based on the `params.id`
// For demonstration, we'll use searchParams to switch between states.
// e.g., /transactions/123?status=waiting_payment

const StatusCard = ({ status, hkiData, paymentMethods }: { status: string, hkiData: any, paymentMethods: any[] }) => {
    const router = useRouter();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [transactionProof, setTransactionProof] = useState<File | null>(null);

    const details = {
        paket: hkiData?.package.name || "...",
        total: `${parseInt(hkiData?.package.price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0})}` || "...",
        estimasi: `${hkiData?.package.duration_days} Hari` || "...",
        orderId: hkiData?.registration.code_transaction || "...",
    };

    const paymentHandler = async () => {
        if (!selectedPaymentMethod || !transactionProof) {
            alert("Please select a payment method and upload the transaction proof.");
            return;
        }

        const formData = new FormData();
        formData.append('registration_id', hkiData.registration_id);
        formData.append('package_id', hkiData.package.id);
        formData.append('amount', hkiData.package.price);
        formData.append('payment_method', selectedPaymentMethod);
        formData.append('transaction_proof_path', transactionProof);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/hki-transaction`, {
                method: 'PATCH',
                body: formData,
            });

            if (response.ok) {
                alert("Payment successful!");
                // redirect to success page
            } else {
                const error = await response.json();
                alert(`Payment failed: ${error.message}`);
            }
        } catch (error) {
            console.error("Payment error:", error);
            alert("An error occurred during payment.");
        }
    };


    const statusConfig = {
        waiting_payment: {
            icon: "ion:time-outline",
            color: "yellow",
            title: "Menunggu Pembayaran",
            content: (
                <div>
                    <p className="text-center text-gray-600 mb-4">
                        Selesaikan pembayaran Anda sebelum batas waktu agar pesanan tidak dibatalkan.
                    </p>
                    {/* Include payment details and upload similar to the payment page */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="bg-gray-100 p-3 rounded-lg border flex items-center">
                                <input
                                    type="radio"
                                    id={method.id}
                                    name="paymentMethod"
                                    value={method.id}
                                    onChange={() => setSelectedPaymentMethod(method.id)}
                                    className="mr-3"
                                />
                                <img src={method.image_path} alt={method.name} className="w-12 h-auto mr-3" />
                                <div>
                                    <p className="font-semibold text-sm">{method.name}</p>
                                    <p className="text-xs text-gray-600">{method.account_number}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        onChange={(e) => setTransactionProof(e.target.files ? e.target.files[0] : null)}
                        className="w-full bg-gray-100 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-200 mb-4"
                    />
                    <button
                        onClick={paymentHandler}
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700"
                    >
                        Upload Bukti Pembayaran
                    </button>
                </div>
            ),
        },
        waiting_confirmation: {
            icon: "ion:checkmark-circle",
            color: "green",
            title: "Pembayaran berhasil Dikonfirmasi!",
            content: (
                <div>
                    <div className="bg-green-100 text-green-800 text-sm p-3 rounded-lg mb-6 flex items-center">
                        <Icon icon="ion:information-circle-outline" className="mr-2" />
                        Bukti transfer anda sedang dalam proses verifikasi (maks. 2 jam kerja)
                    </div>
                    <div className="text-left space-y-2 mb-6">
                        <p><strong>Paket:</strong> {details.paket}</p>
                        <p><strong>Total Pembayaran:</strong> {details.total}</p>
                        <p><strong>Estimasi Penerbitan:</strong> {details.estimasi}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg text-left">
                        <h4 className="font-bold mb-2">Langkah Selanjutnya:</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                            <li>Tim Optimal akan menghubungi anda melalui whatsapp</li>
                            <li>Pastikan semua pencipta sudah melengkapi biodatanya</li>
                            <li>E-Sertifikat akan diumumkan sesuai waktu paket</li>
                        </ul>
                    </div>
                     <div className="mt-6 flex justify-end gap-3">
                        <button className="text-sm text-gray-600 flex items-center"><Icon icon="ion:download-outline" className="mr-1" /> Simpan Detail</button>
                        <button onClick={()=> router.push('/hki')} className="bg-blue-600 text-white text-sm font-semibold py-2 px-5 rounded-lg hover:bg-blue-700">Selesai</button>
                    </div>
                </div>
            ),
        },
         // The user mentioned "sudah bayar" (paid) which is very similar to "waiting_confirmation".
         // We map it to the same UI to avoid redundancy.
        paid: {
            icon: "ion:checkmark-circle",
            color: "green",
            title: "Pembayaran Diterima",
            content: (
                 <div>
                    <div className="bg-green-100 text-green-800 text-sm p-3 rounded-lg mb-6 flex items-center">
                        <Icon icon="ion:information-circle-outline" className="mr-2" />
                        Pembayaran Anda telah kami terima dan sedang diproses.
                    </div>
                    <div className="text-left space-y-2">
                        <p><strong>Paket:</strong> {details.paket}</p>                        <p><strong>Total Pembayaran:</strong> {details.total}</p>
                    </div>
                </div>
            )
        },
        completed: {
            icon: "ion:checkmark-done-circle",
            color: "blue",
            title: "Pendaftaran Selesai",
            content: (
                <div>
                    <p className="text-center text-gray-600 mb-6">
                        Selamat! Pendaftaran Hak Cipta Anda telah selesai dan sertifikat sudah terbit.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700">
                            Unduh Sertifikat
                        </button>
                         <button className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300">
                            Kembali ke Dashboard
                        </button>
                    </div>
                </div>
            )
        },
        expired: {
            icon: "ion:close-circle-outline",
            color: "red",
            title: "Pesanan Kadaluarsa",
            content: (
                <div>
                     <p className="text-center text-gray-600 mb-6">
                        Waktu pembayaran untuk pesanan ini telah habis.
                    </p>
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700">
                        Buat Pesanan Baru
                    </button>
                </div>
            )
        }
    };

    const currentStatus = statusConfig[status as keyof typeof statusConfig] || statusConfig.waiting_confirmation;

    const colorClasses = {
        green: 'text-green-500',
        yellow: 'text-yellow-500',
        blue: 'text-blue-500',
        red: 'text-red-500',
    }

    return (

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center">
                <Icon icon={currentStatus.icon} className={`text-6xl mx-auto mb-4 ${colorClasses[currentStatus.color as keyof typeof colorClasses]}`} />
                
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{currentStatus.title}</h1>
                
                {(status === 'waiting_confirmation') && (
                    <div className="bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 mb-6">
                        <p className="text-sm text-gray-500">Nomor Pesanan Anda</p>
                        <p className="text-2xl font-bold tracking-wider">{details.orderId}</p>
                    </div>
                )}

                {currentStatus.content}
            </div>
    )
}

import { useParams, useRouter } from 'next/navigation';

export default function TransactionStatusPage({ searchParams }: { searchParams: { status: string } }) {
    const params = useParams();
    const { id } = params;
    const [hkiData, setHkiData] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const status = searchParams.status || 'waiting_confirmation';

    useEffect(() => {
        const fetchHkiData = async () => {
            const response = await fetchHkiTransaction(id as string);
            const methods : PaymentMethod[] = await fetchPaymentMethods();
            setPaymentMethods(methods);
            setHkiData(response);
            setIsLoading(false);
        };

        fetchHkiData();
    }, [id]);
    if (isLoading) return <FullPageLoader/>;
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 flex items-center justify-center">
            <StatusCard status={status} hkiData={hkiData} paymentMethods={paymentMethods} />
        </div>
    );
}
