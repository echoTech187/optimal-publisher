
import { Suspense } from "react";
import Pack from "./pack";
import getProgramPackage from "@/lib/data/package";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";


export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    // 2. Fetch data on the server.
    // The page will automatically wait for this to complete before rendering.
    const packageKey = searchParams.key ? parseInt(searchParams.key as string, 10) : NaN;

    const packages = await getProgramPackage({ slug: packageKey });
    const session = await getSession();
    if (!session) {
        redirect('/auth/signin');
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Pack data={packages} user={session} />
        </Suspense>
    );
}