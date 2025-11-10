"use client";

import React, { useEffect, useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { User } from "@/types/user";

import { useProgramPrivateForm } from '@/features/program/hooks/useProgramPrivateForm';
import { submitPrivateProgram } from '@/features/program/actions';

import FormHeader from '@/components/forms/program/FormHeader';
import HiddenInputs from '@/components/forms/program/HiddenInputs';
import UserInfo from '@/components/forms/program/UserInfo';
import FileUpload from '@/components/forms/program/FileUpload';
import Agreement from '@/components/forms/program/Agreement';
import SubmitButton from '@/components/forms/program/SubmitButton';
import Alert, { useAlert } from '@/components/ui/Alert';
import BookInfo from '@/components/forms/program/BookInfo';
import Address from '@/components/forms/program/Address';
import { Icon } from '@iconify/react';

const initialState = {
    success: false,
    message: "",
    errors: undefined,
    transactionCode: null,
};

// Real file upload function
const uploadFileToServer = async (file: string | Blob, url: string | undefined, onProgress: { (progress: any): void; (arg0: number): void; }) => {
    const formData = new FormData();
    formData.append('file', file); // 'file' must match the name your backend expects

    try {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentCompleted = Math.round((event.loaded * 100) / event.total);
                    onProgress(percentCompleted);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response.fileId); // Assumes backend returns { fileId: '...' }
                } else {
                    try {
                        const errorResponse = JSON.parse(xhr.responseText);
                        reject(new Error(errorResponse.message || 'Failed to upload file.'));
                    } catch (e) {
                        reject(new Error('An unknown error occurred during upload.'));
                    }
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('A network or server error occurred.'));
            });

            // IMPORTANT: Replace with your actual backend endpoint URL
            xhr.open('POST', url ? url : 'http://localhost:8000/api/v1/upload-file');

            // If you use authentication, set the header here
            // xhr.setRequestHeader('Authorization', `Bearer ${yourAuthToken}`);

            xhr.send(formData);
        });

    } catch (error) {
        console.error('Upload error:', error);
        throw error; // Re-throw the error to be caught by handleFileChange
    }
};

// --- Main Component ---
export default function FormProgramPrivate(props: { data: any, user: User }) {
    const { data, user } = props;
    const [formState, formAction] = useActionState(submitPrivateProgram, initialState);
    const { alertProps, showAlert, closeAlert } = useAlert();
    const {
        majors,
        bookTitles,
        selectedMajor,
        loading: dataLoading,
        error: dataError,
        handleMajorChange,
        handleBookTitleChange,
    } = useProgramPrivateForm();

    const [uploads, setUploads] = useState({
        manuscript: { file: null, progress: 0, uploadedId: null, error: null },
    });

    const [address, setAddress] = useState('');
    const [agreement, setAgreement] = useState(false);

    const [errors, setErrors] = useState<any>({});
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = (showErrors = false) => {
        const newErrors: any = {};
        if (!bookTitles) newErrors.bookTitles = "Judul buku tidak boleh kosong.";
        if (!selectedMajor) newErrors.selectedMajor = "Jurusan tidak boleh kosong.";
        if (!uploads.manuscript.uploadedId) newErrors.manuscript = "Naskah tidak boleh kosong.";
        if (!address) newErrors.address = "Alamat tidak boleh kosong.";
        if (!agreement) newErrors.agreement = "Anda harus menyetujui syarat dan ketentuan.";

        if (showErrors) {
            setErrors(newErrors);
        }
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [bookTitles, selectedMajor, uploads.manuscript.uploadedId, address, agreement]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm(true)) {
            formAction(new FormData(e.currentTarget));
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddress(e.target.value);
    };

    const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreement(e.target.checked);
    };

    const resetUpload = (inputName: any) => {
        setUploads(prev => ({
            ...prev,
            [inputName]: { file: null, progress: 0, uploadedId: null, error: null }
        }));
    };

    const handleFileChange = (inputName: string, file: File) => {
        setUploads(prev => ({ ...prev, [inputName]: { file, progress: 0, uploadedId: null, error: null } }));

        uploadFileToServer(file, 'http://localhost:8000/api/v1/manuscript-upload', (progress: any) => {
            setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, progress } }));
        })
            .then(fileId => {
                setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, uploadedId: fileId, progress: 100 } }));
            })
            .catch(err => {
                console.error(`Error uploading ${inputName}:`, err.message);
                setUploads(prev => ({ ...prev, [inputName]: { ...prev[inputName as keyof typeof prev], file: file, error: err.message || "Upload failed. Please try again." } }));
            });
    };

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
    }, [formState, showAlert, closeAlert]);

    return (
        <>
            <div className="container mx-auto h-full pt-[0px]" id="shipping-information">
                <FormHeader title="Informasi Pemesanan" description="Program Penerbitan Mandiri" />
                <div className="flex flex-col gap-6 p-6">

                    {dataError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{dataError}</div>}

                    {formState.message && !formState.success && (
                        <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Gagal!</strong>
                            <span className="block sm:inline"> {formState.message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6" id="form-customer">
                        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-lg flex items-start lg:col-span-2">
                            <Icon icon="ion:bulb-outline" className="text-xl mr-3 flex-shrink-0" />
                            <p>Tip: Pastikan semua data yang anda masukan sudah benar sebelum melanjutkan ke pembayaran.</p>
                        </div>
                        <HiddenInputs data={data} user={user} manuscript={uploads.manuscript.uploadedId} />
                        <UserInfo user={user} />
                        <BookInfo majors={majors} bookTitles={bookTitles} selectedMajor={selectedMajor} loading={dataLoading} handleMajorChange={handleMajorChange} setBookTitle={handleBookTitleChange} error={errors.bookTitles || errors.selectedMajor} />
                        <Address value={address} onChange={handleAddressChange} error={errors.address} />
                        <FileUpload name="manuscript" uploadState={uploads.manuscript} onFileChange={handleFileChange} onReset={resetUpload} error={errors.manuscript} />

                        <Agreement checked={agreement} onChange={handleAgreementChange} />
                        {errors.agreement && <p className="text-red-500 text-sm mt-1">{errors.agreement}</p>}
                        <FormSubmitter disabled={!isFormValid} />
                    </form>
                </div>
            </div>
            <Alert {...alertProps} />
        </>
    );
}

function FormSubmitter({ disabled }: { disabled: boolean }) {
    const { pending } = useFormStatus();
    return <SubmitButton loading={pending} title="Lanjutkan Pembayaran dan Kirim Naskah" disabled={disabled} />;
}
