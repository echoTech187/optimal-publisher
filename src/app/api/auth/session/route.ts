
import { getSession } from '@/features/auth/session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();
    if (session) {
      return NextResponse.json({ isLoggedIn: true, user: session });
    } else {
      return NextResponse.json({ isLoggedIn: false, user: null });
    }
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false, user: null }, { status: 500 });
  }
}
