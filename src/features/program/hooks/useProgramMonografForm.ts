
import { useState, useEffect } from 'react';
import { fetchMajors, fetchInstitutions } from '@/features/form/data';
import type { Major, Institution } from '@/types/form';

export const useProgramMonografForm = () => {
    const [majors, setMajors] = useState<Major[]>([]);
    const [institutions, setInstitutions] = useState<Institution[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const majorData = await fetchMajors();
                setMajors(majorData);
                const institutionData = await fetchInstitutions();
                setInstitutions(institutionData);
            } catch (err) {
                setError("Gagal memuat data. Silakan coba lagi.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return {
        majors,
        institutions,
        loading,
        error,
    };
};
