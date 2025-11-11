import { fetchHkiTransaction } from '@/features/payment/data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  try {
    const hkiData = await fetchHkiTransaction(params.code_transaction);
    return NextResponse.json(hkiData);
  } catch (error) {
    return new NextResponse('Error fetching HKI data', { status: 500 });
  }
}
