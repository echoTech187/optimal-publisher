import { fetchHkiDataTransaction }  from '@/features/payment/data';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { code_transaction: string } }) {
  try {
    const hkiData = await fetchHkiDataTransaction(params.code_transaction);
    return NextResponse.json(hkiData);
  } catch (error) {
    return new NextResponse('Error fetching HKI data', { status: 500 });
  }
}
