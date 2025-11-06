import { getSession } from '@/features/auth/session';
import { fetchTransactions } from '@/features/payment/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const transactions = await fetchTransactions(session.id);
    return NextResponse.json(transactions);
  } catch (error) {
    return new NextResponse('Error fetching transactions', { status: 500 });
  }
}
