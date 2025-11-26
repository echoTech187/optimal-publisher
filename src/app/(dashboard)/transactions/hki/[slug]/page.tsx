// src/app/(dashboard)/transactions/hki/[slug]/page.tsx
import { fetchHkiTransaction } from '@/features/payment/data';
import { getSession } from '@/features/auth/session';
import { redirect } from 'next/navigation';
import CopyableTransactionCode from './CopyableTransactionCode';
import { Icon } from '@iconify/react';
import { getImageUrl } from '@/lib/utils/image';
import Link from 'next/link';

// Define a type for the HKI transaction for better type safety
type HkiTransaction = Awaited<ReturnType<typeof fetchHkiTransaction>>;

// --- Helper Components ---

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => {
    // Render the row even if value is null/empty, but display 'N/A'
    const displayValue = (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) ? 'N/A' : value;

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-0">{label}</p>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-200 text-left sm:text-right max-w-full sm:max-w-[60%]">
                {displayValue}
            </div>
        </div>
    );
};

const FileRow = ({ label, url }: { label: string; url: string | null | undefined }) => {
    if (!url) return null;
    return (
        <a href={getImageUrl(url)} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center gap-3">
                <Icon icon="ion:document-attach-outline" className="w-6 h-6 text-gray-500" />
                <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{label}</p>
                </div>
            </div>
            <Icon icon="ion:download-outline" className="w-5 h-5 text-gray-400" />
        </a>
    );
};

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
        }
    }

    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusClasses} ${className}`}>
            {statusName}
        </span>
    );
};

// --- Main Page Components ---

const HkiTransactionHeader = ({ transaction, slug }: { transaction: HkiTransaction, slug: string }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
            <Link href="/hki" className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Icon icon="ion:arrow-back-outline" className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Detail Pendaftaran HKI</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rincian pengajuan Hak Kekayaan Intelektual Anda.</p>
            </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-center">
            <StatusBadge status={transaction?.status?.status} id={transaction?.status?.id} />
        </div>
    </div>
);

const HkiDetailsCard = ({ transaction, slug }: { transaction: HkiTransaction, slug: string }) => (
    <>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200/80 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Informasi Pesanan</h2>
            </div>
            <div className="p-6">
                <DetailRow label="Kode Transaksi" value={<CopyableTransactionCode transactionCode={slug} />} />
                <DetailRow label="Tanggal Pengajuan" value={new Date(transaction?.created_at || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} />
                <DetailRow label="Pencipta" value={transaction?.creators?.map((c: any) => c.full_name).join(', ')} />
                <DetailRow label="Jenis Karya atau Ciptaan" value={transaction?.jenis_karya} />
                <DetailRow label="Status" value={<StatusBadge status={transaction?.status?.status} id={transaction?.status?.id} />} />
            </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200/80 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Daftar Pencipta</h2>
            </div>
            <div className="p-6">
                {
                    transaction?.creators?.map((c: any) => {
                        return (
                            <div key={c.id}>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Pencipta {transaction?.creators?.indexOf(c) + 1}</h2>
                                <DetailRow label="Nama" value={c.full_name} />
                                <DetailRow label="Email" value={c.email} />
                                <DetailRow label="Nomor Telepon" value={c.phone} />
                                <DetailRow label="Alamat" value={c.address} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
);

const HkiPaymentCard = ({ transaction }: { transaction: HkiTransaction }) => {
    if (!transaction?.package?.name && !transaction?.amount) return null;
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200/80 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Rincian Pembayaran</h2>
            </div>
            <div className="p-6">
                <DetailRow label="Paket" value={transaction?.package?.name} />
                <DetailRow label="Metode Pembayaran" value={transaction?.payment_method?.name} />
                <DetailRow label="Jumlah" value={<span className="font-semibold text-green-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(transaction?.amount || 0)}</span>} />
            </div>
        </div>
    );
};

const HkiFilesCard = ({ transaction }: { transaction: HkiTransaction }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200/80 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dokumen Pendukung</h2>
        </div>
        <div className="p-6 space-y-3">
            {
                transaction?.documents?.map((doc: any) => (


                    <FileRow key={doc.id} label={doc.document_type === 'ktp' ? 'KTP Pencipta' : doc.document_type === 'suratPernyataan' ? 'Surat Pernyataan' : doc.document_type === 'suratPengalihan' ? 'Surat Pengalihan' : doc.document_type === 'berkasKarya' ? 'Berkas Karya' : 'N/A'} url={doc.file_path} />
                ))
            }
        </div>
    </div>
);

const ActionCard = ({ transaction, slug }: { transaction: HkiTransaction, slug: string }) => {
    const statusId = transaction?.status?.id;

    if (statusId === 1) { // Menunggu Pembayaran
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700 p-6 text-center">
                <div className="p-3 inline-block bg-yellow-100 rounded-full mb-4">
                    <Icon icon="ion:wallet-outline" className="w-8 h-8 text-yellow-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Selesaikan Pembayaran</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-6">Pilih paket dan lanjutkan pembayaran untuk memproses pengajuan HKI Anda.</p>
                <Link href={`/hki/pricing?code_transaction=${slug}`} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 transition-colors">
                    Lanjutkan
                    <Icon icon="ion:arrow-forward-outline" />
                </Link>
            </div>
        );
    }

    if (statusId === 2) { // Menunggu Pembayaran (setelah memilih paket)
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700 p-6 text-center">
                <div className="p-3 inline-block bg-yellow-100 rounded-full mb-4">
                    <Icon icon="ion:wallet-outline" className="w-8 h-8 text-yellow-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Selesaikan Pembayaran</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-6">Lanjutkan ke halaman pembayaran untuk menyelesaikan transaksi Anda.</p>
                <Link href={`/hki/payment?code_transaction=${slug}`} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 transition-colors">
                    Lanjutkan Pembayaran
                    <Icon icon="ion:arrow-forward-outline" />
                </Link>
            </div>
        );
    }

    if (statusId === 3 || statusId === 4) { // Menunggu Konfirmasi
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Bukti Pembayaran</h3>
                <div className="space-y-3">
                    <FileRow label="Bukti Pembayaran" url={transaction?.payment.transaction_proof_path} />
                </div>
            </div>
        );
    }

    if (statusId === 5 || statusId === 6 || statusId === 7) { // Diproses, Selesai, Dikirim
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/80 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Dokumen Transaksi</h3>
                <div className="space-y-3">
                    <FileRow label="Bukti Pembayaran" url={transaction?.transaction_proof_path} />
                    <FileRow label="Invoice" url={transaction?.invoice_url} />
                    <FileRow label="Sertifikat HKI" url={transaction?.certificate_path} />
                </div>
            </div>
        );
    }

    return null; // No action card for other statuses
};

const HelpCard = () => (
    <div className="bg-fuchsia-700 rounded-xl p-6 text-white text-center">
        <div className="p-3 inline-block bg-white/20 rounded-full mb-4">
            <Icon icon="ion:headset-outline" className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold">Butuh Bantuan?</h3>
        <p className="text-sm opacity-80 mt-2 mb-6">Tim kami siap membantu jika Anda mengalami kendala terkait pengajuan HKI ini.</p>
        <a href="https://wa.link/gkfaqz" target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-fuchsia-700 bg-white rounded-lg hover:bg-gray-100 transition-colors">
            <Icon icon="ion:logo-whatsapp" />
            Hubungi Support
        </a>
    </div>
);

// --- Main Page ---

export default async function HkiDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const session = await getSession();
    if (!session || !session.id) {
        redirect('/signin');
    }

    const transaction = await fetchHkiTransaction(slug);
    if (!transaction) {
        return (
            <div className="p-8 text-center text-gray-500 text-lg flex flex-col items-center justify-center h-screen bg-gray-50">
                <Icon icon="ion:search-outline" className="w-16 h-16 mb-4 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-800">Pengajuan HKI Tidak Ditemukan</h2>
                <p className="mt-2">Sepertinya kode transaksi yang Anda cari tidak ada.</p>
                <Link href="/hki" className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800">
                    <Icon icon="ion:arrow-back-outline" />
                    Kembali ke Riwayat HKI
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
            <HkiTransactionHeader transaction={transaction} slug={slug} />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <HkiDetailsCard transaction={transaction} slug={slug} />
                    <HkiPaymentCard transaction={transaction} />
                    <HkiFilesCard transaction={transaction} />
                </div>
                <div className="lg:col-span-1 space-y-8">
                    <ActionCard transaction={transaction} slug={slug} />
                    <HelpCard />
                </div>
            </div>
        </div>
    );
}