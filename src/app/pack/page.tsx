import { Suspense } from "react";
import { MultiPack, SinglePack } from "./pack";
import getProgramPackage from "@/lib/data/package";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

// Komponen ini menangani pengambilan data (async)
async function PackPageContent({ packageKey }: { packageKey: number }) {
    const packages = await getProgramPackage({ slug: packageKey });
    const session = await getSession();
    if (!session) {
        redirect('/auth/signin');
    }
    if (packages.length === 0) {
        redirect('/error/404');
    }
    if (packages.length > 1) {
        return <MultiPack data={packages} user={session} />;
    }


    return <SinglePack data={packages} user={session} />;
}

// Komponen Page utama sekarang menjadi sinkronus
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    // Menggunakan URLSearchParams untuk mengakses parameter, sebagai upaya terakhir
    const params = await searchParams;
    const packageKey = params.key ? parseInt(Array.isArray(params.key) ? params.key[0] : params.key, 10) : NaN;

    if (isNaN(packageKey)) {
        // Jika packageKey tidak valid, redirect atau tampilkan pesan error
        redirect('/error/404'); // Atau halaman error lainnya
    }
    return (
        <Suspense fallback={<>
            <div className='flex justify-center items-center h-screen'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        </>}>
            <PackPageContent packageKey={packageKey} />
        </Suspense>
    );
}