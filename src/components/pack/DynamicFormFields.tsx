// src/app/components/form/GenerateFormFields.tsx
'use client';

import { FormField } from '@/types/program';
import React, { useState, useEffect } from 'react';
import StyledInputField from '../forms/program/StyledInputField';
import StyledTextareaField from '../forms/program/StyledTextareaField';
import StyledSelectField from '../forms/program/StyledSelectField';

// --- Props Interface ---
interface GenerateFormFieldsProps {
    formFields: FormField[];
    onSubmit: (formData: any) => void;
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
                    console.log(data);
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
const DynamicFormFields: React.FC<GenerateFormFieldsProps> = ({ formFields, onSubmit }) => {
    const [formData, setFormData] = useState<any>({});
    const [formErrors, setFormErrors] = useState<any>({});

    // Inisialisasi state formData saat formFields berubah
    useEffect(() => {
        const initialData: any = {};
        formFields.forEach(field => {
            if (field.type === 'repeater') {
                initialData[field.name] = []; // Inisialisasi repeater sebagai array kosong
            } else {
                initialData[field.name] = '';
            }
        });
        setFormData(initialData);
        setFormErrors({}); // Reset error
    }, [formFields]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        // @ts-ignore
        const checked = e.target.checked;

        setFormData((prev: any) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleRepeaterChange = (e: { target: { name: string, value: any } }) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors: any = {};
        formFields.forEach(field => {
            const rules = field.rules ? field.rules.split('\n') : [];
            if (rules.includes('required') && !formData[field.name]) {
                errors[field.name] = `${field.label} wajib diisi.`;
            }
            // Anda bisa menambahkan validasi lain di sini
        });
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        } else {
            console.log('Validation failed', formErrors);
            alert('Harap periksa kembali form Anda, ada field yang belum terisi dengan benar.');
        }
    };

    const renderField = (field: FormField) => {
        const value = formData[field.name] || (field.type === 'repeater' ? [] : '');
        const error = formErrors[field.name];

        switch (field.type) {
            case 'textarea':
                return <StyledTextareaField field={field} value={value} onChange={handleInputChange} />;
            case 'select':
                return <StyledSelectField field={field} value={value} onChange={handleInputChange}  />;
            case 'repeater':
                return <FormRepeater field={field} value={value} onChange={handleRepeaterChange} error={error} />;
            case 'file':
                return <FormFile field={field} onChange={handleInputChange} error={error} />;
            case 'checkbox':
                return (
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name={field.name}
                                checked={!!value}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-900">{field.label}</span>
                        </label>
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>
                );
            case 'text':
            case 'email':
            case 'tel':
            default:
                return <StyledInputField field={field} value={value} onChange={handleInputChange} />;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            {formFields.map(field => (
                <div key={field.name}>
                    {renderField(field)}
                </div>
            ))}
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Kirim Pendaftaran
            </button>
        </form>
    );
};

export default DynamicFormFields;
