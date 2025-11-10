
import React from 'react';

const StyledSelectField = ({ label, required = false, name, value, onChange, disabled = false, children }: { label: string; required?: boolean; name: string; value: string; onChange: (arg0: React.ChangeEvent<HTMLSelectElement>) => void; disabled?: boolean; children: React.ReactNode; }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
        required={required}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full select select-field-large bg-white select- border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {children}
        </select>
    </div>
);

export default StyledSelectField;
