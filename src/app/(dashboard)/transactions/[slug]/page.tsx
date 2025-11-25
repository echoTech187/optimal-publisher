// src/app/(dashboard)/transactions/[slug]/page.tsx
import { fetchTransaction } from '@/features/payment/data';
import { getSession } from '@/features/auth/session';
import { redirect } from 'next/navigation';
import CopyableTransactionCode from './CopyableTransactionCode';
import { Icon } from '@iconify/react';
import { getImageUrl } from '@/lib/utils/image';
import Link from 'next/link';
import { Transaction } from '@/types/transaction';

// --- Helper Components ---

const DetailRow = ({ icon, label, value }: { icon: string; label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <Icon icon={icon} className="w-5 h-5" />
            <p className="text-sm">{label}</p>
        </div>
        <div className="text-sm font-medium text-gray-900 dark:text-gray-200 text-right max-w-[60%]">
            {value}
        </div>
    </div>
);

const StatusBadge = ({ status, id, className = '' }: { status?: string; id?: number; className?: string }) => {
    let statusClasses = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    let statusName = status || 'Tidak Diketahui';

    if (id) {
        switch (id) {
            case 1: statusClasses = "bg-yellow-100 text-yellow-800"; statusName = 'Menunggu Pembayaran'; break;
            case 2: statusClasses = "bg-blue-100 text-blue-800"; statusName = 'Menunggu Konfirmasi'; break;
            case 3: statusClasses = "bg-red-100 text-red-800"; statusName = 'Dibatalkan'; break;
            case 4: statusClasses = "bg-red-100 text-red-800"; statusName = 'Gagal'; break;
            case 5: statusClasses = "bg-indigo-100 text-indigo-800"; statusName = 'Diproses'; break;
            case 6: statusClasses = "bg-purple-100 text-purple-800"; statusName = 'Selesai'; break;
            case 7: statusClasses = "bg-green-100 text-green-800"; statusName = 'Dikirim'; break;
            case 8: statusClasses = "bg-cyan-100 text-cyan-800"; statusName = 'Revisi'; break;
            case 9: statusClasses = "bg-gray-100 text-gray-800"; statusName = 'Kadaluarsa'; break;
        }
    }

    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusClasses} ${className}`}>
            {statusName}
        </span>
    );
};

// --- Main Page Components ---

const TransactionHeader = ({ transaction }: { transaction: Transaction }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
            <Link href="/transactions" className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Icon icon="ion:arrow-back-outline" className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Detail Transaksi</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lihat rincian lengkap transaksimu.</p>
            </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-center">
            <StatusBadge status={transaction.status?.status} id={transaction.status?.id} />
        </div>
    </div>
);

const TransactionDetailsCard = ({ transaction }: { transaction: Transaction }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200/80 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Informasi Pengajuan</h2>
        </div>
        <div className="p-6 space-y-2">
            <DetailRow icon="ic:round-qr-code" label="Kode Transaksi" value={<CopyableTransactionCode transactionCode={transaction.transaction_code} />} />
            <DetailRow icon="ic:round-shopping-bag" label="Nama Paket" value={transaction.pack_name} />
            <DetailRow 
                icon="ic:round-category" 
                label="Judul" 
                value={
                    <div 
                        className='text-capitalize' 
                        dangerouslySetInnerHTML={{
                            __html: (transaction.transactionable?.book_title || transaction.transactionable?.title) || 'N/A',
                        }} 
                    />
                } 
            />
        </div>
    </div>
);

const PaymentDetailsCard = ({ transaction }: { transaction: Transaction }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200/80 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Rincian Pembayaran</h2>
        </div>
        <div className="p-6 space-y-2">
            <DetailRow icon="ic:round-payments" label="Jumlah" value={<span className="font-semibold text-green-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(transaction.amount)}</span>} />
            <DetailRow icon="ic:round-credit-card" label="Metode Pembayaran" value={transaction.payment_method?.name || 'N/A'} />
            <DetailRow icon="ic:round-calendar-today" label="Tanggal Transaksi" value={new Date(transaction.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} />
        </div>
    </div>
);

const ActionCard = ({ transaction }: { transaction: Transaction }) => {
    const statusId = transaction.status?.id;

    // status.id === 1 (Menunggu Pembayaran)
    if (statusId === 1) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700 p-6 text-center">
                <div className="p-3 inline-block bg-yellow-100 rounded-full mb-4">
                    <Icon icon="ion:alert-circle-outline" className="w-8 h-8 text-yellow-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Selesaikan Pembayaran</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-6">Pesanan Anda belum selesai. Silakan lanjutkan pembayaran sebelum batas waktu berakhir.</p>
                <a href={`/payment/${transaction.transaction_code}`} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 transition-colors">
                    Lanjutkan Pembayaran
                    <Icon icon="ion:arrow-forward-outline" />
                </a>
            </div>
        );
    }

    // status.id === 2, 8 (Menunggu Konfirmasi, Revisi)
    if (statusId === 2 || statusId === 8) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Bukti Pembayaran</h3>
                <div className="flex flex-col items-center justify-center text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    {transaction.receipt_url ? (
                        <>
                            <Icon icon="ion:receipt-outline" className="w-10 h-10 mb-3 text-blue-500" />
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Bukti Terlampir</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tanggal: {transaction.receipt_date ? new Date(transaction.receipt_date).toLocaleDateString('id-ID') : 'N/A'}</p>
                            <a href={getImageUrl(transaction.receipt_url)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                                <Icon icon="ion:eye-outline" />
                                Lihat Bukti
                            </a>
                        </>
                    ) : (
                        <>
                            <Icon icon="ion:document-attach-outline" className="w-10 h-10 mb-3" />
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Belum Ada Bukti</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Silakan unggah bukti pembayaran.</p>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // status.id === 5, 6, 7 (Diproses, Selesai, Dikirim)
    if (statusId === 5 || statusId === 6 || statusId === 7) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Dokumen Transaksi</h3>
                <div className="space-y-4">
                    {transaction.receipt_url && (
                         <a href={getImageUrl(transaction.receipt_url)} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <Icon icon="ion:receipt-outline" className="w-6 h-6 text-blue-500" />
                                <div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">Bukti Pembayaran</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Lihat bukti pembayaran</p>
                                </div>
                            </div>
                            <Icon icon="ion:chevron-forward-outline" className="w-5 h-5 text-gray-400" />
                        </a>
                    )}
                    {transaction.invoice_url && (
                        <a href={getImageUrl(transaction.invoice_url)} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                                <Icon icon="ion:document-text-outline" className="w-6 h-6 text-green-500" />
                                <div>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">Invoice</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Unduh invoice transaksi</p>
                                </div>
                            </div>
                            <Icon icon="ion:download-outline" className="w-5 h-5 text-gray-400" />
                        </a>
                    )}
                     {!transaction.receipt_url && !transaction.invoice_url && (
                        <div className="text-center text-gray-500 py-8">
                            <Icon icon="ion:folder-open-outline" className="w-10 h-10 mx-auto mb-3" />
                            <p className="font-semibold text-sm">Tidak ada dokumen.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default: No action card for other statuses (Failed, Cancelled, Expired)
    return null;
};

const HelpCard = () => (
    <div className="bg-fuchsia-700 rounded-xl p-6 text-white text-center">
         <div className="p-3 inline-block bg-white/20 rounded-full mb-4">
            <Icon icon="ion:headset-outline" className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold">Butuh Bantuan?</h3>
        <p className="text-sm opacity-80 mt-2 mb-6">Tim kami siap membantu jika Anda mengalami kendala terkait transaksi ini.</p>
        <a href="https://wa.link/gkfaqz" target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-fuchsia-700 bg-white rounded-lg hover:bg-gray-100 transition-colors">
            <Icon icon="ion:logo-whatsapp" />
            Hubungi Support
        </a>
    </div>
);


// --- Main Page ---

export default async function TransactionDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const session = await getSession();
    if (!session || !session.id) {
        redirect('/signin');
    }

    const transaction = await fetchTransaction(slug);

    if (!transaction) {
        return (
            <div className="p-8 text-center text-gray-500 text-lg flex flex-col items-center justify-center h-screen bg-gray-50">
                <Icon icon="ion:search-outline" className="w-16 h-16 mb-4 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-800">Transaksi Tidak Ditemukan</h2>
                <p className="mt-2">Sepertinya kode transaksi yang Anda cari tidak ada.</p>
                <Link href="/transactions" className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800">
                    <Icon icon="ion:arrow-back-outline" />
                    Kembali ke Riwayat
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
            <TransactionHeader transaction={transaction} />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <TransactionDetailsCard transaction={transaction} />
                    <PaymentDetailsCard transaction={transaction} />
                </div>
                <div className="lg:col-span-1 space-y-8">
                    <ActionCard transaction={transaction} />
                    <HelpCard />
                </div>
            </div>
        </div>
    );
}
