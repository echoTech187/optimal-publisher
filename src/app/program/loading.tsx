
// This is a special Next.js file that will be automatically rendered
// as a fallback while the page.tsx component is loading its data.

export default function Loading() {
    // You can make any UI you want here, from a simple spinner to a skeleton screen.
    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        </>
    );
}
