import { fetchTransaction } from '@/features/payment/data';
import { getSession } from '@/features/auth/session';
import { redirect } from 'next/navigation';
import CopyableTransactionCode from './CopyableTransactionCode';
import { Icon } from '@iconify/react';
import { getImageUrl } from '@/lib/utils/image';

export default async function TransactionDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    const session = await getSession();
    if (!session || !session.id) {
        redirect('/signin');
    }

    const transaction = await fetchTransaction(slug);

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
            <div className="flex h-full w-full flex-col items-center justify-center">
                            <Icon icon="ic:round-folder-open" className="w-12 h-12 mb-3" />
                            <p className="text-base font-medium">Pesanan belum selesai.</p>
                            <p className="text-xs">Silahkan lanjutkan dengan menekan tombol di bawah ini untuk melanjutkan.</p>
                            <a href={`/payment/${slug}`} className="mt-4 px-4 py-2 border border-fuchsia-600 text-fuchsia-600 rounded-md hover:border-fuchsia-700 transition-colors flex items-center gap-2">
                                Lanjutkan Pembayaran <Icon icon="tabler:arrow-right" className="size-6" width="24" height="24" />
                            </a>
                        </div>
        );
    }
    // Condition 2: status.id === 2 or 8 (Pending/Processing)
    else if (transactionStatusId === 2 || transactionStatusId === 8) {
        
        rightCardContent = (
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Dokumen</h2>
                <div className="flex flex-col items-center justify-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
                    {transaction.receipt_url ? (
                        <>
                            <Icon icon="ic:round-receipt" className="w-12 h-12 mb-3" />
                            <p className="text-base font-medium">Resi Pembayaran</p>
                            <p className="text-xs text-gray-600">Tanggal: {transaction.receipt_date ? new Date(transaction.receipt_date).toLocaleDateString('id-ID') : 'N/A'}</p>
                            <a href={getImageUrl(transaction.receipt_url)} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
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
    else if (transactionStatusId === 3 || transactionStatusId === 4 || transactionStatusId === 9) {
        rightCardContent = null; // Explicitly set to null to hide
    }
    // Condition 4: status.id === 5, 6, or 7 (Completed/Delivered)
    else if (transactionStatusId === 5 || transactionStatusId === 6 || transactionStatusId === 7) {
        rightCardContent = (
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dokumen</h2>
                <div className="flex flex-col items-center justify-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
                    {transaction.receipt_url || transaction.invoice_url ? (
                        <>
                            {transaction.receipt_url && (
                                <div className="flex flex-col items-center mb-4">
                                    <Icon icon="ic:round-receipt" className="w-12 h-12 mb-3" />
                                    <p className="text-base font-medium">Resi Pembayaran</p>
                                    <p className="text-xs text-gray-600">Tanggal: {transaction.receipt_date ? new Date(transaction.receipt_date).toLocaleDateString('id-ID') : 'N/A'}</p>
                                    <a href={getImageUrl(transaction.receipt_url)} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
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

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-[#F4F7FE]">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">Detail Transaksi</h1>
                <div className="flex items-center max-md:justify-between gap-3">
                    <span className={`px-4 py-2 text-xs font-semibold rounded-full ${statusClasses}`}>
                        {transactionStatusName || 'Status Tidak Diketahui'}
                    </span>
                    <CopyableTransactionCode transactionCode={transaction.transaction_code} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Detail Transaksi */}
                <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Transaksi</h2>
                    <div className="space-y-5">
                        {/* Transaction Code */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Icon icon="ic:round-qr-code" className="w-5 h-5" />
                                <p className="text-sm">Kode Transaksi</p>
                            </div>
                            <CopyableTransactionCode transactionCode={transaction.transaction_code} />
                        </div>

                        {/* Package Name */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Icon icon="ic:round-shopping-bag" className="w-5 h-5" />
                                <p className="text-sm">Nama Paket</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{transaction.pack_name}</p>
                        </div>

                        {/* Item Pembelian */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Icon icon="ic:round-category" className="w-5 h-5" />
                                <p className="text-sm">Judul</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{String(transaction.transactionable?.title || transaction.transactionable?.book_title || 'N/A')}</p>
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