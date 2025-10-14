
"use client";

import React, { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { User } from "@/types/user";

import { useProgramReferenceForm } from '@/features/program/hooks/useProgramReferenceForm';
import { submitReferenceProgram } from '@/features/program/actions';

import FormHeader from '@/components/forms/program/FormHeader';
import HiddenInputs from '@/components/forms/program/HiddenInputs';
import UserInfo from '@/components/forms/program/UserInfo';
import ProgramSelection from '@/components/forms/program/ProgramSelection';
import Agreement from '@/components/forms/program/Agreement';
import SubmitButton from '@/components/forms/program/SubmitButton';
import Alert, { useAlert } from '@/components/ui/Alert';

const initialState = {
    success: false,
    message: "",
    errors: undefined,
    transactionCode: null,
};

export default function FormProgramReference(props: { data: any, user: User, showAdress?: boolean }) {
    const { data, user } = props;
    const [formState, formAction] = useActionState(submitReferenceProgram, initialState);
    const { alertProps, showAlert, closeAlert } = useAlert();
    const {
        majors,
        bookTitles,
        bookTopics,
        selectedMajor,
        selectedBookTitle,
        selectedBookTopic,
        loading: dataLoading,
        error: dataError,
        handleMajorChange,
        handleBookTitleChange,
        handleBookTopicChange,
    } = useProgramReferenceForm();

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
            <div className="max-w-[1300px] mx-auto h-full pt-[0px]" id="shipping-information">
                <FormHeader title="Informasi Pemesanan" description={data.description} />
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
                        {
                            props.showAdress &&
                            <div className="col-span-full" id="form-customer-address">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Alamat pengiriman</label>
                                <textarea className="textarea" name="address" id="address" placeholder="Alamat" required aria-placeholder="Masukan Alamat Pengiriman"></textarea>
                            </div>
                        }
                        <div className="mb-2 col-span-2" id="form-customer-alert">
                            <small className="text-[#CD5C5C] font-semibold">*) Jika penulis mengundurkan diri dan tidak dapat menyelesaikan naskah dalam waktu yang sudah di tentukan dan lain sebagainya, maka sesuai dengan prosedur penerbitan yang bapak ibu sudah baca di atas, uang yang telah dibayarkan diawal tidak dapat dikembalikan dan dianggap hangus.</small>
                        </div>
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
    return <SubmitButton loading={pending} title="Lanjutkan Pembayaran" />;
}
