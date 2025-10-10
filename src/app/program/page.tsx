
import { imageUrl } from "@/lib/utils/api";
import { getPrograms } from "@/lib/data/program";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

// This is now a Server Component
export default async function ProgramListPage() {
    // Authentication is now handled by middleware.ts

    // 2. Fetch data on the server.
    // The page will automatically wait for this to complete before rendering.
    const programs = await getPrograms();

    return (
        <Suspense fallback={<>
            <div className='flex justify-center items-center h-screen'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        </>}>
            <section className="w-full h-auto py-[150px] px-4 max-w-[1300px] mx-auto 2xl:px-0" id="program">
                <header className="relative mb-24 text-center">
                    <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Program Unggulan</h1>
                    <p>Pilih program yang sesuai dengan kebutuhanmu</p>
                </header>

                {/* No more isLoading state needed. The page renders when data is ready. */}
                <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    {programs.length > 0 ? (
                        programs.map((program: any) => (
                            <div className="card w-full bg-base-100 shadow-xl" key={program.id}>
                                <figure style={{ height: '400px' }}>
                                    <Image priority={true}
                                        src={`${program.images ? imageUrl() + '/' + program.images : '/images/placeholder.png'}`}
                                        alt={program.program_name}
                                        width={0}
                                        height={0}

                                        className="size-full object-cover"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{program.program_name}</h2>
                                    <p>{program.program_description}</p>
                                    <div className="card-actions justify-center">
                                        {/* Use a Link component for navigation instead of window.location.href */}
                                        <Link href={`/pack?key=${program.id}`} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center">
                                            Lanjutkan
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            <p>Tidak ada program yang tersedia saat ini.</p>
                        </div>
                    )}
                </main>
            </section>
        </Suspense>
    );
}
