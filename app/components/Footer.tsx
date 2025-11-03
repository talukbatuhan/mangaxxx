// app/components/Footer.tsx

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    
    // Hızlı Bağlantılar için veri yapısı
    const footerLinks = [
        { 
            title: 'Keşfet', 
            links: [
                { name: 'Ana Sayfa', href: '/' },
                { name: 'Tüm Mangalar', href: '/manga/all'},
                { name: 'Rastgele Manga', href: '/manga/random'},
            ]
        },
        { 
            title: 'Hukuki', 
            links: [
                { name: 'Hakkımızda', href: '/about' },
                { name: 'Gizlilik Politikası', href: '/privacy'},
                { name: 'Kullanım Şartları', href: '/terms' },
            ]
        },
        { 
            title: 'Yardım', 
            links: [
                { name: 'SSS', href: '/faq'},
                { name: 'İletişim', href: '/contact' },
                { name: 'Bağış Yap', href: '/donate' },
            ]
        },
    ];

  return (
    // En koyu arkaplan tonunu kullanalım
    <footer className="w-full bg-gray-950 text-gray-400 border-t-4 border-red-600/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Üst Bölüm: Logo ve Link Sütunları */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-gray-700/50 mb-8">
          
          {/* Sütun 1: Logo ve Kısa Açıklama */}
          <div className="col-span-2 mt-3 md:col-span-2">
            <Link href="/" className="text-3xl font-extrabold text-red-600 tracking-wider">
              MANGA<span className="text-white">XXX</span>
            </Link>
            <p className="mt-4 text-sm max-w-sm">
              En yeni ve popüler mangaları yüksek kalitede, tamamen ücretsiz okuyun. Dünya çapındaki manga hayranlarını bir araya getiriyoruz.
            </p>
            
          </div>
          
          {/* Sütun 2, 3, 4: Bağlantı Grupları */}
          {footerLinks.map(group => (
              <div key={group.title} className="col-span-1">
                  <h4 className="text-lg font-semibold text-white mb-4 pb-0.5 border-b-2 border-red-600/50">
                      {group.title}
                  </h4>
                  <ul className="space-y-3">
                      {group.links.map(link => (
                          <li key={link.name}>
                              <Link 
                                  href={link.href}
                                  className="flex items-center text-sm hover:text-red-600 transition duration-300"
                              >
                                  {link.name}
                              </Link>
                          </li>
                      ))}
                  </ul>
              </div>
          ))}
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;