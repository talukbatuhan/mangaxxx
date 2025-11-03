// app/api/manga/route.ts - TYPE-SAFE VERSİYON
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Manga from '@/models/Manga';

export async function GET() {
  try {
    await connectDB();
    const manga = await Manga.find().sort({ createdAt: -1 });
    return NextResponse.json(manga);
  } catch (error: any) {
    console.error('Manga list error:', error);
    return NextResponse.json(
      { error: 'Manga listesi alınamadı', details: error.message },
      { status: 500 }
    );
  }
}