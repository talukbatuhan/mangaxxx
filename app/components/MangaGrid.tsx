'use client';

import { sampleMangaData, MangaEntry } from '../types/manga';

const MangaCard = ({ entry }: { entry: MangaEntry }) => {
  return (
    <div className="flex flex-col space-y-3 p-4 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.01] border border-gray-700 min-h-[180px]">
      
      <div className="flex items-start space-x-4"> 
        
        <div className="relative w-[150px] flex-shrink-0 h-[200px]"> 
          <img
            src={entry.coverImage}
            alt={entry.title}
            className="w-full h-full object-cover rounded-md shadow-lg"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/150x200/000000/FFFFFF?text=No+Cover';
            }}
          />
          <span className="absolute top-1 right-1 text-xl drop-shadow-md">
            {entry.countryFlag}
          </span>
        </div>

        <div className="flex flex-col flex-grow min-w-0"> 
          {/* Başlık için kesin çözüm */}
          <h3 className="text-lg font-light text-white mb-2 leading-tight whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
            {entry.title}
          </h3>
          <ul className="list-none p-0 m-0 space-y-2 text-sm min-w-0"> 
            {entry.episodes.slice(0, 2).map((episode, index) => (
              <li key={index} className="flex items-center text-gray-400 hover:text-red-400 transition cursor-pointer min-w-0">
                <span className={`flex items-center ${episode.isNew ? 'text-red-500 font-semibold' : 'text-gray-400'} whitespace-nowrap overflow-hidden text-ellipsis min-w-0`}>
                  <span className={`mr-2 text-xl flex-shrink-0 ${episode.isNew ? 'text-red-500' : 'text-gray-500'}`}>
                    &bull;
                  </span>
                  Chapter {episode.number}
                </span>
              </li>
            ))}
            <li className="text-xs text-gray-500 pt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                Status: <span className="font-medium text-gray-400">{entry.status}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function MangaGrid() {
  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-900 min-h-screen">
        <h1 className="text-4xl font-black text-white mb-8 border-b-4 border-red-600 pb-3 inline-block whitespace-nowrap">
            Latest Manga Updates
        </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8">
        {sampleMangaData.map((manga) => (
          <MangaCard key={manga.id} entry={manga} />
        ))}
      </div>
    </div>
  );
}