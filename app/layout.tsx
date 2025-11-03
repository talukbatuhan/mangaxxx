import type { Metadata } from "next";
import { Oswald } from "next/font/google"; 
import "./globals.css";

const oswald = Oswald({
    subsets: ["latin"], 
    variable: "--font-oswald", 
    weight: ['400', '600', '700'], 
});

export const metadata: Metadata = {
    title: "MANGAXXX - En Güncel Mangalar", 
    description: "En yeni ve popüler mangaları yüksek kalitede okuyun.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr"> 
            <body className={`${oswald.variable} font-oswald antialiased bg-gray-900 text-white min-h-screen`}>
                {children}
            </body>
        </html>
    );
}