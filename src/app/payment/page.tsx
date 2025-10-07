import { Suspense } from "react";
import Payment from "./payment";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Payment />
        </Suspense>
    )
}