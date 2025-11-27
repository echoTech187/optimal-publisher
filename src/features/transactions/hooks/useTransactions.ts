// src/features/transactions/hooks/useTransactions.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import { redirect } from 'next/navigation';
import { Transaction } from '@/types/transaction';
import { getToken } from '@/lib/utils/token';

const ITEMS_PER_PAGE = 10;

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchTransactions = useCallback(async (page: number) => {
        setIsTableLoading(true);
        try {
            const sessionResponse = await fetch('/api/session');
            const session = await sessionResponse.json();
            const token = await getToken();

            if (!session || !session.id) {
                redirect('/signin');
                return; // Stop execution after redirect
            }

            const response = await fetch(`http://127.0.0.1:8000/api/v1/transactions?session=${session.id}&page=${page}&limit=${ITEMS_PER_PAGE}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Gagal mengambil data transaksi.');
            }

            const transactionsData = await response.json();
            const parsedData = transactionsData?.data ?? transactionsData?.items ?? transactionsData?.results ?? transactionsData?.records ?? [];
            const parsedTotal = transactionsData?.total ?? transactionsData?.totalItems ?? transactionsData?.meta?.total ?? transactionsData?.pagination?.total ?? transactionsData?.data?.total ?? 0;
            
            setTransactions(parsedData);
            setTotalItems(parsedTotal);

        } catch (error) {
            console.error("Error fetching transactions:", error);
            // Optionally, set an error state to show in the UI
            setTransactions([]);
            setTotalItems(0);
        } finally {
            setIsLoading(false); // Overall page load is done after first fetch
            setIsTableLoading(false); // Table specific loading is done
        }
    }, []); // useCallback with empty dependency array as it doesn't depend on props or state from outside

    useEffect(() => {
        fetchTransactions(currentPage);
    }, [currentPage, fetchTransactions]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return {
        transactions,
        isLoading,
        isTableLoading,
        totalItems,
        currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
        handlePageChange,
    };
}
