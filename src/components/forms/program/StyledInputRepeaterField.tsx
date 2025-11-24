
import { FormField, FormRepeater } from '@/types/program';
import React from 'react';

const StyledInputRepeaterField = ({ repeaterFields, required = false,  value, onChange, readOnly = false }: { repeaterFields: FormRepeater; required?: boolean; value: string; onChange?: (arg0: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; readOnly?: boolean; }) => (
    <>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {repeaterFields.label}
        </label>
        <input
            required={required}
            type={repeaterFields.type}
            placeholder={`Silahkan isi ${repeaterFields.label}`}
            name={repeaterFields.name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            id={repeaterFields.name}
            className={`w-full border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${readOnly ? 'bg-gray-100' : 'bg-white'}`}
        />
    </>
);

export default StyledInputRepeaterField;
