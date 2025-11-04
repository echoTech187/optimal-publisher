import { Suspense } from "react";
import Register from "./register";
import FullPageLoader from "@/components/ui/FullPageLoader";

export default function Page() {
    return (
        <Suspense fallback={<FullPageLoader />}>
            <Register />
        </Suspense>
    )
}