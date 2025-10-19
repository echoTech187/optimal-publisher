import Image from "next/image";
import Link from "next/link";
const NotFound = () => {
    return (
        <section>
            <div className="mx-auto max-w-7xl my-[150px] flex flex-col items-center justify-center gap-24">
                <div className="w-full h-full flex flex-col items-center justify-center size-80">
                    <Image src="../images/404.png" alt="404" width={0} height={0} className=" w-80 object-cover" />
                </div>
                <span className=" font-bold text-base-content">Halaman Tidak Ditemukan, <Link href="/book" className="text-fuchsia-700 hover:text-fuchsia-900">Silahkan Kembali Ke Halaman Sebelumnya</Link></span>

            </div>
        </section >
    );
}

export default NotFound;
