"use client";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

export default function FormCustomer({ type, showAdress, packName, selectedPack }: { type?: string | null, showAdress: boolean, packName: string, selectedPack?: string | null }) {
    useEffect(() => {
        console.log(parseInt(selectedPack || "0") > 0);
        if (typeof window !== "undefined" && parseInt(selectedPack || "0") > 0) {
            let members = document.getElementById("members");
            if (!members) return;
            members.innerHTML = "";
            for (let i = 0; i < parseInt(selectedPack || "0"); i++) {
                addMember(i);
            }
        }
    }, [selectedPack]);
    function addMember(i: number) {
        let members = document.getElementById("members");
        if (!members) return;
        const memberItem = document.getElementsByClassName("member-item");
        const rowLength = i;
        const member = document.createElement("div");

        member.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 w-full member-item mb-4';

        member.innerHTML = `<div className="mb-2 w-full">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="members_name_${rowLength}">Nama Lengkap beserta Gelar (Anggota ${rowLength + 1})</label>
            <input type="text" name="members_name[]" id="members_name_${rowLength}" class="input" placeholder="Masukan Nama Anggota" />
        </div>
        <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="members_phone_${rowLength}">No. Telepon</label>
            <input type="text" name="members_phone[]" id="members_phone_${rowLength}" class="input" placeholder="Masukan No. Telepon Anggota" />
        </div>`;
        members.appendChild(member);
    }

    function changeWritter(value: boolean) {
        const chiefWriter = document.getElementById("chief_writer") as HTMLInputElement;
        const writerPhone = document.getElementById("writter_phone") as HTMLInputElement;
        const memberName = document.getElementById("members_name_0") as HTMLInputElement;
        const memberPhone = document.getElementById("members_phone_0") as HTMLInputElement;

        if (value) {
            if (memberName) {
                memberName.value = chiefWriter?.value ?? "";
            }
            if (memberPhone) {
                memberPhone.value = writerPhone?.value ?? "";
            }
        } else {
            memberName.value = "";
            memberPhone.value = "";
        }
    }
    return (<>
        <form action="/api/auth/register" method="post" className="w-full grid grid-cols-1 md:grid-cols-2 gap-6" id="form-customer">
            <input type="hidden" name="type" value={type?.toString()} />
            <input type="hidden" name="pack_name" value={packName} />
            {
                (type === "mbm") ?
                    <>
                        <div className="mb-2 col-span-2" id="form-title">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Judul Monograf</label>
                            <input type="text" name="title" id="title" className="input" autoFocus />
                        </div>
                        <div className="mb-2 col-span-2 md:col-span-1" id="form-chief-writer">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chief_writer">Nama Lengkap beserta Gelar (Penulis Utama)</label>
                            <input type="text" name="chief_writer" id="chief_writer" className="input" />
                        </div>
                        <div className="col-span-2 md:col-span-1" id="form-chief-phone">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="writter_phone">No. Telepon</label>
                            <input type="text" name="writter_phone" id="writter_phone" className="input" />
                        </div>
                        <div className="mb-2 col-span-2 join items-center gap-4 -mt-4" id="form-members-too">
                            <input type="checkbox" name="members_too" id="members_too" className="checkbox checkbox-sm" value={"true"} onChange={(e) => changeWritter(e.target.checked)} />
                            <label className="block text-gray-700 text-sm" htmlFor="members_too">Termasuk Anggota? Klik untuk menempatkan anggota ke dalam anggota utama</label>
                        </div>

                        <div className="mb-2 border border-gray-300 rounded-md col-span-2 p-4">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <label className="block text-gray-700 text-lg font-bold" htmlFor="members_name_0">Daftar Anggota <small className="text-sxs text-gray-500 font-normal">(Opsional)</small></label>
                                    <p className="text-sm text-gray-500">Tambahkan anggota penulis dengan nama lengkap beserta gelar dan no. telepon yang sesuai</p>
                                </div>
                                {/* <button type="button" className="bg-fuchsia-800 flex items-center hover:bg-fuchsia-700 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" id="add-member">
                                    <Icon icon="material-symbols:add" width="24" height="24" className="size-5" /> Tambah Anggota
                                </button> */}
                            </div>
                            <div className="mb-2" id="members">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full member-item mb-4">
                                    <div className="mb-2 w-full">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="members_name_0">Nama Lengkap beserta Gelar (Anggota 1)</label>
                                        <input type="text" name="members_name[]" id="members_name_0" className="input" placeholder="Masukan Nama Anggota" />
                                    </div>
                                    <div className="mb-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="members_phone_0">No. Telepon</label>
                                        <input type="text" name="members_phone[]" id="members_phone_0" className="input" placeholder="Masukan No. Telepon Anggota" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2 col-span-2" id="form-institution">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="institution">Asal Kampus/Institusi</label>
                            <select className="select" name="institution" id="institution">
                                <option value="">Pilih Asal Kampus/Institusi</option>
                                <option value="1">Institut Teknologi Bandung</option>
                                <option value="2">Institut Teknologi Sumatera</option>
                                <option value="3">Institut Teknologi Kalimantan</option>
                            </select>
                        </div>
                        <div className="mb-2 col-span-2" id="form-major">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">Jurusan</label>
                            <select className="select" name="major" id="major">
                                <option value="">Pilih Jurusan</option>
                                <option value="1">Kebidanan</option>
                                <option value="2">Keperawatan</option>
                            </select>
                        </div>
                        <div className="mb-2 col-span-2" id="form-address">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Kota/Provinsi/Kabupaten</label>
                            <input type="text" name="address" id="address" className="input" />
                        </div>
                    </>
                    : <>
                        <div className="mb-2" id="form-customer-name">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">Nama Lengkap beserta Gelar</label>
                            <input type="text" name="fullname" id="fullname" className="input" readOnly />
                        </div>
                        <div className="mb-2" id="form-customer-phone">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
                            <input type="number" name="phone" id="phone" className="input" readOnly />
                        </div>
                        <div className="mb-2" id="form-major">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">Jurusan</label>
                            <select className="select" name="major" id="major">
                                <option value="">Pilih Jurusan</option>
                                <option value="1">Kebidanan</option>
                                <option value="2">Keperawatan</option>
                            </select>
                        </div>
                        {
                            (type != "pm") ?
                                <>
                                    <div className="mb-2" id="form-customer-book_title">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book_title">Judul Buku</label>
                                        <select className="select" name="book_title" id="book_title">
                                            <option value="">Pilih Judul Buku</option>
                                            <option value="1">Etika Dan Hukum Kesehatan Kebidanan</option>
                                            <option value="2">Biologi Reproduksi</option>
                                            <option value="3">Farmakologi dalam Asuhan Kebidanan</option>
                                            <option value="4">Fisiologi Kehamilan, Persalinan, Nifas, dan BBL</option>
                                            <option value="5">Psikologi Kehamilan, Persalinan, Nifas</option>
                                            <option value="6">Keterampilan Dasar praktik Kebidanan</option>
                                            <option value="7">Pemeriksaan Fisik Ibu dan Bayi</option>
                                            <option value="8">Asuhan Kebidanan pada Remaja dan Perimenopause</option>
                                            <option value="9">Asuhan Kebidanan pada pranikah dan prakonsepsi</option>
                                            <option value="10">KB dan Pelayanan</option>
                                            <option value="11">Pelayanan Kebidanan Komunitas</option>
                                            <option value="12">Masalah dan Gangguan pada Sistem Reproduksi</option>
                                            <option value="13">Kegawatdaruratan Maternal dan Neonatal</option>
                                        </select>
                                    </div>
                                    <div className="mb-2" id="form-customer-book_topic">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book_topic">Topik</label>
                                        <select className="select" name="book_topic" id="book_topic">
                                            <option value="">Pilih Topik</option>
                                            <option value="1">Keterampilan Dasar praktik Kebidanan: 1. Sejarah dan dasar pelaksanaan kewaspadaan universal, 2. Pengenalan lingkungan fisik dalam pelayanan kebidanan</option>
                                            <option value="2">Keterampilan Dasar praktik Kebidanan: 3. Patient safety, 4. Prinsip dalam pencegahan Infeksi</option>
                                            <option value="3">Kebutuhan Dasar Manusia: 1. Kebutuhan Oksigenasi, 2. Kebutuhan nutrisi, istirahat, seksualitas</option>
                                            <option value="4">Kebutuhan Dasar Manusia: 3. Personal hygiene dalam kebidanan, 4. Konsep dasar eliminasi</option>
                                            <option value="5">Kebutuhan Dasar Manusia: 5. Tatalaksana gangguan eliminasi pada kehamilan, persalinan dan nifas, 6. Pengambilan spesimen urine dan feces dan urinalysis</option>
                                            <option value="6">Pemberian Obat dalam Praktik Kebidanan: 1. Plebotomi, Venapunkture dan terapi IV, 2. Tranfuse darah, 3. Hidrasi dan rehidrasi</option>
                                            <option value="7">Pemberian Obat dalam Praktik Kebidanan: 4. Injeksi (jenis, mekanisme penyimpanan, macam-macam ijection, dll), 5. Peran bidan dalam perawatan luka</option>
                                            <option value="8">Bantuan Hidup Dasar (BLS): 1. Basic Life Support, 2. Basic Life Saving, 3. Resusitasi infant dan dewasa</option>
                                            <option value="9">Bantuan Hidup Dasar (BLS): 4. Pertolongan pertama: a. Tersedak, b. Tidak dapat bernafas, c. Perdarahan, d. Luka bakar, e. Terkena racun, f. Cedera kepala dan leher, g. Korban tenggelam</option>
                                        </select>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="mb-2" id="form-book-title">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="book_title">Judul Buku yang Bapak/Ibu Tulis</label>
                                        <input type="text" name="book_title" id="book_title" className="input" />
                                        <small className="text-sm text-gray-500">Contoh: Buku Ajar, Buku Bunga Rampai, Buku Referensi, dll (Disertai Judul)</small>
                                    </div>
                                </>
                        }


                        {
                            showAdress ?
                                <div className=" col-span-2" id="form-customer-address">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Alamat</label>
                                    <textarea className="textarea" name="address" id="address" placeholder="Alamat" required aria-placeholder="Masukan Alamat Pengiriman"></textarea>
                                </div>
                                : <></>
                        }
                        {
                            (type === "pm") ? <>
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
                            </>
                                : <></>
                        }

                    </>

            }

            {
                (type != "pm") ?
                    <div className="mb-2 col-span-2" id="form-customer-alert">
                        <small className="text-[#CD5C5C] font-semibold">*) Jika penulis mengundurkan diri dan tidak dapat menyelesaikan naskah dalam waktu yang sudah di tentukan dan lain sebagainya, maka sesuai dengan prosedur penerbitan yang bapak ibu sudah baca di atas, uang yang telah dibayarkan diawal tidak dapat dikembalikan dan dianggap hangus.</small>
                    </div>
                    : <></>
            }
            <div className="mb-2 col-span-2 join items-center gap-4" id="form-customer-address">
                <input type="checkbox" name="aggrement" id="aggrement" value={1} className="checkbox" required />
                <label className="block text-gray-700 text-sm" htmlFor="aggrement">Dengan ini saya menyatakan bahwa data yang saya masukan adalah benar dan dapat dipertanggung jawabkan. Serta saya telah membaca dan menyetujui Syarat dan Ketentuan yang berlaku.</label>
            </div>
            <div className=" col-span-2" id="form-customer-address">
                <button type="submit" onClick={(e) => window.open('/payment', '_parent')} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">{(type != "pm") ? "Lanjutkan Pembayaran" : "Lanjutkan Pembayaran dan Kirim Naskah"}</button>
            </div>
        </form>
    </>);
}