"use server";
import { cookies } from "next/headers";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;
import { getSession } from "@/features/auth/session";
import { redirect } from "next/navigation";
import { fetchEventDetail } from "./data";

export async function submitPayment(previousState: any, formData: FormData) {
    const session = await getSession();
    if (!session) {
        return { success: false, message: "Not authenticated" };
    }

    const slug = formData.get('slug') as string;
    const receiptFile = formData.get('receipted') as File;

    if (!slug) {
        return { success: false, message: "Missing event slug" };
    }

    const eventData = await fetchEventDetail(slug);
    if (!eventData) {
        return { success: false, message: "Event not found" };
    }

    // Re-construct formData for the final submission handler
    const finalFormData = new FormData();
    finalFormData.append('event_name', eventData.title);
    finalFormData.append('event_type_id', eventData.event_type.id);
    finalFormData.append('event_type', eventData.event_type.name);
    finalFormData.append('member_id', session.id);
    finalFormData.append('username', session.full_name);
    finalFormData.append('phone_number', session.phone_number ?? '');
    finalFormData.append('event_date', eventData.event_date);
    finalFormData.append('event_time', eventData.event_time);
    finalFormData.append('event_location', eventData.location);
    finalFormData.append('event_price', eventData.registration_cost);
    
    if (receiptFile && receiptFile.size > 0) {
        finalFormData.append('receipted', receiptFile);
    }
    
    const paymentMethodId = formData.get('paymentOption');
    if (paymentMethodId) {
        finalFormData.append('payment_method_id', paymentMethodId as string);
    }

    const response = await transactionEventSubmitHandler(finalFormData);

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Event registration failed:', errorText);
        redirect(`/event/${slug}/payment/error?message=${encodeURIComponent(errorText || 'Event registration failed')}`);
    }

    const responseData = await response.json();
    console.log('Event registration successful:', responseData);

    // The redirect should be handled by the client or by throwing an error that Next.js catches
    // For now, I will return a success state and let the client handle it.
    // A redirect in a server action used with `useActionState` is a bit tricky.
    // A common pattern is to return a redirect URL and have the client do `window.location.href = ...`
    // Or, we can use the `redirect` from `next/navigation` if not using `useActionState` for state feedback.
    
    // Let's try the redirect and see if it works.
    redirect(`/event/${slug}/payment/success`);
}

export async function transactionEventSubmitHandler(formData: FormData) {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
    }

    try {
        const url = `${API_BASE_URL}/event/transaction`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: formData,
        });
        return response;
    } catch (error) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ message: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ message: "An unknown error occurred" }), { status: 500 });
    }
}