
import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { Metadata } from 'next';

import { getProgramPackage } from "@/features/program/data";
import { getSession } from "@/features/auth/session";

import PackView from "@/components/pack/PackView";
import PackLoading from "@/components/pack/PackLoading";

export const metadata: Metadata = {
    title: 'Pilih Paket | Optimal Untuk Negeri',
    description: 'Pilih paket program yang sesuai dengan kebutuhanmu.',
};

// This helper component fetches the data and renders the view.
// It allows the main page to remain clean and use Suspense effectively.
async function PackDataFetcher({ packageKey }: { packageKey: number }) {
    // Fetch packages and session in parallel
    const [packages, session] = await Promise.all([
        getProgramPackage(packageKey),
        getSession(),
    ]);
    console.log(packages);

    if (!session) {
        // Middleware should handle this, but as a fallback:
        redirect('/signin');
    }

    // if (packages.length === 0) {
    //     // Redirect to a 404 page if no packages are found for the key
    //     redirect('/not-found'); // Use the standard Next.js not-found page
    // }

    return <PackView packages={packages} user={session} />;
}


export default function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const packageKey = Number(searchParams?.key);
    console.log(packageKey);
    if (isNaN(packageKey)) {
        // Redirect if the key is missing or not a number
        redirect('/not-found');
    }

    return (
        <Suspense fallback={<PackLoading />}>

            <PackDataFetcher packageKey={packageKey} />
        </Suspense>
    );
}
