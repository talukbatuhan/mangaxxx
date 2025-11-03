// app/components/FeaturedMangaCarousel.tsx

'use client'; 

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, User, Play } from 'lucide-react';

// TypeScript ile öne çıkan manga verisi için arayüz
interface MangaData {
  id: number;
  title: string;
  backgroundUrl: string;
  coverUrl: string;
  description: string;
  genres: string[];
  author: string;
  chapter: number;
}

// *** Lütfen bu diziyi kendi 10+ manga verinizle doldurunuz ***
const allMangaData: MangaData[] = [
  // 1. Örnek (Kullanılan resim yollarını kendi projenize göre düzenlemeyi unutmayın)
  {
    id: 1,
    title: "Yagate Kuromaku e to Itaru Saiteki kai",
    backgroundUrl: '/images/resim1.jpg', 
    coverUrl: '/images/kapakresmi.jpg', 
    description: "Having lost his beloved lifelong master Altesia, Kaitz vowed to take revenge on those who framed her. After making all his preparations, he 'returned' to the past. Now 10 years old, and armed with the knowledge he gained in the future, Kaitz begins to operate behind the scenes as the 'True Mastermind.'",
    genres: ['ACTION', 'DRAMA', 'FANTASY', 'ROMANCE'],
    author: 'Fujiki Washiro',
    chapter: 7,
  },
  // 2. Örnek
  {
    id: 2,
    title: "The Eminence in Shadow",
    backgroundUrl: '/images/resim2.jpg', 
    coverUrl: '/images/kapak2.jpg', 
    description: "Cid Kagenou, a true chuunibyou, reincarnates into a fantasy world and decides to live out his dream of being a background character who secretly controls everything.",
    genres: ['ACTION', 'COMEDY', 'ISEKAI'],
    author: 'Aizawa Daisuke',
    chapter: 55,
  },
  // 3. Örnek
  {
    id: 3,
    title: "Solo Leveling",
    backgroundUrl: '/images/resim3.jpg', 
    coverUrl: '/images/kapak5.jpg', 
    description: "E-rank hunter Jinwoo Sung, the weakest of them all, gains a mysterious program that allows him to 'level up' indefinitely, starting his journey to become the strongest.",
    genres: ['ACTION', 'FANTASY', 'ADVENTURE'],
    author: 'Chugong',
    chapter: 179,
  },
  // 4. Örnek
  {
    id: 4,
    title: "Attack on Titan",
    backgroundUrl: '/images/resim4.jpg', 
    coverUrl: '/images/kapak4.jpg', 
    description: "Humanity is forced to live in cities surrounded by gigantic walls to protect themselves from gigantic humanoid creatures called Titans.",
    genres: ['ACTION', 'DARK FANTASY', 'MILITARY'],
    author: 'Hajime Isayama',
    chapter: 139,
  },
  // 5. Örnek
  {
    id: 5,
    title: "One Piece",
    backgroundUrl: '/images/resim5.jpg', 
    coverUrl: '/images/kapak3.jpg', 
    description: "Monkey D. Luffy, a boy whose body gained the properties of rubber after unintentionally eating a Devil Fruit, sets out with his crew, the Straw Hat Pirates, to explore the Grand Line in search of the ultimate treasure known as the One Piece.",
    genres: ['ADVENTURE', 'FANTASY', 'SHONEN'],
    author: 'Eiichiro Oda',
    chapter: 1100,
  },
  // 6. Örnek
  {
    id: 6,
    title: "Jujutsu Kaisen",
    backgroundUrl: '/images/resim6.jpg', 
    coverUrl: '/images/kapak2.jpg', 
    description: "High school student Yuji Itadori joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse named Ryomen Sukuna, of whom Yuji becomes the host.",
    genres: ['ACTION', 'SUPERNATURAL', 'HORROR'],
    author: 'Gege Akutami',
    chapter: 280,
  },
  // 7. Örnek
  {
    id: 7,
    title: "Frieren: Beyond Journey's End",
    backgroundUrl: '/images/resim7.jpg', 
    coverUrl: '/images/kapak5.jpg', 
    description: "Frieren, an elf mage, watches her human companions die one by one, prompting her to embark on a new journey to understand the meaning of life and friendship.",
    genres: ['FANTASY', 'SLICE OF LIFE', 'DRAMA'],
    author: 'Kanehito Yamada',
    chapter: 120,
  },
  // 8. Örnek
  {
    id: 8,
    title: "Chainsaw Man",
    backgroundUrl: '/images/resim8.jpg', 
    coverUrl: '/images/kapak4.jpg', 
    description: "Denji, a poor young man, becomes a 'Chainsaw Man' after merging with his dog-devil Pochita, and is recruited by the Public Safety Devil Hunters to hunt down evil devils.",
    genres: ['ACTION', 'HORROR', 'DARK FANTASY'],
    author: 'Tatsuki Fujimoto',
    chapter: 170,
  },
  // 9. Örnek
  {
    id: 9,
    title: "Spy x Family",
    backgroundUrl: '/images/resim9.jpg', 
    coverUrl: '/images/kapak3.jpg', 
    description: "A spy, an assassin, and a telepath child unite to form a fake family, each keeping their true identities secret to maintain world peace.",
    genres: ['COMEDY', 'ACTION', 'SLICE OF LIFE'],
    author: 'Tatsuya Endo',
    chapter: 100,
  },
  // 10. Örnek
  {
    id: 10,
    title: "My Hero Academia",
    backgroundUrl: '/images/resim10.jpg', 
    coverUrl: '/images/kapak2.jpg', 
    description: "A world where almost everyone has superpowers, a boy named Izuku Midoriya, born without powers, is determined to become a Hero.",
    genres: ['ACTION', 'SHONEN', 'SUPERHERO'],
    author: 'Kohei Horikoshi',
    chapter: 450,
  },
];


