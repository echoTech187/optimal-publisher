// src/components/forms/generic/GenericSelect.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

// It's often a good practice to keep a hook co-located with the component that uses it,
// if it's not used anywhere else. Or move it to a dedicated hooks folder.
function useFieldOptions(field: any, formValues: any) {
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // --- PATCH SEMENTARA: Hardcode dependensi karena tidak ada di JSON ---
    // Idealnya, informasi ini datang dari backend.
    if (field.name === 'book_title') {
        field.depends_on_field = 'major';
        field.source_url = `http://127.0.0.1:8000/api/v1/isbn-books/by-major/{{major}}`;
    }
    if (field.name === 'book_topic') {
        field.depends_on_field = 'book_title';
        field.source_url = `http://127.0.0.1:8000/api/v1/isbn-topics/by-book/{{book_title}}`;
    }
    // --- AKHIR PATCH ---

    const sourceUrl = field.source_url;
    const dependsOnField = field.depends_on_field;
    const dependentValue = dependsOnField ? formValues[dependsOnField] : null;

    useEffect(() => {
        if (!sourceUrl) {
            setOptions([]);
            return;
        };

        if (dependsOnField && !dependentValue) {
            setOptions([]);
            return;
        }

        let finalUrl = sourceUrl;
        if (dependsOnField && dependentValue) {
            finalUrl = sourceUrl.replace(new RegExp(`{{${dependsOnField}}}`, 'g'), dependentValue);
        }

        const fetchOptions = async () => {
            setLoading(true);
            try {
                const response = await fetch(finalUrl);
                if (!response.ok) throw new Error(`Failed to fetch options from ${finalUrl}`);
                const data = await response.json();
                setOptions(Array.isArray(data) ? data : data.data || []);
            } catch (error) {
                console.error("Error fetching field options:", error);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [sourceUrl, dependsOnField, dependentValue]);

    return { options, loading };
}


interface GenericSelectProps {
    field: {
        name: string;
        placeholder?: string;
        source_value_field?: string;
        source_value_column?: string;
        source_label_field?: string;
        source_label_column?: string;
    };
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    error?: string | null;
    formValues: any;
}

const GenericSelect: React.FC<GenericSelectProps> = ({ field, value, onChange, error, formValues }) => {
    const { options, loading } = useFieldOptions(field, formValues);
    const selectWrapperStyle = "relative w-full";
    const selectStyle = `w-full p-3 rounded-md bg-slate-100 border border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none ${error ? 'ring-2 ring-red-500' : ''}`;

    const valueKey = field.source_value_field || field.source_value_column || 'id';
    const labelKey = field.source_label_field || field.source_label_column || 'name';

    return (
        <div className={selectWrapperStyle}>
            <select id={field.name} name={field.name} value={value || ''} onChange={onChange} disabled={loading || options.length === 0} className={selectStyle}>
                <option value="" disabled>{loading ? 'Memuat...' : field.placeholder}</option>
                {options.map((opt: any) => (
                    <option key={opt[valueKey]} value={opt[valueKey]}>
                        {opt[labelKey]}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Icon icon="ion:chevron-down-outline" />
            </div>
        </div>
    );
};

export default GenericSelect;
