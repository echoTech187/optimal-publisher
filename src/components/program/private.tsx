import { order } from "@/lib/actions/order";
import { User } from "@/types/user";
import { Icon } from "@iconify/react";

export default async function FormProgramPrivate(props: { data: any, user: User | null}) {
    const { data,user } = props;
    
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
                        <input type="text" name="fullname" id="fullname" className="input" readOnly value={user?.full_name}/>
                    </div>
                    <div className="mb-2" id="form-customer-phone">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
                        <input type="number" name="phone" id="phone" className="input" readOnly value={user?.phone_number}/>
                    </div>
                    <div className="mb-2" id="form-major">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="major">Jurusan</label>
                        <select className="select" name="major" id="major">
                            <option value="">Pilih Jurusan</option>
                            <option value="1">Kebidanan</option>
                            <option value="2">Keperawatan</option>
                        </select>
                    </div>
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
                    <div className="mb-2 col-span-2" id="form-customer-book_topic">
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