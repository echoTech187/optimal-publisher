"use client";
import { changeBookTitle, changeBookTopic } from "@/lib/actions/program";
import { fetchBookTitle, fetchBookTopic, fetchMajor } from "@/lib/data/program";
import { baseUrl } from "@/lib/utils/api";
import { User } from "@/types/user";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function FormProgramPrivate(props: { data: any, user: User | null }) {
    const { data, user } = props;

    const [major, setMajor] = useState([]);
    const [bookTitle, setBookTitle] = useState([]);
    const [bookTopic, setBookTopic] = useState([]);

    const [selectedMajor, setSelectedMajor] = useState("");
    const [selectedBookTitle, setSelectedBookTitle] = useState("");
    const [selectedBookTopic, setSelectedBookTopic] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const majorData = await fetchMajor();
            setMajor(majorData);
        };
        fetchData();
    }, []);

    async function handleChangeBookTitle(e: any) {
        setSelectedMajor(e.target.value);
        const bookTitleData = await fetchBookTitle({ selectedMajor: e.target.value });
        setBookTitle(bookTitleData);
    }
    async function handleChangeBookTopic(e: any) {
        setSelectedBookTitle(e.target.value);
        const bookTopicData = await fetchBookTopic({ selectedBookTitle: e.target.value });
        setBookTopic(bookTopicData);
    }

    async function handleChangeTopic(e: any) {
        setSelectedBookTopic(e.target.value);
    }

    return (
        <div className="max-w-[1300px] mx-auto h-full pt-[0px]" id="shipping-information">
            <header className="p-6">
                <h1 className="max-md:text-xl md:text-2xl 2xl:text-4xl font-bold z-10 text-gray-700 dark:text-gray-50 leading-tight">Informasi Pemesanan</h1>
                <p>Program Penerbitan Mandiri</p>
            </header>
            <div className="flex flex-col gap-6 p-6">
                <form name="form-customer" className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" id="form-customer">
                    <input type="hidden" name="type" value={data.isbn_program_id} />
                    <input type="hidden" name="package_id" value={data.id} />
                    <input type="hidden" name="package_name" value={data.name} />
                    <input type="hidden" name="price" value={Number(data.price)} />

                    <div className="mb-2" id="form-customer-name">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">Nama Lengkap beserta Gelar</label>
                        <input type="text" name="fullname" id="fullname" className="input" readOnly value={user?.full_name} />
                    </div>
                    <div className="mb-2" id="form-customer-phone">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
                        <input type="number" name="phone" id="phone" className="input" readOnly value={user?.phone_number} />
                    </div>
                    <div className="mb-2" id="form-major">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">Jurusan</label>
                        <select className="select" name="major" id="major" onChange={handleChangeBookTitle} value={selectedMajor}>
                            <option value="">Pilih Jurusan</option>
                            {
                                major.map((item: any) => {
                                    return <option key={item.id} value={item.id}>{item.major_name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-2" id="form-customer-book_title">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book_title">Judul Buku</label>
                        <select className="select" name="book_title" id="book_title" onChange={handleChangeBookTopic} value={selectedBookTitle}>
                            <option value="">Pilih Judul Buku</option>
                            {
                                bookTitle.map((item: any) => {
                                    return <option key={item.id} value={item.id}>{item.title}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-2 col-span-2" id="form-customer-book_topic">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book_topic">Topik</label>
                        <select className="select" name="book_topic" id="book_topic" onChange={handleChangeTopic} value={selectedBookTopic}>
                            <option value="">Pilih Topik</option>
                            {
                                bookTopic.map((item: any) => {
                                    return <option key={item.id} value={item.id}>{item.topic_name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-span-full" id="form-customer-address">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Alamat pengiriman buku fisik</label>
                        <textarea className="textarea" name="address" id="address" placeholder="Alamat" required aria-placeholder="Masukan Alamat Pengiriman"></textarea>
                    </div>
                    <div className="col-span-full mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="receipted">Upload File Full Naskah Buku</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <Icon icon="tabler:photo" className="w-12 h-12 text-gray-400 mx-auto" />
                                <div className="mt-4 flex justify-center text-sm/6 text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" type="file" name="receipted" className="sr-only" accept='image/jpeg, image/png' />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs/5 text-gray-600">File Harus Microsoft Word Format (.docx) dengan Ukuran Maksimal 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 col-span-2 join items-center gap-4" id="form-customer-address">
                        <input type="checkbox" name="aggrement" id="aggrement" value={1} className="checkbox" required />
                        <label className="block text-gray-700 text-sm" htmlFor="aggrement">Dengan ini saya menyatakan bahwa data yang saya masukan adalah benar dan dapat dipertanggung jawabkan. Serta saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku.</label>
                    </div>
                    <div className=" col-span-2" id="form-customer-address">
                        <button type="submit" className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Lanjutkan Pembayaran dan Kirim Naskah</button>
                    </div>
                </form>
            </div>
        </div>
    );
}