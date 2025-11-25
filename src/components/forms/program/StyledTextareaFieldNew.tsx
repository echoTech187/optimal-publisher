import { FormField } from '@/types/program';
import React from 'react';

const StyledTextareaFieldNew = ({ field, required = false, value, onChange, errors }: { field: FormField; required?: boolean; value?: string; onChange?: (arg0: React.ChangeEvent<HTMLTextAreaElement>) => void; errors: any; }) => (
    <>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required_frontend || required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            id={field.name}
            placeholder={field.placeholder}
            name={field.name}
            value={value}
            required={field.required_frontend || required}
            onChange={onChange}
            className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </>

);

export default StyledTextareaFieldNew;