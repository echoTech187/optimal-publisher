// src/app/components/form/GenerateFormFields.tsx
'use client';

import { FormField, ProgramPackage } from '@/types/program';
import React, { useState, useEffect, FormEvent, useCallback, useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import SubmitButton from '../forms/program/SubmitButton';
import StyledCheckBoxField from '../forms/program/StyledCheckBoxField';
import StyledRepeaterField from '../forms/program/StyledRepeaterField';
import { User } from '@/types/user';
import StyledFileUploadField from '../forms/program/StyledFileUploadField';
import StyledInputFieldNew from '../forms/program/StyledInputFieldNew';
import StyledTextareaFieldNew from '../forms/program/StyledTextareaFieldNew';
import StyledSelectFieldNew from '../forms/program/StyledSelectFieldNew';
import { submitReferenceProgram } from '@/features/program/actions';
import Alert, { useAlert } from '@/components/ui/Alert';

const initialState = {
    success: false,
    message: "",
    errors: undefined,
    transactionCode: null,
};

// --- Props Interface ---
interface GenerateFormFieldsProps {
    selectedPackage: ProgramPackage | null;
    formFields: FormField[];
    formClassName?: string;
    user: User; // Ditambahkan: Prop opsional untuk data pengguna
}


// --- Komponen Utama ---
const DynamicFormFields: React.FC<GenerateFormFieldsProps> = ({ selectedPackage, formFields, formClassName, user }) => {
    const [formState, formAction] = useActionState(submitReferenceProgram, initialState);
    const [isPending, startTransition] = useTransition();
    const { alertProps, showAlert, closeAlert } = useAlert();
    const [formData, setFormData] = useState<any>({});
    const [formErrors, setFormErrors] = useState<any>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFirstMemberReadOnly, setIsFirstMemberReadOnly] = useState(false); // New state for read-only

    // Inisialisasi state formData saat formFields atau user berubah
    useEffect(() => {
        const initialData: any = {
            user_id: user.id.toString(),
            program_id: selectedPackage ? selectedPackage.isbn_program_id.toString() : '',
            package_id: selectedPackage ? selectedPackage.id.toString() : '',
            package_name: selectedPackage ? selectedPackage.name : '',
            price: selectedPackage ? parseInt(selectedPackage.price.toString()).toString() : '',
        };
        formFields.forEach(field => {
            if (field.type === 'repeater') {
                const repeaterCount = field.repeater_count_field ? parseInt(field.repeater_count_field.toString(), 10) : 1;
                const emptyItem = (field.repeater_fields || []).reduce((acc: any, f: any) => ({ ...acc, [f.name]: '' }), {});
                initialData[field.name] = Array.from({ length: repeaterCount }, () => ({ ...emptyItem })); // Initialize with fixed empty items
            } else {
                // Pre-fill author data from user prop if available
                if (field.name === 'fullname' && user?.full_name) {
                    initialData[field.name] = user.full_name;
                    initialData[field.name + '_readonly'] = true;
                } else if (field.name === 'phone' && user?.phone_number) {
                    initialData[field.name] = user.phone_number;
                    initialData[field.name + '_readonly'] = true;
                } else {
                    initialData[field.name] = '';
                }
            }
        });
        setFormData(initialData);
        setFormErrors({});
        // Reset read-only status on formFields/user change
        setIsFirstMemberReadOnly(false);
    }, [formFields, user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // @ts-ignore
        const checked = e.target.checked;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prev: any) => {
            const updatedValues = { ...prev, [name]: newValue };
            const changedFieldMeta = formFields.find(f => f.name === name);

            // Update isFirstMemberReadOnly state based on checkbox
            if (changedFieldMeta?.name === 'include_main_author' && changedFieldMeta?.type === 'checkbox') {
                setIsFirstMemberReadOnly(newValue === true);
            }

            // Handle checkbox copy-to-repeater effect
            if (changedFieldMeta?.type === 'checkbox' && changedFieldMeta?.on_change_effect === 'copy_to_repeater') {
                const sourceFieldNames = changedFieldMeta.copy_source_fields && changedFieldMeta.copy_source_fields.split(',') || [];
                const targetRepeaterName = changedFieldMeta.copy_target_repeater;
                const targetRepeaterFieldNames = changedFieldMeta.copy_target_repeater_fields && changedFieldMeta.copy_target_repeater_fields.split(',');

                const currentRepeaterItems = updatedValues[targetRepeaterName || ''] || [];

                if (targetRepeaterFieldNames) {
                    const newRepeaterItem = targetRepeaterFieldNames.reduce((acc, targetName, index) => {
                        const sourceValue = updatedValues[sourceFieldNames[index]];
                        if (sourceValue !== undefined) {
                            acc[targetName] = updatedValues[sourceFieldNames[index]] || '';
                        }
                        return acc;
                    }, {} as { [key: string]: any });

                    if (newValue === true) { // if checked
                        const hasValidSource = Object.values(newRepeaterItem).some(val => val);
                        if (hasValidSource) {
                            const isAlreadyFirst = currentRepeaterItems.length > 0 &&
                                targetRepeaterFieldNames.every(key => currentRepeaterItems[0][key] === newRepeaterItem[key]);
                            if (!isAlreadyFirst) {
                                // Ensure the members array is large enough before attempting to place a value at index 0
                                const repeaterCount = changedFieldMeta.repeater_count_field ? parseInt(changedFieldMeta.repeater_count_field.toString(), 10) : 1;
                                const newMembersArray = Array.from({ length: repeaterCount }, (_, i) => currentRepeaterItems[i] || targetRepeaterFieldNames.reduce((acc, tn) => ({ ...acc, [tn]: '' }), {}));
                                newMembersArray[0] = newRepeaterItem;
                                updatedValues[targetRepeaterName || ''] = newMembersArray;
                            }
                        }
                    } else { // if unchecked
                        // Revert the first item to an empty state when unchecked
                        const repeaterCount = changedFieldMeta.repeater_count_field ? parseInt(changedFieldMeta.repeater_count_field.toString(), 10) : 1;
                        const newMembersArray = Array.from({ length: repeaterCount }, (_, i) => currentRepeaterItems[i] || targetRepeaterFieldNames.reduce((acc, tn) => ({ ...acc, [tn]: '' }), {}));

                        const emptyItem = targetRepeaterFieldNames.reduce((acc, tn) => ({ ...acc, [tn]: '' }), {});
                        newMembersArray[0] = emptyItem; // Make first item empty
                        updatedValues[targetRepeaterName || ''] = newMembersArray;
                    }
                }
            }

            // Handle source field updates while a 'copy_to_repeater' checkbox is checked
            formFields.forEach(fieldMeta => {
                if (fieldMeta.type === 'checkbox' && fieldMeta.on_change_effect === 'copy_to_repeater' && updatedValues[fieldMeta.name]) {
                    const sourceFieldNames = fieldMeta.copy_source_fields && fieldMeta.copy_source_fields.split(',');
                    if (sourceFieldNames?.includes(name)) {
                        const targetRepeaterName = fieldMeta.copy_target_repeater;
                        const targetRepeaterFieldNames = fieldMeta.copy_target_repeater_fields && fieldMeta.copy_target_repeater_fields.split(',');
                        const currentRepeaterItems = updatedValues[targetRepeaterName || ''] || [];
                        const repeaterCount = fieldMeta.repeater_count_field ? parseInt(fieldMeta.repeater_count_field.toString(), 10) : 1;
                        if (targetRepeaterFieldNames) {
                            const updatedRepeaterItem = targetRepeaterFieldNames.reduce((acc, targetName, index) => {
                                acc[targetName] = updatedValues[sourceFieldNames[index]] || '';
                                return acc;
                            }, {} as { [key: string]: any });

                            // Ensure the array is large enough and then update the first item
                            const newMembersArray = Array.from({ length: repeaterCount }, (_, i) => currentRepeaterItems[i] || targetRepeaterFieldNames.reduce((acc, tn) => ({ ...acc, [tn]: '' }), {}));
                            newMembersArray[0] = updatedRepeaterItem;
                            updatedValues[targetRepeaterName || ''] = newMembersArray;
                        }
                    }
                }
            });

            return updatedValues;
        });
    };

    const handleFileChange = (name: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
        
    };

    const handleRepeaterChange = (e: { target: { name: string, value: any } }) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = useCallback(() => { // Use useCallback for validateForm
        const errors: any = {};
        formFields.forEach(field => {
            const rules = field.rules ? field.rules.split('\n') : [];
            if (rules.includes('required')) {
                // Special handling for repeater fields
                if (field.type === 'repeater') {
                    if (!formData[field.name] || formData[field.name].length === 0) {
                        errors[field.name] = `${field.label} wajib memiliki setidaknya satu item.`;
                    }
                } else if (!formData[field.name]) { // General check for other field types
                    errors[field.name] = `${field.label} wajib diisi.`;
                }
            }
            // Anda bisa menambahkan validasi lain di sini
            // TODO: Implement more specific rules validation (e.g., max, email format)
        });
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid); // Update isFormValid here
        return isValid;
    }, [formData, formFields]); // Depend on formData and formFields

    // The useEffect should now call validateForm directly
    useEffect(() => {
        validateForm();
        setLoading(false);
    }, [formData, validateForm]); // Depend on formData and validateForm

    useEffect(() => {
        if (formState.message) {
            if (formState.success) {
                showAlert({
                    type: 'success',
                    title: 'Berhasil!',
                    message: formState.message,
                    onPrimaryClick: () => { window.location.href = '/payment/' + formState?.transactionCode; },
                    primaryButtonText: 'Lanjutkan',
                    onCloseCallback: () => { window.location.href = '/payment/' + formState?.transactionCode; },
                });
            } else {
                showAlert({
                    type: 'error',
                    title: 'Gagal!',
                    message: formState.message,
                    onCloseCallback: closeAlert,
                });
            }
            
        }
        setLoading(false);
    }, [formState, showAlert, closeAlert]);

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

    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            const newFormData = new FormData(e.currentTarget);
            newFormData.append('user_id', user.id.toString());
            newFormData.append('program_id', selectedPackage ? selectedPackage.isbn_program_id.toString() : '');
            newFormData.append('package_id', selectedPackage ? selectedPackage.id.toString() : '');
            newFormData.append('package_name', selectedPackage ? selectedPackage.name : '');
            newFormData.append('price', selectedPackage ? parseInt(selectedPackage.price.toString()).toString() : '');
            
            newFormData.delete('manuscript');
            newFormData.append('transactionable', JSON.stringify(formData));
            console.log(newFormData);
            startTransition(() => {
                formAction(newFormData);
            });
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
                <FormSubmitter loading={loading} disabled={!isFormValid} />
            </form>
            <Alert {...alertProps} />
        </>
    );
};
function FormSubmitter({ loading, disabled }: { loading: boolean, disabled: boolean }) {
    const { pending } = useFormStatus();
    return <SubmitButton loading={loading} title="Lanjutkan Pembayaran" disabled={loading || disabled} />;
}
export default DynamicFormFields;