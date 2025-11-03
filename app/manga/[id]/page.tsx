// app/manga/[id]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Star, User, Clock, Eye, MessageSquare, Menu, ChevronDown, TrendingUp } from 'lucide-react';
import Header from '../../components/Header';

// Varsayılan Veri Yapıları (Gerçekte bir API'den veya veritabanından gelmeli)
interface MangaDetail {
  id: string;
  title: string;
  originalTitle: string;
  summary: string;
  coverUrl: string;
  genres: string[];
  status: 'Ongoing' | 'Completed';
  type: 'Manhwa' | 'Manga' | 'Manhua';
  publishedYear: number;
  author: string;
  artist: string;
  latestChapter: number;
  viewCount: string;
}

interface Chapter {
  number: number;
  title: string;
  date: string;
  isNew: boolean;
}

// *** Örnek Sabit Veri (Ekran Görüntülerinden ilham alınarak doldurulmuştur) ***
const sampleManga: MangaDetail = {
  id: 'akademide-hayatta-kalma-yollari',
  title: 'Akademide Hayatta Kalma Yolları',
  originalTitle: 'Academy’s Survivor',
  summary: "En sevdiğim oyundaki gereksiz kötü karakterin bedenine girdim. Tek arzum sessiz sakin bir hayat sürmekti ama bu dünyada yaşamak amanın da zormuş! Hayatta kalabilmek için ne gerekiyorsa yapmalıyım. Başkarekler kendi yolunda ilerlerken ben de 'gereksiz kötü adamın yoluyla' oyunun sonuna ulaşacağım!",
  coverUrl: '/images/manga-1/akademi-kapagi.jpg', // Lütfen gerçek yol ile değiştirin
  genres: ['Aksiyon', 'Doğaüstü', 'Dram', 'Harem', 'Macera', 'Romantizm', 'Seinen'],
  status: 'Ongoing',
  type: 'Manhwa',
  publishedYear: 2023,
  author: 'Corita',
  artist: 'Geulinglin',
  latestChapter: 82,
  viewCount: '2.3Mn',
};

const sampleChapters: Chapter[] = [
  { number: 82, title: '1.Sezon Finali', date: '5 Temmuz 2025', isNew: true },
  { number: 81, title: '', date: '19 Haziran 2025', isNew: false },
  { number: 80, title: '', date: '8 Haziran 2025', isNew: false },
  { number: 79, title: '', date: '30 Mayıs 2025', isNew: false },
  { number: 78, title: '', date: '22 Mayıs 2025', isNew: false },
  { number: 77, title: '', date: '13 Mayıs 2025', isNew: false },
  { number: 76, title: '', date: '6 Mayıs 2025', isNew: false },
  { number: 75, title: '', date: '4 Mayıs 2025', isNew: false },
  { number: 74, title: '', date: '27 Nisan 2025', isNew: false },
  { number: 1, title: 'İlk Bölüm', date: '7 dakika önce', isNew: true }, // Örnek için yeni tarih
];

// Benzer Seriler Verisi (Kendi verinizle değiştirin)
const relatedSeries = [
    { title: 'Kuduz Hançerin İntikamı', coverUrl: '/images/related1.jpg', tag: 'İntikam' },
    { title: 'Bay Zombi', coverUrl: '/images/related2.jpg', tag: 'Zombi' },
    { title: 'Kılıç Kralının Fantazisi', coverUrl: '/images/related3.jpg', tag: 'Renk' },
    { title: 'Ölümüne Suçlu', coverUrl: '/images/related4.jpg', tag: 'Renk' },
    { title: 'Canavar Yiyen', coverUrl: '/images/related5.jpg', tag: 'Renk' },
    { title: 'Sihirbaz', coverUrl: '/images/related6.jpg', tag: '' },
];
// *************************************************************************


