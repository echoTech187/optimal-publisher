import Link from 'next/link';

export default function PaymentSuccessPage({ params }: { params: { slug: string } }) {
    return (
        <div className="container mx-auto my-[100px] p-4 text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Pendaftaran Berhasil!</strong>
                <span className="block sm:inline"> Terima kasih telah mendaftar untuk acara ini.</span>
            </div>
            <div className="mt-6">
                <Link href={`/event/${params.slug}`} className="text-blue-500 hover:underline">
                    Kembali ke halaman acara
                </Link>
                <span className="mx-4">|</span>
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Pergi ke dashboard
                </Link>
            </div>
        </div>
    );
}
