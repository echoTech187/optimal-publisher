
"use client";

import React, { useEffect, useActionState } from 'react';
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

const initialState = {
    success: false,
    message: "",
    errors: undefined,
    transactionCode: null,
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

                    <form action={formAction} className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" id="form-customer">
                        <HiddenInputs data={data} user={user} />
                        <UserInfo user={user} />
                        <BookInfo majors={majors} bookTitles={bookTitles} selectedMajor={selectedMajor} loading={dataLoading} handleMajorChange={handleMajorChange} setBookTitle={handleBookTitleChange} />
                        <Address />
                        <FileUpload name="manuscript" />
                        <Agreement />
                        <FormSubmitter />
                    </form>
                </div>
            </div>
            <Alert {...alertProps} />
        </>
    );
}

function FormSubmitter() {
    const { pending } = useFormStatus();
    return <SubmitButton loading={pending} title="Lanjutkan Pembayaran dan Kirim Naskah" />;
}