const MangaDetailPage = ({ params }: { params: { id: string } }) => {
    // Gerçek uygulamada, params.id kullanarak sampleManga'yı bir API'den çekeceksiniz.
    const manga = sampleManga;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-0">
            <Header />
            
            {/* 1. Manga Tanıtım/Özet Alanı (Header/Hero) */}
            <div className="relative w-full overflow-hidden">
                {/* Blur Arkaplan Kaplaması */}
                <div className="absolute inset-0 z-0 opacity-20 blur-lg bg-cover bg-center" 
                     style={{ backgroundImage: `url(${manga.coverUrl})` }}>
                </div>
                
                {/* Siyah Kaplama (Okunabilirliği artırmak için) */}
                <div className="absolute inset-0 z-0 bg-gray-900/90"></div>

                <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 pt-10 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
                    
                    {/* Sol: Kapak ve İşaretleyici */}
                    <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-start">
                        <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-lg shadow-xl overflow-hidden mb-4">
                            <Image
                                src={manga.coverUrl}
                                alt={`${manga.title} Kapağı`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                                priority
                            />
                        </div>
                        <button className="w-48 md:w-56 py-3 bg-purple-700 hover:bg-purple-800 transition duration-300 text-white font-bold rounded-md flex items-center justify-center space-x-2">
                            <Bookmark className="w-5 h-5" />
                            <span>Yer İşareti</span>
                        </button>
                        
                        {/* Puanlama */}
                        <div className="mt-4 flex items-center space-x-1 text-yellow-500">
                            <Star className="w-5 h-5 fill-yellow-500" />
                            <Star className="w-5 h-5 fill-yellow-500" />
                            <Star className="w-5 h-5 fill-yellow-500" />
                            <Star className="w-5 h-5 fill-yellow-500" />
                            <Star className="w-5 h-5 fill-yellow-500" />
                            <span className="text-gray-300 ml-2">(8)</span>
                        </div>
                        
                        {/* Ek Bilgiler (Küçük Tablo) */}
                        <div className="mt-6 text-sm w-full md:w-auto">
                            <DetailRow label="Durum" value={manga.status} />
                            <DetailRow label="Türü" value={manga.type} />
                            <DetailRow label="Yayınlanan" value={manga.publishedYear} />
                            <DetailRow label="Yazar" value={manga.author} />
                            <DetailRow label="Çizer" value={manga.artist} />
                            <DetailRow label="Görüntülenme" value={manga.viewCount} icon={<Eye className="w-4 h-4" />} />
                            <DetailRow label="Son Güncelleme" value="5 Temmuz 2025" icon={<Clock className="w-4 h-4" />} />
                        </div>
                    </div>

                    {/* Sağ: Başlık ve Açıklama */}
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-white">
                            {manga.title}
                        </h1>
                        <p className="text-gray-400 text-sm mb-4">{manga.originalTitle}</p>

                        {/* Tür Etiketleri */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {manga.genres.map(genre => (
                                <span key={genre} className="px-3 py-1 text-xs font-semibold rounded-full bg-red-600/20 text-red-400 border border-red-600">
                                    {genre}
                                </span>
                            ))}
                        </div>

                        {/* Özet */}
                        <div className="bg-gray-800 p-4 rounded-lg shadow-inner mb-6">
                            <h3 className="text-lg font-semibold mb-2 text-white border-b border-gray-700 pb-1">
                                {manga.title} Serisinin Özeti
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {manga.summary}
                            </p>
                        </div>
                        
                        {/* Geçmiş ve İlk Bölüm Navigasyonu */}
                        <div className="grid grid-cols-2 gap-4">
                            <ChapterNavigation title="İlk Bölüm" chapterNumber="Bölüm 0" link={`/manga/${manga.id}/0`} />
                            <ChapterNavigation title="Yeni Bölüm" chapterNumber={`Bölüm ${manga.latestChapter} - 1.Sezon Finali`} link={`/manga/${manga.id}/${manga.latestChapter}`} primary={true} />
                        </div>
                        
                         {/* Bölüm Arama Çubuğu */}
                         <div className="mt-4 p-2 bg-gray-800 rounded-lg">
                            <input
                                type="text"
                                placeholder="Bölüm Ara. Örnek: 25 veya 178"
                                className="w-full bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Bölüm Listesi ve Benzer Seriler */}
            <div className="max-w-7xl mx-auto p-4 md:p-8 pt-4">
                
                {/* Bölüm Listesi Başlığı */}
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-700/50 pb-2 text-white">
                    Bölüm Listesi
                </h2>

                {/* Bölüm Listesi Kontrolleri */}
                <div className="flex justify-between items-center mb-4 text-sm">
                    <div className="flex space-x-4">
                        <button className="flex items-center text-red-500 font-semibold">
                            <TrendingUp className="w-4 h-4 mr-1" /> En İyiler
                        </button>
                        <button className="text-gray-400 hover:text-white transition">En Yeniler</button>
                        <button className="text-gray-400 hover:text-white transition">En Eskiler</button>
                    </div>
                    <button className="flex items-center text-gray-400 hover:text-white transition">
                        Sıralama <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                </div>

                {/* Bölüm Listesi Öğeleri */}
                <div className="bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-700">
                    {sampleChapters.map((chapter) => (
                        <ChapterItem key={chapter.number} chapter={chapter} mangaId={manga.id} />
                    ))}
                </div>

                {/* Benzer Seriler Bölümü (Screenshot_8'den) */}
                <h2 className="text-2xl font-bold mt-10 mb-4 border-b-2 border-purple-700/50 pb-2 text-white">
                    Benzer Seriler
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {relatedSeries.map((series, index) => (
                        <RelatedSeriesCard key={index} {...series} />
                    ))}
                </div>

            </div>
            
            {/* 3. Yorumlar/Tartışma Alanı (Screenshot_9'dan) */}
            <div className="max-w-7xl mx-auto p-4 md:p-8 pt-4">
                <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-700/50 pb-2 text-white">
                    Forum
                </h2>
                <CommentSection />
            </div>

        </div>
    );
};

export default MangaDetailPage;


// -------------------------------------------------------------
// YARDIMCI BİLEŞENLER
// -------------------------------------------------------------

const DetailRow = ({ label, value, icon }: { label: string; value: string | number; icon?: React.ReactNode }) => (
    <div className="flex justify-between py-1 border-b border-gray-700 last:border-b-0">
        <span className="text-gray-400 flex items-center">
            {icon && <span className="mr-2 text-purple-400">{icon}</span>}
            {label}
        </span>
        <span className="font-medium text-white">{value}</span>
    </div>
);

const ChapterNavigation = ({ title, chapterNumber, link, primary = false }: { title: string; chapterNumber: string; link: string; primary?: boolean }) => (
    <Link href={link}>
        <div className={`p-4 text-center rounded-lg shadow-lg cursor-pointer transition duration-300 ${
            primary 
                ? 'bg-purple-700 hover:bg-purple-800 text-white border-2 border-purple-500' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-2 border-gray-700'
        }`}>
            <p className="text-sm font-light mb-1">{title}</p>
            <p className="text-base font-bold">{chapterNumber}</p>
        </div>
    </Link>
);

const ChapterItem = ({ chapter, mangaId }: { chapter: Chapter, mangaId: string }) => (
    <Link href={`/manga/${mangaId}/${chapter.number}`}>
        <div className="flex justify-between items-center p-4 hover:bg-gray-700 transition duration-150 cursor-pointer">
            <div className="flex items-center space-x-3">
                <span className={`font-bold text-lg ${chapter.isNew ? 'text-red-500' : 'text-gray-300'}`}>
                    Bölüm {chapter.number}
                </span>
                {chapter.title && <span className="text-sm text-gray-400">({chapter.title})</span>}
                {chapter.isNew && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-600 text-white hidden sm:inline">YENİ</span>
                )}
            </div>
            <span className="text-xs text-gray-500">{chapter.date}</span>
        </div>
    </Link>
);

