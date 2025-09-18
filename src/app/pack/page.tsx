"use client";
import Image from "next/image";
import { useState } from "react";
import FormCustomer from "./form";
import { useSearchParams } from "next/navigation";
export default function PackageList() {
    const router = useSearchParams();
    const type = router.get("type");
    const [showCustomer, setShowCustomer] = useState(false);
    const [showAdress, setShowAdress] = useState(false);
    const [packName, setPackName] = useState("");
    function showFormCustomer(selected: string, pack: string) {
        setShowCustomer(true);
        setPackName(pack);
        if (selected === "full") setShowAdress(true);
        else setShowAdress(false);
        if (showCustomer) {
            location.href = "#shipping-information";
        }

    }
    return (
        <section className="w-full h-full my-[100px]">

            <header className={`max-w-[1300px] mx-auto px-4 text-center ${(type === "pm" || type === "mbm") ? "hidden" : ""}`}>
                <h1 className="text-4xl anton z-10 text-gray-700 dark:text-gray-50 leading-tight text-center">Pilih Paket Optimal</h1>
                <p>Pilih paket yang sesuai dengan kebutuhanmu</p>
            </header>
            <div className={`max-w-[1300px] mx-auto px-4 mt-12 ${(type === "pm" || type === "mbm") ? "hidden" : ""}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col rounded-xl shadow-xs bg-gradient-to-b from-[#ffeaa4] to-white dark:from-[#111] dark:to-[#333] dark:text-gray-50 text-[#333] hover:shadow-2xl hover:shadow-black/20 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-xl p-6">
                            <div className="size-[60px]">
                                <Image priority={true} src="/penerbit-logo.png" alt="Icon Nurse" width={4800} height={3800} className="object-contain size-full -z-1 rounded-t-lg" />
                            </div>
                            <div>
                                <p className="text-sm">Anggota</p>
                                <h5 className="font-bold">Paket Standar</h5>
                            </div>
                        </div>
                        <div className=" w-full px-6 flex-1">
                            <p className="text-sm">Paket Softcopy (E-Book) ini tersedia untuk anggota yang terdaftar.</p>
                        </div>
                        <div className="flex justify-between items-center p-6">
                            <div className="flex justify-center">
                                <span className="text-black dark:text-gray-50 font-bold">Rp. 249.000/Penulis/Topik</span>
                            </div>
                            <button onClick={() => showFormCustomer("standar", "Paket Softcopy (E-Book) ini tersedia untuk anggota yang terdaftar.")} className="w-fit font-bold py-2 px-4 rounded transition-colors bg-black dark:bg-black/80 dark:text-amber-500 dark:hover:text-amber-400 text-white hover:font-semibold text-sm hover:bg-transparent border border-transparent hover:border-black hover:text-black flex items-center justify-center">
                                Pilih Paket
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-xl shadow-xs bg-gradient-to-b from-[#ffeaa4] to-white dark:from-[#111] dark:to-[#333] dark:text-gray-50 text-[#333] hover:shadow-2xl hover:shadow-black/20 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-xl p-6">
                            <div className="size-[60px]">
                                <Image priority={true} src="/penerbit-logo.png" alt="Icon Nurse" width={4800} height={3800} className="object-contain size-full -z-1 rounded-t-lg" />
                            </div>
                            <div>
                                <p className="text-sm">Non-Anggota</p>
                                <h5 className="font-bold">Paket Standar</h5>
                            </div>
                        </div>
                        <div className=" w-full px-6 flex-1">
                            <p className="text-sm">Paket Softcopy (E-Book) ini tersedia untuk anggota yang belum terdaftar.</p>
                        </div>
                        <div className="flex justify-between items-center p-6">
                            <div className="flex justify-center">
                                <span className=" text-gray-700 dark:text-gray-50 font-bold">Rp. 299.000/Penulis/Topik</span>
                            </div>
                            <button onClick={() => showFormCustomer("standar", "Paket Softcopy (E-Book) ini tersedia untuk anggota yang belum terdaftar.")} className="w-fit font-bold py-2 px-4 rounded transition-colors bg-black dark:bg-black/80 dark:text-amber-500 dark:hover:text-amber-400 text-white hover:font-semibold text-sm hover:bg-transparent border border-transparent hover:border-black hover:text-black flex items-center justify-center">
                                Pilih Paket
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-xl shadow-xs bg-gradient-to-b from-[#ffeaa4] to-white dark:from-[#111] dark:to-[#333] dark:text-gray-50 text-[#333] hover:shadow-2xl hover:shadow-black/20 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-xl p-6">
                            <div className="size-[60px]">
                                <Image priority={true} src="/penerbit-logo.png" alt="Icon Nurse" width={4800} height={3800} className="object-contain size-full -z-1 rounded-t-lg" />
                            </div>
                            <div>
                                <p className="text-sm">Anggota</p>
                                <h5 className="font-bold">Paket Lengkap</h5>
                            </div>
                        </div>
                        <div className=" w-full px-6 flex-1">
                            <p className="text-sm">Paket Lengkap Softcopy + Hardcopy (E-Book) ini tersedia untuk anggota yang terdaftar.</p>
                        </div>
                        <div className="flex justify-between items-center p-6">
                            <div className="flex justify-center">
                                <span className=" text-gray-700 dark:text-gray-50 font-bold">Rp. 349.000/Penulis/Topik</span>
                            </div>
                            <button onClick={() => showFormCustomer("full", "Paket Lengkap Softcopy + Hardcopy (E-Book) ini tersedia untuk anggota yang terdaftar.")} className="w-fit font-bold py-2 px-4 rounded transition-colors bg-black dark:bg-black/80 dark:text-amber-500 dark:hover:text-amber-400 text-white hover:font-semibold text-sm hover:bg-transparent border border-transparent hover:border-black hover:text-black flex items-center justify-center">
                                Pilih Paket
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-xl shadow-xs bg-gradient-to-b from-[#ffeaa4] to-white dark:from-[#111] dark:to-[#333] dark:text-gray-50 text-[#333] hover:shadow-2xl hover:shadow-black/20 backdrop-blur-md">
                        <div className="flex items-center gap-2 text-xl p-6">
                            <div className="size-[60px]">
                                <Image priority={true} src="/penerbit-logo.png" alt="Icon Nurse" width={4800} height={3800} className="object-contain size-full -z-1 rounded-t-lg" />
                            </div>
                            <div>
                                <p className="text-sm">Non-Anggota</p>
                                <h5 className="font-bold">Paket Lengkap</h5>
                            </div>
                        </div>
                        <div className=" w-full px-6 flex-1">
                            <p className="text-sm">Paket Lengkap Softcopy + Hardcopy (E-Book) ini tersedia untuk anggota yang belum terdaftar.</p>
                        </div>
                        <div className="flex justify-between items-center p-6">
                            <div className="flex justify-center">
                                <span className=" text-gray-700 dark:text-gray-50 font-bold">Rp. 399.000/Penulis/Topik</span>
                            </div>
                            <button onClick={() => showFormCustomer("full", "Paket Lengkap Softcopy + Hardcopy (E-Book) ini tersedia untuk anggota yang belum terdaftar.")} className="w-fit font-bold py-2 px-4 rounded transition-colors bg-black dark:bg-black/80 dark:text-amber-500 dark:hover:text-amber-400 text-white hover:font-semibold text-sm hover:bg-transparent border border-transparent hover:border-black hover:text-black flex items-center justify-center">
                                Pilih Paket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                showCustomer ? <div className="max-w-[1300px] mx-auto h-full pt-[80px]" id="shipping-information">
                    <header className="p-6">
                        <h1 className="max-md:text-xl md:text-2xl 2xl:text-4xl font-bold z-10 text-gray-700 dark:text-gray-50 leading-tight">Informasi Pemesanan</h1>
                        <p>{packName}</p>
                    </header>
                    <div className="flex flex-col gap-6 mt-6 p-6">
                        <FormCustomer packName={packName} showAdress={showAdress} />
                    </div>
                </div> : <></>
            }

            {
                (type === "pm" || type === "mbm") ? <div className="max-w-[1300px] mx-auto h-full pt-[80px]" id="shipping-information">
                    <header className="p-6">
                        <h1 className="max-md:text-xl md:text-2xl 2xl:text-4xl font-bold z-10 text-gray-700 dark:text-gray-50 leading-tight">Informasi Pemesanan</h1>
                        <p>Paket Penerbitan Mandiri</p>
                    </header>
                    <div className="flex flex-col gap-6 mt-6 p-6">
                        <FormCustomer packName={packName} showAdress={showAdress} type={type} />
                    </div>
                </div> : <></>
            }

        </section>

    )
}