import { fetchHkiTransaction } from '@/features/payment/data';
import { getSession } from '@/features/auth/session';
import { redirect } from 'next/navigation';
import CopyableTransactionCode from './CopyableTransactionCode';
import { Icon } from '@iconify/react';
import { getImageUrl } from '@/lib/utils/image';

export default async function HkiDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    const session = await getSession();
    if (!session || !session.id) {
        redirect('/signin');
    }

    const transaction = await fetchHkiTransaction(slug);

    if (!transaction) {
        return <div className="p-8 text-center text-gray-600 text-xl">Transaksi tidak ditemukan.</div>;
    }

    const transactionStatusId = transaction.status?.id;
    const transactionStatusName = transaction.status?.status;
    let statusClasses = "bg-gray-100 text-gray-800";
    if (transactionStatusName) {
        switch (transactionStatusName.toLowerCase()) {
            case 'success':
                statusClasses = "bg-green-100 text-green-800";
                break;
            case 'pending':
                statusClasses = "bg-yellow-100 text-yellow-800";
                break;
            case 'failed':
                statusClasses = "bg-red-100 text-red-800";
                break;
        }
    }

    let rightCardContent = null;

    // Condition 1: status.id === 1 (Success)
    if (transactionStatusId === 1) {
        rightCardContent = (
            <div className="flex h-full w-full flex-col items-center justify-center bg-white rounded-xl p-6">
                <Icon icon="ic:round-folder-open" className="w-12 h-12 mb-3" />
                <p className="text-lg font-bold text-gray-900 mb-4">Pesanan belum selesai.</p>
                <p className="text-center text-gray-600">Silahkan lanjutkan dengan menekan tombol di bawah ini untuk melanjutkan.</p>
                <div className="flex justify-center gap-4 my-8">
                    <a href="#" className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                        <Icon icon="ion:close-outline" className="mr-2" />
                        Batalkan Pesanan
                    </a>
                    <a href={`/hki/pricing?code_transaction=${slug}`} className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                        Lanjutkan Pembayaran
                        <Icon icon="ion:arrow-forward-outline" className="ml-2" />
                    </a>
                    
                </div>
            </div>
        );
    }
    if (transactionStatusId === 2) {
        rightCardContent = (
            <div className="flex h-full w-full flex-col items-center justify-center bg-white rounded-xl p-6">
                <Icon icon="ic:round-folder-open" className="w-12 h-12 mb-3" />
                <p className="text-lg font-bold text-gray-900 mb-4">Pesanan belum selesai.</p>
                <p className="text-center text-gray-600">Silahkan lanjutkan dengan menekan tombol di bawah ini untuk melanjutkan.</p>
                <div className="flex justify-center gap-4 my-8">
                    <a href="#" className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                        <Icon icon="ion:close-outline" className="mr-2" />
                        Batalkan Pesanan
                    </a>
                    <a href={`/hki/payment?code_transaction=${slug}`} className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                        Lanjutkan Pembayaran
                        <Icon icon="ion:arrow-forward-outline" className="ml-2" />
                    </a>
                    
                </div>
            </div>
        );
    }
    // Condition 2: status.id === 2 or 8 (Pending/Processing)
    else if (transactionStatusId === 3 || transactionStatusId === 4) {

        rightCardContent = (
            <div className="bg-white rounded-xl p-6">
                <header className=' mb-6'>
                    <h2 className="text-xl font-bold text-gray-900">Bukti Pembayaran</h2>
                    <p className="text-gray-600">Bukti pembayaran dari pembayaran Anda.</p>
                </header>
                <div className="flex flex-col items-center justify-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
                    {transaction.transaction_proof_path ? (
                        <>
                            <Icon icon="ic:round-receipt" className="w-12 h-12 mb-3" />
                            <p className="text-lg font-bold">Resi Pembayaran</p>
                            <p className="text-center text-gray-600">Tanggal: {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString('id-ID') : 'N/A'}</p>
                            <a href={getImageUrl(transaction.transaction_proof_path)} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <Icon icon="ic:round-visibility" className="w-5 h-5" />
                                Lihat Resi
                            </a>
                        </>
                    ) : (
                        <>
                            <Icon icon="ic:round-folder-open" className="w-12 h-12 mb-3" />
                            <p className="text-base font-medium">Tidak ada dokumen yang tersedia.</p>
                        </>
                    )}
                </div>
            </div>
        );
    }
    // Condition 3: status.id === 3, 4, or 9 (Failed/Cancelled) - rightCardContent remains null
    
    // Condition 4: status.id === 5, 6, or 7 (Completed/Delivered)
    else if (transactionStatusId === 5) {
        rightCardContent = (
            <div className="bg-white rounded-xl p-6">
                <header className=' mb-6'>
                    <h2 className="text-xl font-bold text-gray-900">Bukti Pembayaran</h2>
                    <p className="text-gray-600">Bukti pembayaran dari pembayaran Anda.</p>
                </header>
                <div className="flex flex-col items-center justify-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
                    {transaction.transaction_proof_path || transaction.invoice_url ? (
                        <>
                            {transaction.transaction_proof_path && (
                                <div className="flex flex-col items-center mb-4">
                                    <Icon icon="ic:round-receipt" className="w-12 h-12 mb-3" />
                                    <p className="text-base font-medium">Resi Pembayaran</p>
                                    <p className="text-xs text-gray-600">Tanggal: {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString('id-ID') : 'N/A'}</p>
                                    <a href={getImageUrl(transaction.transaction_proof_path)} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                                        <Icon icon="ic:round-visibility" className="w-5 h-5" />
                                        Lihat Resi
                                    </a>
                                </div>
                            )}
                            {transaction.invoice_url && (
                                <div className="flex flex-col items-center">
                                    <Icon icon="ic:round-description" className="w-12 h-12 mb-3" />
                                    <p className="text-base font-medium">Invoice Transaksi</p>
                                    <a href={getImageUrl(transaction.invoice_url)} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2">
                                        <Icon icon="ic:round-cloud-download" className="w-5 h-5" />
                                        Unduh Invoice
                                    </a>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Icon icon="ic:round-folder-open" className="w-12 h-12 mb-3" />
                            <p className="text-base font-medium">Tidak ada dokumen yang tersedia.</p>
                            <p className="text-xs">Dokumen akan tersedia setelah transaksi selesai.</p>
                        </>
                    )}
                </div>
            </div>
        );
    }
    else if (transactionStatusId === 5) {
        rightCardContent = null; // Explicitly set to null to hide
    }
    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                <header className="">
                    <h2 className="text-xl font-bold">Detail Transaksi HKI</h2>
                    <p>Informasi lengkap tentang transaksi HKI Anda di sini.</p>
                </header>
                <div className="flex items-center max-md:justify-between gap-3">
                    <span className={`px-4 py-2 text-xs font-semibold rounded-full ${statusClasses}`}>
                        {transactionStatusName || 'Status Tidak Diketahui'}
                    </span>
                    <CopyableTransactionCode transactionCode={slug} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Detail Transaksi */}
                <div className="lg:col-span-2 bg-white  rounded-xl p-6">
                    <header className=' mb-6'>
                        <h2 className="text-xl font-bold text-gray-900">Informasi Transaksi</h2>
                        <p className="text-gray-600">Informasi lengkap tentang transaksi Anda di sini.</p>
                    </header>
                    <div className="space-y-5">
                        {/* Transaction Code */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Icon icon="ic:round-qr-code" className="w-5 h-5" />
                                <p className="text-sm">Kode Transaksi</p>
                            </div>
                            <CopyableTransactionCode transactionCode={slug} />
                        </div>

                        {/* Package Name */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Icon icon="ic:round-shopping-bag" className="w-5 h-5" />
                                <p className="text-sm">Nama Paket</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{transaction.package.name}</p>
                        </div>

                        {/* Amount */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Icon icon="ic:round-payments" className="w-5 h-5" />
                                <p className="text-sm">Jumlah</p>
                            </div>
                            <p className="text-sm font-semibold text-green-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(transaction.amount)}</p>
                        </div>

                        {/* Payment Method */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Icon icon="ic:round-credit-card" className="w-5 h-5" />
                                <p className="text-sm">Metode Pembayaran</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{transaction.payment_method?.name || 'N/A'}</p>
                        </div>

                        {/* Transaction Date */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Icon icon="ic:round-calendar-today" className="w-5 h-5" />
                                <p className="text-sm">Tanggal Transaksi</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{new Date(transaction.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>

                        {/* Status */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Icon icon="ic:round-check-circle" className="w-5 h-5" />
                                <p className="text-sm">Status</p>
                            </div>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusClasses}`}>
                                {transactionStatusName || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Dokumen (Conditional Rendering) */}
                {rightCardContent && (
                    <div className="lg:col-span-1">
                        {rightCardContent}
                    </div>
                )}
            </div>
        </div>
    );
}
