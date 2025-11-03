// components/LatestMangaList.tsx
'use client';

import { sampleMangaData, MangaEntry } from '../types/manga';
import Link from 'next/link';

interface MangaListItemProps {
  manga: MangaEntry;
  index: number;
}

const MangaListItem = ({ manga, index }: MangaListItemProps) => {
  return (

    <div className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-all duration-300 hover:translate-y-[-2px] border border-gray-700 hover:border-red-500/50 h-full">
      <div className="flex items-start gap-3 sm:gap-4 h-full">
        {/* Cover Image - BÜYÜTÜLMÜŞ ve Responsive Boyutlar */}
        {/* w-28 h-36 (küçük) -> sm:w-36 sm:h-48 (orta) -> md:w-48 md:h-64 (büyük) */}
        <div className="w-28 h-36 sm:w-36 sm:h-48 md:w-48 md:h-64 flex-shrink-0">
          <img
            src={manga.coverImage}
            alt={manga.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x600/1a1a2e/ffffff?text=No+Cover';
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0 flex flex-col justify-between h-full">
          <div className="flex-grow">
            {/* Title and Badges */}
            <div className="flex flex-col gap-2 mb-3">
              <h3 className="text-white font-bold text-base sm:text-lg leading-tight line-clamp-2">
                {manga.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                  {manga.countryFlag}
                </span>
                {manga.rating && (
                  <span className="text-yellow-400 flex items-center gap-1 text-xs sm:text-sm">
                    ⭐ {manga.rating}
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded ${
                  manga.status === 'Devam Ediyor' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {manga.status}
                </span>
              </div>
            </div>

            {/* Latest Chapter Info */}
            <div className="mb-3">
              {manga.episodes.slice(0, 5).map((episode, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    <Link href="/" className='hover:text-red-100' >Chapter {episode.number}</Link>
                    
                  </span>
                  <span className="text-green-400 text-xs">
                    {episode.timeAgo}
                  </span>
                </div>
              ))}
            </div>
          </div>
            
          {/* GENRE VE OKU BUTONU AYNI SATIRDA HİZALAMA */}
          <div className="flex items-end justify-between">
            {/* Genres */}
            <div className="flex flex-wrap gap-1 max-w-[65%]">
              {manga.genres?.slice(0, 3).map((genre, idx) => (
                <span key={idx} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                  {genre}
                </span>
              ))}
            </div>

            {/* Action Button (Oku) - Sağa Hizalı */}
            <button className="bg-red-600/50 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold whitespace-nowrap">
              Oku
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function LatestMangaList() {
  return (
    <section className="bg-gray-900 min-h-screen py-8 sm:py-12">
        {/* Kapsayıcıyı (container) başlık dahil tüm içeriği sarmalamak için kullanıyoruz */}
        <div className="container mx-auto px-3 sm:px-4">
            
            {/* Responsive ve Temizlenmiş H1 Başlığı */}
            <h6 className='text-left  font-bold text-3xl
                       sm:text-3xl lg:text-4xl 
                      inline-block border-b-2 border-red-600 
                      pb-1 mb-8 sm:mb-10'>
              Son Eklenenler
            </h6>
          
            {/* Two Column Manga List - Responsive grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {sampleMangaData.map((manga, index) => (
                <MangaListItem key={manga.id} manga={manga} index={index} />
              ))}
            </div>
        </div>
    </section>
  );
}