
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    // const token = (await cookies()).get('token')?.value;

    // if (!token) {
    //     return NextResponse.json({ error: 'Authorization token is missing' }, { status: 401 });
    // }

    // const sessionResponse = await fetch('/api/session');
    

    // if (!sessionResponse.ok) {
    //     return NextResponse.json({ error: 'Failed to fetch user session' }, { status: sessionResponse.status });
    // }

    // const session = await sessionResponse.json();

    // if (!session || !session.slug) {
    //     return NextResponse.json({ error: 'Invalid user session' }, { status: 401 });
    // }

    // try {
    //     console.log('Backend API URL:', `${process.env.NEXT_PUBLIC_API_URL}/api/v1/event/member/${session.slug}`);
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/event/member/${session.slug}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         },
    //     });

    //     if (!response.ok) {
    //         const errorText = await response.text();
    //         console.error('Backend API error:', errorText);
    //         return NextResponse.json({ error: `Failed to fetch user events: ${errorText}` }, { status: response.status });
    //     }

    //     const responseText = await response.json();
    //     console.log('Backend API response text:', responseText);

    //     try {
    //         const data = await response.json();
    //         console.log('Backend API response JSON:', data);
    //         return NextResponse.json(data);
    //     } catch (error) {
    //         console.error('Error parsing JSON from backend:', error);
    //         return NextResponse.json({ error: 'Error parsing JSON from backend' }, { status: 500 });
    //     }
    // } catch (error) {
    //     console.error('Error fetching user events:', error);
    //     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    // }
}
