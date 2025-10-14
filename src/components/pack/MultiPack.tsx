
"use client";

import FormProgramReference from "@/components/forms/FormProgramReference";
import { User } from "@/types/user";
import Image from "next/image";
import { useState } from "react";

export default function MultiPack(props: { data: any, user: User }) {
    const { data, user } = props;
    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [showAdress, setShowAdress] = useState(false);
    const [itemSelected, setItemSelected] = useState("");

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

    return (
        <section className="w-full h-full py-[150px]">
            <header className={`max-w-[1300px] mx-auto px-4 text-center`}>
                <h1 className="text-4xl anton z-10 text-gray-700 dark:text-gray-50 leading-tight text-center">Pilih Paket Optimal</h1>
                <p>Pilih paket yang sesuai dengan kebutuhanmu</p>
            </header>
            <div className={`max-w-[1300px] mx-auto px-4 mt-12`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {
                        data.map((item: any, index: number) => (
                            <div key={item.slug} className="flex flex-col rounded-xl shadow-xs bg-gradient-to-b from-[#ffeaa4] to-white dark:from-[#111] dark:to-[#333] dark:text-gray-50 text-[#333] hover:shadow-2xl hover:shadow-black/20 backdrop-blur-md">
                                <div className="flex items-center gap-2 text-xl p-6">
                                    <div className="size-[60px]">
                                        <Image priority={true} src="/penerbit-logo.png" alt="Icon Nurse" width={4800} height={3800} className="object-contain size-full -z-1 rounded-t-lg" />
                                    </div>
                                    <div>
                                        <p className="text-sm">{item.package_type.name}</p>
                                        <h5 className="font-bold">{item.name}</h5>
                                    </div>
                                </div>
                                <div className=" w-full px-6 flex-1">
                                    <p className="text-sm">{item.description}</p>
                                </div>
                                <div className="flex justify-between items-center p-6">
                                    <div className="flex justify-center">
                                        <span className="text-black dark:text-gray-50 font-bold">{parseInt(item.price).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}/Penulis/Topik</span>
                                    </div>
                                    <button onClick={() => showFormCustomer(item)} className="w-fit font-bold py-2 px-4 rounded transition-colors bg-black dark:bg-black/80 dark:text-amber-500 dark:hover:text-amber-400 text-white hover:font-semibold text-sm hover:bg-transparent border border-transparent hover:border-black hover:text-black flex items-center justify-center">
                                        Pilih Paket
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {
                showCustomerForm && (<FormProgramReference data={itemSelected} user={user} showAdress={showAdress} />)
            }
        </section>
    )
}
