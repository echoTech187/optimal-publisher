// src/components/forms/generic/RenderFormField.tsx
'use client';

import React from 'react';
import GenericField from './GenericField';
import GenericSelect from './GenericSelect';
import GenericFileUpload from './GenericFileUpload';

// Assuming formValues and errors are structured as before
interface RenderFormFieldProps {
    field: any; // Consider creating a more specific type for the field object
    formValues: any;
    handleValueChange: (e: React.ChangeEvent<any>) => void;
    errors: any;
}

const RenderFormField: React.FC<RenderFormFieldProps> = ({ field, formValues, handleValueChange, errors }) => {
    const clientError = errors[field.name];
    const serverError = formValues.serverErrors?.[field.name]?.[0];
    const error = clientError || serverError;

    // Define a wrapper class for fields that should span two columns
    const wrapperClass = ['textarea', 'checkbox', 'file'].includes(field.type) ? 'lg:col-span-2' : '';

    const fieldComponent = () => {
        switch (field.type) {
            case 'select':
                return <GenericSelect field={field} value={formValues[field.name]} onChange={handleValueChange} error={error} formValues={formValues} />;
            case 'file':
                return <GenericFileUpload field={field} onFileChange={(fieldName: string, fileId: string) => handleValueChange({ target: { name: fieldName, value: fileId } } as any)} error={error} />;
            case 'text':
            case 'textarea':
            case 'tel':
            case 'email':
            case 'checkbox':
                return <GenericField field={field} value={formValues[field.name]} onChange={handleValueChange} error={error} disabled={field.disabled || (field.name === 'fullname' || field.name === 'phone')} />;
            case 'hidden':
                return <input type="hidden" name={field.name} value={formValues[field.name] || ''} />;
            default:
                console.warn(`Unknown field type: ${field.type}`);
                return null;
        }
    };

    return (
        <div className={wrapperClass}>
            <div className="flex flex-col space-y-1">
                {field.type !== 'checkbox' && <label htmlFor={field.name} className="font-semibold text-gray-700 text-sm">{field.label} {field.required_frontend && <span className="text-red-500">*</span>}</label>}
                {fieldComponent()}
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        </div>
    );
};

export default RenderFormField;
