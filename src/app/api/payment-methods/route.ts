import { fetchPaymentMethods } from '@/features/payment/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const paymentMethods = await fetchPaymentMethods();
    return NextResponse.json(paymentMethods);
  } catch (error) {
    return new NextResponse('Error fetching payment methods', { status: 500 });
  }
}
