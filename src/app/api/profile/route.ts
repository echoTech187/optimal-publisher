import { getSession } from '@/features/auth/session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();
    const token = (await cookies()).get('token')?.value
    if (!session || !session.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    console.log(token);
    const response = await fetch(`http://127.0.0.1:8000/api/v1/member/${session.slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
  }
}
