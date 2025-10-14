import { Suspense } from "react";
import Register from "./register";

export default function Page() {
    return (
        <Suspense fallback={<div className='flex justify-center items-center h-screen'>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>}>
            <Register />
        </Suspense>
    )
}