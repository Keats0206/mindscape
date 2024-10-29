// app/api/user/route.ts
import { getCurrentUser } from '@/utils/user';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userData = await getCurrentUser();
    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}