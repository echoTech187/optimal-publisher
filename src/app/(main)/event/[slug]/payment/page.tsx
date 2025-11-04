import { Suspense } from "react";
import FullPageLoader from "@/components/ui/FullPageLoader";
import { notFound, redirect } from "next/navigation";
import { fetchPaymentMethods } from "@/features/payment/data";
import { fetchEventDetail } from "@/features/event/data";
import { transactionEventSubmitHandler } from "@/features/event/actions";
import PaymentForm from "./PaymentForm";
import { getSession } from "@/features/auth/session";


// The main page component is now clean and simple
export default async function Page({ params }: { params: { slug: string | null } }) {
    const { slug } = await params;
    const session = await getSession();
    if (!slug) {
        notFound();
    }

    const [transactionData, paymentMethods] = await Promise.all([
        fetchEventDetail(slug),
        fetchPaymentMethods(),
    ]);

    if (!transactionData) {
        notFound();
    }

    async function handleFreeEventRegistration(eventData: any) {
        const session = await getSession();
        if (!session) {
            const eventUrl = `/event/${eventData.slug}`;
            redirect(`/signin?redirectedFrom=${encodeURIComponent(eventUrl)}`);
        }

        const formData = new FormData();
        formData.append('event_name', eventData.title);
        formData.append('event_type_id', eventData.event_type.id);
        formData.append('event_type', eventData.event_type.name);
        formData.append('member_id', session.id);
        formData.append('username', session.full_name);
        formData.append('phone_number', session.phone_number ?? '');
        formData.append('event_date', eventData.event_date);
        formData.append('event_time', eventData.event_time);
        formData.append('event_location', eventData.location);
        formData.append('event_price', eventData.registration_cost);

        const response = await transactionEventSubmitHandler(formData);
        if (!response.ok) {
            if (response.status === 401) {
                const eventUrl = `/event/${eventData.slug}`;
                redirect(`/signin?redirectedFrom=${encodeURIComponent(eventUrl)}`);
            } else if (response.status === 400) {
                redirect(`/event/${eventData.slug}/payment/error?message=${encodeURIComponent(response.statusText)}`);
            } else {
                redirect(`/event/${eventData.slug}/payment/error?message=${encodeURIComponent(response.statusText)}`);
            }
        } else {
            redirect(`/event/${eventData.slug}/payment/success`);
        }
    }

    if (parseInt(transactionData.registration_cost as string) === 0) {
        await handleFreeEventRegistration(transactionData);
        return;
    }

    return (
        <Suspense fallback={<FullPageLoader />}>
            <PaymentForm transactionData={transactionData} paymentMethods={paymentMethods} user={session} />

        </Suspense>
    );
}
