
import { FormField } from '@/types/program';
import React, { useEffect, useState } from 'react';

const StyledSelectField = ({ field, required = false, value, onChange, formData }: { field: FormField; required?: boolean; value: string; onChange: (arg0: React.ChangeEvent<HTMLSelectElement>) => void; formData?: any; }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Ambil nilai dari field induk (jika ada)
    const parentValue = field.depends_on_field ? formData[field.depends_on_field] : null;
    const isDisabled = loading || (field.depends_on_field && !parentValue);
    useEffect(() => {
        if (!field.source_url) return; // Jika bukan dari API, abaikan

        // Jika dropdown ini bergantung pada field lain yang belum diisi, kosongkan opsi
        if (field.depends_on_field && !parentValue) {
            setOptions([]);
            return;
        }

        const fetchOptions = async () => {
            setLoading(true);
            let url: string = field.source_url?.toString() || '';

            // Jika ada dependensi, tambahkan parameter ke URL
            if (field.depends_on_field && field.depends_on_param && parentValue) {
                url += `/${parentValue}`;
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                const mappedOptions = data.map((item: any) => ({
                    value: item[field.source_value_field || 'id'],
                    label: item[field.source_label_field || 'name']
                }));
                setOptions(mappedOptions);
            } catch (e) {
                console.error("Gagal mengambil opsi:", e);
                setOptions([]); // Kosongkan jika gagal
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [field.source_url, parentValue]);

    // Reset nilai dropdown ini jika nilai induknya berubah
    useEffect(() => {
        if (field.depends_on_field && value !== '') {
            onChange({ target: { name: field.name, value: '' } } as React.ChangeEvent<HTMLSelectElement>);
        }
    }, [parentValue]);

    return (
        <>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} {field.required_frontend || required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={field.name}
                name={field.name}
                value={value}
                onChange={onChange}
                disabled={isDisabled || options.length === 0}
                className="w-full select select-field-large bg-white select- border border-gray-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">{loading ? 'Memuat...' : (field.placeholder || 'Pilih salah satu')}</option>
                {options.map((opt: any, index: number) => (
                    <option key={index} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </>
    );



};

export default StyledSelectField;
