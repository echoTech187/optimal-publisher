import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
export default function Footer() {
    return (
        <section className="bg-[#212e42] text-white py-8 px-4 2xl:px-0">
            <div className="flex justify-between items-center w-full max-w-[1300px] mx-auto max-sm:px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <Image priority={true} src="/white-logo.png" alt="services" width={4000} height={4000} className="h-12 w-fit mb-2" />
                        <p className="text-sm font-bold">Optimal Untuk Negeri</p>
                        <p className="text-sm">Kami adalah wadah yang menginspirasi para Dosen dan Mahasiswa untuk mengeksplorasi karya dan inovasi dalam bidangnya masing-masing.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="mb-2 font-bold">Produk Optimal</p>
                        <a href="#package" className="text-sm">Layanan</a>
                        <a href="#reviews" className="text-sm">Ulasan</a>
                        <a href="#articles" className="text-sm">Artikel</a>
                        <a href="#faqs" className="text-sm">FAQs</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">Hubungi Kami</p>
                            <div className="text-sm">
                                <h5 className="font-bold mb-2">Alamat</h5>
                                <p className="font-normal">Kencana Tower Lt. Mezzanine, Jl. Raya Meruya Ilir No. 88 RT. 001 RW. 005, Kel. Meruya Utara, Kec. Kembangan, Jakarta Barat, DKI Jakarta - 11620</p>
                            </div>
                        </div>

                        <div className="text-sm">
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="w-[100px]">Email</span><span>: </span><span className="font-semibold flex-1">management@optimalbynfc.com</span>
                            </div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="w-[100px]">Kontak</span><span>: </span><span className="font-semibold flex-1">+62 812-9255-2552</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-white">
                            <p className="font-bold">Ikuti Kami</p>
                            <div className="flex gap-4">
                                <Link href="https://instagram.com/optimaluntuknegeri" className="mt-4 inline-block bg-white/10 hover:bg-white/20 p-2 rounded-full transition" title="@optimaluntuknegeri"><Icon icon="tabler:brand-instagram" /></Link>
                                <Link href="https://www.tiktok.com/@maskokooo" className="mt-4 inline-block bg-white/10 hover:bg-white/20 p-2 rounded-full transition" title="@maskokooo"><Icon icon="tabler:brand-tiktok-filled" /></Link>
                                <Link href="https://www.youtube.com/@optimaluntuknegeri" className="mt-4 inline-block bg-white/10 hover:bg-white/20 p-2 rounded-full transition" title="Optimal Untuk Negeri"><Icon icon="tabler:brand-youtube" /></Link>
                                <Link href="https://id.linkedin.com/company/optimalbynfc" className="mt-4 inline-block bg-white/10 hover:bg-white/20 p-2 rounded-full transition" title="PT Optimal Untuk Negeri"><Icon icon="tabler:brand-linkedin" /></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="text-sm p-4 text-center">Copyright &copy; 2025 Optimal Untuk Negeri. All rights reserved.</div>
        </section>
    );
}