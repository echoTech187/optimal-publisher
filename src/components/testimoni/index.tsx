import { Icon } from "@iconify/react";
import Image from "next/image";
export default function Testimoni() {
    return (
        <section className="w-full h-auto py-[100px] text-black dark:text-white scroll-mt-24" id="reviews">
            <div className="px-4 container mx-auto 2xl:px-0 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 z-10 text-gray-700 dark:text-gray-50 leading-tight text-center">Apa Kata Mereka?</h2>
            </div>
            <div data-carousel='{"currentIndex": 0, "loadingClasses": "opacity-0", "slidesQty": { "xs": 1, "md": 2, "lg":3 },  "isAutoPlay": true, "speed": 5000 ,"isInfiniteLoop": true }'
                data-carousel-initialized='true' className='relative w-full px-4 container mx-auto 2xl:px-0'>
                <div className='carousel min-h-80' >
                    <div className="carousel-body h-full w-full gap-8 flex items-stretch">
                        <div className="carousel-slide w-full p-6 my-6 rounded-lg shadow-none flex flex-col items-center text-center">
                            <Image src="/user/PPC05016.jpg" alt="Foto profil Meci Putri Utami" width={96} height={96} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm text-base">"Dengan belajar di Optimal, Anda akan dapat menghadapi UKOM dengan percaya diri dan sukses."</p>
                            <h3 className="font-bold capitalize text-lg"><span className="text-black/60 dark:text-gray-400">Stikes Bhakti husada Bengkulu</span> - Meci Putri Utami</h3>
                        </div>
                        <div className="carousel-slide  p-6 my-6 rounded-lg shadow-none flex flex-col items-center text-center">
                            <Image src="/user/IMG20220620100552.jpg" alt="Foto profil Zuliana Latifah Ari Hidawati" width={96} height={96} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm text-base">"Belajar Bimbel di Optimal sangatlah seru, apalagi waktu pembahasan soalnya banyak yg keluar waktu di Ukom, terimakasih Tim Optimal Sukses selalu"</p>
                            <h3 className="font-bold capitalize text-lg"><span className="text-black/60 dark:text-gray-400">Unipdu Jombang</span> - Zuliana Latifah Ari Hidawati</h3>
                        </div>
                        <div className="carousel-slide  p-6 my-6 rounded-lg shadow-none flex flex-col items-center text-center">
                            <Image src="/user/IMG20241010.jpg" alt="Foto profil Lili wahyuni" width={96} height={96} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm text-base">"Bimbel optimal sangat membantu dalam persiapan ukom. Selain para pengajar yang enak dan mudah diterima, materi soal dan pembahasannya juga banyak yang keluar di ukom."</p>
                            <h3 className="font-bold capitalize text-lg"><span className="text-black/60 dark:text-gray-400">Stikes majapahit</span> - Lili wahyuni</h3>
                        </div>
                        <div className="carousel-slide  p-6 my-6 rounded-lg shadow-none flex flex-col items-center text-center">
                            <Image src="/user/IMG20240912.jpg" alt="Foto profil Muliana Sari" width={96} height={96} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm text-base">"Optimal kereeen,, Masyaallah tabarakallah,, metode belajar nya bagus banget,mudah di mengerti, gampang banget untuk di ingat n di fahami 😊😊 <br />Teman saya yang belum kompeten saya rekomendasikan untuk bimbel di optimal Alhamdulillah katanya enak belajar di bimbel optimal.."</p>
                            <h3 className="font-bold capitalize text-lg"><span className="text-black/60 dark:text-gray-400">Payung negeri Pekanbaru</span> - Muliana Sari</h3>
                        </div>
                        <div className="carousel-slide  p-6 my-6 rounded-lg shadow-none flex flex-col items-center text-center">
                            <Image src="/user/IMG385511.jpg" alt="Foto profil Anastasia padu lemba" width={96} height={96} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm text-base">"Sangat bagus dan sangat membantu selama bimbel  selama ini Danke banyak kaka gbu"</p>
                            <h3 className="font-bold capitalize text-lg"><span className="text-black/60 dark:text-gray-400">Akper Waingapu</span> - Anastasia padu lemba</h3>
                        </div>
                    </div>
                </div>
                <button type="button" className="carousel-prev start-5 max-sm:start-3 carousel-disabled:opacity-50 size-9.5 bg-base-100/20 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                    <Icon icon="tabler:chevron-left" className="size-5" width="32" height="32" />
                    <span className="sr-only">Previous</span>
                </button>
                <button type="button" className="carousel-next end-5 max-sm:end-3 carousel-disabled:opacity-50 size-9.5 bg-base-100/20 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                    <Icon icon="tabler:chevron-right" className="size-5" width="32" height="32" />
                    <span className="sr-only">Next</span>
                </button>
            </div>
        </section>
    );
}
