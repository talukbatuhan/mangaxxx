// app/api/seed/route.ts - TYPE-SAFE VERSİYON
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Manga from '@/models/Manga';

const sampleMangaData = [
  {
    title: 'Semavi İblisin Yolu',
    coverImage: '/images/kapak3.jpg',
    countryFlag: '🇰🇷',
    episodes: [
      { number: 25, timeAgo: '18 saat önce', isNew: true },
      { number: 24, timeAgo: '1 hafta önce', isNew: false },
    ],
    status: 'Devam Ediyor' as const,
    rating: '8.9',
    genres: ['Fantazi', 'Aksiyon', 'Doğaüstü'],
    description: 'Bir öğrencinin akademide hayatta kalma mücadelesi...'
  },
  {
    title: 'Dahi Okçunun Yayın Günlükleri',
    coverImage: '/images/kapak4.jpg',
    countryFlag: '🇰🇷',
    episodes: [
      { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
    ],
    status: 'Devam Ediyor' as const,
    rating: '8.7',
    genres: ['Okul', 'Spor', 'Dram'],
    description: 'Genç bir okçunun başarı hikayesi...'
  }
];

export async function GET() {
  try {
    await connectDB();
    
    await Manga.deleteMany({});
    const result = await Manga.insertMany(sampleMangaData);
    
    return NextResponse.json({ 
      success: true,
      message: 'Database seeded successfully!',
      count: result.length
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Seed failed',
        message: error.message
      },
      { status: 500 }
    );
  }
}