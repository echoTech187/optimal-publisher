import Link from 'next/link';

export default async function PaymentErrorPage({ params, searchParams }: { params: { slug: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
    const errorMessage = await searchParams?.message || "Terjadi kesalahan saat mendaftar acara.";

    return (
        <div className="container mx-auto my-[100px] p-4 text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Pendaftaran Gagal!</strong>
                <span className="block sm:inline"> {errorMessage}</span>
            </div>
            <div className="mt-6">
                <Link href={`/event/${params?.slug}/payment`} className="text-blue-500 hover:underline">
                    Coba lagi
                </Link>
                <span className="mx-4">|</span>
                <Link href={`/event/${params?.slug}`} className="text-blue-500 hover:underline">
                    Kembali ke halaman acara
                </Link>
            </div>
        </div>
    );
}
