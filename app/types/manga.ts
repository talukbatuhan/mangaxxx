// types/manga.ts
export type MangaEpisode = {
  number: number;
  timeAgo: string;
  isNew: boolean;
  date?: string; // Opsiyonel olarak ekleyelim
};

export type MangaEntry = {
  id: number;
  title: string;
  coverImage: string;
  countryFlag: string;
  episodes: MangaEpisode[];
  status: 'Devam Ediyor' | 'Completed' | 'Tamamlandı'; // Tamamlandı'yı da ekleyelim
  rating?: string;
  genres?: string[];
  description?: string;
};

export const sampleMangaData: MangaEntry[] = [
  {
    id: 1,
    title: 'Semavi İblisin Yolu',
    coverImage: '/images/kapak3.jpg',
    countryFlag: '🇰🇷',
    episodes: [
      { number: 25, timeAgo: '18 saat önce', isNew: true },
      { number: 24, timeAgo: '1 hafta önce', isNew: false },
            { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
    ],
    status: 'Devam Ediyor',
    rating: '8.9',
    genres: ['Fantazi', 'Aksiyon', 'Doğaüstü']
  },
  {
    id: 2,
    title: 'Dahi Okçunun Yayın Günlükleri',
    coverImage: '/images/kapak4.jpg',
    countryFlag: '🇰🇷',
    episodes: [
      { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
            { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
    ],
    status: 'Devam Ediyor',
    rating: '8.7',
    genres: ['Okul', 'Spor', 'Dram']
  },

  {
    id: 2,
    title: 'Dahi Okçunun Yayın Günlükleri',
    coverImage: '/images/kapak4.jpg',
    countryFlag: '🇰🇷',
    episodes: [
      { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
            { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
    ],
    status: 'Devam Ediyor',
    rating: '8.7',
    genres: ['Okul', 'Spor', 'Dram']
  },
    {
    id: 2,
    title: 'Dahi Okçunun Yayın Günlükleri',
    coverImage: '/images/kapak4.jpg',
    countryFlag: '🇰🇷',
    episodes: [
      { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
            { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
    ],
    status: 'Devam Ediyor',
    rating: '8.7',
    genres: ['Okul', 'Spor', 'Dram']
  },
    {
    id: 2,
    title: 'Dahi Okçunun Yayın Günlükleri',
    coverImage: '/images/kapak4.jpg',
    countryFlag: '🇰🇷',
    episodes: [
      { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
            { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
    ],
    status: 'Devam Ediyor',
    rating: '8.7',
    genres: ['Okul', 'Spor', 'Dram']
  },
    {
    id: 2,
    title: 'Dahi Okçunun Yayın Günlükleri',
    coverImage: '/images/kapak4.jpg',
    countryFlag: '🇰🇷',
    episodes: [
      { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
      { number: 86, timeAgo: '2 gün önce', isNew: true },
      { number: 85, timeAgo: '4 gün önce', isNew: false },
    ],
    status: 'Devam Ediyor',
    rating: '8.7',
    genres: ['Okul', 'Spor', 'Dram']
  }

];