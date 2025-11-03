// app/components/Header.tsx veya components/Header.tsx

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
// İkonlar için 'lucide-react' kütüphanesinin kurulu olması gerekir
import { Menu, X, Search, LogIn } from 'lucide-react'; 

// Navigasyon bağlantılarını tanımlayan bir tip
interface NavLink {
  href: string;
  label: string;
}

// 3 ana navigasyon bağlantısı
const navLinks: NavLink[] = [
  { href: '/', label: 'Anasayfa' },
  { href: '/manga-listesi', label: 'Manga Listesi' },
  { href: '/yeni-bolumler', label: 'Yeni Bölümler' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-950 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Sol Kısım: Logo / Site Adı */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-red-500">
              MANGAXXX
            </Link>
          </div>

          {/* Orta Kısım: Masaüstü Navigasyon (Büyük ekranlar için) */}
          <nav className="hidden md:flex md:justify-center md:flex-grow">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-gray-300 hover:text-red-500 transition duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Sağ Kısım: Arama ve Giriş/Kayıt Butonları (Büyük ekranlar için) */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Arama Alanı - ODAKLANDIĞINDA GENİŞLEYEN KISIM */}
            <div className="relative">
              <input
                type="text"
                placeholder="Manga Ara..."
                // w-40 başlangıç, focus:w-60 odaklanınca genişlik
                // transition-all ile yumuşak geçiş
                className="pl-10 pr-4 py-1.5 text-sm rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-40 focus:w-60 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Giriş / Kayıt Butonları */}
            <Link 
                href="/kayit-ol" 
                className="text-sm font-medium px-3 py-1.5 rounded-full text-white bg-red-600 hover:bg-red-700 transition duration-300 hidden lg:block" 
            >
                Kayıt Ol
            </Link>
            <Link 
                href="/giris-yap" 
                className="flex items-center text-sm font-medium px-3 py-1.5 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
            >
                <LogIn className="w-4 h-4 mr-1 hidden lg:block" />
                Giriş Yap
            </Link>
          </div>

          {/* Mobil Menü Butonu ve Arama İkonu (Sadece küçük ekranlar için) */}
          <div className="md:hidden flex items-center">
            {/* Mobil Arama İkonu (Tıkladığınızda bir arama modalı/sayfası açmak için kullanılabilir) */}
            <button
                type="button"
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 mr-2"
            >
                <Search className="h-6 w-6" />
            </button>
            
            {/* Mobil Hamburger Butonu */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menüyü aç/kapat</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü İçeriği (Küçük ekranlarda görünür) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-700" id="mobile-menu">
            {/* Mobil Arama Alanı (Menü içinde - sabit genişlikte) */}
            <div className="p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Manga Ara..."
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Mobil Navigasyon Linkleri */}
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300"
                    >
                        {link.label}
                    </Link>
                ))}
                
                {/* Mobil Giriş/Kayıt Butonları */}
                <div className="pt-2 border-t border-gray-700 flex flex-col space-y-2">
                    <Link 
                        href="/giris-yap" 
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full text-center px-3 py-2 rounded-md text-base font-medium border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                    >
                        Giriş Yap
                    </Link>
                    <Link 
                        href="/kayit-ol" 
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 transition duration-300"
                    >
                        Kayıt Ol
                    </Link>
                </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;