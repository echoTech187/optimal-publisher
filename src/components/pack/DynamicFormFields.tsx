// src/components/pack/DynamicFormFields.tsx
'use client';

import { FormField, ProgramPackage } from '@/types/program';
import React from 'react';
import { useFormStatus } from 'react-dom';
import SubmitButton from '../forms/program/SubmitButton';
import StyledCheckBoxField from '../forms/program/StyledCheckBoxField';
import StyledRepeaterField from '../forms/program/StyledRepeaterField';
import { User } from '@/types/user';
import StyledFileUploadField from '../forms/program/StyledFileUploadField';
import StyledInputFieldNew from '../forms/program/StyledInputFieldNew';
import StyledTextareaFieldNew from '../forms/program/StyledTextareaFieldNew';
import StyledSelectFieldNew from '../forms/program/StyledSelectFieldNew';
import Alert from '@/components/ui/Alert';
import { useDynamicForm } from '@/features/pack/hooks/useDynamicForm';

// --- Props Interface ---
interface GenerateFormFieldsProps {
    selectedPackage: ProgramPackage | null;
    formFields: FormField[];
    formClassName?: string;
    user: User;
}

// --- Main Component ---
const DynamicFormFields: React.FC<GenerateFormFieldsProps> = ({ selectedPackage, formFields, formClassName, user }) => {
    const {
        formData,
        formErrors,
        isFormValid,
        loading,
        isFirstMemberReadOnly,
        handleInputChange,
        handleFileChange,
        handleRepeaterChange,
        handleSubmit,
        alertProps,
        isPending
    } = useDynamicForm(formFields, user, selectedPackage);

    const renderField = (field: FormField) => {
        const value = formData[field.name] || (field.type === 'repeater' ? [] : '');
        const error = formErrors[field.name];

        switch (field.type) {
            case 'textarea':
                return <StyledTextareaFieldNew field={field} value={value} onChange={handleInputChange} errors={error} />;
            case 'select':
                return <StyledSelectFieldNew field={field} formData={formData} value={value} onChange={handleInputChange} />;
            case 'repeater':
                return <StyledRepeaterField field={field} value={value} onChange={handleRepeaterChange} firstItemReadOnly={isFirstMemberReadOnly} />;
            case 'file':
                return <StyledFileUploadField field={field} error={error} onChange={(value: any) => handleFileChange(field.name, value)} />;
            case 'checkbox':
                return <StyledCheckBoxField field={field} value={value} onChange={handleInputChange} />;
            case 'text':
            case 'email':
            case 'tel':
            default:
                return <StyledInputFieldNew field={field} value={value} onChange={handleInputChange} readOnly={formData[field.name + '_readonly']} />;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={formClassName} id="form-customer">
                {formFields.map(field => (
                    <div key={field.name} className={`${field.field_class_name} mb-4`} id={`form-${field.name}-name`}>
                        {renderField(field)}
                    </div>
                ))}
                <FormSubmitter loading={loading || isPending} disabled={!isFormValid} />
            </form>
            <Alert {...alertProps} />
        </>
    );
};

function FormSubmitter({ loading, disabled }: { loading: boolean, disabled: boolean }) {
    const { pending } = useFormStatus();
    return <SubmitButton loading={loading || pending} title="Lanjutkan Pembayaran" disabled={loading || disabled} />;
}

export default DynamicFormFields;