import { Icon } from "@iconify/react";
import Image from "next/image";
export default function Testimoni() {
    return (
        <section className="w-full h-auto py-[100px] bg-gradient-to-r from-[#f4c573] to-[#f5be5f] text-black dark:text-white " id="reviews">
            <div className="px-4 container mx-auto 2xl:px-0">
                <h2 className="text-4xl anton mb-12 z-10 text-gray-700 dark:text-gray-50 leading-tight text-center">Apa Kata Mereka?</h2>
            </div>
            <div data-carousel='{"currentIndex": 0, "loadingClasses": "opacity-0", "slidesQty": { "xs": 1, "md": 2, "lg":3 },  "isAutoPlay": true, "speed": 5000 ,"isInfiniteLoop": true }'
                data-carousel-initialized='true' className='relative w-full px-4 container mx-auto 2xl:px-0'>
                <div className='carousel min-h-80' >
                    <div className="carousel-body h-full w-full gap-8 flex items-stretch">
                        <div className="carousel-slide w-full p-6 my-6 rounded-lg shadow-xs flex flex-col items-center text-center">
                            <Image priority={true}src="/user/PPC05016.jpg" alt="Testimoni 1" width={50} height={50} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm">"Dengan belajar di Optimal, Anda akan dapat menghadapi UKOM dengan percaya diri dan sukses."</p>
                            <h3 className="font-bold capitalize"><span className="text-black/60 dark:text-gray-400">Stikes Bhakti husada Bengkulu</span> - Meci Putri Utami</h3>
                        </div>
                        <div className="carousel-slide  p-6 my-6 rounded-lg shadow-xs flex flex-col items-center text-center">
                            <Image priority={true}src="/user/IMG20220620100552.jpg" alt="Testimoni 2" width={50} height={50} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm">"Belajar Bimbel di Optimal sangatlah seru, apalagi waktu pembahasan soalnya banyak yg keluar waktu di Ukom, terimakasih Tim Optimal Sukses selalu"</p>
                            <h3 className="font-bold capitalize"><span className="text-black/60 dark:text-gray-400">Unipdu Jombang</span> - Zuliana Latifah Ari Hidawati</h3>
                        </div>
                        <div className="carousel-slide  p-6 my-6 rounded-lg shadow-xs flex flex-col items-center text-center">
                            <Image priority={true}src="/user/IMG20241010.jpg" alt="Testimoni 2" width={50} height={50} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm">"Bimbel optimal sangat membantu dalam persiapan ukom. Selain para pengajar yang enak dan mudah diterima, materi soal dan pembahasannya juga banyak yang keluar di ukom."</p>
                            <h3 className="font-bold capitalize"><span className="text-black/60 dark:text-gray-400">Stikes majapahit</span> - Lili wahyuni</h3>
                        </div>
                        <div className="carousel-slide  p-6 my-6 rounded-lg shadow-xs flex flex-col items-center text-center">
                            <Image priority={true}src="/user/IMG20240912.jpg" alt="Testimoni 2" width={50} height={50} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm">"Optimal kereeen,, Masyaallah tabarakallah,, metode belajar nya bagus banget,mudah di mengerti, gampang banget untuk di ingat n di fahami 😊😊 <br />Teman saya yang belum kompeten saya rekomendasikan untuk bimbel di optimal Alhamdulillah katanya enak belajar di bimbel optimal.."</p>
                            <h3 className="font-bold capitalize"><span className="text-black/60 dark:text-gray-400">Payung negeri Pekanbaru</span> - Muliana Sari</h3>
                        </div>
                        <div className="carousel-slide  p-6 my-6 rounded-lg shadow-xs flex flex-col items-center text-center">
                            <Image priority={true}src="/user/IMG385511.jpg" alt="Testimoni 2" width={50} height={50} className="w-24 h-24 rounded-full object-cover mb-4 border-8 border-gray-200" />
                            <p className="mb-4 flex-1 max-w-sm">"Sangat bagus dan sangat membantu selama bimbel  selama ini Danke banyak kaka gbu"</p>
                            <h3 className="font-bold capitalize"><span className="text-black/60 dark:text-gray-400">Akper Waingapu</span> - Anastasia padu lemba</h3>
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