// app/manga/[id]/[chapterNumber]/page.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowLeft, ChevronDown } from 'lucide-react';

// Types
interface ChapterData {
  id: string;
  mangaTitle: string;
  chapterNumber: number;
  prevChapter: number | null;
  nextChapter: number | null;
  panelUrls: string[];
}

// Sample Data
const sampleChapter: ChapterData = {
  id: 'ch1',
  mangaTitle: 'Akademide Hayatta Kalma Yolları',
  chapterNumber: 83,
  prevChapter: 82,
  nextChapter: 84,
  panelUrls: [
    '/images/manga-1/page-2.webp',
    '/images/manga-1/page-3.webp',
    '/images/manga-1/page-4.webp',
    '/images/manga-1/page-5.webp',
    '/images/manga-1/page-6.webp',
    '/images/manga-1/page-7.webp',
    '/images/manga-1/page-8.webp',
    '/images/manga-1/page-9.webp',
    '/images/manga-1/page-10.webp',
    '/images/manga-1/page-11.webp',
  ],
};

// Tüm bölümlerin listesi
const allChapters = [
  { number: 1, title: "Başlangıç", date: "2023-01-01" },
  { number: 2, title: "Yeni Hayat", date: "2023-01-08" },
  { number: 3, title: "İlk Sınav", date: "2023-01-15" },
  // ... diğer bölümler
  { number: 81, title: "Büyük Mücadele", date: "2024-10-01" },
  { number: 82, title: "Dönüm Noktası", date: "2024-10-08" },
  { number: 83, title: "Yeni Güç", date: "2024-10-15" },
  { number: 84, title: "Son Savaş", date: "2024-10-22" },
];

const ChapterReader = ({ params }: { params: { id: string; chapterNumber: string } }) => {
  const chapterData = sampleChapter;
  const { id: mangaId, chapterNumber: currentChapterStr } = params;
  const currentChapter = parseInt(currentChapterStr, 10);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  // States
  const [readingProgress, setReadingProgress] = useState(0);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isChapterDropdownOpen, setIsChapterDropdownOpen] = useState(false);

  // Reading progress calculation
  useEffect(() => {
    const calculateProgress = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', calculateProgress, { passive: true });
      calculateProgress();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', calculateProgress);
      }
    };
  }, []);

  // Header auto-hide
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      if (scrollTop > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isChapterDropdownOpen) {
        setIsChapterDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isChapterDropdownOpen]);

  const handleImageError = (index: number) => {
    setImageLoadErrors(prev => new Set(prev).add(index));
  };

  const handleChapterSelect = (chapterNum: number) => {
    window.location.href = `/manga/${mangaId}/${chapterNum}`;
  };

  const ChapterNavButton = ({ direction }: { direction: 'prev' | 'next' }) => {
    const targetChapter = direction === 'prev' ? chapterData.prevChapter : chapterData.nextChapter;
    const isDisabled = targetChapter === null;
    
    return (
      <Link 
        href={targetChapter ? `/manga/${mangaId}/${targetChapter}` : '#'}
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
          isDisabled 
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-30' 
            : 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
        }`}
        onClick={(e) => { if (isDisabled) e.preventDefault(); }}
      >
        {direction === 'prev' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </Link>
    );
  };

  const ProgressBar = () => (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent h-1">
      <div 
        className="bg-red-600 h-1 rounded-r transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );

  const currentChapterData = allChapters.find(chap => chap.number === currentChapter);

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      
      {/* Progress Bar */}
      <ProgressBar />

      {/* Minimal Header */}
      <header className={`fixed top-1 left-0 w-full z-40 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-900/90 backdrop-blur-lg rounded-lg shadow-lg border border-gray-700/30 p-3">
            
            {/* Üst Satır: Manga Başlığı */}
            <div className="flex justify-between items-center mb-2">
              <Link 
                href={`/manga/${mangaId}`}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium truncate max-w-[140px] sm:max-w-xs">
                  {chapterData.mangaTitle}
                </span>
              </Link>

              {/* Bölüm Bilgisi */}
              <div className="text-xs text-gray-400">
                %{Math.round(readingProgress)} okundu
              </div>
            </div>

            {/* Alt Satır: Bölüm Navigasyonu */}
            <div className="flex items-center justify-between">
              <ChapterNavButton direction="prev" />
              
              {/* Bölüm Seçici */}
              <div className="flex-1 mx-3">
                <div className="flex flex-col items-center">
                  {/* Bölüm Başlığı */}
                  <div className="text-xs text-gray-400 mb-1">
                    {currentChapterData?.title || `Bölüm ${currentChapter}`}
                  </div>
                  
                  {/* Bölüm Seçme */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsChapterDropdownOpen(!isChapterDropdownOpen);
                      }}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600"
                    >
                      <span className="font-semibold text-white">
                        Chapter {currentChapter.toString().padStart(2, '0')}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                        isChapterDropdownOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isChapterDropdownOpen && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 max-h-80 overflow-y-auto bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50">
                        <div className="p-2">
                          <div className="text-xs text-gray-400 px-3 py-2 border-b border-gray-700">
                            Tüm Bölümler
                          </div>
                          {allChapters.map((chapter) => (
                            <button
                              key={chapter.number}
                              onClick={() => handleChapterSelect(chapter.number)}
                              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                chapter.number === currentChapter
                                  ? 'bg-red-600 text-white'
                                  : 'hover:bg-gray-700 text-gray-300'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  Chapter {chapter.number.toString().padStart(2, '0')}
                                </span>
                                <span className="text-xs opacity-70">
                                  {chapter.title}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <ChapterNavButton direction="next" />
            </div>
          </div>
        </div>
      </header>

      {/* Ana Okuma Alanı */}
      <main 
        ref={containerRef}
        className="h-screen overflow-y-auto scroll-smooth bg-gray-900 pt-24"
        onClick={() => setIsChapterDropdownOpen(false)}
      >
        <div className="max-w-4xl mx-auto">
          
          {/* Manga Panelleri */}
          {chapterData.panelUrls.map((url, index) => (
            <div 
              key={index} 
              className="w-full bg-gray-900 overflow-hidden"
            >
              {imageLoadErrors.has(index) ? (
                <div className="flex items-center justify-center h-64 bg-gray-800 text-gray-400">
                  <div className="text-center">
                    <p>Resim yüklenemedi</p>
                    <button 
                      onClick={() => {
                        setImageLoadErrors(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(index);
                          return newSet;
                        });
                      }}
                      className="mt-2 text-sm text-red-400 hover:text-red-300"
                    >
                      Tekrar Dene
                    </button>
                  </div>
                </div>
              ) : (
                <Image
                  src={url}
                  alt={`${chapterData.mangaTitle} - Bölüm ${currentChapter} Panel ${index + 1}`}
                  width={1200}
                  height={1600}
                  className="w-full h-auto"
                  loading="lazy"
                  onError={() => handleImageError(index)}
                />
              )}
            </div>
          ))}
          
          {/* Alt Navigasyon */}
          <div className="bg-gray-800/30 p-6 mt-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <ChapterNavButton direction="prev" />
                
                {/* Alt Bölüm Seçici */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsChapterDropdownOpen(!isChapterDropdownOpen);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors border border-gray-600"
                  >
                    <span className="font-semibold text-white">
                      Chapter {currentChapter.toString().padStart(2, '0')}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                
                <ChapterNavButton direction="next" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChapterReader;