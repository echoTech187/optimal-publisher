// src/app/components/form/GenerateFormFields.tsx
'use client';

import { FormField, ProgramPackage } from '@/types/program';
import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import StyledInputField from '../forms/program/StyledInputField';
import StyledTextareaField from '../forms/program/StyledTextareaField';
import StyledSelectField from '../forms/program/StyledSelectField';
import { useFormStatus } from 'react-dom';
import SubmitButton from '../forms/program/SubmitButton';
import StyledCheckBoxField from '../forms/program/StyledCheckBoxField';
import StyledRepeaterField from '../forms/program/StyledRepeaterField';
import { User } from '@/types/user';
import StyledFileUploadField from '../forms/program/StyledFileUploadField';

// --- Props Interface ---
interface GenerateFormFieldsProps {
    formFields: FormField[];
    onSubmit: (formData: any) => void;
    formClassName?: string;
    user?: User; // Ditambahkan: Prop opsional untuk data pengguna
}

// --- Komponen untuk setiap jenis field ---

// Komponen Input Biasa (Text, Email, Tel, dll.)
const FormInput = ({ field, value, onChange, error }: any) => (
    <div className="mb-4">
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
        <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            placeholder={field.placeholder}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        {field.helperText && <p className="text-gray-500 text-xs mt-1">{field.helperText}</p>}
    </div>
);

// Komponen Textarea
const FormTextarea = ({ field, value, onChange, error }: any) => (
    <div className="mb-4">
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
        <textarea
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            placeholder={field.placeholder}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        {field.helperText && <p className="text-gray-500 text-xs mt-1">{field.helperText}</p>}
    </div>
);

// Komponen Select
const FormSelect = ({ field, value, onChange, error }: any) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Jika ada source_model, fetch data dari API
        if (field.source_url) {
            const fetchOptions = async () => {
                try {
                    // Ganti dengan URL API Anda untuk mengambil opsi
                    const response = await fetch(field.source_url);
                    const data = await response.json(); // Asumsi API mengembalikan [{ value: '', label: '' }]
                    setOptions(data);
                } catch (e) {
                    console.error("Failed to fetch select options", e);
                }
            };
            fetchOptions();
        } else if (field.options) {
            setOptions(field.options.split('\n').map((opt: string) => ({ value: opt, label: opt })));
        }
    }, [field.source_url, field.options]);

    return (
        <div className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
            <select
                id={field.name}
                name={field.name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="">{field.placeholder || 'Pilih salah satu'}</option>
                {options.map((opt: any, index: number) => (
                    <option key={index} value={options[index][field.source_value_field]}>{options[index][field.source_label_field]}</option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            {field.helperText && <p className="text-gray-500 text-xs mt-1">{field.helperText}</p>}
        </div>
    );
};

// Komponen Repeater
const FormRepeater = ({ field, value, onChange, error }: any) => {
    const handleAddItem = () => {
        const newItem = field.repeater_fields.reduce((acc: any, f: any) => ({ ...acc, [f.name]: '' }), {});
        onChange({ target: { name: field.name, value: [...value, newItem] } });
    };

    const handleRemoveItem = (index: number) => {
        const newValue = value.filter((_: any, i: number) => i !== index);
        onChange({ target: { name: field.name, value: newValue } });
    };

    const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value: itemValue } = e.target;
        const newValue = [...value];
        newValue[index] = { ...newValue[index], [name]: itemValue };
        onChange({ target: { name: field.name, value: newValue } });
    };

    return (
        <div className="p-4 border rounded-md mb-4">
            <label className="block text-lg font-medium text-gray-900 mb-2">{field.label}</label>
            {field.helperText && <p className="text-gray-500 text-sm mb-4">{field.helperText}</p>}

            {value.map((item: any, index: number) => (
                <div key={index} className="p-3 border rounded-md mb-3 relative">
                    <h4 className="font-semibold mb-2">Item #{index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {field.repeater_fields.map((subField: any) => (
                            <FormInput
                                key={subField.name}
                                field={subField}
                                value={item[subField.name] || ''}
                                onChange={(e: any) => handleItemChange(index, e)}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        &times;
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddItem}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
                + Tambah Item
            </button>
            {error && typeof error === 'string' && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

// Komponen File Upload
const FormFile = ({ field, onChange, error }: any) => {
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setFileName(file.name);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Gunakan upload_url dari definisi field
            const response = await fetch(field.upload_url || '/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();
            // Panggil onChange dengan path atau ID file dari response backend
            onChange({ target: { name: field.name, value: result.filePath } });

        } catch (err) {
            console.error(err);
            setFileName('');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
                type="file"
                id={field.name}
                name={field.name}
                onChange={handleFileChange}
                disabled={uploading}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading: {fileName}...</p>}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}

// --- Komponen Utama ---
const DynamicFormFields: React.FC<GenerateFormFieldsProps> = ({ formFields, onSubmit, formClassName, user }) => {
    const [formData, setFormData] = useState<any>({});
    const [formErrors, setFormErrors] = useState<any>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [programs, setPrograms] = useState<ProgramPackage[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<ProgramPackage | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFirstMemberReadOnly, setIsFirstMemberReadOnly] = useState(false); // New state for read-only

    // Inisialisasi state formData saat formFields atau user berubah
    useEffect(() => {
        const initialData: any = {};
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
    }, [formData, validateForm]); // Depend on formData and validateForm



    const renderField = (field: FormField) => {
        const value = formData[field.name] || (field.type === 'repeater' ? [] : '');
        const error = formErrors[field.name];

        switch (field.type) {
            case 'textarea':
                return <StyledTextareaField field={field} value={value} onChange={handleInputChange} errors={error} />;
            case 'select':
                return <StyledSelectField field={field} formData={formData} value={value} onChange={handleInputChange} />;
            case 'repeater':
                return <StyledRepeaterField field={field} value={value} onChange={handleRepeaterChange} firstItemReadOnly={isFirstMemberReadOnly} />;
            case 'file':
                return <StyledFileUploadField field={field} error={error} />;
            case 'checkbox':
                return <StyledCheckBoxField field={field} value={value} onChange={handleInputChange} />;
            case 'text':
            case 'email':
            case 'tel':
            default:
                return <StyledInputField field={field} value={value} onChange={handleInputChange} readOnly={formData[field.name + '_readonly']} />;
        }
    };
    function FormSubmitter({ disabled }: { disabled: boolean }) {
        const { pending } = useFormStatus();
        return <SubmitButton loading={pending} title="Lanjutkan Pembayaran" disabled={pending || disabled} />;
    }
    console.log(formData);
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <form onSubmit={handleSubmit} className={formClassName} id="form-customer">
            {formFields.map(field => (
                <div key={field.name} className={`${field.field_class_name} mb-4`} id={`form-${field.name}-name`}>
                    {renderField(field)}
                </div>
            ))}
            <FormSubmitter disabled={!isFormValid} />
        </form>
    );
};
export default DynamicFormFields;