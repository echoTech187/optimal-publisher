
import React from 'react';
import ProgramCard from "./ProgramCard";
import ProgramCardSkeleton from "./ProgramCardSkeleton";

interface Program {
    id: number;
    program_name: string;
    program_description: string;
    images: string;
}

const ProgramList = ({ programs, isLoading }: { programs: Program[], isLoading: boolean }) => {
    return (
        <section className="w-full h-auto py-24 px-4 container mx-auto">
            <header className="relative mb-12 text-center">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight uppercase">Pilih jenis program</h2>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <ProgramCardSkeleton key={index} />
                    ))
                ) : programs.length > 0? (
                    programs.map((program : Program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                        <p className="text-lg">Tidak ada program yang tersedia saat ini.</p>
                    </div>
                )}
            </main>
        </section>
    );
}

export default ProgramList;
