
// This is a special Next.js file that will be automatically rendered
// as a fallback while the page.tsx component is loading its data.

export default function Loading() {
    // You can make any UI you want here, from a simple spinner to a skeleton screen.
    return (
        <section className="w-full h-auto py-[150px] px-4 max-w-[1300px] mx-auto 2xl:px-0">
            <header className="relative mb-24 text-center">
                <h1 className="text-4xl anton mb-4 z-10 text-gray-700 dark:text-gray-50 leading-tight">Program Unggulan</h1>
                <p>Pilih program yang sesuai dengan kebutuhanmu</p>
            </header>
            <div className="w-full h-full text-lg font-bold text-gray-600 flex items-center justify-center text-center dark:text-gray-50">
                Memuat data program...
            </div>
        </section>
    );
}
