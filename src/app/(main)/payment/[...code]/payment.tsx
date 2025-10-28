'use client';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getImageUrl } from '@/lib/utils/image';
import uploadPaymentProof from '@/features/payment/actions';
import Alert, { useAlert } from '@/components/ui/Alert';
import Link from 'next/link';
export default function Payment(props: { data: any, payment: any, loading: boolean }) {
    const router = useSearchParams();
    const type = router.get("type");
    const event = router.get("event");
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const { alertProps, showAlert, closeAlert } = useAlert();
    const [isPaymentPending, setIsPaymentPending] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [isDeclined, setIsDeclined] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDelivered, setIsDelivered] = useState(false);
    const [isFinalized, setIsFinalized] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const { data, payment, loading } = props;
    useEffect(() => {
        function checkPaymentStatus() {
            if (data.status_id === 2) {
                setIsPaymentSuccessful(true);
            } else if (data.status_id === 3) {
                setIsCancelled(true);
            } else if (data.status_id === 4) {
                setIsDeclined(true);
            } else if (data.status_id === 5) {
                setIsProcessing(true);
            } else if (data.status_id === 6) {
                setIsDelivered(true);
            } else if (data.status_id === 7) {
                setIsFinalized(true);
            } else if (data.status_id === 8) {
                setIsPending(true);
            } else if (data.status_id === 9) {
                setIsExpired(true);
            } else {
                setIsPaymentPending(true);
            }
        }
        checkPaymentStatus();
    }, [data]);
    async function handlePayment(formData: FormData) {
        if (data.amount != formData.get('amount')) {
            showAlert({
                type: 'error',
                title: 'Invalid Amount',
                message: 'The amount you entered does not match the amount of the order. Please check and try again.',
                onCloseCallback: closeAlert,
            });
            return;
        }
        if (!formData.get('receipted') || (formData.get('receipted') as File).size === 0) {
            showAlert({
                type: 'error',
                title: 'Invalid Receipt',
                message: 'Please upload a payment receipt.',
                onCloseCallback: closeAlert,
            });
            return;
        }
        if ((formData.get('receipted') as File).size > 2 * 1024 * 1024) { // 2MB
            showAlert({
                type: 'error',
                title: 'Invalid Receipt Size',
                message: 'The receipt file size should not exceed 2MB.',
                onCloseCallback: closeAlert,
            });
            return;
        }


        // Here you can handle the form data, e.g., send it to your server
        const response = await uploadPaymentProof(formData);
        if (!response.success) {
            showAlert({
                type: 'error',
                title: 'Receipt Upload Failed',
                message: response.message,
                onCloseCallback: closeAlert,
            });
        } else {
            showAlert({
                type: 'success',
                title: 'Receipt Upload Successful',
                message: 'Bukti pembayaran berhasil diunggah. Tim kami akan segera memverifikasi pembayaran Anda.',
                primaryButtonText: 'Lanjutkan',
                onPrimaryClick: () => {
                    window.location.reload(); // Reload the page
                },
                onCloseCallback: () => {

                    window.location.reload();
                },
            });
        }


    }

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    if (isPaymentSuccessful) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
                <div className="dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                    <div className=' border-2 border-green-600 rounded-full w-24 h-24 p-4 mx-auto mb-6 flex items-center justify-center'>
                        <Icon icon="clarity:lightbulb-line" className="text-green-600 w-20 h-20" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Pembayaran Berhasil!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Terima kasih! Bukti pembayaran Anda telah berhasil kami terima dan akan segera kami verifikasi.</p>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 dark:text-gray-400">Kode Transaksi:</span>
                            <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{data.transaction_code}</span>
                        </div>
                        <div className="mb-4 flex flex-col gap-2">
                            <h6 className=" text-[var(--primary)] font-bold w-full rounded-full">Pesanan</h6>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Jenis Paket</label>
                                <div className="font-normal text-gray-700 dark:text-white">{data.pack_name}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Judul Naskah</label>
                                <div className="font-normal text-gray-700 dark:text-white">
                                {
                                    data.isbn_program_id === 5 ? (
                                        data.transactionable.title || '-'
                                    ) : (data.isbn_program_id === 2 || data.isbn_program_id === 3 || data.isbn_program_id === 4) ? (
                                        <>
                                            <span>{data.transactionable.book_title.title || '-'}</span>
                                            <br />
                                            <span>{data.transactionable.topic.topic_name || '-'}</span>
                                        </>
                                    ) : (
                                        data?.transactionable?.book_title || '-'
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Jumlah Pembayaran:</span>
                            <span className="font-bold text-gray-800 dark:text-white text-lg">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}<br />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">({data.payment_method.description})</span></span>
                        </div>
                    </div>
                    <Link href="/" className="w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 inline-block">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    if (isCancelled) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
                <div className="dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                    <div className=' border-2 border-red-700 rounded-full w-24 h-24 p-4 mx-auto mb-6 flex items-center justify-center'>
                        <Icon icon="clarity:close-line" className="text-red-700 w-20 h-20" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Pembayaran Dibatalkan!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Pembayaran Anda telah dibatalkan oleh pihak Optimal Untuk Negeri.</p>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 dark:text-gray-400">Kode Transaksi:</span>
                            <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{data.transaction_code}</span>
                        </div>
                        <div className="mb-4 flex flex-col gap-2">
                            <h6 className=" text-[var(--primary)] font-bold w-full rounded-full">Pesanan</h6>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Jenis Paket</label>
                                <div className="font-normal text-gray-700 dark:text-white">{data.pack_name}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Judul Naskah</label>
                                <div className="font-normal text-gray-700 dark:text-white">
                                {
                                    data.isbn_program_id === 5 ? (
                                        data.transactionable.title || '-'
                                    ) : (data.isbn_program_id === 2 || data.isbn_program_id === 3 || data.isbn_program_id === 4) ? (
                                        <>
                                            <span>{data.transactionable.book_title.title || '-'}</span>
                                            <br />
                                            <span>{data.transactionable.topic.topic_name || '-'}</span>
                                        </>
                                    ) : (
                                        data?.transactionable?.book_title || '-'
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Jumlah Pembayaran:</span>
                            <span className="font-bold text-gray-800 dark:text-white text-lg">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}<br />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">({data.payment_method.description})</span></span>
                        </div>
                    </div>
                    <Link href="/" className="w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 inline-block">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }
    if (isDeclined) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
                <div className="dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                    <div className=' border-2 border-red-700 rounded-full w-24 h-24 p-4 mx-auto mb-6 flex items-center justify-center'>
                        <Icon icon="clarity:close-line" className="text-red-700 w-20 h-20" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Pembayaran Ditolak!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Pembayaran Anda telah ditolak. Silakan hubungi tim kami untuk informasi lebih lanjut.</p>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 dark:text-gray-400">Kode Transaksi:</span>
                            <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{data.transaction_code}</span>
                        </div>
                        <div className="mb-4 flex flex-col gap-2">
                            <h6 className=" text-[var(--primary)] font-bold w-full rounded-full">Pesanan</h6>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Jenis Paket</label>
                                <div className="font-normal text-gray-700 dark:text-white">{data.pack_name}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Judul Naskah</label>
                                <div className="font-normal text-gray-700 dark:text-white">
                                {
                                    data.isbn_program_id === 5 ? (
                                        data.transactionable.title || '-'
                                    ) : (data.isbn_program_id === 2 || data.isbn_program_id === 3 || data.isbn_program_id === 4) ? (
                                        <>
                                            <span>{data.transactionable.book_title.title || '-'}</span>
                                            <br />
                                            <span>{data.transactionable.topic.topic_name || '-'}</span>
                                        </>
                                    ) : (
                                        data?.transactionable?.book_title || '-'
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Jumlah Pembayaran:</span>
                            <span className="font-bold text-gray-800 dark:text-white text-lg">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}<br />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">({data.payment_method.description})</span></span>
                        </div>
                    </div>
                    <Link href="/" className="w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 inline-block">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
                <div className="dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                    <div className=' border-2 border-yellow-500 rounded-full w-24 h-24 p-4 mx-auto mb-6 flex items-center justify-center'>
                        <Icon icon="clarity:inbox-line" className="text-yellow-500 w-20 h-20" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Pesanan Sedang Diproses!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Pesanan Anda sedang diproses untuk dikirim oleh pihak Optimal Untuk Negeri.</p>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 dark:text-gray-400">Kode Transaksi:</span>
                            <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{data.transaction_code}</span>
                        </div>
                        <div className="mb-4 flex flex-col gap-2">
                            <h6 className=" text-[var(--primary)] font-bold w-full rounded-full">Pesanan</h6>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Jenis Paket</label>
                                <div className="font-normal text-gray-700 dark:text-white">{data.pack_name}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Judul Naskah</label>
                                <div className="font-normal text-gray-700 dark:text-white">
                                {
                                    data.isbn_program_id === 5 ? (
                                        data.transactionable.title || '-'
                                    ) : (data.isbn_program_id === 2 || data.isbn_program_id === 3 || data.isbn_program_id === 4) ? (
                                        <>
                                            <span>{data.transactionable.book_title.title || '-'}</span>
                                            <br />
                                            <span>{data.transactionable.topic.topic_name || '-'}</span>
                                        </>
                                    ) : (
                                        data?.transactionable?.book_title || '-'
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Jumlah Pembayaran:</span>
                            <span className="font-bold text-gray-800 dark:text-white text-lg">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}<br />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">({data.payment_method.description})</span></span>
                        </div>
                    </div>
                    <Link href="/" className="w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 inline-block">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    if (isDelivered) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
                <div className="dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                    <div className=' border-2 border-blue-400 rounded-full w-24 h-24 p-4 mx-auto mb-6 flex items-center justify-center'>
                        <Icon icon="clarity:truck-line" className="text-blue-400 w-20 h-20" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Sedang Dikirim!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Pesanan Anda sedang dikirim oleh pihak Optimal Untuk Negeri.</p>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 dark:text-gray-400">Kode Transaksi:</span>
                            <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{data.transaction_code}</span>
                        </div>
                        <div className="mb-4 flex flex-col gap-2">
                            <h6 className=" text-[var(--primary)] font-bold w-full rounded-full">Pesanan</h6>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Jenis Paket</label>
                                <div className="font-normal text-gray-700 dark:text-white">{data.pack_name}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Judul Naskah</label>
                                <div className="font-normal text-gray-700 dark:text-white">
                                {
                                    data.isbn_program_id === 5 ? (
                                        data.transactionable.title || '-'
                                    ) : (data.isbn_program_id === 2 || data.isbn_program_id === 3 || data.isbn_program_id === 4) ? (
                                        <>
                                            <span>{data.transactionable.book_title.title || '-'}</span>
                                            <br />
                                            <span>{data.transactionable.topic.topic_name || '-'}</span>
                                        </>
                                    ) : (
                                        data?.transactionable?.book_title || '-'
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Jumlah Pembayaran:</span>
                            <span className="font-bold text-gray-800 dark:text-white text-lg">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}<br />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">({data.payment_method.description})</span></span>
                        </div>
                    </div>
                    <Link href="/" className="w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 inline-block">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    if (isFinalized) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
                <div className="dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                    <div className=' border-2 border-gray-500 rounded-full w-24 h-24 p-4 mx-auto mb-6 flex items-center justify-center'>
                        <Icon icon="clarity:check-line" className="text-gray-500 w-20 h-20" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Pesanan Selesai!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Pesanan Anda telah selesai dan diterima. Terima kasih telah berbelanja di Optimal Untuk Negeri!</p>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 dark:text-gray-400">Kode Transaksi:</span>
                            <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{data.transaction_code}</span>
                        </div>
                        <div className="mb-4 flex flex-col gap-2">
                            <h6 className=" text-[var(--primary)] font-bold w-full rounded-full">Pesanan</h6>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Jenis Paket</label>
                                <div className="font-normal text-gray-700 dark:text-white">{data.pack_name}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Judul Naskah</label>
                                <div className="font-normal text-gray-700 dark:text-white">
                                {
                                    data.isbn_program_id === 5 ? (
                                        data.transactionable.title || '-'
                                    ) : (data.isbn_program_id === 2 || data.isbn_program_id === 3 || data.isbn_program_id === 4) ? (
                                        <>
                                            <span>{data.transactionable.book_title.title || '-'}</span>
                                            <br />
                                            <span>{data.transactionable.topic.topic_name || '-'}</span>
                                        </>
                                    ) : (
                                        data?.transactionable?.book_title || '-'
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Jumlah Pembayaran:</span>
                            <span className="font-bold text-gray-800 dark:text-white text-lg">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}<br />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">({data.payment_method.description})</span></span>
                        </div>
                    </div>
                    <Link href="/" className="w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 inline-block">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen  text-center px-4">
                <div className=" dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                    <div className=' border-2 border-amber-500 rounded-full w-24 h-24 p-4 mx-auto mb-6 flex items-center justify-center'>
                        <Icon icon="clarity:hourglass-line" className="text-amber-500 w-20 h-20" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Menunggu Konfirmasi Pembayaran!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Terima kasih! Bukti pembayaran Anda telah berhasil kami terima dan akan segera kami verifikasi.</p>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 dark:text-gray-400">Kode Transaksi:</span>
                            <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{data.transaction_code}</span>
                        </div>
                        <div className="mb-4 flex flex-col gap-2">
                            <h6 className=" text-[var(--primary)] font-bold w-full rounded-full">Pesanan</h6>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Jenis Paket</label>
                                <div className="font-normal text-gray-700 dark:text-white">{data.pack_name}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Judul Naskah</label>
                                <div className="font-normal text-gray-700 dark:text-white">
                                {
                                    data.isbn_program_id === 5 ? (
                                        data.transactionable.title || '-'
                                    ) : (data.isbn_program_id === 2 || data.isbn_program_id === 3 || data.isbn_program_id === 4) ? (
                                        <>
                                            <span>{data.transactionable.book_title.title || '-'}</span>
                                            <br />
                                            <span>{data.transactionable.topic.topic_name || '-'}</span>
                                        </>
                                    ) : (
                                        data?.transactionable?.book_title || '-'
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Jumlah Pembayaran:</span>
                            <span className="font-bold text-gray-800 dark:text-white text-lg">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}<br />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">({data.payment_method.description})</span></span>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mb-4 gap-8'>
                        <Link href="/" className="w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 inline-block">
                            Kembali ke Beranda
                        </Link>
                        <Link href="https://wa.link/pe0iuj" className="w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 inline-block">
                            Konfirmasi Pembayaran
                        </Link>
                    </div>

                </div>
            </div>
        );
    }


    if (isExpired) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
                <div className="dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-4xl backdrop-blur-2xl backdrop-filter backdrop-opacity-35 max-w-2xl w-full">
                    <div className=' border-2 border-red-500 rounded-full w-24 h-24 p-4 mx-auto mb-6 flex items-center justify-center'>
                        <Icon icon="clarity:hourglass-solid" className="text-red-500 w-20 h-20" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Pesanan Dibatalkan!</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Pesanan Anda dibatalkan karena pembayaran Anda belum selesai.</p>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8 text-left">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 dark:text-gray-400">Kode Transaksi:</span>
                            <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{data.transaction_code}</span>
                        </div>
                        <div className="mb-4 flex flex-col gap-2">
                            <h6 className=" text-[var(--primary)] font-bold w-full rounded-full">Pesanan</h6>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Jenis Paket</label>
                                <div className="font-normal text-gray-700 dark:text-white">{data.pack_name}</div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-gray-900 text-lg font-bold dark:text-gray-400">Judul Naskah</label>
                                <div className="font-normal text-gray-700 dark:text-white">
                                {
                                    data.isbn_program_id === 5 ? (
                                        data.transactionable.title || '-'
                                    ) : (data.isbn_program_id === 2 || data.isbn_program_id === 3 || data.isbn_program_id === 4) ? (
                                        <>
                                            <span>{data.transactionable.book_title.title || '-'}</span>
                                            <br />
                                            <span>{data.transactionable.topic.topic_name || '-'}</span>
                                        </>
                                    ) : (
                                        data?.transactionable?.book_title || '-'
                                    )
                                }
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Jumlah Pembayaran:</span>
                            <span className="font-bold text-gray-800 dark:text-white text-lg">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}<br />
                                <span className="text-gray-600 dark:text-gray-400 text-sm">({data.payment_method.description})</span></span>
                        </div>
                    </div>
                    <Link href="/" className="w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 inline-block">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <>
            <form action={handlePayment} className="mb-12">
                <input type="hidden" name="payment_id" id='payment_id' value={data.transaction_code} />
                <input type="hidden" name="member_id" id='member_id' value={data.member_id} />
                <input type="hidden" name="amount" id='amount' value={data.amount} />

                <section className="w-full h-auto py-[100px] px-4 container mx-auto 2xl:px-0" id="payment">
                    <header className="relative text-2xl font-extrabold text-center mt-12 mb-12">
                        <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Selesaikan Pembayaran</h1>
                    </header>
                    <main>

                        {
                            (type === "event") ?
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-100 p-6 rounded-lg mb-12">
                                    <div className='w-full '>
                                        <label className="block text-black " htmlFor="book_topic">Nama Acara</label>
                                        <p className='text-black font-bold '>{event}</p>
                                    </div>
                                    <div className='w-full '>
                                        <label className="block text-black " htmlFor="book_topic">Tanggal Acara</label>
                                        <p className='text-black font-bold'>{new Date(Date.now()).toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <div className='w-full '>
                                        <label className="block text-black " htmlFor="book_topic">Waktu Acara</label>
                                        <p className='text-black font-bold'>{new Date(Date.now()).toLocaleTimeString('id', { hour: 'numeric', minute: 'numeric' })}</p>
                                    </div>
                                    <div className='w-full'>
                                        <label className='block text-black ' htmlFor="book_topic">Lokasi Acara</label>
                                        <p className='text-black font-bold'>Optimal</p>
                                    </div>
                                    <div className='w-full mb-4 col-span-full'>
                                        <label className='block text-black  mb-2' htmlFor="book_topic">Ketentuan Acara</label>
                                        <ol className="list-outside space-y-2 text-sm">
                                            <li className='text-black '>1. Dilarang menyebarkan informasi acara kepada pihak lain</li>
                                            <li className='text-black '>2. Dilarang mengundang pihak lain untuk mengikuti acara</li>
                                        </ol>
                                    </div>
                                </div>
                                : null
                        }
                        <div className="accordion  *:accordion-item-active:shadow-2xl *:accordion-item-active:bg-[#7a2985] *:accordion-item-active:backdrop-blur-md *:accordion-item-active:text-white grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
                            {payment.map((option: any, index: number) => (
                                <div
                                    key={index}
                                    className={`accordion-item ${index === selectedOptionIndex ? 'active' : 'bg-gray-100 border border-gray-200'} rounded-[12px] `}
                                    onClick={() => setSelectedOptionIndex(index)}
                                >
                                    <input
                                        type="radio"
                                        name="paymentOption"
                                        id={option.id}
                                        value={option.id}
                                        checked={index === selectedOptionIndex}
                                        onChange={() => setSelectedOptionIndex(index)}
                                        className="peer hidden radio"
                                    />
                                    <label htmlFor={option.id} className="accordion-header flex justify-between items-center w-full px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="avatar">
                                                <div className="size-12 rounded-md">
                                                    <Image priority={true} src={getImageUrl(option.icon)} alt="avatar" width={100} height={100} className='size-auto' />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="mb-0.5 font-bold">{option.name}</p>
                                                <p className={`text-sm ${index === selectedOptionIndex ? 'text-white/50' : ''} font-normal`}>{option.description}</p>
                                            </div>
                                        </div>
                                    </label>
                                    <div id="avatar1-arrow-right-collapse" className="accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="avatar1-arrow-right" role="region">
                                        <div className="px-5 pb-4">
                                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                                <div className='col-span-1'>Pembayaran ke <br /><b>#{option.code}</b></div>
                                                <div className='col-span-1'>Nama Penerima <br /> <b>Optimal Untuk Negeri</b></div>
                                                <div className='col-span-1 md:col-span-2 lg:col-span-1 lg:text-right '>Total Bayar:<br /><strong>{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</strong></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </main>
                    <header className="relative mt-12">
                        <h1 className="text-2xl mb-4 z-10 text-gray-900 dark:text-gray-50 leading-tight font-bold">Upload Bukti Pembayaran</h1>
                    </header>
                    <div className="col-span-full mb-6">
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <Icon icon="tabler:photo" className="w-12 h-12 text-gray-400 mx-auto" />
                                <div className="mt-4 flex text-sm/6 text-gray-600">
                                    <label htmlFor="receipted" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="receipted" type="file" name="receipted" className="sr-only" accept='image/jpeg, image/png' />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs/5 text-gray-600">PNG, JPG up to 2MB</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-full mb-12'>
                        <label className="block text-black font-bold mb-4">*) Konfirmasi Pembayaran anda dengan menghubungi tim kami via Whatsapp</label>
                        <button type="button" className="px-4 py-2 text-sm border rounded-lg border-green-600 hover:border-green-600 text-green-600 hover:bg-green-600 hover:text-white join items-center font-bold" onClick={() => window.open('https://wa.link/pe0iuj', '_parent')}> <Icon icon="tabler:brand-whatsapp" className="mr-2 size-6" width="32" height="32" />Hubungi kami</button>
                    </div>
                    <div className="col-span-full">
                        <button type="submit" className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Upload Bukti Pembayaran</button>
                    </div>
                </section>
            </form>
            <Alert {...alertProps} />
        </>
    );
}