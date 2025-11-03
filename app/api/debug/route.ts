// app/api/debug/route.ts - KESİN ÇALIŞAN VERSİYON
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'OK',
    message: 'Debug endpoint is working',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      hasMongoURI: !!process.env.MONGODB_URI,
      mongoURILength: process.env.MONGODB_URI?.length || 0
    }
  });
}