const FeaturedMangaCarousel: React.FC = () => {
  // Aktif olarak gösterilen mangayı tutan state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mangalar arasında geçiş yapan ana fonksiyon
  const goToSlide = useCallback((index: number) => {
    // Döngüsel geçiş (son mangadan sonra ilk mangaya döner)
    if (index < 0) {
      setCurrentIndex(allMangaData.length - 1);
    } else if (index >= allMangaData.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  }, []);

  // Sonraki mangaya geçiş fonksiyonu (useEffect içinde kullanılacağı için useCallback ile sarmalandı)
  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // Önceki mangaya geçiş
  const goToPrev = () => {
    goToSlide(currentIndex - 1);
  };

  // **********************************************
  // OTOMATİK GEÇİŞ ÖZELLİĞİ
  // **********************************************
  useEffect(() => {
    // Otomatik geçiş aralığı: 5 saniye
    const intervalDuration = 5000; 
    
    const timer = setInterval(() => {
      goToNext(); 
    }, intervalDuration);

    // Temizleme: Bileşen DOM'dan ayrıldığında zamanlayıcıyı durdurur
    return () => clearInterval(timer);
  }, [goToNext]); 
  // **********************************************


  const currentManga = allMangaData[currentIndex];

  
  return (
    // Yüksekliği mobil ve büyük ekranlar için ayarlandı: h-[40vh] mobil, md:h-[65vh] büyük
    <section className="relative w-full h-[40vh] md:h-[65vh] bg-gray-900 overflow-hidden border-b-2 mt-0.5 border-red-600/50">
      
      {/* Her bir manga kartı, absolute konumlandırma ile üst üste konur */}
      {allMangaData.map((manga, index) => (
        <div 
          key={manga.id}
          className={`
            absolute inset-0 transition-opacity duration-700 ease-in-out
            ${index === currentIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'}
          `}
        >
          {/* Arkaplan Resmi */}
          <div className="absolute inset-0">
            <Image
              src={manga.backgroundUrl}
              alt={`${manga.title} Arkaplan`}
              layout="fill"
              objectFit="cover"
              // 🌫️ BURAYA BLUR EFEKTİ EKLENDİ
              className="object-cover blur-sm" 
              quality={85}
              priority={index === 0} 
            />
            
            {/* 🔴 OPASİTE AYARI: Siyah overlay */}
            <div className="absolute inset-0 bg-black/50 md:bg-black/40 lg:bg-black/30"></div>
          </div>

          {/* İçerik Katmanı */}
          <div className="relative z-30 max-w-7xl mx-auto h-full flex items-center p-4 md:p-8">
            
            {/* İçerik düzeni mobil ve büyük ekranlar için ayarlandı */}
            <div className="flex flex-col md:flex-row items-start md:items-end w-full">
              
              {/* Sol: Kapak Resmi - Mobil'de gizlendi veya küçültüldü */}
              <div className="hidden md:block flex-shrink-0 mb-4 md:mb-0 md:mr-8 shadow-2xl rounded-lg overflow-hidden
                   transform md:translate-y-0 lg:translate-y-0">
                <Image
                  src={manga.coverUrl}
                  alt={`${manga.title} Kapağı`}
                  width={220}
                  height={320}
                  objectFit="cover"
                  className="rounded-lg w-40 h-56 md:w-[220px] md:h-[320px]" // Responsive boyutlar
                  unoptimized // Örnek resim yolları için optimizasyonu devre dışı bırakabilirsiniz
                />
              </div>

              {/* Sağ: Metin ve Detaylar */}
              <div className="flex flex-col justify-end text-white max-w-full md:max-w-3xl">
                
                <h3 className="text-sm font-semibold mb-1 text-red-400">Popular New Titles</h3>
                
                {/* Başlık - Responsive font büyüklüğü */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 leading-tight">
                  {manga.title}
                </h1>
                
                {/* Tür Etiketleri */}
                <div className="flex flex-wrap space-x-2 mb-3 md:mb-4">
                  {manga.genres.map(genre => (
                    <span key={genre} className="text-xs font-semibold px-3 py-1 rounded-full bg-red-600 text-white mt-1">
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Açıklama - Mobil'de daha az satır, büyük ekranda daha çok */}
                <p className="text-gray-300 mb-4 text-sm md:text-base line-clamp-3 md:line-clamp-4">
                  {manga.description}
                </p>

                {/* Yazar Bilgisi ve Okuma Butonu */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-8">
                    <div className="flex items-center text-xs md:text-sm text-gray-400">
                        <User className="w-4 h-4 mr-2" />
                        <span>{manga.author}</span>
                    </div>

                    <Link href={`/manga/${manga.id}`}
                        className="flex items-center text-sm md:text-base font-semibold px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition duration-300 shadow-lg"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Şimdi Oku
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigasyon Butonları ve Bölüm Numarası */}
      {/* Sağ tarafta, alt köşeye sabitlendi */}
      <div className="absolute inset-y-0 right-0 z-40 flex items-end justify-end w-full pr-4 pb-4 md:pr-8 md:pb-8 pointer-events-none">
          
          {/* Bölüm Numarası */}
          <div className="flex flex-col items-end space-y-4">
              <div className="text-xl md:text-3xl font-bold text-red-500 bg-gray-900/50 backdrop-blur-sm p-1 px-2 md:p-2 md:px-3 rounded-lg">
                NO. {currentManga.chapter}
              </div>
              
              {/* İlerleme Okları */}
              <div className="flex space-x-4 pointer-events-auto">
                <button 
                  onClick={goToPrev}
                  className="p-2 md:p-3 rounded-full bg-gray-800/70 text-gray-300 hover:bg-gray-700 transition duration-300 shadow-lg"
                  aria-label="Önceki Manga"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button 
                  onClick={goToNext}
                  className="p-2 md:p-3 rounded-full bg-gray-800/70 text-gray-300 hover:bg-gray-700 transition duration-300 shadow-lg"
                  aria-label="Sonraki Manga"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
          </div>
      </div>
      
    </section>
  );
};

export default FeaturedMangaCarousel;