import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getPrograms } from '@/features/program/data';
import ProgramList from '@/components/program/ProgramList';
import ProgramListLoading from '@/components/program/ProgramListLoading';

export const metadata: Metadata = {
  title: 'Program Unggulan | Optimal Untuk Negeri',
  description: 'Pilih program unggulan yang sesuai dengan kebutuhanmu dari Optimal Untuk Negeri.',
};

// Helper component to fetch data and render the list
// This pattern helps keep the main page component clean
// {/* @ts-expect-error Server Component */}
async function ProgramListFetcher() {
    const programs = await getPrograms();
    return <ProgramList programs={programs} />;
}

export default function ProgramListPage() {
    // Middleware handles authentication, so no need for checks here.
    // The page is protected server-side.

    return (
        <Suspense fallback={<ProgramListLoading />}>
            
            <ProgramListFetcher />
        </Suspense>
    );
}