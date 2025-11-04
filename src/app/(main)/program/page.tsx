"use client";
import { Suspense, useState, useEffect } from 'react';

import { getPrograms } from '@/features/program/data';
import  { Program } from '@/features/program/data';
import ProgramList from '@/components/program/ProgramList';
import FullPageLoader from '@/components/ui/FullPageLoader';



function ProgramListFetcher() {
    'use client';
    const [programs, setPrograms] = useState<Program[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetcher = async () => {
            setIsLoading(true);
            const fetchedPrograms = await getPrograms();
            setPrograms(fetchedPrograms);
            setIsLoading(false);
        };
        fetcher();
    }, []);

    return <ProgramList programs={programs} isLoading={isLoading} />;
}

export default function ProgramListPage() {
    return (
        <Suspense fallback={<FullPageLoader />}>
            <ProgramListFetcher />
        </Suspense>
    );
}