import { Icon } from "@iconify/react";

export default function ArticleBanner() {
    return (
        <div className="bg-[url('/images/Banner-1.jpg')] bg-cover bg-center h-[580px] ">
            <section className="max-w-[1300px] mx-auto flex flex-col justify-center items-center h-full text-white gap-12">
                <div className="text-center w-full">
                    <h1 className="text-3xl font-semibold mb-3">Jadilah Praktisi Kesehatan Profesional</h1>
                    <p className="text-xl">Berikan pelayanan kesehatan yang terbaik untuk masyarakat Indonesia dengan belajar dari para tenaga kesehatan yang berpengalaman.</p>
                </div>
                <div className="relative w-1/2 join">
                    <input type="search" name="search" className="input input-lg join-item" id="search" placeholder="Cari artikel " />
                    <button type="button" className="px-4 py-2 bg-blue-800 join-item">
                        <Icon icon="tabler:search" className="size-6" />
                    </button>
                </div>
            </section>
        </div>
    );
}