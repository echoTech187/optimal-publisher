// src/components/forms/program/StyledSelectFieldNew.tsx
'use client';

import { FormField } from '@/types/program';
import React from 'react';
import { useSelectOptions } from '@/lib/hooks/useSelectOptions';

interface StyledSelectFieldNewProps {
    field: FormField;
    required?: boolean;
    value: string;
    onChange: (arg0: React.ChangeEvent<HTMLSelectElement>) => void;
    formData?: any;
}

const StyledSelectFieldNew: React.FC<StyledSelectFieldNewProps> = ({ field, required = false, value, onChange, formData }) => {
    // All logic is now in the hook
    const { options, loading, isDisabled } = useSelectOptions(field, formData, onChange);

    return (
        <>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} {field.required_frontend || required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={field.name}
                name={field.name}
                value={value}
                onChange={onChange}
                disabled={isDisabled || options.length === 0}
                className="w-full select select-field-large bg-white select- border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">{loading ? 'Memuat...' : (field.placeholder || 'Pilih salah satu')}</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </>
    );
};

export default StyledSelectFieldNew;
