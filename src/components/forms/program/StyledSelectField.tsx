
import { FormField } from '@/types/program';
import React, { useEffect, useState } from 'react';

const StyledSelectField = ({ field, required = false, value, onChange, disabled = false }: { field: FormField; required?: boolean; value: string; onChange: (arg0: React.ChangeEvent<HTMLSelectElement>) => void; disabled?: boolean; }) => {
    const [options, setOptions] = useState<{ value: string; label: string; type?: string }[]>([]);

    useEffect(() => {
        // Jika ada source_model, fetch data dari API
        if (field.source_url) {
            const fetchOptions = async () => {
                try {
                    // Ganti dengan URL API Anda untuk mengambil opsi
                    const response = await fetch(field.source_url || '');
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} {field.required_frontend || required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={field.name}
                name={field.name}
                value={value}
                onChange={onChange}
                className="w-full select select-field-large bg-white select- border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">{field.placeholder || 'Pilih salah satu'}</option>
                {options.map((opt: any, index: number) => (
                    <option key={index} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );

};

export default StyledSelectField;
