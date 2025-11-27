// src/components/forms/generic/GenericField.tsx
'use client';

import React from 'react';

interface GenericFieldProps {
    field: {
        name: string;
        label: string;
        type: string;
        placeholder?: string;
    };
    value: string | number | boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string | null;
    disabled?: boolean;
}

const GenericField: React.FC<GenericFieldProps> = ({ field, value, onChange, error, disabled }) => {
    // commonProps no longer includes 'value' to avoid type conflicts with checkboxes
    const commonProps = {
        id: field.name,
        name: field.name,
        onChange,
        disabled,
        placeholder: field.placeholder,
        className: `w-full p-3 rounded-md bg-slate-100 border border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition ${error ? 'ring-2 ring-red-500' : ''} ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`,
    };

    if (field.type === 'checkbox') {
        return (
            <label className="flex items-start space-x-3 py-2">
                <input 
                    type="checkbox"
                    // Spread props without value
                    {...commonProps}
                    // Use checked for state, not value
                    checked={!!value} 
                    // The onChange here is specific to checkboxes, converting checked status to a value
                    onChange={e => onChange({ target: { name: field.name, value: e.target.checked } } as any)} 
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1" 
                />
                <span className="text-gray-700 text-sm">{field.label}</span>
            </label>
        );
    }

    if (field.type === 'textarea') {
        // Apply value directly here
        return <textarea {...commonProps} value={String(value || '')} rows={4} />;
    }

    // Apply value directly here for default input types
    return <input type={field.type} {...commonProps} value={String(value || '')} />;
};

export default GenericField;