const RelatedSeriesCard = ({ title, coverUrl, tag }: { title: string; coverUrl: string; tag: string }) => (
    <Link href={`/manga/${title.toLowerCase().replace(/\s/g, '-')}`}>
        <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <div className="w-full h-40 relative">
                <Image
                    src={coverUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition"></div>
            <div className="absolute bottom-0 left-0 p-2">
                <p className="text-sm font-semibold text-white truncate">{title}</p>
                {tag && <span className="text-xs text-gray-300 bg-red-600 px-1 py-0.5 rounded-sm">{tag}</span>}
            </div>
        </div>
    </Link>
);


const CommentSection = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        {/* Tepkiler Alanı */}
        <div className="text-center mb-6 border-b border-gray-700 pb-4">
            <p className="text-gray-300 mb-4 text-lg">Bu içeriğe tepki ver</p>
            <div className="flex justify-center space-x-4">
                {/* Her bir tepki butonu */}
                {[{e: '👍', l: 'Beğendim', c: 37, color: 'text-yellow-500'}, {e: '😡', l: 'Sinir Bozucu', c: 0, color: 'text-red-600'}, {e: '😂', l: 'Mükemmel', c: 8, color: 'text-orange-500'}, {e: '😲', l: 'Şaşırtıcı', c: 1, color: 'text-blue-500'}, {e: '😌', l: 'Sakin Olmalıyım', c: 0, color: 'text-green-500'}, {e: '😔', l: 'Bölüm Bitti', c: 6, color: 'text-purple-500'}].map((r) => (
                    <button key={r.l} className="flex flex-col items-center hover:bg-gray-700 p-2 rounded-lg transition">
                        <span className={`text-3xl ${r.color}`}>{r.e}</span>
                        <span className="text-xs text-gray-400 mt-1">{r.l}</span>
                        <span className="text-sm font-bold text-gray-200">{r.c}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Yorum Yapma Çağrısı */}
        <div className="text-center mb-8">
            <p className="text-gray-300">
                Yorum yapmak için <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition">giriş yapın</Link> veya <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition">kayıt olun</Link>.
            </p>
        </div>

        {/* Yorumlar Başlık ve Sıralama */}
        <div className="flex justify-between items-center mb-4 text-gray-400 border-b border-gray-700 pb-2">
            <h3 className="text-lg font-semibold text-white">11 Yorum</h3>
            <div className="flex space-x-4 text-sm">
                <button className="flex items-center text-red-500 font-semibold">
                    <MessageSquare className="w-4 h-4 mr-1" /> En İyiler
                </button>
                <button className="hover:text-white transition">En Yeniler</button>
                <button className="hover:text-white transition">En Eskiler</button>
            </div>
        </div>

        {/* Örnek Yorumlar */}
        <div className="space-y-6">
            <CommentItem username="Umutcannn12" date="14 October 2025" text="muazzam seri okuyun çeviren kişiler için cansınız cansınız <3" upvotes={0} downvotes={0} />
            <CommentItem username="Artin" date="20 August 2025" text="Beyler, 2.sezon gelince uyandırın" upvotes={0} downvotes={0} />
        </div>
    </div>
);

const CommentItem = ({ username, date, text, upvotes, downvotes }: { username: string; date: string; text: string; upvotes: number; downvotes: number; }) => (
    <div className="flex space-x-4">
        {/* Avatar (basit tutuldu) */}
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            {username.charAt(0)}
        </div>
        
        <div className="flex-1 border-b border-gray-700 pb-4">
            <div className="flex justify-between items-start">
                <div>
                    <span className="font-bold text-purple-400">{username}</span>
                    <span className="text-xs text-gray-500 ml-2">{date}</span>
                </div>
                <button className="text-gray-400 hover:text-white">
                    <Menu className="w-4 h-4" />
                </button>
            </div>
            
            <p className="text-gray-300 mt-1 mb-2 text-sm">{text}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                    <button className="hover:text-green-500 transition">↑</button>
                    <span>{upvotes}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <button className="hover:text-red-500 transition">↓</button>
                    <span>{downvotes}</span>
                </div>
                <button className="hover:text-white transition font-semibold">Yanıtla</button>
            </div>
        </div>
    </div>
);