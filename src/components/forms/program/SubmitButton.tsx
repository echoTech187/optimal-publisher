"use client";

import React, { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

const SubmitButton = ({ loading, title, disabled }: { loading: boolean, title: string, disabled?: boolean }) => {
    const { showLoader, hideLoader } = useLoading();

    useEffect(() => {
        if (loading) {
            showLoader();
        } else {
            hideLoader();
        }
        // Cleanup on unmount
        return () => hideLoader();
    }, [loading, showLoader, hideLoader]);

    return (
        <div className=" col-span-2" id="form-customer-address">
            <button type="submit" className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400" disabled={loading || disabled}>
                {loading ? 'Memproses...' : title}
            </button>
        </div>
    );
};

export default SubmitButton;
