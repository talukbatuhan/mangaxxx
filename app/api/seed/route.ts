// app/api/seed/route.ts - DETAYLI VERSİYON
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Manga from '@/models/Manga';
import { sampleMangaData } from '../../types/manga';

export async function GET() {
  console.log('🔧 Seed endpoint called');
  
  try {
    console.log('1. Database connection attempting...');
    await dbConnect();
    console.log('✅ Database connected');

    console.log('2. Clearing existing data...');
    await Manga.deleteMany({});
    console.log('✅ Existing data cleared');

    console.log('3. Inserting sample data...');
    const result = await Manga.insertMany(sampleMangaData);
    console.log('✅ Sample data inserted:', result.length, 'documents');

    return NextResponse.json({ 
      success: true,
      message: 'Database başarıyla seed edildi!',
      count: result.length,
      documents: result
    });
    
  } catch (error: any) {
    console.error('❌ Seed error details:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Seed işlemi başarısız',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}