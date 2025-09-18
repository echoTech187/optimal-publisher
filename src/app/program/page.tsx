"use client";
export default function ProgramList() {
    return (<>
        <section className="w-full h-auto py-[100px] px-4 max-w-[1300px] mx-auto 2xl:px-0" id="program">
            <header className="relative mb-24 text-center">
                <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Program Unggulan</h1>
                <p>Pilih program yang sesuai dengan kebutuhanmu</p>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure><img src="/browser/Poster Ajakan Membaca Buku Ilustratif Biru dan Hijau.png" alt="Shoes" className="image-full" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Penerbitan Mandiri</h2>
                        <p>Program Unggulan</p>
                        <div className="card-actions justify-center">
                            <button onClick={()=>window.location.href = "/pack?type=pm"} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Lanjutkan</button>
                        </div>
                    </div>
                </div>
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure><img src="/browser/Poster Ajakan Membaca Buku Ilustratif Biru dan Hijau.png" alt="Shoes" className="image-full" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Program Menulis Buku Referensi</h2>
                        <p>Program Unggulan</p>
                        <div className="card-actions justify-end">
                            <button onClick={()=>window.location.href = "/pack?type=mbr"} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Lanjutkan</button>
                        </div>
                    </div>
                </div>
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure><img src="/browser/Poster Ajakan Membaca Buku Ilustratif Biru dan Hijau.png" alt="Shoes" className="image-full" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Program Menulis Buku Ajar</h2>
                        <p>Program Unggulan</p>
                        <div className="card-actions justify-end">
                            <button onClick={()=>window.location.href = "/pack?type=mba"} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Lanjutkan</button>
                        </div>
                    </div>
                </div>
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure><img src="/browser/Poster Ajakan Membaca Buku Ilustratif Biru dan Hijau.png" alt="Shoes" className="image-full" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Program Menulis Buku Chapter</h2>
                        <p>Program Unggulan</p>
                        <div className="card-actions justify-end">
                            <button onClick={()=>window.location.href = "/pack?type=mbc"} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Lanjutkan</button>
                        </div>
                    </div>
                </div>
                <div className="card w-full bg-base-100 shadow-xl">
                    <figure><img src="/browser/Poster Ajakan Membaca Buku Ilustratif Biru dan Hijau.png" alt="Shoes" className="image-full" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Program Menulis Buku Monograf</h2>
                        <p>Program Unggulan</p>
                        <div className="card-actions justify-end">
                            <button onClick={()=>window.location.href = "/pack?type=mbm"} className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">Lanjutkan</button>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>)
}