'use client';

import { useEffect, useState } from "react";
import { getPrograms } from "@/features/program/data";
import { Program } from "@/types/program";
import ProgramCard from "@/components/program/ProgramCard";
import ProgramFilters from "@/components/program/ProgramFilters";
import Calendar from "@/components/ui/Calendar";
import OnlineUsers from "@/components/user/OnlineUsers";
import ProgramCardSkeleton from "@/components/program/ProgramCardSkeleton";

export default function DashboardPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            setIsLoading(true);
            const fetchedPrograms = await getPrograms();
            setPrograms(fetchedPrograms);
            setIsLoading(false);
        };
        fetchPrograms();
    }, []);

    return (
        <div className="flex flex-col xl:flex-row">
            <div className="w-full xl:w-2/3">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">My Programs</h1>
                </div>
                <ProgramFilters />
                <div>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => <ProgramCardSkeleton key={index} />)
                    ) : programs.length > 0 ? (
                        programs.map(program => <ProgramCard key={program.id} program={program} />)
                    ) : (
                         Array.from({ length: 5 }).map((_, index) => <ProgramCardSkeleton key={index} />)
                    )}
                </div>
            </div>
            <div className="w-full lg:w-1/3 lg:pl-8 mt-8 lg:mt-0 flex">
                <Calendar />
                <OnlineUsers />
            </div>
        </div>
    );
}