import { fetchMajors } from '@/features/form/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const majors = await fetchMajors();
    return NextResponse.json(majors);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching majors' }, { status: 500 });
  }
}
