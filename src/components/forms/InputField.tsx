// src/components/forms/InputField.tsx
'use client';

import React from 'react';

interface InputFieldProps {
    label: string;
    placeholder: string;
    required?: boolean;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    type?: string;
    readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, required = false, name, value, onChange, type = 'text', readOnly = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={readOnly} // Also disable if readOnly
        />
    </div>
);

export default InputField;
