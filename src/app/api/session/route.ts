import { getSession } from '@/features/auth/session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json(session);
  } catch (error) {
    return new NextResponse('Error fetching session', { status: 500 });
  }
}
