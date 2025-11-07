import { NextResponse } from 'next/server';

export async function GET() {
    console.log('API route /api/test hit');
    return NextResponse.json({ message: 'Hello from /api/test' });
}
