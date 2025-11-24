// File: @/src/components/forms/GenerateFormFields.tsx
// Deskripsi: Hasil refactoring menjadi "Mesin Formulir Dinamis".
// Komponen ini sekarang mampu merender dan mengelola berbagai jenis formulir
// hanya berdasarkan data konfigurasi `form_fields` yang diterima dari API.

"use client";

import React, { useState, useEffect, useActionState, useTransition, useCallback } from 'react';
import { useFormStatus } from 'react-dom';
import { ProgramPackage } from "@/types/program";
import { User } from "@/types/user";
import { Icon } from '@iconify/react';

// Asumsi kita menggunakan satu server action yang terunifikasi
// import { submitProgramForm } from '@/features/program/actions';

// Impor komponen-komponen UI yang sudah ada
import FormHeader from "./program/FormHeader";
import SubmitButton from './program/SubmitButton';
import Packages from "../pack/Packages";
import Alert, { useAlert } from '@/components/ui/Alert';
import DynamicFormFields from '@/components/pack/DynamicFormFields';

// --- MOCK UNIFIED SERVER ACTION ---
const mockSubmitProgramForm = async (prevState: any, formData: FormData) => {
    await new Promise(res => setTimeout(res, 1500));
    // Simulasi respons gagal untuk demonstrasi error inline
    if (formData.get('fullname') === 'Test Error') {
        return {
            success: false,
            message: "Nama ini tidak diizinkan, silakan coba nama lain. (Error dari server)",
            errors: { fullname: ["Nama test error tidak valid."] },
        };
    }
    return {
        success: true,
        message: "Formulir Anda telah berhasil dikirimkan! (Simulasi)",
        transactionCode: "SIM-12345",
        errors: undefined,
    };
};
// --- END OF MOCK ---


// +----------------------------------+
// |   BAGIAN 1: FUNGSI HELPER & HOOKS  |
// +----------------------------------+

