"use client";

import React, { useEffect, useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { User } from "@/types/user";

import { useProgramMonografForm } from '@/features/program/hooks/useProgramMonografForm';
import { submitMonografProgram } from '@/features/program/actions';

import FormHeader from '@/components/forms/program/FormHeader';
import HiddenInputs from '@/components/forms/program/HiddenInputs';
import UserInfoMonograf from '@/components/forms/program/UserInfoMonograf';
import Agreement from '@/components/forms/program/Agreement';
import SubmitButton from '@/components/forms/program/SubmitButton';
import Alert, { useAlert } from '@/components/ui/Alert';
import Address from '@/components/forms/program/Address';
import InfoOther from '@/components/forms/program/InfoOther';
import { Icon } from '@iconify/react';

const initialState = {
    success: false,
    message: "",
    errors: undefined,
    transactionCode: null,
};

export default function FormProgramMonograf(props: { data: any, user: User }) {
    const { data, user } = props;
    const [formState, formAction] = useActionState(submitMonografProgram, initialState);
    const { alertProps, showAlert, closeAlert } = useAlert();
    const {
        institutions,
        majors,
        loading: dataLoading,
        error: dataError,
    } = useProgramMonografForm();

    const [form, setForm] = useState<any>({
        title: '',
        chief_writer: '',
        writter_phone: '',
        institution: '',
        major: '',
        city: '',
    });
    const [address, setAddress] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = (showErrors = false) => {
        const newErrors: any = {};
        if (!form.title) newErrors.title = "Judul monograf tidak boleh kosong.";
        if (!form.chief_writer) newErrors.chief_writer = "Nama penulis utama tidak boleh kosong.";
        if (!form.writter_phone) newErrors.writter_phone = "No. telepon penulis utama tidak boleh kosong.";
        if (!form.institution) newErrors.institution = "Institusi tidak boleh kosong.";
        if (!form.major) newErrors.major = "Jurusan tidak boleh kosong.";
        if (!form.city) newErrors.city = "Kota tidak boleh kosong.";
        if (!address) newErrors.address = "Alamat tidak boleh kosong.";
        if (!agreement) newErrors.agreement = "Anda harus menyetujui syarat dan ketentuan.";

        if (showErrors) {
            setErrors(newErrors);
        }
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [form, address, agreement]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm(true)) {
            const formData = new FormData(e.currentTarget);
            formAction(formData);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddress(e.target.value);
    };

    const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreement(e.target.checked);
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
                <FormHeader title="Informasi Pemesanan" description={data.description} />
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
                        <HiddenInputs data={data} user={user} />
                        <UserInfoMonograf user={user} memberCount={data.package_type.member_total} form={form} onChange={handleFormChange} error={errors} />
                        <InfoOther institution={institutions} majors={majors} loading={dataLoading} form={form} onChange={handleFormChange} error={errors} />
                        <Address title="Alamat Pengiriman" value={address} onChange={handleAddressChange} error={errors.address} />
                        <div className="mb-2 col-span-2" id="form-customer-alert">
                            <small className="text-[#CD5C5C] font-semibold">*) Jika penulis mengundurkan diri dan tidak dapat menyelesaikan naskah dalam waktu yang sudah di tentukan dan lain sebagainya, maka sesuai dengan prosedur penerbitan yang bapak ibu sudah baca di atas, uang yang telah dibayarkan diawal tidak dapat dikembalikan dan dianggap hangus.</small>
                        </div>
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
    return <SubmitButton loading={pending} title="Lanjutkan Pembayaran" disabled={disabled} />;
}