import { getSession } from '@/features/auth/session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const token = (await cookies()).get('token')?.value
    if (!session || !session.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await request.formData();
    formData.append('_method', 'POST'); // Spoof PATCH method for Laravel

    const response = await fetch(`http://127.0.0.1:8000/api/v1/member/${session.slug}`, {
        method: 'POST', // Use POST for FormData with method spoofing
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        return new NextResponse(`Error from backend: ${response.statusText}`, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
  }
}
