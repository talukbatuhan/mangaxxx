'use client'; 

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react'; // Only need ChevronRight now

// --- Sub-Component: MangaCard ---
interface MangaCardProps {
  id: number;
  title: string;
  coverUrl: string;
}

const MangaCard: React.FC<MangaCardProps> = ({ id, title, coverUrl }) => {
  // Placeholder image if coverUrl is missing or invalid
  const fallbackUrl = 'https://placehold.co/220x320/000000/FFFFFF?text=Manga+Cover';

  return (
    <Link 
      href={`/manga/${id}`} 
      className="flex-shrink-0 w-[180px] sm:w-[220px] transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
    >
      <div className="relative w-full h-auto shadow-xl rounded-lg overflow-hidden group">
        
        <Image
          src={coverUrl || fallbackUrl}
          alt={`${title} Cover`}
          width={220} 
          height={320} 
          // Note: objectFit is legacy, replaced with Tailwind classes
          className="rounded-lg object-cover w-[180px] h-[270px] sm:w-[220px] sm:h-[320px] transition duration-500 group-hover:opacity-90"
        />
        
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-600 text-white font-bold hidden group-hover:block">
                #New
            </span>
        </div>
      </div>
      
      <p className="mt-2 text-sm font-medium text-white line-clamp-2">
        {title}
      </p>
    </Link>
  );
};
// --------------------------------------------------------


interface MangaListCarouselProps {
  title: string; 
  mangas: MangaCardProps[]; 
}

const MangaListCarousel: React.FC<MangaListCarouselProps> = ({ title, mangas }) => {
    
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Approximate scroll distance per click (Card Width + Space-x-6 (24px))
  const CARD_SCROLL_AMOUNT = 220 + 24; 

  /**
   * Handles smooth horizontal scrolling and implements the looping logic for forward scroll.
   * @param scrollOffset The distance to scroll (positive for right, negative for left).
   */
  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const currentScroll = container.scrollLeft;
        // Max scrollable distance = Total content width - Visible viewport width
        const maxScroll = container.scrollWidth - container.clientWidth;
        const newScroll = currentScroll + scrollOffset;

        if (scrollOffset > 0) { // Scroll Right (Forward)
            // If the new scroll position would exceed the maximum scroll limit
            if (newScroll >= maxScroll) {
                // Loop: Jump back to the beginning (0)
                container.scroll({ left: 0, behavior: 'smooth' });
            } else {
                // Normal scroll
                container.scroll({ left: newScroll, behavior: 'smooth' });
            }
        } else { // Scroll Left (Backward) - No looping logic applied here
            // Ensure we don't scroll past the start (0)
            const targetScroll = Math.max(0, newScroll);
            container.scroll({ left: targetScroll, behavior: 'smooth' });
        }
    }
  };

  return (

    <section className="w-full bg-gray-900 py-10"> 
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-white mb-8 border-b-2 border-red-600 pb-2 inline-block">
          {title}
        </h2>
        
        {/* Scroll Area and Controls Container (The core of the layout) */}
        <div className="relative">
          
          {/* Manga Cards List - Horizontal Scroll Section */}
          <div 
            ref={scrollContainerRef}
            // Added right padding (pr-16) to ensure the last item isn't hidden behind the button
            className="flex space-x-6 overflow-x-scroll pb-4 scrollbar-gizle scroll-smooth"
          >
            {mangas.map(manga => (
              <MangaCard 
                key={manga.id} 
                id={manga.id} 
                title={manga.title} 
                coverUrl={manga.coverUrl} 
              />
            ))}
          </div>

          {/* Right Scroll Button - Positioned Absolutely and Vertically Centered */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:block z-20">
            <button 
              onClick={() => scroll(CARD_SCROLL_AMOUNT)} // Scroll Right (Forward Loop)
              className="p-3 rounded-full bg-red-600 text-white shadow-xl hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
              aria-label="Scroll Right and Loop"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MangaListCarousel;
