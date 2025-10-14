"use client";

import React, { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { User } from "@/types/user";

import { useProgramMonografForm } from '@/features/program/hooks/useProgramReferenceForm';
import { submitMonografProgram } from '@/features/program/actions';

import FormHeader from './FormHeader';
import HiddenInputs from './HiddenInputs';
import UserInfoMonograf from './UserInfoMonograf';
import Agreement from './Agreement';
import SubmitButton from './SubmitButton';
import Alert, { useAlert } from '@/components/ui/Alert';
import Address from './Address';
import InfoOther from './InfoOther';

const initialState = {
    success: false,
    message: "",
    errors: undefined,
    transactionCode: null,
};

export default function FormProgramMonograf(props: { data: any, user: User }) {
    const { data, user } = props;
        // Form submission state and action
        const [formState, formAction] = useActionState(submitMonografProgram, initialState);
        const { alertProps, showAlert, closeAlert } = useAlert();
        const {
            institutions,
            majors,
            loading: dataLoading, // Renamed to avoid conflict
            error: dataError,
        } = useProgramMonografForm();
    
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
                <FormHeader title="Informasi Pemesanan" description={data.description} />
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
                        <UserInfoMonograf user={user} memberCount={data.package_type.member_total} />
                        <InfoOther institution={institutions} majors={majors} loading={dataLoading} />
                        <Address title="Alamat Pengiriman" />
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
    return <SubmitButton loading={pending} title="Lanjutkan Pembayaran"/>;
}