// src/features/pack/hooks/useDynamicForm.ts
'use client';

import { useState, useEffect, useCallback, useActionState, useTransition } from 'react';
import { FormField, ProgramPackage } from '@/types/program';
import { User } from '@/types/user';
import { submitReferenceProgram } from '@/features/program/actions';
import { useAlert } from '@/components/ui/Alert';

const initialState = {
    success: false,
    message: "",
    errors: undefined,
    transactionCode: null,
};

export const useDynamicForm = (formFields: FormField[], user: User, selectedPackage: ProgramPackage | null) => {
    const [formState, formAction] = useActionState(submitReferenceProgram, initialState);
    const [isPending, startTransition] = useTransition();
    const { alertProps, showAlert, closeAlert } = useAlert();
    const [formData, setFormData] = useState<any>({});
    const [formErrors, setFormErrors] = useState<any>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFirstMemberReadOnly, setIsFirstMemberReadOnly] = useState(false);

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
                initialData[field.name] = Array.from({ length: repeaterCount }, () => ({ ...emptyItem }));
            } else {
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
        setIsFirstMemberReadOnly(false);
    }, [formFields, user, selectedPackage]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // @ts-ignore
        const checked = e.target.checked;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prev: any) => {
            const updatedValues = { ...prev, [name]: newValue };
            const changedFieldMeta = formFields.find(f => f.name === name);

            if (changedFieldMeta?.name === 'include_main_author' && changedFieldMeta?.type === 'checkbox') {
                setIsFirstMemberReadOnly(newValue === true);
            }

            if (changedFieldMeta?.type === 'checkbox' && changedFieldMeta?.on_change_effect === 'copy_to_repeater') {
                const sourceFieldNames = changedFieldMeta.copy_source_fields?.split(',') || [];
                const targetRepeaterName = changedFieldMeta.copy_target_repeater;
                const targetRepeaterFieldNames = changedFieldMeta.copy_target_repeater_fields?.split(',');

                const currentRepeaterItems = updatedValues[targetRepeaterName || ''] || [];

                if (targetRepeaterFieldNames) {
                    const newRepeaterItem = targetRepeaterFieldNames.reduce((acc, targetName, index) => {
                        const sourceValue = updatedValues[sourceFieldNames[index]];
                        if (sourceValue !== undefined) {
                            acc[targetName] = updatedValues[sourceFieldNames[index]] || '';
                        }
                        return acc;
                    }, {} as { [key: string]: any });

                    const repeaterCount = changedFieldMeta.repeater_count_field ? parseInt(changedFieldMeta.repeater_count_field.toString(), 10) : 1;
                    const newMembersArray = Array.from({ length: repeaterCount }, (_, i) => currentRepeaterItems[i] || targetRepeaterFieldNames.reduce((acc, tn) => ({ ...acc, [tn]: '' }), {}));

                    if (newValue === true) {
                        newMembersArray[0] = newRepeaterItem;
                    } else {
                        const emptyItem = targetRepeaterFieldNames.reduce((acc, tn) => ({ ...acc, [tn]: '' }), {});
                        newMembersArray[0] = emptyItem;
                    }
                    updatedValues[targetRepeaterName || ''] = newMembersArray;
                }
            }

            formFields.forEach(fieldMeta => {
                if (fieldMeta.type === 'checkbox' && fieldMeta.on_change_effect === 'copy_to_repeater' && updatedValues[fieldMeta.name]) {
                    const sourceFieldNames = fieldMeta.copy_source_fields?.split(',');
                    if (sourceFieldNames?.includes(name)) {
                        const targetRepeaterName = fieldMeta.copy_target_repeater;
                        const targetRepeaterFieldNames = fieldMeta.copy_target_repeater_fields?.split(',');
                        const currentRepeaterItems = updatedValues[targetRepeaterName || ''] || [];
                        const repeaterCount = fieldMeta.repeater_count_field ? parseInt(fieldMeta.repeater_count_field.toString(), 10) : 1;
                        if (targetRepeaterFieldNames) {
                            const updatedRepeaterItem = targetRepeaterFieldNames.reduce((acc, targetName, index) => {
                                acc[targetName] = updatedValues[sourceFieldNames[index]] || '';
                                return acc;
                            }, {} as { [key: string]: any });

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
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleRepeaterChange = (e: { target: { name: string, value: any } }) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const validateForm = useCallback(() => {
        const errors: any = {};
        formFields.forEach(field => {
            const rules = field.rules ? field.rules.split('\n') : [];
            if (rules.includes('required')) {
                if (field.type === 'repeater') {
                    if (!formData[field.name] || formData[field.name].length === 0) {
                        errors[field.name] = `${field.label} wajib memiliki setidaknya satu item.`;
                    }
                } else if (!formData[field.name]) {
                    errors[field.name] = `${field.label} wajib diisi.`;
                }
            }
        });
        setFormErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        setIsFormValid(isValid);
        return isValid;
    }, [formData, formFields]);

    useEffect(() => {
        validateForm();
        setLoading(false);
    }, [formData, validateForm]);

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
            
            startTransition(() => {
                formAction(newFormData);
            });
        }
    };

    return {
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
        isPending,
        formAction
    };
};
