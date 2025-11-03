import Header from './components/Header';
import FeaturedMangaCarousel from './components/FeaturedMangaCarousel';
import MangaListCarousel from './components/MangaListCarousel';
import Footer from './components/Footer';
import LatestMangaGrid from './components/LatestMangaGrid'; 

// Örnek Veri Setleri (Gerçek veriyi bir API'dan almalısınız)
const popularMangaData = [
    // 10-15 adet MangaListProps tipinde veri
    { id: 11, title: 'Yozakura Shiijuusou', coverUrl: '/images/kapakresmi.jpg' },
    { id: 13, title: 'Harem Manga no Shujinkou dagou', coverUrl: '/images/kapak2.jpg' },
    { id: 14, title: 'Harem Manga no Shujinkou dagou', coverUrl: '/images/kapak3.jpg' },
    { id: 15, title: 'Harem Manga no Shujinkou dagou', coverUrl: '/images/kapak4.jpg' },
    { id: 16, title: 'Harem Manga no Shujinkou dagou', coverUrl: '/images/kapak5.jpg' },
    { id: 17, title: 'Harem Manga no Shujinkou dagou', coverUrl: '/images/kapak5.jpg' },
    { id: 18, title: 'Harem Manga no Shujinkou dagou', coverUrl: '/images/kapak2.jpg' },
    { id: 19, title: 'Harem Manga no Shujinkou dagou', coverUrl: '/images/kapak3.jpg' },
    { id: 20, title: 'Harem Manga no Shujinkou dagou', coverUrl: '/images/kapak4.jpg' },
    // ...
];

const recommendedMnagaData = [
    { id: 1, title: 'Önerilen 1', coverUrl: '/images/kapakresmi.jpg' },
    { id: 2, title: 'Önerilen 2', coverUrl: '/images/kapak2.jpg' },
    { id: 3, title: 'Önerilen 3', coverUrl: '/images/kapak3.jpg' },
    { id: 4, title: 'Önerilen 4', coverUrl: '/images/kapak4.jpg' },
    { id: 5, title: 'Önerilen 5', coverUrl: '/images/kapak5.jpg' },
    { id: 6, title: 'Önerilen 6', coverUrl: '/images/kapak5.jpg' },
    { id: 7, title: 'Önerilen 7', coverUrl: '/images/kapak2.jpg' },
    { id: 8, title: 'Önerilen 8', coverUrl: '/images/kapak3.jpg' },
    { id: 9, title: 'Önerilen 9', coverUrl: '/images/kapak4.jpg' },
    // ...
];


export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        
        <FeaturedMangaCarousel />


        <MangaListCarousel 
          title='Popüler'
          mangas={recommendedMnagaData}
        />
        <LatestMangaGrid />

        {/* Popüler Mangalar Sarmalı (Carousel) */}
        <MangaListCarousel 
          title='En Çok Okunanlar'
          mangas={popularMangaData}
        />

        <MangaListCarousel 
          title='Editör Önerisi'
          mangas={popularMangaData}
        />

      </main>

      <Footer />
    </>
  );
}