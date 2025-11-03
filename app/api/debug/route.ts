// app/api/debug/route.ts - HATA AYIKLAMA İÇİN
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('🔧 Debug endpoint called');
    
    // 1. Environment variables kontrolü
    const hasMongoURI = !!process.env.MONGODB_URI;
    console.log('MONGODB_URI exists:', hasMongoURI);
    
    if (!hasMongoURI) {
      return NextResponse.json({
        error: 'MONGODB_URI environment variable not found',
        envKeys: Object.keys(process.env).filter(key => key.includes('MONGO'))
      }, { status: 500 });
    }

    // 2. Database bağlantısı testi
    console.log('Attempting database connection...');
    await dbConnect();
    console.log('✅ Database connected successfully');

    // 3. Connection state kontrolü
    const connectionState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    console.log('Database connection state:', states[connectionState]);

    // 4. Basit bir query testi
    const Manga = mongoose.models.Manga;
    console.log('Manga model exists:', !!Manga);
    
    if (Manga) {
      const count = await Manga.countDocuments();
      console.log('Current documents count:', count);
    }

    return NextResponse.json({
      success: true,
      message: 'Debug information',
      database: {
        connected: connectionState === 1,
        state: states[connectionState],
        modelExists: !!Manga,
        documentCount: Manga ? await Manga.countDocuments() : 0
      },
      environment: {
        hasMongoURI: hasMongoURI,
        nodeEnv: process.env.NODE_ENV
      }
    });

  } catch (error: any) {
    console.error('❌ Debug error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Debug failed',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}