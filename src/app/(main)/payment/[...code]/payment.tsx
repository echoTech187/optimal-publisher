'use client';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getImageUrl } from '@/lib/utils/image';
import uploadPaymentProof from '@/features/payment/actions';
import Alert, { useAlert } from '@/components/ui/Alert';
import Link from 'next/link';
import FormHeader from '@/components/forms/program/FormHeader';
import FileUpload from '@/components/forms/program/FileUpload'; // Import FileUpload component

// Real file upload function (copied from FormProgramPrivate.tsx)
const uploadFileToServer = async (file: string | Blob, url: string | undefined, onProgress: { (progress: any): void; (arg0: number): void; }) => {
    const formData = new FormData();
    formData.append('file', file); // 'file' must match the name your backend expects
    try {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentCompleted = Math.round((event.loaded * 100) / event.total);
                    onProgress(percentCompleted);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.fileId); // Assumes backend returns { fileId: '...' }
                } else {
                    console.error('Server responded with status:', xhr.status);
                    console.error('Server response text:', xhr.responseText);
                    try {
                        const errorResponse = JSON.parse(xhr.responseText);
                        reject(new Error(errorResponse.message || `Failed to upload file. Status: ${xhr.status}`));
                    } catch (e) {
                        reject(new Error(`An unknown error occurred during upload. Status: ${xhr.status}. Response: ${xhr.responseText}`));
                    }
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('A network or server error occurred.'));
            });

            // IMPORTANT: Replace with your actual backend endpoint URL
            xhr.open('POST', url ? url : 'http://localhost:8000/api/v1/upload-file');

            // If you use authentication, set the header here
            // xhr.setRequestHeader('Authorization', `Bearer ${yourAuthToken}`);

            xhr.send(formData);
        });

    } catch (error) {
        console.error('Upload error:', error);
        throw error; // Re-throw the error to be caught by handleFileChange
    }
};

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

    const [uploads, setUploads] = useState({
        receipt: { file: null, progress: 0, uploadedId: null, error: null },
    });

    const resetUpload = (inputName: any) => {
        setUploads(prev => ({
            ...prev,
            [inputName]: { file: null, progress: 0, uploadedId: null, error: null }
        }));
    };

    const handleFileChange = (inputName: string, file: File) => {
        setUploads(prev => ({ ...prev, [inputName]: { file, progress: 0, uploadedId: null, error: null } }));

        uploadFileToServer(file, 'http://localhost:8000/api/v1/payment-proof-upload', (progress: any) => {
            setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, progress } }));
        })
            .then(fileId => {
                setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, uploadedId: fileId, progress: 100 } }));
            })
            .catch(err => {
                console.error(`Error uploading ${inputName}:`, err.message);
                setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, error: err.message || "Upload failed. Please try again." } }));
            });
    };

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
                title: 'Jumlah Tidak Sesuai',
                message: 'Jumlah yang Anda masukkan tidak sesuai dengan jumlah pesanan. Mohon periksa kembali.',
                onCloseCallback: closeAlert,
            });
            return;
        }
        // Use the uploadedId from the state
        if (!uploads.receipt.uploadedId) {
            showAlert({
                type: 'error',
                title: 'Bukti Pembayaran Tidak Valid',
                message: 'Mohon unggah bukti pembayaran.',
                onCloseCallback: closeAlert,
            });
            return;
        }

        // Append the uploadedId to the formData
        formData.append('receipted', uploads.receipt.uploadedId);

        // Here you can handle the form data, e.g., send it to your server
        const response = await uploadPaymentProof(formData);
        if (!response.success) {
            showAlert({
                type: 'error',
                title: 'Unggah Bukti Pembayaran Gagal',
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center px-4 py-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                    <div className='flex justify-center items-center mb-4'>
                        <div className='bg-black rounded-full w-10 h-10 flex items-center justify-center'>
                            <Icon icon="ph:check-bold" className="text-white w-5 h-5" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Pembayaran berhasil Dikonfirmasi!</h1>
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500">Nomor Pesanan Anda</p>
                        <p className="text-2xl font-bold text-gray-800">{data.transaction_code}</p>
                    </div>

                    <div className="text-left mb-6 space-y-3">
                        <div>
                            <span className="text-sm font-bold">Paket:</span>
                            <span className="text-sm ml-2">{data.pack_name}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Total Pembayaran:</span>
                            <span className="text-sm ml-2">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Judul/Topik:</span>
                            <div className='text-capitalize text-sm text-gray-600' dangerouslySetInnerHTML={{
                                __html: (data.isbn_program_id === 1) ? (data.transactionable as any)?.book_title :
                                    (data.isbn_program_id === 5) ? (data.transactionable as any)?.title :
                                        (data.transactionable as any)?.book_title?.title ? (data.transactionable as any)?.book_title?.title + '<br/> ' + (data.transactionable as any)?.topic?.topic_name : 'N/A'
                            }} />
                        </div>
                    </div>

                    <div className="bg-green-100 text-green-800 rounded-lg p-3 mb-6 flex items-center gap-3">
                        <Icon icon="ph:check-circle-bold" className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm text-left">Terima kasih, Pembayaran Anda telah dikonfirmasi.</p>
                    </div>

                    <div className="bg-slate-100 rounded-lg p-4 mb-8 text-left">
                        <h2 className="font-bold text-sm mb-2">Langkah Selanjutnya:</h2>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Tim Optimal akan menghubungi anda melalui whatsapp</li>
                            <li>Pastikan semua pencipta sudah melengkapi biodatanya</li>
                            <li>E-Sertifikat akan diumumkan sesuai waktu paket</li>
                        </ul>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                        <button type="button" className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                            <Icon icon="ph:download-simple-bold" className="w-5 h-5" />
                            Simpan Detail
                        </button>
                        <Link href="/transactions" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm">
                            Selesai
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (isCancelled) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center px-4 py-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                    <div className='flex justify-center items-center mb-4'>
                        <div className='bg-red-600 rounded-full w-10 h-10 flex items-center justify-center'>
                            <Icon icon="ph:x-bold" className="text-white w-5 h-5" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Pembayaran Dibatalkan</h1>
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500">Nomor Pesanan Anda</p>
                        <p className="text-2xl font-bold text-gray-800">{data.transaction_code}</p>
                    </div>

                    <div className="text-left mb-6 space-y-3">
                        <div>
                            <span className="text-sm font-bold">Paket:</span>
                            <span className="text-sm ml-2">{data.pack_name}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Total Pembayaran:</span>
                            <span className="text-sm ml-2">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Judul/Topik:</span>
                            <div className='text-capitalize text-sm text-gray-600' dangerouslySetInnerHTML={{
                                __html: (data.isbn_program_id === 1) ? (data.transactionable as any)?.book_title :
                                    (data.isbn_program_id === 5) ? (data.transactionable as any)?.title :
                                        (data.transactionable as any)?.book_title?.title ? (data.transactionable as any)?.book_title?.title + '<br/> ' + (data.transactionable as any)?.topic?.topic_name : 'N/A'
                            }} />
                        </div>
                    </div>

                    <div className="bg-red-100 text-red-800 rounded-lg p-3 mb-8 text-left">
                        <p className="text-sm">Pesanan ini telah dibatalkan. Jika Anda merasa ini adalah sebuah kesalahan, silakan hubungi dukungan pelanggan kami.</p>
                    </div>

                    <div className="flex justify-end items-center gap-4">
                        <Link href="/transactions" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm">
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    if (isDeclined) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center px-4 py-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                    <div className='flex justify-center items-center mb-4'>
                        <div className='bg-red-600 rounded-full w-10 h-10 flex items-center justify-center'>
                            <Icon icon="ph:x-bold" className="text-white w-5 h-5" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Pembayaran Ditolak</h1>
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500">Nomor Pesanan Anda</p>
                        <p className="text-2xl font-bold text-gray-800">{data.transaction_code}</p>
                    </div>

                    <div className="text-left mb-6 space-y-3">
                        <div>
                            <span className="text-sm font-bold">Paket:</span>
                            <span className="text-sm ml-2">{data.pack_name}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Total Pembayaran:</span>
                            <span className="text-sm ml-2">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Judul/Topik:</span>
                            <div className='text-capitalize text-sm text-gray-600' dangerouslySetInnerHTML={{
                                __html: (data.isbn_program_id === 1) ? (data.transactionable as any)?.book_title :
                                    (data.isbn_program_id === 5) ? (data.transactionable as any)?.title :
                                        (data.transactionable as any)?.book_title?.title ? (data.transactionable as any)?.book_title?.title + '<br/> ' + (data.transactionable as any)?.topic?.topic_name : 'N/A'
                            }} />
                        </div>
                    </div>

                    <div className="bg-red-100 text-red-800 rounded-lg p-3 mb-8 text-left">
                        <p className="text-sm">Pembayaran Anda ditolak. Mohon periksa kembali detail pembayaran Anda atau coba metode pembayaran lain. Hubungi kami jika masalah berlanjut.</p>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                        <Link href="/contact" className="text-sm text-gray-600 font-semibold">
                            Hubungi Kami
                        </Link>
                        <Link href="/transactions" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm">
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center px-4 py-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                    <div className='flex justify-center items-center mb-4'>
                        <div className='bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center'>
                            <Icon icon="ph:package-bold" className="text-white w-5 h-5" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Pesanan Sedang Diproses</h1>
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500">Nomor Pesanan Anda</p>
                        <p className="text-2xl font-bold text-gray-800">{data.transaction_code}</p>
                    </div>

                    <div className="text-left mb-6 space-y-3">
                        <div>
                            <span className="text-sm font-bold">Paket:</span>
                            <span className="text-sm ml-2">{data.pack_name}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Total Pembayaran:</span>
                            <span className="text-sm ml-2">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Judul/Topik:</span>
                            <div className='text-capitalize text-sm text-gray-600' dangerouslySetInnerHTML={{
                                __html: (data.isbn_program_id === 1) ? (data.transactionable as any)?.book_title :
                                    (data.isbn_program_id === 5) ? (data.transactionable as any)?.title :
                                        (data.transactionable as any)?.book_title?.title ? (data.transactionable as any)?.book_title?.title + '<br/> ' + (data.transactionable as any)?.topic?.topic_name : 'N/A'
                            }} />
                        </div>
                    </div>

                    <div className="bg-blue-100 text-blue-800 rounded-lg p-3 mb-8 text-left">
                        <p className="text-sm">Pesanan Anda sedang kami siapkan. Anda akan menerima notifikasi selanjutnya ketika pesanan Anda dikirim.</p>
                    </div>

                    <div className="flex justify-end items-center gap-4">
                        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm">
                            Selesai
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (isDelivered) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center px-4 py-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                    <div className='flex justify-center items-center mb-4'>
                        <div className='bg-cyan-600 rounded-full w-10 h-10 flex items-center justify-center'>
                            <Icon icon="ph:truck-bold" className="text-white w-5 h-5" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Pesanan Telah Dikirim</h1>
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500">Nomor Pesanan Anda</p>
                        <p className="text-2xl font-bold text-gray-800">{data.transaction_code}</p>
                    </div>

                    <div className="text-left mb-6 space-y-3">
                        <div>
                            <span className="text-sm font-bold">Paket:</span>
                            <span className="text-sm ml-2">{data.pack_name}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Total Pembayaran:</span>
                            <span className="text-sm ml-2">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Judul/Topik:</span>
                            <div className='text-capitalize text-sm text-gray-600' dangerouslySetInnerHTML={{
                                __html: (data.isbn_program_id === 1) ? (data.transactionable as any)?.book_title :
                                    (data.isbn_program_id === 5) ? (data.transactionable as any)?.title :
                                        (data.transactionable as any)?.book_title?.title ? (data.transactionable as any)?.book_title?.title + '<br/> ' + (data.transactionable as any)?.topic?.topic_name : 'N/A'
                            }} />
                        </div>
                    </div>

                    <div className="bg-cyan-100 text-cyan-800 rounded-lg p-3 mb-8 text-left">
                        <p className="text-sm">Pesanan Anda sedang dalam perjalanan. Anda dapat melacak pengiriman menggunakan nomor resi yang telah kami kirimkan.</p>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                        <button type="button" className="text-sm text-gray-600 font-semibold">
                            Lacak Pesanan
                        </button>
                        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm">
                            Selesai
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (isFinalized) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center px-4 py-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                    <div className='flex justify-center items-center mb-4'>
                        <div className='bg-green-600 rounded-full w-10 h-10 flex items-center justify-center'>
                            <Icon icon="ph:check-circle-bold" className="text-white w-5 h-5" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Pesanan Selesai</h1>
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500">Nomor Pesanan Anda</p>
                        <p className="text-2xl font-bold text-gray-800">{data.transaction_code}</p>
                    </div>

                    <div className="text-left mb-6 space-y-3">
                        <div>
                            <span className="text-sm font-bold">Paket:</span>
                            <span className="text-sm ml-2">{data.pack_name}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Total Pembayaran:</span>
                            <span className="text-sm ml-2">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Judul/Topik:</span>
                            <div className='text-capitalize text-sm text-gray-600' dangerouslySetInnerHTML={{
                                __html: (data.isbn_program_id === 1) ? (data.transactionable as any)?.book_title :
                                    (data.isbn_program_id === 5) ? (data.transactionable as any)?.title :
                                        (data.transactionable as any)?.book_title?.title ? (data.transactionable as any)?.book_title?.title + '<br/> ' + (data.transactionable as any)?.topic?.topic_name : 'N/A'
                            }} />
                        </div>
                    </div>

                    <div className="bg-green-100 text-green-800 rounded-lg p-3 mb-8 text-left">
                        <p className="text-sm">Terima kasih telah menyelesaikan pesanan Anda. Kami harap Anda menikmati layanan kami!</p>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                        <Link href="/order-history" className="text-sm text-gray-600 font-semibold">
                            Lihat Riwayat Pesanan
                        </Link>
                        <Link href="/transactions" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm">
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center px-4 py-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                    <div className='flex justify-center items-center mb-4'>
                        <div className='bg-amber-500 rounded-full w-10 h-10 flex items-center justify-center'>
                            <Icon icon="ph:clock-bold" className="text-white w-5 h-5" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Menunggu Konfirmasi Pembayaran</h1>
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500">Nomor Pesanan Anda</p>
                        <p className="text-2xl font-bold text-gray-800">{data.transaction_code}</p>
                    </div>

                    <div className="text-left mb-6 space-y-3">
                        <div>
                            <span className="text-sm font-bold">Paket:</span>
                            <span className="text-sm ml-2">{data.pack_name}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Total Pembayaran:</span>
                            <span className="text-sm ml-2">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Judul/Topik:</span>
                            <div className='text-capitalize text-sm text-gray-600' dangerouslySetInnerHTML={{
                                __html: (data.isbn_program_id === 1) ? (data.transactionable as any)?.book_title :
                                    (data.isbn_program_id === 5) ? (data.transactionable as any)?.title :
                                        (data.transactionable as any)?.book_title?.title ? (data.transactionable as any)?.book_title?.title + '<br/> ' + (data.transactionable as any)?.topic?.topic_name : 'N/A'
                            }} />
                        </div>
                    </div>

                    <div className="bg-amber-100 text-amber-800 rounded-lg p-3 mb-8 text-left">
                        <p className="text-sm">Terima kasih! Bukti pembayaran Anda telah kami terima dan akan segera diverifikasi oleh tim kami (maks. 2 jam kerja).</p>
                    </div>

                    <div className="flex justify-between items-center gap-4">
                        <Link href="https://wa.link/pe0iuj" target="_blank" className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                            <Icon icon="tabler:brand-whatsapp" className="w-5 h-5" />
                            Hubungi Kami
                        </Link>
                        <Link href="/transactions" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm">
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>
        );
    }


    if (isExpired) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 text-center px-4 py-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                    <div className='flex justify-center items-center mb-4'>
                        <div className='bg-red-600 rounded-full w-10 h-10 flex items-center justify-center'>
                            <Icon icon="ph:timer-bold" className="text-white w-5 h-5" />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 mb-4">Waktu Pembayaran Habis</h1>
                    <div className="bg-slate-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-500">Nomor Pesanan Anda</p>
                        <p className="text-2xl font-bold text-gray-800">{data.transaction_code}</p>
                    </div>

                    <div className="text-left mb-6 space-y-3">
                        <div>
                            <span className="text-sm font-bold">Paket:</span>
                            <span className="text-sm ml-2">{data.pack_name}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold">Total Pembayaran:</span>
                            <span className="text-sm ml-2">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>

                    <div className="bg-red-100 text-red-800 rounded-lg p-3 mb-8 text-left">
                        <p className="text-sm">Pesanan Anda telah dibatalkan karena batas waktu pembayaran telah terlewati. Silakan buat pesanan baru jika Anda ingin melanjutkan.</p>
                    </div>

                    <div className="flex justify-end items-center gap-4">
                        <Link href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm">
                            Buat Pesanan Baru
                        </Link>
                    </div>
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

                <section className="w-full h-auto py-12 px-4 container mx-auto 2xl:px-0" id="payment">
                    <FormHeader title="Selesaikan Pembayaran" description="Segera selesaikan pembayaran anda sebelum waktu habis" className='text-center mb-8' />

                    <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-lg flex items-start lg:col-span-2 mb-8">
                        <Icon icon="ion:bulb-outline" className="text-xl mr-3 flex-shrink-0" />
                        <p>Silahkan melakukan pembayaran sebesar <span className='font-bold'>{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> sebelum <b>{new Date(data.expires_at).toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</b> ke rekening berikut:</p>
                    </div>
                    <main>

                        {
                            (type === "event") ?
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-100 p-6 rounded-lg mb-12">
                                    <div className='w-full '>
                                        <label className="block text-sm text-gray-600" htmlFor="book_topic">Nama Acara</label>
                                        <p className='text-base font-bold text-black'>{event}</p>
                                    </div>
                                    <div className='w-full '>
                                        <label className="block text-sm text-gray-600" htmlFor="book_topic">Tanggal Acara</label>
                                        <p className='text-base font-bold text-black'>{new Date(Date.now()).toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <div className='w-full '>
                                        <label className="block text-sm text-gray-600" htmlFor="book_topic">Waktu Acara</label>
                                        <p className='text-base font-bold text-black'>{new Date(Date.now()).toLocaleTimeString('id', { hour: 'numeric', minute: 'numeric' })}</p>
                                    </div>
                                    <div className='w-full'>
                                        <label className='block text-sm text-gray-600' htmlFor="book_topic">Lokasi Acara</label>
                                        <p className='text-base font-bold text-black'>Optimal</p>
                                    </div>
                                    <div className='w-full mb-4 col-span-full'>
                                        <label className='block text-sm text-gray-600 mb-2' htmlFor="book_topic">Ketentuan Acara</label>
                                        <ol className="list-outside list-decimal pl-5 space-y-1 text-sm text-gray-800">
                                            <li>Dilarang menyebarkan informasi acara kepada pihak lain</li>
                                            <li>Dilarang mengundang pihak lain untuk mengikuti acara</li>
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
                                                <p className="mb-0.5 font-bold text-base">{option.name}</p>
                                                <p className={`text-sm ${index === selectedOptionIndex ? 'text-white/50' : 'text-gray-500'} font-normal`}>{option.description}</p>
                                            </div>
                                        </div>
                                    </label>
                                    <div id="avatar1-arrow-right-collapse" className="accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="avatar1-arrow-right" role="region">
                                        <div className="px-5 pb-4">
                                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm'>
                                                <div className='col-span-1'>Pembayaran ke <br /><b className="text-base">#{option.code}</b></div>
                                                <div className='col-span-1'>Nama Penerima <br /> <b className="text-base">Optimal Untuk Negeri</b></div>
                                                <div className='col-span-1 md:col-span-2 lg:col-span-1 lg:text-right '>Total Bayar:<br /><strong className="text-lg">{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </main>
                    <header className="relative mt-12">
                        <h2 className="text-2xl mb-4 z-10 text-gray-900 dark:text-gray-50 leading-tight font-bold">Upload Bukti Pembayaran</h2>
                    </header>
                    <FileUpload name="receipt" label="Upload Bukti Pembayaran" description="Format gambar yang diterima: .jpg, .png, .jpeg. Ukuran maksimal 5MB" accept=".jpg,.png,.jpeg" uploadState={uploads.receipt} onFileChange={handleFileChange} onReset={resetUpload} error={undefined} />
                    <div className='col-span-full mb-12'>
                        <label className="block text-gray-800 dark:text-gray-200 font-bold mb-4">*) Konfirmasi Pembayaran anda dengan menghubungi tim kami via Whatsapp</label>
                        <button type="button" className="px-4 py-2 text-sm border rounded-lg border-green-600 hover:border-green-600 text-green-600 hover:bg-green-600 hover:text-white join items-center font-bold" onClick={() => window.open('https://wa.link/pe0iuj', '_parent')}> <Icon icon="tabler:brand-whatsapp" className="mr-2 size-6" width="32" height="32" />Hubungi kami</button>
                    </div>
                    <div className="col-span-full">
                        <button type="submit" className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white text-base font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Upload Bukti Pembayaran</button>
                    </div>
                </section>
            </form>
            <Alert {...alertProps} />
        </>
    );
}