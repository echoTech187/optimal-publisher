import { fetchInstitutions } from '@/features/form/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const institutions = await fetchInstitutions();
    return NextResponse.json(institutions);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching institutions' }, { status: 500 });
  }
}
