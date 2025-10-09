'use client';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { imageUrl } from '@/lib/utils/api';
export default function Payment(props: { data: any, payment: any, loading: boolean }) {
    const router = useSearchParams();
    const type = router.get("type");
    const event = router.get("event");
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const { data, payment } = props;
    return (!data.loading) ? (
        <section className="w-full h-auto py-[100px] px-4 max-w-[1300px] mx-auto 2xl:px-0" id="payment">
            <header className="relative text-2xl font-extrabold text-center mt-12 mb-12">
                <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Selesaikan Pembayaran</h1>
            </header>
            <main>
                {
                    (type === "event") ?
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-100 p-6 rounded-lg mb-12">
                            <div className='w-full '>
                                <label className="block text-black " htmlFor="book_topic">Nama Acara</label>
                                <p className='text-black font-bold '>{event}</p>
                            </div>
                            <div className='w-full '>
                                <label className="block text-black " htmlFor="book_topic">Tanggal Acara</label>
                                <p className='text-black font-bold'>{new Date(Date.now()).toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className='w-full '>
                                <label className="block text-black " htmlFor="book_topic">Waktu Acara</label>
                                <p className='text-black font-bold'>{new Date(Date.now()).toLocaleTimeString('id', { hour: 'numeric', minute: 'numeric' })}</p>
                            </div>
                            <div className='w-full'>
                                <label className='block text-black ' htmlFor="book_topic">Lokasi Acara</label>
                                <p className='text-black font-bold'>Optimal</p>
                            </div>
                            <div className='w-full mb-4 col-span-full'>
                                <label className='block text-black  mb-2' htmlFor="book_topic">Ketentuan Acara</label>
                                <ol className="list-outside space-y-2 text-sm">
                                    <li className='text-black '>1. Dilarang menyebarkan informasi acara kepada pihak lain</li>
                                    <li className='text-black '>2. Dilarang mengundang pihak lain untuk mengikuti acara</li>
                                </ol>
                            </div>
                        </div>
                        : null
                }
                <div className="accordion  *:accordion-item-active:shadow-2xl *:accordion-item-active:bg-[#7a2985] *:accordion-item-active:text-white grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
                    {payment.map((option: any, index: number) => (
                        <><div
                            key={`payment-option-${index}`} id={option.id}
                            className={`accordion-item ${index === selectedOptionIndex ? 'active' : 'bg-gray-100 border border-gray-200'} rounded-[12px] cursor-pointer `}
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
                            <label htmlFor={option.id} className="accordion-header flex justify-between items-center w-full px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="avatar">
                                        <div className="size-12 rounded-md">
                                            <Image priority={true} src={imageUrl() + '/' + option.icon} alt="avatar" width={100} height={100} className='size-auto' />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-0.5 font-bold">{option.name}</p>
                                        <p className={`text-sm ${index === selectedOptionIndex ? 'text-white/50' : ''} font-normal`}>{option.description}</p>
                                    </div>
                                </div>
                            </label>
                            <div id="avatar1-arrow-right-collapse" className="accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="avatar1-arrow-right" role="region">
                                <div className="px-5 pb-4">
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                        <div className='col-span-1'>Pembayaran ke <br /><b>#{option.code}</b></div>
                                        <div className='col-span-1'>Nama Penerima <br /> <b>Optimal Untuk Negeri</b></div>
                                        <div className='col-span-1 md:col-span-2 lg:col-span-1 lg:text-right '>Total Bayar:<br /><strong>{parseInt(data.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</strong></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        </>
                    ))}
                </div>
            </main>
            <header className="relative mt-12">
                <h1 className="text-2xl mb-4 z-10 text-gray-900 dark:text-gray-50 leading-tight font-bold">Upload Bukti Pembayaran</h1>
            </header>
            <div className="col-span-full mb-6">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <Icon icon="tabler:photo" className="w-12 h-12 text-gray-400 mx-auto" />
                        <div className="mt-4 flex text-sm/6 text-gray-600">
                            <label htmlFor="receipted" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                                <span>Upload a file</span>
                                <input id="receipted" type="file" name="receipted" className="sr-only" accept='image/jpeg, image/png' />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs/5 text-gray-600">PNG, JPG up to 2MB</p>
                    </div>
                </div>
            </div>
            <div className='col-span-full mb-12'>
                <label className="block text-black font-bold mb-4">*) Konfirmasi Pembayaran anda dengan menghubungi tim kami via Whatsapp</label>
                <button type="button" className="px-4 py-2 text-sm border rounded-lg border-green-600 hover:border-green-600 text-green-600 hover:bg-green-600 hover:text-white join items-center font-bold" onClick={() => window.open('https://wa.link/pe0iuj', '_parent')}> <Icon icon="tabler:brand-whatsapp" className="mr-2 size-6" width="32" height="32" />Hubungi kami</button>
            </div>
            <div className="col-span-full">
                <button type="submit" onClick={(e) => window.open('/payment', '_parent')} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Upload Bukti Pembayaran</button>
            </div>
        </section>

    ) : <></>
}