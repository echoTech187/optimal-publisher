"use client";

import React, { useEffect,useActionState } from 'react';
import {  useFormStatus } from 'react-dom';
import { User } from "@/types/user";

import { useProgramReferenceForm } from '@/lib/hooks/useProgramReferenceForm';
import { submitPrivateProgram } from '@/lib/actions/programSubmit';

import FormHeader from './private/FormHeader';
import HiddenInputs from './private/HiddenInputs';
import UserInfo from './private/UserInfo';
import ProgramSelection from './references/ProgramSelection';
import FileUpload from './private/FileUpload';
import Agreement from './private/Agreement';
import SubmitButton from './private/SubmitButton';
import Alert, { useAlert } from '../ui/Alert';

const initialState = {
    success: false,
    message: "",
    errors: undefined,
    transactionCode: null,
};

// --- Main Component ---
export default function FormProgramRefernce(props: { data: any, user: User }) {
    const { data, user } = props;
    // Form submission state and action
    const [formState, formAction] = useActionState(submitPrivateProgram, initialState);
    const { alertProps, showAlert, closeAlert } = useAlert();
    const {
        majors,
        bookTitles,
        bookTopics,
        selectedMajor,
        selectedBookTitle,
        selectedBookTopic,
        loading: dataLoading, // Renamed to avoid conflict
        error: dataError,
        handleMajorChange,
        handleBookTitleChange,
        handleBookTopicChange,
    } = useProgramReferenceForm();

    // Effect to show toast or log messages
    useEffect(() => {
        if (formState.message) {
            if (formState.success) {
                // console.log("Success:", formState.message);
                showAlert(
                    {
                        type: 'success',
                        title: 'Berhasil!',
                        message: formState.message,
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
            <FormHeader />
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
                    
                    <HiddenInputs data={data} user={user}  />
                    <UserInfo user={user} />
                    <ProgramSelection
                        majors={majors}
                        bookTitles={bookTitles}
                        bookTopics={bookTopics}
                        selectedMajor={selectedMajor}
                        selectedBookTitle={selectedBookTitle}
                        selectedBookTopic={selectedBookTopic}
                        loading={dataLoading}
                        handleMajorChange={handleMajorChange}
                        handleBookTitleChange={handleBookTitleChange}
                        handleBookTopicChange={handleBookTopicChange}
                    />
                    <div className="mb-2" id="form-book-title">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book_title">Judul Buku yang Bapak/Ibu Tulis</label>
                                        <input type="text" name="book_title" id="book_title" className="input" />
                                        <small className="text-sm text-gray-500">Contoh: Buku Ajar, Buku Bunga Rampai, Buku Referensi, dll (Disertai Judul)</small>
                                    </div>
                    <div className="col-span-full" id="form-customer-address">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Alamat pengiriman buku fisik</label>
                        <textarea className="textarea" name="address" id="address" placeholder="Alamat" required aria-placeholder="Masukan Alamat Pengiriman"></textarea>
                    </div>
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
    return <SubmitButton loading={pending} />;
}