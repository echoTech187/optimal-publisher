import React from 'react';

const StyledTextareaField = ({ label, placeholder, required = false, name, value, onChange }: { label: string; placeholder: string; required?: boolean; name: string; value?: string; onChange?: (arg0: React.ChangeEvent<HTMLTextAreaElement>) => void; }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

export default StyledTextareaField;