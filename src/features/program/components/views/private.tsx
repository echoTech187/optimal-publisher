"use client";

import React, { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { User } from "@/types/user";

import { useProgramPrivateForm } from '@/features/program/hooks/use-program-private-form';
import { submitPrivateProgram } from '@/features/program/actions/submit';

import FormHeader from './private/FormHeader';
import HiddenInputs from './private/HiddenInputs';
import UserInfo from './private/UserInfo';
import FileUpload from './private/FileUpload';
import Agreement from './private/Agreement';
import SubmitButton from './private/SubmitButton';
import Alert, { useAlert } from '@/components/ui/Alert';
import BookInfo from './private/BookInfo';
import Address from './private/Address';

const initialState = {
    success: false,
    message: "",
    errors: undefined,
    transactionCode: null,
};

// --- Main Component ---
export default function FormProgramPrivate(props: { data: any, user: User }) {
    const { data, user } = props;
    // Form submission state and action
    const [formState, formAction] = useActionState(submitPrivateProgram, initialState);
    const { alertProps, showAlert, closeAlert } = useAlert();
    const {
        majors,
        bookTitles,
        selectedMajor,
        loading: dataLoading, // Renamed to avoid conflict
        error: dataError,
        handleMajorChange,
        handleBookTitleChange,
    } = useProgramPrivateForm();

    // Effect to show toast or log messages
    useEffect(() => {
        if (formState.message) {
            if (formState.success) {
                showAlert(
                    {
                        type: 'success',
                        title: 'Berhasil!',
                        message: formState.message,
                        onPrimaryClick: () => {
                            window.location.href = '/payment/' + formState?.transactionCode; // Reload the page
                        },
                        primaryButtonText: 'Lanjutkan',
                        onCloseCallback: () => {
                            window.location.href = '/payment/' + formState?.transactionCode; // Reload the page
                        },
                    }
                );
                // alert(`Success: ${formState.message}`);
            } else {
                // console.error("Error:", formState.message, formState?.errors);
                showAlert(
                    {
                        type: 'error',
                        title: 'Gagal!',
                        message: formState.message,
                        onCloseCallback: closeAlert,
                    }
                );
                // alert(`Error: ${formState.message}`);
            }
        }
    }, [formState]);
    return (
        <>
            <div className="max-w-[1300px] mx-auto h-full pt-[0px]" id="shipping-information">
                <FormHeader title="Informasi Pemesanan" description="Program Penerbitan Mandiri" />
                <div className="flex flex-col gap-6 p-6">

                    {dataError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{dataError}</div>}

                    {formState.message && !formState.success && (
                        <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Gagal!</strong>
                            <span className="block sm:inline"> {formState.message}</span>
                        </div>
                    )}

                    {formState.success && (
                        <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Berhasil!</strong>
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

// A new component to get the form status
function FormSubmitter() {
    const { pending } = useFormStatus();
    return <SubmitButton loading={pending} title="Lanjutkan Pembayaran dan Kirim Naskah" />;
}