// app/api/manga/route.ts - DÜZELTİLMİŞ
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Manga from '@/models/Manga';

export async function GET() {
  console.log('📖 Manga list endpoint called');
  
  try {
    console.log('1. Connecting to database...');
    await dbConnect();
    console.log('✅ Database connected');

    console.log('2. Fetching manga list...');
    const manga = await Manga.find().sort({ createdAt: -1 });
    console.log('✅ Manga list fetched:', manga.length, 'items');

    return NextResponse.json(manga);
    
  } catch (error: any) {
    console.error('❌ Manga list error:', error);
    
    return NextResponse.json(
      { 
        error: 'Manga listesi alınamadı',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}