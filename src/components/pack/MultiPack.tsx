"use client";

import FormProgramReference from "@/components/forms/FormProgramReference";
import { User } from "@/types/user";
import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";

export default function MultiPack(props: { data: any, user: User }) {
    const { data, user } = props;
    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [showAdress, setShowAdress] = useState(false);
    const [itemSelected, setItemSelected] = useState("");
    const scrollContainer = React.useRef<HTMLDivElement>(null);

    function showFormCustomer(data: any) {
        setItemSelected(data);
        setShowCustomerForm(true);
        if (data.package_type.id === 3) {
            setShowAdress(true);
        } else {
            setShowAdress(false);
        }
        window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' });
    }

    const scroll = (scrollOffset: number) => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollLeft += scrollOffset;
        }
    };

    return (
        <section className="w-full h-full py-24 lg:py-32">
            <header className={`container mx-auto px-4 text-center`}>
                <h2 className="text-3xl md:text-4xl font-bold z-10 text-gray-700 dark:text-gray-50 leading-tight text-center">Pilih Paket Optimal</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Pilih paket yang sesuai dengan kebutuhanmu</p>
            </header>
            <div className="container mx-auto px-4 my-12">
                <div className="relative">
                    <button onClick={() => scroll(-400)} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
                        <Icon icon="ion:chevron-back" />
                    </button>
                    <div ref={scrollContainer} className="overflow-x-auto pb-4 -mb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <div className="grid grid-flow-col auto-cols-max gap-5">
                            {
                                data.map((item: any, index: number) => (
                                    <div key={item.slug} className="relative min-w-80 max-md:min-w-80 max-md:max-w-95 max-w-90">
                                        {index === 0 && (
                                            <div className="absolute top-0 right-0 overflow-hidden w-24 h-24">
                                                <div className="absolute transform rotate-45 bg-orange-400 text-center text-white font-semibold py-1 right-[-50px] top-[20px] min-w-[170px] shadow-md">
                                                    Popular
                                                </div>
                                            </div>
                                        )}
                                        <div className={`flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 h-full ${index === 0 ? 'bg-white' : (index === 1 ? 'bg-white' : 'bg-gray-800 text-white')} `}>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold">{item.name}</h3>
                                                <p className="text-sm mt-2">{item.description}</p>
                                                <div className="my-4">
                                                    <span className="text-2xl font-bold">{parseInt(item.price).toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                                    <span className="text-sm text-gray-400">/Penulis/Topik</span>
                                                </div>
                                                <button onClick={() => showFormCustomer(item)} className={`w-full font-bold py-3 px-4 rounded-lg transition-colors ${index > 1 ? 'bg-white text-black' : 'bg-orange-500 text-white'} hover:bg-opacity-90`}>
                                                    Pilih Paket
                                                </button>
                                            </div>
                                            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                                                <h4 className="font-bold mb-4">What's included</h4>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-center"><Icon icon="ion:checkmark" className="text-green-500 mr-2" /> Unlimited requests</li>
                                                    <li className="flex items-center"><Icon icon="ion:checkmark" className="text-green-500 mr-2" /> Unlimited brands</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button onClick={() => scroll(400)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
                        <Icon icon="ion:chevron-forward" />
                    </button>
                </div>
            </div>
            {
                showCustomerForm && (<FormProgramReference data={itemSelected} user={user} showAdress={showAdress} />)
            }
        </section>
    )
}