
import React from 'react';

const StyledInputField = ({ label, placeholder, required = false, name, value, onChange, type = 'text', readOnly = false }: { label: string; placeholder: string; required?: boolean; name: string; value: string; onChange?: (arg0: React.ChangeEvent<HTMLInputElement>) => void; type?: string; readOnly?: boolean; }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            required={required}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${readOnly ? 'bg-gray-100' : 'bg-white'}`}
        />
    </div>
);

export default StyledInputField;
