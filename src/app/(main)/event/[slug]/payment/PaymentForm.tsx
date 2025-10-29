"use client";
import { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from 'next/image';
import { getImageUrl } from "@/lib/utils/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { submitPayment } from "@/features/event/actions";
import { User } from "@/types/user";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
            {pending ? (
                <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block"></span>
                    <span className="ml-2">Loading...</span>
                </>
            ) : (
                <span>Upload Bukti Pembayaran</span>
            )}
        </button>
    );
}

export default function PaymentForm({ transactionData, paymentMethods, user }: { transactionData: any, paymentMethods: any[], user: User | null }) {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [state, formAction] = useActionState(submitPayment, null);

    useEffect(() => {
        setSelectedOptionIndex(0);
    }, [transactionData]);



    return (
        <>
            <form action={formAction} className="mb-12">
                <input type="hidden" name="slug" value={transactionData.slug} />
                <section className="w-full max-w-7xl h-auto py-[100px] px-4 container mx-auto 2xl:px-0" id="payment">
                    <header className="relative text-2xl font-extrabold text-center mt-12 mb-12">
                        <h1 className="max-md:text-2xl text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Selesaikan Pembayaran</h1>
                    </header>
                    <main>
                        <div className="w-full grid grid-cols-2 min-sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-200/50 drop-shadow-gray-400/50 backdrop-blur-md drop-shadow-2xl border border-gray-100 inner-shadow p-6 rounded-lg mb-12">
                            <div className='w-full '>
                                <label className="block text-black max-sm:text-sm" htmlFor="book_topic">Nama Acara</label>
                                <p className='text-black font-bold max-sm:text-sm'>{transactionData.title}</p>
                            </div>
                            <div className='w-full '>
                                <label className="block text-black max-sm:text-sm" htmlFor="book_topic">Nama Peserta</label>
                                <p className='text-black font-bold max-sm:text-sm'>{user?.full_name}</p>
                            </div>
                            <div className='w-full '>
                                <label className="block text-black max-sm:text-sm" htmlFor="book_topic">Biaya Pendaftaran</label>
                                <p className='text-black font-bold max-sm:text-sm'>{transactionData.registration_cost ? parseInt(transactionData.registration_cost).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'Gratis'}</p>
                            </div>
                            <div className='w-full '>
                                <label className="block text-black max-sm:text-sm" htmlFor="book_topic">Tanggal Acara</label>
                                <p className='text-black font-bold max-sm:text-sm'>{transactionData.event_date}</p>
                            </div>
                            <div className='w-full '>
                                <label className="block text-black max-sm:text-sm" htmlFor="book_topic">Waktu Acara</label>
                                <p className='text-black font-bold max-sm:text-sm'>{transactionData.event_time}</p>
                            </div>

                            <div className='w-full'>
                                <label className='block text-black max-sm:text-sm' htmlFor="book_topic">Lokasi Acara</label>
                                <p className='text-black font-bold max-sm:text-sm'>{transactionData.location}</p>
                            </div>
                        </div>
                        <div className="accordion *:accordion-item-active:shadow-2xl *:accordion-item-active:bg-[#7a2985] *:accordion-item-active:backdrop-blur-md *:accordion-item-active:text-white grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
                            {paymentMethods.map((option: any, index: number) => (
                                <div
                                    key={`option-${option.id}`}
                                    className={`accordion-item ${index === selectedOptionIndex ? 'active active:drop-shadow-gray-400/50 active:backdrop-blur-md active:drop-shadow-2xl  border border-[#7a2985] transition-all duration-600' : 'bg-white border border-dotted border-gray-200 transition-all duration-600 '} rounded-[12px] `}
                                    onClick={() => setSelectedOptionIndex(index)}
                                >
                                    <input
                                        type="radio"
                                        name="paymentOption"
                                        id={option.id}
                                        value={option.id}
                                        checked={index === selectedOptionIndex}
                                        onChange={() => setSelectedOptionIndex(index)}
                                        className="peer hidden radio"
                                    />
                                    <label htmlFor={option.id} id={`header-${index}`} className={`accordion-header flex justify-between items-center w-full px-5 py-4`}>
                                        <div className="flex items-center gap-2">
                                            <div className="avatar">
                                                <div className="size-12 rounded-md">
                                                    <Image decoding="async" priority={true} src={index === selectedOptionIndex ? getImageUrl(option.icon_active) : getImageUrl(option.icon)} alt="avatar" width={100} height={100} className={`size-auto ${index === selectedOptionIndex ? '' : ''}`} />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="mb-0.5 font-bold max-md:text-sm">{option.name}</p>
                                                <p className={`max-md:hidden max-md:text-xs text-sm ${index === selectedOptionIndex ? 'text-white/50' : ''} font-normal`}>{option.description}</p>
                                                <div className='hidden max-md:block max-md:text-sm' ><b>#{option.code}</b></div>
                                            </div>
                                        </div>
                                    </label>
                                    <div id={`collapse-${index}`} className=" max-sm:hidden accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby={`header-${index}`} role="region">
                                        <div className="px-5 pb-4">
                                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                                <div className='col-span-1'>Pembayaran ke <br /><b>#{option.code}</b></div>
                                                <div className='col-span-1'>Nama Penerima <br /> <b>Optimal Untuk Negeri</b></div>
                                                <div className='col-span-1 md:col-span-2 lg:col-span-1 lg:text-right '>Total Bayar:<br /><strong>{parseInt(transactionData.registration_cost).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</strong></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                    {
                        parseInt(transactionData.registration_cost as string) > 0 && (
                            <>
                                <header className="relative mt-12">
                                    <h1 className="max-md:text-lg text-2xl mb-4 z-10 text-gray-900 dark:text-gray-50 leading-tight font-bold">Upload Bukti Pembayaran</h1>
                                </header>
                                <div className="col-span-full mb-6">
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <Icon icon="tabler:photo" className="w-12 h-12 text-gray-400 mx-auto" />
                                            <div className="mt-4 flex text-sm/6 text-gray-600">
                                                <label htmlFor="receipted" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                                                    <span className="max-md:text-sm">Unggah bukti pembayaran</span>
                                                    <input id="receipted" type="file" name="receipted" className="sr-only" accept='image/jpeg, image/png' />
                                                </label>
                                                <p className="pl-1">or tempel di sini</p>
                                            </div>
                                            <p className="text-xs/5 text-gray-600">PNG, JPG up to 2MB</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-full mb-12'>
                                    <label className="block max-md:text-xs text-black max-md:font-normal font-bold mb-4">*) Konfirmasi Pembayaran anda dengan menghubungi tim kami via Whatsapp</label>
                                    <Link className="px-4 py-2 text-sm border rounded-lg border-green-600 hover:border-green-600 text-green-600 hover:bg-green-600 hover:text-white join items-center font-bold" href='https://wa.link/pe0iuj'> <Icon icon="tabler:brand-whatsapp" className="mr-2 size-6" width="32" height="32" />Hubungi kami</Link>
                                </div>
                            </>
                        )
                    }
                    <div className="col-span-full">
                        <SubmitButton />
                    </div>
                </section>
            </form>
            {/* <Alert {...alertProps} /> */}
        </>
    );
}