function useFieldOptions(field: any, formValues: any) {
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // --- PATCH SEMENTARA: Hardcode dependensi karena tidak ada di JSON ---
    // Idealnya, informasi ini datang dari backend.
    if (field.name === 'book_title') {
        field.depends_on_field = 'major';
        field.source_url = `http://127.0.0.1:8000/api/v1/isbn-books/by-major/{{major}}`;
    }
    if (field.name === 'book_topic') {
        field.depends_on_field = 'book_title';
        // Asumsi URL untuk topik, sesuaikan jika perlu
        field.source_url = `http://127.0.0.1:8000/api/v1/isbn-topics/by-book/{{book_title}}`;
    }
    // --- AKHIR PATCH ---

    const sourceUrl = field.source_url;
    const dependsOnField = field.depends_on_field;
    const dependentValue = dependsOnField ? formValues[dependsOnField] : null;

    useEffect(() => {
        // Jika tidak ada URL sumber (setelah patch), jangan lakukan apa-apa
        if (!sourceUrl) {
            setOptions([]);
            return;
        };

        // Jika ini adalah dropdown dependen dan field induknya belum dipilih, kosongkan opsi.
        if (dependsOnField && !dependentValue) {
            setOptions([]);
            return;
        }

        let finalUrl = sourceUrl;
        if (dependsOnField && dependentValue) {
            // Ganti placeholder seperti {{major}} dengan nilai sebenarnya
            finalUrl = sourceUrl.replace(new RegExp(`{{${dependsOnField}}}`, 'g'), dependentValue);
        }

        const fetchOptions = async () => {
            setLoading(true);
            try {
                const response = await fetch(finalUrl);
                if (!response.ok) throw new Error(`Gagal mengambil opsi dari ${finalUrl}`);
                const data = await response.json();
                // Beberapa API mungkin mengembalikan data dalam properti 'data'
                setOptions(Array.isArray(data) ? data : data.data || []);
            } catch (error) {
                console.error("Error fetching field options:", error);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [sourceUrl, dependsOnField, dependentValue]);

    return { options, loading };
}

const validateField = (value: any, rulesString: string | undefined): string | null => {
    if (!rulesString) return null;
    const rules = rulesString.split('\n');

    for (const rule of rules) {
        if (rule === 'required' && (!value || (Array.isArray(value) && value.length === 0))) {
            return "Kolom ini tidak boleh kosong.";
        }
        if (value && rule.startsWith('max:')) {
            const max = parseInt(rule.split(':')[1], 10);
            if (typeof value === 'string' && value.length > max) return `Tidak boleh lebih dari ${max} karakter.`;
        }
        if (value && rule === 'number' && isNaN(Number(value))) return "Kolom ini harus berupa angka.";
    }
    return null;
};


// +------------------------------------+
// |   BAGIAN 2: KOMPONEN-KOMPONEN FIELD  |
// +------------------------------------+

const GenericField = ({ field, value, onChange, error, disabled }: any) => {
    const commonProps = {
        id: field.name, name: field.name, value: value || '', onChange, disabled,
        placeholder: field.placeholder,
        className: `w-full p-3 rounded-md bg-slate-100 border border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition ${error ? 'ring-2 ring-red-500' : ''} ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`,
    };

    if (field.type === 'checkbox') {
        return (
            <label className="flex items-start space-x-3 py-2">
                <input type="checkbox" {...commonProps} checked={!!value} onChange={e => onChange({ target: { name: field.name, value: e.target.checked } })} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1" />
                <span className="text-gray-700 text-sm">{field.label}</span>
            </label>
        );
    }
    if (field.type === 'textarea') {
        return <textarea {...commonProps} rows={4} />;
    }
    return <input type={field.type} {...commonProps} />;
};

const GenericSelect = ({ field, value, onChange, error, formValues }: any) => {

    const { options, loading } = useFieldOptions(field, formValues);

    const selectWrapperStyle = "relative w-full";

    const selectStyle = `w-full p-3 rounded-md bg-slate-100 border border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none ${error ? 'ring-2 ring-red-500' : ''}`;



    // Handle inkonsistensi nama properti (_field vs _column)

    const valueKey = field.source_value_field || field.source_value_column;

    const labelKey = field.source_label_field || field.source_label_column;



    return (

        <div className={selectWrapperStyle}>

            <select id={field.name} name={field.name} value={value || ''} onChange={onChange} disabled={loading || options.length === 0} className={selectStyle}>

                <option value="" disabled>{loading ? 'Memuat...' : field.placeholder}</option>

                {options.map((opt: any) => (

                    <option key={opt[valueKey]} value={opt[valueKey]}>

                        {opt[labelKey]}

                    </option>

                ))}

            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                <Icon icon="ion:chevron-down-outline" />

            </div>

        </div>

    );

};

const GenericFileUpload = ({ field, onFileChange, error }: any) => {
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState('');
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name); setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval); onFileChange(field.name, `uploaded_${file.name}`);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };
    return (
        <div className={`p-4 border-2 border-dashed rounded-lg text-center ${error ? 'border-red-500' : 'border-gray-300'}`}>
            <label htmlFor={field.name} className="cursor-pointer">
                <Icon icon="ion:cloud-upload-outline" className="mx-auto text-4xl text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Klik untuk mengunggah atau tarik file ke sini</p>
                <p className="text-xs text-gray-500">{field.accept}</p>
            </label>
            <input id={field.name} name={field.name} type="file" accept={field.accept} onChange={handleFileSelect} className="hidden" />
            {fileName && (<div className="mt-2 text-left"><p className="text-sm text-gray-600">{fileName}</p><div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div></div>)}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

const RenderFormField = ({ field, formValues, handleValueChange, errors }: any) => {
    const clientError = errors[field.name];
    const serverError = formValues.serverErrors?.[field.name]?.[0];
    const error = clientError || serverError;

    const wrapperClass = ['textarea', 'checkbox', 'file'].includes(field.type) ? 'lg:col-span-2' : '';

    const fieldComponent = () => {
        switch (field.type) {
            case 'select': return <GenericSelect field={field} value={formValues[field.name]} onChange={handleValueChange} error={error} formValues={formValues} />;
            case 'file': return <GenericFileUpload field={field} onFileChange={(fieldName: string, fileId: string) => handleValueChange({ target: { name: fieldName, value: fileId } })} error={error} />;
            case 'text': case 'textarea': case 'tel': case 'email': case 'checkbox':
                return <GenericField field={field} value={formValues[field.name]} onChange={handleValueChange} error={error} disabled={field.disabled || (field.name === 'fullname' || field.name === 'phone')} />;
            case 'hidden': return <input type="hidden" name={field.name} value={formValues[field.name] || ''} />;
            default: console.warn(`Tipe field tidak dikenal: ${field.type}`); return null;
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

// +--------------------------+
// |   BAGIAN 3: MESIN FORMULIR   |
// +--------------------------+

function DynamicForm({ formFields, user, pkg }: { formFields: any[], user: User, pkg: ProgramPackage }) {
    const [formValues, setFormValues] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [isFormValid, setIsFormValid] = useState(false);

    const initialState = {
        success: false,
        message: "",
        errors: undefined,
        transactionCode: "", // Update the type to string
    };
    const [formState, formAction] = useActionState(mockSubmitProgramForm, initialState);
    const [isPending, startTransition] = useTransition();
    const { alertProps, showAlert, closeAlert } = useAlert();

    useEffect(() => {
        const initialValues: any = {};
        formFields.forEach(field => {
            initialValues[field.name] = field.value || (field.type === 'checkbox' ? false : '');
            // Pre-fill main author fields if available from user data
            if (field.name === 'main_author_name' && user?.full_name) {
                initialValues[field.name] = user.full_name;
            }
            if (field.name === 'main_author_phone' && user?.phone_number) {
                initialValues[field.name] = user.phone_number;
            }
        });
        initialValues['serverErrors'] = null;
        setFormValues(initialValues);
    }, [formFields, user]);

    const validateForm = useCallback(() => {
        const newErrors: any = {};
        formFields.forEach(field => {
            if (field.required_frontend) {
                const error = validateField(formValues[field.name], field.rules);
                if (error) newErrors[field.name] = error;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formValues, formFields]);

    useEffect(() => { setIsFormValid(validateForm()); }, [formValues, validateForm]);

    const handleValueChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;

        // For checkboxes, value is 'on' or 'off', we need checked status
        if (type === 'checkbox') {
            newValue = checked;
        }

        setFormValues((prev: any) => {
            let updatedValues = { ...prev, [name]: newValue, serverErrors: { ...prev.serverErrors, [name]: null } };

            const changedFieldMeta = formFields.find(f => f.name === name);

            // --- START: Dynamic Logic for Checkboxes with on_change_effect ---
            if (changedFieldMeta?.type === 'checkbox' && changedFieldMeta?.on_change_effect === 'copy_to_repeater') {
                const sourceFieldNames = changedFieldMeta.copy_source_fields.split(',');
                const targetRepeaterName = changedFieldMeta.copy_target_repeater;
                const targetRepeaterFieldNames = changedFieldMeta.copy_target_repeater_fields.split(',');

                const currentRepeaterItems = updatedValues[targetRepeaterName] || [];
                const sourceValues: { [key: string]: any } = {};
                sourceFieldNames.forEach((sourceName: string) => {
                    sourceValues[sourceName] = updatedValues[sourceName];
                });

                const newRepeaterItem: { [key: string]: any } = {};
                targetRepeaterFieldNames.forEach((targetName: string, index: number) => {
                    const sourceName = sourceFieldNames[index];
                    if (sourceName) {
                        newRepeaterItem[targetName] = sourceValues[sourceName];
                    }
                });

                if (newValue === true) { // Checkbox is checked
                    const hasValidSource = Object.values(sourceValues).some(val => val !== undefined && val !== null && val !== '');
                    if (hasValidSource) {
                        const isFirstItemExistingAndMatching = currentRepeaterItems.length > 0 &&
                            Object.keys(newRepeaterItem).every(key => currentRepeaterItems[0][key] === newRepeaterItem[key]);

                        if (!isFirstItemExistingAndMatching) {
                            updatedValues[targetRepeaterName] = [newRepeaterItem, ...currentRepeaterItems];
                        }
                    }
                } else { // Checkbox is unchecked
                    if (currentRepeaterItems.length > 0) {
                        const isFirstItemMatchingSource = Object.keys(newRepeaterItem).every(key =>
                            currentRepeaterItems[0][key] === newRepeaterItem[key]
                        );
                        if (isFirstItemMatchingSource) {
                            updatedValues[targetRepeaterName] = currentRepeaterItems.slice(1);
                        }
                    }
                }
            }

            // --- START: Ensure target repeater is updated if source fields change while relevant checkbox is checked ---
            // Iterate through all fields to find checkboxes with 'copy_to_repeater' effect
            // and check if the current `name` is one of their source fields.
            formFields.forEach(fieldMeta => {
                if (fieldMeta.type === 'checkbox' && fieldMeta.on_change_effect === 'copy_to_repeater' && updatedValues[fieldMeta.name]) { // If the checkbox is checked
                    const sourceFieldNames = fieldMeta.copy_source_fields.split(',');
                    if (sourceFieldNames.includes(name)) { // If the currently changed field is a source field for this checkbox
                        const targetRepeaterName = fieldMeta.copy_target_repeater;
                        const targetRepeaterFieldNames = fieldMeta.copy_target_repeater_fields.split(',');

                        const currentRepeaterItems = updatedValues[targetRepeaterName] || [];
                        const sourceValues: { [key: string]: any } = {};
                        sourceFieldNames.forEach((sourceName: string) => {
                            sourceValues[sourceName] = updatedValues[sourceName];
                        });

                        const updatedRepeaterItem: { [key: string]: any } = {};
                        targetRepeaterFieldNames.forEach((targetName: string, index: number) => {
                            const sourceName = sourceFieldNames[index];
                            if (sourceName) {
                                updatedRepeaterItem[targetName] = sourceValues[sourceName];
                            }
                        });

                        // Check if the first item in the repeater matches the item that would be copied
                        const isFirstItemCopied = currentRepeaterItems.length > 0 &&
                            Object.keys(updatedRepeaterItem).every(key => currentRepeaterItems[0][key] === updatedRepeaterItem[key]);

                        if (isFirstItemCopied) {
                            // Update the first member (which is the copied one) if source fields change
                            updatedValues[targetRepeaterName] = [updatedRepeaterItem, ...currentRepeaterItems.slice(1)];
                        } else if (updatedValues[fieldMeta.name]) { // If checkbox is still checked and main author is NOT the first element (e.g., manually removed)
                            // This case is tricky. If the user manually deleted the first copied item, and then changed the source field,
                            // should we re-add it? For now, we only update if it's already there and is the *first* one.
                            // To avoid re-adding an item the user explicitly deleted, we only update existing first items.
                            // If the intention is to always keep it first, a more complex tracking mechanism might be needed.
                        }
                    }
                }
            });
            // --- END: Ensure target repeater is updated if source fields change while relevant checkbox is checked ---

            return updatedValues;
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData(e.currentTarget);
            formData.append('user_id', user.id.toString());
            formData.append('package_id', pkg.id.toString());
            formData.append('form_type', pkg.name);
            startTransition(() => formAction(formData));
        } else {
            console.log("Form tidak valid, errors:", errors);
        }
    };

    useEffect(() => {
        if (formState.message) {
            if (formState.success) {
                showAlert({ type: 'success', title: 'Berhasil!', message: formState.message, onPrimaryClick: () => { window.location.href = '/payment/' + formState?.transactionCode; }, primaryButtonText: 'Lanjutkan' });
            } else {
                setFormValues((prev: any) => ({ ...prev, serverErrors: formState.errors }));
            }
        }
    }, [formState, showAlert]);

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4" noValidate>
                <div className="bg-blue-50 border border-transparent text-gray-800 text-sm p-4 rounded-lg flex items-start lg:col-span-2">
                    <Icon icon="ion:bulb-outline" className="text-xl mr-3 flex-shrink-0 text-blue-500" />
                    <p>Tip: Pastikan semua data yang anda masukan sudah benar sebelum melanjutkan ke pembayaran.</p>
                </div>

                {formState.message && !formState.success && !formState.errors && (
                    <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative lg:col-span-2" role="alert">
                        <strong className="font-bold">Gagal! </strong>
                        <span className="block sm:inline">{formState.message}</span>
                    </div>
                )}

                {formFields.map((field) => (
                    <RenderFormField key={field.name} field={field} formValues={formValues} handleValueChange={handleValueChange} errors={errors} />
                ))}

                <div className="my-2 lg:col-span-2">
                    <small className="text-[#CD5C5C] font-semibold">*) Jika penulis mengundurkan diri dan tidak dapat menyelesaikan naskah dalam waktu yang sudah di tentukan dan lain sebagainya, maka sesuai dengan prosedur penerbitan yang bapak ibu sudah baca di atas, uang yang telah dibayarkan diawal tidak dapat dikembalikan dan dianggap hangus.</small>
                </div>

                <div className="lg:col-span-2">
                    <SubmitButton loading={isPending} title="Lanjutkan Pembayaran" disabled={!isFormValid || isPending} />
                </div>
            </form>
            <Alert {...alertProps} />
        </>
    );
}


// +-----------------------------------+
// |  BAGIAN 4: KOMPONEN UTAMA (EXPORT)  |
// +-----------------------------------+

export default function GenerateFormFields({ packages, user }: { packages: ProgramPackage[], user: User }) {
    const initialState = {
        success: false,
        message: "",
        errors: undefined,
        transactionCode: "", // Update the type to string
    };
    const [selectedPackage, setSelectedPackage] = useState<ProgramPackage[] | null>(null);
    const [formValues, setFormValues] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [formState, formAction] = useActionState(mockSubmitProgramForm, initialState);
    const [isPending, startTransition] = useTransition();
    const { alertProps, showAlert, closeAlert } = useAlert();
    

    const validateForm = useCallback(() => {
        const newErrors: any = {};
        packages[0].form_fields && packages[0].form_fields.forEach(field => {
            if (field.required_frontend) {
                const error = validateField(formValues[field.name], field.rules);
                if (error) newErrors[field.name] = error;
            }
            if (field.type === 'checkbox') {
                if (!formValues[field.name]) {
                    newErrors[field.name] = `${field.label} wajib diisi.`;
                }
            }
            if (field.type === 'file') {
                if (!formValues[field.name]) {
                    newErrors[field.name] = `${field.label} wajib diisi.`;
                }
            }

            setIsFormValid(Object.keys(newErrors).length === 0);
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formValues, packages[0].form_fields]);
    useEffect(() => {
        async function checkPackageLength() {
            if (packages && packages.length === 1) {
                const primaryPackage = packages;
                setSelectedPackage(primaryPackage);
            }
        }
        checkPackageLength();
    }, [packages, selectedPackage]);

    const handlePackageSelect = (pkg: ProgramPackage) => { setSelectedPackage([pkg]); };

    if (!packages || packages.length === 0) return <div className="text-center p-12">Tidak ada paket yang tersedia.</div>;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData(e.currentTarget);
            formData.append('user_id', user.id.toString());
            formData.append('package_id', selectedPackage ? selectedPackage[0].id.toString() : '');
            formData.append('form_type', selectedPackage ? selectedPackage[0].name : '');
            startTransition(() => formAction(formData));
        } else {
            console.log("Form tidak valid, errors:", errors);
        }
    };


    return (
        <section className="w-full h-full py-24 lg:py-32">
            <div className=" bg-white">
                {packages.length > 1 && (
                    <Packages packages={packages} user={user} onSelect={handlePackageSelect} selectedSlug={selectedPackage ? selectedPackage[0].slug : null} />
                )}
            </div>

            {
                (selectedPackage && selectedPackage?.length > 0) ? (
                    <div className="container mx-auto">
                        <div id="informasi-pemesanan">
                            <FormHeader title="Informasi Pemesanan" description={selectedPackage ? selectedPackage[0].description : ''} />
                        </div>
                        <div className="bg-white p-6">
                            <DynamicFormFields user={user} formClassName={packages[0].form_class_name} formFields={selectedPackage ? selectedPackage[0].form_fields || [] : []} onSubmit={handleSubmit} />
                        </div>
                    </div>
                ) : null
            }
        </section>
    );
}

