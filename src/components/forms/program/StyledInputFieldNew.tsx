
import { FormField } from '@/types/program';
import React from 'react';

const StyledInputFieldNew = ({ field, required = false,  value, onChange, readOnly = false }: { field: FormField; required?: boolean; value: string; onChange?: (arg0: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; readOnly?: boolean; }) => (
    <>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required_frontend || required && <span className="text-red-500">*</span>}
        </label>
        <input
            required={field.required_frontend || required}
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            id={field.name}
            className={`w-full border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${readOnly ? 'bg-gray-100' : 'bg-white'}`}
        />
    </>
);

export default StyledInputFieldNew;
