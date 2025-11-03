// app/components/MangaCard.tsx

import Image from 'next/image';
import Link from 'next/link';

// Kart için kullanılacak minimum veri tipi
interface MangaCardProps {
  id: number;
  title: string;
  coverUrl: string;
}

const MangaCard: React.FC<MangaCardProps> = ({ id, title, coverUrl }) => {
  return (
    // Esnek genişlik, ancak kaydırma için sabit genişlik tanımlıyoruz
    <Link href={`/manga/${id}`} className="flex-shrink-0 w-[180px] sm:w-[220px] transition duration-300 transform hover:scale-[1.02]">
      <div className="relative w-full h-auto shadow-xl rounded-lg overflow-hidden group">
        
        {/* Kapak Resmi */}
        <Image
          src={coverUrl}
          alt={`${title} Kapağı`}
          width={220} // Kart genişliği
          height={320} // Kart yüksekliği (yaklaşık 2:3 oranı)
          objectFit="cover"
          className="rounded-lg transition duration-500 group-hover:opacity-90"
        />
        
        {/* Koyu Katman (Hover'da görünür) */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-2">
            {/* Japon bayrağı gibi küçük bir ikon veya etiket eklenebilir */}
            <span className="text-sm px-2 py-0.5 rounded-full bg-red-600 text-white font-bold hidden group-hover:block">
                #New
            </span>
        </div>
      </div>
      
      {/* Manga Başlığı */}
      <p className="mt-2 text-sm font-medium text-white line-clamp-2">
        {title}
      </p>
    </Link>
  );
};

export default MangaCard;