"use client";
import { Icon } from "@iconify/react";
import { redirect } from "next/navigation";

interface FileInputProps {
    label: string;
    description: string;
    required?: boolean;
}

const FileInput = ({ label, description, required = false }: FileInputProps) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <p className="text-xs text-gray-500 mb-2">{description}</p>
        <div className="w-full bg-gray-100 border border-gray-200 rounded-lg py-3 px-4">
            <input type="file" className="text-sm" />
        </div>
    </div>
);

function paymentHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);

    // TODO: Handle form submission
    redirect("/hki/payment/123?status=waiting_confirmation");
}
export default function HKIPaymentPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="">
                <div className="w-full">
                    <div className="bg-blue-600 text-white p-6 flex items-center">
                        <Icon icon="ion:card-outline" className="text-2xl mr-3" />
                        <div>
                            <h2 className="text-xl font-bold">Informasi Pembayaran</h2>
                            <p>Paket Express - Rp 600.000</p>
                        </div>
                    </div>

                    <div className="p-8">
                        <form action="#" onSubmit={paymentHandler} method="POST" encType="multipart/form-data">
                        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-lg mb-6 flex items-start">
                            <Icon
                                icon="ion:checkmark-circle-outline"
                                className="text-xl mr-3 flex-shrink-0"
                            />
                            <p>
                                Anda telah memilih paket <span className="font-bold">express</span>
                                dengan waktu penerbitan dalam <span className="font-bold">1 Hari</span>
                                Total yang harus dibayar: <span className="font-bold">Rp 600.000</span>
                            </p>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Silakan transfer ke salah satu rekening berikut
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex items-center">
                                <img src="/icon/bri.png" alt="Bank BRI" className="w-16 h-auto mr-4" />
                                <div>
                                    <p className="font-semibold text-gray-800">Bank Rakyat Indonesia</p>
                                    <p className="text-gray-600">0377010.0377010.309</p>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex items-center">
                                <img src="/icon/bca.png" alt="Bank BCA" className="w-16 h-auto mr-4" />
                                <div>
                                    <p className="font-semibold text-gray-800">Bank Central Asia</p>
                                    <p className="text-gray-600">20.666.11.21</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Upload Bukti Transfer
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Upload Screenshot atau foto bukti transfer pembayaran [Format: JPG,
                            PNG, atau PDF - Max 5MB]
                        </p>

                        <div className="mb-8">
                            <FileInput label="" description="" />
                        </div>

                        <button className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                            <Icon icon="ion:checkmark-circle-outline" className="text-xl mr-2" />
                            Konfirmasi Pembayaran & Lanjutkan
                        </button>

                        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm p-4 rounded-lg mt-8">
                            <ul className="list-disc list-inside space-y-1">
                                <li>Pastikan jumlah transfer sesuai dengan harga paket yang dipilih</li>
                                <li>Bukti transfer akan diverifikasi maksimal 2 jam kerja</li>
                                <li>Untuk bantuan, Hubungi team Optimal</li>
                            </ul>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
