// app/api/auth/route.ts - BASİT VERSİYON
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Auth API is under development',
    status: 'coming_soon'
  });
}

export async function POST() {
  return NextResponse.json({ 
    error: 'Auth not implemented yet' 
  }, { status: 501 });
}