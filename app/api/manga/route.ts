// app/api/manga/route.ts
import { NextResponse } from 'next/server';
import Manga from './models/Manga';

export async function GET() {
  try {
    const manga = await Manga.find().populate('chapters');
    return NextResponse.json(manga);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const manga = await Manga.create(body);
    return NextResponse.json(manga, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Creation failed' }, { status: 500 });
  }
}